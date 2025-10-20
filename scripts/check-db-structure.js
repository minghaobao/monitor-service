import { PrismaClient } from '../src/generated/management-prisma/index.js';

const prisma = new PrismaClient();

async function checkDatabaseStructure() {
  try {
    console.log('🔍 检查数据库表结构...');
    
    // 尝试查询contract_status表
    const contracts = await prisma.contractStatus.findMany({
      take: 1
    });
    
    console.log('📋 contract_status表结构:', contracts);
    
    // 尝试查询所有字段
    const allContracts = await prisma.contractStatus.findMany();
    console.log('📊 所有合约记录:', allContracts);
    
  } catch (error) {
    console.error('❌ 查询失败:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseStructure();

