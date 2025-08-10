import Joi from 'joi';

// Job creation validation schema
export const createJobSchema = Joi.object({
  company_id: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(50).max(5000).required(),
  skills_required: Joi.array().items(Joi.string().min(1).max(100)).min(1).max(50).required(),
  work_type: Joi.array().items(
    Joi.string().valid('Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site')
  ).min(1).max(5).required(),
  employment_type: Joi.string().valid('Permanent', 'Contract', 'Internship', 'Freelance').required(),
  experience_min: Joi.number().integer().min(0).max(50).required(),
  experience_max: Joi.number().integer().min(0).max(50).required().greater(Joi.ref('experience_min')),
  resume_threshold: Joi.number().integer().min(1).max(100).default(60),
  original_job_description_text: Joi.string().min(50).max(10000).optional(), // Optional field for AI-extracted text
  resume_scoring: Joi.array().items(
    Joi.object({
      section_name: Joi.string().valid('Education', 'Experience', 'Projects', 'Certifications', 'Skills', 'Achievements').required(),
      criteria_description: Joi.string().min(5).max(500).optional(),
      weightage: Joi.number().integer().min(1).max(100).required()
    })
  ).min(1).max(10).required().custom((value, helpers) => {
    // Validate that weightage sum equals 100
    const totalWeightage = value.reduce((sum: number, item: any) => sum + item.weightage, 0);
    if (totalWeightage !== 100) {
      return helpers.error('any.custom', { message: 'Resume scoring weightage must sum to 100%' });
    }
    return value;
  })
});

// Text extraction validation schema
export const textExtractionSchema = Joi.object({
  job_description_text: Joi.string().min(50).max(10000).required()
});

// AI extraction response schema (for validation)
export const aiExtractionResponseSchema = Joi.object({
  job_title: Joi.string().min(3).max(200),
  job_description: Joi.string().min(50).max(5000),
  skills_required: Joi.array().items(Joi.string().min(1).max(100)).max(50),
  work_type: Joi.array().items(
    Joi.string().valid('Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site')
  ).max(5),
  employment_type: Joi.string().valid('Permanent', 'Contract', 'Internship', 'Freelance'),
  experience_range: Joi.object({
    min: Joi.number().integer().min(0).max(50),
    max: Joi.number().integer().min(0).max(50)
  }),
  resume_threshold: Joi.number().integer().min(1).max(100),
  resume_scoring: Joi.array().items(
    Joi.object({
      section: Joi.string().valid('Education', 'Experience', 'Projects', 'Certifications', 'Skills', 'Achievements'),
      criteria: Joi.string().min(5).max(500),
      weightage: Joi.number().integer().min(1).max(100)
    })
  ).max(10)
});
