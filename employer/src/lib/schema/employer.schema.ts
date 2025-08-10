import { z } from "zod";
import { id } from "zod/locales";

// Base employer schema for database operations
export const EmployerSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().nullable(),
  company_id: z.string().uuid(),
  job_role: z.string().default("HR Manager"),
  avatar_url: z.string().url().nullable(),
  is_active: z.boolean().default(true),
  is_verified: z.boolean().default(false),
  last_login_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Create employer schema (for new employer creation)
export const CreateEmployerSchema = z.object({
  id  : z.string().uuid().optional(), // Optional for new employer creation
  full_name: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  company_id: z.string().uuid().nullable().optional(), // Made nullable and optional for new signup flow
  job_role: z.string().default("HR Manager"),
  avatar_url: z.string().url("Please enter a valid avatar URL").nullable().optional().or(z.literal("")),
});

// Update employer schema (for employer updates)
export const UpdateEmployerSchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(100, "Name is too long").optional(),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  avatar_url: z.string().url("Please enter a valid avatar URL").optional().or(z.literal("")),
  job_role: z.string().optional(),
  is_active: z.boolean().optional(),
});

// Signup form schema (for the signup flow)
export const EmployerSignupSchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  email: z.string()
    .email("Please enter a valid email address")
    .refine((email: string) => {
      // Block common consumer email domains
      const consumerDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
        'aol.com', 'icloud.com', 'live.com', 'msn.com'
      ];
      const domain = email.split('@')[1]?.toLowerCase();
      return !consumerDomains.includes(domain);
    }, "Please use your company email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company_id: z.string().uuid().optional(), // Optional for new company creation
  job_role: z.string().min(1, "Job title is required").default("HR Manager"),
  terms_agreed: z.boolean().refine((val: boolean) => val === true, "You must agree to the terms and conditions"),
});

// Login form schema
export const EmployerLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// OTP verification schema
export const OTPVerificationSchema = z.object({
  email: z.string().email(),
  otp_code: z.string().length(6, "OTP must be 6 digits"),
});

// Profile update schema
export const EmployerProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  avatar_url: z.string().url("Please enter a valid avatar URL").optional().or(z.literal("")),
});

// Employer with company data (for joined queries)
export const EmployerWithCompanySchema = EmployerSchema.extend({
  company: z.object({
    id: z.string().uuid(),
    name: z.string(),
    domain: z.string().nullable(),
    industry: z.string().nullable(),
    employee_count: z.string().nullable(),
    logo_url: z.string().nullable(),
    country: z.string().nullable(),
  }).nullable(),
});

// Type exports
export type Employer = z.infer<typeof EmployerSchema>;
export type CreateEmployer = z.infer<typeof CreateEmployerSchema>;
export type UpdateEmployer = z.infer<typeof UpdateEmployerSchema>;
export type EmployerSignup = z.infer<typeof EmployerSignupSchema>;
export type EmployerLogin = z.infer<typeof EmployerLoginSchema>;
export type OTPVerification = z.infer<typeof OTPVerificationSchema>;
export type EmployerProfile = z.infer<typeof EmployerProfileSchema>;
export type EmployerWithCompany = z.infer<typeof EmployerWithCompanySchema>;

// Common job titles for suggestions
export const COMMON_JOB_TITLES = [
  "HR Manager",
  "Recruiter", 
  "Senior Recruiter",
  "Talent Acquisition Manager",
  "Head of HR",
  "CEO",
  "Founder",
  "HR Director",
  "People Operations Manager",
  "Talent Partner",
  "HR Business Partner",
  "Chief People Officer",
] as const;
