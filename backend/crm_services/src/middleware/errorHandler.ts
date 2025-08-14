import { Request, Response, NextFunction } from 'express';
import { crmLogger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export const errorHandler = (
  error: AppError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Internal server error';
  const code = error?.code || 'INTERNAL_SERVER_ERROR';

  // Log the error with CRM-specific context
  crmLogger.error(error, 'error_handler', req.user?.id, {
    statusCode,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.method !== 'GET' ? req.body : undefined
  });

  // Don't expose sensitive information in production
  const isDev = process.env.NODE_ENV === 'development';
  const isProductionError = process.env.NODE_ENV === 'production' && statusCode === 500;

  res.status(statusCode).json({
    error: {
      message: isProductionError ? 'Internal server error' : message,
      code,
      statusCode,
      ...(isDev && { stack: error?.stack }),
      ...(isDev && { details: error?.details })
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

export const createError = (message: string, statusCode = 500, code?: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  error.code = code || getErrorCode(statusCode);
  return error;
};

// Helper to generate error codes based on status
const getErrorCode = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 404:
      return 'NOT_FOUND';
    case 409:
      return 'CONFLICT';
    case 429:
      return 'TOO_MANY_REQUESTS';
    case 500:
      return 'INTERNAL_SERVER_ERROR';
    default:
      return 'UNKNOWN_ERROR';
  }
};

// CRM-specific error creators
export const createCRMError = {
  connectionNotFound: (provider: string) => 
    createError(`${provider} connection not found`, 404, 'CRM_CONNECTION_NOT_FOUND'),
  
  tokenExpired: (provider: string) => 
    createError(`${provider} access token has expired`, 401, 'CRM_TOKEN_EXPIRED'),
  
  oauthFailed: (provider: string, reason?: string) => 
    createError(`${provider} OAuth failed${reason ? ': ' + reason : ''}`, 400, 'CRM_OAUTH_FAILED'),
  
  apiCallFailed: (provider: string, endpoint: string) => 
    createError(`${provider} API call to ${endpoint} failed`, 502, 'CRM_API_CALL_FAILED'),
  
  invalidProvider: (provider: string) => 
    createError(`Unsupported CRM provider: ${provider}`, 400, 'INVALID_CRM_PROVIDER'),
  
  rateLimitExceeded: (provider: string) => 
    createError(`${provider} API rate limit exceeded`, 429, 'CRM_RATE_LIMIT_EXCEEDED')
};

type AsyncHandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

export const asyncHandler = (fn: AsyncHandlerFn) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation error handler for Joi schemas
export const handleValidationError = (error: any) => {
  if (error.isJoi) {
    const details = error.details.map((detail: any) => ({
      field: detail.path.join('.'),
      message: detail.message,
      value: detail.context?.value
    }));

    return createError('Validation failed', 400, 'VALIDATION_ERROR');
  }
  return error;
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: `Cannot ${req.method} ${req.originalUrl}`,
      code: 'ENDPOINT_NOT_FOUND',
      statusCode: 404
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};
