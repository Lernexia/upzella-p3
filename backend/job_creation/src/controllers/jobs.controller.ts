import { Request, Response } from "express";
import { jobsService } from "../services/jobs.service";
import { aiService } from "../services/ai.service";
import { supabase } from "../db";
import { createJobSchema } from "../validators/jobValidation";
import { asyncHandler, createError } from "../middleware/errorHandler";
import { logger } from "../utils/logger";

export class JobsController {
  // POST /api/jobs - Create a new job
  createJob = asyncHandler(async (req: Request, res: Response) => {
    const jobData = req.body;
    const isPublishing = jobData.status === "published";

    // For published jobs, apply stricter validation
    if (isPublishing) {
      // Validate required fields for published jobs
      if (!jobData.skills_required || jobData.skills_required.length === 0) {
        throw createError("Skills are required for published jobs", 400);
      }
      if (!jobData.work_type || jobData.work_type.length === 0) {
        throw createError("Work type is required for published jobs", 400);
      }
      if (!jobData.employment_type || jobData.employment_type.length === 0) {
        throw createError(
          "Employment type is required for published jobs",
          400
        );
      }
      if (!jobData.seniority_level || jobData.seniority_level.length === 0) {
        throw createError(
          "Seniority level is required for published jobs",
          400
        );
      }
      if (!jobData.experience_details) {
        throw createError(
          "Experience details are required for published jobs",
          400
        );
      }
      if (
        !jobData.resume_score_weightage_details ||
        jobData.resume_score_weightage_details.length === 0
      ) {
        throw createError("Resume scoring is required for published jobs", 400);
      }

      // Validate description length for published jobs
      if (!jobData.description || jobData.description.length < 50) {
        throw createError(
          "Description must be at least 50 characters for published jobs",
          400
        );
      }

      // Validate resume scoring weightage sums to 100% for published jobs
      if (jobData.resume_score_weightage_details) {
        const totalWeight = jobData.resume_score_weightage_details.reduce(
          (sum: number, item: any) => sum + (item.resume_weightage || 0),
          0
        );
        if (totalWeight !== 100) {
          throw createError(
            "Resume scoring weightage must sum to exactly 100% for published jobs",
            400
          );
        }
      }
    }

    // Validate request body with basic schema (allows drafts with minimal data)
    const { error, value } = createJobSchema.validate(jobData);
    if (error) {
      throw createError(error.details[0].message, 400);
    }

    // Validate company access (assuming user authentication middleware sets req.user)
    const userId = (req as any).user?.id;
    if (!userId) {
      throw createError("Authentication required", 401);
    }

    const hasAccess = await jobsService.validateCompanyAccess(
      value.company_id,
      userId
    );
    if (!hasAccess) {
      throw createError("Access denied to this company", 403);
    }

    // Create the job
    const result = await jobsService.createJob(value);

    logger.info('Job created via API', {
      job_id: result.job_id,
      user_id: userId,
      status: value.status || 'draft'
    });

    res.status(201).json({
      status: 'success',
      message: isPublishing ? 'Job published successfully' : 'Job saved as draft successfully',
      data: result
    });
  });

  // POST /api/jobs/ai-extract - Extract job details from job description text
  aiExtractJob = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body
    const { job_description_text } = req.body;

    if (!job_description_text || typeof job_description_text !== "string") {
      throw createError("Job description text is required", 400);
    }

    if (job_description_text.length < 50) {
      throw createError(
        "Job description text must be at least 50 characters long",
        400
      );
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      throw createError("Authentication required", 401);
    }

