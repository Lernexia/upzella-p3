import { supabase } from "../db";
import { createError } from "../middleware/errorHandler";
import bcrypt from "bcrypt";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  job_role?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  company?: {
    id: string;
    name: string;
    logo_url?: string;
  };
}

export const userService = {
  async getProfile(userId: string): Promise<UserProfile> {
    const { data: employer, error } = await supabase
      .from("employers")
      .select(
        `
        *,
        company:companies (
          id,
          name,
          logo_url
        )
      `
      )
      .eq("id", userId)
      .single();

    if (error) {
      throw createError("Failed to fetch user profile", 500);
    }

    if (!employer) {
      throw createError("User not found", 404, "USER_NOT_FOUND");
    }

    return employer as UserProfile;
  },

  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    const { data: updatedEmployer, error } = await supabase
      .from("employers")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw createError("Failed to update profile", 500);
    }

    return updatedEmployer as UserProfile;
  },

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File
  ): Promise<string> {
    try {
      // Process image with Sharp
      const processedImageBuffer = await sharp(file.buffer)
        .resize(300, 300, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 90 })
        .toBuffer();

      const fileName = `profile-images/${userId}-${Date.now()}.jpg`;
      const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "employers";

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, processedImageBuffer, {
          contentType: "image/jpeg",
          cacheControl: "500",
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw createError("Failed to upload avatar", 500);
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        throw createError("Failed to get avatar URL", 500);
      }

      // Update user's avatar_url in the database
      const { error: updateError } = await supabase
        .from("employers")
        .update({
          avatar_url: urlData.publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) {
        throw createError("Failed to update user avatar", 500);
      }

      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      throw createError(
        error.message || "Failed to process avatar upload",
        500
      );
    }
  },

  async deactivateAccount(
    userId: string,
    reason?: string,
    feedback?: string
  ): Promise<void> {
    const { error } = await supabase
      .from("employers")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      throw createError("Failed to deactivate account", 500);
    }

    // Store feedback if provided
    if (feedback && reason) {
      // Log the feedback for analysis
      console.log(`Account deactivation feedback from ${userId}:`, {
        reason,
        feedback,
      });
    }
  },
};
