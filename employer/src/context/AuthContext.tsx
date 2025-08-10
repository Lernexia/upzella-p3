'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  EmployerWithCompany,
  EmployerSignup,
  EmployerLogin,
  OTPVerification
} from '@/lib/schema/employer.schema';
import { authService } from '@/services/auth.service';
import { AuthResponse } from '@/services/common.service';

// Auth context types
export interface AuthUser extends EmployerWithCompany { }

export interface AuthContextType {
  // State
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  // Actions
  signup: (signupData: EmployerSignup, isCreateNewCompanyData: { companyName: string, isCreateNew: boolean }) => Promise<AuthResponse>;
  login: (loginData: EmployerLogin) => Promise<AuthResponse>;
  verifyOTP: (verification: OTPVerification) => Promise<AuthResponse & { redirectTo?: string }>;
  resendOTP: (email: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (updates: any) => Promise<AuthResponse>;
}


// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Computed values
  const isAuthenticated = !!user && user.is_verified;

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication state
   */
  async function initializeAuth() {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
        // Store in localStorage for persistence
        // localStorage.setItem('upzella_current_user', JSON.stringify(currentUser));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear any stale data
      // localStorage.removeItem('upzella_current_user');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle user signup
   */
  async function signup(signupData: EmployerSignup, isCreateNewCompanyData: { companyName: string, isCreateNew: boolean } = { companyName: "", isCreateNew: false }): Promise<AuthResponse> {
    try {
      setLoading(true);
      const result = await authService.signup(signupData, isCreateNewCompanyData.isCreateNew);

      if (isCreateNewCompanyData.isCreateNew) {
        localStorage.setItem("upzella_create_company_name", isCreateNewCompanyData.companyName);
      }
      localStorage.setItem('upzella_pending_verification', signupData.email);

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Signup failed',
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle user login
   */
  async function login(loginData: EmployerLogin): Promise<AuthResponse> {
    try {
      setLoading(true);
      const result = await authService.login(loginData);

      if (result.success) {
        // Store email for OTP verification
        localStorage.setItem('upzella_pending_verification', loginData.email);
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed',
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle OTP verification
   */
  async function verifyOTP(verification: OTPVerification): Promise<AuthResponse & { redirectTo?: string }> {
    try {
      setLoading(true);
      const result = await authService.verifyOTP(verification);

      if (result.data?.employer) {
        const authenticatedUser = result.data.employer;
        setUser(authenticatedUser);

        // Update localStorage with session info
        localStorage.removeItem('upzella_auth_user');

        // Clear pending verification
        localStorage.removeItem('upzella_pending_verification');

        if (localStorage.getItem("upzella_pending_signup")) {
          localStorage.removeItem("upzella_pending_signup")
        }

        return {
          ...result,
          redirectTo: result.data.redirectTo
        };
      }

      return result;
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: 'Verification failed',
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  }

  /**
   * Resend OTP
   */
  async function resendOTP(email: string): Promise<AuthResponse> {
    try {
      return await authService.resendOTP(email);
    } catch (error) {
      console.error('Resend OTP error:', error);
      return {
        success: false,
        message: 'Failed to resend OTP',
        error: 'An unexpected error occurred'
      };
    }
  }

  /**
   * Handle user logout
   */
  async function logout(): Promise<void> {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);

      // localStorage cleanup is handled by authService
      let storageItems = [
        "upzella_create_company_name",
        "upzella_pending_verification",
        "upzella_auth_user",
        "upzella_create_company",
      ];

      storageItems.forEach((items: string) => {
        if (localStorage.getItem(items)) {
          localStorage.removeItem(items);
        }
      });

    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Update user profile
   */
  async function updateProfile(updates: any): Promise<AuthResponse> {
    try {
      if (!user) {
        return {
          success: false,
          message: 'User not authenticated',
          error: 'Not authenticated'
        };
      }

      setLoading(true);
      const result = await authService.updateProfile(user.id, updates);

      if (result.success && result.data) {
        // Update local user state
        const updatedUser = { ...user, ...result.data };
        setUser(updatedUser);
        localStorage.setItem('upzella_auth_user', JSON.stringify({
          id: updatedUser.id,
          email: updatedUser.email
        }));
      }

      return result;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Failed to update profile',
        error: 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  }


  // Context value
  const contextValue: AuthContextType = {
    // State
    user,
    loading,
    isAuthenticated,

    // Actions
    signup,
    login,
    verifyOTP,
    resendOTP,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

/**
 * Custom hook to require authentication
 */
export function useRequireAuth(): AuthContextType {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }, [auth.loading, auth.isAuthenticated]);

  return auth;
}

/**
 * Custom hook to get pending verification email
 */
export function usePendingVerification(): string | null {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pendingEmail = localStorage.getItem('upzella_pending_verification');
      setEmail(pendingEmail);
    }
  }, []);

  return email;
}
