import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

const app = express();
const prisma = new PrismaClient();

// 中间件
app.use(express.json());
app.use(pinoHttp.pinoHttp());

// 健康检查
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 获取合约列表
app.get('/api/contracts', async (req: Request, res: Response) => {
  try {
    const { chainId, network } = req.query;
    
    const where: any = {};
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const contracts = await prisma.contract.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    // 按网络分组
    const contractsByNetwork = contracts.reduce((acc: any, contract: any) => {
      const chainId = contract.chainId.toString();
      if (!acc[chainId]) {
        acc[chainId] = [];
      }
      acc[chainId].push(contract);
      return acc;
    }, {} as Record<string, any[]>);
    
    res.json({
      success: true,
      data: contracts,
      count: contracts.length,
      byNetwork: contractsByNetwork,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch contracts');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contracts',
    });
  }
});

// 获取指定合约的事件
app.get('/api/contracts/:address/events', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const { page = 1, limit = 50, eventName, chainId } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      contractAddress: address.toLowerCase(),
    };
    
    if (eventName) {
      where.eventName = eventName;
    }
    
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { blockNumber: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.event.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: events,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch contract events');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contract events',
    });
  }
});

// 获取指定合约的函数调用
app.get('/api/contracts/:address/function-calls', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const { page = 1, limit = 50, methodName, chainId } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      contractAddress: address.toLowerCase(),
    };
    
    if (methodName) {
      where.methodName = methodName;
    }
    
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const [functionCalls, total] = await Promise.all([
      prisma.functionCall.findMany({
        where,
        orderBy: { blockNumber: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.functionCall.count({ where }),
    ]);
    
    res.json({
      success: true,
      data: functionCalls,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch function calls');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch function calls',
    });
  }
});

// 获取最新事件
app.get('/api/events/latest', async (req: Request, res: Response) => {
  try {
    const { limit = 100, chainId } = req.query;
    
    const where: any = {};
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const events = await prisma.event.findMany({
      where,
      orderBy: { blockNumber: 'desc' },
      take: Number(limit),
      include: {
        contract: {
          select: {
            name: true,
          },
        },
      },
    });
    
    res.json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch latest events');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch latest events',
    });
  }
});

// 获取最新函数调用
app.get('/api/function-calls/latest', async (req: Request, res: Response) => {
  try {
    const { limit = 100, chainId } = req.query;
    
    const where: any = {};
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const functionCalls = await prisma.functionCall.findMany({
      where,
      orderBy: { blockNumber: 'desc' },
      take: Number(limit),
      include: {
        contract: {
          select: {
            name: true,
          },
        },
      },
    });
    
    res.json({
      success: true,
      data: functionCalls,
      count: functionCalls.length,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch latest function calls');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch latest function calls',
    });
  }
});

// 获取统计信息
app.get('/api/stats', async (req: Request, res: Response) => {
  try {
    const { chainId } = req.query;
    
    const where: any = {};
    if (chainId) {
      where.chainId = BigInt(chainId as string);
    }
    
    const [contractCount, eventCount, functionCallCount, latestBlock, networkStats] = await Promise.all([
      prisma.contract.count({ where }),
      prisma.event.count({ where }),
      prisma.functionCall.count({ where }),
      prisma.block.findFirst({
        where,
        orderBy: { blockNumber: 'desc' },
        select: { blockNumber: true, chainId: true },
      }),
      prisma.contract.groupBy({
        by: ['chainId'],
        _count: {
          id: true,
        },
      }),
    ]);
    
    // 按网络统计
    const networkBreakdown = networkStats.map((stat: any) => ({
      chainId: stat.chainId.toString(),
      contractCount: stat._count.id,
    }));
    
    res.json({
      success: true,
      data: {
        contracts: contractCount,
        events: eventCount,
        functionCalls: functionCallCount,
        latestBlock: latestBlock?.blockNumber || 0,
        latestBlockChainId: latestBlock?.chainId?.toString(),
        byNetwork: networkBreakdown,
      },
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch stats');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats',
    });
  }
});

// 获取网络列表
app.get('/api/networks', async (req: Request, res: Response) => {
  try {
    const networks = await prisma.contract.groupBy({
      by: ['chainId'],
      _count: {
        id: true,
      },
      _max: {
        createdAt: true,
      },
    });
    
    const networkList = networks.map((network: any) => ({
      chainId: network.chainId.toString(),
      contractCount: network._count.id,
      lastActivity: network._max.createdAt,
    }));
    
    res.json({
      success: true,
      data: networkList,
      count: networkList.length,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch networks');
    res.status(500).json({
      success: false,
      error: 'Failed to fetch networks',
    });
  }
});

// 错误处理中间件
app.use((error: any, req: Request, res: Response, next: any) => {
  logger.error({ error }, 'Unhandled error');
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404处理
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

export { app };
