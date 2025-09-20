#!/usr/bin/env node

import { config } from 'dotenv';
import { Command } from 'commander';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const program = new Command();

program
  .name('simple-monitor')
  .description('Simple NGP Monitor Service')
  .version('1.0.0');

// 启动监控服务
program
  .command('start')
  .description('Start the monitor service')
  .option('-n, --network <name>', 'Network name to start (e.g., bsc-testnet)')
  .option('--start-block <block>', 'Starting block height: number, "checkpoint", or "current"')
  .action(async (options) => {
    try {
      logger.info({
        network: options.network,
        startBlock: options.startBlock || 'checkpoint'
      }, 'Starting simple monitor service');

      // 这里可以添加简单的监控逻辑
      logger.info('Simple monitor service started successfully');
      
      // 保持进程运行
      process.on('SIGINT', () => {
        logger.info('Received SIGINT, shutting down gracefully');
        process.exit(0);
      });

      // 模拟监控循环
      setInterval(() => {
        logger.info('Monitor service is running...');
      }, 30000);

    } catch (error) {
      logger.error({ error }, 'Failed to start monitor service');
      process.exit(1);
    }
  });

program.parse();
