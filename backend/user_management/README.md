# User Management Service

An advanced Node.js microservice for comprehensive user account management with secure profile handling, avatar processing, and account administration features.

## 🚀 Service Overview

The User Management Service provides sophisticated user account administration with a focus on security, privacy, and user experience. It handles profile management, avatar processing with image optimization, secure account operations, and comprehensive activity logging.

### 🎯 Core Capabilities

- **👤 Profile Management**: Comprehensive user information management with company association
- **🖼️ Avatar Processing**: Professional image upload with automatic optimization and resizing
- **🔐 Account Security**: Secure account deactivation with feedback collection and audit trails
- **📊 Activity Logging**: Detailed user action tracking for security and analytics
- **🛡️ Data Protection**: Advanced input validation and secure data handling
- **🏢 Multi-Company Support**: Company-based data isolation with Row Level Security
- **⚡ Performance Optimization**: Efficient file processing with progress tracking
- **🔍 Privacy Controls**: Comprehensive privacy settings and data management

## 🛠 Advanced Tech Stack

### Core Technologies
- **Runtime**: Node.js 18+ with TypeScript for type safety and modern development
- **Framework**: Express.js with comprehensive middleware ecosystem
- **Database**: Supabase PostgreSQL 17.4.1 with Row Level Security and JSONB support
- **Authentication**: JWT Bearer tokens with automatic validation middleware
- **Validation**: Joi schemas with detailed error messaging and contextual rules
- **Testing**: Jest with comprehensive test coverage and mocking
- **Logging**: Winston with structured logging and multiple transports
- **Rate Limiting**: express-rate-limit with progressive policies
- **File Handling**: Multer for secure multipart form data processing
- **Image Processing**: Sharp for high-performance image manipulation and optimization

### Service-Specific Features
- **Image Optimization**: Automatic resizing, format conversion, and compression
- **Security-First Design**: Multi-layer security with input sanitization and content validation
- **File Validation**: Comprehensive MIME type and content analysis
- **Performance Monitoring**: Response time tracking and resource usage optimization
- **Error Recovery**: Graceful error handling with detailed user feedback

## 📋 Prerequisites & Requirements

### System Requirements
- **Node.js**: Version 18+ with npm, yarn, or pnpm package manager
- **Database**: Active Supabase project with PostgreSQL 17.4.1+
- **File System**: Adequate storage for avatar uploads and processing
- **Development Environment**: VS Code with TypeScript extensions recommended
- **Memory**: Minimum 1GB RAM for image processing tasks
- **Storage**: 500MB+ available for uploads and logs

### External Service Dependencies
- **Supabase**: PostgreSQL database with Row Level Security configured
- **JWT Provider**: For authentication token validation (shared with job creation service)
- **File Storage**: Local or cloud storage for avatar images

## 🏗 Installation & Setup

### 1. Environment Preparation
```bash
# Navigate to service directory
cd backend/user_management

# Install all dependencies
npm install

# Copy environment template
cp env.example .env
```

### 2. Environment Configuration
Configure the following variables in your `.env` file:

```env
# === Core Service Configuration ===
NODE_ENV=development                    # Environment: development/production
PORT=8002                              # Service port number
SERVICE_NAME=user_management           # Service identifier for logging

# === Database Configuration ===
DATABASE_URL=postgresql://user:pass@host:port/db  # Full Supabase database URL
SUPABASE_URL=https://your-project.supabase.co     # Supabase project URL
SUPABASE_ANON_KEY=your_anon_key                   # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Service role key for admin operations

# === Security Configuration ===
JWT_SECRET=your-jwt-secret-key         # JWT signing key (must match job creation service)
JWT_EXPIRES_IN=7d                      # Token expiration time
BCRYPT_SALT_ROUNDS=12                  # Password hashing strength

# === File Processing Configuration ===
UPLOAD_DIR=./uploads                   # File upload directory
MAX_FILE_SIZE=5242880                  # Maximum avatar size (5MB)
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif   # Allowed image extensions
AVATAR_WIDTH=300                       # Avatar resize width (pixels)
AVATAR_HEIGHT=300                      # Avatar resize height (pixels)
AVATAR_QUALITY=80                      # JPEG compression quality (1-100)

# === Advanced Security Configuration ===
RATE_LIMIT_WINDOW_MS=900000           # Rate limit window (15 minutes)
RATE_LIMIT_MAX_REQUESTS=50            # Maximum requests per window
ACCOUNT_LOCKOUT_ATTEMPTS=5            # Maximum failed attempts before lockout
ACCOUNT_LOCKOUT_DURATION=1800000      # Lockout duration (30 minutes)

# === Image Processing Configuration ===
SHARP_PROGRESSIVE=true                 # Progressive JPEG encoding
SHARP_OPTIMIZE_SCANS=true             # Optimize JPEG scans for faster loading
SHARP_STRIP_METADATA=true             # Remove image metadata for privacy
SHARP_BACKGROUND_COLOR=#ffffff        # Background color for transparent images

# === Logging Configuration ===
LOG_LEVEL=info                         # Logging level: error/warn/info/debug
LOG_FILE_PATH=./logs                   # Log file directory path
LOG_MAX_FILES=10                       # Maximum log file retention count
LOG_MAX_SIZE=5m                        # Maximum log file size
```

