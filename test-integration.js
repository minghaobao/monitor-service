#!/usr/bin/env node

/**
 * 集成测试脚本
 * 测试monitor-service与management系统的集成
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始NGP Monitor Service集成测试...\n');

// 检查环境变量
function checkEnvironment() {
  console.log('📋 检查环境变量...');
  
  const requiredEnvVars = [
    'MANAGEMENT_DATABASE_URL',
    'MONITOR_DATABASE_URL'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ 缺少必需的环境变量:', missing.join(', '));
    console.error('请设置以下环境变量:');
    missing.forEach(envVar => {
      console.error(`  ${envVar}=your_database_url`);
    });
    process.exit(1);
  }
  
  console.log('✅ 环境变量检查通过\n');
}

// 检查依赖
function checkDependencies() {
  console.log('📦 检查依赖...');
  
  try {
    execSync('npm list @prisma/client', { stdio: 'pipe' });
    execSync('npm list commander', { stdio: 'pipe' });
    execSync('npm list ethers', { stdio: 'pipe' });
    console.log('✅ 依赖检查通过\n');
  } catch (error) {
    console.error('❌ 依赖检查失败:', error.message);
    console.error('请运行: npm install');
    process.exit(1);
  }
}

// 构建项目
function buildProject() {
  console.log('🔨 构建项目...');
  
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ 项目构建成功\n');
  } catch (error) {
    console.error('❌ 项目构建失败:', error.message);
    process.exit(1);
  }
}

// 测试合约同步
function testContractSync() {
  console.log('🔄 测试合约同步...');
  
  try {
    const output = execSync('npm run sync-contracts', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log('✅ 合约同步成功');
    console.log('输出:', output);
  } catch (error) {
    console.error('❌ 合约同步失败:', error.message);
    console.error('错误输出:', error.stdout || error.stderr);
    return false;
  }
  
  console.log('');
  return true;
}

// 测试合约列表
function testContractList() {
  console.log('📋 测试合约列表...');
  
  try {
    const output = execSync('npm run list-contracts', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log('✅ 合约列表获取成功');
    console.log('输出:', output);
  } catch (error) {
    console.error('❌ 合约列表获取失败:', error.message);
    console.error('错误输出:', error.stdout || error.stderr);
    return false;
  }
  
  console.log('');
  return true;
}

// 测试配置验证
function testConfigValidation() {
  console.log('⚙️ 测试配置验证...');
  
  const configPath = 'config.dynamic.json';
  if (!fs.existsSync(configPath)) {
    console.error('❌ 配置文件不存在:', configPath);
    return false;
  }
  
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // 验证必需的配置字段
    const requiredFields = ['chain', 'contracts'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ 配置文件缺少必需字段:', missingFields.join(', '));
      return false;
    }
    
    // 验证链配置
    const chainRequiredFields = ['name', 'chainId', 'rpcHttp', 'startBlock'];
    const missingChainFields = chainRequiredFields.filter(field => !config.chain[field]);
    
    if (missingChainFields.length > 0) {
      console.error('❌ 链配置缺少必需字段:', missingChainFields.join(', '));
      return false;
    }
    
    console.log('✅ 配置验证通过');
    console.log(`  链: ${config.chain.name} (ID: ${config.chain.chainId})`);
    console.log(`  合约数量: ${config.contracts.length}`);
    
  } catch (error) {
    console.error('❌ 配置文件解析失败:', error.message);
    return false;
  }
  
  console.log('');
  return true;
}

// 主测试流程
async function runTests() {
  try {
    checkEnvironment();
    checkDependencies();
    buildProject();
    
    if (!testConfigValidation()) {
      process.exit(1);
    }
    
    if (!testContractSync()) {
      console.log('⚠️ 合约同步失败，但继续其他测试...');
    }
    
    if (!testContractList()) {
      console.log('⚠️ 合约列表获取失败，但继续其他测试...');
    }
    
    console.log('🎉 集成测试完成！');
    console.log('\n📝 下一步:');
    console.log('1. 确保management数据库中有已部署的合约记录');
    console.log('2. 运行 "npm run dev" 启动监控服务');
    console.log('3. 检查日志输出确认服务正常运行');
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 运行测试
runTests();
