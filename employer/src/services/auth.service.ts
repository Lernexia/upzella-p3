import { createClient, createServiceClient } from "@/utils/supabase/client";
import {
  EmployerSignup,
  EmployerLogin,
  OTPVerification,
  UpdateEmployer,
  EmployerWithCompany,
} from "@/lib/schema/employer.schema";
import {
  OTPResponse,
  SignupResponse,
  LoginResponse,
  AuthResponse,
} from "./common.service";
import { employerService } from "./employer.service";

export class AuthService {
  private supabase = createClient();

  /**
   * Get employer by ID with company data
   */
  async getEmployerWithCompany(employerId: string): Promise<{
    success: boolean;
    employer?: EmployerWithCompany;
    error?: string;
  }> {
    try {
      const { data, error } = await this.supabase
        .from("employers")
        .select(
          `
          *,
          company:companies(*)
        `
        )
        .eq("id", employerId)
        .single();

      if (error || !data) {
        return {
          success: false,
          error: "Employer not found",
        };
      }

      return {
        success: true,
        employer: data as EmployerWithCompany,
      };
    } catch (error) {
      console.error("Error in getEmployerWithCompany:", error);
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Generate and send OTP via Supabase Auth with user data
   */
  async sendOTPWithUserData(
    email: string,
    userData: any
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true, // Create auth user if not exists
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: userData,
        },
      });

