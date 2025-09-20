import { z } from 'zod';
import { readFileSync } from 'node:fs';

const ChainSchema = z.object({
  name: z.string(),
  chainId: z.number(),
  rpcHttp: z.string(),
  rpcWs: z.string().optional(),
  startBlock: z.number(),
  confirmations: z.number().default(12),
  scanBlockSpan: z.number().default(1500),
  parallelRequests: z.number().default(6),
});

const ContractSchema = z.object({
  name: z.string(),
  address: z.string(),
  abiPath: z.string(),
});

const ConfigSchema = z.object({
  chain: ChainSchema,
  contracts: z.array(ContractSchema),
});

export type Config = z.infer<typeof ConfigSchema>;

export async function loadConfig(): Promise<Config> {
  const path = process.env.MONITOR_CONFIG || 'config.bsc.json';
  const raw = readFileSync(path, 'utf8');
  const json = JSON.parse(raw);
  return ConfigSchema.parse(json);
}
