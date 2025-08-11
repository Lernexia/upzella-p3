import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { jobsController } from '../controllers/jobs.controller';
import { authenticateUser } from '../middleware/auth';

export const jobRoutes = Router();

// Stricter rate limiting for AI extraction (more resource intensive)
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 AI extraction requests per 15 minutes
  message: {
    error: 'Too many AI extraction requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Moderate rate limiting for job creation/updates


/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management and AI-powered extraction
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - job_name
 *               - role_name
 *               - title
 *               - description
 *               - skills_required
 *               - work_type
 *               - employment_type
 *               - seniority_level
 *               - experience_min
 *               - experience_max
 *               - resume_scoring
 *             properties:
 *               company_id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               job_name:
 *                 type: string
 *                 example: "Software Engineer Position"
 *               role_name:
 *                 type: string
 *                 example: "Senior Full Stack Developer"
 *               title:
 *                 type: string
 *                 example: "Senior Full Stack Developer - React & Node.js"
 *               description:
 *                 type: string
 *                 example: "We are looking for a skilled full stack developer..."
 *               skills_required:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js", "TypeScript", "PostgreSQL"]
 *               work_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Full-time", "Part-time", "Remote", "Hybrid", "On-site"]
 *                 example: ["Full-time", "Remote"]
 *               employment_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Permanent", "Contract", "Internship", "Freelance"]
 *                 example: ["Permanent"]
 *               seniority_level:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Entry Level", "Fresher", "Junior", "Senior", "Manager", "Director", "Executive"]
 *                 example: ["Senior"]
 *               experience_min:
 *                 type: integer
 *                 example: 3
 *               experience_max:
 *                 type: integer
 *                 example: 7
 *               salary_currency:
 *                 type: string
 *                 enum: ["INR", "USD"]
 *                 default: "INR"
 *                 example: "INR"
 *               salary_from:
 *                 type: number
 *                 example: 800000
 *               salary_to:
 *                 type: number
 *                 example: 1200000
 *               salary_period:
 *                 type: string
 *                 enum: ["per annum", "per month", "per hour"]
 *                 example: "per annum"
 *               location_details:
 *                 type: string
 *                 example: "Bangalore, India (Remote available)"
 *               compensation:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: ["Medical Insurance", "Provident Fund", "Food Allowance", "House Allowance", "Transport Allowance", "Performance Bonus"]
 *                 example: ["Medical Insurance", "Provident Fund"]
 *               custom_compensation:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Gym Membership", "Learning Stipend"]
 *               resume_threshold:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 65
 *               resume_scoring:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     section_name:
 *                       type: string
 *                       enum: ["Education", "Experience", "Projects", "Certifications", "Skills", "Achievements"]
 *                       example: "Education"
 *                     criteria_description:
 *                       type: string
 *                       example: "Bachelor's degree in Computer Science or related field"
 *                     weightage:
 *                       type: integer
 *                       minimum: 1
 *                       maximum: 100
 *                       example: 20
 *               original_job_description_text:
 *                 type: string
 *                 example: "Original AI-extracted or uploaded job description text"
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 */
jobRoutes.post('/', rateLimiter, authenticateUser, jobsController.createJob);

/**
 * @swagger
 * /api/jobs/ai-extract:
 *   post:
 *     summary: Extract job details from job description text using AI
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - job_description_text
 *             properties:
 *               job_description_text:
 *                 type: string
 *                 example: We are seeking a Backend Developer to join our team...
 *     responses:
 *       200:
 *         description: Structured job details extracted
 *       400:
 *         description: Invalid text or extraction failed
 */
jobRoutes.post('/ai-extract', rateLimiter, authenticateUser, jobsController.aiExtractJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs for the authenticated user's company
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of jobs per page
 *     responses:
 *       200:
 *         description: List of jobs
 */
jobRoutes.get('/', authenticateUser, jobsController.getJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a specific job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
jobRoutes.get('/:id',rateLimiter,  authenticateUser, jobsController.getJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */
jobRoutes.put('/:id', rateLimiter, authenticateUser, jobsController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
jobRoutes.delete('/:id', rateLimiter, authenticateUser, jobsController.deleteJob);
