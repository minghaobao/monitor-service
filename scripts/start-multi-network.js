#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// 支持的网络列表
const networks = ['bsc', 'bsc-testnet', 'polygon', 'ethereum'];

// 启动参数
const args = process.argv.slice(2);
const selectedNetworks = args.length > 0 ? args : networks;

console.log('🚀 启动多网络扫描程序...');
console.log('📋 目标网络:', selectedNetworks.join(', '));

// 存储子进程
const processes = new Map();

// 启动单个网络的扫描程序
function startNetwork(network) {
  console.log(`\n🔄 启动 ${network} 网络扫描程序...`);
  
  const child = spawn('tsx', ['src/cli.ts', 'start', '--network', network], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const processInfo = {
    network,
    pid: child.pid,
    startTime: new Date().toISOString(),
    status: 'starting',
    logs: []
  };

  processes.set(network, processInfo);

  child.stdout.on('data', (data) => {
    const log = data.toString().trim();
    processInfo.logs.push(`[OUT] ${log}`);
    console.log(`[${network.toUpperCase()}] ${log}`);
  });

  child.stderr.on('data', (data) => {
    const log = data.toString().trim();
    processInfo.logs.push(`[ERR] ${log}`);
    console.error(`[${network.toUpperCase()}] ${log}`);
    processInfo.status = 'error';
  });

  child.on('close', (code) => {
    console.log(`\n[${network.toUpperCase()}] 进程退出，代码: ${code}`);
    processInfo.status = code === 0 ? 'stopped' : 'error';
    processInfo.endTime = new Date().toISOString();
    
    if (code !== 0) {
      console.error(`❌ ${network} 网络扫描程序异常退出`);
    }
  });

  child.on('error', (err) => {
    console.error(`❌ ${network} 网络扫描程序启动失败:`, err.message);
    processInfo.status = 'error';
    processInfo.error = err.message;
  });

  // 等待一段时间再启动下一个网络
  setTimeout(() => {
    processInfo.status = 'running';
    console.log(`✅ ${network} 网络扫描程序已启动 (PID: ${child.pid})`);
  }, 2000);
}

// 启动所有网络
function startAllNetworks() {
  selectedNetworks.forEach((network, index) => {
    setTimeout(() => {
      startNetwork(network);
    }, index * 5000); // 每个网络间隔5秒启动
  });
}

// 优雅关闭
function gracefulShutdown() {
  console.log('\n🛑 正在关闭多网络扫描程序...');
  
  processes.forEach((processInfo, network) => {
    if (processInfo.status === 'running') {
      console.log(`🔄 关闭 ${network} 网络扫描程序...`);
      try {
        process.kill(processInfo.pid, 'SIGTERM');
      } catch (err) {
        console.error(`❌ 关闭 ${network} 失败:`, err.message);
      }
    }
  });

  setTimeout(() => {
    console.log('✅ 所有网络扫描程序已关闭');
    process.exit(0);
  }, 5000);
}

// 监听退出信号
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// 定期显示状态
setInterval(() => {
  console.log('\n📊 网络状态:');
  processes.forEach((processInfo, network) => {
    const status = processInfo.status === 'running' ? '🟢' : 
                   processInfo.status === 'error' ? '❌' : '🔴';
    console.log(`  ${status} ${network}: ${processInfo.status} (PID: ${processInfo.pid || 'N/A'})`);
  });
}, 30000); // 每30秒显示一次状态

// 启动所有网络
startAllNetworks();

console.log('\n💡 提示:');
console.log('  - 按 Ctrl+C 优雅关闭所有扫描程序');
console.log('  - 查看日志文件: logs/');
console.log('  - 状态更新: 每30秒显示一次');
