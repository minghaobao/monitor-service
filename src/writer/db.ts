import { PrismaClient } from '../generated/prisma/index.js';

export type Db = ReturnType<typeof getDb>;

let prisma: PrismaClient | null = null;

function getDb() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

export async function createDb() {
  return getDb();
}
