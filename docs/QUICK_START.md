# NGP Monitor Service 快速操作指南

## 🚀 快速开始

### 前置准备

1. **安装依赖**
```bash
npm install
npx prisma generate
npx prisma db push
```

2. **配置环境变量**
```bash
cp env.example .env
# 编辑 .env 文件，设置数据库连接
```

### 1. 启动所有监控进程（停止状态）

```bash
npm run pm2:start
```

### 2. 启动特定网络监控

```bash
# BSC 测试网
npm run pm2:start-network monitor-bsc-testnet

# BSC 主网
npm run pm2:start-network monitor-bsc

# Polygon
npm run pm2:start-network monitor-polygon

# Ethereum
npm run pm2:start-network monitor-ethereum
```

### 3. 查看状态

```bash
npm run pm2:status
```

### 4. 查看日志

```bash
npm run pm2:logs monitor-bsc-testnet 20
```

### 5. 启动API服务器

```bash
# 启动数据查询API（端口3001）
npm run api-server

# 启动监控管理API（端口3002）
tsx src/api-server.ts
```

### 6. 验证服务

```bash
# 检查数据查询API
curl http://localhost:3001/health

# 检查监控管理API
curl http://localhost:3002/api/monitor/health

# 查看监控状态
curl http://localhost:3002/api/monitor/status
```

## 📋 常用命令

| 操作 | 命令 |
|------|------|
| 启动所有进程 | `npm run pm2:start` |
| 停止所有进程 | `npm run pm2:stop` |
| 重启所有进程 | `npm run pm2:restart` |
| 删除所有进程 | `npm run pm2:delete` |
| 启动特定网络 | `npm run pm2:start-network <网络名>` |
| 停止特定网络 | `npm run pm2:stop-network <网络名>` |
| 重启特定网络 | `npm run pm2:restart-network <网络名>` |
| 查看状态 | `npm run pm2:status` |
| 查看日志 | `npm run pm2:logs [网络名] [行数]` |
| 实时监控 | `npm run pm2:monitor` |

## 🔧 网络名称

- `monitor-bsc`: BSC 主网
- `monitor-bsc-testnet`: BSC 测试网
- `monitor-polygon`: Polygon 网络
- `monitor-ethereum`: Ethereum 主网

## ⚙️ 起始区块配置

```bash
# 从指定区块开始
npm run cli start -- --network bsc-testnet --start-block 38000000

# 从检查点继续（默认）
npm run cli start -- --network bsc-testnet --start-block checkpoint

# 从当前区块开始
npm run cli start -- --network bsc-testnet --start-block current
```

## 📡 API服务

### 数据查询API (端口3001)

提供合约、事件、函数调用等数据的查询接口。

```bash
# 启动服务
npm run api-server

# 查询示例
curl "http://localhost:3001/api/contracts?chainId=97"
curl "http://localhost:3001/api/stats"
```

### 监控管理API (端口3002)

提供监控服务状态查询和控制接口。

```bash
# 启动服务
tsx src/api-server.ts

# 查询示例
curl "http://localhost:3002/api/monitor/status"
curl "http://localhost:3002/api/monitor/status/bsc-testnet"
```

详细API文档请参考 [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🐛 故障排除

### 进程无法启动
```bash
# 查看错误日志
npm run pm2:logs monitor-bsc-testnet 100

# 检查进程状态
npm run pm2:status
```

### 数据库连接问题
```bash
# 测试数据库连接
tsx src/test-db-connection.ts
```

### 重启服务
```bash
# 重启特定网络
npm run pm2:restart-network monitor-bsc-testnet

# 重启所有网络
npm run pm2:restart
```

## 📊 监控界面

```bash
# 启动 PM2 监控界面
npm run pm2:monitor
```

## 📁 日志文件位置

```
logs/
├── monitor-bsc.log
├── monitor-bsc-testnet.log
├── monitor-polygon.log
└── monitor-ethereum.log
```

## 🔄 典型工作流程

1. **启动服务**
   ```bash
   npm run pm2:start
   ```

2. **启动需要的网络**
   ```bash
   npm run pm2:start-network monitor-bsc-testnet
   ```

3. **检查状态**
   ```bash
   npm run pm2:status
   ```

4. **查看日志**
   ```bash
   npm run pm2:logs monitor-bsc-testnet 50
   ```

5. **停止服务**
   ```bash
   npm run pm2:stop-network monitor-bsc-testnet
   ```

## 📚 相关文档

- [完整文档](README.md) - 项目总览
- [技术文档](TECHNICAL_DOCUMENTATION.md) - 系统架构和实现细节
- [API文档](API_DOCUMENTATION.md) - 完整的API接口说明
- [开发指南](DEVELOPER_GUIDE.md) - 开发和调试指南
- [PM2管理](PM2_MANAGEMENT.md) - PM2进程管理详细说明

---

**提示**: 
- 所有PM2进程默认启动后处于停止状态，需要手动启动特定网络进行监控
- API服务需要单独启动，不包含在PM2管理中
- 建议在生产环境中使用PM2管理监控进程，使用systemd或supervisor管理API服务
