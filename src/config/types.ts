import { z } from 'zod';

// 合约配置
export const ContractConfigSchema = z.object({
  name: z.string(),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  abiPath: z.string().optional(),
  abi: z.array(z.any()).optional(),
  events: z.array(z.string()).optional(),
  methods: z.array(z.string()).optional(),
});

export type ContractConfig = z.infer<typeof ContractConfigSchema>;

// 链配置
export const ChainConfigSchema = z.object({
  name: z.string(),
  chainId: z.number(),
  rpcHttp: z.union([z.string().url(), z.array(z.string().url())]),
  rpcWs: z.string().url().optional(),
  startBlock: z.number(),
  confirmations: z.number(),
  scanBlockSpan: z.number(),
  parallelRequests: z.number(),
  contracts: z.array(ContractConfigSchema),
});

export type ChainConfig = z.infer<typeof ChainConfigSchema>;

// 全局配置
export const ConfigSchema = z.object({
  chains: z.array(ChainConfigSchema),
});

export type Config = z.infer<typeof ConfigSchema>;


