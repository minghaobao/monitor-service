# NGP Monitor Service 快速操作指南

## 🚀 快速开始

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
tsx src/simple-start.ts start --network bsc-testnet --start-block 38000000

# 从检查点继续（默认）
tsx src/simple-start.ts start --network bsc-testnet --start-block checkpoint

# 从当前区块开始
tsx src/simple-start.ts start --network bsc-testnet --start-block current
```

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

---

**提示**: 所有进程默认启动后处于停止状态，需要手动启动特定网络进行监控。
