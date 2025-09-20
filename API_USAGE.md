# NGP Monitor Service API 使用说明

## 📡 API 服务概述

NGP Monitor Service 提供 RESTful API 接口，用于查询监控数据、合约事件、函数调用等信息。

## 🚀 启动 API 服务

```bash
# 开发模式
npm run api:dev

# 生产模式
npm run api
```

默认端口：`3000`

## 📋 API 端点

### 1. 合约信息

#### 获取所有合约
```http
GET /api/contracts?chainId=97
```

**参数：**
- `chainId` (可选): 链ID，用于过滤特定网络的合约

**响应示例：**
```json
[
  {
    "id": 1,
    "chainId": 97,
    "address": "0x1234...",
    "name": "Meshes",
    "abiVersion": "1.0.0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. 合约事件

#### 获取合约事件
```http
GET /api/contracts/:address/events?chainId=97&limit=50&offset=0
```

**参数：**
- `address`: 合约地址
- `chainId` (可选): 链ID
- `limit` (可选): 限制返回数量，默认50
- `offset` (可选): 偏移量，默认0

**响应示例：**
```json
[
  {
    "id": 1,
    "chainId": 97,
    "contractAddress": "0x1234...",
    "eventName": "Transfer",
    "eventSignature": "Transfer(address,address,uint256)",
    "blockNumber": 38000001,
    "transactionHash": "0xabcd...",
    "logIndex": 0,
    "topics": ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"],
    "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. 函数调用

#### 获取合约函数调用
```http
GET /api/contracts/:address/function-calls?chainId=97&limit=50&offset=0
```

**参数：**
- `address`: 合约地址
- `chainId` (可选): 链ID
- `limit` (可选): 限制返回数量，默认50
- `offset` (可选): 偏移量，默认0

**响应示例：**
```json
[
  {
    "id": 1,
    "chainId": 97,
    "contractAddress": "0x1234...",
    "functionName": "transfer",
    "functionSignature": "transfer(address,uint256)",
    "blockNumber": 38000001,
    "transactionHash": "0xabcd...",
    "inputData": "0xa9059cbb...",
    "outputData": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 4. 最新事件

#### 获取最新事件
```http
GET /api/events/latest?chainId=97&limit=20
```

**参数：**
- `chainId` (可选): 链ID
- `limit` (可选): 限制返回数量，默认20

**响应示例：**
```json
[
  {
    "id": 1,
    "chainId": 97,
    "contractAddress": "0x1234...",
    "eventName": "Transfer",
    "blockNumber": 38000001,
    "transactionHash": "0xabcd...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 5. 最新函数调用

#### 获取最新函数调用
```http
GET /api/function-calls/latest?chainId=97&limit=20
```

**参数：**
- `chainId` (可选): 链ID
- `limit` (可选): 限制返回数量，默认20

**响应示例：**
```json
[
  {
    "id": 1,
    "chainId": 97,
    "contractAddress": "0x1234...",
    "functionName": "transfer",
    "blockNumber": 38000001,
    "transactionHash": "0xabcd...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 6. 统计信息

#### 获取监控统计
```http
GET /api/stats?chainId=97
```

**参数：**
- `chainId` (可选): 链ID

**响应示例：**
```json
{
  "totalContracts": 5,
  "totalEvents": 1250,
  "totalFunctionCalls": 890,
  "latestBlock": 38000050,
  "networks": {
    "97": {
      "contracts": 3,
      "events": 750,
      "functionCalls": 500
    },
    "56": {
      "contracts": 2,
      "events": 500,
      "functionCalls": 390
    }
  }
}
```

### 7. 网络信息

#### 获取网络列表
```http
GET /api/networks
```

**响应示例：**
```json
[
  {
    "chainId": 97,
    "name": "BSC Testnet",
    "contractCount": 3,
    "status": "active"
  },
  {
    "chainId": 56,
    "name": "BSC Mainnet",
    "contractCount": 2,
    "status": "active"
  }
]
```

## 🔧 使用示例

### 1. 获取 BSC 测试网的所有合约

```bash
curl "http://localhost:3000/api/contracts?chainId=97"
```

### 2. 获取特定合约的事件

```bash
curl "http://localhost:3000/api/contracts/0x1234.../events?chainId=97&limit=10"
```

### 3. 获取最新事件

```bash
curl "http://localhost:3000/api/events/latest?chainId=97&limit=5"
```

### 4. 获取统计信息

```bash
curl "http://localhost:3000/api/stats"
```

## 📊 数据过滤

### 1. 按链ID过滤

所有端点都支持 `chainId` 参数来过滤特定网络的数据：

```bash
# 只获取 BSC 测试网数据
curl "http://localhost:3000/api/contracts?chainId=97"

# 只获取 BSC 主网数据
curl "http://localhost:3000/api/contracts?chainId=56"
```

### 2. 分页查询

支持 `limit` 和 `offset` 参数进行分页：

```bash
# 获取第1页，每页10条
curl "http://localhost:3000/api/events/latest?limit=10&offset=0"

# 获取第2页，每页10条
curl "http://localhost:3000/api/events/latest?limit=10&offset=10"
```

## 🚨 错误处理

### 错误响应格式

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### 常见错误码

- `400`: 请求参数错误
- `404`: 资源不存在
- `500`: 服务器内部错误

### 错误示例

```json
{
  "error": "Contract not found",
  "code": "CONTRACT_NOT_FOUND",
  "details": "Contract with address 0x1234... not found"
}
```

## 🔐 认证和授权

当前版本不包含认证机制，所有API端点都是公开的。在生产环境中，建议添加适当的认证和授权机制。

## 📈 性能优化

### 1. 缓存策略

API 服务使用内存缓存来提高响应速度：

- 合约信息缓存：5分钟
- 统计信息缓存：1分钟
- 网络信息缓存：10分钟

### 2. 数据库优化

- 使用索引优化查询性能
- 支持分页查询避免大量数据传输
- 使用连接池管理数据库连接

### 3. 响应优化

- 支持 gzip 压缩
- 使用 JSON 格式减少数据大小
- 实现请求限流防止滥用

## 🛠️ 开发调试

### 1. 启用调试模式

```bash
DEBUG=* npm run api:dev
```

### 2. 查看请求日志

API 服务会记录所有请求和响应，可以通过日志文件查看：

```bash
# 查看 API 日志
tail -f logs/api.log
```

### 3. 测试 API 端点

```bash
# 测试健康检查
curl "http://localhost:3000/health"

# 测试合约列表
curl "http://localhost:3000/api/contracts"
```

## 📝 注意事项

1. **数据一致性**: API 返回的数据基于监控服务的数据库，可能存在延迟
2. **性能考虑**: 大量数据查询可能影响性能，建议使用分页
3. **错误处理**: 网络错误或数据库连接问题可能导致API返回错误
4. **版本兼容**: API 版本可能会更新，请注意向后兼容性

---

**提示**: 在生产环境中使用API服务时，请确保监控服务正在运行并且数据库连接正常。
