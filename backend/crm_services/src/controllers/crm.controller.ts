import { Request, Response } from 'express';
import { crmService } from '../services/crm.service';
import { crmLogger } from '../utils/logger';
import { asyncHandler } from '../middleware/errorHandler';

export class CRMController {
  /**
   * Initiate CRM connection - GET /crm/connect/:provider
   */
  public connectCRM = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;
    const userId = req.user!.id;

    if (provider !== 'hubspot') {
      return res.status(400).json({
        error: {
          message: `Unsupported CRM provider: ${provider}`,
          code: 'INVALID_CRM_PROVIDER'
        }
      });
    }

    crmLogger.connection('connect_request', provider as 'hubspot', userId, {
      endpoint: req.originalUrl,
      userAgent: req.get('User-Agent')
    });

    try {
      const authUrl = await crmService.initiateConnection(userId, provider as 'hubspot');

      crmLogger.connection('connect_redirect', provider as 'hubspot', userId, {
        auth_url_length: authUrl.length
      });

      // Redirect user to CRM OAuth page
      res.redirect(authUrl);
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'connect_crm', userId, { provider });
      
      // Redirect to frontend error page
      const errorUrl = `${process.env.FRONTEND_ERROR_URL}`;
      res.redirect(errorUrl);
    }
  });

  /**
   * Handle OAuth callback - GET /crm/callback/:provider
   */
  public handleCallback = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;
    const { code, state, error: oauthError } = req.query;

    const frontendSuccessUrl = process.env.FRONTEND_SUCCESS_URL || 'http://localhost:3000/dashboard?crm=connected';
    const frontendErrorUrl = process.env.FRONTEND_ERROR_URL || 'http://localhost:3000/dashboard?crm=error';

    if (provider !== 'hubspot') {
      crmLogger.error(new Error('Invalid provider in callback'), 'oauth_callback', undefined, { provider });
      return res.redirect(`${frontendErrorUrl}&reason=invalid_provider`);
    }

    // Check for OAuth errors
    if (oauthError) {
      crmLogger.error(new Error(`OAuth error: ${oauthError}`), 'oauth_callback', undefined, { 
        provider,
        oauth_error: oauthError,
        error_description: req.query.error_description
      });
      return res.redirect(`${frontendErrorUrl}&reason=oauth_error`);
    }

    if (!code || typeof code !== 'string') {
      crmLogger.error(new Error('Missing authorization code'), 'oauth_callback', undefined, { provider });
      return res.redirect(`${frontendErrorUrl}&reason=missing_code`);
    }

    try {
      // Extract user ID from state parameter for HubSpot
      let userId: string;

      if (provider === 'hubspot' && state && typeof state === 'string') {
        try {
          const decoded = Buffer.from(state, 'base64').toString();
          userId = decoded.split(':')[0];
        } catch (decodeError) {
          crmLogger.error(new Error('Invalid state parameter'), 'oauth_callback', undefined, { 
            provider,
            state: typeof state === 'string' ? state.substring(0, 20) + '...' : 'invalid'
          });
          return res.redirect(`${frontendErrorUrl}&reason=invalid_state`);
        }
      } else {
        crmLogger.error(new Error('Missing or invalid state parameter'), 'oauth_callback', undefined, { 
          provider,
          has_state: !!state,
          state_type: typeof state
        });
        return res.redirect(`${frontendErrorUrl}&reason=missing_state`);
      }

      crmLogger.connection('callback_processing', provider as 'hubspot', userId, {
        code_length: code.length,
        has_state: !!state
      });

      // Handle the OAuth callback
      const connection = await crmService.handleOAuthCallback(
        userId,
        provider as 'hubspot',
        code,
        state as string
      );

      crmLogger.connection('callback_success', provider as 'hubspot', userId, {
        connection_id: connection.id,
        expires_at: connection.expires_at
      });

      // Redirect to frontend success page
      res.redirect(`${frontendSuccessUrl}&provider=${provider}`);
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'oauth_callback', undefined, { 
        provider,
        code_provided: !!code,
        state_provided: !!state
      });

      res.redirect(`${frontendErrorUrl}&reason=callback_error`);
    }
  });

  /**
   * Get CRM connection status - GET /crm/status/:provider
   */
  public getConnectionStatus = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;
    const userId = req.user!.id;

    if (provider !== 'hubspot') {
      return res.status(400).json({
        error: {
          message: `Unsupported CRM provider: ${provider}`,
          code: 'INVALID_CRM_PROVIDER'
        }
      });
    }

    crmLogger.connection('status_request', provider as 'hubspot', userId);

    try {
      const status = await crmService.getConnectionStatus(userId, provider as 'hubspot');

      crmLogger.connection('status_retrieved', provider as 'hubspot', userId, {
        connected: status.connected,
        is_token_valid: status.is_token_valid,
        has_account_info: !!status.account_info
      });

      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'get_connection_status', userId, { provider });
      
      res.status(500).json({
        error: {
          message: 'Failed to get connection status',
          code: 'STATUS_RETRIEVAL_FAILED'
        }
      });
    }
  });

  /**
   * Disconnect CRM - DELETE /crm/disconnect/:provider
   */
  public disconnectCRM = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;
    const userId = req.user!.id;

    if (provider !== 'hubspot') {
      return res.status(400).json({
        error: {
          message: `Unsupported CRM provider: ${provider}`,
          code: 'INVALID_CRM_PROVIDER'
        }
      });
    }

    crmLogger.connection('disconnect_request', provider as 'hubspot', userId);

    try {
      await crmService.disconnectCRM(userId, provider as 'hubspot');

      crmLogger.connection('disconnect_success', provider as 'hubspot', userId);

      res.json({
        success: true,
        message: `Successfully disconnected from ${provider}`
      });
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'disconnect_crm', userId, { provider });

      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({
          error: {
            message: `No ${provider} connection found`,
            code: 'CONNECTION_NOT_FOUND'
          }
        });
      }

      res.status(500).json({
        error: {
          message: `Failed to disconnect from ${provider}`,
          code: 'DISCONNECT_FAILED'
        }
      });
    }
  });

  /**
   * Refresh CRM token - POST /crm/refresh/:provider
   */
  public refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;
    const userId = req.user!.id;

    if (provider !== 'hubspot') {
      return res.status(400).json({
        error: {
          message: `Unsupported CRM provider: ${provider}`,
          code: 'INVALID_CRM_PROVIDER'
        }
      });
    }

    crmLogger.tokenRefresh(provider as 'hubspot', userId, false, { action: 'refresh_requested' });

    try {
      await crmService.refreshToken(userId, provider as 'hubspot');

      crmLogger.tokenRefresh(provider as 'hubspot', userId, true, { action: 'refresh_completed' });

      res.json({
        success: true,
        message: `Successfully refreshed ${provider} token`
      });
    } catch (error) {
      crmLogger.tokenRefresh(provider as 'hubspot', userId, false, { 
        action: 'refresh_failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({
          error: {
            message: `No ${provider} connection found`,
            code: 'CONNECTION_NOT_FOUND'
          }
        });
      }

      if (error instanceof Error && error.message.includes('expired')) {
        return res.status(401).json({
          error: {
            message: `${provider} refresh token has expired`,
            code: 'REFRESH_TOKEN_EXPIRED'
          }
        });
      }

      res.status(500).json({
        error: {
          message: `Failed to refresh ${provider} token`,
          code: 'TOKEN_REFRESH_FAILED'
        }
      });
    }
  });

  /**
   * Get company CRM connections (admin endpoint) - GET /crm/company/connections
   */
  public getCompanyConnections = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const companyId = req.user!.company_id;

    if (!companyId) {
      return res.status(400).json({
        error: {
          message: 'Company context not found',
          code: 'MISSING_COMPANY_CONTEXT'
        }
      });
    }

    crmLogger.connection('company_connections_request', 'system', userId, { companyId });

    try {
      const connections = await crmService.getCompanyConnections(companyId);

      crmLogger.connection('company_connections_retrieved', 'system', userId, {
        companyId,
        connections_count: connections.length
      });

      res.json({
        success: true,
        data: {
          company_id: companyId,
          connections
        }
      });
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'get_company_connections', userId, { companyId });

      res.status(500).json({
        error: {
          message: 'Failed to get company CRM connections',
          code: 'COMPANY_CONNECTIONS_FAILED'
        }
      });
    }
  });
}

export const crmController = new CRMController();
