import axios from 'axios';
import { createClient } from '@/utils/supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL || 'http://localhost:8002';
const supabase = createClient();

// API instance with default configuration
const userApi = axios.create({
  baseURL: `${API_BASE_URL}/users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
userApi.interceptors.request.use(
  async (config) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Types for user data
export interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  job_role?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  company?: {
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
  };
}

export interface UpdateProfileData {
  full_name?: string;
  phone?: string;
  job_role?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface DeactivateAccountData {
  reason: string;
  feedback?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class UserService {
  /**
   * Get current user profile with company information
   */
  static async getProfile(): Promise<User> {
    try {
      const response = await userApi.get('/profile');
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  /**
   * Update user profile information
   */
  static async updateProfile(data: UpdateProfileData): Promise<ApiResponse> {
    try {
      const response = await userApi.put('/profile', data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  /**
   * Upload user avatar
   */
  static async uploadAvatar(file: File): Promise<ApiResponse<{ avatar_url: string }>> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await userApi.post('/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload avatar');
    }
  }

  /**
   * Change user password
   */
  static async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    try {
      const response = await userApi.post('/change-password', data);
      return response.data;
    } catch (error: any) {
      console.error('Error changing password:', error);
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }

  /**
   * Deactivate user account
   */
  static async deactivateAccount(data: DeactivateAccountData): Promise<ApiResponse> {
    try {
      const response = await userApi.post('/deactivate', data);
      return response.data;
    } catch (error: any) {
      console.error('Error deactivating account:', error);
      throw new Error(error.response?.data?.message || 'Failed to deactivate account');
    }
  }

  /**
   * Check if user is authenticated by checking Supabase session
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session?.access_token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Logout user by clearing Supabase session and redirecting
   */
  static async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Error during logout:', error);
      window.location.href = '/auth/login';
    }
  }

  /**
   * Validate file for avatar upload
   */
  static validateAvatarFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Invalid file type. Please select a JPEG, PNG, or WebP image.'
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size too large. Please select an image smaller than 5MB.'
      };
    }

    return { isValid: true };
  }

  /**
   * Get user initials for avatar placeholder
   */
  static getUserInitials(fullName: string): string {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Format user display name
   */
  static formatDisplayName(user: User): string {
    return user.full_name || user.email.split('@')[0];
  }

  /**
   * Check if user has completed profile setup
   */
  static isProfileComplete(user: User): boolean {
    return !!(
      user.full_name &&
      user.job_role &&
      user.company?.name &&
      user.company?.country
    );
  }

  /**
   * Get profile completion percentage
   */
  static getProfileCompletionPercentage(user: User): number {
    const fields = [
      user.full_name,
      user.job_role,
      user.phone,
      user.avatar_url,
      user.company?.name,
      user.company?.industry,
      user.company?.website_url,
      user.company?.country,
      user.company?.logo_url
    ];

    const completedFields = fields.filter(field => field && field.trim().length > 0);
    return Math.round((completedFields.length / fields.length) * 100);
  }
}

export default UserService;
