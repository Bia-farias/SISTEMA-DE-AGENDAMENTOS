import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export async function testDatabaseConnection(timeoutMs = 2000): Promise<boolean> {
  try {
    const timeoutPromise = new Promise<boolean>((_, reject) =>
      setTimeout(() => reject(new Error('Database connection timeout')), timeoutMs)
    );

    const queryPromise = prisma.$queryRaw`SELECT 1`.then(() => true);

    return await Promise.race([queryPromise, timeoutPromise]);
  } catch (error) {
    return false;
  }
}
