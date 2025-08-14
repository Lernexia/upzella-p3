import { Request, Response, NextFunction } from 'express';
import { supabase } from '../db';
import { createError } from './errorHandler';
import { crmLogger } from '../utils/logger';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string | null;
        company_id?: string | null;
      };
    }
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Authorization token required', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token with Supabase
    const { data, error: userErr } = await supabase.auth.getUser(token);

    if (userErr || !data?.user) {
      crmLogger.error(new Error('Authentication failed'), 'auth_middleware', undefined, { error: userErr });
      throw createError('Invalid or expired token', 401);
    }

    const user = data.user;

    // Get employer details including company_id
    const { data: employer, error: employerError } = await supabase
      .from('employers')
      .select(`
        id,
        email,
        company_id,
        first_name,
        last_name,
        is_active
      `)
      .eq('id', user.id)
      .single();

    if (employerError || !employer) {
      crmLogger.error(new Error('Employer not found'), 'auth_middleware', user.id, { error: employerError });
      throw createError('Employer profile not found', 404);
    }

    if (!employer.is_active) {
      crmLogger.error(new Error('Inactive user attempted access'), 'auth_middleware', user.id);
      throw createError('Account is inactive', 403);
    }

    // Attach user to request object
    req.user = {
      id: employer.id,
      email: employer.email,
      company_id: employer.company_id
    };

    crmLogger.oauth('user_authenticated', 'system', employer.id, {
      company_id: employer.company_id,
      endpoint: req.path
    });

    next();
  } catch (error) {
    if (error instanceof Error) {
      crmLogger.error(error, 'auth_middleware');
      
      // Check if it's already a formatted error
      if ('status' in error) {
        return res.status((error as any).status).json({
          error: {
            message: error.message,
            code: (error as any).code || 'AUTHENTICATION_ERROR'
          }
        });
      }
    }

    // Default error response
    res.status(401).json({
      error: {
        message: 'Authentication failed',
        code: 'AUTHENTICATION_ERROR'
      }
    });
  }
};

// Middleware to ensure user has CRM connection
export const requireCRMConnection = (provider: 'hubspot') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw createError('Authentication required', 401);
      }

      const { data: connection, error } = await supabase
        .from('crm_connections')
        .select('*')
        .eq('user_id', req.user.id)
        .eq('crm_provider', provider)
        .single();

      if (error || !connection) {
        crmLogger.connection('connection_not_found', provider, req.user.id);
        throw createError(`No ${provider} connection found`, 404);
      }

      // Check if token is expired
      const expiresAt = new Date(connection.expires_at);
      const now = new Date();
      
      if (expiresAt <= now) {
        crmLogger.connection('token_expired', provider, req.user.id, { expires_at: connection.expires_at });
        throw createError(`${provider} token has expired`, 401);
      }

      // Attach connection to request for use in handlers
      (req as any).crmConnection = connection;
      
      next();
    } catch (error) {
      if (error instanceof Error) {
        crmLogger.error(error, 'crm_connection_middleware', req.user?.id);
        
        if ('status' in error) {
          return res.status((error as any).status).json({
            error: {
              message: error.message,
              code: (error as any).code || 'CRM_CONNECTION_ERROR'
            }
          });
        }
      }

      res.status(500).json({
        error: {
          message: 'CRM connection validation failed',
          code: 'CRM_CONNECTION_ERROR'
        }
      });
    }
  };
};

// Optional authentication (for public endpoints that can benefit from user context)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // No auth provided, continue without user context
    }

    const token = authHeader.substring(7);

    const { data, error: userErr } = await supabase.auth.getUser(token);

    if (userErr || !data?.user) {
      return next(); // Invalid token, continue without user context
    }

    // Get employer details
    const { data: employer } = await supabase
      .from('employers')
      .select('id, email, company_id, is_active')
      .eq('id', data.user.id)
      .single();

    if (employer && employer.is_active) {
      req.user = {
        id: employer.id,
        email: employer.email,
        company_id: employer.company_id
      };
    }

    next();
  } catch (error) {
    // Log the error but continue without authentication
    crmLogger.error(error instanceof Error ? error : new Error('Optional auth failed'), 'optional_auth');
    next();
  }
};
