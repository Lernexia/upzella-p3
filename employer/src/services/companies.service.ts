import { Company, CreateCompany } from "@/lib/schema/company.schema";
import { createClient } from "@/utils/supabase/client";
import { AuthResponse } from "./common.service";
import { CompanySelect } from "@/lib/schema/company.schema";

export class CompanyService {
  private supabase = createClient();

  /**
   * Create a new company
   */
  async createCompany(
    companyData: CreateCompany
  ): Promise<{ success: boolean; company?: Company; error?: string }> {
    try {
      // Extract domain from website URL if provided
      let domain = companyData.domain;
      if (!domain && companyData.website_url) {
        try {
          const url = new URL(companyData.website_url);
          domain = url.hostname.replace("www.", "");
        } catch {
          // Invalid URL, ignore domain extraction
        }
      }

      const { data, error } = await this.supabase
        .from("companies")
        .insert([
          {
            ...companyData,
            domain,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating company:", error);
        return {
          success: false,
          error: error.message || "Failed to create company",
        };
      }

      return { success: true, company: data };
    } catch (error) {
      console.error("Error in createCompany:", error);
      return {
        success: false,
        error: "An unexpected error occurred while creating the company",
      };
    }
  }

  /**
   * Create a new company and link the employer to it
   */
  async createCompanyAndLink(
    employerId: string,
    companyData: CreateCompany
  ): Promise<AuthResponse> {
    try {
      // Create the company
      const companyResult = await this.createCompany(companyData);
      if (!companyResult.success || !companyResult.company) {
        return {
          success: false,
          message: "Failed to create company",
          error: companyResult.error,
        };
      }

      // Link employer to the new company
      const linkResult = await this.linkEmployerToCompany(
        employerId,
        companyResult.company.id
      );
      if (!linkResult.success) {
        // Clean up the company if linking fails
        await this.supabase
          .from("companies")
          .delete()
          .eq("id", companyResult.company.id);

        return {
          success: false,
          message: "Company created but failed to link account",
          error: linkResult.error,
        };
      }

      // Clean up localStorage flags
      localStorage.removeItem("upzella_create_company");
      localStorage.removeItem("upzella_employer_temp");
      localStorage.removeItem("upzella_signup_data");

      return {
        success: true,
        message: "Company created and linked successfully",
        data: linkResult.data,
      };
    } catch (error) {
      console.error("Error in createCompanyAndLink:", error);
      return {
        success: false,
        message: "Failed to create and link company",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Link an employer to a company (used after company selection/creation)
   */
  async linkEmployerToCompany(
    employerId: string,
    companyId: string
  ): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase
        .from("employers")
        .update({
          company_id: companyId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", employerId)
        .select(
          `
            *,
            company:companies(*)
          `
        )
        .single();

      if (error) {
        console.error("Error linking employer to company:", error);
        return {
          success: false,
          message: "Failed to link to company",
          error: error.message,
        };
      }

      return {
        success: true,
        message: "Successfully linked to company",
        data,
      };
    } catch (error) {
      console.error("Error in linkEmployerToCompany:", error);
      return {
        success: false,
        message: "Failed to link to company",
        error: "An unexpected error occurred",
      };
    }
  }

  /**
   * Get all companies for dropdown selection
   */
  async getCompanies(): Promise<CompanySelect[]> {
    try {
      const { data, error } = await this.supabase
        .from("companies")
        .select("id, name, domain, industry, employee_count, logo_url")
        .order("name");

      if (error) {
        console.error("Error fetching companies:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getCompanies:", error);
      return [];
    }
  }

  /**
   * Search companies by name for autocomplete
   */
  async searchCompanies(query: string): Promise<CompanySelect[]> {
    try {
      if (!query || query.length < 2) return [];

      const { data, error } = await this.supabase
        .from("companies")
        .select("id, name, domain, industry, employee_count, logo_url")
        .ilike("name", `%${query}%`)
        .limit(10)
        .order("name");

      if (error) {
        console.error("Error searching companies:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in searchCompanies:", error);
      return [];
    }
  }

  async getCompanyById(companyId: string): Promise<Company | null> {
    try {
      const { data, error } = await this.supabase
        .from("companies")
        .select("*")
        .eq("id", companyId)
        .single();

      if (error) {
        console.error("Error fetching company by ID:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getCompanyById:", error);
      return null;
    }
  }
}

export const companyService = new CompanyService();
