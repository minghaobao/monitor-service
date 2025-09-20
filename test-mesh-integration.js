#!/usr/bin/env node

// 测试mesh数据集成功能
import { ClaimDataProcessor } from './src/services/ClaimDataProcessor.js';
import { config } from 'dotenv';

// 加载环境变量
config();

async function testMeshIntegration() {
  const claimProcessor = new ClaimDataProcessor(process.env.MANAGEMENT_DATABASE_URL);
  
  try {
    console.log('🧪 测试Mesh数据集成功能...\n');
    
    // 模拟MeshClaimed事件数据
    const mockEventData = {
      user: '0x1234567890123456789012345678901234567890',
      meshID: 'test-mesh-001',
      lon100: 1200000, // 120.00度经度
      lat100: 300000,  // 30.00度纬度
      applyCount: 1,
      heat: BigInt('1000000000000000000'), // 1 ETH
      costBurned: BigInt('500000000000000000'), // 0.5 ETH
      blockNumber: BigInt(65619000),
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      timestamp: Math.floor(Date.now() / 1000),
    };

    console.log('1. 测试MeshClaimed事件处理:');
    console.log(`   用户地址: ${mockEventData.user}`);
    console.log(`   Mesh ID: ${mockEventData.meshID}`);
    console.log(`   经度: ${mockEventData.lon100 / 100}`);
    console.log(`   纬度: ${mockEventData.lat100 / 100}`);
    
    // 处理事件
    await claimProcessor.processMeshClaimedEvent(mockEventData);
    console.log('   ✅ MeshClaimed事件处理成功\n');

    // 模拟ClaimMesh函数调用数据
    const mockCallData = {
      from: '0x1234567890123456789012345678901234567890',
      args: {
        _meshID: 'test-mesh-002'
      },
      blockNumber: BigInt(65619001),
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      timestamp: Math.floor(Date.now() / 1000),
      status: true,
    };

    console.log('2. 测试ClaimMesh函数调用处理:');
    console.log(`   调用者: ${mockCallData.from}`);
    console.log(`   Mesh ID: ${mockCallData.args._meshID}`);
    
    // 处理函数调用
    await claimProcessor.processClaimMeshCall(mockCallData);
    console.log('   ✅ ClaimMesh函数调用处理成功\n');

    // 获取mesh统计信息
    console.log('3. 获取mesh统计信息:');
    const stats = await claimProcessor.getMeshStats();
    console.log(`   总mesh数: ${stats.totalMeshes}`);
    console.log(`   已claim的mesh数: ${stats.claimedMeshes}`);
    console.log(`   未claim的mesh数: ${stats.unclaimedMeshes}`);
    console.log(`   总claim记录数: ${stats.totalClaims}\n`);

    console.log('✅ 所有测试通过！Mesh数据集成功能正常工作。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  } finally {
    await claimProcessor.cleanup();
  }
}

testMeshIntegration();

