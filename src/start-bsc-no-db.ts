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

async function startBscNoDb() {
  try {
    console.log('🚀 启动BSC测试网络监控（无数据库版本）...\n');

    // 创建多网络加载器
    const loader = new MultiNetworkLoader('config/multi-network.json');

    // 获取BSC测试网配置
    const bscTestnetConfig = loader.getNetworkConfig('bsc-testnet');
    
    console.log('📋 监控配置:');
    console.log(`  网络: ${bscTestnetConfig.name}`);
    console.log(`  Chain ID: ${bscTestnetConfig.chainId}`);
    console.log(`  RPC: ${bscTestnetConfig.rpcHttp}`);
    console.log(`  起始区块: ${bscTestnetConfig.startBlock.toLocaleString()}`);
    console.log(`  确认数: ${bscTestnetConfig.confirmations}`);
    console.log(`  扫描跨度: ${bscTestnetConfig.scanBlockSpan}`);
    console.log(`  并发请求: ${bscTestnetConfig.parallelRequests}\n`);

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

    // 开始监控循环
    console.log('\n🔄 开始监控循环...');
    console.log('⚠️  注意: 这是无数据库版本，只显示监控过程');
    
    let currentBlock = bscTestnetConfig.startBlock;
    const maxBlock = bscTestnetConfig.startBlock + 10000; // 只扫描10000个区块作为演示
    
    while (currentBlock < maxBlock) {
      try {
        // 获取区块信息
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
            method: 'eth_getBlockByNumber',
            params: [`0x${currentBlock.toString(16)}`, true],
            id: 1,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const block = data.result;
          
          if (block) {
            console.log(`📦 扫描区块 ${currentBlock.toLocaleString()}: ${block.transactions.length} 个交易`);
            
            // 检查是否有我们监控的合约的交易
            for (const tx of block.transactions) {
              for (const contract of bscTestnetConfig.contracts) {
                if (tx.to && tx.to.toLowerCase() === contract.address.toLowerCase()) {
                  console.log(`  ✅ 发现 ${contract.name} 合约交易: ${tx.hash}`);
                }
              }
            }
          }
        }
        
        currentBlock += bscTestnetConfig.scanBlockSpan;
        
        // 添加延迟避免请求过快
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.log(`❌ 扫描区块 ${currentBlock} 时出错: ${error.message}`);
        break;
      }
    }

    console.log('\n✅ BSC测试网络监控演示完成！');
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
startBscNoDb();
