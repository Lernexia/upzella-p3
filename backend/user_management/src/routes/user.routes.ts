import express from 'express';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { auth } from '../middleware/auth';
import { userController } from '../controllers/user.controller';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE || '5242880') // 5MB default
  },
  fileFilter: (req, file, cb) => {
    console.log('File received:', file.originalname, file.mimetype);
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/jpg,image/png,image/webp').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.error('Invalid file type:', file.mimetype, 'Allowed types:', allowedTypes);
      const error = new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      cb(error);
    }
  }
});

// Stricter rate limiting for file uploads
const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 file uploads per 10 minutes
  message: {
    error: 'Too many file upload requests from this IP, please try again later.',
    retryAfter: '10 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const accountDeactivateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2, // Limit each IP to 2 deactivation requests per hour
  message: {
    error: 'Too many account deactivation attempts from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});


// Apply authentication middleware to all routes
router.use(auth);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         job_role:
 *           type: string
 *         avatar_url:
 *           type: string
 *         is_active:
 *           type: boolean
 *         is_verified:
 *           type: boolean
 *         last_login_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: User profile and account management
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User Management]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     full_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     job_role:
 *                       type: string
 *                     avatar_url:
 *                       type: string
 *                     company:
 *                       type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               job_role:
 *                 type: string
 *                 example: Senior HR Manager
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/profile', userController.updateProfile);

/**
 * @swagger
 * /api/users/upload-avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [User Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WebP, max 5MB)
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Avatar uploaded successfully
 *                 avatar_url:
 *                   type: string
 *                   example: https://example.com/avatars/user123.jpg
 *       400:
 *         description: Invalid file type or size
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/upload-avatar', uploadLimiter, upload.single('avatar'), userController.uploadAvatar);


/**
 * @swagger
 * /api/users/deactivate:
 *   post:
 *     summary: Deactivate user account
 *     tags: [User Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 enum: [not_using, found_alternative, privacy_concerns, temporary_break, other]
 *                 example: not_using
 *               feedback:
 *                 type: string
 *                 example: The platform doesn't meet our current needs
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account deactivated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/deactivate', accountDeactivateLimiter, userController.deactivateAccount);

export default router;
