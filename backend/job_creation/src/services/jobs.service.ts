import { supabase, Database } from "../db";
import { logger } from "../utils/logger";
import { createError } from "../middleware/errorHandler";

type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
type JobRow = Database["public"]["Tables"]["jobs"]["Row"];

export interface CreateJobRequest extends JobInsert {
  company_id: string;
  role_name: string;
  title: string;
  description: string;
  skills_required: string[];
  work_type: string[];
  employment_type: string[];
  seniority_level: string[];
  location_details?: {
    location_country?: string;
    location_state?: string;
    location_city?: string;
    location_pin_code?: string;
  };
  salary_details?: {
    salary_currency: "USD" | "INR";
    salary_from?: number;
    salary_to?: number;
    salary_period?: "per hour" | "per month" | "per annum";
  };
  experience_details: {
    experience_min: number;
    experience_max: number;
  };
  compensation?: string[];
  resume_threshold?: number;
  resume_score_weightage_details: {
    resume_section: string;
    resume_criteria: string;
    resume_weightage: number;
    reason: string;
  }[];
  original_job_description_text?: string;
}

export class JobsService {
  async createJob(jobData: CreateJobRequest): Promise<{ job_id: string }> {
    try {
      logger.info("Creating new job", {
        title: jobData.title,
        company_id: jobData.company_id,
      });

      // Prepare compensation data - filter out empty strings
      const compensation = (jobData.compensation || []).filter(
        (comp) => comp && comp.trim() !== ""
      );

      // Prepare the job insert data with new JSON structure
      const jobInsert: JobInsert = {
        company_id: jobData.company_id,
        role_name: jobData.role_name,
        title: jobData.title,
        description: jobData.description,
        skills_required: jobData.skills_required,
        work_type: jobData.work_type,
        employment_type: jobData.employment_type,
        seniority_level: jobData.seniority_level,
        location_details: jobData.location_details,
        salary_details: jobData.salary_details,
        experience_details: jobData.experience_details,
        compensation: compensation.length > 0 ? compensation : undefined,
        resume_threshold: jobData.resume_threshold || 65,
        resume_score_weightage_details: jobData.resume_score_weightage_details,
        original_job_description_text: jobData.original_job_description_text,
        status: jobData?.status || "draft",
      };

      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .insert(jobInsert)
        .select("id")
        .single();

      if (jobError) {
        logger.error("Job creation failed", jobError);
        throw createError(`Failed to create job: ${jobError.message}`, 400);
      }

      logger.info("Job created successfully", { job_id: job.id });

      // Save original job description text to Supabase Storage if provided
      // if (jobData.original_job_description_text) {
      //   try {
      //     await this.saveJobDescriptionToStorage(
      //       job.id,
      //       jobData.company_id,
      //       jobData.original_job_description_text
      //     );
      //   } catch (storageError) {
      //     logger.warn("Failed to save original job description to storage", {
      //       job_id: job.id,
      //       error: storageError,
      //     });
      //     // Don't fail the job creation if storage fails
      //   }
      // }

      return { job_id: job.id };
    } catch (error) {
      logger.error("Job creation service error", error);
      throw error;
    }
  }

  async getJobById(jobId: string, companyId?: string): Promise<JobRow | null> {
    try {
      let query = supabase.from("jobs").select("*").eq("id", jobId);

      if (companyId) {
        query = query.eq("company_id", companyId);
      }

      const { data: job, error } = await query.single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // Job not found
        }
        logger.error("Failed to fetch job", error);
        throw createError(`Failed to fetch job: ${error.message}`, 500);
      }

