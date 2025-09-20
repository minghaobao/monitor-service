import { MonitorService } from './MonitorService.js';
import { MultiNetworkLoader } from './config/MultiNetworkLoader.js';
import { DynamicConfigLoader } from './config/DynamicConfigLoader.js';
import { ChainConfig } from './config/types.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export class MultiNetworkManager {
  private services: Map<string, MonitorService> = new Map();
  private multiNetworkLoader: MultiNetworkLoader;
  private managementDatabaseUrl?: string;
  private monitorDatabaseUrl?: string;
  private dynamicConfigLoaders: Map<string, DynamicConfigLoader> = new Map();

  constructor(
    configPath: string = 'config/multi-network.json',
    managementDatabaseUrl?: string,
    monitorDatabaseUrl?: string,
    private startBlockOption?: string,
    private configMode?: string
  ) {
    this.multiNetworkLoader = new MultiNetworkLoader(configPath);
    this.managementDatabaseUrl = managementDatabaseUrl;
    this.monitorDatabaseUrl = monitorDatabaseUrl;
  }

  // 启动指定网络的服务
  async startNetwork(networkName: string): Promise<void> {
    try {
      if (this.services.has(networkName)) {
        logger.warn({ networkName }, 'Network service already running');
        return;
      }

      // 获取基础配置
      const baseConfig = this.multiNetworkLoader.getNetworkConfig(networkName);
      
      let config = baseConfig;
      
      // 根据配置模式决定是否使用动态配置
      const shouldUseDynamicConfig = this.configMode === 'db' || this.configMode === 'db2local';
      
      if (shouldUseDynamicConfig && this.managementDatabaseUrl && this.monitorDatabaseUrl) {
        try {
          logger.info({ 
            networkName, 
            chainId: baseConfig.chainId,
            configMode: this.configMode
          }, 'Loading dynamic contract configuration from management database');
          
          const dynamicLoader = new DynamicConfigLoader(
            this.managementDatabaseUrl,
            this.monitorDatabaseUrl,
            baseConfig
          );
          
          await dynamicLoader.initialize();
          config = dynamicLoader.getDynamicConfig();
          
          this.dynamicConfigLoaders.set(networkName, dynamicLoader);
          
          logger.info({
            networkName,
            chainId: config.chainId,
            contractCount: config.contracts.length,
            contracts: config.contracts.map(c => ({ name: c.name, address: c.address }))
          }, 'Dynamic contract configuration loaded successfully');
          
        } catch (error) {
          logger.warn({ 
            error, 
            networkName, 
            chainId: baseConfig.chainId,
            configMode: this.configMode
          }, 'Failed to load dynamic config, falling back to static config');
          
          // 如果动态加载失败，使用静态配置
          config = baseConfig;
        }
      } else {
        logger.info({ 
          networkName, 
          chainId: baseConfig.chainId,
          configMode: this.configMode,
          reason: this.configMode === 'local' ? 'Using local configuration' : 'No management database provided'
        }, 'Using static configuration');
      }

      const service = new MonitorService(
        config,
        this.managementDatabaseUrl,
        this.monitorDatabaseUrl,
        this.startBlockOption
      );

      await service.init();
      await service.start();

      this.services.set(networkName, service);

      logger.info({
        networkName,
        chainId: config.chainId,
        chainName: config.name,
        contractCount: config.contracts.length,
        usingDynamicConfig: this.dynamicConfigLoaders.has(networkName)
      }, 'Network service started successfully');

    } catch (error) {
      logger.error({ error, networkName }, 'Failed to start network service');
      throw error;
    }
  }

  // 停止指定网络的服务
  async stopNetwork(networkName: string): Promise<void> {
    try {
      const service = this.services.get(networkName);
      if (!service) {
        logger.warn({ networkName }, 'Network service not found');
        return;
      }

      await service.stop();
      this.services.delete(networkName);

      logger.info({ networkName }, 'Network service stopped successfully');

    } catch (error) {
      logger.error({ error, networkName }, 'Failed to stop network service');
      throw error;
    }
  }

  // 启动多个网络的服务
  async startNetworks(networkNames: string[]): Promise<void> {
    logger.info({ networkNames }, 'Starting multiple network services');

    const results = await Promise.allSettled(
      networkNames.map(name => this.startNetwork(name))
    );

    const failed = results
      .map((result, index) => ({ result, network: networkNames[index] }))
      .filter(({ result }) => result.status === 'rejected');

    if (failed.length > 0) {
      logger.error({ failed: failed.map(f => f.network) }, 'Some network services failed to start');
    }

    const successCount = results.filter(r => r.status === 'fulfilled').length;
    logger.info({ successCount, totalCount: networkNames.length }, 'Network services startup completed');
  }

  // 启动所有网络的服务
  async startAllNetworks(): Promise<void> {
    const allNetworks = this.multiNetworkLoader.getNetworkNames();
    await this.startNetworks(allNetworks);
  }

  // 停止所有网络的服务
  async stopAllNetworks(): Promise<void> {
    logger.info('Stopping all network services');

    const stopPromises = Array.from(this.services.keys()).map(name => 
      this.stopNetwork(name).catch(error => 
        logger.error({ error, networkName: name }, 'Failed to stop network service')
      )
    );

    await Promise.all(stopPromises);
    this.services.clear();

    logger.info('All network services stopped');
  }

  // 重启指定网络的服务
  async restartNetwork(networkName: string): Promise<void> {
    logger.info({ networkName }, 'Restarting network service');
    await this.stopNetwork(networkName);
    await this.startNetwork(networkName);
  }

  // 获取运行中的网络列表
  getRunningNetworks(): string[] {
    return Array.from(this.services.keys());
  }

  // 获取网络状态
  getNetworkStatus(networkName: string): { running: boolean; config?: ChainConfig } {
    const running = this.services.has(networkName);
    let config: ChainConfig | undefined;

    try {
      config = this.multiNetworkLoader.getNetworkConfig(networkName);
    } catch (error) {
      // 网络配置不存在
    }

    return { running, config };
  }

  // 获取所有网络状态
  getAllNetworkStatus(): Array<{ name: string; running: boolean; config?: ChainConfig }> {
    const allNetworks = this.multiNetworkLoader.getNetworkNames();
    return allNetworks.map((name: string) => ({
      name,
      ...this.getNetworkStatus(name),
    }));
  }

  // 获取网络摘要
  getNetworkSummary(): Array<{ 
    name: string; 
    chainId: number; 
    contractCount: number; 
    running: boolean;
  }> {
    return this.multiNetworkLoader.getNetworkSummary().map((network: any) => ({
      ...network,
      running: this.services.has(network.name),
    }));
  }

  // 检查网络是否运行
  isNetworkRunning(networkName: string): boolean {
    return this.services.has(networkName);
  }

  // 获取指定网络的服务实例
  getNetworkService(networkName: string): MonitorService | undefined {
    return this.services.get(networkName);
  }

  // 获取所有服务实例
  getAllServices(): Map<string, MonitorService> {
    return new Map(this.services);
  }

  // 清理资源
  async cleanup(): Promise<void> {
    await this.stopAllNetworks();
  }
}
