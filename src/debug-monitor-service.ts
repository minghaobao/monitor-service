#!/usr/bin/env node

import { config } from 'dotenv';
import { MonitorService } from './MonitorService.js';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function debugMonitorService() {
  try {
    console.log('🔍 调试MonitorService初始化...\n');

    const managementUrl = process.env.MANAGEMENT_DATABASE_URL;
    const monitorUrl = process.env.MONITOR_DATABASE_URL;

    console.log('📋 数据库连接信息:');
    console.log(`Management DB: ${managementUrl}`);
    console.log(`Monitor DB: ${monitorUrl}\n`);

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');
    const bscTestnetConfig = loader.getNetworkConfig('bsc-testnet');

    console.log('📋 BSC测试网配置:');
    console.log(`  网络: ${bscTestnetConfig.name}`);
    console.log(`  Chain ID: ${bscTestnetConfig.chainId}`);
    console.log(`  RPC: ${bscTestnetConfig.rpcHttp}`);
    console.log(`  合约数量: ${bscTestnetConfig.contracts.length}\n`);

    // 测试MonitorService初始化
    console.log('🔍 测试MonitorService初始化...');
    try {
      const monitorService = new MonitorService(
        bscTestnetConfig,
        managementUrl,
        monitorUrl
      );

      console.log('✅ MonitorService创建成功！');

      // 测试初始化
      console.log('🔍 测试MonitorService初始化...');
      await monitorService.init();
      console.log('✅ MonitorService初始化成功！');

      // 测试启动
      console.log('🔍 测试MonitorService启动...');
      await monitorService.start();
      console.log('✅ MonitorService启动成功！');

      // 等待几秒钟
      console.log('⏳ 等待5秒钟...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      // 停止服务
      console.log('🔍 停止MonitorService...');
      await monitorService.stop();
      console.log('✅ MonitorService停止成功！');

    } catch (error) {
      console.log('❌ MonitorService操作失败:');
      console.log('错误类型:', (error as any).constructor.name);
      console.log('错误消息:', (error as any).message);
      console.log('错误堆栈:', (error as any).stack);
    }

  } catch (error) {
    console.error('❌ 调试失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行调试
debugMonitorService();

