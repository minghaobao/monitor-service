import { PrismaClient as ManagementPrismaClient } from '../generated/management-prisma/index.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export class ClaimDataProcessor {
  private managementPrisma: ManagementPrismaClient;

  constructor(managementDatabaseUrl: string) {
    this.managementPrisma = new ManagementPrismaClient({
      datasources: {
        db: {
          url: managementDatabaseUrl,
        },
      },
    });
  }

  // 处理MeshClaimed事件
  async processMeshClaimedEvent(eventData: any): Promise<void> {
    try {
      const {
        user,
        meshID,
        lon100,
        lat100,
        applyCount,
        heat,
        costBurned,
        blockNumber,
        txHash,
        timestamp
      } = eventData;

      logger.info({
        user,
        meshID,
        lon100,
        lat100,
        heat: heat.toString(),
        costBurned: costBurned.toString(),
        blockNumber: blockNumber.toString(),
        txHash
      }, 'Processing MeshClaimed event');

      // 从经纬度重构网格ID（按照白皮书格式：E12147N3123）
      const longitude = Number(lon100) / 100; // 转换为实际经纬度
      const latitude = Number(lat100) / 100;  // 转换为实际经纬度
      
      // 生成正确的网格ID格式：E/W + 经度×100 + N/S + 纬度×100
      const lonDir = lon100 >= 0 ? 'E' : 'W';
      const latDir = lat100 >= 0 ? 'N' : 'S';
      const lonAbs = Math.abs(Number(lon100));
      const latAbs = Math.abs(Number(lat100));
      const generatedMeshId = `${lonDir}${lonAbs}${latDir}${latAbs}`;
      
      logger.info({
        originalMeshId: meshID,
        generatedMeshId,
        longitude,
        latitude,
        lon100,
        lat100
      }, 'Generated mesh ID from coordinates');

      // 使用生成的网格ID（符合白皮书格式）
      const meshId = generatedMeshId;

      // 使用事务确保数据一致性
      await this.managementPrisma.$transaction(async (tx) => {
        // 1. 确保用户存在
        await tx.user.upsert({
          where: { address: user.toLowerCase() },
          create: {
            address: user.toLowerCase(),
            role: 'user',
            createdAt: new Date(),
          },
          update: {
            lastActive: new Date(),
          },
        });

        // 2. 创建或更新mesh记录
        
        // 转换heat值，从wei转换为实际值（除以1e18）
        const heatValue = Number(heat) / 1e18;
        
        await tx.mesh.upsert({
          where: { meshId: meshId },
          create: {
            meshId: meshId,
            longitude: longitude,
            latitude: latitude,
            heatLevel: Math.floor(heatValue), // 转换为整数
            claimCount: Number(applyCount), // 转换为Number类型
            lastClaimTime: new Date(Number(timestamp) * 1000),
          },
          update: {
            heatLevel: Math.floor(heatValue), // 转换为整数
            claimCount: Number(applyCount), // 转换为Number类型
            lastClaimTime: new Date(Number(timestamp) * 1000),
            updatedAt: new Date(),
          },
        });

        // 3. 创建mesh_claims记录
        await tx.meshClaim.create({
          data: {
            userAddress: user.toLowerCase(),
            meshId: meshId, // 使用生成的网格ID
            longitude: longitude,
            latitude: latitude,
            txHash: txHash,
            blockNumber: blockNumber,
            claimedAt: new Date(Number(timestamp) * 1000),
          },
        });
      });

      logger.info({
        userAddress: user.toLowerCase(),
        originalMeshId: meshID,
        generatedMeshId: meshId,
        longitude,
        latitude,
        txHash
      }, 'Mesh claim processed successfully');

    } catch (error) {
      logger.error({
        error: (error as Error).message,
        eventData
      }, 'Failed to process MeshClaimed event');
      throw error;
    }
  }

  // 处理ClaimMesh函数调用
  async processClaimMeshCall(callData: any): Promise<void> {
    try {
      const {
        from,
        args,
        blockNumber,
        txHash,
        timestamp,
        status
      } = callData;

      // 只处理成功的交易
      if (!status) {
        logger.debug({
          txHash,
          from
        }, 'Skipping failed ClaimMesh transaction');
        return;
      }

      const meshId = args._meshID;

      logger.info({
        from,
        meshId,
        blockNumber: blockNumber.toString(),
        txHash
      }, 'Processing ClaimMesh function call');

      // 获取或创建用户
      const user = await this.getOrCreateUser(from);

      // 由于ClaimMesh函数调用没有包含完整的claim数据（如经纬度、heat等），
      // 我们需要等待MeshClaimed事件来获取完整数据
      // 这里只记录函数调用，不创建mesh和mesh_claims记录
      logger.info({
        userId: user.id,
        from,
        meshId,
        txHash
      }, 'ClaimMesh call processed successfully');

    } catch (error) {
      logger.error({
        error: (error as Error).message,
        callData
      }, 'Failed to process ClaimMesh call');
      throw error;
    }
  }

  // ClaimMint事件已废弃，不再处理

  // 处理claimMints函数调用
  async processClaimMintsCall(callData: any): Promise<void> {
    try {
      const {
        from,
        blockNumber,
        txHash,
        timestamp,
        status
      } = callData;

      // 只处理成功的交易
      if (!status) {
        logger.debug({
          txHash,
          from
        }, 'Skipping failed claimMints transaction');
        return;
      }

      logger.info({
        from,
        blockNumber: blockNumber.toString(),
        txHash
      }, 'Processing claimMints function call');

      // 获取或创建用户
      const user = await this.getOrCreateUser(from);

      // 这里可以添加额外的逻辑来处理claimMints调用
      // 比如记录调用时间、更新用户状态等
      logger.info({
        userId: user.id,
        from,
        txHash
      }, 'ClaimMints call processed successfully');

    } catch (error) {
      logger.error({
        error: (error as Error).message,
        callData
      }, 'Failed to process claimMints call');
      throw error;
    }
  }

  // 获取或创建用户
  private async getOrCreateUser(address: string): Promise<any> {
    try {
      // 先尝试获取现有用户
      let user = await this.managementPrisma.user.findUnique({
        where: { address: address.toLowerCase() }
      });

      // 如果用户不存在，创建新用户
      if (!user) {
        user = await this.managementPrisma.user.create({
          data: {
            address: address.toLowerCase(),
            role: 'user',
          },
        });

        logger.info({
          userId: user.id,
          address: address.toLowerCase()
        }, 'New user created');
      }

      return user;
    } catch (error) {
      logger.error({
        error: (error as Error).message,
        address
      }, 'Failed to get or create user');
      throw error;
    }
  }


  // 计算claim数量
  private calculateClaimAmount(heat: bigint, applyCount: number): number {
    try {
      // 将BigInt转换为number
      const heatValue = Number(heat);
      
      // 根据业务逻辑计算claim数量
      // 这里使用简单的计算方式，实际业务逻辑可能需要调整
      const baseAmount = heatValue / 1e18; // 假设heat是wei单位
      const multiplier = Math.max(1, applyCount); // 应用次数作为乘数
      
      const claimAmount = baseAmount * multiplier;
      
      logger.debug({
        heat: heatValue,
        applyCount,
        baseAmount,
        claimAmount
      }, 'Calculated claim amount');

      return claimAmount;
    } catch (error) {
      logger.error({
        error: (error as Error).message,
        heat: heat.toString(),
        applyCount
      }, 'Failed to calculate claim amount');
      
      // 返回默认值
      return 0;
    }
  }

  // 清理资源
  async cleanup(): Promise<void> {
    await this.managementPrisma.$disconnect();
  }
}
