#!/usr/bin/env node

import { config } from 'dotenv';
import { Command } from 'commander';
import { MonitorService } from './MonitorService.js';
import { MultiNetworkManager } from './MultiNetworkManager.js';
import { ContractSyncService } from './services/ContractSyncService.js';
import { loadConfig, DEFAULT_BSC_CONFIG } from './config/index.js';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import pino from 'pino';

// 加载环境变量
config();

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
        },
        level: 'info'
      },
      {
        target: 'pino/file',
        options: {
          destination: `./logs/monitor-${process.env.NETWORK || 'default'}.log`
        },
        level: 'info'
      }
    ]
  },
});

const program = new Command();

// 配置模式处理函数
function getConfigMode(configMode: string) {
  // 统一使用环境变量中的数据库配置
  const managementDatabaseUrl = process.env.MANAGEMENT_DATABASE_URL;
  const monitorDatabaseUrl = process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;
  
  switch (configMode) {
    case 'db':
      return {
        managementDatabaseUrl,
        monitorDatabaseUrl,
        useDatabaseForContracts: true,
        description: 'Use database to get contract addresses'
      };
    case 'local':
      return {
        managementDatabaseUrl,
        monitorDatabaseUrl,
        useDatabaseForContracts: false,
        description: 'Use contract addresses from configuration file'
      };
    case 'db2local':
      return {
        managementDatabaseUrl,
        monitorDatabaseUrl,
        useDatabaseForContracts: true,
        writeToConfig: true,
        description: 'Use database to get contract addresses and write to config file'
      };
    default:
      return {
        managementDatabaseUrl,
        monitorDatabaseUrl,
        useDatabaseForContracts: true,
        description: 'Default: use database to get contract addresses'
      };
  }
}

program
  .name('monitor-cli')
  .description('NGP Monitor Service CLI')
  .version('1.0.0');

