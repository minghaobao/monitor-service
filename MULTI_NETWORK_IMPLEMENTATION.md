# NGP Monitor Service 多网络监控实现总结

## 实现概述

已成功实现NGP Monitor Service的多网络监控功能，支持同时运行多个服务进程，分别监控不同的区块链网络。每个网络都有独立的配置、日志和状态管理。

## 核心功能实现

### 1. 数据库结构分析 ✅

**完全支持多网络**：
- 所有表都有 `chainId` 字段，确保不同网络的数据完全隔离
- 使用复合唯一键 `[chainId, address]` 确保不同网络的合约地址不冲突
- 每个网络有独立的检查点记录
- 所有查询都支持按 `chainId` 过滤

### 2. 多网络配置系统 ✅

**MultiNetworkLoader** (`src/config/MultiNetworkLoader.ts`)：
- 支持加载多网络配置文件
- 提供网络配置验证和获取功能
- 支持按网络名称获取配置

**配置文件** (`config/multi-network.json`)：
- 支持6个网络：BSC、BSC测试网、Polygon、Mumbai、Ethereum、Goerli
- 每个网络有独立的RPC、区块范围、并发参数配置
- 支持网络特定的合约配置

### 3. 多网络服务管理器 ✅

**MultiNetworkManager** (`src/MultiNetworkManager.ts`)：
- 统一管理多个网络的服务实例
- 支持启动、停止、重启单个或多个网络
- 提供网络状态查询和监控功能
- 支持优雅的资源清理

### 4. 增强的CLI工具 ✅

**网络参数支持**：
```bash
# 启动单个网络
npm run cli start --network bsc

# 启动多个网络
npm run cli start --networks "bsc,polygon,ethereum"

# 启动所有网络
npm run cli start --all

# 网络管理
npm run cli network          # 查看网络状态
npm run cli stop --network bsc    # 停止特定网络
npm run cli restart --all         # 重启所有网络
```

### 5. 多网络API服务 ✅

**增强的API接口**：
- 所有API都支持 `chainId` 参数过滤
- 新增网络列表API (`/api/networks`)
- 统计信息按网络分组
- 支持跨网络数据查询

### 6. 进程管理支持 ✅

**PM2配置** (`ecosystem.multi-network.config.js`)：
- 每个网络独立的PM2进程
- 独立的日志文件
- 资源限制和自动重启
- 包含API服务器进程

**启动脚本** (`scripts/start-network.sh`)：
- 网络特定的启动脚本
- 支持后台运行和调试模式
- 自动环境检查和依赖安装

## 支持的网络

| 网络名称 | Chain ID | 类型 | RPC URL | 状态 |
|---------|----------|------|---------|------|
| `bsc` | 56 | 主网 | BSC Mainnet | ✅ |
| `bsc-testnet` | 97 | 测试网 | BSC Testnet | ✅ |
| `polygon` | 137 | 主网 | Polygon Mainnet | ✅ |
| `mumbai` | 80001 | 测试网 | Polygon Mumbai | ✅ |
| `ethereum` | 1 | 主网 | Ethereum Mainnet | ✅ |
| `goerli` | 5 | 测试网 | Ethereum Goerli | ✅ |

## 文件结构

```
monitor-service/
├── src/
│   ├── config/
│   │   ├── MultiNetworkLoader.ts      # 多网络配置加载器
│   │   └── types.ts                   # 类型定义
│   ├── MultiNetworkManager.ts         # 多网络服务管理器
│   ├── cli.ts                         # 增强的CLI工具
│   └── api/
│       ├── server.ts                  # 多网络API服务
│       └── index.ts                   # API入口
├── config/
│   └── multi-network.json             # 多网络配置文件
├── scripts/
│   └── start-network.sh               # 网络启动脚本
├── ecosystem.multi-network.config.js  # PM2配置文件
└── MULTI_NETWORK_GUIDE.md             # 使用指南
```

