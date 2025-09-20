import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { ChainConfig } from './types.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

// 网络配置模式
const NetworkConfigSchema = z.object({
  name: z.string(),
  chainId: z.number(),
  rpcHttp: z.union([z.string().url(), z.array(z.string().url())]),
  rpcWs: z.string().url().optional(),
  startBlock: z.number(),
  confirmations: z.number().default(12),
  scanBlockSpan: z.number().default(1500),
  parallelRequests: z.number().default(6),
  contracts: z.array(z.object({
    name: z.string(),
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    abiPath: z.string(),
  })),
});

const MultiNetworkConfigSchema = z.object({
  networks: z.record(z.string(), NetworkConfigSchema),
});

export type NetworkConfig = z.infer<typeof NetworkConfigSchema>;
export type MultiNetworkConfig = z.infer<typeof MultiNetworkConfigSchema>;

export class MultiNetworkLoader {
  private config: MultiNetworkConfig;

  constructor(configPath: string = 'config/multi-network.json') {
    try {
      const raw = readFileSync(configPath, 'utf8');
      const json = JSON.parse(raw);
      this.config = MultiNetworkConfigSchema.parse(json);
    } catch (error) {
      logger.error({ error, configPath }, 'Failed to load multi-network config');
      throw error;
    }
  }

  // 获取所有网络名称
  getNetworkNames(): string[] {
    return Object.keys(this.config.networks);
  }

  // 获取指定网络的配置
  getNetworkConfig(networkName: string): ChainConfig {
    const network = this.config.networks[networkName];
    if (!network) {
      throw new Error(`Network '${networkName}' not found. Available networks: ${this.getNetworkNames().join(', ')}`);
    }

    return {
      name: network.name,
      chainId: network.chainId,
      rpcHttp: network.rpcHttp,
      rpcWs: network.rpcWs,
      startBlock: network.startBlock,
      confirmations: network.confirmations,
      scanBlockSpan: network.scanBlockSpan,
      parallelRequests: network.parallelRequests,
      contracts: network.contracts.map(contract => ({
        name: contract.name,
        address: contract.address,
        abiPath: contract.abiPath,
      })),
    };
  }

  // 获取多个网络的配置
  getNetworkConfigs(networkNames: string[]): ChainConfig[] {
    return networkNames.map(name => this.getNetworkConfig(name));
  }

  // 获取所有网络配置
  getAllNetworkConfigs(): ChainConfig[] {
    return this.getNetworkConfigs(this.getNetworkNames());
  }

  // 检查网络是否存在
  hasNetwork(networkName: string): boolean {
    return networkName in this.config.networks;
  }

  // 获取网络信息摘要
  getNetworkSummary(): Array<{ name: string; chainId: number; contractCount: number }> {
    return Object.entries(this.config.networks).map(([key, network]) => ({
      name: key,
      chainId: network.chainId,
      contractCount: network.contracts.length,
    }));
  }

  // 验证网络配置
  validateNetworkConfig(networkName: string): boolean {
    try {
      this.getNetworkConfig(networkName);
      return true;
    } catch (error) {
      logger.error({ error, networkName }, 'Network config validation failed');
      return false;
    }
  }
}
