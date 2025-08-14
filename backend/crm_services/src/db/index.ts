import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database types
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          name: string;
          domain?: string;
          website_url?: string;
          linkedin_url?: string;
          x_url?: string;
          instagram_url?: string;
          phone?: string;
          logo_url?: string;
          employee_count?: string;
          company_type?: string;
          industry?: string;
          country: string;
          state?: string;
          address?: string;
          pincode?: string;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['companies']['Insert']>;
      };
      employers: {
        Row: {
          id: string;
          company_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string;
          avatar_url?: string;
          designation?: string;
          department?: string;
          is_active: boolean;
          last_login_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['employers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['employers']['Insert']>;
      };
      crm_connections: {
        Row: {
          id: string;
          user_id: string;
          company_id: string;
          crm_provider: 'hubspot';
          access_token: string;
          refresh_token: string;
          expires_at: string;
          scopes: string[];
          connected_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['crm_connections']['Row'], 'id' | 'connected_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['crm_connections']['Insert']>;
      };
    };
  };
}

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  logger.error('Missing Supabase configuration');
  throw new Error('Missing Supabase URL or Service Role Key');
}

// Create Supabase client for server-side operations
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Create admin client for bypassing RLS when needed
export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('companies').select('count').limit(1);
    
    if (error) {
      logger.error('Database connection test failed:', error);
      return false;
    }

    logger.info('Database connection test successful');
    return true;
  } catch (err) {
    logger.error('Database connection test error:', err);
    return false;
  }
};

// Helper function to get user's company context
export const getUserCompanyContext = async (userId: string) => {
  try {
    const { data: employer, error } = await supabase
      .from('employers')
      .select(`
        id,
        company_id,
        companies:company_id (
          id,
          name,
          domain
        )
      `)
      .eq('id', userId)
      .single();

    if (error || !employer) {
      logger.error('Failed to get user company context:', error);
      return null;
    }

    return employer;
  } catch (err) {
    logger.error('Error getting user company context:', err);
    return null;
  }
};

// CRM Connection operations
export const crmConnectionQueries = {
  // Get CRM connection by user and provider
  getConnection: async (userId: string, provider: 'hubspot') => {
    const { data, error } = await supabase
      .from('crm_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('crm_provider', provider)
      .single();

    return { data, error };
  },

  // Create new CRM connection
  createConnection: async (connectionData: Database['public']['Tables']['crm_connections']['Insert']) => {
    const { data, error } = await supabase
      .from('crm_connections')
      .insert(connectionData)
      .select()
      .single();

    return { data, error };
  },

  // Update CRM connection (for token refresh)
  updateConnection: async (
    userId: string, 
    provider: 'hubspot', 
    updates: Database['public']['Tables']['crm_connections']['Update']
  ) => {
    const { data, error } = await supabase
      .from('crm_connections')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('crm_provider', provider)
      .select()
      .single();

    return { data, error };
  },

  // Delete CRM connection
  deleteConnection: async (userId: string, provider: 'hubspot') => {
    const { data, error } = await supabase
      .from('crm_connections')
      .delete()
      .eq('user_id', userId)
      .eq('crm_provider', provider)
      .select()
      .single();

    return { data, error };
  },

  // Get all connections for a company
  getCompanyConnections: async (companyId: string) => {
    const { data, error } = await supabase
      .from('crm_connections')
      .select(`
        *,
        employers:user_id (
          first_name,
          last_name,
          email
        )
      `)
      .eq('company_id', companyId);

    return { data, error };
  }
};

// Health check function
export const checkDatabaseHealth = async () => {
  try {
    const start = Date.now();
    
    const { data, error } = await supabase
      .from('crm_connections')
      .select('count')
      .limit(1);

    const responseTime = Date.now() - start;

    if (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        responseTime
      };
    }

    return {
      status: 'healthy',
      responseTime,
      connected: true
    };
  } catch (err) {
    return {
      status: 'unhealthy',
      error: err instanceof Error ? err.message : 'Unknown error',
      responseTime: 0
    };
  }
};

export default supabase;
