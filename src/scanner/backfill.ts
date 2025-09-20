import { createPublicClient, http } from 'viem';
import { Config } from '../config/load.js';
import { Db } from '../writer/db.js';
import pino from 'pino';

const log = pino({ transport: { target: 'pino-pretty' } });

export async function runBackfill(cfg: Config, db: Db) {
  const client = createPublicClient({ chain: undefined as any, transport: http(cfg.chain.rpcHttp) });
  const span = cfg.chain.scanBlockSpan;
  let from = BigInt(cfg.chain.startBlock);
  const latest = (await client.getBlockNumber()) - BigInt(cfg.chain.confirmations);

  log.info({ from: Number(from), latest: Number(latest) }, 'backfill start');

  while (from <= latest) {
    const to = from + BigInt(span) - 1n;
    const rangeTo = to > latest ? latest : to;

    // Fetch logs for all contracts in range
    const addresses = cfg.contracts.map((c) => c.address as `0x${string}`);
    try {
      const logs = await client.getLogs({ address: addresses, fromBlock: from, toBlock: rangeTo });
      log.info({ from: Number(from), to: Number(rangeTo), logs: logs.length }, 'range fetched');
      // TODO: decode and write to DB
    } catch (e) {
      log.error({ err: e, from: Number(from), to: Number(rangeTo) }, 'getLogs error, backing off');
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    from = rangeTo + 1n;
  }

  log.info('backfill complete');
}
