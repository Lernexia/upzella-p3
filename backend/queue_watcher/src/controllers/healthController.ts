import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const healthController = (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'queue-watcher',
  environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
};
