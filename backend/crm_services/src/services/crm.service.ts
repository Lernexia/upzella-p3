import { crmConnectionQueries, getUserCompanyContext } from '../db';
import { hubSpotService } from './hubspot.service';
import { crmLogger } from '../utils/logger';
import { createCRMError } from '../middleware/errorHandler';

export interface CRMConnectionData {
  id: string;
  user_id: string;
  company_id: string;
  crm_provider: 'hubspot';
  connected_at: string;
  updated_at: string;
  scopes: string[];
  expires_at: string;
  is_token_valid: boolean;
}

export interface CRMConnectionStatus {
  connected: boolean;
  provider?: 'hubspot';
  connected_at?: string;
  scopes?: string[];
  account_info?: any;
  is_token_valid?: boolean;
}

export class CRMService {
  /**
   * Initiate OAuth connection for a CRM provider
   */
  async initiateConnection(userId: string, provider: 'hubspot'): Promise<string> {
    try {
      crmLogger.connection('initiate_connection', provider, userId);

      // Validate provider
      if (provider !== 'hubspot') {
        throw createCRMError.invalidProvider(provider);
      }

      // Check if user already has a connection
      const { data: existingConnection } = await crmConnectionQueries.getConnection(userId, provider);
      
      if (existingConnection) {
        crmLogger.connection('existing_connection_found', provider, userId, {
          connection_id: existingConnection.id,
          expires_at: existingConnection.expires_at
        });
      }

      // Generate OAuth URL based on provider
      let authUrl: string;
      
      switch (provider) {
        case 'hubspot':
          const state = hubSpotService.generateState(userId);
          const scopes = (process.env.HUBSPOT_SCOPES || 'contacts,oauth').split(',');
          authUrl = hubSpotService.getAuthorizationUrl(state, scopes);
          break;
        default:
          throw createCRMError.invalidProvider(provider);
      }

      crmLogger.connection('oauth_url_generated', provider, userId, {
        has_existing_connection: !!existingConnection
      });

      return authUrl;
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'initiate_connection', userId, { provider });
      throw error;
    }
  }

  /**
   * Handle OAuth callback and save connection
   */
  async handleOAuthCallback(
    userId: string,
    provider: 'hubspot',
    code: string,
    state?: string
  ): Promise<CRMConnectionData> {
    try {
      crmLogger.connection('oauth_callback_received', provider, userId, {
        code_length: code.length,
        has_state: !!state
      });

      // Validate provider
      if (provider !== 'hubspot') {
        throw createCRMError.invalidProvider(provider);
      }

      // Get user company context
      const userContext = await getUserCompanyContext(userId);
      if (!userContext) {
        throw createCRMError.oauthFailed(provider, 'User company context not found');
      }

      // Validate state parameter (if provided)
      if (state && provider === 'hubspot') {
        const isValidState = hubSpotService.validateState(state, userId);
        if (!isValidState) {
          throw createCRMError.oauthFailed(provider, 'Invalid state parameter');
        }
      }

      // Exchange code for tokens based on provider
      let tokenData: any;
      let scopes: string[];

      switch (provider) {
        case 'hubspot':
          tokenData = await hubSpotService.exchangeCodeForTokens(code);
          scopes = tokenData.scope ? tokenData.scope.split(' ') : [];
          break;
        default:
          throw createCRMError.invalidProvider(provider);
      }

      // Calculate token expiration
      const expiresAt = new Date(Date.now() + (tokenData.expires_in * 1000));

      // Check if connection already exists and update, or create new
      const { data: existingConnection } = await crmConnectionQueries.getConnection(userId, provider);

      let connectionData: any;

      if (existingConnection) {
        crmLogger.connection('updating_existing_connection', provider, userId, {
          connection_id: existingConnection.id
        });

        const { data, error } = await crmConnectionQueries.updateConnection(userId, provider, {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt.toISOString(),
          scopes
        });

        if (error || !data) {
          throw new Error(`Failed to update ${provider} connection: ${error?.message}`);
        }

        connectionData = data;
      } else {
        crmLogger.connection('creating_new_connection', provider, userId);

        const { data, error } = await crmConnectionQueries.createConnection({
          user_id: userId,
          company_id: userContext.company_id,
          crm_provider: provider,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt.toISOString(),
          scopes
        });

        if (error || !data) {
          throw new Error(`Failed to create ${provider} connection: ${error?.message}`);
        }

        connectionData = data;
      }

      crmLogger.connection('oauth_callback_completed', provider, userId, {
        connection_id: connectionData.id,
        expires_at: connectionData.expires_at,
        scopes_count: scopes.length
      });

      return {
        id: connectionData.id,
        user_id: connectionData.user_id,
        company_id: connectionData.company_id,
        crm_provider: connectionData.crm_provider,
        connected_at: connectionData.connected_at,
        updated_at: connectionData.updated_at,
        scopes: connectionData.scopes,
        expires_at: connectionData.expires_at,
        is_token_valid: true
      };
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'oauth_callback', userId, { provider });
      throw error;
    }
  }

  /**
   * Get CRM connection status for a user
   */
  async getConnectionStatus(userId: string, provider: 'hubspot'): Promise<CRMConnectionStatus> {
    try {
      crmLogger.connection('get_status', provider, userId);

      const { data: connection, error } = await crmConnectionQueries.getConnection(userId, provider);

      if (error || !connection) {
        crmLogger.connection('no_connection_found', provider, userId);
        return { connected: false };
      }

      // Check if token is expired
      const expiresAt = new Date(connection.expires_at);
      const now = new Date();
      const isTokenValid = expiresAt > now;

      // Try to refresh token if it's expired and we have a refresh token
      if (!isTokenValid && connection.refresh_token) {
        try {
          await this.refreshToken(userId, provider);
          // Fetch updated connection
          const { data: updatedConnection } = await crmConnectionQueries.getConnection(userId, provider);
          if (updatedConnection) {
            connection.access_token = updatedConnection.access_token;
            connection.expires_at = updatedConnection.expires_at;
            connection.updated_at = updatedConnection.updated_at;
          }
        } catch (refreshError) {
          crmLogger.error(refreshError instanceof Error ? refreshError : new Error('Token refresh failed'), 'token_refresh_failed', userId, { provider });
        }
      }

      // Test the connection and get account info
      let accountInfo;
      const finalTokenValid = new Date(connection.expires_at) > new Date();

      if (finalTokenValid) {
        try {
          switch (provider) {
            case 'hubspot':
              const isConnected = await hubSpotService.testConnection(connection.access_token);
              if (isConnected) {
                accountInfo = await hubSpotService.getAccountInfo(connection.access_token);
              }
              break;
          }
        } catch (testError) {
          crmLogger.error(testError instanceof Error ? testError : new Error('Connection test failed'), 'connection_test', userId, { provider });
        }
      }

      crmLogger.connection('status_retrieved', provider, userId, {
        is_connected: true,
        is_token_valid: finalTokenValid,
        has_account_info: !!accountInfo,
        expires_at: connection.expires_at
      });

      return {
        connected: true,
        provider,
        connected_at: connection.connected_at,
        scopes: connection.scopes,
        account_info: accountInfo,
        is_token_valid: finalTokenValid
      };
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'get_connection_status', userId, { provider });
      throw error;
    }
  }

  /**
   * Refresh access token for a CRM connection
   */
  async refreshToken(userId: string, provider: 'hubspot'): Promise<void> {
    try {
      crmLogger.tokenRefresh(provider, userId, false, { action: 'refresh_initiated' });

      const { data: connection, error } = await crmConnectionQueries.getConnection(userId, provider);

      if (error || !connection) {
        throw createCRMError.connectionNotFound(provider);
      }

      if (!connection.refresh_token) {
        throw new Error(`No refresh token available for ${provider} connection`);
      }

      let newTokenData: any;

      switch (provider) {
        case 'hubspot':
          newTokenData = await hubSpotService.refreshAccessToken(connection.refresh_token);
          break;
        default:
          throw createCRMError.invalidProvider(provider);
      }

      // Calculate new expiration
      const expiresAt = new Date(Date.now() + (newTokenData.expires_in * 1000));

      // Update connection with new token
      const { error: updateError } = await crmConnectionQueries.updateConnection(userId, provider, {
        access_token: newTokenData.access_token,
        expires_at: expiresAt.toISOString()
      });

      if (updateError) {
        throw new Error(`Failed to update token: ${updateError.message}`);
      }

      crmLogger.tokenRefresh(provider, userId, true, {
        new_expires_at: expiresAt.toISOString()
      });
    } catch (error) {
      crmLogger.tokenRefresh(provider, userId, false, {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Disconnect CRM connection
   */
  async disconnectCRM(userId: string, provider: 'hubspot'): Promise<void> {
    try {
      crmLogger.connection('disconnect_initiated', provider, userId);

      const { data: connection, error } = await crmConnectionQueries.getConnection(userId, provider);

      if (error || !connection) {
        throw createCRMError.connectionNotFound(provider);
      }

      // Try to revoke token on the provider's side
      try {
        switch (provider) {
          case 'hubspot':
            await hubSpotService.revokeToken(connection.access_token);
            break;
        }
      } catch (revokeError) {
        // Log but don't fail the disconnect process
        crmLogger.error(revokeError instanceof Error ? revokeError : new Error('Token revocation failed'), 'token_revocation', userId, { provider });
      }

      // Delete connection from database
      const { error: deleteError } = await crmConnectionQueries.deleteConnection(userId, provider);

      if (deleteError) {
        throw new Error(`Failed to delete ${provider} connection: ${deleteError.message}`);
      }

      crmLogger.connection('disconnect_completed', provider, userId, {
        connection_id: connection.id
      });
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'disconnect_crm', userId, { provider });
      throw error;
    }
  }

  /**
   * Get all CRM connections for a company (admin function)
   */
  async getCompanyConnections(companyId: string): Promise<CRMConnectionData[]> {
    try {
      const { data: connections, error } = await crmConnectionQueries.getCompanyConnections(companyId);

      if (error) {
        throw new Error(`Failed to fetch company connections: ${error.message}`);
      }

      return (connections || []).map(conn => ({
        id: conn.id,
        user_id: conn.user_id,
        company_id: conn.company_id,
        crm_provider: conn.crm_provider,
        connected_at: conn.connected_at,
        updated_at: conn.updated_at,
        scopes: conn.scopes,
        expires_at: conn.expires_at,
        is_token_valid: new Date(conn.expires_at) > new Date()
      }));
    } catch (error) {
      crmLogger.error(error instanceof Error ? error : new Error('Unknown error'), 'get_company_connections', undefined, { companyId });
      throw error;
    }
  }
}

export const crmService = new CRMService();
