import { z } from "zod";

// Database constraint values from Supabase MCP
export const WORK_TYPE_OPTIONS = ["remote", "hybrid", "onsite", "all"] as const;

export const EMPLOYMENT_TYPE_OPTIONS = [
  "part-time",
  "full-time",
  "contract",
  "internship",
  "freelance",
  "temporary",
] as const;

export const SENIORITY_LEVEL_OPTIONS = [
  "entry_level",
  "fresher",
  "junior",
  "senior",
  "manager",
] as const;

export const STATUS_OPTIONS = [
  "draft",
  "published",
  "paused",
  "closed",
] as const;

export const COMPENSATION_OPTIONS = [
  "Medical Insurance",
  "Provident Fund",
  "Food Allowance",
  "House Allowance",
  "Transport Allowance",
  "Performance Bonus",
  "Gym Membership",
  "Learning Stipend",
  "Flexible Hours",
  "Work From Home",
  "Stock Options",
] as const;



export const SALARY_CURRENCY_OPTIONS = ["USD", "INR"] as const;
export const SALARY_PERIOD_OPTIONS = [
  "per hour",
  "per month",
  "per annum",
] as const;

// Zod enums
export const WorkTypeEnum = z.enum(WORK_TYPE_OPTIONS);
export const EmploymentTypeEnum = z.enum(EMPLOYMENT_TYPE_OPTIONS);
export const SeniorityLevelEnum = z.enum(SENIORITY_LEVEL_OPTIONS);
export const StatusEnum = z.enum(STATUS_OPTIONS);
export const CompensationEnum = z.enum(COMPENSATION_OPTIONS);
export const SalaryCurrencyEnum = z.enum(SALARY_CURRENCY_OPTIONS);
export const SalaryPeriodEnum = z.enum(SALARY_PERIOD_OPTIONS);

// Location details schema
export const LocationDetailsSchema = z.object({
  location_country: z.string().optional(),
  location_state: z.string().optional(),
  location_city: z.string().optional(),
  location_pin_code: z.string().optional(),
});

// Salary details schema
export const SalaryDetailsSchema = z
  .object({
    salary_currency: SalaryCurrencyEnum.optional(),
    salary_from: z.number().positive().optional(),
    salary_to: z.number().positive().optional(),
    salary_period: SalaryPeriodEnum.optional(),
  })
  .refine(
    (data) => {
      if (data.salary_from && data.salary_to) {
        return data.salary_from <= data.salary_to;
      }
      return true;
    },
    {
      message: "Minimum salary must be less than or equal to maximum salary",
    }
  );

// Experience details schema
export const ExperienceDetailsSchema = z
  .object({
    experience_min: z.number().min(0, "Minimum experience cannot be negative"),
    experience_max: z.number().min(0, "Maximum experience cannot be negative"),
  })
  .refine((data) => data.experience_min <= data.experience_max, {
    message:
      "Minimum experience must be less than or equal to maximum experience",
  });

// Resume score weightage details schema
export const ResumeScoreWeightageDetailsSchema = z.object({
  resume_section: z.string().min(1, "Resume section is required"),
  resume_criteria: z.string().min(1, "Resume criteria is required"),
  resume_weightage: z
    .number()
    .min(1)
    .max(100, "Weightage must be between 1-100"),
  reason: z.string().min(1, "Reason is required"),
});

