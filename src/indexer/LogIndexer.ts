import { createPublicClient, http, Log, parseAbiItem } from 'viem';
import { ChainConfig } from '../config/types.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { AbiRegistry } from '../registry/abi.js';
import { RpcManager } from '../utils/RpcManager.js';
import { ClaimDataProcessor } from '../services/ClaimDataProcessor.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      singleLine: true,
    },
  },
  level: 'info',
});

export class LogIndexer {
  private client!: ReturnType<typeof createPublicClient>;
  private rpcManager: RpcManager;
  private claimDataProcessor?: ClaimDataProcessor;

  constructor(
    private readonly config: ChainConfig,
    private readonly prisma: PrismaClient,
    private readonly abiRegistry: AbiRegistry,
    private readonly managementDatabaseUrl?: string,
  ) {
    this.rpcManager = new RpcManager(config.rpcHttp);
    this.createClient();
    
    // 如果提供了管理数据库URL，初始化ClaimDataProcessor
    if (managementDatabaseUrl) {
      this.claimDataProcessor = new ClaimDataProcessor(managementDatabaseUrl);
    }
  }

  private createClient() {
    const rpcUrl = this.rpcManager.getCurrentRpcUrl();
    this.client = createPublicClient({
      transport: http(rpcUrl),
    });
    logger.info({ 
      chainId: this.config.chainId,
      rpcUrl 
    }, 'Created LogIndexer client with RPC URL');
  }

