# NGP Monitor Service 开发指南

## 📋 目录

1. [项目结构](#项目结构)
2. [开发环境设置](#开发环境设置)
3. [代码架构](#代码架构)
4. [核心模块说明](#核心模块说明)
5. [开发工作流](#开发工作流)
6. [测试指南](#测试指南)
7. [调试技巧](#调试技巧)
8. [常见问题](#常见问题)

## 🏗️ 项目结构

```
monitor-service/
├── src/                          # 源代码目录
│   ├── api/                      # API服务器
│   │   ├── index.ts              # API入口（端口3001）
│   │   └── server.ts             # API路由定义
│   ├── api-server.ts             # 监控管理API（端口3002）
│   ├── config/                   # 配置管理
│   │   ├── DynamicConfigLoader.ts # 动态配置加载器
│   │   ├── MultiNetworkLoader.ts  # 多网络配置加载器
│   │   ├── types.ts              # 配置类型定义
│   │   └── load.ts               # 配置加载工具
│   ├── indexer/                  # 索引器
│   │   ├── LogIndexer.ts         # 事件日志索引器
│   │   └── TxDecoder.ts           # 交易解码器
│   ├── scanner/                  # 区块扫描器
│   │   ├── BlockScanner.ts       # 区块扫描核心
│   │   └── backfill.ts           # 历史数据回填
│   ├── services/                 # 业务服务
│   │   ├── ContractSyncService.ts # 合约同步服务
│   │   └── ClaimDataProcessor.ts # 数据处理器
│   ├── registry/                 # ABI注册表
│   │   └── abi.ts                # ABI管理
│   ├── utils/                    # 工具类
│   │   └── RpcManager.ts         # RPC管理器
│   ├── writer/                   # 数据写入
│   │   └── db.ts                # 数据库操作
│   ├── processors/               # 数据处理器
│   │   └── MeshProcessor.ts     # Mesh数据处理器
│   ├── MonitorService.ts         # 监控服务核心
│   ├── MultiNetworkManager.ts    # 多网络管理器
│   ├── SimpleMonitorService.ts   # 简化监控服务
│   ├── cli.ts                    # 命令行接口
│   └── simple-start.ts          # 简单启动脚本
├── prisma/                       # Prisma数据库模式
│   ├── schema.prisma             # 监控数据库模式
│   ├── management.prisma         # 管理数据库模式
│   └── multi-network-schema.prisma # 多网络模式
├── config/                       # 配置文件
│   └── multi-network.json        # 多网络配置
├── abis/                         # 合约ABI文件
├── scripts/                      # 脚本工具
│   ├── pm2-manager.js            # PM2管理脚本
│   └── start-multi-network.js    # 多网络启动脚本
├── docs/                         # 文档目录
└── ecosystem.config.cjs          # PM2配置文件
```

## 🛠️ 开发环境设置

### 1. 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **MySQL**: >= 8.0
- **TypeScript**: ^5.9.2

### 2. 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd monitor-service

# 安装依赖
npm install

# 生成Prisma客户端
npx prisma generate

# 初始化数据库
npx prisma db push
```

### 3. 环境变量配置

创建 `.env` 文件：

```bash
# 管理数据库
MANAGEMENT_DATABASE_URL=mysql://user:password@localhost:3306/ngp_management

# 监控数据库
MONITOR_DATABASE_URL=mysql://user:password@localhost:3306/ngp_monitor

# API端口
API_PORT=3001
MONITOR_API_PORT=3002

# 日志级别
LOG_LEVEL=debug
```

### 4. 开发工具

推荐使用以下工具：

- **IDE**: VS Code 或 WebStorm
- **数据库工具**: Prisma Studio (`npx prisma studio`)
- **API测试**: Postman 或 curl
- **进程管理**: PM2

## 🏛️ 代码架构

### 整体架构

```
┌─────────────────────────────────────────┐
│         MultiNetworkManager             │
│  (管理多个网络的监控服务)                 │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────┐
│ MonitorService │  │ MonitorService │
│  (BSC Testnet) │  │  (BSC Mainnet)  │
└──────┬───────┘  └──────┬───────┘
       │                 │
┌──────▼─────────────────▼──────┐
│      BlockScanner              │
│  (区块扫描和异常检测)           │
└──────┬─────────────────────────┘
       │
┌──────▼──────────┐  ┌──────────────┐
│   LogIndexer    │  │  TxDecoder   │
│  (事件索引)      │  │ (交易解码)    │
└─────────────────┘  └──────────────┘
```

### 核心组件关系

1. **MultiNetworkManager**: 顶层管理器，负责启动/停止多个网络
2. **MonitorService**: 单个网络的监控服务，管理扫描循环
3. **BlockScanner**: 区块扫描器，负责获取和处理区块数据
4. **LogIndexer**: 事件日志索引器，解析和存储事件
5. **TxDecoder**: 交易解码器，解析函数调用
6. **RpcManager**: RPC连接管理器，处理多节点轮换

## 📦 核心模块说明

### 1. MonitorService

**位置**: `src/MonitorService.ts`

**职责**:
- 初始化监控组件
- 管理扫描循环
- 处理起始区块设置
- 注册合约到数据库

**关键方法**:
```typescript
async init(): Promise<void>        // 初始化服务
async start(): Promise<void>       // 启动监控
async stop(): Promise<void>        // 停止监控
```

### 2. BlockScanner

**位置**: `src/scanner/BlockScanner.ts`

**职责**:
- 扫描指定区块范围
- 检测区块重组
- 智能区块存储
- RPC错误处理

**关键方法**:
```typescript
async scanBlockRange(fromBlock: bigint, toBlock: bigint): Promise<void>
async checkReorg(blockNumber: bigint, blockHash: string): Promise<boolean>
```

### 3. LogIndexer

**位置**: `src/indexer/LogIndexer.ts`

**职责**:
- 解析合约事件日志
- 批量存储事件数据
- 事件去重处理

**关键方法**:
```typescript
async processBlock(block: any): Promise<number>
async processLogs(logs: Log[]): Promise<number>
```

### 4. TxDecoder

**位置**: `src/indexer/TxDecoder.ts`

**职责**:
- 解析合约函数调用
- 提取函数参数
- 记录调用结果

**关键方法**:
```typescript
async processBlock(block: any): Promise<number>
async processTransactions(transactions: Transaction[]): Promise<number>
```

### 5. RpcManager

**位置**: `src/utils/RpcManager.ts`

**职责**:
- 管理多个RPC节点
- 自动故障切换
- 连接状态监控

**关键方法**:
```typescript
getCurrentRpcUrl(): string
markRpcFailed(url: string, error: any): void
markRpcSuccess(url: string): void
```

## 🔄 开发工作流

### 1. 添加新网络

1. 在 `config/multi-network.json` 中添加网络配置：
```json
{
  "networks": {
    "new-network": {
      "name": "New Network",
      "chainId": 123,
      "rpcHttp": ["https://rpc.example.com"],
      "startBlock": 0,
      "contracts": [...]
    }
  }
}
```

2. 测试网络连接：
```bash
npm run test-bsc  # 使用测试脚本验证
```

3. 启动监控：
```bash
npm run cli start -- --network new-network
```

### 2. 添加新合约

1. 在管理数据库中注册合约（或通过API）
2. 添加合约ABI文件到 `abis/` 目录
3. 更新网络配置中的合约列表
4. 重启监控服务或等待动态更新

### 3. 修改数据库模式

1. 编辑 `prisma/schema.prisma`
2. 生成Prisma客户端：
```bash
npx prisma generate
```
3. 应用数据库迁移：
```bash
npx prisma db push
```

### 4. 添加新的API接口

1. 在 `src/api/server.ts` 中添加路由
2. 实现业务逻辑
3. 添加错误处理
4. 更新API文档

## 🧪 测试指南

### 单元测试

```bash
# 运行测试（需要配置测试环境）
npm test
```

### 集成测试

```bash
# 测试数据库连接
tsx src/test-db-connection.ts

# 测试多网络功能
tsx src/test-multi-network.ts

# 测试合约同步
tsx src/test-contract-sync.ts
```

### 手动测试

1. **测试区块扫描**:
```bash
npm run cli start -- --network bsc-testnet --start-block current
```

2. **测试API接口**:
```bash
# 启动API服务器
npm run api-server

# 测试接口
curl http://localhost:3001/health
curl http://localhost:3001/api/contracts
```

3. **测试PM2管理**:
```bash
npm run pm2:start
npm run pm2:status
```

## 🐛 调试技巧

### 1. 日志调试

设置日志级别为 `debug`:
```bash
LOG_LEVEL=debug npm run cli start -- --network bsc-testnet
```

### 2. 使用Prisma Studio

查看数据库数据：
```bash
npx prisma studio
```

### 3. 使用Node.js调试器

```bash
# 启动调试模式
node --inspect-brk=9229 -r tsx/register src/cli.ts start --network bsc-testnet

# 在Chrome中打开 chrome://inspect
```

### 4. 查看PM2日志

```bash
# 查看实时日志
npm run pm2:logs monitor-bsc-testnet

# 查看错误日志
pm2 logs monitor-bsc-testnet --err
```

### 5. 数据库查询调试

```typescript
// 在代码中添加查询日志
const result = await prisma.event.findMany({...});
logger.debug({ result }, 'Query result');
```

## ❓ 常见问题

### 1. RPC连接失败

**问题**: 无法连接到RPC节点

**解决方案**:
- 检查RPC URL是否正确
- 确认网络连接正常
- 使用RpcManager的轮换机制
- 检查防火墙设置

### 2. 数据库连接失败

**问题**: Prisma无法连接数据库

**解决方案**:
- 检查环境变量 `DATABASE_URL`
- 确认数据库服务正在运行
- 验证数据库用户权限
- 检查网络连接

### 3. 内存泄漏

**问题**: 长时间运行后内存占用过高

**解决方案**:
- 检查是否有未释放的定时器
- 使用 `--max-old-space-size` 限制内存
- 定期重启服务
- 检查数据库连接池配置

### 4. 区块扫描停止

**问题**: 扫描进程停止工作

**解决方案**:
- 检查异常记录表
- 查看日志文件
- 验证RPC节点状态
- 检查数据库连接

### 5. 事件重复存储

**问题**: 相同事件被多次存储

**解决方案**:
- 检查去重逻辑
- 验证唯一索引是否正确
- 使用 `upsert` 操作
- 检查事务处理

## 📚 相关资源

- [Prisma文档](https://www.prisma.io/docs)
- [Ethers.js文档](https://docs.ethers.io)
- [Viem文档](https://viem.sh)
- [PM2文档](https://pm2.keymetrics.io/docs)

## 🔗 相关文档

- [快速开始指南](QUICK_START.md)
- [技术文档](TECHNICAL_DOCUMENTATION.md)
- [API文档](API_DOCUMENTATION.md)
- [PM2管理](PM2_MANAGEMENT.md)

