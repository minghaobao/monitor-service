#!/bin/bash

# 多网络扫描程序启动脚本
# ========================

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_network() {
    echo -e "${BLUE}[NETWORK]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查依赖..."
    
    if ! command -v tsx &> /dev/null; then
        log_error "tsx 未安装，请先安装: npm install -g tsx"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        log_error "node 未安装，请先安装 Node.js"
        exit 1
    fi
    
    log_info "✅ 依赖检查通过"
}

# 启动单个网络
start_network() {
    local network=$1
    local delay=${2:-0}
    
    log_network "启动 $network 网络扫描程序..."
    
    # 延迟启动
    if [ $delay -gt 0 ]; then
        log_info "等待 ${delay} 秒后启动 $network..."
        sleep $delay
    fi
    
    # 检查是否已经在运行
    if pgrep -f "tsx.*start.*--network.*$network" > /dev/null; then
        log_warn "$network 网络扫描程序已在运行"
        return 0
    fi
    
    # 启动扫描程序
    nohup tsx src/cli.ts start --network "$network" > "logs/${network}-multi.log" 2>&1 &
    local pid=$!
    
    # 等待启动
    sleep 3
    
    # 检查是否启动成功
    if ps -p $pid > /dev/null; then
        log_info "✅ $network 网络扫描程序已启动 (PID: $pid)"
        echo "$network:$pid" >> .multi-network-pids
    else
        log_error "❌ $network 网络扫描程序启动失败"
        return 1
    fi
}

# 停止所有网络
stop_all_networks() {
    log_info "停止所有网络扫描程序..."
    
    if [ -f .multi-network-pids ]; then
        while IFS=':' read -r network pid; do
            if ps -p $pid > /dev/null; then
                log_network "停止 $network (PID: $pid)"
                kill $pid
            fi
        done < .multi-network-pids
        rm -f .multi-network-pids
    fi
    
    # 强制停止所有相关进程
    pkill -f "tsx.*start.*--network" 2>/dev/null || true
    
    log_info "✅ 所有网络扫描程序已停止"
}

# 显示状态
show_status() {
    log_info "网络扫描程序状态:"
    
    local networks=("bsc" "bsc-testnet" "polygon" "ethereum")
    
    for network in "${networks[@]}"; do
        if pgrep -f "tsx.*start.*--network.*$network" > /dev/null; then
            local pid=$(pgrep -f "tsx.*start.*--network.*$network")
            log_network "🟢 $network: 运行中 (PID: $pid)"
        else
            log_network "🔴 $network: 未运行"
        fi
    done
}

# 显示日志
show_logs() {
    local network=$1
    
    if [ -z "$network" ]; then
        log_error "请指定网络名称"
        echo "用法: $0 logs <network>"
        echo "可用网络: bsc, bsc-testnet, polygon, ethereum"
        exit 1
    fi
    
    local log_file="logs/${network}-multi.log"
    
    if [ -f "$log_file" ]; then
        log_info "显示 $network 网络日志:"
        tail -f "$log_file"
    else
        log_error "日志文件不存在: $log_file"
        exit 1
    fi
}

# 主函数
main() {
    local command=${1:-"start"}
    local networks=${2:-"bsc-testnet"}
    
    case $command in
        "start")
            check_dependencies
            
            # 创建日志目录
            mkdir -p logs
            
            # 清理旧的PID文件
            rm -f .multi-network-pids
            
            log_info "🚀 启动多网络扫描程序..."
            log_info "目标网络: $networks"
            
            # 解析网络列表
            IFS=',' read -ra NETWORK_ARRAY <<< "$networks"
            
            # 启动每个网络
            local delay=0
            for network in "${NETWORK_ARRAY[@]}"; do
                start_network "$network" $delay
                delay=$((delay + 5)) # 每个网络间隔5秒启动
            done
            
            log_info "✅ 多网络扫描程序启动完成"
            log_info "💡 使用 '$0 status' 查看状态"
            log_info "💡 使用 '$0 logs <network>' 查看日志"
            ;;
        "stop")
            stop_all_networks
            ;;
        "restart")
            stop_all_networks
            sleep 2
            main "start" "$networks"
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs "$networks"
            ;;
        "help")
            echo "多网络扫描程序管理脚本"
            echo ""
            echo "用法: $0 <command> [networks]"
            echo ""
            echo "命令:"
            echo "  start [networks]    启动指定网络的扫描程序 (默认: bsc-testnet)"
            echo "  stop                停止所有网络扫描程序"
            echo "  restart [networks]  重启指定网络的扫描程序"
            echo "  status              显示所有网络状态"
            echo "  logs <network>      显示指定网络的日志"
            echo "  help                显示此帮助信息"
            echo ""
            echo "示例:"
            echo "  $0 start bsc-testnet"
            echo "  $0 start bsc,bsc-testnet"
            echo "  $0 start bsc,bsc-testnet,polygon,ethereum"
            echo "  $0 status"
            echo "  $0 logs bsc-testnet"
            ;;
        *)
            log_error "未知命令: $command"
            echo "使用 '$0 help' 查看帮助信息"
            exit 1
            ;;
    esac
}

# 捕获退出信号
trap 'log_info "收到退出信号，正在停止所有网络扫描程序..."; stop_all_networks; exit 0' INT TERM

# 运行主函数
main "$@"
