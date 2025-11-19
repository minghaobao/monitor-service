# NGP Monitor Service API 文档

## 📋 概述

NGP Monitor Service 提供两套API服务：

1. **数据查询API** (端口 3001) - 提供合约、事件、函数调用等数据的查询接口
2. **监控管理API** (端口 3002) - 提供监控服务状态查询和控制接口

## 🚀 数据查询API (端口 3001)

### 基础信息

- **基础URL**: `http://localhost:3001`
- **默认端口**: 3001 (可通过 `API_PORT` 环境变量配置)
- **启动命令**: `npm run api-server` 或 `tsx src/api-server.ts`

### 健康检查

#### GET /health

检查API服务健康状态。

**请求示例**:
```bash
curl http://localhost:3001/health
```

**响应示例**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 合约相关接口

#### GET /api/contracts

获取所有已注册的合约列表。

**查询参数**:
- `chainId` (可选): 链ID，用于过滤特定网络的合约

**请求示例**:
```bash
# 获取所有合约
curl "http://localhost:3001/api/contracts"

# 获取BSC测试网的合约
curl "http://localhost:3001/api/contracts?chainId=97"
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "chainId": "97",
      "address": "0x3cbDBd062A22D178Ab7743E967835d86e9356bFd",
      "name": "Meshes",
      "abiVersion": "1.0.0",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "byNetwork": {
    "97": [
      {
        "id": 1,
        "chainId": "97",
        "address": "0x3cbDBd062A22D178Ab7743E967835d86e9356bFd",
        "name": "Meshes",
        "abiVersion": "1.0.0",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

#### GET /api/contracts/:address/events

获取指定合约的事件列表。

**路径参数**:
- `address`: 合约地址

**查询参数**:
- `chainId` (可选): 链ID
- `page` (可选, 默认: 1): 页码
- `limit` (可选, 默认: 50): 每页数量
- `eventName` (可选): 事件名称过滤

**请求示例**:
```bash
# 获取合约的所有事件
curl "http://localhost:3001/api/contracts/0x3cbDBd062A22D178Ab7743E967835d86e9356bFd/events?chainId=97"

# 分页获取
curl "http://localhost:3001/api/contracts/0x3cbDBd062A22D178Ab7743E967835d86e9356bFd/events?chainId=97&page=1&limit=20"

# 过滤特定事件
curl "http://localhost:3001/api/contracts/0x3cbDBd062A22D178Ab7743E967835d86e9356bFd/events?chainId=97&eventName=Transfer"
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "chainId": "97",
      "blockNumber": "65574200",
      "txHash": "0x...",
      "logIndex": 0,
      "contractAddress": "0x3cbDBd062A22D178Ab7743E967835d86e9356bFd",
      "eventName": "Transfer",
      "eventSignature": "Transfer(address,address,uint256)",
      "args": {
        "from": "0x...",
        "to": "0x...",
        "value": "1000000000000000000"
      },
      "removed": false,
      "timestamp": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "pages": 2
  }
}
```

#### GET /api/contracts/:address/function-calls

获取指定合约的函数调用列表。

**路径参数**:
- `address`: 合约地址

**查询参数**:
- `chainId` (可选): 链ID
- `page` (可选, 默认: 1): 页码
- `limit` (可选, 默认: 50): 每页数量
- `methodName` (可选): 方法名称过滤

**请求示例**:
```bash
curl "http://localhost:3001/api/contracts/0x3cbDBd062A22D178Ab7743E967835d86e9356bFd/function-calls?chainId=97&page=1&limit=20"
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "chainId": "97",
      "blockNumber": "65574200",
      "txHash": "0x...",
      "contractAddress": "0x3cbDBd062A22D178Ab7743E967835d86e9356bFd",
      "methodName": "transfer",
      "methodSignature": "transfer(address,uint256)",
      "args": {
        "to": "0x...",
        "amount": "1000000000000000000"
      },
      "from": "0x...",
      "value": "0",
      "status": true,
      "gasUsed": "21000",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 50,
    "pages": 1
  }
}
```

### 事件相关接口

#### GET /api/events/latest

获取最新的事件列表。

**查询参数**:
- `chainId` (可选): 链ID
- `limit` (可选, 默认: 100): 返回数量

**请求示例**:
```bash
curl "http://localhost:3001/api/events/latest?chainId=97&limit=50"
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "chainId": "97",
      "blockNumber": "65574200",
      "txHash": "0x...",
      "logIndex": 0,
      "contractAddress": "0x3cbDBd062A22D178Ab7743E967835d86e9356bFd",
      "eventName": "Transfer",
      "eventSignature": "Transfer(address,address,uint256)",
      "args": {...},
      "timestamp": "2024-01-01T00:00:00.000Z",
      "contract": {
        "name": "Meshes"
      }
    }
  ],
  "count": 50
}
```

#### GET /api/function-calls/latest

获取最新的函数调用列表。

**查询参数**:
- `chainId` (可选): 链ID
- `limit` (可选, 默认: 100): 返回数量

**请求示例**:
```bash
curl "http://localhost:3001/api/function-calls/latest?chainId=97&limit=50"
```

### 统计信息接口

#### GET /api/stats

获取监控服务的统计信息。

**查询参数**:
- `chainId` (可选): 链ID，用于过滤特定网络的统计

**请求示例**:
```bash
# 获取所有网络的统计
curl "http://localhost:3001/api/stats"

