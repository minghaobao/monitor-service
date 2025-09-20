#!/usr/bin/env node

import { config } from 'dotenv';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function main() {
  try {
    const networkName = process.env.MONITOR_NETWORK;
    if (!networkName) {
      logger.error('MONITOR_NETWORK environment variable is required');
      process.exit(1);
    }

    logger.info({ networkName }, 'Starting simple monitor service');

    // 模拟监控服务运行
    let blockNumber = 38000000;
    
    const interval = setInterval(async () => {
      try {
        // 模拟RPC调用
        const rpcUrls = [
          'https://data-seed-prebsc-1-s1.binance.org:8545',
          'https://data-seed-prebsc-2-s1.binance.org:8545',
          'https://data-seed-prebsc-1-s2.binance.org:8545',
        ];
        
        const rpcUrl = rpcUrls[Math.floor(Math.random() * rpcUrls.length)];
        
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
          if (data.result) {
            logger.info({ 
              networkName,
              blockNumber,
              rpcUrl,
              txCount: data.result.transactions?.length || 0
            }, 'Processed block');
            blockNumber++;
          } else {
            logger.warn({ networkName, blockNumber, rpcUrl }, 'No block data received');
          }
        } else {
          logger.warn({ networkName, blockNumber, rpcUrl, status: response.status }, 'RPC call failed');
        }
      } catch (error) {
        logger.error({ networkName, blockNumber, error: (error as any).message }, 'Error processing block');
      }
    }, 5000); // 每5秒处理一个区块

    logger.info({ networkName }, 'Simple monitor service started successfully');

    // 优雅退出处理
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Shutting down...');
      clearInterval(interval);
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Shutting down...');
      clearInterval(interval);
      process.exit(0);
    });

  } catch (error) {
    logger.error({ error }, 'Failed to start simple monitor service');
    process.exit(1);
  }
}

main();
