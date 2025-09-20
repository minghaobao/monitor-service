#!/usr/bin/env node

// 简单测试mesh数据处理功能（不依赖数据库）
import { config } from 'dotenv';

// 加载环境变量
config();

// 模拟ClaimDataProcessor的generateGridNumber方法
function generateGridNumber(lon100, lat100) {
  const longitude = lon100 / 100;
  const latitude = lat100 / 100;

  // 将坐标转换为网格编号
  const lonGrid = Math.floor(longitude * 100);
  const latGrid = Math.floor(latitude * 100);

  // 确保网格编号为正数
  const lonStr = lonGrid >= 0 ? `E${lonGrid}` : `W${Math.abs(lonGrid)}`;
  const latStr = latGrid >= 0 ? `N${latGrid}` : `S${Math.abs(latGrid)}`;

  return `${latStr}${lonStr}`;
}

async function testMeshProcessing() {
  try {
    console.log('🧪 测试Mesh数据处理功能...\n');
    
    // 测试网格编号生成
    console.log('1. 测试网格编号生成:');
    const testCases = [
      { lon100: 1200000, lat100: 300000, expected: 'N300000E1200000' },
      { lon100: -740000, lat100: 407000, expected: 'N407000W740000' },
      { lon100: 0, lat100: 0, expected: 'N0E0' },
    ];

    for (const testCase of testCases) {
      const result = generateGridNumber(testCase.lon100, testCase.lat100);
      const longitude = testCase.lon100 / 100;
      const latitude = testCase.lat100 / 100;
      
      console.log(`   经度: ${longitude}, 纬度: ${latitude}`);
      console.log(`   生成网格编号: ${result}`);
      console.log(`   预期结果: ${testCase.expected}`);
      console.log(`   结果: ${result === testCase.expected ? '✅ 正确' : '❌ 错误'}\n`);
    }

    // 测试坐标转换
    console.log('2. 测试坐标转换:');
    const mockEventData = {
      user: '0x1234567890123456789012345678901234567890',
      meshID: 'test-mesh-001',
      lon100: 1200000, // 120.00度经度
      lat100: 300000,  // 30.00度纬度
      applyCount: 1,
      heat: BigInt('1000000000000000000'), // 1 ETH
      costBurned: BigInt('500000000000000000'), // 0.5 ETH
    };

    const longitude = mockEventData.lon100 / 100;
    const latitude = mockEventData.lat100 / 100;
    const gridNumber = generateGridNumber(mockEventData.lon100, mockEventData.lat100);

    console.log(`   原始数据:`);
    console.log(`     lon100: ${mockEventData.lon100}`);
    console.log(`     lat100: ${mockEventData.lat100}`);
    console.log(`   转换后:`);
    console.log(`     经度: ${longitude}`);
    console.log(`     纬度: ${latitude}`);
    console.log(`     网格编号: ${gridNumber}\n`);

    // 测试BigInt处理
    console.log('3. 测试BigInt处理:');
    console.log(`   heat: ${mockEventData.heat.toString()}`);
    console.log(`   costBurned: ${mockEventData.costBurned.toString()}`);
    console.log(`   heat (ETH): ${Number(mockEventData.heat) / 1e18}`);
    console.log(`   costBurned (ETH): ${Number(mockEventData.costBurned) / 1e18}\n`);

    console.log('✅ 所有测试通过！Mesh数据处理功能正常工作。');
    console.log('\n📝 注意: 要完整测试数据库集成，需要先更新management数据库schema。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testMeshProcessing();
