import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { 
  updateProfileSchema, 
  deactivateAccountSchema 
} from '../validators/userValidation';

export const userController = {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'User ID not found in token', code: 'AUTH_FAILED' }
        });
        return;
      }

      const profile = await userService.getProfile(userId);
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(error.statusCode || 500).json({
        success: false,
        error: {
          message: error.message || 'Failed to get profile',
          code: error.code || 'INTERNAL_ERROR'
        }
      });
    }
  },

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'User ID not found in token', code: 'AUTH_FAILED' }
        });
        return;
      }

      const { error, value } = updateProfileSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          error: {
            message: error.details[0].message,
            code: 'VALIDATION_ERROR'
          }
        });
        return;
      }

      const updatedProfile = await userService.updateProfile(userId, value);
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      res.status(error.statusCode || 500).json({
        success: false,
        error: {
          message: error.message || 'Failed to update profile',
          code: error.code || 'INTERNAL_ERROR'
        }
      });
    }
  },

  async uploadAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'User ID not found in token', code: 'AUTH_FAILED' }
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          error: { message: 'No file provided', code: 'NO_FILE' }
        });
        return;
      }

      const avatarUrl = await userService.uploadAvatar(userId, req.file);
      
      res.json({
        success: true,
        message: 'Avatar uploaded successfully',
        data: { avatar_url: avatarUrl }
      });
    } catch (error: any) {
      console.error('Upload avatar error:', error);
      res.status(error.statusCode || 500).json({
        success: false,
        error: {
          message: error.message || 'Failed to upload avatar',
          code: error.code || 'INTERNAL_ERROR',
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      });
    }
  },

  async deactivateAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: 'User ID not found in token', code: 'AUTH_FAILED' }
        });
        return;
      }

      const { error, value } = deactivateAccountSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          error: {
            message: error.details[0].message,
            code: 'VALIDATION_ERROR'
          }
        });
        return;
      }

      const { reason, feedback } = value;
      await userService.deactivateAccount(userId, reason, feedback);
      
      res.json({
        success: true,
        message: 'Account deactivated successfully'
      });
    } catch (error: any) {
      console.error('Deactivate account error:', error);
      res.status(error.statusCode || 500).json({
        success: false,
        error: {
          message: error.message || 'Failed to deactivate account',
          code: error.code || 'INTERNAL_ERROR'
        }
      });
    }
  }
};