# 获取BSC测试网的统计
curl "http://localhost:3001/api/stats?chainId=97"
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "contracts": 10,
    "events": 10000,
    "functionCalls": 5000,
    "latestBlock": "65574200",
    "latestBlockChainId": "97",
    "byNetwork": [
      {
        "chainId": "97",
        "contractCount": 10
      }
    ]
  }
}
```

### 网络相关接口

#### GET /api/networks

获取所有已监控的网络列表。

**请求示例**:
```bash
curl "http://localhost:3001/api/networks"
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "chainId": "97",
      "contractCount": 10,
      "lastActivity": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

## 🔧 监控管理API (端口 3002)

### 基础信息

- **基础URL**: `http://localhost:3002`
- **默认端口**: 3002 (可通过 `MONITOR_API_PORT` 环境变量配置)
- **启动命令**: `tsx src/api-server.ts`

### 健康检查

#### GET /api/monitor/health

检查监控管理API服务健康状态。

**请求示例**:
```bash
curl http://localhost:3002/api/monitor/health
```

**响应示例**:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "monitor-service"
}
```

### 监控状态接口

#### GET /api/monitor/status

获取所有网络的监控服务状态。

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/status"
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "networks": [
      {
        "network": "bsc-testnet",
        "status": "online",
        "pid": 12345,
        "uptime": "运行中",
        "lastBlock": 65574200,
        "totalEvents": 10000
      },
      {
        "network": "bsc",
        "status": "offline"
      }
    ],
    "summary": {
      "totalNetworks": 4,
      "onlineNetworks": 1,
      "offlineNetworks": 2,
      "errorNetworks": 1
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### GET /api/monitor/status/:network

获取指定网络的监控服务状态。

**路径参数**:
- `network`: 网络名称 (bsc-testnet, bsc, polygon, ethereum)

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/status/bsc-testnet"
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "network": "bsc-testnet",
    "status": "online",
    "pid": 12345,
    "uptime": "运行中",
    "lastBlock": 65574200,
    "totalEvents": 10000
  }
}
```

### 监控控制接口

#### POST /api/monitor/control/start

启动指定网络的监控服务。

**请求体**:
```json
{
  "network": "bsc-testnet"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3002/api/monitor/control/start" \
  -H "Content-Type: application/json" \
  -d '{"network": "bsc-testnet"}'
```

**响应示例**:
```json
{
  "success": true,
  "message": "网络 bsc-testnet 监控程序启动成功",
  "pid": 12345
}
```

#### POST /api/monitor/control/stop

停止指定网络的监控服务。

**请求体**:
```json
{
  "network": "bsc-testnet"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3002/api/monitor/control/stop" \
  -H "Content-Type: application/json" \
  -d '{"network": "bsc-testnet"}'
```

**响应示例**:
```json
{
  "success": true,
  "message": "网络 bsc-testnet 监控程序已停止"
}
```

#### POST /api/monitor/control/restart

重启指定网络的监控服务。

**请求体**:
```json
{
  "network": "bsc-testnet"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3002/api/monitor/control/restart" \
  -H "Content-Type: application/json" \
  -d '{"network": "bsc-testnet"}'
```

### 监控数据接口

#### GET /api/monitor/data/blocks

获取区块数据。

**查询参数**:
- `network` (可选): 网络名称或链ID
- `limit` (可选, 默认: 100): 返回数量

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/data/blocks?network=97&limit=50"
```

#### GET /api/monitor/data/events

获取事件数据。

**查询参数**:
- `network` (必需): 网络名称 (bsc-testnet, bsc, polygon, ethereum)
- `limit` (可选, 默认: 100): 返回数量

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/data/events?network=bsc-testnet&limit=50"
```

### 日志接口

#### GET /api/monitor/logs

获取监控服务日志。

**查询参数**:
- `network` (必需): 网络名称
- `lines` (可选, 默认: 100): 返回行数

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/logs?network=bsc-testnet&lines=50"
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "bsc-testnet-0",
        "timestamp": "2024-01-01T00:00:00.000Z",
        "message": "Starting block scanner...",
        "level": "info",
        "network": "bsc-testnet"
      }
    ],
    "network": "bsc-testnet",
    "total": 50
  }
}
```

#### GET /api/monitor/process-output

获取进程实时输出。

**查询参数**:
- `network` (必需): 网络名称
- `lines` (可选, 默认: 50): 返回行数

**请求示例**:
```bash
curl "http://localhost:3002/api/monitor/process-output?network=bsc-testnet&lines=50"
```

## 📝 错误处理

所有API接口在发生错误时都会返回统一的错误格式：

```json
{
  "success": false,
  "error": "错误描述信息"
}
```

常见HTTP状态码：
- `200`: 请求成功
- `400`: 请求参数错误
- `404`: 资源未找到
- `500`: 服务器内部错误

## 🔐 注意事项

1. **BigInt序列化**: API会自动将BigInt类型转换为字符串，避免JSON序列化问题
2. **CORS支持**: 监控管理API默认启用CORS，支持跨域请求
3. **日志格式**: 日志接口返回的日志可能包含JSON格式的结构化日志
4. **网络名称**: 支持的网络名称包括: `bsc-testnet`, `bsc`, `polygon`, `ethereum`

## 📚 相关文档

- [快速开始指南](QUICK_START.md)
- [技术文档](TECHNICAL_DOCUMENTATION.md)
- [开发指南](DEVELOPER_GUIDE.md)

