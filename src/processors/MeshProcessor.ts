import { PrismaClient as ManagementPrismaClient } from '../generated/management-prisma/index.js';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export interface MeshClaimData {
  user: string;
  meshId: string;
  lon100: number;
  lat100: number;
  applyCount: number;
  heat: bigint;
  costBurned: bigint;
  txHash: string;
  blockNumber: bigint;
  timestamp: Date;
}

export class MeshProcessor {
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

  /**
   * 处理MeshClaimed事件
   */
  async processMeshClaimedEvent(eventData: any): Promise<void> {
    try {
      const meshClaimData: MeshClaimData = {
        user: eventData.args.user,
        meshId: eventData.args.meshID,
        lon100: Number(eventData.args.lon100),
        lat100: Number(eventData.args.lat100),
        applyCount: Number(eventData.args.applyCount),
        heat: BigInt(eventData.args.heat),
        costBurned: BigInt(eventData.args.costBurned),
        txHash: eventData.txHash,
        blockNumber: eventData.blockNumber,
        timestamp: eventData.timestamp,
      };

      // 转换坐标（从100倍精度转换为实际坐标）
      const longitude = meshClaimData.lon100 / 100;
      const latitude = meshClaimData.lat100 / 100;

      logger.info({
        user: meshClaimData.user,
        meshId: meshClaimData.meshId,
        longitude,
        latitude,
        txHash: meshClaimData.txHash,
      }, 'Processing mesh claim event');

      // 使用事务确保数据一致性
      await this.managementPrisma.$transaction(async (tx) => {
        // 1. 确保用户存在
        await tx.user.upsert({
          where: { address: meshClaimData.user },
          create: {
            address: meshClaimData.user,
            role: 'user',
            createdAt: new Date(),
          },
          update: {
            lastActive: new Date(),
          },
        });

        // 2. 创建或更新mesh记录
        await tx.mesh.upsert({
          where: { meshId: meshClaimData.meshId },
          create: {
            meshId: meshClaimData.meshId,
            longitude: longitude,
            latitude: latitude,
            heatLevel: Number(meshClaimData.heat) || 0,
            claimCount: Number(meshClaimData.applyCount) || 1,
            lastClaimTime: meshClaimData.timestamp,
          },
          update: {
            heatLevel: Number(meshClaimData.heat) || 0,
            claimCount: Number(meshClaimData.applyCount) || 1,
            lastClaimTime: meshClaimData.timestamp,
            updatedAt: new Date(),
          },
        });

        // 3. 创建mesh_claims记录
        await tx.meshClaim.create({
          data: {
            userAddress: meshClaimData.user,
            meshId: meshClaimData.meshId,
            longitude: longitude,
            latitude: latitude,
            txHash: meshClaimData.txHash,
            blockNumber: meshClaimData.blockNumber,
            claimedAt: meshClaimData.timestamp,
          },
        });
      });

      logger.info({
        user: meshClaimData.user,
        meshId: meshClaimData.meshId,
        longitude,
        latitude,
      }, 'Successfully processed mesh claim');

    } catch (error) {
      logger.error({
        error: (error as Error).message,
        eventData,
      }, 'Failed to process mesh claim event');
      throw error;
    }
  }

  /**
   * 处理claimMesh函数调用
   */
  async processClaimMeshCall(callData: any): Promise<void> {
    try {
      const meshId = callData.args._meshID;
      const user = callData.from;
      const txHash = callData.txHash;
      const blockNumber = callData.blockNumber;
      const timestamp = callData.timestamp;

      logger.info({
        user,
        meshId,
        txHash,
        blockNumber,
      }, 'Processing claim mesh function call');

      // 对于函数调用，我们只记录基本信息，具体数据需要从事件中获取
      // 这里可以添加一些验证逻辑，比如检查mesh是否已经被claim等

      logger.info({
        user,
        meshId,
      }, 'Successfully processed claim mesh call');

    } catch (error) {
      logger.error({
        error: (error as Error).message,
        callData,
      }, 'Failed to process claim mesh call');
      throw error;
    }
  }

  /**
   * 生成规范的grid_number格式 (S1234N1234)
   */
  private generateGridNumber(lon100: number, lat100: number): string {
    const longitude = lon100 / 100;
    const latitude = lat100 / 100;

    // 将坐标转换为网格编号
    // 这里使用简单的网格划分逻辑，实际可能需要根据具体需求调整
    const lonGrid = Math.floor(longitude * 1000);
    const latGrid = Math.floor(latitude * 1000);

    // 确保网格编号为正数
    const lonStr = lonGrid >= 0 ? `E${lonGrid}` : `W${Math.abs(lonGrid)}`;
    const latStr = latGrid >= 0 ? `N${latGrid}` : `S${Math.abs(latGrid)}`;

    return `${latStr}${lonStr}`;
  }

  /**
   * 获取mesh统计信息
   */
  async getMeshStats(): Promise<{
    totalMeshes: number;
    claimedMeshes: number;
    unclaimedMeshes: number;
    totalClaims: number;
  }> {
    try {
      const [totalMeshes, claimedMeshes, totalClaims] = await Promise.all([
        this.managementPrisma.mesh.count(),
        this.managementPrisma.mesh.count({ where: { claimCount: { gt: 0 } } }),
        this.managementPrisma.meshClaim.count(),
      ]);

      return {
        totalMeshes,
        claimedMeshes,
        unclaimedMeshes: totalMeshes - claimedMeshes,
        totalClaims,
      };
    } catch (error) {
      logger.error({ error: (error as Error).message }, 'Failed to get mesh stats');
      throw error;
    }
  }

  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    await this.managementPrisma.$disconnect();
  }
}
