import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
      singleLine: true,
    },
  },
  level: 'info',
});

export class RpcManager {
  private rpcUrls: string[];
  private freeUrls: string[] = [];
  private quicknodeUrls: string[] = [];
  private currentIndex: number = 0;
  private failedUrls: Set<string> = new Set();
  private lastSuccessTime: number = 0;
  private lastFreeNodeAttempt: number = 0;
  private readonly retryDelay: number = 30000; // 30秒后重试失败的URL
  private readonly freeNodeRetryInterval: number = 10 * 60 * 1000; // 10分钟尝试一次免费节点
  private isUsingQuickNode: boolean = false;

  constructor(rpcUrls: string | string[]) {
    this.rpcUrls = Array.isArray(rpcUrls) ? rpcUrls : [rpcUrls];
    
    // 分离免费节点和QuickNode节点
    this.rpcUrls.forEach(url => {
      if (url.includes('quiknode.pro')) {
        this.quicknodeUrls.push(url);
      } else {
        this.freeUrls.push(url);
      }
    });
    
    logger.info({ 
      rpcCount: this.rpcUrls.length,
      freeNodeCount: this.freeUrls.length,
      quicknodeCount: this.quicknodeUrls.length,
      freeUrls: this.freeUrls,
      quicknodeUrls: this.quicknodeUrls
    }, 'RPC Manager initialized');
  }

  // 获取当前可用的RPC URL
  getCurrentRpcUrl(): string {
    const now = Date.now();
    
    // 如果当前使用QuickNode且超过10分钟，尝试切换回免费节点
    const shouldTryFreeNodes = this.isUsingQuickNode && 
      (now - this.lastFreeNodeAttempt > this.freeNodeRetryInterval);
    
    if (shouldTryFreeNodes) {
      this.lastFreeNodeAttempt = now;
      
      // 尝试免费节点
      const availableFreeUrls = this.getAvailableUrls().filter(url => this.freeUrls.includes(url));
      if (availableFreeUrls.length > 0) {
        const url = availableFreeUrls[this.currentIndex % availableFreeUrls.length];
        this.currentIndex = (this.currentIndex + 1) % availableFreeUrls.length;
        this.isUsingQuickNode = false;
        
        logger.info(`Switching to free node: ${url.split('/')[2]}`);
        
        return url;
      }
    }
    
    // 如果当前使用免费节点，继续使用免费节点
    if (!this.isUsingQuickNode) {
      const availableFreeUrls = this.getAvailableUrls().filter(url => this.freeUrls.includes(url));
      if (availableFreeUrls.length > 0) {
        const url = availableFreeUrls[this.currentIndex % availableFreeUrls.length];
        this.currentIndex = (this.currentIndex + 1) % availableFreeUrls.length;
        
        logger.debug(`Using free node: ${url.split('/')[2]}`);
        
        return url;
      }
    }
    
    // 如果免费节点不可用，使用QuickNode
    const availableQuicknodeUrls = this.getAvailableUrls().filter(url => this.quicknodeUrls.includes(url));
    if (availableQuicknodeUrls.length > 0) {
      const url = availableQuicknodeUrls[this.currentIndex % availableQuicknodeUrls.length];
      this.currentIndex = (this.currentIndex + 1) % availableQuicknodeUrls.length;
      this.isUsingQuickNode = true;
      
      if (this.isUsingQuickNode) {
        logger.debug(`Using QuickNode: ${url.split('/')[2]}`);
      } else {
        logger.info(`Switching to QuickNode: ${url.split('/')[2]}`);
      }
      
      return url;
    }
    
    // 如果所有节点都不可用，重置失败列表并返回第一个免费节点
    logger.warn('No available RPC URLs, resetting failed list');
    this.failedUrls.clear();
    this.isUsingQuickNode = false;
    return this.freeUrls[0] || this.rpcUrls[0];
  }

  // 获取所有可用的RPC URL
  private getAvailableUrls(): string[] {
    const now = Date.now();
    return this.rpcUrls.filter(url => {
      // 如果URL在失败列表中，检查是否已经过了重试延迟
      if (this.failedUrls.has(url)) {
        // 免费节点有更短的重试延迟，QuickNode有更长的重试延迟
        const retryDelay = this.freeUrls.includes(url) ? 15000 : 60000; // 免费节点15秒，QuickNode 60秒
        return now - this.lastSuccessTime > retryDelay;
      }
      return true;
    });
  }

  // 标记RPC URL为失败
  markRpcFailed(url: string, error: any) {
    this.failedUrls.add(url);
    
    // 如果免费节点失败且当前使用免费节点，切换到QuickNode
    if (this.freeUrls.includes(url) && !this.isUsingQuickNode) {
      this.isUsingQuickNode = true;
      logger.warn(`Free node failed, switching to QuickNode: ${error.message || error}`);
    } else {
      logger.debug(`RPC failed: ${url.split('/')[2]} - ${error.message || error}`);
    }
  }

  // 标记RPC URL为成功
  markRpcSuccess(url: string) {
    this.failedUrls.delete(url);
    this.lastSuccessTime = Date.now();
    
    // 如果免费节点成功且当前使用QuickNode，切换到免费节点
    if (this.freeUrls.includes(url) && this.isUsingQuickNode) {
      this.isUsingQuickNode = false;
      logger.info(`Free node successful, switching back: ${url.split('/')[2]}`);
    } else {
      logger.debug(`RPC success: ${url.split('/')[2]}`);
    }
  }

  // 获取RPC状态信息
  getStatus() {
    return {
      totalUrls: this.rpcUrls.length,
      freeNodeCount: this.freeUrls.length,
      quicknodeCount: this.quicknodeUrls.length,
      failedUrls: Array.from(this.failedUrls),
      availableUrls: this.getAvailableUrls(),
      currentIndex: this.currentIndex,
      lastSuccessTime: this.lastSuccessTime,
      isUsingQuickNode: this.isUsingQuickNode,
      lastFreeNodeAttempt: this.lastFreeNodeAttempt,
      nextFreeNodeAttempt: this.lastFreeNodeAttempt + this.freeNodeRetryInterval
    };
  }

  // 重置所有失败的URL
  resetFailedUrls() {
    this.failedUrls.clear();
    logger.info('Reset all failed RPC URLs');
  }
}

