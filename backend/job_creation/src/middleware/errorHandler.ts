import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Internal server error';

  // Log the error
  logger.error(`Error ${statusCode}: ${message}`, {
    stack: error?.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : message,
    ...(process.env.NODE_ENV === 'development' && { stack: error?.stack })
  });
};

export const createError = (message: string, statusCode = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

type AsyncHandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

export const asyncHandler = (fn: AsyncHandlerFn) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
