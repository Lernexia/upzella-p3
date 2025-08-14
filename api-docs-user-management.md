# User Management API Documentation

## Base URL
```
http://localhost:8002
```

## Rate Limiting
- **Standard Endpoints**: 100 requests per 15-minute window per IP address
- **File Upload Endpoints**: 10 requests per 15-minute window per IP address (5 uploads per 10 minutes)
- **Account Deactivation**: 2 requests per hour per IP address
- **Headers**: Standard rate limiting headers included
- **Error Response**: `429 Too Many Requests` when limit exceeded

## Authentication
All endpoints require Bearer token authentication:
```
Authorization: Bearer <your-jwt-token>
```

## Swagger Documentation
Interactive API documentation is available at:
```
http://localhost:8002/api-docs
```

## Endpoints

### Health Check
**GET** `/health`

Returns API status, timestamp, version, and environment information. This endpoint is public and does not require authentication.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-14T12:34:56.000Z",
  "environment": "development",
  "version": "1.0.0"
}
```

### User Profile Management

#### Get User Profile
**GET** `/api/users/profile`

Retrieves the current user's profile information including associated company details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "John Smith",
    "email": "john.smith@company.com",
    "phone": "+1-555-0123",
    "job_role": "Senior HR Manager",
    "avatar_url": "https://example.com/avatars/user123.jpg",
    "is_active": true,
    "is_verified": true,
    "last_login_at": "2025-08-14T10:30:00.000Z",
    "created_at": "2025-07-01T09:00:00.000Z",
    "updated_at": "2025-08-14T10:30:00.000Z",
    "company": {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "name": "Tech Innovations Inc.",
      "domain": "techinnovations.com",
      "website_url": "https://www.techinnovations.com",
      "linkedin_url": "https://linkedin.com/company/tech-innovations",
      "x_url": "https://x.com/techinnovations",
      "instagram_url": "https://instagram.com/techinnovations",
      "phone": "+1-555-0100",
      "logo_url": "https://example.com/logos/tech-innovations.png",
      "employee_count": "51-200",
      "company_type": "mid-market",
      "industry": "Technology",
      "country": "United States",
      "state": "California",
      "address": "123 Tech Street, San Francisco",
      "pincode": "94105",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

#### Update User Profile
**PUT** `/api/users/profile`

Updates the current user's profile information. The email field is read-only and cannot be changed through this endpoint.

**Request Body:**
```json
{
  "full_name": "John William Smith",
  "phone": "+1-555-0124",
  "job_role": "VP of Human Resources"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "full_name": "John William Smith",
    "email": "john.smith@company.com",
    "phone": "+1-555-0124",
    "job_role": "VP of Human Resources",
    "avatar_url": "https://example.com/avatars/user123.jpg",
    "updated_at": "2025-08-14T12:45:00.000Z"
  }
}
```

#### Upload Profile Avatar
**POST** `/api/users/upload-avatar`

Uploads and sets a new profile avatar. Images are automatically processed and resized to 300x300 pixels with optimized compression.

**Request Body:** `multipart/form-data`
- `avatar`: Image file (JPEG, PNG, or WebP, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatar_url": "https://example.com/avatars/user123_updated.jpg"
  }
}
```

### Security Management

#### Deactivate Account
**POST** `/api/users/deactivate`

Deactivates the current user's account with reason tracking for analytics and improvement purposes.

**Request Body:**
```json
{
  "reason": "not_using",
  "feedback": "The platform doesn't meet our current hiring needs, but we may return in the future"
}
```

**Valid Deactivation Reasons:**
- `not_using` - Not actively using the service
- `found_alternative` - Found an alternative solution
- `privacy_concerns` - Privacy or security concerns
- `temporary_break` - Taking a temporary break
- `other` - Other reason (please specify in feedback)

**Response:**
```json
{
  "success": true,
  "message": "Account deactivated successfully"
}
```

## Error Responses