      return job;
    } catch (error) {
      logger.error("Get job service error", error);
      throw error;
    }
  }

  async getJobsByCompany(
    companyId: string,
    limit = 50,
    offset = 0
  ): Promise<{
    jobs: JobRow[];
    total: number;
  }> {
    try {
      // Get total count
      const { count, error: countError } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .eq("company_id", companyId);

      if (countError) {
        logger.error("Failed to count jobs", countError);
        throw createError(`Failed to count jobs: ${countError.message}`, 500);
      }

      // Get jobs with pagination
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (jobsError) {
        logger.error("Failed to fetch jobs", jobsError);
        throw createError(`Failed to fetch jobs: ${jobsError.message}`, 500);
      }

      return {
        jobs: jobs || [],
        total: count || 0,
      };
    } catch (error) {
      logger.error("Get jobs by company service error", error);
      throw error;
    }
  }

  async updateJob(
    jobId: string,
    companyId: string,
    updates: Partial<JobInsert>
  ): Promise<JobRow> {
    try {
      logger.info("Updating job", { job_id: jobId, company_id: companyId });

      const { data: job, error } = await supabase
        .from("jobs")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)
        .eq("company_id", companyId)
        .select()
        .single();

      if (error) {
        logger.error("Job update failed", error);
        throw createError(`Failed to update job: ${error.message}`, 400);
      }

      logger.info("Job updated successfully", { job_id: jobId });
      return job;
    } catch (error) {
      logger.error("Update job service error", error);
      throw error;
    }
  }

  async deleteJob(jobId: string, companyId: string): Promise<void> {
    try {
      logger.info("Deleting job", { job_id: jobId, company_id: companyId });

      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId)
        .eq("company_id", companyId);

      if (error) {
        logger.error("Job deletion failed", error);
        throw createError(`Failed to delete job: ${error.message}`, 400);
      }

      logger.info("Job deleted successfully", { job_id: jobId });
    } catch (error) {
      logger.error("Delete job service error", error);
      throw error;
    }
  }

  async validateCompanyAccess(
    companyId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const { data: employer, error } = await supabase
        .from("employers")
        .select("company_id")
        .eq("id", userId)
        .single();

      if (error) {
        logger.error("Company access validation failed", error);
        return false;
      }

      return employer.company_id === companyId;
    } catch (error) {
      logger.error("Company access validation error", error);
      return false;
    }
  }

  async saveJobDescriptionToStorage(
    jobId: string,
    companyId: string,
    jobDescriptionText: string
  ): Promise<string | null> {
    try {
      logger.info("Saving job description text to storage", { job_id: jobId });

      // Create a text file with the original job description
      const fileName = `job-description-${jobId}.txt`;
      const storagePath = `job-descriptions/${companyId}/${fileName}`;

      // Convert text to buffer
      const textBuffer = Buffer.from(jobDescriptionText, "utf-8");
      const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "company";

      // Upload to Supabase Storage using application/octet-stream to avoid MIME type restrictions
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, textBuffer, {
          contentType: "application/octet-stream",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        logger.error("Failed to save job description to storage", error);
        throw error;
      }

      logger.info("Job description saved to storage successfully", {
        job_id: jobId,
        storage_path: data?.path,
      });

      return data?.path || storagePath;
    } catch (error) {
      logger.error("Job description storage save failed", error);
      throw error;
    }
  }

  async getJobDescriptionStorageUrl(jobId: string, companyId: string): Promise<string | null> {
    try {
      logger.info("Getting job description storage URL", { job_id: jobId });

      const { data: job, error } = await supabase
        .from("jobs")
        .select("id, company_id")
        .eq("id", jobId)
        .eq("company_id", companyId)
        .single();

      if (error) {
        logger.error("Failed to retrieve job", error);
        throw createError(`Failed to retrieve job: ${error.message}`, 404);
      }

      const storagePath = `job-descriptions/${companyId}/job-description-${jobId}.txt`;
      const { data } = supabase.storage.from(process.env.SUPABASE_STORAGE_BUCKET || "company").getPublicUrl(storagePath);

      logger.info("Job description storage URL retrieved successfully", {
        job_id: jobId,
        storage_url: data.publicUrl,
      });

      return data.publicUrl;
    } catch (error) {
      logger.error("Job description storage URL retrieval failed", error);
      throw error;
    }
  }
}

export const jobsService = new JobsService();
