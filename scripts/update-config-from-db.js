import { PrismaClient } from '../src/generated/management-prisma/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function updateConfigFromDatabase() {
  try {
    console.log('🔍 从数据库获取合约地址...');
    
    // 获取所有合约状态
    const contracts = await prisma.contractStatus.findMany({
      where: {
        isPaused: false
      },
      select: {
        contractName: true,
        contractAddress: true,
        network: true
      }
    });
    
    console.log('📋 找到的合约记录:', contracts.length);
    
    // 按网络分组
    const contractsByNetwork = {};
    contracts.forEach(contract => {
      if (!contractsByNetwork[contract.network]) {
        contractsByNetwork[contract.network] = [];
      }
      contractsByNetwork[contract.network].push({
        name: contract.contractName,
        address: contract.contractAddress,
        abiPath: `./abis/${contract.contractName}.json`
      });
    });
    
    console.log('📊 按网络分组的合约:', contractsByNetwork);
    
    // 读取当前配置文件
    const configPath = path.join(__dirname, '../config/multi-network.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // 更新每个网络的合约地址
    Object.keys(contractsByNetwork).forEach(networkName => {
      // 查找对应的网络配置
      const networkKey = Object.keys(config.networks).find(key => {
        const network = config.networks[key];
        return network.name === networkName;
      });
      
      if (networkKey) {
        console.log(`🔄 更新网络 ${networkName} (${networkKey}) 的合约地址...`);
        
        // 更新合约地址
        const networkContracts = contractsByNetwork[networkName];
        config.networks[networkKey].contracts = networkContracts;
        
        console.log(`✅ 已更新 ${networkContracts.length} 个合约地址`);
      } else {
        console.log(`⚠️  未找到网络 ${networkName} 的配置`);
      }
    });
    
    // 保存更新后的配置文件
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('💾 配置文件已更新');
    
    // 显示更新后的BSC Testnet配置
    if (config.networks['bsc-testnet']) {
      console.log('📋 BSC Testnet 合约配置:');
      config.networks['bsc-testnet'].contracts.forEach(contract => {
        console.log(`  - ${contract.name}: ${contract.address}`);
      });
    }
    
  } catch (error) {
    console.error('❌ 更新配置文件失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateConfigFromDatabase();
