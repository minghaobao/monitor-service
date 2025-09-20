#!/usr/bin/env node

import { config } from 'dotenv';
import { PrismaClient } from './generated/prisma/index.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

async function testDbConnection() {
  try {
    console.log('🔍 测试数据库连接...\n');

    const managementUrl = process.env.MANAGEMENT_DATABASE_URL;
    const monitorUrl = process.env.MONITOR_DATABASE_URL;

    console.log('📋 数据库连接信息:');
    console.log(`Management DB: ${managementUrl}`);
    console.log(`Monitor DB: ${monitorUrl}\n`);

    // 测试Management数据库连接
    console.log('🔍 测试Management数据库连接...');
    const managementPrisma = new PrismaClient({
      datasources: {
        db: {
          url: managementUrl,
        },
      },
    });

    try {
      const contracts = await managementPrisma.contractStatus.findMany({
        take: 5,
        select: {
          contract_name: true,
          contract_address: true,
          network: true,
          is_paused: true,
        }
      });

      console.log('✅ Management数据库连接成功！');
      console.log('📄 找到的合约:');
      contracts.forEach((contract, index) => {
        console.log(`  ${index + 1}. ${contract.contract_name} (${contract.contract_address}) - ${contract.network}`);
      });

      await managementPrisma.$disconnect();
    } catch (error) {
      console.log('❌ Management数据库连接失败:');
      console.log('错误类型:', error.constructor.name);
      console.log('错误消息:', error.message);
    }

    // 测试Monitor数据库连接
    console.log('\n🔍 测试Monitor数据库连接...');
    const monitorPrisma = new PrismaClient({
      datasources: {
        db: {
          url: monitorUrl,
        },
      },
    });

    try {
      const contracts = await monitorPrisma.contract.findMany({
        take: 5,
        select: {
          chainId: true,
          address: true,
          name: true,
        }
      });

      console.log('✅ Monitor数据库连接成功！');
      console.log('📄 监控的合约:');
      contracts.forEach((contract, index) => {
        console.log(`  ${index + 1}. ${contract.name} (${contract.address}) - Chain ID: ${contract.chainId}`);
      });

      await monitorPrisma.$disconnect();
    } catch (error) {
      console.log('❌ Monitor数据库连接失败:');
      console.log('错误类型:', error.constructor.name);
      console.log('错误消息:', error.message);
    }

  } catch (error) {
    console.error('❌ 测试失败:');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行测试
testDbConnection();
