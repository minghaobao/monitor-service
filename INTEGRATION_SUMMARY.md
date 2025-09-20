# NGP Monitor Service 集成总结

## 概述

已成功改进monitor-service，使其能够从management系统自动获取合约地址并实现实时监控。该服务现在支持动态配置、合约地址同步、事件监控和API查询功能。

## 主要改进

### 1. 动态合约地址同步

- **ContractSyncService**: 从management数据库获取已部署的合约地址
- **DynamicConfigLoader**: 动态加载配置，支持合约地址变化监听
- **自动同步**: 服务启动时自动同步合约信息到monitor数据库

### 2. 增强的监控服务

- **MonitorService**: 支持动态配置的监控服务
- **实时监控**: 监控合约事件和函数调用
- **历史回放**: 支持回放指定区块范围的历史数据
- **异常处理**: 完善的错误处理和日志记录

### 3. CLI工具

- **合约同步**: `npm run sync-contracts`
- **合约列表**: `npm run list-contracts`
- **历史回放**: `npm run backfill`
- **服务管理**: 完整的CLI命令支持

### 4. API服务

- **RESTful API**: 提供查询监控数据的API接口
- **统计信息**: 获取合约、事件、函数调用统计
- **分页查询**: 支持分页查询事件和函数调用
- **健康检查**: 服务健康状态监控

## 文件结构

```
monitor-service/
├── src/
│   ├── api/                    # API服务
│   │   ├── server.ts          # Express服务器
│   │   └── index.ts           # API入口
│   ├── config/                # 配置管理
│   │   ├── DynamicConfigLoader.ts
│   │   ├── load.ts
│   │   └── types.ts
│   ├── services/              # 服务层
│   │   └── ContractSyncService.ts
│   ├── cli.ts                 # CLI工具
│   ├── index.ts               # 主入口
│   └── MonitorService.ts      # 监控服务
├── config.dynamic.json        # 动态配置文件
├── deploy.sh                  # 部署脚本
├── test-integration.js        # 集成测试
└── README.md                  # 使用文档
```

## 核心功能

### 合约地址同步

```typescript
// 从management数据库获取合约地址
const contracts = await contractSyncService.getDeployedContracts();

// 同步到monitor数据库
await contractSyncService.syncContractsToMonitor(contracts);
```

### 动态配置加载

```typescript
// 创建动态配置加载器
const dynamicLoader = new DynamicConfigLoader(
  managementDatabaseUrl,
  monitorDatabaseUrl,
  baseConfig
);

// 获取动态配置
const config = dynamicLoader.getDynamicConfig();
```

### 监控服务

```typescript
// 创建监控服务（支持动态配置）
const monitorService = new MonitorService(
  baseConfig,
  managementDatabaseUrl,
  monitorDatabaseUrl
);

// 启动监控
await monitorService.init();
await monitorService.start();
```

## 使用方法

### 1. 环境配置

```bash
# 设置环境变量
export MANAGEMENT_DATABASE_URL="mysql://user:pass@host:port/management_db"
export MONITOR_DATABASE_URL="mysql://user:pass@host:port/monitor_db"
```

### 2. 安装和构建

```bash
cd monitor-service
npm install
npm run build
```

### 3. 数据库迁移

```bash
npx prisma generate
npx prisma db push
```

### 4. 同步合约地址

```bash
npm run sync-contracts
```

### 5. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start

# API服务
npm run api
```

## API接口

### 健康检查
```
GET /health
```

### 获取合约列表
```
GET /api/contracts
```

### 获取合约事件
```
GET /api/contracts/:address/events?page=1&limit=50&eventName=Transfer
```

### 获取合约函数调用
```
GET /api/contracts/:address/function-calls?page=1&limit=50&methodName=transfer
```

### 获取最新事件
```
GET /api/events/latest?limit=100
```

### 获取统计信息
```
GET /api/stats
```

## 监控的合约

服务会自动监控以下合约（地址从management数据库动态获取）：

- **Meshes**: 网格合约
- **Reward**: 奖励合约
- **FoundationManage**: 基金会管理合约
- **Stake**: 质押合约
- **SafeManager**: Safe管理合约
- **AutomatedExecutor**: 自动执行器合约
- **CheckInVerifier**: 签到验证器合约

## 数据存储

### 监控数据库表

- `contracts`: 合约注册表
- `blocks`: 区块信息
- `events`: 链上事件
- `function_calls`: 方法调用
- `checkpoints`: 处理进度
- `anomalies`: 异常记录

### 数据同步

- 服务启动时从management数据库同步合约地址
- 定期检查合约地址变化并更新监控配置
- 实时监控合约事件和函数调用

## 部署

### 自动部署

```bash
chmod +x deploy.sh
./deploy.sh
```

### 手动部署

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 数据库迁移
npx prisma db push

# 4. 同步合约
npm run sync-contracts

# 5. 启动服务
npm start
```

## 监控和日志

### 日志级别

- `info`: 一般信息
- `warn`: 警告信息
- `error`: 错误信息
- `debug`: 调试信息

### 日志查看

```bash
# 查看服务日志
sudo journalctl -u ngp-monitor -f

# 查看API日志
npm run api
```

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库URL配置
   - 验证数据库服务状态
   - 确认用户权限

2. **合约地址未找到**
   - 确保management数据库中有合约记录
   - 运行 `sync-contracts` 命令
   - 检查合约地址格式

3. **RPC连接失败**
   - 验证RPC URL可访问性
   - 检查网络连接
   - 确认RPC服务状态

### 调试模式

```bash
LOG_LEVEL=debug npm run dev
```

## 性能优化

### 配置建议

- 调整 `scanBlockSpan` 参数控制扫描区块范围
- 设置合适的 `parallelRequests` 并发请求数
- 配置 `confirmations` 确认区块数

### 监控建议

- 定期检查服务状态
- 监控数据库性能
- 关注RPC连接稳定性

## 安全考虑

- 使用环境变量存储敏感信息
- 限制API访问权限
- 定期更新依赖包
- 监控异常活动

## 总结

NGP Monitor Service 已成功集成management系统，实现了：

✅ 动态合约地址同步  
✅ 实时事件监控  
✅ 历史数据回放  
✅ RESTful API接口  
✅ CLI管理工具  
✅ 完善的日志记录  
✅ 自动化部署脚本  

该服务现在能够自动从management系统获取合约地址，实现对NGP生态系统中所有智能合约的全面监控，为系统运营提供可靠的数据支持。