// 启动监控服务
program
  .command('start')
  .description('Start the monitor service')
  .argument('[network]', 'Network name to start (e.g., bsc-testnet, polygon, ethereum)')
  .argument('[startBlock]', 'Starting block height: number, "checkpoint", or "current"')
  .option('-c, --config <path>', 'Configuration file path')
  .option('-n, --network <name>', 'Network name to start (e.g., bsc, polygon, ethereum)')
  .option('--networks <names>', 'Comma-separated list of networks to start')
  .option('--all', 'Start all available networks')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .option('--start-block <block>', 'Starting block height: number, "checkpoint", or "current"')
  .option('--config-mode <mode>', 'Configuration mode: db, local, or DB2local', 'db')
  .action(async (network, startBlock, options) => {
    try {
      // 合并位置参数和选项参数
      const finalNetwork = network || options.network;
      const finalStartBlock = startBlock || options.startBlock;
      
      logger.info({ 
        positionArgs: { network, startBlock },
        options: options,
        finalNetwork,
        finalStartBlock,
        configMode: options.configMode
      }, 'CLI parameters received');
      
      // 根据配置模式获取数据库URL
      const configInfo = getConfigMode(options.configMode);
      logger.info({ 
        configMode: options.configMode,
        description: configInfo.description 
      }, 'Using configuration mode');
      
      const managementDatabaseUrl = options.managementDb || configInfo.managementDatabaseUrl;
      const monitorDatabaseUrl = options.monitorDb || configInfo.monitorDatabaseUrl;

      // 使用多网络管理器
      const multiNetworkManager = new MultiNetworkManager(
        options.config || 'config/multi-network.json',
        managementDatabaseUrl,
        monitorDatabaseUrl,
        finalStartBlock,
        options.configMode
      );

      let networksToStart: string[] = [];

      if (options.all) {
        networksToStart = multiNetworkManager.getRunningNetworks().length === 0 
          ? multiNetworkManager['multiNetworkLoader'].getNetworkNames()
          : [];
      } else if (options.networks) {
        networksToStart = options.networks.split(',').map((n: string) => n.trim());
      } else if (finalNetwork) {
        networksToStart = [finalNetwork];
        logger.info({ network: finalNetwork }, 'Starting specified network');
      } else {
        // 默认启动BSC测试网
        networksToStart = ['bsc-testnet'];
        logger.info('No network specified, starting default BSC testnet');
      }

      if (networksToStart.length === 0) {
        logger.info('No networks to start');
        return;
      }

      // 验证网络配置
      for (const networkName of networksToStart) {
        if (!multiNetworkManager['multiNetworkLoader'].hasNetwork(networkName)) {
          logger.error({ 
            networkName, 
            availableNetworks: multiNetworkManager['multiNetworkLoader'].getNetworkNames() 
          }, 'Network not found');
          process.exit(1);
        }
        
        // 获取网络配置并验证
        const networkConfig = multiNetworkManager['multiNetworkLoader'].getNetworkConfig(networkName);
        logger.info({ 
          networkName, 
          chainId: networkConfig.chainId, 
          chainName: networkConfig.name 
        }, 'Starting network with configuration');
      }

      // 启动网络服务
      const startupMessages = [
        `🚀 启动扫描程序: ${networksToStart.join(', ')}`,
        `📅 启动时间: ${new Date().toLocaleString()}`,
        `🔧 配置模式: ${options.configMode || 'local'}`
      ];
      
      startupMessages.forEach(msg => {
        console.log(msg);
        logger.info(msg);
      });
      
      await multiNetworkManager.startNetworks(networksToStart);

      const successMessages = [
        `✅ 扫描程序启动成功: ${networksToStart.join(', ')}`,
        `📊 监控状态: 运行中`,
        `🔄 自动扫描: 已启用`
      ];
      
      successMessages.forEach(msg => {
        console.log(msg);
        logger.info(msg);
      });
      
      logger.info({ networks: networksToStart }, 'Monitor services started successfully');

      // 优雅退出处理
      process.on('SIGINT', async () => {
        logger.info('Received SIGINT. Shutting down...');
        await multiNetworkManager.stopAllNetworks();
        process.exit(0);
      });

      process.on('SIGTERM', async () => {
        logger.info('Received SIGTERM. Shutting down...');
        await multiNetworkManager.stopAllNetworks();
        process.exit(0);
      });

    } catch (error) {
      logger.error({ error }, 'Failed to start monitor service');
      process.exit(1);
    }
  });

// PM2管理命令
program
  .command('pm2')
  .description('PM2 process management')
  .option('--start-all', 'Start all PM2 processes (stopped state)')
  .option('--stop-all', 'Stop all PM2 processes')
  .option('--restart-all', 'Restart all PM2 processes')
  .option('--status', 'Show PM2 status')
  .option('--logs <name>', 'Show logs for specific network')
  .option('--start <name>', 'Start specific network process')
  .option('--stop <name>', 'Stop specific network process')
  .option('--restart <name>', 'Restart specific network process')
  .action(async (options) => {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      if (options.startAll) {
        logger.info('Starting all PM2 processes in stopped state...');
        await execAsync('pm2 start ecosystem.config.cjs --no-autorestart');
        logger.info('All PM2 processes started (stopped state)');
      } else if (options.stopAll) {
        logger.info('Stopping all PM2 processes...');
        await execAsync('pm2 stop all');
        logger.info('All PM2 processes stopped');
      } else if (options.restartAll) {
        logger.info('Restarting all PM2 processes...');
        await execAsync('pm2 restart all');
        logger.info('All PM2 processes restarted');
      } else if (options.status) {
        const { stdout } = await execAsync('pm2 status');
        console.log(stdout);
      } else if (options.logs) {
        const { stdout } = await execAsync(`pm2 logs ${options.logs} --lines 50`);
        console.log(stdout);
      } else if (options.start) {
        logger.info(`Starting PM2 process: ${options.start}`);
        await execAsync(`pm2 start ${options.start}`);
        logger.info(`PM2 process ${options.start} started`);
      } else if (options.stop) {
        logger.info(`Stopping PM2 process: ${options.stop}`);
        await execAsync(`pm2 stop ${options.stop}`);
        logger.info(`PM2 process ${options.stop} stopped`);
      } else if (options.restart) {
        logger.info(`Restarting PM2 process: ${options.restart}`);
        await execAsync(`pm2 restart ${options.restart}`);
        logger.info(`PM2 process ${options.restart} restarted`);
      } else {
        logger.info('Available PM2 commands:');
        logger.info('  --start-all     Start all processes (stopped state)');
        logger.info('  --stop-all      Stop all processes');
        logger.info('  --restart-all   Restart all processes');
        logger.info('  --status        Show status');
        logger.info('  --logs <name>   Show logs for network');
        logger.info('  --start <name>  Start specific network');
        logger.info('  --stop <name>   Stop specific network');
        logger.info('  --restart <name> Restart specific network');
      }
    } catch (error) {
      logger.error({ error }, 'PM2 command failed');
      process.exit(1);
    }
  });