### 3. Directory Structure Setup
```bash
# Create required directories
mkdir -p uploads/avatars
mkdir -p logs
mkdir -p temp

# Set appropriate permissions
chmod 755 uploads
chmod 755 logs
chmod 700 temp
```

## 🏛 Advanced Project Structure

```
src/
├── server.ts              # 🚀 Main application entry point with Express setup
├── controllers/
│   └── users.controller.ts # 🎛️ HTTP request handlers for user operations
├── db/
│   └── index.ts           # 🗄️ Supabase client configuration and connection
├── middleware/
│   ├── auth.ts            # 🔐 JWT authentication with token validation
│   ├── errorHandler.ts    # 🚨 Comprehensive error handling and logging
│   └── upload.ts          # 📁 Multer configuration for file uploads
├── routes/
│   └── users.routes.ts    # 🛣️ RESTful API route definitions with validation
├── services/
│   ├── users.service.ts   # 👥 Business logic for user operations
│   └── upload.service.ts  # 🖼️ File processing and image optimization
├── utils/
│   ├── logger.ts          # 📝 Winston logging with multiple transports
│   └── validation.ts      # ✅ Custom validation utilities
├── validators/
│   └── userValidation.ts  # 📋 Joi schemas for user data validation
└── __tests__/
    ├── setup.ts           # 🧪 Test environment configuration
    ├── users.test.ts      # 🔬 User management test suites
    └── upload.test.ts     # 📸 File upload and processing tests
```

### 📄 Detailed Component Descriptions

**Core Application (`server.ts`)**:
- Express application configuration with security middleware
- CORS setup for secure cross-origin requests
- Rate limiting and request size limits
- Health check endpoints with detailed service status
- Graceful shutdown handling with cleanup procedures

**Request Controllers (`controllers/users.controller.ts`)**:
- HTTP request/response handling with proper status codes
- Comprehensive input validation and sanitization
- Detailed error handling with user-friendly messages
- Response formatting and data transformation
- File upload progress tracking and error recovery

**Database Layer (`db/index.ts`)**:
- Supabase client configuration with connection pooling
- Row Level Security policies for user data isolation
- Optimized queries for user profile operations
- Database health monitoring and connection management
- Transaction handling for complex operations

**Authentication Middleware (`middleware/auth.ts`)**:
- JWT token validation and decoding with error handling
- User context extraction and injection into requests
- Company-based access control and data filtering
- Token refresh and expiration handling
- Security logging and audit trail generation

**File Processing Services (`services/upload.service.ts`)**:
- Advanced image processing with Sharp library
- Automatic resizing and optimization for web delivery
- MIME type validation and security checks
- Progress tracking for large file uploads
- Cleanup procedures for failed uploads

## 🚀 Development Commands

### Quick Start
```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Production start
npm start

# Health check
curl http://localhost:8002/health
```

### Testing & Quality
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Integration tests
npm run test:integration

# Load testing
npm run test:load

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### File Management
```bash
# Clean upload directories
npm run clean:uploads

# Optimize existing avatars
npm run optimize:avatars

# Generate file statistics
npm run stats:files

# Backup user data
npm run backup:users
```

