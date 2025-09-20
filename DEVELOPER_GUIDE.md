# Monitor Service 开发指南

## 快速开始

### 1. 环境准备
```bash
# 安装Node.js (>=18.0.0)
node --version

# 安装依赖
npm install

# 安装Prisma CLI
npm install -g prisma
```

### 2. 数据库设置
```bash
# 生成Prisma客户端
npx prisma generate

# 推送数据库模式
npx prisma db push

# 查看数据库
npx prisma studio
```

### 3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
vim .env
```

### 4. 启动服务
```bash
# 启动BSC测试网监控
npm run cli start -- --network bsc-testnet --start-block current

# 启动API服务器
npm run api
```

## 项目结构详解

```
monitor-service/
├── src/
│   ├── api/                    # API服务器
│   │   └── server.ts          # Express服务器
│   ├── config/                 # 配置管理
│   │   ├── types.ts           # 类型定义
│   │   ├── index.ts           # 配置加载器
│   │   ├── MultiNetworkLoader.ts  # 多网络配置加载
│   │   └── DynamicConfigLoader.ts # 动态配置加载
│   ├── indexer/                # 事件和交易解析
│   │   ├── LogIndexer.ts      # 事件日志解析
│   │   └── TxDecoder.ts       # 交易解码
│   ├── registry/               # ABI注册表
│   │   └── abi.ts             # ABI管理
│   ├── scanner/                # 区块扫描
│   │   └── BlockScanner.ts    # 区块扫描器
│   ├── services/               # 业务服务
│   │   └── ContractSyncService.ts # 合约同步服务
│   ├── utils/                  # 工具类
│   │   └── RpcManager.ts      # RPC管理器
│   ├── MonitorService.ts       # 监控服务核心
│   ├── MultiNetworkManager.ts  # 多网络管理器
│   └── cli.ts                 # 命令行接口
├── prisma/
│   └── schema.prisma          # 数据库模式
├── config/
│   └── multi-network.json     # 多网络配置
├── abis/                      # 合约ABI文件
└── package.json
```

## 核心概念

### 1. 多网络架构
系统支持同时监控多个区块链网络，每个网络运行独立的MonitorService实例。

### 2. 动态配置
合约地址从管理数据库动态获取，支持运行时更新。

### 3. 智能存储
只保存包含相关合约活动的区块，减少存储空间。

### 4. 数据去重
使用upsert操作确保数据唯一性。

### 5. RPC轮换
自动切换RPC节点，提高系统稳定性。

## 开发工作流

### 1. 添加新网络
```typescript
// 1. 在config/multi-network.json中添加网络配置
{
  "networks": {
    "ethereum": {
      "name": "Ethereum Mainnet",
      "chainId": 1,
      "rpcHttp": ["https://eth.llamarpc.com"],
      "startBlock": 18000000,
      "contracts": []
    }
  }
}

// 2. 测试网络连接
npm run cli start -- --network ethereum --start-block current
```

### 2. 添加新合约
```typescript
// 1. 在管理数据库中注册合约
INSERT INTO contract_status (contract_name, contract_address, chain_id, is_paused) 
VALUES ('NewContract', '0x...', 1, false);

// 2. 添加ABI文件
// 将ABI文件放在abis/目录下