// 同步合约地址
program
  .command('sync-contracts')
  .description('Sync contract addresses from management database')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      if (!managementDatabaseUrl || !monitorDatabaseUrl) {
        logger.error('Management and monitor database URLs are required');
        process.exit(1);
      }

      const syncService = new ContractSyncService(managementDatabaseUrl, monitorDatabaseUrl);
      
      // 获取已部署的合约
      const contracts = await syncService.getDeployedContracts();
      
      // 同步到monitor数据库
      await syncService.syncContractsToMonitor(contracts);

      logger.info({
        contractCount: contracts.length,
        contracts: contracts.map((c: any) => ({ name: c.name, address: c.address, network: c.network }))
      }, 'Successfully synced contracts');

      await syncService.disconnect();
    } catch (error) {
      logger.error({ error }, 'Failed to sync contracts');
      process.exit(1);
    }
  });

// 列出已部署的合约
program
  .command('list-contracts')
  .description('List deployed contracts from management database')
  .option('--management-db <url>', 'Management database URL')
  .option('--chain-id <id>', 'Filter by chain ID')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      if (!managementDatabaseUrl || !monitorDatabaseUrl) {
        logger.error('Management and monitor database URLs are required');
        process.exit(1);
      }

      const syncService = new ContractSyncService(managementDatabaseUrl, monitorDatabaseUrl);
      
      let contracts = await syncService.getDeployedContracts();
      
      if (options.chainId) {
        contracts = contracts.filter(c => c.chainId === parseInt(options.chainId));
      }

      console.log('\nDeployed Contracts:');
      console.log('==================');
      contracts.forEach((contract: any) => {
        console.log(`Name: ${contract.name}`);
        console.log(`Address: ${contract.address}`);
        console.log(`Network: ${contract.network}`);
        console.log(`Chain ID: ${contract.chainId}`);
        console.log(`Paused: ${contract.isPaused}`);
        console.log(`Last Block: ${contract.lastBlock.toString()}`);
        console.log('---');
      });

      await syncService.disconnect();
    } catch (error) {
      logger.error({ error }, 'Failed to list contracts');
      process.exit(1);
    }
  });

// 网络管理命令
program
  .command('network')
  .description('Network management commands')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      const multiNetworkManager = new MultiNetworkManager(
        options.config || 'config/multi-network.json',
        managementDatabaseUrl,
        monitorDatabaseUrl
      );

      const summary = multiNetworkManager.getNetworkSummary();
      
      console.log('\n🌐 Available Networks:');
      console.log('====================');
      summary.forEach((network: any) => {
        const status = network.running ? '🟢 Running' : '🔴 Stopped';
        console.log(`${network.name.padEnd(15)} | Chain ID: ${network.chainId.toString().padEnd(8)} | Contracts: ${network.contractCount.toString().padEnd(3)} | ${status}`);
      });
      console.log('');

    } catch (error) {
      logger.error({ error }, 'Failed to list networks');
      process.exit(1);
    }
  });