    try {
      // Use AI to extract structured job details from the provided text
      const jobDetails = await aiService.extractJobDetailsFromText(
        job_description_text
      );

      logger.info("AI job extraction completed", {
        user_id: userId,
        text_length: job_description_text.length,
      });

      res.status(200).json({
        status: "success",
        message: "Job details extracted successfully",
        data: jobDetails,
      });
    } catch (error: any) {
      logger.error("AI extraction failed", {
        error: error.message,
        user_id: userId,
      });

      if (error.message.includes("AI service")) {
        throw createError(
          "AI service temporarily unavailable. Please try again later.",
          503
        );
      }

      throw createError("Failed to extract job details from text", 500);
    }
  });

  // GET /api/jobs/:id - Get a specific job
  getJob = asyncHandler(async (req: Request, res: Response) => {
    const jobId = req.params.id;
    const userId = (req as any).user?.id;

    if (!userId) {
      throw createError("Authentication required", 401);
    }

    // Get user's company ID
    const { data: employer, error } = await supabase
      .from("employers")
      .select("company_id")
      .eq("id", userId)
      .single();

    if (error) {
      throw createError("Failed to fetch user information", 500);
    }

    const job = await jobsService.getJobById(jobId, employer.company_id);
    if (!job) {
      throw createError("Job not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: job,
    });
  });

  // GET /api/jobs - Get jobs for company with pagination
  getJobs = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (!userId) {
      throw createError("Authentication required", 401);
    }

    // Get pagination parameters
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    // Get user's company ID
    const { data: employer, error } = await supabase
      .from("employers")
      .select("company_id")
      .eq("id", userId)
      .single();

    if (error) {
      throw createError("Failed to fetch user information", 500);
    }

    const result = await jobsService.getJobsByCompany(
      employer.company_id,
      limit,
      offset
    );

    res.status(200).json({
      status: "success",
      data: {
        jobs: result.jobs,
        pagination: {
          total: result.total,
          limit,
          offset,
          has_more: offset + limit < result.total,
        },
      },
    });
  });

  // PUT /api/jobs/:id - Update a job
  updateJob = asyncHandler(async (req: Request, res: Response) => {
    const jobId = req.params.id;
    const userId = (req as any).user?.id;
    const updateData = req.body;
    const isPublishing = updateData.status === "published";

    if (!userId) {
      throw createError("Authentication required", 401);
    }

    // Get user's company ID
    const { data: employer, error } = await supabase
      .from("employers")
      .select("company_id")
      .eq("id", userId)
      .single();

    if (error) {
      throw createError("Failed to fetch user information", 500);
    }

    // For published jobs, apply stricter validation
    if (isPublishing) {
      // Validate required fields for published jobs
      if (
        !updateData.skills_required ||
        updateData.skills_required.length === 0
      ) {
        throw createError("Skills are required for published jobs", 400);
      }
      if (!updateData.work_type || updateData.work_type.length === 0) {
        throw createError("Work type is required for published jobs", 400);
      }
      if (
        !updateData.employment_type ||
        updateData.employment_type.length === 0
      ) {
        throw createError(
          "Employment type is required for published jobs",
          400
        );
      }
      if (
        !updateData.seniority_level ||
        updateData.seniority_level.length === 0
      ) {
        throw createError(
          "Seniority level is required for published jobs",
          400
        );
      }
      if (!updateData.experience_details) {
        throw createError(
          "Experience details are required for published jobs",
          400
        );
      }
      if (
        !updateData.resume_score_weightage_details ||
        updateData.resume_score_weightage_details.length === 0
      ) {
        throw createError("Resume scoring is required for published jobs", 400);
      }

      // Validate description length for published jobs
      if (!updateData.description || updateData.description.length < 50) {
        throw createError(
          "Description must be at least 50 characters for published jobs",
          400
        );
      }

      // Validate resume scoring weightage sums to 100% for published jobs
      if (updateData.resume_score_weightage_details) {
        const totalWeight = updateData.resume_score_weightage_details.reduce(
          (sum: number, item: any) => sum + (item.resume_weightage || 0),
          0
        );
        if (totalWeight !== 100) {
          throw createError(
            "Resume scoring weightage must sum to exactly 100% for published jobs",
            400
          );
        }
      }
    }

    // Update the job
    const updatedJob = await jobsService.updateJob(
      jobId,
      employer.company_id,
      updateData
    );

    res.status(200).json({
      status: "success",
      message: isPublishing
        ? "Job published successfully"
        : "Job updated successfully",
      data: updatedJob,
    });
  });

  // DELETE /api/jobs/:id - Delete a job
  deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const jobId = req.params.id;
    const userId = (req as any).user?.id;

    if (!userId) {
      throw createError("Authentication required", 401);
    }

    // Get user's company ID
    const { data: employer, error } = await supabase
      .from("employers")
      .select("company_id")
      .eq("id", userId)
      .single();

    if (error) {
      throw createError("Failed to fetch user information", 500);
    }

    await jobsService.deleteJob(jobId, employer.company_id);

    res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
    });
  });
}

export const jobsController = new JobsController();
