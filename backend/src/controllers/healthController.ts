import { Request, Response } from 'express';
import { testDatabaseConnection } from '../database/prisma.js';
import { sendSuccess } from '../utils/response.js';

export const healthController = {
  async getHealth(_req: Request, res: Response) {
    const isDbConnected = await testDatabaseConnection();

    return sendSuccess(res, {
      status: 'online',
      service: 'Agenda AI Backend API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: isDbConnected ? 'connected' : 'disconnected',
    });
  },
};
