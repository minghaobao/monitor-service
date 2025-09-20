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

async function startBscTestnet() {
  try {
    console.log('🚀 启动BSC测试网络监控（简化版）...\n');

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');

    // 获取BSC测试网配置
    const bscTestnetConfig = loader.getNetworkConfig('bsc-testnet');
    
    console.log('📋 启动配置:');
    console.log(`  网络: ${bscTestnetConfig.name}`);
    console.log(`  Chain ID: ${bscTestnetConfig.chainId}`);
    console.log(`  RPC: ${bscTestnetConfig.rpcHttp}`);
    console.log(`  起始区块: ${bscTestnetConfig.startBlock.toLocaleString()}`);
    console.log(`  监控合约: ${bscTestnetConfig.contracts.length} 个\n`);

    // 显示监控的合约
    console.log('📄 监控的合约:');
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
        
        // 计算需要扫描的区块范围
        const startBlock = bscTestnetConfig.startBlock;
        const blocksToScan = blockNumber - startBlock;
        console.log(`📊 需要扫描的区块: ${blocksToScan.toLocaleString()} 个`);
        
        if (blocksToScan > 0) {
          console.log(`📈 扫描进度: 0% (${startBlock.toLocaleString()} -> ${blockNumber.toLocaleString()})`);
        }
      } else {
        console.log(`❌ RPC连接失败: ${response.status} ${response.statusText}`);
        return;
      }
    } catch (error) {
      console.log(`❌ RPC连接错误: ${error.message}`);
      return;
    }

    // 模拟监控过程
    console.log('\n🔄 开始监控过程...');
    console.log('⚠️  注意: 这是简化版本，不包含数据库操作');
    console.log('   要完整监控，需要:');
    console.log('   1. 设置正确的数据库连接');
    console.log('   2. 同步合约地址');
    console.log('   3. 运行完整的监控服务');

    // 模拟扫描几个区块
    console.log('\n📊 模拟区块扫描:');
    for (let i = 0; i < 5; i++) {
      const blockNumber = bscTestnetConfig.startBlock + i * 1000;
      console.log(`  扫描区块 ${blockNumber.toLocaleString()}...`);
      
      // 模拟扫描延迟
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 模拟找到事件
      if (Math.random() > 0.7) {
        console.log(`    ✅ 发现事件 (模拟)`);
      }
    }

    console.log('\n✅ BSC测试网络监控启动完成！');
    console.log('\n📝 要启动完整监控服务:');
    console.log('1. 确保数据库连接正常');
    console.log('2. 运行: npm run sync-contracts');
    console.log('3. 运行: npm run cli start --network bsc-testnet');

  } catch (error) {
    console.error('❌ 启动失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行启动
startBscTestnet();
