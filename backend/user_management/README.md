# User Management Service

A streamlined user management service for Upzella providing core profile management and security features.

## Features

- **Profile Management**: Update user information, upload profile pictures
- **Security**: Password changes, account deactivation
- **File Uploads**: Handle profile picture uploads with image processing
- **Authentication**: JWT-based authentication and user verification

## Quick Start

### Prerequisites

- Node.js 18+
- TypeScript
- Supabase account with database setup

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Update .env with your configuration
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
# JWT_SECRET=your_jwt_secret_key

# Build and run
npm run build
npm start

# For development
npm run dev
```

### Environment Variables

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=3002
UPLOAD_MAX_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

## API Documentation

The API documentation is available at:
- Development: `http://localhost:3002/api-docs`
- Swagger/OpenAPI specification included

## Database Schema

The service uses the following tables:
- `employers` - User profiles (existing)
- `notification_preferences` - User notification settings
- `privacy_settings` - User privacy preferences
- `activity_log` - User activity tracking
- `account_feedback` - User feedback on account changes

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Architecture

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and database operations
- **Middleware**: Authentication, error handling, file uploads
- **Validators**: Input validation using Joi
- **Utils**: Logging, file processing utilities

## Security Features

- JWT token authentication
- Row Level Security (RLS) in Supabase
- Input validation and sanitization
- Rate limiting
- Secure file uploads with type validation
- Image processing and optimization

## Deployment

The service is containerized and ready for deployment to any Node.js hosting platform.

## API Endpoints

- `GET /health` - Health check
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
