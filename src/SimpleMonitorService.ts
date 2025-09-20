import { ChainConfig } from './config/types.js';
import { AbiRegistry } from './registry/abi.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export class SimpleMonitorService {
  private abiRegistry!: AbiRegistry;
  private currentConfig: ChainConfig;
  private isRunning: boolean = false;
  private scanInterval: NodeJS.Timeout | null = null;

  constructor(private readonly baseConfig: ChainConfig) {
    this.currentConfig = baseConfig;
    this.initializeComponents();
  }

  private initializeComponents() {
    this.abiRegistry = new AbiRegistry(this.currentConfig.contracts);
  }

  async init() {
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Initializing simple monitor service'
    );

    // 测试RPC连接
    await this.testRpcConnection();
  }

  private async testRpcConnection() {
    try {
      const rpcUrl = Array.isArray(this.currentConfig.rpcHttp) 
        ? this.currentConfig.rpcHttp[0] 
        : this.currentConfig.rpcHttp;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const blockNumber = parseInt(data.result, 16);
        logger.info(
          { 
            chainId: this.currentConfig.chainId,
            currentBlock: blockNumber,
            startBlock: this.currentConfig.startBlock 
          },
          'RPC connection successful'
        );
      } else {
        throw new Error(`RPC connection failed: ${response.status}`);
      }
    } catch (error) {
      logger.error({ error }, 'RPC connection failed');
      throw error;
    }
  }

  async start() {
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Starting simple monitor service'
    );

    this.isRunning = true;
    this.startScanning();
  }

  private startScanning() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
    }

    this.scanInterval = setInterval(async () => {
      if (this.isRunning) {
        await this.scanBlock();
      }
    }, 5000); // 每5秒扫描一次
  }

  private async scanBlock() {
    try {
      // 获取当前区块
      const rpcUrl = Array.isArray(this.currentConfig.rpcHttp) 
        ? this.currentConfig.rpcHttp[0] 
        : this.currentConfig.rpcHttp;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const currentBlock = parseInt(data.result, 16);
        
        // 扫描最近的几个区块
        const startBlock = Math.max(
          this.currentConfig.startBlock,
          currentBlock - this.currentConfig.scanBlockSpan
        );

        for (let blockNumber = startBlock; blockNumber <= currentBlock; blockNumber++) {
          await this.scanSingleBlock(blockNumber);
        }
      }
    } catch (error) {
      logger.error({ error }, 'Failed to scan block');
    }
  }

  private async scanSingleBlock(blockNumber: number) {
    try {
      const rpcUrl = Array.isArray(this.currentConfig.rpcHttp) 
        ? this.currentConfig.rpcHttp[0] 
        : this.currentConfig.rpcHttp;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBlockByNumber',
          params: [`0x${blockNumber.toString(16)}`, true],
          id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const block = data.result;
        
        if (block && block.transactions) {
          let contractTxCount = 0;
          
          // 检查是否有我们监控的合约的交易
          for (const tx of block.transactions) {
            for (const contract of this.currentConfig.contracts) {
              if (tx.to && tx.to.toLowerCase() === contract.address.toLowerCase()) {
                contractTxCount++;
                logger.info(
                  {
                    chainId: this.currentConfig.chainId,
                    blockNumber,
                    contractName: contract.name,
                    txHash: tx.hash,
                    from: tx.from,
                    to: tx.to
                  },
                  'Found contract transaction'
                );
              }
            }
          }

          if (contractTxCount > 0) {
            logger.info(
              {
                chainId: this.currentConfig.chainId,
                blockNumber,
                totalTxs: block.transactions.length,
                contractTxs: contractTxCount
              },
              'Block scan completed'
            );
          }
        }
      }
    } catch (error) {
      logger.error({ blockNumber, error }, 'Failed to scan single block');
    }
  }

  async stop() {
    logger.info(
      { chainId: this.currentConfig.chainId, chainName: this.currentConfig.name },
      'Stopping simple monitor service'
    );

    this.isRunning = false;
    
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
  }
}
