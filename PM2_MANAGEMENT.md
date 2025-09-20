# PM2 进程管理详细说明

## 📋 PM2 管理脚本

项目包含一个专门的 PM2 管理脚本 `scripts/pm2-manager.js`，提供完整的进程管理功能。

### 脚本功能

- ✅ 启动所有进程（停止状态）
- ✅ 停止所有进程
- ✅ 重启所有进程
- ✅ 删除所有进程
- ✅ 启动特定网络
- ✅ 停止特定网络
- ✅ 重启特定网络
- ✅ 查看进程状态
- ✅ 查看日志
- ✅ 实时监控

## 🚀 使用方法

### 直接使用脚本

```bash
# 启动所有进程
node scripts/pm2-manager.js start-all

# 停止所有进程
node scripts/pm2-manager.js stop-all

# 重启所有进程
node scripts/pm2-manager.js restart-all

# 删除所有进程
node scripts/pm2-manager.js delete-all

# 启动特定网络
node scripts/pm2-manager.js start monitor-bsc-testnet

# 停止特定网络
node scripts/pm2-manager.js stop monitor-bsc-testnet

# 重启特定网络
node scripts/pm2-manager.js restart monitor-bsc-testnet

# 查看状态
node scripts/pm2-manager.js status

# 查看日志
node scripts/pm2-manager.js logs monitor-bsc-testnet 50

# 查看所有日志
node scripts/pm2-manager.js logs 50

# 启动监控界面
node scripts/pm2-manager.js monitor
```

### 通过 npm 脚本使用

```bash
# 启动所有进程
npm run pm2:start

# 停止所有进程
npm run pm2:stop

# 重启所有进程
npm run pm2:restart

# 删除所有进程
npm run pm2:delete

# 启动特定网络
npm run pm2:start-network monitor-bsc-testnet

# 停止特定网络
npm run pm2:stop-network monitor-bsc-testnet

# 重启特定网络
npm run pm2:restart-network monitor-bsc-testnet

# 查看状态
npm run pm2:status

# 查看日志
npm run pm2:logs monitor-bsc-testnet 50

# 启动监控界面
npm run pm2:monitor
```

## ⚙️ PM2 配置文件

### 配置文件位置
`ecosystem.config.cjs`

### 配置说明

```javascript
module.exports = {
  apps: [
    {
      name: 'monitor-bsc-testnet',        // 进程名称
      script: 'tsx',                      // 执行脚本
      args: 'src/simple-start.ts start --network bsc-testnet', // 参数
      instances: 1,                       // 实例数量
      autorestart: false,                 // 自动重启（设为false，手动控制）
      watch: false,                       // 文件监控
      max_memory_restart: '1G',          // 内存限制
      env: {                              // 环境变量
        NODE_ENV: 'production',
        NETWORK: 'bsc-testnet'
      },
      log_file: './logs/monitor-bsc-testnet.log',     // 日志文件
      out_file: './logs/monitor-bsc-testnet-out.log', // 输出日志
      error_file: './logs/monitor-bsc-testnet-error.log', // 错误日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',       // 日志时间格式
      merge_logs: true,                   // 合并日志
      time: true                          // 显示时间戳
    }
  ]
};
```

## 📊 进程状态说明

### 状态类型

- `online`: 进程正在运行
- `stopped`: 进程已停止
- `errored`: 进程出错
- `launching`: 进程启动中

### 查看状态

```bash
npm run pm2:status
```

输出示例：
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ monitor-bsc        │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 1  │ monitor-bsc-testn… │ cluster  │ 1    │ online    │ 0%       │ 33.4mb   │
│ 3  │ monitor-ethereum   │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
│ 2  │ monitor-polygon    │ cluster  │ 0    │ stopped   │ 0%       │ 0b       │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

## 📝 日志管理

### 日志文件结构

