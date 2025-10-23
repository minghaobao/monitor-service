import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClient } from './generated/prisma';

const app = express();

// 处理BigInt序列化
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(obj: any) {
    const jsonString = JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonString);
  };
  next();
});

const execAsync = promisify(exec);
const prisma = new PrismaClient();

// 中间件
app.use(cors());
app.use(express.json());

// 支持的网络列表
const SUPPORTED_NETWORKS = ['bsc-testnet', 'bsc', 'polygon', 'ethereum'];

// 获取监控程序状态
async function getMonitorStatus(network: string): Promise<{
  network: string;
  status: 'online' | 'offline' | 'error';
  pid?: number;
  uptime?: string;
  lastBlock?: number;
  totalEvents?: number;
  error?: string;
}> {
  try {
    // 检查进程是否存在
    const { stdout } = await execAsync(`ps aux | grep "tsx.*start.*--network.*${network}" | grep -v grep || true`);
    
    // 确保精确匹配网络名称，避免bsc匹配到bsc-testnet
    const exactMatch = stdout.includes(`--network ${network}`) && 
      (network === 'bsc-testnet' || !stdout.includes('bsc-testnet'));
    
    if (!exactMatch) {
      return {
        network,
        status: 'offline'
      };
    }

    // 提取进程ID
    const pidMatch = stdout.match(/\s+(\d+)\s+/);
    const pid = pidMatch ? parseInt(pidMatch[1]) : undefined;

    // 检查日志文件获取运行状态
    try {
      const logFile = `./logs/block-scanner.log`;
      const { stdout: logContent } = await execAsync(`tail -10 "${logFile}" 2>/dev/null || echo "No log file"`);
      
      // 从JSON日志中提取信息 - 获取最新的区块数据
      const lastBlockMatches = logContent.match(/"currentBlock":"(\d+)"/g);
      const lastBlock = lastBlockMatches ? 
        Math.max(...lastBlockMatches.map(match => parseInt(match.match(/"currentBlock":"(\d+)"/)[1]))) : 
        undefined;
      
      const eventsMatches = logContent.match(/"totalEvents":(\d+)/g);
      const totalEvents = eventsMatches ? 
        Math.max(...eventsMatches.map(match => parseInt(match.match(/"totalEvents":(\d+)/)[1]))) : 
        undefined;

      return {
        network,
        status: 'online',
        pid,
        lastBlock,
        totalEvents,
        uptime: '运行中'
      };
    } catch (logError) {
      return {
        network,
        status: 'online',
        pid,
        uptime: '运行中'
      };
    }
  } catch (error: any) {
    return {
      network,
      status: 'error',
      error: error.message
    };
  }
}

// API路由

