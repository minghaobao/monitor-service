import { createPublicClient, http, webSocket, PublicClient } from 'viem';
import { ChainConfig } from '../config/types.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { RpcManager } from '../utils/RpcManager.js';
import { LogIndexer } from '../indexer/LogIndexer.js';
import { TxDecoder } from '../indexer/TxDecoder.js';
import pino from 'pino';

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: true,
        },
        level: 'info'
      },
      {
        target: 'pino/file',
        options: {
          destination: `./logs/block-scanner.log`
        },
        level: 'info'
      }
    ]
  },
  level: 'info',
});

export class BlockScanner {
  private httpClient!: PublicClient;
  private wsClient?: PublicClient;
  private lastProcessedBlock: bigint;
  private isScanning = false;
  private rpcManager: RpcManager;
  private statusTimer?: NodeJS.Timeout;
  private startTime: number = 0;
  private totalBlocksProcessed: number = 0;
  private totalEventsProcessed: number = 0;
  private totalCallsProcessed: number = 0;

  constructor(
    private readonly config: ChainConfig,
    private readonly prisma: PrismaClient,
    private readonly logIndexer?: LogIndexer,
    private readonly txDecoder?: TxDecoder,
  ) {
    this.rpcManager = new RpcManager(config.rpcHttp);
    this.createHttpClient();

    if (config.rpcWs) {
      this.wsClient = createPublicClient({
        transport: webSocket(config.rpcWs),
      });
    }

    this.lastProcessedBlock = BigInt(config.startBlock);
  }

  private createHttpClient() {
    const rpcUrl = this.rpcManager.getCurrentRpcUrl();
    this.httpClient = createPublicClient({
      transport: http(rpcUrl),
    });
    logger.debug(`HTTP client created for chain ${this.config.chainId}`);
  }

  private async handleRpcError(error: any, operation: string) {
    const currentUrl = this.rpcManager.getCurrentRpcUrl();
    this.rpcManager.markRpcFailed(currentUrl, error);
    
    logger.warn(`RPC error in ${operation}: ${error.message || error}`);

    // 创建新的HTTP客户端
    this.createHttpClient();
  }

  private async getBlockWithRetry(blockNumber: bigint) {
    try {
      const block = await this.httpClient.getBlock({
        blockNumber,
        includeTransactions: true,
      });
      this.rpcManager.markRpcSuccess(this.rpcManager.getCurrentRpcUrl());
      return block;
    } catch (error) {
      await this.handleRpcError(error, `getBlock(${blockNumber})`);
      // 重试一次
      return await this.httpClient.getBlock({
        blockNumber,
        includeTransactions: true,
      });
    }
  }

