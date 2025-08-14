import axios, { AxiosResponse } from 'axios';
import { crmLogger } from '../utils/logger';
import { createCRMError } from '../middleware/errorHandler';

export interface HubSpotTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface HubSpotTokenRefreshResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface HubSpotContact {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    jobtitle?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export class HubSpotService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly baseUrl = 'https://api.hubapi.com';
  private readonly authUrl = 'https://app.hubspot.com/oauth/authorize';
  private readonly tokenUrl = 'https://api.hubapi.com/oauth/v1/token';

  constructor() {
    this.clientId = process.env.HUBSPOT_CLIENT_ID || '';
    this.clientSecret = process.env.HUBSPOT_CLIENT_SECRET || '';
    this.redirectUri = process.env.HUBSPOT_REDIRECT_URI || '';

    if (!this.clientId || !this.clientSecret || !this.redirectUri) {
      throw new Error('Missing required HubSpot configuration');
    }
  }

  /**
   * Generate HubSpot OAuth authorization URL
   */
  getAuthorizationUrl(state: string, scopes: string[] = ['contacts', 'oauth']): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: scopes.join(' '),
      response_type: 'code',
      state
    });

    const authUrl = `${this.authUrl}?${params.toString()}`;
    
    crmLogger.oauth('authorization_url_generated', 'hubspot', undefined, {
      scopes,
      state,
      redirect_uri: this.redirectUri
    });

    return authUrl;
  }

  /**
   * Exchange authorization code for access tokens
   */
  async exchangeCodeForTokens(code: string): Promise<HubSpotTokenResponse> {
    try {
      crmLogger.oauth('token_exchange_initiated', 'hubspot', undefined, { code_length: code.length });

      const response: AxiosResponse<HubSpotTokenResponse> = await axios.post(
        this.tokenUrl,
        {
          grant_type: 'authorization_code',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
          code
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const tokenData = response.data;

      crmLogger.oauth('token_exchange_successful', 'hubspot', undefined, {
        expires_in: tokenData.expires_in,
        scope: tokenData.scope,
        token_type: tokenData.token_type
      });

      return tokenData;
    } catch (error: any) {
      crmLogger.error(error, 'token_exchange_failed', undefined, {
        provider: 'hubspot',
        error_response: error.response?.data
      });

      if (error.response?.status === 400) {
        throw createCRMError.oauthFailed('HubSpot', 'Invalid authorization code');
      }

      throw createCRMError.oauthFailed('HubSpot', 'Token exchange failed');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<HubSpotTokenRefreshResponse> {
    try {
      crmLogger.tokenRefresh('hubspot', 'system', false, { action: 'refresh_initiated' });

      const response: AxiosResponse<HubSpotTokenRefreshResponse> = await axios.post(
        this.tokenUrl,
        {
          grant_type: 'refresh_token',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const tokenData = response.data;

      crmLogger.tokenRefresh('hubspot', 'system', true, {
        expires_in: tokenData.expires_in,
        scope: tokenData.scope
      });

      return tokenData;
    } catch (error: any) {
      crmLogger.tokenRefresh('hubspot', 'system', false, {
        error: error.response?.data || error.message
      });

      if (error.response?.status === 400) {
        throw createCRMError.tokenExpired('HubSpot');
      }

      throw createCRMError.apiCallFailed('HubSpot', 'token refresh');
    }
  }

  /**
   * Test API connection with current token
   */
  async testConnection(accessToken: string): Promise<boolean> {
    try {
      crmLogger.apiCall('hubspot', 'connection_test', 0, undefined, { action: 'test_initiated' });

      const response = await axios.get(`${this.baseUrl}/account-info/v3/api-usage/daily`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      crmLogger.apiCall('hubspot', 'connection_test', response.status, undefined, {
        success: true
      });

      return true;
    } catch (error: any) {
      crmLogger.apiCall('hubspot', 'connection_test', error.response?.status || 0, undefined, {
        success: false,
        error: error.response?.data || error.message
      });

      return false;
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo(accessToken: string): Promise<any> {
    try {
      crmLogger.apiCall('hubspot', 'account_info', 0, undefined, { action: 'get_account_info' });

      const response = await axios.get(`${this.baseUrl}/account-info/v3/details`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      crmLogger.apiCall('hubspot', 'account_info', response.status);

      return response.data;
    } catch (error: any) {
      crmLogger.apiCall('hubspot', 'account_info', error.response?.status || 0, undefined, {
        error: error.response?.data || error.message
      });

      if (error.response?.status === 401) {
        throw createCRMError.tokenExpired('HubSpot');
      }

      throw createCRMError.apiCallFailed('HubSpot', 'account info');
    }
  }

  /**
   * Get contacts from HubSpot (for future use in 3.2)
   */
  async getContacts(accessToken: string, limit = 100, after?: string): Promise<{
    results: HubSpotContact[];
    paging?: {
      next?: {
        after: string;
      };
    };
  }> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString()
      });

      if (after) {
        params.append('after', after);
      }

      crmLogger.apiCall('hubspot', 'get_contacts', 0, undefined, { 
        limit, 
        after,
        action: 'contacts_fetch_initiated'
      });

      const response = await axios.get(`${this.baseUrl}/crm/v3/objects/contacts?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      crmLogger.apiCall('hubspot', 'get_contacts', response.status, undefined, {
        contacts_count: response.data.results?.length || 0,
        has_more: !!response.data.paging?.next
      });

      return response.data;
    } catch (error: any) {
      crmLogger.apiCall('hubspot', 'get_contacts', error.response?.status || 0, undefined, {
        error: error.response?.data || error.message
      });

      if (error.response?.status === 401) {
        throw createCRMError.tokenExpired('HubSpot');
      }

      if (error.response?.status === 429) {
        throw createCRMError.rateLimitExceeded('HubSpot');
      }

      throw createCRMError.apiCallFailed('HubSpot', 'contacts');
    }
  }

  /**
   * Revoke access token (for disconnect functionality)
   */
  async revokeToken(accessToken: string): Promise<void> {
    try {
      crmLogger.oauth('token_revocation_initiated', 'hubspot', undefined, { action: 'revoke_token' });

      await axios.post(
        'https://api.hubapi.com/oauth/v1/refresh-tokens/revoke',
        {
          token: accessToken
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      crmLogger.oauth('token_revocation_successful', 'hubspot', undefined);
    } catch (error: any) {
      // Don't throw error on revocation failure, just log it
      crmLogger.error(error, 'token_revocation_failed', undefined, {
        provider: 'hubspot',
        error_response: error.response?.data
      });
    }
  }

  /**
   * Generate state parameter for OAuth security
   */
  generateState(userId: string): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(7);
    const state = Buffer.from(`${userId}:${timestamp}:${random}`).toString('base64');
    
    crmLogger.oauth('state_generated', 'hubspot', userId, { 
      state_length: state.length 
    });

    return state;
  }

  /**
   * Validate and parse state parameter
   */
  validateState(state: string, expectedUserId: string): boolean {
    try {
      const decoded = Buffer.from(state, 'base64').toString();
      const [userId, timestamp] = decoded.split(':');

      // Check if user ID matches
      if (userId !== expectedUserId) {
        crmLogger.oauth('state_validation_failed', 'hubspot', expectedUserId, {
          reason: 'user_id_mismatch',
          state
        });
        return false;
      }

      // Check if state is not too old (10 minutes)
      const stateTimestamp = parseInt(timestamp, 10);
      const now = Date.now();
      const tenMinutes = 10 * 60 * 1000;

      if (now - stateTimestamp > tenMinutes) {
        crmLogger.oauth('state_validation_failed', 'hubspot', expectedUserId, {
          reason: 'state_expired',
          age_ms: now - stateTimestamp
        });
        return false;
      }

      crmLogger.oauth('state_validation_successful', 'hubspot', expectedUserId);
      return true;
    } catch (error) {
      crmLogger.oauth('state_validation_failed', 'hubspot', expectedUserId, {
        reason: 'parse_error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }
}

export const hubSpotService = new HubSpotService();