All endpoints return consistent error responses with detailed information for debugging:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed: Full name must be at least 2 characters long",
    "code": "VALIDATION_ERROR"
  }
}
```

### Common Error Codes

**Authentication Errors (401)**
- `MISSING_TOKEN` - Authorization header missing
- `INVALID_TOKEN` - Invalid or malformed JWT token
- `TOKEN_EXPIRED` - JWT token has expired
- `AUTH_FAILED` - Authentication failed or user not found

**Authorization Errors (403)**
- `ACCOUNT_INACTIVE` - User account has been deactivated
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions for this operation

**Validation Errors (400)**
- `VALIDATION_ERROR` - Request data validation failed
- `NO_FILE` - Required file not provided for upload
- `INVALID_FILE_TYPE` - File type not supported for upload

**Resource Errors (404)**
- `USER_NOT_FOUND` - User profile not found
- `NOT_FOUND` - Requested resource not found

**Server Errors (500)**
- `INTERNAL_ERROR` - Internal server error occurred
- `CONFIG_ERROR` - Server configuration error

### Validation Error Examples
```json
{
  "success": false,
  "error": {
    "message": "Full name must be between 2 and 100 characters",
    "code": "VALIDATION_ERROR"
  }
}
```

```json
{
  "success": false,
  "error": {
    "message": "Phone number format is invalid",
    "code": "VALIDATION_ERROR"
  }
}
```

```json
{
  "success": false,
  "error": {
    "message": "Invalid file type. Allowed types: image/jpeg, image/png, image/webp",
    "code": "INVALID_FILE_TYPE"
  }
}
```

## Rate Limiting Details

### Standard Endpoints
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Scope**: Per IP address
- **Affected Endpoints**: Profile get/update operations

### File Upload Endpoints
- **Window**: 10 minutes
- **Limit**: 5 uploads per IP
- **Scope**: Per IP address
- **Affected Endpoints**: Avatar upload

### Account Management Endpoints
- **Window**: 1 hour
- **Limit**: 2 requests per IP
- **Scope**: Per IP address
- **Affected Endpoints**: Account deactivation

### Rate Limit Headers
All responses include rate limiting information:
- `RateLimit-Limit` - The rate limit ceiling for the given request
- `RateLimit-Remaining` - The number of requests remaining in the current window
- `RateLimit-Reset` - The time at which the current window resets

### Rate Limit Exceeded Response
```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "10 minutes"
}
```

## File Upload Specifications

### Avatar Upload Requirements
- **Maximum File Size**: 5MB (5,242,880 bytes)
- **Supported Formats**: JPEG (.jpg, .jpeg), PNG (.png), WebP (.webp)
- **Processing**: Automatic resize to 300x300 pixels
- **Compression**: 90% JPEG quality for optimal balance of size and quality
- **Storage**: Secure cloud storage with CDN delivery

### File Validation Process
1. **File Type Check**: Validates MIME type against allowed formats
2. **Size Validation**: Ensures file doesn't exceed 5MB limit
3. **Content Validation**: Basic image content verification
4. **Security Scan**: Malware and suspicious content detection
5. **Processing**: Resize, optimize, and generate secure URL

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure Bearer token authentication with automatic validation
- **Session Management**: Token expiration handling and refresh capabilities
- **Account Protection**: Account deactivation with reason tracking
- **Access Control**: User-specific data access with company-level isolation

### Data Protection
- **Input Validation**: Comprehensive validation using Joi schemas
- **SQL Injection Protection**: Parameterized queries via Supabase client
- **File Security**: Malware scanning and content validation for uploads
- **Data Encryption**: All data encrypted in transit and at rest

### Privacy & Compliance
- **Data Minimization**: Only collect necessary user information
- **Secure Deletion**: Complete data removal on account deactivation
- **Audit Logging**: Comprehensive activity tracking for security
- **GDPR Compliance**: Data portability and deletion rights support

## Activity Logging

The system automatically tracks the following user activities for security and audit purposes:
- `profile_updated` - Profile information changes
- `avatar_uploaded` - Profile picture uploads
- `account_deactivated` - Account deactivation events
- `login_attempt` - Authentication attempts
- `password_reset` - Password reset requests
- `data_export` - Data export requests

## SDK Integration

### TypeScript/JavaScript Integration
```typescript
import { UserService } from '@/services/user.service';

// Get user profile
const profile = await UserService.getProfile();

// Update profile
const updatedProfile = await UserService.updateProfile({
  full_name: 'New Name',
  job_role: 'Senior Manager',
  phone: '+1-555-0199'
});

// Upload avatar
const avatarFile = /* File object */;
const uploadResult = await UserService.uploadAvatar(avatarFile);

// Deactivate account
await UserService.deactivateAccount({
  reason: 'not_using',
  feedback: 'Optional feedback message'
});
```

### Error Handling Best Practices
```typescript
try {
  const profile = await UserService.getProfile();
} catch (error) {
  if (error.response?.status === 401) {
    // Handle authentication failure
    redirectToLogin();
  } else if (error.response?.status === 404) {
    // Handle profile not found
    showNotFoundMessage();
  } else {
    // Handle other errors
    showErrorMessage(error.message);
  }
}
```

### File Upload with Validation
```typescript
// Validate file before upload
const file = fileInput.files[0];
const validation = UserService.validateAvatarFile(file);

if (!validation.isValid) {
  showError(validation.error);
  return;
}

// Upload with progress tracking
try {
  const result = await UserService.uploadAvatar(file);
  showSuccess('Avatar updated successfully');
} catch (error) {
  showError('Upload failed: ' + error.message);
}
```

## Performance & Scalability

### Response Times
- **Profile Operations**: < 200ms average response time
- **Avatar Upload**: < 5s for processing and storage
- **Database Queries**: Optimized with proper indexing

### Caching Strategy
- **Profile Data**: 5-minute cache for frequently accessed profiles
- **Avatar URLs**: CDN caching with 1-year expiry
- **Company Data**: 30-minute cache for company information

### Monitoring & Health
- **Health Checks**: `/health` endpoint for service monitoring
- **Metrics**: Request/response time tracking
- **Alerting**: Automatic notifications for service issues
- **Logging**: Structured logging for debugging and analysis

---

**Service URL**: `http://localhost:8002`  
**Health Check**: `GET /health`  
**API Documentation**: `http://localhost:8002/api-docs`
