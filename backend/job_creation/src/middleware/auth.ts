import { Request, Response, NextFunction } from 'express';
import { supabase } from '../db';
import { createError } from './errorHandler';
import { logger } from '../utils/logger';

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
      logger.error('Authentication failed', userErr ?? 'no user returned');
      throw createError('Invalid or expired token', 401);
    }

    const user = data.user;

    // Get employer details including company_id
    const { data: employer, error: employerError } = await supabase
      .from('employers')
      .select('id, company_id, full_name, email, is_active')
      .eq('id', user.id)
      .single();

    if (employerError) {
      logger.error('Failed to fetch employer details', employerError);
      throw createError('User not found in employers table', 401);
    }

    if (!employer.is_active) {
      throw createError('Account is deactivated', 403);
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email ?? employer.email,
      company_id: employer.company_id
    };

    logger.info('User authenticated successfully', {
      user_id: user.id,
      company_id: employer.company_id
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Optional authentication - doesn't fail if no token is provided
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.substring(7);
    const { data, error } = await supabase.auth.getUser(token);

    if (!error && data?.user) {
      const { data: employer } = await supabase
        .from('employers')
        .select('id, company_id, full_name, email, is_active')
        .eq('id', data.user.id)
        .single();

      if (employer && employer.is_active) {
        req.user = {
          id: data.user.id,
          email: data.user.email ?? employer.email,
          company_id: employer.company_id
        };
      }
    }

    next();
  } catch (error) {
    // On failure, continue without authentication (as this is optional)
    logger.warn('optionalAuth encountered an error, continuing unauthenticated', String(error));
    next();
  }
};