## 使用方法

### 1. 环境配置
```bash
export MANAGEMENT_DATABASE_URL="mysql://user:pass@host:port/management_db"
export MONITOR_DATABASE_URL="mysql://user:pass@host:port/monitor_db"
```

### 2. 安装和构建
```bash
npm install
npm run build
```

### 3. 启动服务

#### 方式一：CLI命令
```bash
# 启动单个网络
npm run start:bsc
npm run start:polygon

# 启动多个网络
npm run cli start --networks "bsc,polygon,ethereum"

# 启动所有网络
npm run start:all
```

#### 方式二：PM2进程管理
```bash
# 启动所有网络
npm run pm2:start

# 查看状态
npm run pm2:status

# 查看日志
npm run pm2:logs
```

#### 方式三：网络启动脚本
```bash
# 启动特定网络
./scripts/start-network.sh bsc
./scripts/start-network.sh polygon --daemon
```

### 4. API查询
```bash
# 获取网络列表
GET /api/networks

# 获取特定网络的合约
GET /api/contracts?chainId=56

# 获取特定网络的事件
GET /api/events/latest?chainId=56
```

## 技术特性

### 1. 数据隔离
- 每个网络的数据完全隔离
- 使用 `chainId` 作为主要标识符
- 支持跨网络查询和统计

### 2. 独立管理
- 每个网络可以独立启动、停止、重启
- 独立的日志文件和错误处理
- 独立的资源分配和监控

### 3. 统一API
- 通过API可以查询所有网络的数据
- 支持网络过滤和分组查询
- 提供统一的统计和监控接口

### 4. 进程管理
- 支持PM2进程管理
- 自动重启和资源监控
- 独立的日志轮转和清理

## 性能优化

### 1. 资源分配
- 根据网络特点调整并发参数
- 主网使用更多资源，测试网使用较少资源
- 支持动态资源调整

### 2. 日志管理
- 每个网络独立的日志文件
- 支持日志轮转和清理
- 结构化日志记录

### 3. 错误处理
- 网络级别的错误隔离
- 自动重试和恢复机制
- 详细的错误日志记录

## 监控和运维

### 1. 服务监控
```bash
# 查看所有服务状态
npm run pm2:status

# 查看特定服务
pm2 show ngp-monitor-bsc

# 重启服务
pm2 restart ngp-monitor-bsc
```

### 2. 日志查看
```bash
# 查看所有日志
npm run pm2:logs

# 查看特定网络日志
pm2 logs ngp-monitor-bsc
pm2 logs ngp-monitor-polygon
```

### 3. 性能监控
```bash
# 查看资源使用
pm2 monit

# 查看详细状态
pm2 show ngp-monitor-bsc
```

## 部署建议

### 1. 生产环境
- 使用PM2管理所有进程
- 配置日志轮转和清理
- 设置监控和告警

### 2. 资源分配
- BSC/Polygon主网：1GB内存，2核CPU
- Ethereum主网：512MB内存，1核CPU
- 测试网：512MB内存，1核CPU

### 3. 高可用
- 支持多实例部署
- 数据库连接池优化
- 网络故障自动恢复

## 总结

NGP Monitor Service的多网络支持具有以下优势：

✅ **完全隔离**: 不同网络的数据完全隔离，互不影响  
✅ **独立管理**: 每个网络可以独立启动、停止、重启  
✅ **统一API**: 通过API可以查询所有网络的数据  
✅ **灵活配置**: 每个网络可以有不同的配置参数  
✅ **进程管理**: 支持PM2进程管理，便于生产环境部署  
✅ **日志分离**: 每个网络有独立的日志文件  
✅ **资源优化**: 可以根据网络特点调整资源分配  
✅ **高可用**: 支持故障自动恢复和监控告警  

现在可以同时监控多个区块链网络，为NGP生态系统提供全面的数据支持，满足不同网络的需求和特点。
