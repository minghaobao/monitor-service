import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Interface } from 'ethers';
import { ContractConfig } from '../config/types.js';

export class AbiRegistry {
  private interfaces: Map<string, Interface> = new Map();
  private eventSignatures: Map<string, Set<string>> = new Map();
  private methodSignatures: Map<string, Set<string>> = new Map();

  constructor(private readonly contracts: ContractConfig[]) {
    this.loadAbis();
  }

  private loadAbis() {
    for (const contract of this.contracts) {
      let abi: any[];
      
      if (contract.abi) {
        abi = contract.abi;
      } else if (contract.abiPath) {
        const abiPath = resolve(process.cwd(), contract.abiPath);
        console.log(`Loading ABI for ${contract.name} from ${abiPath}`);
        abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
        console.log(`Successfully loaded ABI for ${contract.name}, events: ${abi.filter((item: any) => item.type === 'event').length}`);
      } else {
        throw new Error(`No ABI provided for contract ${contract.name}`);
      }

      const iface = new Interface(abi);
      this.interfaces.set(contract.address.toLowerCase(), iface);
      console.log(`Registered interface for ${contract.name} at ${contract.address.toLowerCase()}`);

      // 收集事件签名
      const events = new Set<string>();
      try {
        // ethers v6 Interface使用fragments属性，需要过滤出事件类型的fragment
        if (iface.fragments && Array.isArray(iface.fragments)) {
          for (const fragment of iface.fragments) {
            if (fragment && fragment.type === 'event' && typeof fragment.format === 'function') {
              events.add(fragment.format());
            }
          }
        }
      } catch (error) {
        console.error('Error collecting events:', error);
      }
      this.eventSignatures.set(contract.address.toLowerCase(), events);

      // 收集方法签名
      const methods = new Set<string>();
      try {
        // ethers Interface使用fragments属性，需要过滤出函数类型的fragment
        if (iface.fragments && Array.isArray(iface.fragments)) {
          for (const fragment of iface.fragments) {
            if (fragment && fragment.type === 'function' && typeof fragment.format === 'function') {
              methods.add(fragment.format());
            }
          }
        }
      } catch (error) {
        console.error('Error collecting methods:', error);
      }
      this.methodSignatures.set(contract.address.toLowerCase(), methods);
    }
  }

  // 获取合约接口（ethers v6兼容）
  getInterface(address: string): any {
    const iface = this.interfaces.get(address.toLowerCase());
    if (!iface) return undefined;
    
    // 直接返回原始的 Interface 对象，它已经有 parseLog 方法
    return iface;
  }

  // 获取事件接口（ethers v6兼容）
  getEventInterface(address: string): any {
    const iface = this.interfaces.get(address.toLowerCase());
    if (!iface) return undefined;
    
    // ethers v6的Interface对象没有events属性，需要从fragments中过滤出事件
    const eventFragments = iface.fragments.filter((f: any) => f.type === 'event');
    return {
      events: eventFragments.reduce((acc: any, fragment: any) => {
        acc[fragment.name] = fragment;
        return acc;
      }, {}),
      parseLog: (log: any) => iface.parseLog(log)
    };
  }

  // 获取合约事件签名
  getEventSignatures(address: string): Set<string> | undefined {
    return this.eventSignatures.get(address.toLowerCase());
  }

  // 获取合约方法签名
  getMethodSignatures(address: string): Set<string> | undefined {
    return this.methodSignatures.get(address.toLowerCase());
  }

  // 获取所有监控的合约地址
  getAllAddresses(): string[] {
    return Array.from(this.interfaces.keys());
  }

  // 获取所有监控的事件签名
  getAllEventSignatures(): string[] {
    const allSigs = new Set<string>();
    for (const sigs of this.eventSignatures.values()) {
      for (const sig of sigs) {
        allSigs.add(sig);
      }
    }
    return Array.from(allSigs);
  }

  // 获取所有监控的事件fragments
  getAllEventFragments(): any[] {
    const allFragments: any[] = [];
    for (const iface of this.interfaces.values()) {
      const eventFragments = iface.fragments.filter((f: any) => f.type === 'event');
      allFragments.push(...eventFragments);
    }
    return allFragments;
  }

  // 获取所有监控的方法签名
  getAllMethodSignatures(): string[] {
    const allSigs = new Set<string>();
    for (const sigs of this.methodSignatures.values()) {
      for (const sig of sigs) {
        allSigs.add(sig);
      }
    }
    return Array.from(allSigs);
  }
}