// 3. 重启服务或等待动态更新
```

### 3. 自定义异常检测
```typescript
// 在BlockScanner中添加新的异常检测
class BlockScanner {
  async checkCustomAnomaly(block: any): Promise<boolean> {
    // 自定义检测逻辑
    if (this.isCustomAnomaly(block)) {
      await this.prisma.anomaly.create({
        data: {
          chainId: this.config.chainId,
          type: 'custom_anomaly',
          key: block.number.toString(),
          details: {
            reason: 'Custom anomaly detected',
            blockData: block
          }
        }
      });
      return true;
    }
    return false;
  }
}
```

### 4. 添加新的API接口
```typescript
// 在api/server.ts中添加新路由
app.get('/api/custom-endpoint', async (req: Request, res: Response) => {
  try {
    const { chainId } = req.query;
    const data = await getCustomData(chainId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## 测试指南

### 1. 单元测试
```bash
# 运行测试
npm test

# 运行特定测试
npm test -- --grep "BlockScanner"
```

### 2. 集成测试
```bash
# 测试数据库连接
npm run test:db

# 测试RPC连接
npm run test:rpc

# 测试完整流程
npm run test:integration
```

### 3. 性能测试
```bash
# 测试扫描性能
npm run test:performance

# 测试API性能
npm run test:api-performance
```

## 调试技巧

### 1. 日志调试
```typescript
// 使用pino日志
import pino from 'pino';

const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty'
  }
});

logger.debug({ data }, 'Debug message');
```

### 2. 数据库调试
```bash
# 查看数据库状态
npx prisma studio

# 执行SQL查询
npx prisma db execute --stdin
```

### 3. RPC调试
```typescript
// 在RpcManager中添加调试日志
class RpcManager {
  getCurrentRpcUrl(): string {
    const url = this.rpcUrls[this.currentIndex];
    logger.debug({ url, index: this.currentIndex }, 'Using RPC URL');
    return url;
  }
}
```

## 性能优化

### 1. 数据库优化
```sql
-- 添加索引
CREATE INDEX idx_events_chain_timestamp ON events(chain_id, timestamp);
CREATE INDEX idx_blocks_chain_number ON blocks(chain_id, block_number);

-- 分区表（对于大量数据）
ALTER TABLE events PARTITION BY RANGE (UNIX_TIMESTAMP(timestamp));
```

### 2. 内存优化
```typescript
// 分批处理大量数据
async processLargeDataset(data: any[]) {
  const batchSize = 1000;
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await this.processBatch(batch);
  }
}
```

### 3. RPC优化
```typescript
// 调整并发请求数
const config = {
  parallelRequests: 4,  // 根据RPC限制调整
  scanBlockSpan: 1000   // 根据网络性能调整
};
```

## 部署指南

### 1. Docker部署
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. PM2部署
```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start ecosystem.config.js

# 监控服务
pm2 monit
```

### 3. 系统服务
```ini
[Unit]
Description=NGP Monitor Service
After=network.target

[Service]
Type=simple
User=monitor
WorkingDirectory=/opt/monitor-service
ExecStart=/usr/bin/node src/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

## 监控和告警

### 1. 健康检查
```typescript
// 添加健康检查接口
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      rpc: await checkRpc(),
      scanning: await checkScanning()
    }
  };
  res.json(health);
});
```

### 2. 指标收集
```typescript
// 使用Prometheus指标
import { register, Counter, Histogram } from 'prom-client';

const blocksScanned = new Counter({
  name: 'blocks_scanned_total',
  help: 'Total number of blocks scanned',
  labelNames: ['chainId']
});

const scanDuration = new Histogram({
  name: 'scan_duration_seconds',
  help: 'Duration of block scanning',
  labelNames: ['chainId']
});
```

### 3. 告警配置
```yaml
# alertmanager.yml
groups:
  - name: monitor-service
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
```

## 故障排查

### 1. 常见问题

#### RPC连接失败
```bash
# 检查RPC状态
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  https://data-seed-prebsc-1-s1.binance.org:8545
```

#### 数据库连接失败
```bash
# 检查数据库连接
npx prisma db pull

# 重置数据库
npx prisma db push --force-reset
```

#### 内存泄漏
```bash
# 监控内存使用
node --inspect src/index.js

# 使用Chrome DevTools分析
chrome://inspect
```

### 2. 日志分析
```bash
# 查看错误日志
grep "ERROR" logs/monitor.log

# 查看性能日志
grep "duration" logs/monitor.log | tail -100
```

### 3. 性能分析
```bash
# 使用clinic.js分析性能
npx clinic doctor -- node src/index.js

# 生成火焰图
npx clinic flame -- node src/index.js
```

## 贡献指南

### 1. 代码规范
- 使用TypeScript
- 遵循ESLint规则
- 添加适当的注释
- 编写单元测试

### 2. 提交规范
```bash
# 提交格式
git commit -m "feat: add new network support"
git commit -m "fix: resolve RPC connection issue"
git commit -m "docs: update API documentation"
```

### 3. 代码审查
- 确保代码质量
- 检查测试覆盖率
- 验证性能影响
- 更新相关文档

## 参考资料

- [Prisma文档](https://www.prisma.io/docs)
- [Viem文档](https://viem.sh)
- [Express文档](https://expressjs.com)
- [Pino日志](https://getpino.io)
- [Commander.js](https://github.com/tj/commander.js)
