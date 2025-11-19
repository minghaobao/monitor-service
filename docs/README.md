# NGP Monitor Service

一个功能完善的多网络区块链监控服务，用于实时监控和记录指定合约的事件和函数调用。


## 📚 文档导航

- [快速开始](QUICK_START.md) - 快速启动和使用指南
- [技术文档](TECHNICAL_DOCUMENTATION.md) - 完整的系统架构和核心算法说明
- [API文档](API_DOCUMENTATION.md) - RESTful API接口说明
- [开发指南](DEVELOPER_GUIDE.md) - 开发、测试、部署指南
- [PM2管理](PM2_MANAGEMENT.md) - PM2进程管理详细说明

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- MySQL >= 8.0
- npm >= 8.0.0

### 安装和配置
```bash
# 克隆项目
git clone <repository-url>
cd monitor-service

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置数据库连接

# 初始化数据库
npx prisma generate
npx prisma db push
```

### 启动服务
```bash
# 启动BSC测试网监控
npm run cli start -- --network bsc-testnet --start-block current

# 启动API服务器（数据查询API，端口3001）
npm run api-server

# 启动监控管理API（端口3002）
tsx src/api-server.ts
```

## ✨ 主要特性

- 🔄 **多网络支持**: 同时监控多个区块链网络
- 🔄 **动态配置**: 从管理数据库动态获取合约地址
- 🔄 **RPC轮换**: 多个RPC节点自动切换，提高稳定性
- 🔄 **智能存储**: 只保存包含相关合约活动的区块
- 🔄 **数据去重**: 防止重复扫描产生重复记录
- 🔄 **异常检测**: 自动检测区块重组等异常情况
- 🔄 **RESTful API**: 提供完整的查询接口

## 🏗️ 系统架构

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

## 📊 核心组件

- **MultiNetworkManager**: 多网络管理
- **MonitorService**: 监控服务核心
- **BlockScanner**: 区块扫描器
- **LogIndexer**: 事件日志解析器
- **TxDecoder**: 交易解码器
- **RpcManager**: RPC连接管理器
- **ContractSyncService**: 合约同步服务

## 🗄️ 数据库设计

### 核心表
- **Contract**: 合约注册表
- **Block**: 区块信息（只保存相关区块）
- **Event**: 链上事件
- **FunctionCall**: 函数调用记录
- **Anomaly**: 异常记录
- **Checkpoint**: 处理进度

### 数据去重
- Block: `chainId + blockNumber`
- Event: `chainId + txHash + logIndex`
- FunctionCall: `chainId + txHash`
- Contract: `address + chainId`

## 🔧 配置管理

### 环境变量
```bash
# 管理数据库（用于同步合约地址）
MANAGEMENT_DATABASE_URL=mysql://root@localhost:3306/ngp_management

# 监控数据库（用于存储事件和函数调用）
MONITOR_DATABASE_URL=mysql://root@localhost:3306/ngp_monitor

# 或者使用单一数据库URL（如果两个数据库相同）
# DATABASE_URL=mysql://root@localhost:3306/ngp_db

# API端口配置
API_PORT=3001              # 数据查询API端口
MONITOR_API_PORT=3002      # 监控管理API端口

# 日志级别
LOG_LEVEL=info
```

### 多网络配置
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
      "startBlock": 38000000,
      "contracts": [...]
    }
  }
}
```

## 🎯 使用示例

### 命令行操作
```bash
# 启动指定网络
npm run cli start -- --network bsc-testnet --start-block 65574200

# 查看网络状态
npm run cli network status

# 同步合约
npm run cli sync-contracts -- --network bsc-testnet
```

### API调用
```bash
# 获取所有合约（数据查询API，端口3001）
curl "http://localhost:3001/api/contracts?chainId=97"

# 获取合约事件
curl "http://localhost:3001/api/contracts/0x.../events?chainId=97"

# 获取统计信息
curl "http://localhost:3001/api/stats"

# 获取监控服务状态（监控管理API，端口3002）
curl "http://localhost:3002/api/monitor/status"
```

## 🔍 监控和运维

### 健康检查
```bash
# 检查数据查询API状态（端口3001）
curl "http://localhost:3001/health"

# 检查监控管理API状态（端口3002）
curl "http://localhost:3002/api/monitor/health"

# 查看日志
tail -f logs/monitor.log
```

### 性能监控
- 区块扫描速度
- RPC连接状态
- 数据库性能
- 内存使用情况

## 🛠️ 开发指南

### 添加新网络
1. 在`config/multi-network.json`中添加网络配置
2. 确保RPC节点可用
3. 测试网络连接
4. 启动监控服务

### 添加新合约
1. 在管理数据库中注册合约
2. 添加合约ABI文件
3. 重启监控服务或等待动态更新

### 自定义异常检测
```typescript
async checkCustomAnomaly(block: any): Promise<boolean> {
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
    return true;
  }
  return false;
}
```

## 📈 性能优化

### 存储优化
- 只保存包含相关合约活动的区块
- 使用upsert操作防止重复数据
- 合理的数据库索引设计

### 网络优化
- 多RPC节点轮换
- 自动故障切换
- 连接池管理

### 内存优化
- 分批处理大量数据
- 及时释放不需要的对象
- 监控内存使用情况

## 🚨 故障排查

### 常见问题
1. **RPC连接失败**: 检查RPC节点状态，使用轮换机制
2. **数据库连接失败**: 检查数据库配置和连接状态
3. **内存泄漏**: 使用调试工具分析内存使用
4. **扫描停止**: 检查异常记录和日志

### 调试工具
```bash
# 数据库调试
npx prisma studio

# 性能分析
npx clinic doctor -- node src/index.js

# 内存分析
node --inspect src/index.js
```

## 📝 更新日志

### v1.0.0
- 初始版本发布
- 支持多网络监控
- 动态配置管理
- RPC轮换机制
- 智能存储优化
- 完整的API接口

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 支持

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送邮件
- 查看文档

---

**注意**: 这是一个生产级别的监控服务，请在生产环境中谨慎使用，并确保充分测试。