#!/usr/bin/env node

import { config } from 'dotenv';
import { ContractSyncService } from './services/ContractSyncService.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function testContractSync() {
  try {
    console.log('🔍 测试合约同步功能...\n');

    const managementUrl = process.env.MANAGEMENT_DATABASE_URL;
    const monitorUrl = process.env.MONITOR_DATABASE_URL;

    console.log('📋 数据库连接信息:');
    console.log(`Management DB: ${managementUrl}`);
    console.log(`Monitor DB: ${monitorUrl}\n`);

    // 创建合约同步服务
    const syncService = new ContractSyncService(managementUrl!, monitorUrl!);

    // 测试获取已部署的合约
    console.log('🔍 测试获取已部署的合约...');
    try {
      const contracts = await syncService.getDeployedContracts();
      console.log('✅ 成功获取已部署的合约！');
      console.log(`📄 找到 ${contracts.length} 个合约:`);
      contracts.forEach((contract, index) => {
        console.log(`  ${index + 1}. ${contract.name} (${contract.address}) - ${contract.network} - Chain ID: ${contract.chainId}`);
      });
    } catch (error) {
      console.log('❌ 获取已部署的合约失败:');
      console.log('错误类型:', error.constructor.name);
      console.log('错误消息:', error.message);
      console.log('错误堆栈:', error.stack);
      return;
    }

    // 测试同步合约到监控数据库
    console.log('\n🔍 测试同步合约到监控数据库...');
    try {
      const contracts = await syncService.getDeployedContracts();
      await syncService.syncContractsToMonitor(contracts);
      console.log('✅ 成功同步合约到监控数据库！');
    } catch (error) {
      console.log('❌ 同步合约到监控数据库失败:');
      console.log('错误类型:', error.constructor.name);
      console.log('错误消息:', error.message);
      console.log('错误堆栈:', error.stack);
    }

    // 清理连接
    await syncService.disconnect();

  } catch (error) {
    console.error('❌ 测试失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行测试
testContractSync();
