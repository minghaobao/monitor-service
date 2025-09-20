#!/bin/bash

# NGP Monitor Service 部署脚本

set -e

echo "🚀 开始部署 NGP Monitor Service..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查环境变量
check_env() {
    echo -e "${YELLOW}📋 检查环境变量...${NC}"
    
    if [ -z "$MANAGEMENT_DATABASE_URL" ]; then
        echo -e "${RED}❌ 缺少 MANAGEMENT_DATABASE_URL 环境变量${NC}"
        echo "请设置: export MANAGEMENT_DATABASE_URL='mysql://user:pass@host:port/db'"
        exit 1
    fi
    
    if [ -z "$MONITOR_DATABASE_URL" ] && [ -z "$DATABASE_URL" ]; then
        echo -e "${RED}❌ 缺少 MONITOR_DATABASE_URL 或 DATABASE_URL 环境变量${NC}"
        echo "请设置: export MONITOR_DATABASE_URL='mysql://user:pass@host:port/db'"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 环境变量检查通过${NC}"
}

# 安装依赖
install_deps() {
    echo -e "${YELLOW}📦 安装依赖...${NC}"
    npm install
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
}

# 构建项目
build_project() {
    echo -e "${YELLOW}🔨 构建项目...${NC}"
    npm run build
    echo -e "${GREEN}✅ 项目构建完成${NC}"
}

# 数据库迁移
migrate_db() {
    echo -e "${YELLOW}🗄️ 运行数据库迁移...${NC}"
    
    # 生成 Prisma 客户端
    npx prisma generate
    
    # 运行迁移
    npx prisma db push
    
    echo -e "${GREEN}✅ 数据库迁移完成${NC}"
}

# 同步合约地址
sync_contracts() {
    echo -e "${YELLOW}🔄 同步合约地址...${NC}"
    
    if npm run sync-contracts; then
        echo -e "${GREEN}✅ 合约地址同步完成${NC}"
    else
        echo -e "${YELLOW}⚠️ 合约地址同步失败，请检查management数据库连接${NC}"
    fi
}

# 创建systemd服务文件
create_systemd_service() {
    echo -e "${YELLOW}🔧 创建systemd服务...${NC}"
    
    local service_file="/etc/systemd/system/ngp-monitor.service"
    local current_dir=$(pwd)
    local node_path=$(which node)
    
    cat > "$service_file" << EOF
[Unit]
Description=NGP Monitor Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$current_dir
Environment=NODE_ENV=production
Environment=MANAGEMENT_DATABASE_URL=$MANAGEMENT_DATABASE_URL
Environment=MONITOR_DATABASE_URL=$MONITOR_DATABASE_URL
ExecStart=$node_path dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

    echo -e "${GREEN}✅ systemd服务文件已创建: $service_file${NC}"
}

# 启动服务
start_service() {
    echo -e "${YELLOW}🚀 启动服务...${NC}"
    
    # 重新加载systemd
    sudo systemctl daemon-reload
    
    # 启用服务
    sudo systemctl enable ngp-monitor
    
    # 启动服务
    sudo systemctl start ngp-monitor
    
    # 检查服务状态
    if sudo systemctl is-active --quiet ngp-monitor; then
        echo -e "${GREEN}✅ 服务启动成功${NC}"
    else
        echo -e "${RED}❌ 服务启动失败${NC}"
        echo "查看日志: sudo journalctl -u ngp-monitor -f"
        exit 1
    fi
}

# 显示服务状态
show_status() {
    echo -e "${YELLOW}📊 服务状态:${NC}"
    sudo systemctl status ngp-monitor --no-pager
    
    echo -e "\n${YELLOW}📝 有用的命令:${NC}"
    echo "查看日志: sudo journalctl -u ngp-monitor -f"
    echo "重启服务: sudo systemctl restart ngp-monitor"
    echo "停止服务: sudo systemctl stop ngp-monitor"
    echo "查看状态: sudo systemctl status ngp-monitor"
}

# 主函数
main() {
    echo -e "${GREEN}🎯 NGP Monitor Service 部署脚本${NC}\n"
    
    check_env
    install_deps
    build_project
    migrate_db
    sync_contracts
    
    # 询问是否创建systemd服务
    read -p "是否创建systemd服务? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        create_systemd_service
        
        # 询问是否启动服务
        read -p "是否启动服务? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            start_service
            show_status
        fi
    fi
    
    echo -e "\n${GREEN}🎉 部署完成！${NC}"
    echo -e "\n${YELLOW}📋 手动启动服务:${NC}"
    echo "npm run dev  # 开发模式"
    echo "npm start    # 生产模式"
}

# 运行主函数
main "$@"
