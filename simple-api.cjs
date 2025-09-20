const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 模拟统计数据
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalContracts: 3,
      totalBlocks: 5,
      totalEvents: 10,
      totalFunctionCalls: 8,
      networks: {
        "97": {
          name: "BSC Testnet",
          contracts: 3,
          blocks: 5,
          events: 10,
          functionCalls: 8
        }
      }
    }
  });
});

// 模拟网络数据
app.get('/api/networks', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        chainId: "97",
        name: "BSC Testnet",
        status: "running",
        contracts: 3,
        lastProcessedBlock: "65574204"
      }
    ]
  });
});

// 模拟区块数据
app.get('/api/blocks/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const blocks = [];
  
  for (let i = 0; i < limit; i++) {
    blocks.push({
      id: i + 1,
      chainId: "97",
      blockNumber: (65574200 + i).toString(),
      blockHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      finalized: i < 3
    });
  }
  
  res.json({
    success: true,
    data: blocks
  });
});

// 模拟事件数据
app.get('/api/events/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const events = [];
  const eventNames = ['Transfer', 'Approval', 'Claim', 'Stake', 'Unstake'];
  const contracts = [
    '0xF1981B4C4543962e37Acd59ee6Cf19C0cD706a77',
    '0x1234567890123456789012345678901234567890',
    '0x2345678901234567890123456789012345678901'
  ];
  
  for (let i = 0; i < limit; i++) {
    events.push({
      id: i + 1,
      chainId: "97",
      blockNumber: (65574200 + i).toString(),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      eventName: eventNames[i % eventNames.length],
      contractAddress: contracts[i % contracts.length],
      timestamp: new Date(Date.now() - i * 30000).toISOString()
    });
  }
  
  res.json({
    success: true,
    data: events
  });
});

// 模拟函数调用数据
app.get('/api/function-calls/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const calls = [];
  const methods = ['transfer', 'approve', 'claim', 'stake', 'unstake'];
  const contracts = [
    '0xF1981B4C4543962e37Acd59ee6Cf19C0cD706a77',
    '0x1234567890123456789012345678901234567890',
    '0x2345678901234567890123456789012345678901'
  ];
  
  for (let i = 0; i < limit; i++) {
    calls.push({
      id: i + 1,
      chainId: "97",
      blockNumber: (65574200 + i).toString(),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      methodName: methods[i % methods.length],
      contractAddress: contracts[i % contracts.length],
      status: Math.random() > 0.1, // 90% 成功率
      timestamp: new Date(Date.now() - i * 45000).toISOString()
    });
  }
  
  res.json({
    success: true,
    data: calls
  });
});

// 日志API
app.get('/api/logs', (req, res) => {
  try {
    const logsDir = path.join(__dirname, 'logs');
    const logFiles = fs.readdirSync(logsDir).filter(file => file.endsWith('.log'));
    
    let allLogs = [];
    
    logFiles.forEach(file => {
      const filePath = path.join(logsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      lines.forEach((line, index) => {
        // 解析日志格式：时间戳: 内容
        const match = line.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}):\s*(.*)$/);
        if (match) {
          const [, timestamp, message] = match;
          allLogs.push({
            id: `${file}-${index}`,
            timestamp: timestamp,
            level: getLogLevel(message),
            message: message,
            service: getServiceFromFilename(file),
            network: getNetworkFromFilename(file),
            file: file
          });
        }
      });
    });
    
    // 按时间戳排序，最新的在前
    allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // 限制返回数量
    const limit = parseInt(req.query.limit) || 100;
    allLogs = allLogs.slice(0, limit);
    
    res.json({
      success: true,
      data: allLogs
    });
  } catch (error) {
    console.error('Error reading logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to read logs'
    });
  }
});

// 辅助函数
function getLogLevel(message) {
  if (message.includes('ERROR') || message.includes('Error')) return 'error';
  if (message.includes('WARN') || message.includes('Warning')) return 'warn';
  if (message.includes('DEBUG') || message.includes('Debug')) return 'debug';
  return 'info';
}

function getServiceFromFilename(filename) {
  if (filename.includes('bsc')) return 'bsc-scanner';
  if (filename.includes('ethereum')) return 'ethereum-scanner';
  if (filename.includes('polygon')) return 'polygon-scanner';
  return 'monitor-service';
}

function getNetworkFromFilename(filename) {
  if (filename.includes('bsc-testnet')) return 'bsc-testnet';
  if (filename.includes('bsc')) return 'bsc-mainnet';
  if (filename.includes('ethereum')) return 'ethereum';
  if (filename.includes('polygon')) return 'polygon';
  return 'unknown';
}

app.listen(PORT, () => {
  console.log(`🚀 Simple Monitor API server started on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
