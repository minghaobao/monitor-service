#!/usr/bin/env node

import { config } from 'dotenv';
import { Command } from 'commander';
import { SimpleMonitorService } from './SimpleMonitorService.js';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const program = new Command();

program
  .name('simple-monitor-cli')
  .description('NGP Simple Monitor Service CLI (No Database)')
  .version('1.0.0');

// 启动简单监控服务
program
  .command('start')
  .description('Start the simple monitor service')
  .option('-c, --config <path>', 'Configuration file path', 'config/multi-network.json')
  .option('-n, --network <name>', 'Network name to start (e.g., bsc-testnet, polygon)')
  .action(async (options) => {
    try {
      const loader = new MultiNetworkLoader(options.config);
      
      if (!options.network) {
        logger.error('Network name is required. Use --network option.');
        process.exit(1);
      }

      if (!loader.hasNetwork(options.network)) {
        logger.error({ network: options.network }, 'Network not found');
        process.exit(1);
      }

      const networkConfig = loader.getNetworkConfig(options.network);
      const service = new SimpleMonitorService(networkConfig);

      // 初始化服务
      await service.init();

      // 启动服务
      await service.start();

      logger.info(
        { network: options.network, chainId: networkConfig.chainId },
        'Simple monitor service started successfully'
      );

      // 优雅退出处理
      process.on('SIGINT', async () => {
        logger.info('Received SIGINT. Shutting down...');
        await service.stop();
        process.exit(0);
      });

      process.on('SIGTERM', async () => {
        logger.info('Received SIGTERM. Shutting down...');
        await service.stop();
        process.exit(0);
      });

      // 保持进程运行
      process.stdin.resume();

    } catch (error) {
      logger.error({ error }, 'Failed to start simple monitor service');
      process.exit(1);
    }
  });

// 列出可用网络
program
  .command('list')
  .description('List available networks')
  .option('-c, --config <path>', 'Configuration file path', 'config/multi-network.json')
  .action(async (options) => {
    try {
      const loader = new MultiNetworkLoader(options.config);
      const networks = loader.getNetworkNames();
      
      console.log('\n🌐 Available Networks:');
      console.log('====================');
      
      networks.forEach((network, index) => {
        const config = loader.getNetworkConfig(network);
        console.log(`${index + 1}. ${network.padEnd(15)} | Chain ID: ${config.chainId.toString().padEnd(8)} | Contracts: ${config.contracts.length}`);
      });
      
    } catch (error) {
      logger.error({ error }, 'Failed to list networks');
      process.exit(1);
    }
  });

// 测试网络连接
program
  .command('test')
  .description('Test network connection')
  .option('-c, --config <path>', 'Configuration file path', 'config/multi-network.json')
  .option('-n, --network <name>', 'Network name to test')
  .action(async (options) => {
    try {
      const loader = new MultiNetworkLoader(options.config);
      
      if (!options.network) {
        logger.error('Network name is required. Use --network option.');
        process.exit(1);
      }

      if (!loader.hasNetwork(options.network)) {
        logger.error({ network: options.network }, 'Network not found');
        process.exit(1);
      }

      const networkConfig = loader.getNetworkConfig(options.network);
      
      console.log(`\n🔍 Testing ${networkConfig.name} (Chain ID: ${networkConfig.chainId})`);
      console.log(`RPC URL: ${networkConfig.rpcHttp}`);
      
      // 测试RPC连接
      const rpcUrl = Array.isArray(networkConfig.rpcHttp) 
        ? networkConfig.rpcHttp[0] 
        : networkConfig.rpcHttp;
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
        console.log(`✅ RPC connection successful`);
        console.log(`   Current block: ${blockNumber.toLocaleString()}`);
        console.log(`   Start block: ${networkConfig.startBlock.toLocaleString()}`);
        console.log(`   Blocks to scan: ${(blockNumber - networkConfig.startBlock).toLocaleString()}`);
      } else {
        console.log(`❌ RPC connection failed: ${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      logger.error({ error }, 'Failed to test network');
      process.exit(1);
    }
  });

program.parse();