## 📚 API Endpoints Overview

### 🔍 Health & Status
- `GET /health` - Comprehensive service health check with dependency status
- `GET /api-docs` - Interactive Swagger API documentation

### 👤 Profile Management
- `GET /api/users/profile` - Get comprehensive user profile with company details
- `PUT /api/users/profile` - Update user profile information with validation

### 🖼️ Avatar Management
- `POST /api/users/upload-avatar` - Upload and process profile avatars with optimization

### 🔐 Account Administration  
- `POST /api/users/deactivate` - Secure account deactivation with feedback collection

### 📊 User Analytics
- `GET /api/users/activity-summary` - Get user activity overview (admin only)
- `GET /api/users/statistics` - Get user engagement statistics (admin only)

For complete API documentation with request/response examples, visit: `http://localhost:8002/api-docs`

## 🧪 Comprehensive Testing Strategy

### Test Coverage Areas
- **Unit Tests**: Individual function and method validation
- **Integration Tests**: Complete API endpoint testing with real database
- **File Processing Tests**: Upload validation, image processing, and optimization
- **Authentication Tests**: JWT validation and security scenarios
- **Database Tests**: Data integrity and Row Level Security validation
- **Performance Tests**: Response time and resource usage optimization
- **Security Tests**: Input validation and injection protection

### Test Data Management
- **Test Database**: Isolated test environment with sanitized sample data
- **Mock Services**: External service mocking for consistent testing
- **Fixtures**: Reusable test data and user scenarios
- **Cleanup**: Automated test data and file cleanup after test runs
- **Seeding**: Automated test data seeding for integration tests

### Advanced Testing Features
```bash
# Visual regression testing for avatars
npm run test:visual

# Performance benchmarking
npm run test:benchmark

# Memory leak detection
npm run test:memory

# Security vulnerability scanning
npm run test:security
```

## 🔧 Configuration Management

### Environment-Specific Configurations

**Development Environment**:
- Enhanced logging for debugging
- Hot reload for rapid development
- Relaxed file size limits for testing
- Mock services for external dependencies
- Detailed error messages

**Production Environment**:
- Minimal logging for performance
- Strict file validation and security
- Connection pooling optimization
- Real service integration
- Sanitized error messages for security

### Security Configuration
- **CORS**: Configured for specific frontend domains only
- **Rate Limiting**: Progressive rate limiting based on user behavior
- **Input Validation**: Comprehensive input sanitization and validation
- **File Security**: MIME type validation and malware scanning
- **Authentication**: JWT token validation with automatic refresh handling

## 📊 Monitoring & Observability

### Health Monitoring
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T10:30:00Z",
  "uptime": "2d 4h 30m",
  "version": "1.0.0",
  "environment": "production",
  "dependencies": {
    "database": "healthy",
    "file_system": "healthy"
  },
  "metrics": {
    "total_requests": 8743,
    "avg_response_time": "125ms",
    "error_rate": "0.1%",
    "memory_usage": "89MB",
    "active_users": 142,
    "avatar_uploads_today": 23
  }
}
```

### Detailed Logging Structure
- **Request Logs**: HTTP requests with user context and timing
- **Error Logs**: Comprehensive error information with stack traces
- **Security Logs**: Authentication attempts and security events
- **File Logs**: Upload attempts, processing status, and errors
- **Performance Logs**: Response times and resource usage tracking
- **User Activity Logs**: Profile updates, login events, and feature usage

### Performance Metrics
- **Response Time**: Average and percentile response times per endpoint
- **Throughput**: Requests per second and concurrent user handling
- **Resource Usage**: Memory consumption and CPU utilization
- **File Processing**: Upload success rates and processing times
- **Error Rates**: Error frequency by type and endpoint
- **User Engagement**: Profile update frequency and feature adoption

## 🚀 Deployment Guide

### Production Deployment Checklist
- [ ] Environment variables configured for production
- [ ] Database connection pool optimized for expected load
- [ ] JWT secrets rotated and secured in environment
- [ ] File upload limits configured appropriately
- [ ] Avatar processing optimized for performance
- [ ] Rate limiting configured for production traffic
- [ ] Logging level set appropriately for production
- [ ] Health check endpoints verified and monitored
- [ ] CORS policies configured for production domains
- [ ] SSL/TLS certificates configured and verified
- [ ] File system permissions configured securely
- [ ] Backup and recovery procedures tested

### Container Deployment
```dockerfile
# Multi-stage Dockerfile for production deployment
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
RUN mkdir -p uploads/avatars logs temp
RUN chown -R node:node uploads logs temp
USER node
EXPOSE 8002
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8002/health || exit 1
CMD ["node", "dist/server.js"]
```

### Kubernetes Configuration
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-management-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: user-management-service
  template:
    metadata:
      labels:
        app: user-management-service
    spec:
      containers:
      - name: user-management
        image: upzella/user-management:latest
        ports:
        - containerPort: 8002
        env:
        - name: NODE_ENV
          value: "production"
        volumeMounts:
        - name: uploads-volume
          mountPath: /app/uploads
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8002
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8002
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: uploads-volume
        persistentVolumeClaim:
          claimName: user-uploads-pvc
```