// Main job schema for database operations
export const JobSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  role_name: z
    .string()
    .min(3, "Role name must be at least 3 characters")
    .max(100, "Role name must be less than 100 characters"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000, "Description must be less than 5000 characters"),
  skills_required: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required"),
  work_type: z.array(WorkTypeEnum).min(1, "At least one work type is required"),
  employment_type: z
    .array(EmploymentTypeEnum)
    .min(1, "At least one employment type is required"),
  seniority_level: z
    .array(SeniorityLevelEnum)
    .min(1, "At least one seniority level is required"),
  location_details: LocationDetailsSchema.optional(),
  salary_details: SalaryDetailsSchema.optional().default({
    salary_currency: 'INR' as 'USD' | 'INR',
    salary_from: undefined,
    salary_to: undefined,
    salary_period: undefined
  }),
  experience_details: ExperienceDetailsSchema.optional().default({
    experience_min: 0,
    experience_max: 0,
  }),
  compensation: z.array(z.string()).optional(),
  resume_threshold: z
    .number()
    .min(50, "Resume threshold must be at least 50%")
    .max(100, "Resume threshold cannot exceed 100%"),
  resume_score_weightage_details: z
    .array(
      z.object({
        resume_section: z.string().min(1, "Resume section is required"),
        resume_criteria: z
          .string()
          .min(10, "Criteria must be at least 10 characters")
          .max(500, "Criteria must be less than 500 characters"),
        resume_weightage: z
          .number()
          .min(1, "Weightage must be at least 1%")
          .max(100, "Weightage cannot exceed 100%"),
        reason: z.string().optional(),
      })
    )
    .min(1, "At least one scoring criterion is required")
    .refine(
      (details) => {
        const total = details.reduce(
          (sum, item) => sum + (item.resume_weightage || 0),
          0
        );
        return total === 100;
      },
      {
        message: "Resume scoring weightage must sum to exactly 100%",
      }
    ),
  status: StatusEnum.default("draft"),
  original_job_description_text: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Create job schema for new job creation
export const CreateJobSchema = JobSchema.omit({
  id: true,
  company_id: true,
  created_at: true,
  updated_at: true,
});

// Update job schema for job updates
export const UpdateJobSchema = CreateJobSchema.partial();

// Job form schema for frontend forms
export const JobFormSchema = z.object({
  role_name: z.string().min(1, "Role name is required").max(100).optional(),
  title: z.string().min(1, "Job title is required").max(200),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(5000),
  skills_required: z.array(z.string()).min(1, "At least one skill is required"),
  work_type: z.array(WorkTypeEnum).min(1, "At least one work type is required"),
  employment_type: z
    .array(EmploymentTypeEnum)
    .min(1, "At least one employment type is required"),
  seniority_level: z.array(SeniorityLevelEnum).optional().default([]),
  location_details: LocationDetailsSchema.optional().default({}),
  salary_details: SalaryDetailsSchema.optional().default({}),
  experience_details: ExperienceDetailsSchema.optional().default({
    experience_min: 0,
    experience_max: 0,
  }),
  compensation: z.array(CompensationEnum).optional().default([]),
  resume_threshold: z.number().min(0).max(100).default(60),
  resume_score_weightage_details: z
    .array(ResumeScoreWeightageDetailsSchema)
    .optional()
    .default([]),
});

// Type exports
export type Job = z.infer<typeof JobSchema>;
export type CreateJob = z.infer<typeof CreateJobSchema>;
export type UpdateJob = z.infer<typeof UpdateJobSchema>;
export type JobForm = z.infer<typeof JobFormSchema>;
export type LocationDetails = z.infer<typeof LocationDetailsSchema>;
export type SalaryDetails = z.infer<typeof SalaryDetailsSchema>;
export type ExperienceDetails = z.infer<typeof ExperienceDetailsSchema>;
export type ResumeScoreWeightageDetails = z.infer<
  typeof ResumeScoreWeightageDetailsSchema
>;
export type WorkType = z.infer<typeof WorkTypeEnum>;
export type EmploymentType = z.infer<typeof EmploymentTypeEnum>;
export type SeniorityLevel = z.infer<typeof SeniorityLevelEnum>;
export type JobStatus = z.infer<typeof StatusEnum>;
export type Compensation = z.infer<typeof CompensationEnum>;

// Options for form dropdowns
export const WORK_TYPE_FORM_OPTIONS = WORK_TYPE_OPTIONS.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).replace("_", " "),
}));

export const EMPLOYMENT_TYPE_FORM_OPTIONS = EMPLOYMENT_TYPE_OPTIONS.map(
  (value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace("-", " "),
  })
);

export const SENIORITY_LEVEL_FORM_OPTIONS = SENIORITY_LEVEL_OPTIONS.map(
  (value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1).replace("_", " "),
  })
);

export const COMPENSATION_FORM_OPTIONS = COMPENSATION_OPTIONS.map((value) => ({
  value,
  label: value,
}));

export const SALARY_CURRENCY_FORM_OPTIONS = SALARY_CURRENCY_OPTIONS.map(
  (value) => ({
    value,
    label: value,
  })
);

export const SALARY_PERIOD_FORM_OPTIONS = SALARY_PERIOD_OPTIONS.map(
  (value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  })
);
