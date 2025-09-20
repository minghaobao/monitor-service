import { config } from 'dotenv';
import { loadConfig, loadEnv, DEFAULT_BSC_CONFIG } from './config/index.js';
import { MonitorService } from './MonitorService.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

// 加载环境变量
config();
const env = loadEnv();

async function main() {
  try {
    // 加载配置（如果没有配置文件，使用默认 BSC 配置）
    const cfg = process.env.CONFIG_PATH
      ? loadConfig(process.env.CONFIG_PATH)
      : DEFAULT_BSC_CONFIG;

    // 获取数据库连接URL
    const managementDatabaseUrl = process.env.MANAGEMENT_DATABASE_URL;
    const monitorDatabaseUrl = process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

    // 创建监控服务实例
    const services = cfg.chains.map((chain: any) => 
      new MonitorService(
        chain, 
        managementDatabaseUrl, 
        monitorDatabaseUrl
      )
    );

    // 初始化所有服务
    await Promise.all(services.map((service: any) => service.init()));

    // 启动所有服务
    await Promise.all(services.map((service: any) => service.start()));

    // 优雅退出
    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Shutting down...');
      await Promise.all(services.map((service: any) => service.stop()));
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Shutting down...');
      await Promise.all(services.map((service: any) => service.stop()));
      process.exit(0);
    });
  } catch (error) {
    logger.error(error, 'Failed to start monitor service');
    process.exit(1);
  }
}

main();