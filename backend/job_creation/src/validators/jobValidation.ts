import Joi from 'joi';

// Location details schema
const locationDetailsSchema = Joi.object({
  location_country: Joi.string().optional().allow(''),
  location_state: Joi.string().optional().allow(''),
  location_city: Joi.string().optional().allow(''),
  location_pin_code: Joi.string().optional().allow('')
}).optional();

// Salary details schema
const salaryDetailsSchema = Joi.object({
  salary_currency: Joi.string().valid('USD', 'INR').default('INR'),
  salary_from: Joi.number().positive().optional(),
  salary_to: Joi.number().positive().optional(),
  salary_period: Joi.string().valid('per hour', 'per month', 'per annum').optional()
}).custom((value, helpers) => {
  if (value.salary_from && value.salary_to && value.salary_from > value.salary_to) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'Salary range validation').optional();

// Experience details schema
const experienceDetailsSchema = Joi.object({
  experience_min: Joi.number().integer().min(0).required(),
  experience_max: Joi.number().integer().min(0).required()
}).custom((value, helpers) => {
  if (value.experience_min > value.experience_max) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'Experience range validation').required();

// Resume score weightage details schema
const resumeScoreWeightageSchema = Joi.array().items(
  Joi.object({
    resume_section: Joi.string().valid(
      'Education',
      'Experience', 
      'Projects',
      'Certifications',
      'Skills',
      'Achievements'
    ).required(),
    resume_criteria: Joi.string().min(10).max(500).required(),
    resume_weightage: Joi.number().integer().min(1).max(100).required(),
    reason: Joi.string().min(20).max(300).required()
  })
).custom((value, helpers) => {
  // Check if weightage sums to 100
  const totalWeightage = value.reduce((sum: number, item: any) => sum + item.resume_weightage, 0);
  if (totalWeightage !== 100) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'Resume weightage sum validation').required();

// Work type validation
const workTypeSchema = Joi.array().items(
  Joi.string().valid('remote', 'hybrid', 'onsite', 'all')
).min(1).required();

// Employment type validation  
const employmentTypeSchema = Joi.array().items(
  Joi.string().valid('part-time', 'full-time', 'contract', 'internship', 'freelance', 'temporary')
).min(1).required();

// Seniority level validation
const seniorityLevelSchema = Joi.array().items(
  Joi.string().valid('entry-level', 'fresher', 'junior', 'senior', 'manager', 'director', 'executive')
).min(1).required();

// Compensation validation
const compensationSchema = Joi.array().items(
  Joi.string().valid(
    'Medical Insurance',
    'Provident Fund', 
    'Food Allowance',
    'House Allowance',
    'Transport Allowance',
    'Performance Bonus',
    'Gym Membership',
    'Learning Stipend',
    'Flexible Hours',
    'Work From Home',
    'Stock Options'
  )
).optional();

export const createJobSchema = Joi.object({
  company_id: Joi.string().uuid().required(),
  role_name: Joi.string().min(3).max(100).required(), 
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(50).max(5000).required(),
  skills_required: Joi.array().items(Joi.string().min(2).max(50)).min(1).max(20).required(),
  work_type: workTypeSchema,
  employment_type: employmentTypeSchema,
  seniority_level: seniorityLevelSchema,
  location_details: locationDetailsSchema,
  salary_details: salaryDetailsSchema,
  experience_details: experienceDetailsSchema,
  compensation: compensationSchema,
  resume_threshold: Joi.number().integer().min(0).max(100).default(65),
  resume_score_weightage_details: resumeScoreWeightageSchema,
  status: Joi.string().valid('draft', 'published', 'paused', 'closed').default('draft'),
  original_job_description_text: Joi.string().max(10000).optional()
});

export const updateJobSchema = Joi.object({
  role_name: Joi.string().min(3).max(100).optional(),
  title: Joi.string().min(5).max(200).optional(),
  description: Joi.string().min(50).max(5000).optional(),
  skills_required: Joi.array().items(Joi.string().min(2).max(50)).min(1).max(20).optional(),
  work_type: workTypeSchema.optional(),
  employment_type: employmentTypeSchema.optional(),
  seniority_level: seniorityLevelSchema.optional(),
  location_details: locationDetailsSchema,
  salary_details: salaryDetailsSchema,
  experience_details: experienceDetailsSchema.optional(),
  compensation: compensationSchema,
  resume_threshold: Joi.number().integer().min(0).max(100).optional(),
  resume_score_weightage_details: resumeScoreWeightageSchema.optional(),
  status: Joi.string().valid('draft', 'published', 'paused', 'closed').optional(),
  original_job_description_text: Joi.string().max(10000).optional()
});

// Text extraction validation schema
export const textExtractionSchema = Joi.object({
  job_description_text: Joi.string().min(50).max(10000).required()
});
