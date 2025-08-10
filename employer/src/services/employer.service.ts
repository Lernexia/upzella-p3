import { CreateEmployer, Employer } from "@/lib/schema/employer.schema";
import { createClient } from "@/utils/supabase/client";

export class EmployerService {
  private supabase = createClient();

  /**
   * Create a new employer
   */
  async createEmployer(
    employerData: CreateEmployer
  ): Promise<{ success: boolean; employer?: Employer; error?: string }> {
    try {
      console.log("Creating employer with data:", employerData);

      // Use regular client (anon) for employer creation during signup
      // RLS policy allows anon role to insert during signup
      const { data, error } = await this.supabase
        .from("employers")
        .insert([employerData])
        .select()
        .single();

      if (error) {
        console.error("Error creating employer:", error);
        return {
          success: false,
          error:
            error.code === "23505"
              ? "An account with this email already exists"
              : error.message,
        };
      }

      return { success: true, employer: data };
    } catch (error) {
      console.error("Error in createEmployer:", error);
      return {
        success: false,
        error: "An unexpected error occurred while creating the account",
      };
    }
  }

  /**
   * Get employer by ID or email
   */
  async getEmployerByIdOrEmail(id: string | null, email: string | null) {
    try{
        if (id) {
            const { data, error } = await this.supabase
              .from("employers")
              .select()
              .eq("id", id)
              .single();

            if (error) {
                // console.error("Error fetching employer by ID:", error);
                return {
                    success: false,
                    error: "Employer not found"
                };
            }

            return {
                success: true,
                employer: data
            };
        }

        if (email) {
            const { data, error } = await this.supabase
              .from("employers")
              .select()
              .eq("email", email)
              .single();

            if (error) {
                // console.error("Error fetching employer by email:", error);
                return {
                    success: false,
                    error: "Employer not found"
                };
            }

            return {
                success: true,
                employer: data
            };
        }

        return {
            success: false,
            error: "Invalid ID or email"
        };
    } catch (error) {
        console.error("Error in getEmployerByIdOrEmail:", error);
        return {
            success: false,
            error: "An unexpected error occurred"
        };
    }
  }
}

export const employerService = new EmployerService();
