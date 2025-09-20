#!/bin/bash

# 网络特定启动脚本
# 用法: ./scripts/start-network.sh <network_name> [options]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 默认配置
NETWORK=""
CONFIG_PATH="config/multi-network.json"
MANAGEMENT_DB_URL=""
MONITOR_DB_URL=""
DAEMON=false
LOG_LEVEL="info"

# 显示帮助信息
show_help() {
    echo -e "${BLUE}NGP Monitor Service - Network Startup Script${NC}"
    echo ""
    echo "用法: $0 <network_name> [options]"
    echo ""
    echo "网络名称:"
    echo "  bsc              BSC Mainnet"
    echo "  bsc-testnet      BSC Testnet"
    echo "  polygon          Polygon Mainnet"
    echo "  mumbai           Polygon Mumbai Testnet"
    echo "  ethereum         Ethereum Mainnet"
    echo "  goerli           Ethereum Goerli Testnet"
    echo ""
    echo "选项:"
    echo "  -c, --config <path>       配置文件路径 (默认: config/multi-network.json)"
    echo "  --management-db <url>      Management数据库URL"
    echo "  --monitor-db <url>         Monitor数据库URL"
    echo "  -d, --daemon              后台运行"
    echo "  --log-level <level>       日志级别 (debug, info, warn, error)"
    echo "  -h, --help                显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 bsc                                    # 启动BSC网络监控"
    echo "  $0 polygon --daemon                       # 后台启动Polygon网络监控"
    echo "  $0 bsc --log-level debug                  # 调试模式启动BSC网络监控"
    echo "  $0 ethereum --management-db mysql://...   # 使用自定义数据库启动"
}

# 解析命令行参数
parse_args() {
    if [ $# -eq 0 ]; then
        echo -e "${RED}错误: 请指定网络名称${NC}"
        show_help
        exit 1
    fi

    NETWORK="$1"
    shift

    while [[ $# -gt 0 ]]; do
        case $1 in
            -c|--config)
                CONFIG_PATH="$2"
                shift 2
                ;;
            --management-db)
                MANAGEMENT_DB_URL="$2"
                shift 2
                ;;
            --monitor-db)
                MONITOR_DB_URL="$2"
                shift 2
                ;;
            -d|--daemon)
                DAEMON=true
                shift
                ;;
            --log-level)
                LOG_LEVEL="$2"
                shift 2
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                echo -e "${RED}错误: 未知参数 $1${NC}"
                show_help
                exit 1
                ;;
        esac
    done
}

# 检查网络配置
check_network() {
    echo -e "${YELLOW}🔍 检查网络配置...${NC}"
    
    if [ ! -f "$CONFIG_PATH" ]; then
        echo -e "${RED}❌ 配置文件不存在: $CONFIG_PATH${NC}"
        exit 1
    fi
    
    # 检查网络是否在配置中
    if ! grep -q "\"$NETWORK\":" "$CONFIG_PATH"; then
        echo -e "${RED}❌ 网络 '$NETWORK' 在配置文件中不存在${NC}"
        echo -e "${YELLOW}可用的网络:${NC}"
        grep -o '"[^"]*":' "$CONFIG_PATH" | sed 's/":$//' | sed 's/"//g' | sed 's/^/  /'
        exit 1
    fi
    
    echo -e "${GREEN}✅ 网络配置检查通过${NC}"
}

# 检查环境变量
check_environment() {
    echo -e "${YELLOW}📋 检查环境变量...${NC}"
    
    if [ -z "$MANAGEMENT_DB_URL" ]; then
        MANAGEMENT_DB_URL="$MANAGEMENT_DATABASE_URL"
    fi
    
    if [ -z "$MONITOR_DB_URL" ]; then
        MONITOR_DB_URL="$MONITOR_DATABASE_URL"
    fi
    
    if [ -z "$MONITOR_DB_URL" ]; then
        MONITOR_DB_URL="$DATABASE_URL"
    fi
    
    if [ -z "$MANAGEMENT_DB_URL" ] || [ -z "$MONITOR_DB_URL" ]; then
        echo -e "${RED}❌ 缺少必需的数据库连接URL${NC}"
        echo "请设置以下环境变量:"
        echo "  export MANAGEMENT_DATABASE_URL='mysql://user:pass@host:port/management_db'"
        echo "  export MONITOR_DATABASE_URL='mysql://user:pass@host:port/monitor_db'"
        echo "或者使用命令行参数:"
        echo "  --management-db <url>"
        echo "  --monitor-db <url>"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 环境变量检查通过${NC}"
}

# 检查依赖
check_dependencies() {
    echo -e "${YELLOW}📦 检查依赖...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}⚠️ 依赖未安装，正在安装...${NC}"
        npm install
    fi
    
    echo -e "${GREEN}✅ 依赖检查通过${NC}"
}

# 构建项目
build_project() {
    echo -e "${YELLOW}🔨 构建项目...${NC}"
    
    if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
        npm run build
        echo -e "${GREEN}✅ 项目构建完成${NC}"
    else
        echo -e "${GREEN}✅ 项目已构建${NC}"
    fi
}

# 启动服务
start_service() {
    echo -e "${YELLOW}🚀 启动 $NETWORK 网络监控服务...${NC}"
    
    # 设置环境变量
    export MANAGEMENT_DATABASE_URL="$MANAGEMENT_DB_URL"
    export MONITOR_DATABASE_URL="$MONITOR_DB_URL"
    export LOG_LEVEL="$LOG_LEVEL"
    
    # 构建启动命令
    local cmd="npm run cli start -- --network $NETWORK --config $CONFIG_PATH"
    
    if [ "$DAEMON" = true ]; then
        echo -e "${BLUE}📱 后台模式启动${NC}"
        nohup $cmd > "logs/$NETWORK-$(date +%Y%m%d-%H%M%S).log" 2>&1 &
        local pid=$!
        echo -e "${GREEN}✅ 服务已启动，PID: $pid${NC}"
        echo -e "${YELLOW}📝 日志文件: logs/$NETWORK-$(date +%Y%m%d-%H%M%S).log${NC}"
        echo -e "${YELLOW}🛑 停止服务: kill $pid${NC}"
    else
        echo -e "${BLUE}📱 前台模式启动${NC}"
        exec $cmd
    fi
}

# 创建日志目录
create_log_dir() {
    if [ ! -d "logs" ]; then
        mkdir -p logs
    fi
}

# 主函数
main() {
    echo -e "${BLUE}🌐 NGP Monitor Service - Network Startup${NC}\n"
    
    parse_args "$@"
    create_log_dir
    check_network
    check_environment
    check_dependencies
    build_project
    start_service
}

# 运行主函数
main "$@"
