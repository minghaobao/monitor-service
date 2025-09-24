import { PrismaClient as ManagementPrismaClient } from '../generated/management/index.js';
import { PrismaClient as MonitorPrismaClient } from '../generated/prisma/index.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export interface ContractInfo {
  name: string;
  address: string;
  network: string;
  chainId: number;
  isPaused: boolean;
  lastBlock: bigint;
}

export class ContractSyncService {
  private readonly managementPrisma: ManagementPrismaClient;
  private readonly monitorPrisma: MonitorPrismaClient;

  constructor(
    managementDatabaseUrl: string,
    monitorDatabaseUrl: string
  ) {
    this.managementPrisma = new ManagementPrismaClient({
      datasources: {
        db: {
          url: managementDatabaseUrl,
        },
      },
    });

    this.monitorPrisma = new MonitorPrismaClient({
      datasources: {
        db: {
          url: monitorDatabaseUrl,
        },
      },
    });
  }

  // 从management数据库获取所有已部署的合约
  async getDeployedContracts(): Promise<ContractInfo[]> {
    try {
      const contracts = await this.managementPrisma.contractStatus.findMany({
        where: {
          contract_address: {
            not: '0x0000000000000000000000000000000000000000'
          }
        },
        orderBy: {
          last_updated: 'desc'
        }
      });

      return contracts.map((contract: any) => ({
        name: contract.contract_name,
        address: contract.contract_address,
        network: contract.network,
        chainId: this.getChainIdFromNetwork(contract.network),
        isPaused: contract.is_paused,
        lastBlock: contract.last_block || BigInt(0)
      }));
    } catch (error) {
      logger.error({ error }, 'Failed to fetch deployed contracts from management database');
      throw error;
    }
  }

  // 将合约信息同步到monitor数据库
  async syncContractsToMonitor(contracts: ContractInfo[]): Promise<void> {
    try {
      for (const contract of contracts) {
      await this.monitorPrisma.contract.upsert({
        where: {
          address_chainId: {
            address: contract.address.toLowerCase(),
            chainId: BigInt(contract.chainId),
          },
        },
          create: {
            chainId: BigInt(contract.chainId),
            address: contract.address.toLowerCase(),
            name: contract.name,
            abiVersion: '1.0.0',
          },
          update: {
            name: contract.name,
            abiVersion: '1.0.0',
          },
        });

        logger.info({
          chainId: contract.chainId,
          contractName: contract.name,
          contractAddress: contract.address,
        }, 'Synced contract to monitor database');
      }
    } catch (error) {
      logger.error({ error }, 'Failed to sync contracts to monitor database');
      throw error;
    }
  }

  // 获取指定链的合约
  async getContractsForChain(chainId: number): Promise<ContractInfo[]> {
    const allContracts = await this.getDeployedContracts();
    return allContracts.filter(contract => contract.chainId === chainId);
  }

  // 监听合约地址变化
  async watchContractChanges(callback: (contracts: ContractInfo[]) => void): Promise<void> {
    // 这里可以实现WebSocket监听或定期轮询
    // 为了简化，我们使用定期轮询的方式
    setInterval(async () => {
      try {
        const contracts = await this.getDeployedContracts();
        callback(contracts);
      } catch (error) {
        logger.error({ error }, 'Failed to watch contract changes');
      }
    }, 30000); // 每30秒检查一次
  }

  // 根据网络名称获取chainId
  private getChainIdFromNetwork(network: string): number {
    const networkMap: { [key: string]: number } = {
      'ethereum': 1,
      'goerli': 5,
      'polygon': 137,
      'mumbai': 80001,
      'bsc': 56,
      'bsc-testnet': 97,
      'bsc testnet': 97,  // 支持带空格的格式
      'BSC Testnet': 97,  // 支持大写格式
    };

    return networkMap[network] || networkMap[network.toLowerCase()] || 1;
  }

  // 清理资源
  async disconnect(): Promise<void> {
    await this.managementPrisma.$disconnect();
    await this.monitorPrisma.$disconnect();
  }
}
