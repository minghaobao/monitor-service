#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PM2Manager {
  constructor() {
    this.ecosystemFile = path.join(__dirname, '..', 'ecosystem.config.cjs');
    this.logsDir = path.join(__dirname, '..', 'logs');
    
    // 确保日志目录存在
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  // 启动所有进程（但都处于停止状态）
  startAll() {
    console.log('🚀 Starting all monitor processes (stopped by default)...');
    try {
      execSync(`pm2 start ${this.ecosystemFile} --no-autorestart`, { stdio: 'inherit' });
      console.log('✅ All processes started in stopped state');
      this.showStatus();
    } catch (error) {
      console.error('❌ Failed to start processes:', error.message);
    }
  }

  // 停止所有进程
  stopAll() {
    console.log('🛑 Stopping all monitor processes...');
    try {
      execSync('pm2 stop all', { stdio: 'inherit' });
      console.log('✅ All processes stopped');
    } catch (error) {
      console.error('❌ Failed to stop processes:', error.message);
    }
  }

  // 重启所有进程
  restartAll() {
    console.log('🔄 Restarting all monitor processes...');
    try {
      execSync('pm2 restart all', { stdio: 'inherit' });
      console.log('✅ All processes restarted');
    } catch (error) {
      console.error('❌ Failed to restart processes:', error.message);
    }
  }

  // 删除所有进程
  deleteAll() {
    console.log('🗑️  Deleting all monitor processes...');
    try {
      execSync('pm2 delete all', { stdio: 'inherit' });
      console.log('✅ All processes deleted');
    } catch (error) {
      console.error('❌ Failed to delete processes:', error.message);
    }
  }

  // 启动指定网络
  startNetwork(network) {
    console.log(`🚀 Starting ${network} monitor...`);
    try {
      execSync(`pm2 start ${network}`, { stdio: 'inherit' });
      console.log(`✅ ${network} monitor started`);
    } catch (error) {
      console.error(`❌ Failed to start ${network}:`, error.message);
    }
  }

  // 停止指定网络
  stopNetwork(network) {
    console.log(`🛑 Stopping ${network} monitor...`);
    try {
      execSync(`pm2 stop ${network}`, { stdio: 'inherit' });
      console.log(`✅ ${network} monitor stopped`);
    } catch (error) {
      console.error(`❌ Failed to stop ${network}:`, error.message);
    }
  }

  // 重启指定网络
  restartNetwork(network) {
    console.log(`🔄 Restarting ${network} monitor...`);
    try {
      execSync(`pm2 restart ${network}`, { stdio: 'inherit' });
      console.log(`✅ ${network} monitor restarted`);
    } catch (error) {
      console.error(`❌ Failed to restart ${network}:`, error.message);
    }
  }

  // 显示状态
  showStatus() {
    console.log('\n📊 Current PM2 Status:');
    try {
      execSync('pm2 status', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Failed to get status:', error.message);
    }
  }

  // 显示日志
  showLogs(network, lines = 50) {
    console.log(`📋 Showing logs for ${network} (last ${lines} lines):`);
    try {
      execSync(`pm2 logs ${network} --lines ${lines}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Failed to show logs for ${network}:`, error.message);
    }
  }

  // 显示所有日志
  showAllLogs(lines = 50) {
    console.log(`📋 Showing all logs (last ${lines} lines):`);
    try {
      execSync(`pm2 logs --lines ${lines}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Failed to show logs:', error.message);
    }
  }

  // 监控
  monitor() {
    console.log('📊 Starting PM2 monitoring...');
    try {
      execSync('pm2 monit', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Failed to start monitoring:', error.message);
    }
  }
}

// CLI处理
const args = process.argv.slice(2);
const command = args[0];
const network = args[1];

const manager = new PM2Manager();

switch (command) {
  case 'start-all':
    manager.startAll();
    break;
  case 'stop-all':
    manager.stopAll();
    break;
  case 'restart-all':
    manager.restartAll();
    break;
  case 'delete-all':
    manager.deleteAll();
    break;
  case 'start':
    if (!network) {
      console.error('❌ Please specify a network name');
      process.exit(1);
    }
    manager.startNetwork(network);
    break;
  case 'stop':
    if (!network) {
      console.error('❌ Please specify a network name');
      process.exit(1);
    }
    manager.stopNetwork(network);
    break;
  case 'restart':
    if (!network) {
      console.error('❌ Please specify a network name');
      process.exit(1);
    }
    manager.restartNetwork(network);
    break;
  case 'status':
    manager.showStatus();
    break;
  case 'logs':
    if (network) {
      manager.showLogs(network, parseInt(args[2]) || 50);
    } else {
      manager.showAllLogs(parseInt(args[1]) || 50);
    }
    break;
  case 'monitor':
    manager.monitor();
    break;
  default:
    console.log(`
🔧 PM2 Manager for NGP Monitor Service

Usage:
  node scripts/pm2-manager.js <command> [network] [options]

Commands:
  start-all                    Start all processes (stopped by default)
  stop-all                     Stop all processes
  restart-all                   Restart all processes
  delete-all                    Delete all processes
  start <network>              Start specific network
  stop <network>               Stop specific network
  restart <network>            Restart specific network
  status                       Show process status
  logs [network] [lines]       Show logs (default: 50 lines)
  monitor                      Start PM2 monitoring interface

Networks:
  monitor-bsc                  BSC Mainnet
  monitor-bsc-testnet          BSC Testnet
  monitor-polygon              Polygon
  monitor-ethereum             Ethereum

Examples:
  node scripts/pm2-manager.js start-all
  node scripts/pm2-manager.js start monitor-bsc-testnet
  node scripts/pm2-manager.js logs monitor-bsc-testnet 100
  node scripts/pm2-manager.js status
    `);
}
