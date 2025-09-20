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

async function testBscSimple() {
  try {
    console.log('🔍 测试BSC测试网络简单启动（无数据库）...\n');

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');

    // 获取BSC测试网配置
    const bscTestnetConfig = loader.getNetworkConfig('bsc-testnet');
    console.log('📋 BSC测试网配置:');
    console.log(`  网络名称: ${bscTestnetConfig.name}`);
    console.log(`  Chain ID: ${bscTestnetConfig.chainId}`);
    console.log(`  RPC URL: ${bscTestnetConfig.rpcHttp}`);
    console.log(`  起始区块: ${bscTestnetConfig.startBlock}`);
    console.log(`  合约数量: ${bscTestnetConfig.contracts.length}`);

    // 显示合约信息
    console.log('\n📄 监控的合约:');
    bscTestnetConfig.contracts.forEach((contract, index) => {
      console.log(`  ${index + 1}. ${contract.name} (${contract.address})`);
    });

    // 测试RPC连接
    console.log('\n🌐 测试RPC连接...');
    try {
      const rpcUrl = Array.isArray(bscTestnetConfig.rpcHttp) 
        ? bscTestnetConfig.rpcHttp[0] 
        : bscTestnetConfig.rpcHttp;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const blockNumber = parseInt(data.result, 16);
        console.log(`✅ RPC连接成功，当前区块: ${blockNumber.toLocaleString()}`);
      } else {
        console.log(`❌ RPC连接失败: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ RPC连接错误: ${error.message}`);
    }

    // 测试ABI文件
    console.log('\n📁 测试ABI文件...');
    const fs = await import('fs');
    const path = await import('path');
    
    for (const contract of bscTestnetConfig.contracts) {
      if (contract.abiPath) {
        const abiPath = path.resolve(process.cwd(), contract.abiPath);
        try {
          const abiContent = fs.readFileSync(abiPath, 'utf-8');
          const abi = JSON.parse(abiContent);
          console.log(`✅ ${contract.name}: ${abi.length} 个ABI项`);
        } catch (error) {
          console.log(`❌ ${contract.name}: ABI文件读取失败 - ${error.message}`);
        }
      }
    }

    console.log('\n✅ BSC测试网络简单测试完成！');
    console.log('\n📝 下一步:');
    console.log('1. 确保数据库连接正常');
    console.log('2. 运行 "npm run sync-contracts" 同步合约地址');
    console.log('3. 运行 "npm run cli start --network bsc-testnet" 启动监控');

  } catch (error) {
    console.error('❌ 测试失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行测试
testBscSimple();
