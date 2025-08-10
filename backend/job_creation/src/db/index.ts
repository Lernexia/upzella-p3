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
        Insert: {
          id?: string;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
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
          country?: string;
          state?: string;
          address?: string;
          pincode?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      employers: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone?: string;
          company_id?: string;
          job_role?: string;
          avatar_url?: string;
          is_active: boolean;
          is_verified: boolean;
          last_login_at?: string;
          created_at: string;
          updated_at: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          company_id: string;
          title: string;
          description: string;
          skills_required: string[];
          work_type: string[];
          employment_type: string;
          experience_min: number;
          experience_max: number;
          resume_threshold: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          title: string;
          description: string;
          skills_required: string[];
          work_type: string[];
          employment_type: string;
          experience_min: number;
          experience_max: number;
          resume_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          title?: string;
          description?: string;
          skills_required?: string[];
          work_type?: string[];
          employment_type?: string;
          experience_min?: number;
          experience_max?: number;
          resume_threshold?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      resume_scoring_weights: {
        Row: {
          id: string;
          job_id: string;
          section_name: string;
          criteria_description?: string;
          weightage: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          section_name: string;
          criteria_description?: string;
          weightage: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          section_name?: string;
          criteria_description?: string;
          weightage?: number;
          created_at?: string;
        };
      };
      ai_models: {
        Row: {
          id: string;
          user_id?: string;
          model_name: string;
          provider: string;
          configs: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          model_name: string;
          provider: string;
          configs: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_name?: string;
          provider?: string;
          configs?: any;
          created_at?: string;
        };
      };
    };
  };
}

class SupabaseService {
  private static instance: SupabaseService;
  public client: SupabaseClient<Database>;

  private constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    // prefer service role key on backend for privileged ops if available
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (recommended) or SUPABASE_ANON_KEY.');
    }

    this.client = createClient<Database>(supabaseUrl, supabaseKey);
    logger.info('Supabase client initialized');
  }

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  public getClient(): SupabaseClient<Database> {
    return this.client;
  }
}

export const supabaseService = SupabaseService.getInstance();
export const supabase = supabaseService.getClient();