```
logs/
├── monitor-bsc.log                    # BSC 主网日志
├── monitor-bsc-testnet.log           # BSC 测试网日志
├── monitor-polygon.log               # Polygon 日志
├── monitor-ethereum.log              # Ethereum 日志
├── monitor-bsc-out-1.log             # BSC 输出日志
├── monitor-bsc-testnet-out-1.log     # BSC 测试网输出日志
├── monitor-polygon-out-1.log         # Polygon 输出日志
├── monitor-ethereum-out-1.log        # Ethereum 输出日志
├── monitor-bsc-error-1.log           # BSC 错误日志
├── monitor-bsc-testnet-error-1.log   # BSC 测试网错误日志
├── monitor-polygon-error-1.log       # Polygon 错误日志
└── monitor-ethereum-error-1.log      # Ethereum 错误日志
```

### 日志查看命令

```bash
# 查看特定网络日志（最后50行）
npm run pm2:logs monitor-bsc-testnet 50

# 查看所有网络日志
npm run pm2:logs 50

# 实时查看日志
pm2 logs monitor-bsc-testnet --follow

# 查看错误日志
pm2 logs monitor-bsc-testnet --err
```

## 🔄 进程生命周期

### 1. 启动流程

```bash
# 1. 启动所有进程（停止状态）
npm run pm2:start

# 2. 启动特定网络
npm run pm2:start-network monitor-bsc-testnet

# 3. 检查状态
npm run pm2:status
```

### 2. 运行监控

```bash
# 查看实时日志
npm run pm2:logs monitor-bsc-testnet

# 启动监控界面
npm run pm2:monitor
```

### 3. 停止流程

```bash
# 停止特定网络
npm run pm2:stop-network monitor-bsc-testnet

# 停止所有网络
npm run pm2:stop
```

## 🛠️ 高级操作

### 1. 进程重启

```bash
# 重启特定网络
npm run pm2:restart-network monitor-bsc-testnet

# 重启所有网络
npm run pm2:restart
```

### 2. 进程删除

```bash
# 删除所有进程
npm run pm2:delete
```

### 3. 进程监控

```bash
# 启动 PM2 监控界面
npm run pm2:monitor
```

### 4. 环境变量设置

```bash
# 设置环境变量启动
pm2 start ecosystem.config.cjs --env production

# 查看环境变量
pm2 env 0
```

## 🐛 故障排除

### 1. 进程启动失败

```bash
# 查看详细错误
npm run pm2:logs monitor-bsc-testnet 100

# 检查进程状态
npm run pm2:status

# 重启进程
npm run pm2:restart-network monitor-bsc-testnet
```

### 2. 内存使用过高

```bash
# 查看内存使用
npm run pm2:status

# 重启进程释放内存
npm run pm2:restart-network monitor-bsc-testnet
```

### 3. 日志文件过大

PM2 会自动管理日志文件，但可以手动清理：

```bash
# 清理日志
pm2 flush

# 重新加载日志配置
pm2 reload ecosystem.config.cjs
```

### 4. 进程卡死

```bash
# 强制停止进程
pm2 kill

# 重新启动
npm run pm2:start
```

## 📈 性能监控

### 1. 实时监控

```bash
# 启动监控界面
npm run pm2:monitor
```

### 2. 查看资源使用

```bash
# 查看进程状态（包含CPU和内存）
npm run pm2:status

# 查看详细信息
pm2 show monitor-bsc-testnet
```

### 3. 日志分析

```bash
# 查看错误日志
pm2 logs monitor-bsc-testnet --err --lines 100

# 查看输出日志
pm2 logs monitor-bsc-testnet --out --lines 100
```

## 🔧 配置优化

### 1. 内存限制

```javascript
// ecosystem.config.cjs
{
  max_memory_restart: '1G',  // 内存超过1G时重启
}
```

### 2. 自动重启

```javascript
// ecosystem.config.cjs
{
  autorestart: true,         // 进程崩溃时自动重启
  max_restarts: 10,          // 最大重启次数
  min_uptime: '10s',         // 最小运行时间
}
```

### 3. 日志轮转

```javascript
// ecosystem.config.cjs
{
  log_type: 'json',          // JSON格式日志
  merge_logs: true,          // 合并日志
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
}
```

---

**注意**: 所有PM2操作都会影响监控服务的运行，请谨慎操作。