// 停止网络服务
program
  .command('stop')
  .description('Stop monitor services')
  .option('-n, --network <name>', 'Network name to stop')
  .option('--networks <names>', 'Comma-separated list of networks to stop')
  .option('--all', 'Stop all running networks')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      const multiNetworkManager = new MultiNetworkManager(
        options.config || 'config/multi-network.json',
        managementDatabaseUrl,
        monitorDatabaseUrl
      );

      if (options.all) {
        await multiNetworkManager.stopAllNetworks();
        logger.info('All network services stopped');
      } else if (options.networks) {
        const networksToStop = options.networks.split(',').map((n: string) => n.trim());
        for (const networkName of networksToStop) {
          await multiNetworkManager.stopNetwork(networkName);
        }
        logger.info({ networks: networksToStop }, 'Network services stopped');
      } else if (options.network) {
        await multiNetworkManager.stopNetwork(options.network);
        logger.info({ network: options.network }, 'Network service stopped');
      } else {
        logger.error('Please specify which networks to stop');
        process.exit(1);
      }

    } catch (error) {
      logger.error({ error }, 'Failed to stop network services');
      process.exit(1);
    }
  });

// 重启网络服务
program
  .command('restart')
  .description('Restart monitor services')
  .option('-n, --network <name>', 'Network name to restart')
  .option('--networks <names>', 'Comma-separated list of networks to restart')
  .option('--all', 'Restart all running networks')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      const multiNetworkManager = new MultiNetworkManager(
        options.config || 'config/multi-network.json',
        managementDatabaseUrl,
        monitorDatabaseUrl
      );

      if (options.all) {
        const runningNetworks = multiNetworkManager.getRunningNetworks();
        for (const networkName of runningNetworks) {
          await multiNetworkManager.restartNetwork(networkName);
        }
        logger.info('All network services restarted');
      } else if (options.networks) {
        const networksToRestart = options.networks.split(',').map((n: string) => n.trim());
        for (const networkName of networksToRestart) {
          await multiNetworkManager.restartNetwork(networkName);
        }
        logger.info({ networks: networksToRestart }, 'Network services restarted');
      } else if (options.network) {
        await multiNetworkManager.restartNetwork(options.network);
        logger.info({ network: options.network }, 'Network service restarted');
      } else {
        logger.error('Please specify which networks to restart');
        process.exit(1);
      }

    } catch (error) {
      logger.error({ error }, 'Failed to restart network services');
      process.exit(1);
    }
  });

// 回放历史数据
program
  .command('backfill')
  .description('Backfill historical data for a specific block range')
  .option('-c, --config <path>', 'Configuration file path')
  .option('-n, --network <name>', 'Network name to backfill')
  .option('--management-db <url>', 'Management database URL')
  .option('--monitor-db <url>', 'Monitor database URL')
  .option('--from <block>', 'Start block number', '0')
  .option('--to <block>', 'End block number')
  .action(async (options) => {
    try {
      const managementDatabaseUrl = options.managementDb || process.env.MANAGEMENT_DATABASE_URL;
      const monitorDatabaseUrl = options.monitorDb || process.env.MONITOR_DATABASE_URL || process.env.DATABASE_URL;

      const fromBlock = BigInt(options.from);
      const toBlock = options.to ? BigInt(options.to) : BigInt(0);

      if (toBlock <= fromBlock) {
        logger.error('End block must be greater than start block');
        process.exit(1);
      }

      if (!options.network) {
        logger.error('Please specify a network name with -n or --network');
        process.exit(1);
      }

      const multiNetworkManager = new MultiNetworkManager(
        options.config || 'config/multi-network.json',
        managementDatabaseUrl,
        monitorDatabaseUrl
      );

      const config = multiNetworkManager['multiNetworkLoader'].getNetworkConfig(options.network);
      const service = new MonitorService(config, managementDatabaseUrl, monitorDatabaseUrl);

      // 初始化服务
      await service.init();

      // 执行回放
      await service.backfill(fromBlock, toBlock);

      logger.info({
        network: options.network,
        fromBlock: fromBlock.toString(),
        toBlock: toBlock.toString(),
      }, 'Backfill completed successfully');

      // 停止服务
      await service.stop();
    } catch (error) {
      logger.error({ error }, 'Backfill failed');
      process.exit(1);
    }
  });

program.parse();