## 🛡️ Security Best Practices

### Data Protection
- **Encryption**: All data encrypted at rest and in transit
- **Row Level Security**: Database-level user data isolation
- **Input Sanitization**: Comprehensive input validation and sanitization
- **File Security**: MIME type validation and content scanning for malware
- **Privacy Protection**: Automatic metadata removal from uploaded images
- **Audit Logging**: Complete audit trail of all user data access and modifications

### Authentication & Authorization
- **JWT Validation**: Automatic token validation on all protected routes
- **Company-Based Access**: User data isolation based on company association
- **Token Management**: Secure token refresh and expiration handling
- **Rate Limiting**: Protective rate limiting to prevent abuse and brute force attacks
- **Session Management**: Secure session handling with automatic cleanup

### File Upload Security
- **Type Validation**: Strict MIME type and file extension validation
- **Size Limits**: Configurable file size limits to prevent abuse
- **Content Scanning**: Basic content validation to detect malicious files
- **Secure Storage**: Isolated file storage with restricted access permissions
- **Processing Security**: Safe image processing with error handling and cleanup

## 🤝 Contributing & Support

### Development Workflow
1. **Fork & Clone**: Fork repository and clone locally
2. **Branch**: Create feature branch from main
3. **Develop**: Implement feature with comprehensive tests
4. **Test**: Run full test suite including integration tests
5. **Document**: Update documentation and API specifications
6. **Security Review**: Ensure security best practices are followed
7. **PR**: Submit pull request with detailed description and screenshots

### Code Standards
- **TypeScript**: Strict TypeScript with comprehensive type definitions
- **ESLint**: Follow established linting rules and security patterns
- **Prettier**: Use Prettier for consistent code formatting
- **Testing**: Maintain minimum 85% test coverage
- **Documentation**: Update documentation for all user-facing changes
- **Security**: Follow OWASP security guidelines and best practices

### Performance Guidelines
- **Image Optimization**: Ensure all image processing is optimized for web delivery
- **Memory Management**: Implement proper cleanup for file processing operations
- **Database Queries**: Optimize database queries for performance
- **Caching**: Implement appropriate caching strategies for frequently accessed data
- **Error Handling**: Implement graceful error handling that doesn't impact performance

### Issue Reporting
When reporting issues, please include:
- Service version and environment details
- User agent and browser information (for file upload issues)
- Detailed steps to reproduce the issue
- Expected vs actual behavior
- Error messages, logs, and stack traces
- File types and sizes (for upload-related issues)
- Screenshots or recordings where applicable

---

## 🔗 Related Resources

- 📚 **[User Management API Documentation](../../api-docs-user-management.md)** - Complete API reference
- 📊 **[Database Schema Documentation](../../db.md)** - Database structure and relationships
- 🏗️ **[Backend Architecture Documentation](../README.md)** - Overall backend architecture overview
- 🔧 **[Job Creation Service](../job_creation/README.md)** - Related job creation service
- 🎨 **[Frontend Documentation](../../employer/README.md)** - Frontend application integration

For questions, support, or contributions, please contact the development team or create an issue in the project repository.
