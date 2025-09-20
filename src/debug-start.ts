#!/usr/bin/env node

import { config } from 'dotenv';
import { MultiNetworkManager } from './MultiNetworkManager.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function debugStart() {
  try {
    console.log('🔍 调试BSC测试网络启动...\n');

    const managementDatabaseUrl = "mysql://root:123456@localhost:3306/ngp_management";
    const monitorDatabaseUrl = "mysql://root:123456@localhost:3306/ngp_monitor";

    console.log('📋 数据库连接信息:');
    console.log(`Management DB: ${managementDatabaseUrl}`);
    console.log(`Monitor DB: ${monitorDatabaseUrl}\n`);

    // 创建多网络管理器
    const multiNetworkManager = new MultiNetworkManager(
      'config/multi-network.json',
      managementDatabaseUrl,
      monitorDatabaseUrl
    );

    // 检查网络配置
    console.log('🌐 检查网络配置...');
    const networkNames = multiNetworkManager['multiNetworkLoader'].getNetworkNames();
    console.log('可用网络:', networkNames);

    const hasBscTestnet = multiNetworkManager['multiNetworkLoader'].hasNetwork('bsc-testnet');
    console.log('BSC测试网配置存在:', hasBscTestnet);

    if (hasBscTestnet) {
      const bscTestnetConfig = multiNetworkManager['multiNetworkLoader'].getNetworkConfig('bsc-testnet');
      console.log('BSC测试网配置:', {
        name: bscTestnetConfig.name,
        chainId: bscTestnetConfig.chainId,
        rpcHttp: bscTestnetConfig.rpcHttp,
        contracts: bscTestnetConfig.contracts.length
      });
    }

    // 尝试启动BSC测试网
    console.log('\n🚀 尝试启动BSC测试网...');
    try {
      await multiNetworkManager.startNetwork('bsc-testnet');
      console.log('✅ BSC测试网启动成功！');
    } catch (error) {
      console.error('❌ BSC测试网启动失败:');
      console.error('错误类型:', error.constructor.name);
      console.error('错误消息:', error.message);
      console.error('错误堆栈:', error.stack);
    }

  } catch (error) {
    console.error('❌ 调试过程失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行调试
debugStart();
