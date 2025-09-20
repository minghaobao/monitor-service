#!/usr/bin/env node

import { config } from 'dotenv';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import { MonitorService } from './MonitorService.js';
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

    const managementDatabaseUrl = process.env.MANAGEMENT_DATABASE_URL;
    const monitorDatabaseUrl = process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

    logger.info({ 
      networkName,
      managementDatabaseUrl: !!managementDatabaseUrl,
      monitorDatabaseUrl: !!monitorDatabaseUrl
    }, 'Starting monitor service');

    // 加载配置
    const loader = new MultiNetworkLoader('config/multi-network.json');
    const networkConfig = loader.getNetworkConfig(networkName);

    // 创建监控服务
    const service = new MonitorService(
      networkConfig,
      managementDatabaseUrl,
      monitorDatabaseUrl
    );

    // 初始化并启动
    await service.init();
    await service.start();

    logger.info({ networkName }, 'Monitor service started successfully');

    // 优雅退出处理
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Shutting down...');
      await service.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Shutting down...');
      await service.stop();
      process.exit(0);
    });

  } catch (error) {
    logger.error({ error }, 'Failed to start monitor service');
    process.exit(1);
  }
}

main();
