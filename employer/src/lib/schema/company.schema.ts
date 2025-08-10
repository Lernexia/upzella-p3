import { z } from "zod";

// Company employee count enum
export const CompanyEmployeeCountEnum = z.enum([
  "1-10",
  "11-50", 
  "51-200",
  "201-500",
  "501-1000",
  "1000+"
]);

// Company type enum
export const CompanyTypeEnum = z.enum([
  "startup",
  "small",
  "mid-market", 
  "enterprise"
]);

// Base company schema for database operations
export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Company name is required"),
  domain: z.string().nullable(),
  website_url: z.string().url().nullable(),
  linkedin_url: z.string().url().nullable(),
  x_url: z.string().url().nullable(),
  instagram_url: z.string().url().nullable(),
  phone: z.string().nullable(),
  logo_url: z.string().url().nullable(),
  employee_count: CompanyEmployeeCountEnum.nullable(),
  company_type: CompanyTypeEnum.nullable(),
  industry: z.string().nullable(),
  country: z.string().min(1, "Country is required"),
  state: z.string().nullable(),
  address: z.string().nullable(),
  pincode: z.string().nullable(),
  timezone: z.string().default("UTC"),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Create company schema (for new company creation)
export const CreateCompanySchema = z.object({
  name: z.string().min(1, "Company name is required").max(100, "Company name is too long"),
  domain: z.string(),
  website_url: z.string().url("Please enter a valid website URL").or(z.literal("")),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL").or(z.literal("")),
  x_url: z.string().url("Please enter a valid X (Twitter) URL").optional().or(z.literal("")),
  instagram_url: z.string().url("Please enter a valid Instagram URL").optional().or(z.literal("")),
  phone: z.string().optional(),
  logo_url: z.string().url("Please enter a valid logo URL").or(z.literal("")),
  employee_count: CompanyEmployeeCountEnum.optional(),
  company_type: CompanyTypeEnum.optional(),
  industry: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().optional(),
  timezone: z.string().default("UTC"),
});

// Update company schema (for company updates)
export const UpdateCompanySchema = CreateCompanySchema.partial();

// Company search/select schema (for dropdown)
export const CompanySelectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  domain: z.string().nullable(),
  industry: z.string().nullable(),
  employee_count: CompanyEmployeeCountEnum.nullable(),
  logo_url: z.string().url().nullable(),
});

// Form schema for company creation in signup flow
export const CompanyFormSchema = z.object({
  name: z.string().min(1, "Company name is required").max(100, "Company name is too long"),
  website_url: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  industry: z.string().min(1, "Industry is required"),
  employee_count: CompanyEmployeeCountEnum,
  company_type: CompanyTypeEnum,
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().optional(),
});

// Type exports
export type Company = z.infer<typeof CompanySchema>;
export type CreateCompany = z.infer<typeof CreateCompanySchema>;
export type UpdateCompany = z.infer<typeof UpdateCompanySchema>;
export type CompanySelect = z.infer<typeof CompanySelectSchema>;
export type CompanyForm = z.infer<typeof CompanyFormSchema>;
export type CompanyEmployeeCount = z.infer<typeof CompanyEmployeeCountEnum>;
export type CompanyType = z.infer<typeof CompanyTypeEnum>;

// Company options for forms
export const EMPLOYEE_COUNT_OPTIONS = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
] as const;

export const COMPANY_TYPE_OPTIONS = [
  { value: "startup", label: "Startup" },
  { value: "small", label: "Small Business" },
  { value: "mid-market", label: "Mid-Market" },
  { value: "enterprise", label: "Enterprise" },
] as const;

// Common industries list
export const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Media & Entertainment",
  "Transportation",
  "Energy",
  "Consulting",
  "Non-Profit",
  "Government",
  "Agriculture",
  "Food & Beverage",
  "Automotive",
  "Construction",
  "Telecommunications",
  "Pharmaceuticals",
  "Other"
] as const;

// Countries list (you can expand this)
export const COUNTRY_OPTIONS = [
  "United States",
  "Canada", 
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "India",
  "Singapore",
  "Japan",
  "Other"
] as const;