  // 获取指定区块范围的日志
  async getLogs(fromBlock: bigint, toBlock: bigint): Promise<Log[]> {
    const addresses = this.abiRegistry.getAllAddresses();

    // 如果地址为空，返回空数组
    if (addresses.length === 0) {
      logger.info(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'No addresses to monitor, returning empty logs'
      );
      return [];
    }

    // 检查是否使用 QuickNode
    const currentRpcUrl = this.client.transport.url;
    const isQuickNode = currentRpcUrl.includes('quiknode.pro');
    
    const logs: Log[] = [];
    
    if (isQuickNode) {
      // QuickNode 支持更复杂的查询，可以批量查询多个地址
      logger.debug(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          isQuickNode: true
        },
        'Using QuickNode, attempting batch query'
      );
      
      try {
        // 尝试批量查询所有地址
        const batchLogs = await this.getLogsInRange(fromBlock, toBlock, addresses);
        logs.push(...batchLogs);
        
        // QuickNode 延迟较短
        if (fromBlock < toBlock) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 0.5秒延迟
        }
      } catch (error) {
        logger.warn(
          {
            chainId: this.config.chainId,
            fromBlock: fromBlock.toString(),
            toBlock: toBlock.toString(),
            error: (error as any).message || error,
          },
          'QuickNode batch query failed, falling back to individual address queries'
        );
        
        // 如果批量查询失败，回退到逐个地址查询
        for (const address of addresses) {
          try {
            const addressLogs = await this.getLogsForAddress(fromBlock, toBlock, address);
            logs.push(...addressLogs);
            
            // QuickNode 延迟较短
            await new Promise(resolve => setTimeout(resolve, 200)); // 0.2秒延迟
          } catch (addrError) {
            logger.error(
              {
                chainId: this.config.chainId,
                fromBlock: fromBlock.toString(),
                toBlock: toBlock.toString(),
                address,
                error: addrError,
              },
              'Failed to get logs for address on QuickNode, skipping'
            );
          }
        }
      }
    } else {
      // 免费 RPC 需要逐个地址查询
      logger.debug(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          isQuickNode: false
        },
        'Using free RPC, using individual address queries'
      );
      
      // 对于免费RPC，完全跳过eth_getLogs，因为限制太严格
      // 改为在TxDecoder中处理交易receipt中的日志
      logger.debug(`Skipping eth_getLogs for free RPC (blocks ${fromBlock}-${toBlock})`);
      
      // 返回空数组，让TxDecoder处理交易receipt中的日志
      return [];
    }
    
    return logs;
  }

  // 获取单个地址的日志
  private async getLogsForAddress(fromBlock: bigint, toBlock: bigint, address: string): Promise<Log[]> {
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const logs = await this.client.getLogs({
          address: address as `0x${string}`,
          fromBlock,
          toBlock,
        });

        logger.debug(
          {
            chainId: this.config.chainId,
            fromBlock: fromBlock.toString(),
            toBlock: toBlock.toString(),
            address,
            logCount: logs.length,
            attempt,
          },
          'Retrieved logs for address'
        );

        return logs;
      } catch (error) {
        lastError = error;
        
        // 检查是否是速率限制错误
        const isRateLimitError = error && (
          (error as any).message?.includes('limit exceeded') ||
          (error as any).message?.includes('rate limit') ||
          (error as any).message?.includes('too many requests') ||
          (error as any).code === -32005
        );

        if (isRateLimitError) {
          const delay = Math.min(15000 * Math.pow(2, attempt - 1), 120000); // 指数退避，最大2分钟
          logger.warn(
            {
              chainId: this.config.chainId,
              fromBlock: fromBlock.toString(),
              toBlock: toBlock.toString(),
              address,
              attempt,
              delay,
              error: (error as any).message || error,
            },
            'Rate limit hit for address, retrying after delay'
          );
          
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // 重新创建客户端以使用不同的RPC节点
          if (attempt < maxRetries) {
            this.createClient();
          }
        } else {
          // 非速率限制错误，也尝试重新创建客户端
          if (attempt < maxRetries) {
            this.createClient();
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5秒延迟
          } else {
            throw error;
          }
        }
      }
    }

    // 所有重试都失败了
    logger.error(
      {
        chainId: this.config.chainId,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
        address,
        maxRetries,
        error: lastError,
      },
      'Failed to get logs for address after all retries'
    );
    throw lastError;
  }

  // 获取指定范围内的日志（内部方法）
  private async getLogsInRange(fromBlock: bigint, toBlock: bigint, addresses: string[]): Promise<Log[]> {
    const maxRetries = 5; // 增加重试次数
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 直接获取指定地址的所有日志，不使用事件过滤器
        const logs = await this.client.getLogs({
          address: addresses as `0x${string}`[],
          fromBlock,
          toBlock,
        });

        logger.info(
          {
            chainId: this.config.chainId,
            fromBlock: fromBlock.toString(),
            toBlock: toBlock.toString(),
            logCount: logs.length,
            addresses: addresses,
            attempt,
          },
          'Retrieved logs'
        );

        return logs;
      } catch (error) {
        lastError = error;
        
        // 检查是否是速率限制错误
        const isRateLimitError = error && (
          (error as any).message?.includes('limit exceeded') ||
          (error as any).message?.includes('rate limit') ||
          (error as any).message?.includes('too many requests') ||
          (error as any).code === -32005
        );

        if (isRateLimitError) {
          const delay = Math.min(10000 * Math.pow(2, attempt - 1), 60000); // 指数退避，最大60秒
          logger.warn(
            {
              chainId: this.config.chainId,
              fromBlock: fromBlock.toString(),
              toBlock: toBlock.toString(),
              attempt,
              delay,
              error: (error as any).message || error,
            },
            'Rate limit hit, retrying after delay'
          );
          
          // 在重试前等待更长时间
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // 如果是速率限制错误，尝试重新创建客户端以使用不同的RPC节点
          if (attempt < maxRetries) {
            this.createClient();
          }
        } else {
          // 非速率限制错误，也尝试重新创建客户端
          if (attempt < maxRetries) {
            this.createClient();
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2秒延迟
          } else {
            throw error;
          }
        }
      }
    }

    // 所有重试都失败了
    logger.error(
      {
        chainId: this.config.chainId,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
        maxRetries,
        error: lastError,
      },
      'Failed to get logs after all retries'
    );
    throw lastError;
  }

  // 处理单个区块
  async processBlock(block: any): Promise<number> {
    try {
      // 获取区块的日志
      const blockNumber = BigInt(block.number);
      const logs = await this.getLogs(blockNumber, blockNumber);
      const eventCount = await this.processLogs(logs);
      
      if (eventCount > 0) {
        logger.info(`Block ${block.number}: ${eventCount} events from ${logs.length} logs`);
      } else {
        logger.debug(`Block ${block.number}: 0 events from ${logs.length} logs`);
      }

      return eventCount;
    } catch (error) {
      logger.error(
        { 
          chainId: this.config.chainId, 
          blockNumber: block.number?.toString(),
          error 
        },
        'Failed to process block logs'
      );
      return 0;
    }
  }

  // 解析并存储日志
  async processLogs(logs: Log[]): Promise<number> {
    const events = [];

    for (const log of logs) {
      const contractAddress = log.address.toLowerCase();
      const iface = this.abiRegistry.getInterface(contractAddress);

      if (!iface) {
        logger.warn(
          { chainId: this.config.chainId, address: contractAddress },
          'No interface found for contract'
        );
        continue;
      }

      try {
        // 解析事件
        const event = iface.parseLog({
          topics: log.topics as string[],
          data: log.data,
        });

        if (!event) {
          logger.warn(
            {
              chainId: this.config.chainId,
              address: contractAddress,
              topics: log.topics,
            },
            'Failed to parse event'
          );
          continue;
        }

        // 准备事件数据
        const eventData = {
          chainId: this.config.chainId,
          blockNumber: log.blockNumber,
          txHash: log.transactionHash,
          logIndex: log.logIndex,
          contractAddress,
          eventName: event.name,
          eventSignature: event.signature,
          args: event.args,
          removed: log.removed || false,
          timestamp: new Date(Number(log.blockNumber || 0) * 1000),
        };

        events.push(eventData);

        // 处理特殊的claim事件
        await this.handleSpecialEvents(eventData, event);
      } catch (error) {
        logger.error(
          {
            chainId: this.config.chainId,
            address: contractAddress,
            txHash: log.transactionHash,
            topics: log.topics,
            data: log.data,
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
          },
          'Failed to process log'
        );
      }
    }

    // 批量保存事件
    if (events.length > 0) {
      await this.prisma.$transaction(
        events.map((event) =>
          this.prisma.event.upsert({
            where: {
              chainId_txHash_logIndex: {
                chainId: event.chainId,
                txHash: event.txHash || '',
                logIndex: event.logIndex || 0,
              },
            },
            create: {
              ...event,
              blockNumber: event.blockNumber || BigInt(0),
              txHash: event.txHash || '',
              logIndex: event.logIndex || 0,
            },
            update: {
              ...event,
              blockNumber: event.blockNumber || BigInt(0),
              txHash: event.txHash || '',
              logIndex: event.logIndex || 0,
            },
          })
        )
      );

      logger.info(
        {
          chainId: this.config.chainId,
          eventCount: events.length,
        },
        'Processed and saved events'
      );
    }

    return events.length;
  }

  // 处理特殊事件（如claim事件）
  private async handleSpecialEvents(eventData: any, event: any): Promise<void> {
    if (!this.claimDataProcessor) {
      return;
    }

    try {
      // 处理MeshClaimed事件
      if (event.name === 'MeshClaimed') {
        const { user, meshID, lon100, lat100, applyCount, heat, costBurned } = event.args;
        
        // 处理meshID，如果是对象则提取hash
        const meshIdString = typeof meshID === 'object' && meshID.hash ? meshID.hash : meshID;
        
        await this.claimDataProcessor.processMeshClaimedEvent({
          user,
          meshID: meshIdString,
          lon100,
          lat100,
          applyCount,
          heat,
          costBurned,
          blockNumber: eventData.blockNumber,
          txHash: eventData.txHash,
          timestamp: eventData.timestamp.getTime() / 1000, // 转换为秒
        });

        logger.info({
          eventName: event.name,
          user,
          meshID,
          heat: heat.toString(),
          costBurned: costBurned.toString()
        }, 'Processed MeshClaimed event for claim data');
      }
      // ClaimMint事件已废弃，不再处理
    } catch (error) {
      logger.error({
        error: (error as Error).message,
        eventName: event.name,
        eventData
      }, 'Failed to handle special event');
    }
  }

  // 清理资源
  async cleanup(): Promise<void> {
    if (this.claimDataProcessor) {
      await this.claimDataProcessor.cleanup();
    }
  }

  // 处理区块范围内的所有日志
  async indexBlockRange(fromBlock: bigint, toBlock: bigint) {
    logger.info(
      {
        chainId: this.config.chainId,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
      },
      'Indexing block range'
    );

    try {
      const logs = await this.getLogs(fromBlock, toBlock);
      await this.processLogs(logs);

      logger.info(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'Block range indexed successfully'
      );
    } catch (error) {
      logger.error(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          error,
        },
        'Failed to index block range'
      );
      throw error;
    }
  }
}



