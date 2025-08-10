import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export interface CreateJobRequest {
  company_id: string;
  title: string;
  description: string;
  skills_required: string[];
  work_type: string[];
  employment_type: string;
  experience_min: number;
  experience_max: number;
  resume_threshold: number;
  resume_scoring: Array<{
    section_name: string;
    criteria_description?: string;
    weightage: number;
  }>;
  original_job_description_text?: string; // For storing AI-extracted text
}

export interface Job {
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
  resume_scoring_weights: Array<{
    section_name: string;
    criteria_description: string;
    weightage: number;
  }>;
  created_at: string;
  updated_at: string;
}

export class JobService {
  private static readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

  private static async getAuthToken(): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('Authentication required');
    }
    return session.access_token;
  }

  private static async apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  static async createJob(jobData: CreateJobRequest): Promise<{ job_id: string }> {
    const response = await this.apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });

    return response.data;
  }

  static async getJob(jobId: string): Promise<Job> {
    const response = await this.apiRequest(`/jobs/${jobId}`);
    return response.data;
  }

  static async getJobs(limit = 50, offset = 0): Promise<{
    jobs: Job[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      has_more: boolean;
    };
  }> {
    const response = await this.apiRequest(`/jobs?limit=${limit}&offset=${offset}`);
    return response.data;
  }

  static async updateJob(jobId: string, updates: Partial<CreateJobRequest>): Promise<Job> {
    const response = await this.apiRequest(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    return response.data;
  }

  static async deleteJob(jobId: string): Promise<void> {
    await this.apiRequest(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  static async extractJobFromText(extractedText: string): Promise<any> {
    const response = await this.apiRequest('/jobs/ai-extract', {
      method: 'POST',
      body: JSON.stringify({ job_description_text: extractedText }),
    });

    return response.data;
  }
}
