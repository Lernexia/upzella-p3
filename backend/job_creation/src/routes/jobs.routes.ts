import { Router } from 'express';
import { jobsController } from '../controllers/jobs.controller';
import { authenticateUser } from '../middleware/auth';

export const jobRoutes = Router();

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
 *               - title
 *               - description
 *               - skills_required
 *               - work_type
 *               - employment_type
 *               - experience_min
 *               - experience_max
 *               - resume_threshold
 *               - resume_scoring
 *             properties:
 *               title:
 *                 type: string
 *                 example: Backend Developer
 *               description:
 *                 type: string
 *                 example: We are looking for a skilled backend developer...
 *               skills_required:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "PostgreSQL"]
 *               work_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Full-time", "Remote"]
 *               employment_type:
 *                 type: string
 *                 example: Permanent
 *               experience_min:
 *                 type: integer
 *                 example: 2
 *               experience_max:
 *                 type: integer
 *                 example: 5
 *               resume_threshold:
 *                 type: integer
 *                 example: 60
 *               resume_scoring:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     section_name:
 *                       type: string
 *                       example: Education
 *                     criteria_description:
 *                       type: string
 *                       example: Bachelor's degree in Computer Science
 *                     weightage:
 *                       type: integer
 *                       example: 20
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 */
jobRoutes.post('/', authenticateUser, jobsController.createJob);

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
jobRoutes.post('/ai-extract', authenticateUser, jobsController.aiExtractJob);

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
jobRoutes.get('/:id', authenticateUser, jobsController.getJob);

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
jobRoutes.put('/:id', authenticateUser, jobsController.updateJob);

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
jobRoutes.delete('/:id', authenticateUser, jobsController.deleteJob);
