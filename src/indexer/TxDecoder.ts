import { createPublicClient, http, Transaction, TransactionReceipt } from 'viem';
import { ChainConfig } from '../config/types.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { AbiRegistry } from '../registry/abi.js';
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

export class TxDecoder {
  private client: ReturnType<typeof createPublicClient>;
  private claimDataProcessor?: ClaimDataProcessor;

  constructor(
    private readonly config: ChainConfig,
    private readonly prisma: PrismaClient,
    private readonly abiRegistry: AbiRegistry,
    private readonly managementDatabaseUrl?: string,
  ) {
    const rpcUrl = Array.isArray(config.rpcHttp) ? config.rpcHttp[0] : config.rpcHttp;
    this.client = createPublicClient({
      chain: {
        id: config.chainId,
        name: config.name,
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: [rpcUrl],
          },
        },
      },
      transport: http(rpcUrl),
    });

    // 如果提供了管理数据库URL，初始化ClaimDataProcessor
    if (managementDatabaseUrl) {
      this.claimDataProcessor = new ClaimDataProcessor(managementDatabaseUrl);
    }
  }

  // 获取区块内的交易
  async getBlockTransactions(blockNumber: bigint): Promise<Transaction[]> {
    try {
      const block = await this.client.getBlock({
        blockNumber,
        includeTransactions: true,
      });

      const transactions = block.transactions as Transaction[];

      logger.info(
        {
          chainId: this.config.chainId,
          blockNumber: blockNumber.toString(),
          txCount: transactions.length,
        },
        'Retrieved block transactions'
      );

      return transactions;
    } catch (error) {
      logger.error(
        {
          chainId: this.config.chainId,
          blockNumber: blockNumber.toString(),
          error,
        },
        'Failed to get block transactions'
      );
      throw error;
    }
  }

  // 获取交易回执
  async getTransactionReceipt(txHash: string): Promise<TransactionReceipt> {
    try {
      const receipt = await this.client.getTransactionReceipt({
        hash: txHash as `0x${string}`,
      });

      return receipt;
    } catch (error) {
      logger.error(
        {
          chainId: this.config.chainId,
          txHash,
          error,
        },
        'Failed to get transaction receipt'
      );
      throw error;
    }
  }

  // 处理单个区块
  async processBlock(block: any): Promise<number> {
    try {
      // 从区块中提取交易
      const transactions = block.transactions || [];
      
      // 确保时间戳存在，如果不存在则使用当前时间
      const blockTimestamp = block.timestamp || BigInt(Math.floor(Date.now() / 1000));
      const callCount = await this.processTransactions(transactions, blockTimestamp);
      
      logger.debug(
        { 
          chainId: this.config.chainId, 
          blockNumber: block.number?.toString(),
          txCount: transactions.length,
          callCount
        },
        'Processed block transactions'
      );

      return callCount;
    } catch (error) {
      logger.error(
        { 
          chainId: this.config.chainId, 
          blockNumber: block.number?.toString(),
          error 
        },
        'Failed to process block transactions'
      );
      return 0;
    }
  }

  // 解析并存储交易
  async processTransactions(transactions: Transaction[], blockTimestamp: bigint): Promise<number> {
    const functionCalls = [];
    const monitoredAddresses = new Set(this.abiRegistry.getAllAddresses());

    for (const tx of transactions) {
      // 跳过没有 to 地址的交易（合约创建）
      if (!tx.to) continue;

      const toAddress = tx.to.toLowerCase();

      // 只处理监控的合约
      if (!monitoredAddresses.has(toAddress)) continue;

      try {
        const iface = this.abiRegistry.getInterface(toAddress);
        if (!iface) continue;

        // 获取交易回执
        const receipt = await this.getTransactionReceipt(tx.hash);

        // 处理交易receipt中的事件日志
        const timestamp = new Date(Number(blockTimestamp) * 1000);
        await this.processTransactionLogs(receipt, timestamp);

        // 解析方法调用
        const methodSig = tx.input.slice(0, 10); // 4 bytes function selector
        const method = iface.getFunction(methodSig);

        if (!method) {
          logger.warn(
            {
              chainId: this.config.chainId,
              txHash: tx.hash,
              methodSig,
            },
            'Unknown method signature'
          );
          continue;
        }

        // 解析参数
        const args = iface.decodeFunctionData(method, tx.input);

        // 准备函数调用数据
        const callData = {
          chainId: this.config.chainId,
          blockNumber: tx.blockNumber!,
          txHash: tx.hash,
          contractAddress: toAddress,
          methodName: method.name,
          methodSignature: method.format(),
          args: this.serializeArgs(args), // 序列化参数，处理BigInt
          from: tx.from.toLowerCase(),
          value: tx.value.toString(),
          status: receipt.status === 'success',
          gasUsed: receipt.gasUsed,
          timestamp: new Date(Number(blockTimestamp) * 1000),
        };

        functionCalls.push(callData);

        // 处理特殊的claim函数调用
        await this.handleSpecialCalls(callData);
      } catch (error) {
        logger.warn(`Failed to process tx ${tx.hash}: ${error.message || error}`);
      }
    }

    // 批量保存函数调用
    if (functionCalls.length > 0) {
      try {
        await this.prisma.$transaction(
          functionCalls.map((call) =>
            this.prisma.functionCall.upsert({
              where: {
                chainId_txHash: {
                  chainId: call.chainId,
                  txHash: call.txHash,
                },
              },
              create: call,
              update: call,
            })
          )
        );
      } catch (error) {
        logger.warn(`Failed to save function calls: ${error.message || error}`);
        // 如果批量保存失败，尝试逐个保存
        for (const call of functionCalls) {
          try {
            await this.prisma.functionCall.upsert({
              where: {
                chainId_txHash: {
                  chainId: call.chainId,
                  txHash: call.txHash,
                },
              },
              create: call,
              update: call,
            });
          } catch (singleError) {
            logger.debug(`Failed to save single function call: ${singleError.message || singleError}`);
          }
        }
      }

      logger.info(
        {
          chainId: this.config.chainId,
          callCount: functionCalls.length,
        },
        'Processed and saved function calls'
      );
    }

    return functionCalls.length;
  }

  // 处理特殊函数调用（如claimMints）
  private async handleSpecialCalls(callData: any): Promise<void> {
    if (!this.claimDataProcessor) {
      return;
    }

    try {
      // 处理claimMesh函数调用
      if (callData.methodName === 'claimMesh') {
        await this.claimDataProcessor.processClaimMeshCall({
          from: callData.from,
          args: callData.args,
          blockNumber: callData.blockNumber,
          txHash: callData.txHash,
          timestamp: callData.timestamp.getTime() / 1000, // 转换为秒
          status: callData.status,
        });

        logger.info({
          methodName: callData.methodName,
          from: callData.from,
          meshId: callData.args._meshID,
          txHash: callData.txHash,
          status: callData.status
        }, 'Processed claimMesh call for claim data');
      }
      // 处理claimMints函数调用
      else if (callData.methodName === 'claimMints') {
        await this.claimDataProcessor.processClaimMintsCall({
          from: callData.from,
          blockNumber: callData.blockNumber,
          txHash: callData.txHash,
          timestamp: callData.timestamp.getTime() / 1000, // 转换为秒
          status: callData.status,
        });

        logger.info({
          methodName: callData.methodName,
          from: callData.from,
          txHash: callData.txHash,
          status: callData.status
        }, 'Processed claimMints call for claim data');
      }
    } catch (error) {
      logger.error({
        error: (error as Error).message,
        methodName: callData.methodName,
        callData
      }, 'Failed to handle special call');
    }
  }

  // 处理交易receipt中的事件日志
  async processTransactionLogs(receipt: TransactionReceipt, timestamp: Date): Promise<void> {
    try {
      const events = [];

      for (const log of receipt.logs) {
        const contractAddress = log.address.toLowerCase();
        const iface = this.abiRegistry.getInterface(contractAddress);

        if (!iface) {
          continue;
        }

        try {
          // 解析事件
          const event = iface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          });

          if (!event) {
            continue;
          }

          // 构建事件数据，处理BigInt类型，只包含schema中存在的字段
          const eventData = {
            chainId: this.config.chainId,
            blockNumber: Number(log.blockNumber),
            txHash: log.transactionHash || '',
            logIndex: Number(log.logIndex),
            contractAddress: log.address.toLowerCase(),
            eventName: event.name,
            eventSignature: event.signature,
            args: this.serializeArgs(event.args), // 序列化参数，处理BigInt
            removed: log.removed || false,
            timestamp: timestamp,
          };

          events.push(eventData);

          // 处理特殊的claim事件
          if (this.claimDataProcessor && event.name === 'MeshClaimed') {
            const { user, meshID, lon100, lat100, applyCount, heat, costBurned } = event.args;
            
            await this.claimDataProcessor.processMeshClaimedEvent({
              user,
              meshID,
              lon100,
              lat100,
              applyCount,
              heat,
              costBurned,
              blockNumber: Number(log.blockNumber),
              txHash: log.transactionHash || '',
              timestamp: timestamp.getTime() / 1000, // 转换为秒
            });

            logger.info({
              eventName: event.name,
              user,
              meshID,
              heat: heat.toString(),
              costBurned: costBurned.toString(),
              txHash: log.transactionHash
            }, 'Processed MeshClaimed event for claim data');
          }
        } catch (error) {
          logger.debug(`Failed to process log from ${contractAddress}: ${error.message || error}`);
        }
      }

      // 批量保存事件
      if (events.length > 0) {
        try {
          await this.prisma.$transaction(
            events.map((event) =>
              this.prisma.event.upsert({
                where: {
                  chainId_txHash_logIndex: {
                    chainId: event.chainId,
                    txHash: event.txHash,
                    logIndex: event.logIndex,
                  },
                },
                update: {},
                create: event,
              })
            )
          );
        } catch (error) {
          logger.warn(`Failed to save events for tx ${receipt.transactionHash}: ${error.message || error}`);
          // 如果批量保存失败，尝试逐个保存
          for (const event of events) {
            try {
              await this.prisma.event.upsert({
                where: {
                  chainId_txHash_logIndex: {
                    chainId: event.chainId,
                    txHash: event.txHash,
                    logIndex: event.logIndex,
                  },
                },
                update: {},
                create: event,
              });
            } catch (singleError) {
              logger.debug(`Failed to save single event: ${singleError.message || singleError}`);
            }
          }
        }

        logger.info(
          { 
            chainId: this.config.chainId, 
            eventCount: events.length,
            txHash: receipt.transactionHash
          },
          'Processed and saved transaction events'
        );
      }
    } catch (error) {
      logger.error(
        {
          chainId: this.config.chainId,
          txHash: receipt.transactionHash,
          error,
        },
        'Failed to process transaction logs'
      );
    }
  }

  // 序列化参数，处理BigInt类型
  private serializeArgs(args: any): any {
    if (args === null || args === undefined) {
      return args;
    }
    
    if (typeof args === 'bigint') {
      return args.toString();
    }
    
    if (Array.isArray(args)) {
      return args.map(arg => this.serializeArgs(arg));
    }
    
    if (typeof args === 'object') {
      const serialized: any = {};
      for (const [key, value] of Object.entries(args)) {
        serialized[key] = this.serializeArgs(value);
      }
      return serialized;
    }
    
    return args;
  }

  // 清理资源
  async cleanup(): Promise<void> {
    if (this.claimDataProcessor) {
      await this.claimDataProcessor.cleanup();
    }
  }

  // 处理区块范围内的所有交易
  async decodeBlockRange(fromBlock: bigint, toBlock: bigint) {
    logger.debug(`Decoding blocks ${fromBlock}-${toBlock}`);

    try {
      // 分批处理区块，避免RPC速率限制
      const batchSize = 1; // BSC testnet 限制很严格，每次只处理1个区块
      const totalBlocks = Number(toBlock - fromBlock + BigInt(1));
      
      for (let i = 0; i < totalBlocks; i += batchSize) {
        const batchEnd = Math.min(i + batchSize, totalBlocks);
        
        for (let j = i; j < batchEnd; j++) {
          const blockNumber = fromBlock + BigInt(j);
          
          try {
            const block = await this.client.getBlock({ blockNumber });
            const transactions = await this.getBlockTransactions(blockNumber);
            await this.processTransactions(transactions, block.timestamp);
            
            // 添加延迟以避免RPC速率限制
            if (j < totalBlocks - 1) {
              await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5秒延迟
            }
          } catch (error) {
            logger.error(
              {
                chainId: this.config.chainId,
                blockNumber: blockNumber.toString(),
                error,
              },
              'Failed to process block, skipping'
            );
            
            // 如果单个区块失败，等待更长时间再继续
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3秒延迟
          }
        }
      }

      logger.info(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
        },
        'Block range decoded successfully'
      );
    } catch (error) {
      logger.error(
        {
          chainId: this.config.chainId,
          fromBlock: fromBlock.toString(),
          toBlock: toBlock.toString(),
          error,
        },
        'Failed to decode block range'
      );
      throw error;
    }
  }
}


