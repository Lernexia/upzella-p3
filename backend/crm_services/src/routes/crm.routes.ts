import { Router } from 'express';
import { crmController } from '../controllers/crm.controller';
import { authenticateUser, optionalAuth } from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for CRM endpoints
const crmRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs for CRM operations
  message: {
    error: {
      message: 'Too many CRM requests from this IP, please try again later.',
      code: 'CRM_RATE_LIMIT_EXCEEDED'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// OAuth callback rate limiting (stricter)
const callbackRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 callback requests per windowMs
  message: {
    error: {
      message: 'Too many OAuth callback requests from this IP, please try again later.',
      code: 'OAUTH_RATE_LIMIT_EXCEEDED'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CRMConnectionStatus:
 *       type: object
 *       properties:
 *         connected:
 *           type: boolean
 *           description: Whether the CRM is connected
 *         provider:
 *           type: string
 *           enum: [hubspot]
 *           description: The CRM provider name
 *         connected_at:
 *           type: string
 *           format: date-time
 *           description: When the connection was established
 *         scopes:
 *           type: array
 *           items:
 *             type: string
 *           description: OAuth scopes granted
 *         account_info:
 *           type: object
 *           description: CRM account information
 *         is_token_valid:
 *           type: boolean
 *           description: Whether the access token is still valid
 *     
 *     CRMConnection:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Connection ID
 *         user_id:
 *           type: string
 *           description: User ID who owns the connection
 *         company_id:
 *           type: string
 *           description: Company ID associated with the connection
 *         crm_provider:
 *           type: string
 *           enum: [hubspot]
 *           description: The CRM provider
 *         connected_at:
 *           type: string
 *           format: date-time
 *           description: When the connection was established
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When the connection was last updated
 *         scopes:
 *           type: array
 *           items:
 *             type: string
 *           description: OAuth scopes granted
 *         expires_at:
 *           type: string
 *           format: date-time
 *           description: When the access token expires
 *         is_token_valid:
 *           type: boolean
 *           description: Whether the access token is still valid
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /crm/connect/{provider}:
 *   get:
 *     summary: Initiate CRM connection
 *     description: Redirects user to CRM OAuth authorization page
 *     tags: [CRM Integration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hubspot]
 *         description: The CRM provider to connect to
 *     responses:
 *       302:
 *         description: Redirect to CRM OAuth page
 *       400:
 *         description: Invalid CRM provider
 *       401:
 *         description: Authentication required
 *       429:
 *         description: Too many requests
 */
router.get('/connect/:provider', crmRateLimit, authenticateUser, crmController.connectCRM);

/**
 * @swagger
 * /crm/callback/{provider}:
 *   get:
 *     summary: Handle OAuth callback
 *     description: Processes OAuth callback from CRM provider and saves connection
 *     tags: [CRM Integration]
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hubspot]
 *         description: The CRM provider
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: OAuth authorization code
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: OAuth state parameter for security
 *       - in: query
 *         name: error
 *         schema:
 *           type: string
 *         description: OAuth error if authorization failed
 *     responses:
 *       302:
 *         description: Redirect to frontend with success or error status
 */
router.get('/callback/:provider', callbackRateLimit, optionalAuth, crmController.handleCallback);

/**
 * @swagger
 * /crm/status/{provider}:
 *   get:
 *     summary: Get CRM connection status
 *     description: Returns current connection status and account information for the specified CRM provider
 *     tags: [CRM Integration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hubspot]
 *         description: The CRM provider
 *     responses:
 *       200:
 *         description: Connection status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/CRMConnectionStatus'
 *       400:
 *         description: Invalid CRM provider
 *       401:
 *         description: Authentication required
 *       429:
 *         description: Too many requests
 */
router.get('/status/:provider', crmRateLimit, authenticateUser, crmController.getConnectionStatus);

/**
 * @swagger
 * /crm/disconnect/{provider}:
 *   delete:
 *     summary: Disconnect CRM
 *     description: Removes CRM connection and revokes access tokens
 *     tags: [CRM Integration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hubspot]
 *         description: The CRM provider to disconnect
 *     responses:
 *       200:
 *         description: Successfully disconnected from CRM
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid CRM provider
 *       401:
 *         description: Authentication required
 *       404:
 *         description: No connection found for the specified provider
 *       429:
 *         description: Too many requests
 */
router.delete('/disconnect/:provider', crmRateLimit, authenticateUser, crmController.disconnectCRM);

/**
 * @swagger
 * /crm/refresh/{provider}:
 *   post:
 *     summary: Refresh CRM access token
 *     description: Refreshes the access token for the specified CRM provider
 *     tags: [CRM Integration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [hubspot]
 *         description: The CRM provider
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid CRM provider
 *       401:
 *         description: Authentication required or refresh token expired
 *       404:
 *         description: No connection found for the specified provider
 *       429:
 *         description: Too many requests
 */
router.post('/refresh/:provider', crmRateLimit, authenticateUser, crmController.refreshToken);

/**
 * @swagger
 * /crm/company/connections:
 *   get:
 *     summary: Get company CRM connections
 *     description: Returns all CRM connections for the user's company (admin function)
 *     tags: [CRM Integration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company connections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     company_id:
 *                       type: string
 *                     connections:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CRMConnection'
 *       400:
 *         description: Missing company context
 *       401:
 *         description: Authentication required
 *       429:
 *         description: Too many requests
 */
router.get('/company/connections', crmRateLimit, authenticateUser, crmController.getCompanyConnections);

export default router;