      if (error) {
        console.error("Error sending OTP:", error);
        return {
          success: false,
          message: "Failed to send verification code",
          error: error.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "Verification code sent successfully to your email address",
        data: data.user,
      };
    } catch (error) {
      console.error("Error in sendOTP:", error);
      return {
        success: false,
        message: "Failed to send verification code",
        error: "An unexpected error occurred",
        data: null,
      };
    }
  }

  /**
   * Send OTP for existing users (login)
   */
  async sendOTP(email: string): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error sending OTP:", error);
        return {
          success: false,
          message: "Failed to send verification code",
          error: error.message,
        };
      }

      return {
        success: true,
        message: "Verification code sent successfully to your email address",
      };
    } catch (error) {
      console.error("Error in sendOTP:", error);
      return {
        success: false,
        message: "Failed to send verification code",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Verify OTP and complete authentication using Supabase Auth
   */
  async verifyOTP(verification: OTPVerification): Promise<OTPResponse> {
    try {
      const { data, error } = await this.supabase.auth.verifyOtp({
        email: verification.email,
        token: verification.otp_code,
        type: "email",
      });

      if (error) {
        console.error("Error verifying OTP:", error);
        return {
          success: false,
          message: error.message || "Invalid or expired verification code",
          error: error.message,
        };
      }

      if (!data.user) {
        return {
          success: false,
          message: "Verification failed",
          error: "No user data returned",
        };
      }

      // Check if this is a new signup (has pending signup data)
      const pendingSignupData = localStorage.getItem("upzella_pending_signup");
      const shouldCreateCompany =
        localStorage.getItem("upzella_create_company") === "true";

      if (pendingSignupData) {
        // This is a new signup - create employer record
        const signupData = JSON.parse(pendingSignupData);

        const employerResult = await employerService.createEmployer({
          id: data.user.id,
          full_name: signupData.full_name,
          email: signupData.email,
          phone: signupData.phone,
          company_id: shouldCreateCompany
            ? null
            : signupData.company_id || null,
          job_role: signupData.job_role || "HR Manager",
        });

        if (!employerResult.success || !employerResult.employer) {
          return {
            success: false,
            message: "Account verified but failed to create profile",
            error: employerResult.error,
          };
        }

        // Update employer as verified
        await this.supabase
          .from("employers")
          .update({
            is_verified: true,
            last_login_at: new Date().toISOString(),
          })
          .eq("id", employerResult.employer.id);

        // Get employer with company data
        const { data: employer, error: employerError } = await this.supabase
          .from("employers")
          .select(
            `
            *,
            company:companies(*)
          `
          )
          .eq("id", employerResult.employer.id)
          .single();

        if (employerError || !employer) {
          return {
            success: false,
            message: "Profile created but failed to fetch complete data",
            error: "Profile fetch error",
          };
        }

        // Determine redirect path
        let redirectTo = "/dashboard";
        let isNewCompany = false;

        if (shouldCreateCompany) {
          let storageItems = ["upzella_auth_user"];

          storageItems.forEach((items: string) => {
            if (localStorage.getItem(items)) {
              localStorage.removeItem(items);
            }
          });

          redirectTo = "/onboarding/company-setup";
          isNewCompany = true;
        } else {
          let storageItems = [
            "upzella_create_company_name",
            "upzella_auth_user",
            "upzella_create_company",
          ];

          storageItems.forEach((items: string) => {
            if (localStorage.getItem(items)) {
              localStorage.removeItem(items);
            }
          });
        }

        return {
          success: true,
          message: "Account created and verified successfully!",
          data: {
            employer: employer as EmployerWithCompany,
            isNewCompany,
            redirectTo,
          },
        };
      } else {
        // This is existing user login - get employer data
        const { data: employer, error: employerError } = await this.supabase
          .from("employers")
          .select(
            `
            *,
            company:companies(*)
          `
          )
          .eq("email", verification.email)
          .single();

        if (employerError || !employer) {
          return {
            success: false,
            message: "Employer profile not found",
            error: "Profile not found",
          };
        }

        // Update last login
        await this.supabase
          .from("employers")
          .update({
            last_login_at: new Date().toISOString(),
          })
          .eq("id", employer.id);

        // Determine redirect path for existing user
        let redirectTo = "/dashboard";
        const hasCompany = !!(employer.company_id && employer.company);

        if (!hasCompany) {
          let storageItems = ["upzella_auth_user"];

          storageItems.forEach((items: string) => {
            if (localStorage.getItem(items)) {
              localStorage.removeItem(items);
            }
          });
          redirectTo = "/onboarding/company-setup";
        } else {
          let storageItems = [
            "upzella_create_company_name",
            "upzella_auth_user",
            "upzella_create_company",
          ];

          storageItems.forEach((items: string) => {
            if (localStorage.getItem(items)) {
              localStorage.removeItem(items);
            }
          });
        }
        return {
          success: true,
          message: "Login successful!",
          data: {
            employer: employer as EmployerWithCompany,
            isNewCompany: false,
            redirectTo,
          },
        };
      }
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      return {
        success: false,
        message: "Verification failed",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Handle complete signup flow - Send OTP first, then create employer on verification
   */
  async signup(
    signupData: EmployerSignup,
    isCreateNewCompany: boolean = false
  ): Promise<SignupResponse> {
    try {
      const existingUser = await employerService.getEmployerByIdOrEmail(
        null,
        signupData.email
      );

      if (existingUser.success && existingUser.employer) {
        let storageItems = [
          "upzella_create_company_name",
          "upzella_pending_signup",
          "upzella_pending_verification",
          "upzella_auth_user",
          "upzella_create_company",
        ];

        storageItems.forEach((items: string) => {
          if (localStorage.getItem(items)) {
            localStorage.removeItem(items);
          }
        });

        return {
          success: false,
          message: "An account with this email already exists",
          error: "Email already registered",
        };
      }

      // Step 1: Send OTP first to verify email and create auth user
      const otpResult = await this.sendOTPWithUserData(signupData.email, {
        full_name: signupData.full_name,
        phone: signupData.phone,
        job_role: signupData.job_role || "HR Manager",
        company_id: isCreateNewCompany ? null : signupData.company_id || null,
        is_create_new_company: isCreateNewCompany,
      });

      if (!otpResult.success) {
        return {
          success: false,
          message: "Failed to send verification code",
          error: otpResult.error,
        };
      }

      // Step 2: Store signup data in localStorage for post-verification flow
      localStorage.setItem(
        "upzella_pending_signup",
        JSON.stringify(signupData)
      );
      localStorage.setItem(
        "upzella_create_company",
        isCreateNewCompany.toString()
      );

      return {
        success: true,
        message:
          "Verification code sent successfully. Please check your email to complete signup.",
        data: {
          requiresOTP: true,
          isNewCompany: isCreateNewCompany,
        },
      };
    } catch (error) {
      console.error("Error in signup:", error);
      return {
        success: false,
        message: "Signup failed",
        error: "An unexpected error occurred during signup",
      };
    }
  }

  /**
   * Handle login flow
   */
  async login(loginData: EmployerLogin): Promise<LoginResponse> {
    try {
      // Check if employer exists
      const { data: employer, error } = await this.supabase
        .from("employers")
        .select(
          `
          *,
          company:companies(*)
        `
        )
        .eq("email", loginData.email)
        .eq("is_active", true)
        .single();

      if (error || !employer) {
        return {
          success: false,
          message: "No account found with this email address",
          error: "User not found",
        };
      }

      // Send OTP for login
      const otpResult = await this.sendOTP(loginData.email);
      if (!otpResult.success) {
        return {
          success: false,
          message: "Failed to send login code",
          error: otpResult.error,
        };
      }

      return {
        success: true,
        message: "Login code sent to your email",
        data: {
          employer: employer as EmployerWithCompany,
          sessionCreated: false,
        },
      };
    } catch (error) {
      console.error("Error in login:", error);
      return {
        success: false,
        message: "Login failed",
        error: "An unexpected error occurred during login",
      };
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<EmployerWithCompany | null> {
    try {
      // Check Supabase session first
      const {
        data: { session },
        error,
      } = await this.supabase.auth.getSession();

      if (error || !session?.user) {
        // Clean up any stale local storage
        localStorage.removeItem("upzella_auth_user");
        return null;
      }

      // Get employer data
      const { data: employer, error: employerError } = await this.supabase
        .from("employers")
        .select(
          `
          *,
          company:companies(*)
        `
        )
        .eq("email", session.user.email)
        .eq("is_active", true)
        .eq("is_verified", true)
        .single();

      if (employerError || !employer) {
        return null;
      }

      return employer as EmployerWithCompany;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      return null;
    }
  }

  /**
   * Update employer profile
   */
  async updateProfile(
    employerId: string,
    updates: UpdateEmployer
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase
        .from("employers")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", employerId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: "Failed to update profile",
          error: error.message,
        };
      }

      return {
        success: true,
        message: "Profile updated successfully",
        data,
      };
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return {
        success: false,
        message: "Failed to update profile",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<AuthResponse> {
    try {
      // Sign out from Supabase
      const { error } = await this.supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error);
      }

      // Clear local storage
      if (typeof window !== "undefined") {
        if (localStorage.getItem("upzella_auth_user"))
          localStorage.removeItem("upzella_auth_user");
        if (localStorage.getItem("upzella_create_company"))
          localStorage.removeItem("upzella_create_company");
        if (localStorage.getItem("upzella_signup_data"))
          localStorage.removeItem("upzella_signup_data");
        if (localStorage.getItem("upzella_pending_verification"))
          localStorage.removeItem("upzella_pending_verification");
        if (localStorage.getItem("upzella_employer_temp"))
          localStorage.removeItem("upzella_employer_temp");
        if (localStorage.getItem("upzella_selected_company"))
          localStorage.removeItem("upzella_selected_company");
        if (localStorage.getItem("upzella_create_company_name"))
          localStorage.removeItem("upzella_create_company_name");
      }

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      console.error("Error in logout:", error);
      return {
        success: false,
        message: "Logout failed",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(email: string): Promise<AuthResponse> {
    try {
      // Check if this is pending signup or existing user
      const pendingSignupData = localStorage.getItem("upzella_pending_signup");

      if (pendingSignupData) {
        // This is a pending signup - resend with user data
        const signupData = JSON.parse(pendingSignupData);
        const shouldCreateCompany =
          localStorage.getItem("upzella_create_company") === "true";

        return await this.sendOTPWithUserData(email, {
          full_name: signupData.full_name,
          phone: signupData.phone,
          job_role: signupData.job_role || "HR Manager",
          company_id: shouldCreateCompany
            ? null
            : signupData.company_id || null,
          is_create_new_company: shouldCreateCompany,
        });
      } else {
        // Check if user exists for login
        const { data: employer } = await this.supabase
          .from("employers")
          .select("id")
          .eq("email", email)
          .single();

        if (!employer) {
          return {
            success: false,
            message: "No account found with this email",
            error: "User not found",
          };
        }

        return await this.sendOTP(email);
      }
    } catch (error) {
      console.error("Error in resendOTP:", error);
      return {
        success: false,
        message: "Failed to resend OTP",
        error: "An unexpected error occurred",
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
