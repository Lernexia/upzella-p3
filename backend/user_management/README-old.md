# User Management Service

A Node.js microservice for handling user profiles, authentication, preferences, and account management with comprehensive security features.

## 🚀 Overview

The User Management Service provides comprehensive user account management including profile updates, password changes, notification preferences, privacy settings, and activity logging. It offers secure RESTful APIs with JWT authentication and extensive user data management capabilities.

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT Bearer tokens
- **Validation**: Joi validation schemas
- **Testing**: Jest
- **Logging**: Winston
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer (for avatar uploads)
- **Image Processing**: Sharp (for avatar resizing)
- **Security**: bcrypt for password hashing

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project with database setup
- JWT secret for token validation

## 🏗 Installation

1. **Clone and navigate to the service:**
   ```bash
   cd backend/user_management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp env.example .env
   ```
   
   Configure the following variables:
   ```env
   PORT=8002
   NODE_ENV=development
   
   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Security
   JWT_SECRET=your_jwt_secret
   BCRYPT_ROUNDS=12
   
   # File Upload
   MAX_AVATAR_SIZE=5242880
   AVATAR_UPLOAD_PATH=uploads/avatars/
   ```

4. **Run the service:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   
   # Testing
   npm test
   ```

## 📁 Project Structure

```
src/
├── server.ts              # Main application entry point
├── controllers/
│   └── user.controller.ts  # User-related HTTP request handlers
├── db/
│   └── index.ts           # Database connection and client setup
├── middleware/
│   ├── auth.ts            # JWT authentication middleware
│   └── errorHandler.ts    # Global error handling middleware
├── routes/
│   └── user.routes.ts     # User API route definitions
├── services/
│   └── user.service.ts    # Business logic for user operations
├── utils/
│   └── logger.ts          # Winston logging configuration
├── validators/
│   └── userValidation.ts  # Joi validation schemas for user data
└── __tests__/
    └── user.test.ts       # Comprehensive test suites
```

### 📄 File Descriptions

- **`server.ts`**: Express application setup with middleware, routes, and error handling
- **`controllers/user.controller.ts`**: HTTP request/response handlers for user endpoints
- **`db/index.ts`**: Supabase client configuration and database connection
- **`middleware/auth.ts`**: JWT token validation and user authentication
- **`middleware/errorHandler.ts`**: Centralized error handling and response formatting
- **`routes/user.routes.ts`**: Express route definitions with middleware integration
- **`services/user.service.ts`**: Core business logic for user operations
- **`utils/logger.ts`**: Winston logger configuration for request/error logging
- **`validators/userValidation.ts`**: Joi schemas for request data validation

## 🔗 API Endpoints

For complete API documentation, see: [User Management API Documentation](../../api-docs-user-management.md)

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/users/profile` | Get user profile information |
| `PUT` | `/api/users/profile` | Update user profile |
| `POST` | `/api/users/upload-avatar` | Upload profile avatar |
| `POST` | `/api/users/change-password` | Change user password |
| `POST` | `/api/users/deactivate` | Deactivate user account |
| `GET` | `/api/users/notification-preferences` | Get notification preferences |
| `PUT` | `/api/users/notification-preferences` | Update notification preferences |
| `GET` | `/api/users/privacy-settings` | Get privacy settings |
| `PUT` | `/api/users/privacy-settings` | Update privacy settings |
| `GET` | `/api/users/activity-log` | Get user activity log |

### Key Features

- **Profile Management**: Complete user profile CRUD operations
- **Avatar Upload**: Image upload with automatic resizing to 300x300 pixels
- **Password Security**: Secure password changing with current password verification
- **Account Deactivation**: Safe account deactivation with reason tracking
- **Notification Control**: Granular notification preference management
- **Privacy Settings**: Comprehensive privacy control options
- **Activity Tracking**: Detailed user activity logging for security
- **Rate Limiting**: 100 requests per 15-minute window
- **Input Validation**: Comprehensive validation using Joi schemas



Test coverage includes:
- Profile management operations
- Authentication and authorization
- Password change functionality
- File upload handling
- Preferences and settings management
- Security validation scenarios

## 📊 Database Schema

The service uses the following main tables:

**Employers Table:**
- User profile information with company association
- Avatar storage with file URL references
- Account status and verification flags

**User Preferences Tables:**
- Notification preferences with granular controls
- Privacy settings for profile visibility
- Activity logs for security auditing

## 🔒 Security Features

- **JWT Authentication**: Bearer token validation for all protected endpoints
- **Password Hashing**: Bcrypt with configurable rounds for secure password storage
- **Rate Limiting**: Prevents API abuse with configurable limits
- **Input Validation**: Joi schemas validate all incoming data
- **File Validation**: Image type and size validation for avatar uploads
- **Activity Logging**: Comprehensive tracking of user actions for security
- **Account Protection**: Secure deactivation with password verification
- **SQL Injection Protection**: Parameterized queries via Supabase client


## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 8002)
- `NODE_ENV`: Environment mode (development/production/test)
- `SUPABASE_*`: Database connection configuration
- `JWT_SECRET`: Token signing secret
- `BCRYPT_ROUNDS`: Password hashing complexity
- `MAX_AVATAR_SIZE`: Maximum avatar file size
- `AVATAR_UPLOAD_PATH`: Avatar storage path

### Rate Limiting
- Standard endpoints: 100 requests/15 minutes
- File upload endpoints: 10 requests/15 minutes

### Avatar Upload Specifications
- **Maximum file size**: 5MB
- **Supported formats**: JPEG, PNG, WebP
- **Automatic resize**: 300x300 pixels
- **Quality**: 90% JPEG compression
- **Storage**: Supabase Storage with public read access

## 📝 Logging

Winston logger with multiple transports:
- Console output for development
- File logging (`logs/combined.log`, `logs/error.log`)
- Structured JSON format for production
- Activity logging for user actions

### Activity Log Actions

The system automatically logs:
- `profile_updated` - Profile information changes
- `avatar_uploaded` - Profile picture uploads  
- `password_changed` - Password modifications
- `preferences_updated` - Notification preference changes
- `privacy_updated` - Privacy setting modifications
- `account_deactivated` - Account deactivation events
- `login` - User authentication events
- `logout` - User session termination

## 🔐 Privacy & Security

### Privacy Controls
- **Profile Visibility**: Public, private, or company-only access
- **Contact Information**: Selective email and phone visibility
- **Communication**: Opt-in/out contact preferences

### Security Measures
- **Password Requirements**: Configurable complexity rules
- **Session Management**: JWT token expiration handling
- **Account Deactivation**: Secure process with reason tracking
- **Activity Monitoring**: Comprehensive action logging with IP tracking

---

**Service URL**: `http://localhost:8002`  
**Health Check**: `GET /health`  
**Documentation**: [API Documentation](../../api-docs-user-management.md)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload profile picture
- `POST /api/users/change-password` - Change password
- `GET/PUT /api/users/notification-preferences` - Notification settings
- `GET/PUT /api/users/privacy-settings` - Privacy settings
- `POST /api/users/deactivate` - Deactivate account
- `GET /api/users/activity-log` - Activity log

## Support

For issues and feature requests, please refer to the project documentation.
