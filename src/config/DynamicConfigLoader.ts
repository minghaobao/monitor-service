import { ContractSyncService, ContractInfo } from '../services/ContractSyncService.js';
import { ChainConfig, ContractConfig } from './types.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export class DynamicConfigLoader {
  private contractSyncService: ContractSyncService;
  private baseConfig: ChainConfig;
  private contracts: ContractInfo[] = [];

  constructor(
    managementDatabaseUrl: string,
    monitorDatabaseUrl: string,
    baseConfig: ChainConfig
  ) {
    this.contractSyncService = new ContractSyncService(managementDatabaseUrl, monitorDatabaseUrl);
    this.baseConfig = baseConfig;
  }

  // 初始化并加载合约配置
  async initialize(): Promise<void> {
    try {
      // 获取已部署的合约
      this.contracts = await this.contractSyncService.getContractsForChain(this.baseConfig.chainId);
      
      // 同步到monitor数据库
      await this.contractSyncService.syncContractsToMonitor(this.contracts);

      logger.info({
        chainId: this.baseConfig.chainId,
        contractCount: this.contracts.length,
        contracts: this.contracts.map(c => ({ name: c.name, address: c.address }))
      }, 'Loaded contracts from management database');

    } catch (error) {
      logger.error({ error }, 'Failed to initialize dynamic config loader');
      throw error;
    }
  }

  // 获取动态配置
  getDynamicConfig(): ChainConfig {
    const contractConfigs: ContractConfig[] = this.contracts.map(contract => ({
      name: contract.name,
      address: contract.address,
      abiPath: `./abis/${contract.name}.json`, // 假设ABI文件按合约名称存储
      events: [], // 可以在这里指定要监控的特定事件
      methods: [], // 可以在这里指定要监控的特定方法
    }));

    return {
      ...this.baseConfig,
      contracts: contractConfigs,
    };
  }

  // 启动合约变化监听
  startWatching(): void {
    this.contractSyncService.watchContractChanges(async (contracts: ContractInfo[]) => {
      const chainContracts = contracts.filter((c: ContractInfo) => c.chainId === this.baseConfig.chainId);
      
      // 比较合约配置，忽略BigInt字段
      const normalizedChainContracts = chainContracts.map(c => ({
        ...c,
        lastBlock: c.lastBlock.toString()
      }));
      const normalizedCurrentContracts = this.contracts.map(c => ({
        ...c,
        lastBlock: c.lastBlock.toString()
      }));
      
      if (JSON.stringify(normalizedChainContracts) !== JSON.stringify(normalizedCurrentContracts)) {
        logger.info({
          chainId: this.baseConfig.chainId,
          oldCount: this.contracts.length,
          newCount: chainContracts.length,
        }, 'Contract configuration changed, updating...');

        this.contracts = chainContracts;
        
        // 同步到monitor数据库
        await this.contractSyncService.syncContractsToMonitor(chainContracts);
      }
    });
  }

  // 获取当前合约列表
  getContracts(): ContractInfo[] {
    return this.contracts;
  }

  // 清理资源
  async cleanup(): Promise<void> {
    await this.contractSyncService.disconnect();
  }
}
