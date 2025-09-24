import { PrismaClient } from './generated/prisma/index.js';
import { ChainConfig } from './config/types.js';
import { AbiRegistry } from './registry/abi.js';
import { BlockScanner } from './scanner/BlockScanner.js';
import { LogIndexer } from './indexer/LogIndexer.js';
import { TxDecoder } from './indexer/TxDecoder.js';
import { DynamicConfigLoader } from './config/DynamicConfigLoader.js';
import pino from 'pino';

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
        },
        level: 'info'
      },
      {
        target: 'pino/file',
        options: {
          destination: `./logs/monitor-service.log`
        },
        level: 'info'
      }
    ]
  },
});

export class MonitorService {
  private readonly prisma: PrismaClient;
  private abiRegistry!: AbiRegistry;
  private blockScanner!: BlockScanner;
  private logIndexer!: LogIndexer;
  private txDecoder!: TxDecoder;
  private dynamicConfigLoader?: DynamicConfigLoader;
  private currentConfig: ChainConfig;

  constructor(
    private readonly baseConfig: ChainConfig,
    private readonly managementDatabaseUrl?: string,
    private readonly monitorDatabaseUrl?: string,
    private readonly startBlockOption?: string
  ) {
    // 使用Monitor数据库的Prisma客户端
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: monitorDatabaseUrl || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL,
        },
      },
    });
    this.currentConfig = baseConfig;
    
    // 如果提供了数据库URL，则使用动态配置
    if (managementDatabaseUrl && monitorDatabaseUrl) {
      this.dynamicConfigLoader = new DynamicConfigLoader(
        managementDatabaseUrl,
        monitorDatabaseUrl,
        baseConfig
      );
    }
    
    this.initializeComponents();
  }

  // 处理起始区块设置
  private async handleStartBlock() {
    if (!this.startBlockOption) {
      // 如果没有指定起始区块，使用默认的检查点加载
      await this.blockScanner.loadCheckpoint();
      return;
    }

    if (this.startBlockOption === 'checkpoint') {
      // 从检查点继续
      await this.blockScanner.loadCheckpoint();
      logger.info({ 
        chainId: this.currentConfig.chainId,
        startBlock: this.blockScanner.getLastProcessedBlock().toString()
      }, 'Starting from checkpoint');
    } else if (this.startBlockOption === 'current') {
      // 从当前区块开始
      const currentBlock = await this.blockScanner.getLatestBlock();
      await this.blockScanner.setLastProcessedBlock(currentBlock);
      logger.info({ 
        chainId: this.currentConfig.chainId,
        startBlock: currentBlock.toString()
      }, 'Starting from current block');
    } else {
      // 从指定区块开始
      const startBlock = BigInt(this.startBlockOption);
      await this.blockScanner.setLastProcessedBlock(startBlock);
      logger.info({ 
        chainId: this.currentConfig.chainId,
        startBlock: startBlock.toString()
      }, 'Starting from specified block');
    }
  }

  private initializeComponents() {
    this.abiRegistry = new AbiRegistry(this.currentConfig.contracts);
    this.logIndexer = new LogIndexer(this.currentConfig, this.prisma, this.abiRegistry, this.managementDatabaseUrl);
    this.txDecoder = new TxDecoder(this.currentConfig, this.prisma, this.abiRegistry, this.managementDatabaseUrl);
    this.blockScanner = new BlockScanner(this.currentConfig, this.prisma, this.logIndexer, this.txDecoder);
  }

  // 初始化服务
  async init() {
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Initializing monitor service'
    );

    // 如果使用动态配置，先初始化
    if (this.dynamicConfigLoader) {
      await this.dynamicConfigLoader.initialize();
      this.currentConfig = this.dynamicConfigLoader.getDynamicConfig();
      this.initializeComponents(); // 重新初始化组件
    }

    // 处理起始区块设置
    await this.handleStartBlock();

    // 注册合约
    await this.registerContracts();

    // 启动合约变化监听
    if (this.dynamicConfigLoader) {
      this.dynamicConfigLoader.startWatching();
    }
  }

  // 注册合约到数据库
  private async registerContracts() {
    for (const contract of this.currentConfig.contracts) {
      await this.prisma.contract.upsert({
        where: {
          address_chainId: {
            address: contract.address.toLowerCase(),
            chainId: this.currentConfig.chainId,
          },
        },
        create: {
          chainId: this.currentConfig.chainId,
          address: contract.address.toLowerCase(),
          name: contract.name,
          abiVersion: '1.0.0', // TODO: 版本管理
        },
        update: {
          name: contract.name,
        },
      });
    }

    logger.info(
      {
        chainId: this.currentConfig.chainId,
        contractCount: this.currentConfig.contracts.length,
      },
      'Registered contracts'
    );
  }

  // 处理区块范围
  private async processBlockRange(fromBlock: bigint, toBlock: bigint) {
    try {
      // 扫描区块
      await this.blockScanner.scanBlockRange(fromBlock, toBlock);

      // 索引事件
      await this.logIndexer.indexBlockRange(fromBlock, toBlock);

      // 解码交易
      await this.txDecoder.decodeBlockRange(fromBlock, toBlock);

      logger.info(
        {
          chainId: this.currentConfig.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'Block range processed successfully'
      );
    } catch (error) {
      logger.error(
        {
          chainId: this.currentConfig.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          error,
        },
        'Failed to process block range'
      );
      throw error;
    }
  }

  // 启动服务
  async start() {
    const startupMessages = [
      `🔍 开始监控 ${this.currentConfig.name} (Chain ID: ${this.currentConfig.chainId})`,
      `📡 RPC端点: ${this.currentConfig.rpcUrl}`,
      `📋 监控合约: ${this.currentConfig.contracts.length} 个`
    ];
    
    startupMessages.forEach(msg => {
      console.log(msg);
      logger.info(msg);
    });
    
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Starting monitor service'
    );

    try {
      const scannerMessage = `🔄 启动区块扫描器...`;
      console.log(scannerMessage);
      logger.info(scannerMessage);
      
      // 启动区块扫描
      await this.blockScanner.startScanning();
      
      const successMessages = [
        `✅ 区块扫描器启动成功!`,
        `📊 监控状态: 活跃`,
        `🔄 扫描进度将每分钟更新一次`
      ];
      
      successMessages.forEach(msg => {
        console.log(msg);
        logger.info(msg);
      });
    } catch (error) {
      const errorMessage = `❌ 监控服务启动失败: ${error.message}`;
      console.log(errorMessage);
      logger.error(errorMessage);
      logger.error(
        { chainId: this.currentConfig.chainId, error },
        'Monitor service encountered an error'
      );
      throw error;
    }
  }

  // 停止服务
  async stop() {
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Stopping monitor service'
    );

    await this.blockScanner.stopScanning();
    
    // 清理组件
    if (this.logIndexer) {
      await this.logIndexer.cleanup();
    }
    if (this.txDecoder) {
      await this.txDecoder.cleanup();
    }
    
    // 清理动态配置加载器
    if (this.dynamicConfigLoader) {
      await this.dynamicConfigLoader.cleanup();
    }
    
    await this.prisma.$disconnect();
  }

  // 回放历史数据
  async backfill(fromBlock: bigint, toBlock: bigint) {
    logger.info(
      {
        chainId: this.currentConfig.chainId,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
      },
      'Starting backfill'
    );

    const span = BigInt(this.currentConfig.scanBlockSpan);

    try {
      // 分批处理
      for (let start = fromBlock; start <= toBlock; start += span) {
        const end = start + span - BigInt(1) > toBlock ? toBlock : start + span - BigInt(1);
        await this.processBlockRange(start, end);
      }

      logger.info(
        {
          chainId: this.currentConfig.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'Backfill completed successfully'
      );
    } catch (error) {
      logger.error(
        {
          chainId: this.currentConfig.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          error,
        },
        'Backfill failed'
      );
      throw error;
    }
  }

  // 重建指定合约的数据
  async reindex(contractAddress: string, fromBlock: bigint, toBlock: bigint) {
    logger.info(
      {
        chainId: this.currentConfig.chainId,
        contractAddress,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
      },
      'Starting reindex'
    );

    try {
      // 清理现有数据
      await this.prisma.$transaction([
        this.prisma.event.deleteMany({
          where: {
            chainId: this.currentConfig.chainId,
            contractAddress: contractAddress.toLowerCase(),
            blockNumber: {
              gte: fromBlock,
              lte: toBlock,
            },
          },
        }),
        this.prisma.functionCall.deleteMany({
          where: {
            chainId: this.currentConfig.chainId,
            contractAddress: contractAddress.toLowerCase(),
            blockNumber: {
              gte: fromBlock,
              lte: toBlock,
            },
          },
        }),
      ]);

      // 重新索引
      await this.backfill(fromBlock, toBlock);

      logger.info(
        {
          chainId: this.currentConfig.chainId,
          contractAddress,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'Reindex completed successfully'
      );
    } catch (error) {
      logger.error(
        {
          chainId: this.currentConfig.chainId,
          contractAddress,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          error,
        },
        'Reindex failed'
      );
      throw error;
    }
  }
}


