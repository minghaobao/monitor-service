# NGP Monitor Service 技术文档

## 目录
1. [系统概述](#系统概述)
2. [架构设计](#架构设计)
3. [核心组件](#核心组件)
4. [运行机制](#运行机制)
5. [核心算法](#核心算法)
6. [数据库设计](#数据库设计)
7. [API接口](#api接口)
8. [配置管理](#配置管理)
9. [部署运维](#部署运维)
10. [开发指南](#开发指南)

## 系统概述

NGP Monitor Service 是一个多网络区块链监控服务，用于实时监控和记录指定合约的事件和函数调用。系统支持动态配置、多RPC轮换、数据去重等高级功能。

### 主要特性
- 🔄 **多网络支持**: 同时监控多个区块链网络
- 🔄 **动态配置**: 从管理数据库动态获取合约地址
- 🔄 **RPC轮换**: 多个RPC节点自动切换，提高稳定性
- 🔄 **智能存储**: 只保存包含相关合约活动的区块
- 🔄 **数据去重**: 防止重复扫描产生重复记录
- 🔄 **异常检测**: 自动检测区块重组等异常情况

## 架构设计

### 整体架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Management    │    │   Monitor       │    │   Blockchain    │
│   Database      │◄──►│   Service       │◄──►│   Networks      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Monitor       │
                       │   Database      │
                       │                 │
                       └─────────────────┘
```

### 核心模块关系
```
MultiNetworkManager
├── MonitorService (per network)
│   ├── BlockScanner
│   ├── LogIndexer
│   ├── TxDecoder
│   └── DynamicConfigLoader
├── ContractSyncService
└── RpcManager
```

## 核心组件

### 1. MultiNetworkManager
**职责**: 管理多个网络的监控服务

**核心功能**:
- 加载多网络配置
- 启动/停止指定网络服务
- 服务状态管理
- 错误处理和恢复

**关键方法**:
```typescript
async startNetwork(networkName: string): Promise<void>
async stopNetwork(networkName: string): Promise<void>
async getAllNetworkStatus(): Promise<NetworkStatus[]>
```

### 2. MonitorService
**职责**: 单个网络的监控服务核心

**核心功能**:
- 初始化监控组件
- 处理起始区块设置
- 注册合约到数据库
- 启动/停止监控循环

**关键方法**:
```typescript
async init(): Promise<void>
async start(): Promise<void>
async stop(): Promise<void>
private async handleStartBlock(): Promise<void>
```

### 3. BlockScanner
**职责**: 区块扫描和异常检测

**核心功能**:
- 扫描指定区块范围
- 检测区块重组
- 智能区块存储（只保存相关区块）
- RPC错误处理和轮换

**关键方法**:
```typescript
async scanBlockRange(fromBlock: bigint, toBlock: bigint): Promise<void>
async checkReorg(blockNumber: bigint, blockHash: string): Promise<boolean>
private async processEventsAndCalls(blocks: any[]): Promise<any[]>
```

### 4. LogIndexer
**职责**: 事件日志解析和存储

**核心功能**:
- 解析合约事件日志
- 批量存储事件数据
- 事件去重处理

**关键方法**:
```typescript
async processBlock(block: any): Promise<number>
async processLogs(logs: Log[]): Promise<number>
```

### 5. TxDecoder
**职责**: 交易解码和函数调用记录

**核心功能**:
- 解析合约函数调用
- 提取函数参数
- 记录调用结果

**关键方法**:
```typescript
async processBlock(block: any): Promise<number>
async processTransactions(transactions: Transaction[], blockTimestamp: bigint): Promise<number>
```

### 6. RpcManager
**职责**: RPC连接管理和轮换

**核心功能**:
- 管理多个RPC节点
- 自动故障切换
- 连接状态监控

**关键方法**:
```typescript
getCurrentRpcUrl(): string
markRpcFailed(url: string, error: any): void
markRpcSuccess(url: string): void
```

## 运行机制

### 1. 服务启动流程
```
1. 加载环境变量和配置
2. 初始化MultiNetworkManager
3. 启动指定网络服务
4. 初始化MonitorService
5. 加载动态配置（合约地址）
6. 设置起始区块
7. 注册合约到数据库
8. 启动区块扫描循环
```

### 2. 区块扫描循环
```
1. 获取最新区块高度
2. 计算扫描范围（当前区块到最新区块）
3. 分批扫描区块（避免内存溢出）
4. 处理每个区块的事件和交易
5. 只保存包含相关活动的区块
6. 更新检查点
7. 等待下次扫描间隔
```

### 3. 动态配置更新
```
1. 定期检查管理数据库
2. 比较合约配置变化
3. 更新本地配置
4. 重新初始化相关组件
5. 继续监控新合约
```

## 核心算法

### 1. 智能区块存储算法
```typescript
// 只保存包含相关合约活动的区块
const relevantBlocks = await this.processEventsAndCalls(blocks);
if (relevantBlocks.length > 0) {
  // 批量保存相关区块
  await this.prisma.$transaction(
    relevantBlocks.map(block => this.prisma.block.upsert(...))
  );
}
```

**算法优势**:
- 减少数据库存储空间
- 提高查询效率
- 降低维护成本

### 2. 数据去重算法
```typescript
// 使用upsert操作确保数据唯一性
await this.prisma.block.upsert({
  where: { chainId_blockNumber: { chainId, blockNumber } },
  create: blockData,
  update: blockData
});
```

**去重策略**:
- Block: `chainId + blockNumber`
- Event: `chainId + txHash + logIndex`
- FunctionCall: `chainId + txHash`
- Contract: `address + chainId`

### 3. RPC轮换算法
```typescript
class RpcManager {
  private currentIndex: number = 0;
  private failedUrls: Set<string> = new Set();
  
  getCurrentRpcUrl(): string {
    const availableUrls = this.getAvailableUrls();
    const url = availableUrls[this.currentIndex % availableUrls.length];
    this.currentIndex = (this.currentIndex + 1) % availableUrls.length;
    return url;
  }
}
```

**轮换策略**:
- 轮询选择RPC节点
- 失败节点临时禁用
- 定期重试失败节点
- 成功节点立即恢复

### 4. 区块重组检测算法
```typescript
async checkReorg(blockNumber: bigint, blockHash: string): Promise<boolean> {
  const storedBlock = await this.prisma.block.findUnique({
    where: { chainId_blockNumber: { chainId, blockNumber } }
  });
  
  if (storedBlock && storedBlock.blockHash !== blockHash) {
    // 记录重组异常
    await this.prisma.anomaly.create({
      data: { type: 'reorg', key: blockNumber.toString(), ... }
    });
    return true;
  }
  return false;
}
```

## 数据库设计

### 1. 核心表结构

#### Contract表
```sql
model Contract {
  id              Int      @id @default(autoincrement())
  chainId         BigInt   @map("chain_id")
  address         String   @db.VarChar(42)
  name            String   @db.VarChar(50)
  abiVersion      String   @map("abi_version") @db.VarChar(20)
  createdAt       DateTime @default(now()) @map("created_at")
  
  @@unique([address, chainId])
  @@index([chainId])
  @@index([address])
}
```

#### Block表
```sql
model Block {
  id              Int      @id @default(autoincrement())
  chainId         BigInt   @map("chain_id")
  blockNumber     BigInt   @map("block_number")
  blockHash       String   @map("block_hash") @db.VarChar(66)
  parentHash      String   @map("parent_hash") @db.VarChar(66)
  timestamp       DateTime
  finalized       Boolean  @default(false)
  createdAt       DateTime @default(now()) @map("created_at")

  @@unique([chainId, blockNumber])
  @@unique([chainId, blockHash])
  @@index([chainId])
  @@index([blockNumber])
  @@index([blockHash])
  @@index([chainId, timestamp])
}
```

#### Event表
```sql
model Event {
  id              Int      @id @default(autoincrement())
  chainId         BigInt   @map("chain_id")
  blockNumber     BigInt   @map("block_number")
  txHash          String   @map("tx_hash") @db.VarChar(66)
  logIndex        Int      @map("log_index")
  contractAddress String   @map("contract_address") @db.VarChar(42)
  eventName       String   @map("event_name") @db.VarChar(100)
  eventSignature  String   @map("event_signature") @db.VarChar(100)
  args            Json?    @db.Json
  removed         Boolean  @default(false)
  timestamp       DateTime
  createdAt       DateTime @default(now()) @map("created_at")

  @@unique([chainId, txHash, logIndex])
  @@index([chainId])
  @@index([blockNumber])
  @@index([txHash])
  @@index([contractAddress])
  @@index([chainId, timestamp])
}
```

#### FunctionCall表
```sql
model FunctionCall {
  id              Int      @id @default(autoincrement())
  chainId         BigInt   @map("chain_id")
  blockNumber     BigInt   @map("block_number")
  txHash          String   @map("tx_hash") @db.VarChar(66)
  contractAddress String   @map("contract_address") @db.VarChar(42)
  methodName      String   @map("method_name") @db.VarChar(100)
  methodSignature String   @map("method_signature") @db.VarChar(100)
  args            Json?    @db.Json
  from            String   @db.VarChar(42)
  value           String   @db.VarChar(78)
  status          Boolean
  gasUsed         BigInt   @map("gas_used")
  timestamp       DateTime
  createdAt       DateTime @default(now()) @map("created_at")

  @@unique([chainId, txHash])
  @@index([chainId])
  @@index([blockNumber])
  @@index([txHash])
  @@index([contractAddress])
  @@index([chainId, timestamp])
}
```

#### Anomaly表
```sql
model Anomaly {
  id          Int      @id @default(autoincrement())
  chainId     BigInt   @map("chain_id")
  type        String   @db.VarChar(50)  // missing_block, duplicate_block, reorg
  key         String   @db.VarChar(100) // block number or hash
  details     Json?    @db.Json
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([chainId, type])
  @@index([chainId, createdAt])
}
```

### 2. 数据关系
- Contract ←→ Event (一对多)
- Contract ←→ FunctionCall (一对多)
- Block ←→ Event (一对多)
- Block ←→ FunctionCall (一对多)

## API接口

### 1. 合约相关接口
```typescript
// 获取所有合约
GET /api/contracts?chainId=97

// 获取合约事件
GET /api/contracts/:address/events?chainId=97&fromBlock=1000&toBlock=2000

// 获取合约函数调用
GET /api/contracts/:address/function-calls?chainId=97&fromBlock=1000&toBlock=2000
```

### 2. 事件相关接口
```typescript
// 获取最新事件
GET /api/events/latest?chainId=97&limit=100

// 获取事件统计
GET /api/stats?chainId=97
```

### 3. 网络相关接口
```typescript
// 获取所有网络状态
GET /api/networks

// 获取网络统计
GET /api/stats?chainId=97
```

## 配置管理

### 1. 环境变量
```bash
# 数据库连接
MANAGEMENT_DATABASE_URL=mysql://root@localhost:3306/ngp_management
MONITOR_DATABASE_URL=mysql://root@localhost:3306/ngp_monitor

# 日志级别
LOG_LEVEL=info
```

### 2. 多网络配置
```json
{
  "networks": {
    "bsc-testnet": {
      "name": "BSC Testnet",
      "chainId": 97,
      "rpcHttp": [
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545"
      ],
      "rpcWs": "wss://bsc-testnet-ws-node.nariox.org:443/ws",
      "startBlock": 38000000,
      "confirmations": 12,
      "scanBlockSpan": 1000,
      "parallelRequests": 4,
      "contracts": [...]
    }
  }
}
```

### 3. 起始区块参数
- **数值**: 从指定区块开始扫描
- **"checkpoint"**: 从上次检查点继续
- **"current"**: 从当前区块开始

## 部署运维

### 1. 安装依赖
```bash
npm install
```

### 2. 数据库初始化
```bash
npx prisma generate
npx prisma db push
```

### 3. 启动服务
```bash
# 启动指定网络
npm run cli start -- --network bsc-testnet --start-block 65574200

# 启动所有网络
npm run cli start -- --all

# 启动API服务器
npm run api
```

### 4. 监控命令
```bash
# 查看网络状态
npm run cli network status

# 同步合约
npm run cli sync-contracts -- --network bsc-testnet

# 查看统计信息
curl http://localhost:3000/api/stats?chainId=97
```

## 开发指南

### 1. 项目结构
```
monitor-service/
├── src/
│   ├── api/                 # API服务器
│   ├── config/              # 配置管理
│   ├── indexer/             # 事件和交易解析
│   ├── registry/            # ABI注册表
│   ├── scanner/             # 区块扫描
│   ├── services/            # 业务服务
│   ├── utils/               # 工具类
│   └── cli.ts              # 命令行接口
├── prisma/
│   └── schema.prisma        # 数据库模式
├── config/
│   └── multi-network.json   # 多网络配置
└── abis/                    # 合约ABI文件
```

### 2. 添加新网络
1. 在`config/multi-network.json`中添加网络配置
2. 确保RPC节点可用
3. 测试网络连接
4. 启动监控服务

### 3. 添加新合约
1. 在管理数据库中注册合约
2. 添加合约ABI文件
3. 重启监控服务或等待动态更新

### 4. 自定义异常检测
```typescript
// 在BlockScanner中添加新的异常检测
async checkCustomAnomaly(block: any): Promise<void> {
  // 自定义检测逻辑
  if (/* 检测条件 */) {
    await this.prisma.anomaly.create({
      data: {
        chainId: this.config.chainId,
        type: 'custom_anomaly',
        key: block.number.toString(),
        details: { /* 详细信息 */ }
      }
    });
  }
}
```

### 5. 性能优化建议
- 调整`scanBlockSpan`参数控制扫描范围
- 优化`parallelRequests`参数控制并发数
- 定期清理历史数据
- 监控数据库性能

### 6. 故障排查
- 检查RPC连接状态
- 查看异常记录表
- 监控日志输出
- 验证数据库连接

## 总结

NGP Monitor Service 是一个功能完善的区块链监控系统，具有以下核心优势：

1. **高可用性**: 多RPC轮换和错误恢复机制
2. **数据完整性**: 去重机制和异常检测
3. **存储优化**: 智能区块存储策略
4. **动态配置**: 支持运行时配置更新
5. **多网络支持**: 可同时监控多个区块链网络

系统设计遵循模块化原则，易于扩展和维护，为后续开发提供了坚实的基础。
