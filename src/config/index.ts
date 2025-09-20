import { readFileSync } from 'fs';
import { resolve } from 'path';
import { z } from 'zod';
import { Config, ConfigSchema } from './types.js';

// 环境变量验证
const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// 加载环境变量
export function loadEnv() {
  const env = EnvSchema.parse(process.env);
  return env;
}

// 加载配置文件
export function loadConfig(configPath: string): Config {
  const configFile = resolve(process.cwd(), configPath);
  const configJson = JSON.parse(readFileSync(configFile, 'utf-8'));
  return ConfigSchema.parse(configJson);
}

// 默认 BSC 配置
export const DEFAULT_BSC_CONFIG: Config = {
  chains: [{
    name: 'bsc',
    chainId: 56,
    rpcHttp: 'https://bsc-dataseed.binance.org',
    rpcWs: 'wss://bsc-ws-node.nariox.org',
    startBlock: 39000000,
    confirmations: 12,
    scanBlockSpan: 1500,
    parallelRequests: 6,
    contracts: [
      {
        name: 'Meshes',
        address: '0x...',  // TODO: 替换为实际地址
        abiPath: './abis/Meshes.json',
      },
      {
        name: 'Reward',
        address: '0x...',  // TODO: 替换为实际地址
        abiPath: './abis/Reward.json',
      },
      {
        name: 'FoundationManage',
        address: '0x...',  // TODO: 替换为实际地址
        abiPath: './abis/FoundationManage.json',
      },
    ],
  }],
};


