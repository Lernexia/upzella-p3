import { Company } from "@/lib/schema/company.schema";
import { Employer, EmployerWithCompany } from "@/lib/schema/employer.schema";

// Types for auth service responses
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface SignupResponse extends AuthResponse {
  data?: {
    employer?: Employer;
    company?: Company;
    requiresOTP: boolean;
    isNewCompany: boolean;
  };
}

export interface LoginResponse extends AuthResponse {
  data?: {
    employer: EmployerWithCompany;
    sessionCreated: boolean;
  };
}

export interface OTPResponse extends AuthResponse {
  data?: {
    employer: EmployerWithCompany;
    isNewCompany: boolean;
    redirectTo: string;
  };
}