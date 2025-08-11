# User Management API Documentation

## Base URL
```
http://localhost:8002
```

## Rate Limiting
- **Limit**: 100 requests per 15-minute window per IP address
- **Headers**: Standard rate limiting headers included
- **Error Response**: `429 Too Many Requests` when limit exceeded

## Authentication
All endpoints require Bearer token authentication:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check
**GET** `/health`

Returns API status and environment information.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-11T12:34:56.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

### User Profile Management

#### Get User Profile
**GET** `/api/users/profile`

Retrieves the current user's profile information including company details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "job_role": "HR Manager",
    "avatar_url": "/uploads/avatar-123e4567-1691234567890.jpg",
    "is_active": true,
    "is_verified": true,
    "last_login_at": "2025-08-11T10:30:00.000Z",
    "created_at": "2025-08-01T09:00:00.000Z",
    "updated_at": "2025-08-11T10:30:00.000Z",
    "company": {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "name": "Tech Corp",
      "logo_url": "/uploads/company-logo.jpg"
    }
  }
}
```

#### Update User Profile
**PUT** `/api/users/profile`

Updates the current user's profile information. Email is read-only and cannot be changed.

**Request Body:**
```json
{
  "full_name": "John Smith",
  "phone": "+1234567891",
  "job_role": "Senior HR Manager"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "John Smith",
    "email": "john.doe@example.com",
    "phone": "+1234567891",
    "job_role": "Senior HR Manager",
    "avatar_url": "/uploads/avatar-123e4567-1691234567890.jpg",
    "is_active": true,
    "is_verified": true,
    "updated_at": "2025-08-11T12:34:56.000Z"
  },
  "message": "Profile updated successfully"
}
```

#### Upload Profile Avatar
**POST** `/api/users/upload-avatar`

Uploads and sets a new profile avatar. Images are automatically resized to 300x300 pixels.

**Request Body:** `multipart/form-data`
- `avatar`: Image file (JPEG, PNG, or WebP, max 5MB)

**Response:**
```json
{
  "success": true,
  "data": {
    "avatar_url": "/uploads/avatar-123e4567-1691234567890.jpg"
  },
  "message": "Avatar uploaded successfully"
}
```

### Security Management

#### Change Password
**POST** `/api/users/change-password`

Changes the current user's password.

**Request Body:**
```json
{
  "current_password": "currentpassword123",
  "new_password": "NewSecurePassword123!",
  "confirm_password": "NewSecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Deactivate Account
**POST** `/api/users/deactivate`

Deactivates the current user's account.

**Request Body:**
```json
{
  "password": "userpassword123",
  "reason": "not_using",
  "feedback": "Optional feedback about why deactivating"
}
```

**Valid reasons:**
- `not_using` - Not using the service
- `found_alternative` - Found an alternative solution
- `privacy_concerns` - Privacy concerns
- `temporary_break` - Taking a temporary break
- `other` - Other reason

**Response:**
```json
{
  "success": true,
  "message": "Account deactivated successfully"
}
```

### Notification Preferences

#### Get Notification Preferences
**GET** `/api/users/notification-preferences`

Retrieves the current user's notification preferences.

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "email_notifications": true,
    "sms_notifications": false,
    "push_notifications": true,
    "marketing_emails": false,
    "job_alerts": true,
    "weekly_summary": true,
    "updated_at": "2025-08-11T12:34:56.000Z"
  }
}
```

#### Update Notification Preferences
**PUT** `/api/users/notification-preferences`

Updates the current user's notification preferences.

**Request Body:**
```json
{
  "email_notifications": true,
  "sms_notifications": true,
  "push_notifications": true,
  "marketing_emails": false,
  "job_alerts": true,
  "weekly_summary": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "email_notifications": true,
    "sms_notifications": true,
    "push_notifications": true,
    "marketing_emails": false,
    "job_alerts": true,
    "weekly_summary": false,
    "updated_at": "2025-08-11T12:34:56.000Z"
  },
  "message": "Notification preferences updated successfully"
}
```

### Privacy Settings

#### Get Privacy Settings
**GET** `/api/users/privacy-settings`

Retrieves the current user's privacy settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "profile_visibility": "company",
    "show_email": false,
    "show_phone": false,
    "allow_contact": true,
    "updated_at": "2025-08-11T12:34:56.000Z"
  }
}
```

#### Update Privacy Settings
**PUT** `/api/users/privacy-settings`

Updates the current user's privacy settings.

**Request Body:**
```json
{
  "profile_visibility": "public",
  "show_email": true,
  "show_phone": false,
  "allow_contact": true
}
```

**Valid profile_visibility values:**
- `public` - Visible to everyone
- `private` - Only visible to user
- `company` - Visible to company members only

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "profile_visibility": "public",
    "show_email": true,
    "show_phone": false,
    "allow_contact": true,
    "updated_at": "2025-08-11T12:34:56.000Z"
  },
  "message": "Privacy settings updated successfully"
}
```

### Activity Log

#### Get Activity Log
**GET** `/api/users/activity-log`

Retrieves the current user's activity log.

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 20, max: 100)
- `offset` (optional): Number of entries to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174002",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "action": "profile_updated",
      "description": "User updated their profile information",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2025-08-11T12:00:00.000Z"
    },
    {
      "id": "890e1234-e89b-12d3-a456-426614174003",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "action": "password_changed",
      "description": "User changed their password",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2025-08-10T15:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": "Full name must be at least 2 characters long"
  }
}
```

### Common Error Codes

**Authentication Errors (401)**
- `MISSING_TOKEN` - Authorization header missing
- `INVALID_TOKEN` - Invalid JWT token
- `TOKEN_EXPIRED` - JWT token has expired
- `AUTH_FAILED` - Authentication failed

**Authorization Errors (403)**
- `ACCOUNT_INACTIVE` - User account is inactive
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions

**Validation Errors (400)**
- `VALIDATION_ERROR` - Request data validation failed
- `NO_FILE` - Required file not provided
- `INVALID_FILE_TYPE` - File type not allowed

**Resource Errors (404)**
- `USER_NOT_FOUND` - User profile not found
- `NOT_FOUND` - Requested resource not found

**Server Errors (500)**
- `INTERNAL_ERROR` - Internal server error
- `CONFIG_ERROR` - Server configuration error

## Rate Limits

- Standard endpoints: 100 requests per 15 minutes per IP
- File upload endpoints: 10 requests per 15 minutes per IP

## File Upload Specifications

**Avatar Upload:**
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, WebP
- Automatic resize to: 300x300 pixels
- Quality: 90% JPEG compression

## Activity Log Actions

The system automatically logs the following user activities:
- `profile_updated` - Profile information changed
- `avatar_uploaded` - Profile picture uploaded
- `password_changed` - Password changed
- `preferences_updated` - Notification preferences updated
- `privacy_updated` - Privacy settings updated
- `account_deactivated` - Account deactivated
- `login` - User logged in
- `logout` - User logged out

## SDK Integration

For frontend integration, use the provided user management service:

```typescript
import { userService } from '@/services/user.service';

// Get user profile
const profile = await userService.getProfile();

// Update profile
const updatedProfile = await userService.updateProfile({
  full_name: 'New Name',
  job_role: 'Senior Manager'
});

// Upload avatar
const avatarUrl = await userService.uploadAvatar(file);
```