// 获取所有网络状态
app.get('/api/monitor/status', async (req, res) => {
  try {
    const networks = [];
    
    for (const network of SUPPORTED_NETWORKS) {
      const status = await getMonitorStatus(network);
      networks.push(status);
    }

    const summary = {
      totalNetworks: networks.length,
      onlineNetworks: networks.filter(n => n.status === 'online').length,
      offlineNetworks: networks.filter(n => n.status === 'offline').length,
      errorNetworks: networks.filter(n => n.status === 'error').length
    };

    res.json({
      success: true,
      data: { networks, summary },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('获取监控程序状态失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取单个网络状态
app.get('/api/monitor/status/:network', async (req, res) => {
  try {
    const { network } = req.params;
    const status = await getMonitorStatus(network);
    res.json({ success: true, data: status });
  } catch (error: any) {
    console.error('获取监控程序状态失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 启动监控程序
app.post('/api/monitor/control/start', async (req, res) => {
  try {
    const { network } = req.body;
    
    if (!network || !SUPPORTED_NETWORKS.includes(network)) {
      return res.status(400).json({ success: false, error: '不支持的网络' });
    }

    // 检查是否已经在运行
    const { stdout } = await execAsync(`ps aux | grep "tsx.*start.*--network.*${network}" | grep -v grep || true`);
    if (stdout.includes(`--network ${network}`)) {
      return res.json({ success: false, message: `网络 ${network} 的监控程序已在运行` });
    }

    // 启动监控程序
    const command = `nohup tsx src/cli.ts start --network ${network} --config-mode db > logs/${network}-monitor.log 2>&1 &`;
    await execAsync(command);

    // 等待启动
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 检查是否启动成功
    const { stdout: psOutput } = await execAsync(`ps aux | grep "tsx.*start.*--network.*${network}" | grep -v grep || true`);
    if (psOutput.includes(`--network ${network}`)) {
      const pidMatch = psOutput.match(/\s+(\d+)\s+/);
      const pid = pidMatch ? parseInt(pidMatch[1]) : undefined;
      res.json({ success: true, message: `网络 ${network} 监控程序启动成功`, pid });
    } else {
      res.json({ success: false, message: `网络 ${network} 监控程序启动失败` });
    }
  } catch (error: any) {
    console.error('启动监控程序失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 停止监控程序
app.post('/api/monitor/control/stop', async (req, res) => {
  try {
    const { network } = req.body;
    
    if (!network || !SUPPORTED_NETWORKS.includes(network)) {
      return res.status(400).json({ success: false, error: '不支持的网络' });
    }

    // 查找并停止进程
    const { stdout } = await execAsync(`ps aux | grep "tsx.*start.*--network.*${network}" | grep -v grep | awk '{print $2}' || true`);
    const pids = stdout.trim().split('\n').filter(pid => pid);
    
    if (pids.length === 0) {
      return res.json({ success: false, message: `网络 ${network} 的监控程序未运行` });
    }

    // 停止所有相关进程
    for (const pid of pids) {
      await execAsync(`kill ${pid}`);
    }

    res.json({ success: true, message: `网络 ${network} 监控程序已停止` });
  } catch (error: any) {
    console.error('停止监控程序失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 重启监控程序
app.post('/api/monitor/control/restart', async (req, res) => {
  try {
    const { network } = req.body;
    
    if (!network || !SUPPORTED_NETWORKS.includes(network)) {
      return res.status(400).json({ success: false, error: '不支持的网络' });
    }

    // 先停止
    const stopResponse = await fetch(`http://localhost:3002/api/monitor/control/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ network })
    });
    
    // 等待停止完成
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 再启动
    const startResponse = await fetch(`http://localhost:3002/api/monitor/control/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ network })
    });

    const result = await startResponse.json();
    res.json(result);
  } catch (error: any) {
    console.error('重启监控程序失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取监控数据
app.get('/api/monitor/data/blocks', async (req, res) => {
  try {
    const { network, limit = 100 } = req.query;
    
    const blocks = await prisma.$queryRaw`
      SELECT * FROM ngp_monitor.blocks 
      WHERE chain_id = ${network ? parseInt(network as string) : 97}
      ORDER BY block_number DESC 
      LIMIT ${parseInt(limit as string)}
    `;

    res.json({ success: true, data: blocks });
  } catch (error: any) {
    console.error('获取区块数据失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取事件数据
app.get('/api/monitor/data/events', async (req, res) => {
  try {
    const { network, limit = 100 } = req.query;
    
    if (!network) {
      return res.status(400).json({ success: false, error: 'Network parameter is required' });
    }

    // 根据网络名称映射到chainId
    const networkToChainId: { [key: string]: number } = {
      'bsc-testnet': 97,
      'bsc': 56,
      'polygon': 137,
      'ethereum': 1
    };

    const chainId = networkToChainId[network as string];
    if (!chainId) {
      return res.status(400).json({ success: false, error: 'Unsupported network' });
    }

    const events = await prisma.$queryRaw`
      SELECT * FROM events 
      WHERE chain_id = ${chainId}
      ORDER BY timestamp DESC 
      LIMIT ${parseInt(limit as string)}
    `;

    res.json({ success: true, data: events });
  } catch (error: any) {
    console.error('获取事件数据失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取日志
app.get('/api/monitor/logs', async (req, res) => {
  try {
    const { network, lines = 100 } = req.query;
    
    if (!network || !SUPPORTED_NETWORKS.includes(network as string)) {
      return res.status(400).json({ success: false, error: '不支持的网络' });
    }

    const logFile = `./logs/block-scanner.log`;
    const { stdout: logContent } = await execAsync(`tail -${lines} "${logFile}" 2>/dev/null || echo "No log file"`);
    
    // 解析日志内容
    const logLines = logContent.split('\n').filter(line => line.trim()).map((line, index) => ({
      id: `${network}-${index}`,
      timestamp: new Date().toISOString(),
      message: line.trim(),
      level: line.includes('ERROR') ? 'error' : 
             line.includes('WARN') ? 'warn' : 
             line.includes('INFO') ? 'info' : 'debug',
      network: network as string
    }));

    res.json({ 
      success: true, 
      data: { 
        logs: logLines,
        network: network as string,
        total: logLines.length
      }
    });
  } catch (error: any) {
    console.error('获取日志失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取进程输出（实时日志）
app.get('/api/monitor/process-output', async (req, res) => {
  try {
    const { network, lines = 50 } = req.query;
    
    if (!network || !SUPPORTED_NETWORKS.includes(network as string)) {
      return res.status(400).json({ success: false, error: '不支持的网络' });
    }

    const logFile = `./logs/block-scanner.log`;
    const { stdout: logContent } = await execAsync(`tail -${lines} "${logFile}" 2>/dev/null || echo "No log file"`);
    
    // 解析日志内容
    const logLines = logContent.split('\n').filter(line => line.trim()).map((line, index) => ({
      id: `${network}-${Date.now()}-${index}`,
      timestamp: new Date().toISOString(),
      message: line.trim(),
      level: line.includes('ERROR') ? 'error' : 
             line.includes('WARN') ? 'warn' : 
             line.includes('INFO') ? 'info' : 'debug',
      network: network as string
    }));

    res.json({ 
      success: true, 
      data: { 
        logs: logLines,
        network: network as string,
        total: logLines.length
      }
    });
  } catch (error: any) {
    console.error('获取进程输出失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 健康检查
app.get('/api/monitor/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'monitor-service'
  });
});

// 启动服务器
const PORT = process.env.MONITOR_API_PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Monitor Service API running on port ${PORT}`);
});

export default app;
