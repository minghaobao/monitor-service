#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取contracts.json文件
const contractsPath = path.join(__dirname, '../abis/contracts.json');
const contracts = JSON.parse(fs.readFileSync(contractsPath, 'utf8'));

// 为每个合约创建单独的ABI文件
Object.keys(contracts).forEach(contractName => {
  const abi = contracts[contractName].abi;
  const abiPath = path.join(__dirname, '../abis', `${contractName}.json`);
  
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));
  console.log(`Created ABI file: ${contractName}.json`);
});

console.log(`\nExtracted ${Object.keys(contracts).length} ABI files successfully!`);
