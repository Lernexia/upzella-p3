import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Ensure logs folder exists (only in dev/local)
if (process.env.NODE_ENV !== 'production') {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'gray'
};

winston.addColors(colors);

// Format helper
const logFormat = winston.format.printf((info) => {
  const meta = info.meta ? ` ${JSON.stringify(info.meta)}` : '';
  return `${info.timestamp} ${info.level}: ${info.message}${meta}`;
});

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    logFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    })
  ]
});

// Add file transports for non-production environments
if (process.env.NODE_ENV !== 'production') {
  // Combined log file
  logger.add(new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'combined.log'),
    format: winston.format.combine(
      winston.format.uncolorize(),
      winston.format.json()
    ),
    maxsize: parseInt(process.env.LOG_MAX_SIZE || '5242880', 10), // 5MB
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '5', 10)
  }));

  // Error log file
  logger.add(new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.uncolorize(),
      winston.format.json()
    ),
    maxsize: parseInt(process.env.LOG_MAX_SIZE || '5242880', 10), // 5MB
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '5', 10)
  }));
}

// CRM Service specific logging helpers
export const crmLogger = {
  oauth: (action: string, provider: string, userId?: string, meta?: any) => {
    logger.info(`[CRM OAuth] ${action} - Provider: ${provider}`, {
      service: 'crm_services',
      action,
      provider,
      userId,
      ...meta
    });
  },

  connection: (action: string, provider: string, userId: string, meta?: any) => {
    logger.info(`[CRM Connection] ${action} - Provider: ${provider}`, {
      service: 'crm_services',
      action,
      provider,
      userId,
      ...meta
    });
  },

  tokenRefresh: (provider: string, userId: string, success: boolean, meta?: any) => {
    const level = success ? 'info' : 'warn';
    logger.log(level, `[CRM Token] Refresh ${success ? 'successful' : 'failed'} - Provider: ${provider}`, {
      service: 'crm_services',
      action: 'token_refresh',
      provider,
      userId,
      success,
      ...meta
    });
  },

  apiCall: (provider: string, endpoint: string, status: number, userId?: string, meta?: any) => {
    logger.info(`[CRM API] ${provider} API call - ${endpoint} (${status})`, {
      service: 'crm_services',
      action: 'api_call',
      provider,
      endpoint,
      status,
      userId,
      ...meta
    });
  },

  error: (error: Error, context: string, userId?: string, meta?: any) => {
    logger.error(`[CRM Error] ${context}: ${error.message}`, {
      service: 'crm_services',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context,
      userId,
      ...meta
    });
  }
};

export default logger;
