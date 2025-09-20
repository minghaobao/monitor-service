#!/usr/bin/env node

import { config } from 'dotenv';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function testMultiNetwork() {
  try {
    console.log('🌐 测试多网络配置加载...\n');

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');

    // 获取所有网络名称
    const networkNames = loader.getNetworkNames();
    console.log('📋 可用的网络:', networkNames);

    // 获取网络摘要
    const summary = loader.getNetworkSummary();
    console.log('\n📊 网络摘要:');
    summary.forEach(network => {
      console.log(`  ${network.name.padEnd(15)} | Chain ID: ${network.chainId.toString().padEnd(8)} | 合约数量: ${network.contractCount}`);
    });

    // 测试获取特定网络配置
    console.log('\n🔍 测试BSC网络配置:');
    const bscConfig = loader.getNetworkConfig('bsc');
    console.log(`  网络名称: ${bscConfig.name}`);
    console.log(`  Chain ID: ${bscConfig.chainId}`);
    console.log(`  RPC URL: ${bscConfig.rpcHttp}`);
    console.log(`  起始区块: ${bscConfig.startBlock}`);
    console.log(`  合约数量: ${bscConfig.contracts.length}`);

    // 测试获取多个网络配置
    console.log('\n🔍 测试多个网络配置:');
    const multiConfigs = loader.getNetworkConfigs(['bsc', 'polygon']);
    multiConfigs.forEach(config => {
      console.log(`  ${config.name}: ${config.contracts.length} 个合约`);
    });

    console.log('\n✅ 多网络配置测试完成！');

  } catch (error) {
    logger.error({ error }, '多网络配置测试失败');
    process.exit(1);
  }
}

// 运行测试
testMultiNetwork();
