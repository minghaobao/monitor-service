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

async function demoMultiNetwork() {
  try {
    console.log('🚀 NGP Monitor Service 多网络监控演示\n');

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');

    // 显示所有可用网络
    console.log('📋 支持的区块链网络:');
    console.log('='.repeat(50));
    
    const summary = loader.getNetworkSummary();
    summary.forEach((network, index) => {
      const status = '🔴 未运行';
      console.log(`${index + 1}. ${network.name.padEnd(15)} | Chain ID: ${network.chainId.toString().padEnd(8)} | 合约: ${network.contractCount.toString().padEnd(2)} | ${status}`);
    });

    // 显示BSC网络详细信息
    console.log('\n🔍 BSC主网详细配置:');
    console.log('-'.repeat(40));
    const bscConfig = loader.getNetworkConfig('bsc');
    console.log(`网络名称: ${bscConfig.name}`);
    console.log(`Chain ID: ${bscConfig.chainId}`);
    console.log(`RPC URL: ${bscConfig.rpcHttp}`);
    console.log(`起始区块: ${bscConfig.startBlock.toLocaleString()}`);
    console.log(`确认数: ${bscConfig.confirmations}`);
    console.log(`扫描跨度: ${bscConfig.scanBlockSpan.toLocaleString()}`);
    console.log(`并发请求: ${bscConfig.parallelRequests}`);
    console.log(`监控合约:`);
    bscConfig.contracts.forEach((contract, index) => {
      console.log(`  ${index + 1}. ${contract.name} (${contract.address})`);
    });

    // 显示Polygon网络详细信息
    console.log('\n🔍 Polygon主网详细配置:');
    console.log('-'.repeat(40));
    const polygonConfig = loader.getNetworkConfig('polygon');
    console.log(`网络名称: ${polygonConfig.name}`);
    console.log(`Chain ID: ${polygonConfig.chainId}`);
    console.log(`RPC URL: ${polygonConfig.rpcHttp}`);
    console.log(`起始区块: ${polygonConfig.startBlock.toLocaleString()}`);
    console.log(`确认数: ${polygonConfig.confirmations}`);
    console.log(`扫描跨度: ${polygonConfig.scanBlockSpan.toLocaleString()}`);
    console.log(`并发请求: ${polygonConfig.parallelRequests}`);
    console.log(`监控合约:`);
    polygonConfig.contracts.forEach((contract, index) => {
      console.log(`  ${index + 1}. ${contract.name} (${contract.address})`);
    });

    // 显示使用示例
    console.log('\n💡 使用示例:');
    console.log('='.repeat(50));
    console.log('# 启动单个网络:');
    console.log('npm run start:bsc');
    console.log('npm run start:polygon');
    console.log('npm run cli start --network ethereum');
    console.log('');
    console.log('# 启动多个网络:');
    console.log('npm run cli start --networks "bsc,polygon,ethereum"');
    console.log('npm run start:all');
    console.log('');
    console.log('# 网络管理:');
    console.log('npm run network          # 查看网络状态');
    console.log('npm run stop:all         # 停止所有网络');
    console.log('npm run restart:all      # 重启所有网络');
    console.log('');
    console.log('# 使用PM2管理:');
    console.log('npm run pm2:start        # 启动所有网络');
    console.log('npm run pm2:status       # 查看状态');
    console.log('npm run pm2:logs         # 查看日志');

    // 显示API接口
    console.log('\n🌐 API接口:');
    console.log('='.repeat(50));
    console.log('GET /api/networks        # 获取网络列表');
    console.log('GET /api/contracts       # 获取合约列表');
    console.log('GET /api/contracts?chainId=56  # 获取BSC网络合约');
    console.log('GET /api/events/latest   # 获取最新事件');
    console.log('GET /api/events/latest?chainId=56  # 获取BSC网络事件');
    console.log('GET /api/stats           # 获取统计信息');

    console.log('\n✅ 多网络监控系统演示完成！');
    console.log('\n📝 下一步:');
    console.log('1. 设置数据库连接URL');
    console.log('2. 运行 "npm run sync-contracts" 同步合约地址');
    console.log('3. 运行 "npm run start:bsc" 启动BSC网络监控');
    console.log('4. 运行 "npm run api" 启动API服务');

  } catch (error) {
    logger.error({ error }, '多网络监控演示失败');
    process.exit(1);
  }
}

// 运行演示
demoMultiNetwork();