  // 加载检查点
  async loadCheckpoint() {
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: {
        chainId: this.config.chainId,
      },
    });

    if (checkpoint) {
      this.lastProcessedBlock = checkpoint.lastProcessedBlock;
      logger.info(
        { chainId: this.config.chainId, block: this.lastProcessedBlock.toString() },
        'Loaded checkpoint'
      );
    }
  }

  // 保存检查点
  private async saveCheckpoint(blockNumber: bigint) {
    await this.prisma.checkpoint.upsert({
      where: {
        chainId: this.config.chainId,
      },
      create: {
        chainId: this.config.chainId,
        lastProcessedBlock: blockNumber,
      },
      update: {
        lastProcessedBlock: blockNumber,
      },
    });

    this.lastProcessedBlock = blockNumber;
  }

  // 获取最后处理的区块
  getLastProcessedBlock(): bigint {
    return this.lastProcessedBlock;
  }

  // 设置最后处理的区块
  async setLastProcessedBlock(blockNumber: bigint) {
    this.lastProcessedBlock = blockNumber;
    await this.saveCheckpoint(blockNumber);
  }

  // 获取最新区块
  async getLatestBlock(): Promise<bigint> {
    try {
      const blockNumber = await this.httpClient.getBlockNumber();
      this.rpcManager.markRpcSuccess(this.rpcManager.getCurrentRpcUrl());
      return blockNumber;
    } catch (error) {
      await this.handleRpcError(error, 'getLatestBlock');
      // 重试一次
      return await this.httpClient.getBlockNumber();
    }
  }

  // 扫描指定区块范围
  async scanBlockRange(fromBlock: bigint, toBlock: bigint) {
    logger.debug(`Scanning blocks ${fromBlock}-${toBlock}`);

    try {
      // 检查是否使用 QuickNode
      const currentRpcUrl = this.httpClient.transport.url;
      const isQuickNode = currentRpcUrl.includes('quiknode.pro');
      
      // 减少批处理大小以避免RPC限制错误
      const batchSize = isQuickNode ? 2 : 1; // 减少QuickNode批处理大小
      const totalBlocks = Number(toBlock - fromBlock + BigInt(1));
      const blocks: any[] = [];

      logger.debug(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          batchSize,
          isQuickNode
        },
        'Processing blocks with optimized batch size'
      );

      for (let i = 0; i < totalBlocks; i += batchSize) {
        const batchEnd = Math.min(i + batchSize, totalBlocks);
        
        if (isQuickNode && batchSize > 1) {
          // QuickNode 支持批量处理
          try {
            const batchPromises = Array.from({ length: batchEnd - i }, (_, j) => {
              const blockNumber = fromBlock + BigInt(i + j);
              return this.getBlockWithRetry(blockNumber);
            });
            
            const batchBlocks = await Promise.all(batchPromises);
            blocks.push(...batchBlocks);
            
            // QuickNode 延迟较短
            if (i + batchSize < totalBlocks) {
              await new Promise(resolve => setTimeout(resolve, 500)); // 增加延迟到0.5秒
            }
          } catch (error) {
            logger.warn(
              {
                chainId: this.config.chainId,
                batchStart: i,
                batchEnd: batchEnd - 1,
                error: error instanceof Error ? error.message : String(error),
              },
              'QuickNode batch processing failed, falling back to individual blocks'
            );
            
            // 回退到单个区块处理
            for (let j = i; j < batchEnd; j++) {
              try {
                const blockNumber = fromBlock + BigInt(j);
                const block = await this.getBlockWithRetry(blockNumber);
                blocks.push(block);
                
                await new Promise(resolve => setTimeout(resolve, 500)); // 增加延迟到0.5秒
              } catch (singleError) {
                logger.error(
                  { 
                    chainId: this.config.chainId, 
                    blockNumber: (fromBlock + BigInt(j)).toString(),
                    error: singleError 
                  },
                  'Failed to process single block on QuickNode, skipping'
                );
              }
            }
          }
        } else {
          // 免费 RPC 或单个区块处理
          for (let j = i; j < batchEnd; j++) {
            try {
              const blockNumber = fromBlock + BigInt(j);
              const block = await this.getBlockWithRetry(blockNumber);
              blocks.push(block);
              
              // 添加延迟以避免RPC速率限制
              const delay = isQuickNode ? 500 : 1500; // 增加延迟时间
              if (j < totalBlocks - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
              }
            } catch (error) {
              logger.error(
                { 
                  chainId: this.config.chainId, 
                  blockNumber: (fromBlock + BigInt(j)).toString(),
                  error 
                },
                'Failed to process single block, skipping'
              );
              
              // 如果单个区块失败，等待更长时间再继续
              const errorDelay = isQuickNode ? 2000 : 5000; // 增加错误延迟时间
              await new Promise(resolve => setTimeout(resolve, errorDelay));
            }
          }
        }
      }

      // 处理事件和函数调用，并筛选出包含相关活动的区块
      const relevantBlocks = await this.processEventsAndCalls(blocks);

      // 只保存包含相关合约活动的区块
      if (relevantBlocks.length > 0) {
        await this.prisma.$transaction(
          relevantBlocks.map((block) => 
            this.prisma.block.upsert({
              where: {
                chainId_blockNumber: {
                  chainId: this.config.chainId,
                  blockNumber: block.number,
                },
              },
              create: {
                chainId: this.config.chainId,
                blockNumber: block.number,
                blockHash: block.hash,
                parentHash: block.parentHash,
                timestamp: new Date(Number(block.timestamp) * 1000),
                finalized: false,
                gasUsed: block.gasUsed || 0n,
                gasLimit: block.gasLimit || 0n,
                size: Number(block.size) || 0,
                txCount: block.transactions?.length || 0,
              },
              update: {
                blockHash: block.hash,
                parentHash: block.parentHash,
                timestamp: new Date(Number(block.timestamp) * 1000),
                gasUsed: block.gasUsed || 0n,
                gasLimit: block.gasLimit || 0n,
                size: Number(block.size) || 0,
                txCount: block.transactions?.length || 0,
              },
            })
          )
        );

        logger.info(
          { 
            chainId: this.config.chainId, 
            totalBlocks: blocks.length,
            relevantBlocks: relevantBlocks.length,
            fromBlock: fromBlock.toString(), 
            toBlock: toBlock.toString() 
          },
          'Saved relevant blocks to database'
        );
      } else {
        logger.debug(`No relevant blocks in ${blocks.length} blocks, skipping save`);
      }

      // 保存检查点
      await this.saveCheckpoint(toBlock);

      logger.debug(`Block range ${fromBlock}-${toBlock} scanned successfully`);
    } catch (error) {
      logger.error(
        { 
          chainId: this.config.chainId, 
          fromBlock: fromBlock.toString(), 
          toBlock: toBlock.toString(),
          error 
        },
        'Failed to scan block range'
      );
      throw error;
    }
  }

  // 处理事件和函数调用，返回包含相关活动的区块
  private async processEventsAndCalls(blocks: any[]): Promise<any[]> {
    if (!this.logIndexer || !this.txDecoder) {
      logger.warn({ chainId: this.config.chainId }, 'LogIndexer or TxDecoder not available, skipping event and call processing');
      return [];
    }

    const relevantBlocks: any[] = [];

    try {
      // 处理每个区块的事件和函数调用
      for (const block of blocks) {
        let hasRelevantActivity = false;

        // 处理事件
        const eventCount = await this.logIndexer.processBlock(block);
        if (eventCount > 0) {
          hasRelevantActivity = true;
          this.totalEventsProcessed += eventCount;
        }
        
        // 处理函数调用
        const callCount = await this.txDecoder.processBlock(block);
        if (callCount > 0) {
          hasRelevantActivity = true;
          this.totalCallsProcessed += callCount;
        }

        // 更新总区块数
        this.totalBlocksProcessed++;

        // 如果区块包含相关活动，添加到相关区块列表
        if (hasRelevantActivity) {
          relevantBlocks.push(block);
          logger.debug(
            { 
              chainId: this.config.chainId, 
              blockNumber: block.number.toString(),
              eventCount,
              callCount
            },
            'Block contains relevant activity'
          );
        }
      }
      
      logger.debug(
        { 
          chainId: this.config.chainId, 
          totalBlocks: blocks.length,
          relevantBlocks: relevantBlocks.length,
          fromBlock: blocks[0]?.number?.toString(),
          toBlock: blocks[blocks.length - 1]?.number?.toString()
        },
        'Processed events and function calls for blocks'
      );
    } catch (error) {
      logger.error(
        { 
          chainId: this.config.chainId, 
          error,
          blockCount: blocks.length
        },
        'Failed to process events and function calls'
      );
      // 不抛出错误，继续处理其他区块
    }

    return relevantBlocks;
  }

  // 启动状态报告定时器
  private startStatusTimer() {
    this.statusTimer = setInterval(() => {
      this.logStatus();
    }, 60000); // 60秒 (1分钟)
  }

  // 停止状态报告定时器
  private stopStatusTimer() {
    if (this.statusTimer) {
      clearInterval(this.statusTimer);
      this.statusTimer = undefined;
    }
  }

  // 记录状态信息
  private logStatus() {
    if (!this.isScanning) {
      return;
    }

    const currentTime = Date.now();
    const uptime = Math.floor((currentTime - this.startTime) / 1000);
    const rpcStatus = this.rpcManager.getStatus();
    
    // 格式化运行时间
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    const uptimeStr = hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : 
                      minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    
    // 创建友好的状态消息
    const statusMessage = `📊 扫描进度 | 当前区块: ${this.lastProcessedBlock.toString()} | ` +
                         `已处理: ${this.totalBlocksProcessed} 区块, ${this.totalEventsProcessed} 事件 | ` +
                         `运行时间: ${uptimeStr} | RPC: ${rpcStatus.isUsingQuickNode ? 'QuickNode' : 'Free'}`;
    
    // 输出到控制台和日志
    console.log(statusMessage);
    
    logger.info({
      network: this.config.name,
      chainId: this.config.chainId,
      currentBlock: this.lastProcessedBlock.toString(),
      uptime: `${uptime}s`,
      totalBlocks: this.totalBlocksProcessed,
      totalEvents: this.totalEventsProcessed,
      totalCalls: this.totalCallsProcessed,
      rpcStatus: {
        isUsingQuickNode: rpcStatus.isUsingQuickNode,
        freeNodeCount: rpcStatus.freeNodeCount,
        quicknodeCount: rpcStatus.quicknodeCount,
        failedUrls: rpcStatus.failedUrls.length
      }
    }, statusMessage);
  }

  // 启动扫描
  async startScanning() {
    if (this.isScanning) {
      return;
    }

    this.isScanning = true;
    this.startTime = Date.now();
    this.totalBlocksProcessed = 0;
    this.totalEventsProcessed = 0;
    this.totalCallsProcessed = 0;
    
    this.startStatusTimer();
    logger.info({ chainId: this.config.chainId }, 'Starting block scanner');

    try {
      while (this.isScanning) {
        const latestBlock = await this.getLatestBlock();
        const confirmedBlock = latestBlock - BigInt(this.config.confirmations);

        // 如果没有新的已确认区块，等待
        if (confirmedBlock <= this.lastProcessedBlock) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        // 计算本次扫描范围
        const fromBlock = this.lastProcessedBlock + BigInt(1);
        const toBlock = confirmedBlock;
        const span = BigInt(this.config.scanBlockSpan);

        // 分批扫描
        for (let start = fromBlock; start <= toBlock; start += span) {
          const end = start + span - BigInt(1) > toBlock ? toBlock : start + span - BigInt(1);
          await this.scanBlockRange(start, end);
        }
      }
    } catch (error) {
      logger.error(
        { chainId: this.config.chainId, error },
        'Block scanner encountered an error'
      );
      this.isScanning = false;
      throw error;
    }
  }

  // 停止扫描
  async stopScanning() {
    this.isScanning = false;
    this.stopStatusTimer();
    logger.info({ chainId: this.config.chainId }, 'Stopping block scanner');
  }

  // 检查区块重组
  async checkReorg(blockNumber: bigint, blockHash: string): Promise<boolean> {
    const block = await this.prisma.block.findUnique({
      where: {
        chainId_blockNumber: {
          chainId: this.config.chainId,
          blockNumber,
        },
      },
    });

    if (!block) {
      return false;
    }

    if (block.blockHash !== blockHash) {
      logger.warn(
        {
          chainId: this.config.chainId,
          blockNumber: blockNumber.toString(),
          storedHash: block.blockHash,
          newHash: blockHash,
        },
        'Block reorganization detected'
      );

      // 记录异常
      await this.prisma.anomaly.create({
        data: {
          chainId: this.config.chainId,
          type: 'reorg',
          key: blockNumber.toString(),
          details: {
            oldHash: block.blockHash,
            newHash: blockHash,
          },
        },
      });

      return true;
    }

    return false;
  }
}


