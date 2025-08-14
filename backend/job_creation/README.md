# Job Creation Service

An advanced Node.js microservice for intelligent job posting management with AI-powered content extraction and automated resume scoring using Google Gemini AI.

## 🚀 Service Overview

The Job Creation Service is a sophisticated microservice that revolutionizes job posting management through artificial intelligence and advanced data processing. It provides comprehensive CRUD operations, intelligent job description extraction, automated resume scoring criteria generation, and flexible job lifecycle management.

### 🎯 Core Capabilities

- **🤖 AI-Powered Extraction**: Intelligent parsing of unstructured job descriptions using Google Gemini AI
- **📊 Smart Resume Scoring**: Automated generation of weighted scoring criteria with business justifications
- **🔄 Flexible Job Lifecycle**: Draft, published, paused, and closed status management
- **🏢 Multi-Company Support**: Secure data isolation with Row Level Security
- **📈 Advanced Data Model**: JSONB fields for complex data without schema migrations
- **🔍 Intelligent Search**: Advanced filtering and pagination capabilities
- **✅ Contextual Validation**: Smart validation rules based on job publication status
- **📁 File Processing**: Support for PDF, DOCX, and TXT job description uploads

## 🛠 Advanced Tech Stack

### Core Technologies
- **Runtime**: Node.js 18+ with TypeScript for type safety and modern development
- **Framework**: Express.js with comprehensive middleware ecosystem
- **Database**: Supabase PostgreSQL 17.4.1 with advanced JSONB support and Row Level Security
- **AI Integration**: Google Gemini AI via Vertex AI for intelligent content processing
- **Authentication**: JWT Bearer tokens with automatic validation middleware
- **Validation**: Joi schemas with contextual validation rules
- **Testing**: Jest with comprehensive test coverage
- **Logging**: Winston with structured logging and multiple transports
- **Rate Limiting**: express-rate-limit with configurable policies
- **File Handling**: Multer for secure multipart form data processing
- **API Documentation**: Swagger/OpenAPI 3.0 with interactive documentation

### Service-Specific Features
- **AI Request Management**: Retry logic, timeout handling, and error recovery
- **File Type Detection**: MIME type validation and content analysis
- **Performance Optimization**: Connection pooling and query optimization
- **Security**: Input sanitization, rate limiting, and secure file handling
- **Monitoring**: Health checks with detailed service status reporting

## 📋 Prerequisites & Requirements

### System Requirements
- **Node.js**: Version 18+ with npm, yarn, or pnpm package manager
- **Database**: Active Supabase project with PostgreSQL 17.4.1+
- **AI Services**: Google Cloud Project with Vertex AI API enabled
- **Development Environment**: VS Code with TypeScript extensions recommended
- **Memory**: Minimum 2GB RAM for AI processing tasks
- **Storage**: 1GB+ available for logs and temporary file processing

### External Service Dependencies
- **Supabase**: PostgreSQL database with Row Level Security configured
- **Google Cloud**: Vertex AI service for Gemini AI model access
- **JWT Provider**: For authentication token validation (shared with user management service)

## 🏗 Installation & Setup

### 1. Environment Preparation
```bash
# Navigate to service directory
cd backend/job_creation

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
PORT=8001                              # Service port number
SERVICE_NAME=job_creation              # Service identifier for logging

# === Database Configuration ===
DATABASE_URL=postgresql://user:pass@host:port/db  # Full Supabase database URL
SUPABASE_URL=https://your-project.supabase.co     # Supabase project URL
SUPABASE_ANON_KEY=your_anon_key                   # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Service role key for admin operations

# === AI Service Configuration (Google Vertex AI) ===
GOOGLE_PROJECT_ID=your-google-project-id          # Google Cloud project ID
GOOGLE_LOCATION=us-central1                       # Vertex AI location (us-central1 recommended)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json  # Service account key file path

# === Security Configuration ===
JWT_SECRET=your-jwt-secret-key                     # JWT signing key (minimum 32 characters)
JWT_EXPIRES_IN=7d                                 # Token expiration time

# === Logging Configuration ===
LOG_LEVEL=info                         # Logging level: error/warn/info/debug
LOG_FILE_PATH=./logs                   # Log file directory path
LOG_MAX_FILES=10                       # Maximum log file retention count
LOG_MAX_SIZE=5m                        # Maximum log file size

# === API Configuration ===
API_RATE_LIMIT_WINDOW_MS=900000        # Rate limit window (15 minutes)
API_RATE_LIMIT_MAX_REQUESTS=100        # Maximum requests per window
MAX_FILE_SIZE=10485760                 # Maximum upload size (10MB)
ALLOWED_FILE_TYPES=pdf,docx,txt        # Allowed file extensions

# === AI Processing Configuration ===
AI_REQUEST_TIMEOUT=30000               # AI request timeout (30 seconds)
AI_MAX_RETRY_ATTEMPTS=3                # Maximum retry attempts for AI requests
AI_TEMPERATURE=0.3                     # AI response creativity (0.0-1.0)
```

### 3. Google Cloud Setup
```bash
# Create and configure Google Cloud project
gcloud projects create your-project-id
gcloud config set project your-project-id

# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable compute.googleapis.com

# Create service account
gcloud iam service-accounts create upzella-ai-service
gcloud iam service-accounts keys create key.json \
  --iam-account=upzella-ai-service@your-project-id.iam.gserviceaccount.com

# Grant necessary permissions
gcloud projects add-iam-policy-binding your-project-id \
  --member="serviceAccount:upzella-ai-service@your-project-id.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
```

## 🏛 Advanced Project Structure

```
src/
├── server.ts              # 🚀 Main application entry point with Express setup
├── controllers/
│   └── jobs.controller.ts  # 🎛️ HTTP request handlers with error management
├── db/
│   ├── index.ts           # 🗄️ Supabase client configuration and connection
│   └── migrations.sql     # 📊 Database schema with JSONB optimizations
├── middleware/
│   ├── auth.ts            # 🔐 JWT authentication with token validation
│   └── errorHandler.ts    # 🚨 Comprehensive error handling and logging
├── routes/
│   └── jobs.routes.ts     # 🛣️ RESTful API route definitions with validation
├── services/
│   ├── ai.service.ts      # 🤖 Google Gemini AI integration with retry logic
│   └── jobs.service.ts    # 🏢 Business logic with data transformation
├── utils/
│   └── logger.ts          # 📝 Winston logging with multiple transports
├── validators/
│   └── jobValidation.ts   # ✅ Joi schemas with contextual validation
└── __tests__/
    ├── setup.ts           # 🧪 Test environment configuration
    └── jobs.test.ts       # 🔬 Comprehensive test suites with mocking
```

### 📄 Detailed Component Descriptions

**Core Application (`server.ts`)**:
- Express application configuration with security middleware
- CORS setup for cross-origin requests
- Rate limiting and request size limits
- Health check endpoints with service status
- Graceful shutdown handling and cleanup

**Request Controllers (`controllers/jobs.controller.ts`)**:
- HTTP request/response handling with proper status codes
- Input validation and sanitization
- Error handling with detailed error messages
- Response formatting and data transformation
- Pagination and filtering logic

**Database Layer (`db/index.ts`, `migrations.sql`)**:
- Supabase client configuration with connection pooling
- Row Level Security policies for multi-tenant data isolation
- JSONB field optimization for complex data structures
- Migration scripts with rollback capabilities
- Database health monitoring and connection management

**Authentication Middleware (`middleware/auth.ts`)**:
- JWT token validation and decoding
- User context extraction and injection
- Permission-based access control
- Token refresh and expiration handling
- Security logging and audit trails

**AI Integration (`services/ai.service.ts`)**:
- Google Gemini AI model configuration and management
- Intelligent prompt engineering for job extraction
- Error handling and retry logic for AI requests
- Response parsing and validation
- Performance monitoring and optimization

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
curl http://localhost:8001/health
```

### Testing & Quality
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### Database Operations
```bash
# Run database migrations
npm run migrate

# Seed database with test data
npm run seed

# Backup database
npm run db:backup

# Restore database
npm run db:restore
```

## 📚 API Endpoints Overview

### 🔍 Health & Status
- `GET /health` - Comprehensive service health check with dependencies
- `GET /api-docs` - Interactive Swagger API documentation

### 📋 Job Management
- `POST /api/jobs` - Create job postings (draft or published)
- `GET /api/jobs` - List jobs with advanced filtering and pagination
- `GET /api/jobs/{id}` - Get detailed job information
- `PUT /api/jobs/{id}` - Update job details with contextual validation
- `DELETE /api/jobs/{id}` - Permanently delete job postings

### 🤖 AI-Powered Features
- `POST /api/jobs/ai-extract` - Extract structured job data from unstructured text
- `POST /api/jobs/{id}/generate-scoring` - Generate AI-powered resume scoring criteria

For complete API documentation with request/response examples, visit: `http://localhost:8001/api-docs`

## 🧪 Testing Strategy

### Test Coverage Areas
- **Unit Tests**: Individual function and method validation
- **Integration Tests**: Complete API endpoint testing with real database
- **AI Service Tests**: Mocked AI responses and error handling
- **Authentication Tests**: JWT validation and security scenarios
- **File Processing Tests**: Upload validation and processing workflows
- **Database Tests**: Data integrity and Row Level Security validation

### Test Data Management
- **Test Database**: Isolated test environment with sample data
- **Mock Services**: AI service mocking for consistent testing
- **Fixtures**: Reusable test data and scenarios
- **Cleanup**: Automated test data cleanup after test runs

### Performance Testing
```bash
# Load testing with Artillery
npm run test:load

# Memory usage testing
npm run test:memory

# Database performance testing
npm run test:db-performance
```

## 🔧 Configuration Management

### Environment-Specific Configurations

**Development Environment**:
- Enhanced logging for debugging
- Hot reload for rapid development
- Mock AI responses for faster testing
- Relaxed rate limiting for development

**Production Environment**:
- Minimal logging for performance
- Connection pooling optimization
- Real AI service integration
- Strict rate limiting and security measures
- Health monitoring and alerting

### Security Configuration
- **CORS**: Configured for specific frontend domains
- **Rate Limiting**: Progressive rate limiting based on endpoint type
- **Input Validation**: Comprehensive input sanitization and validation
- **File Security**: MIME type validation and malware scanning
- **Authentication**: JWT token validation with automatic refresh

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
    "ai_service": "healthy"
  },
  "metrics": {
    "total_requests": 15432,
    "avg_response_time": "245ms",
    "error_rate": "0.2%",
    "memory_usage": "156MB"
  }
}
```

### Logging Structure
- **Request Logs**: HTTP requests with timing and user context
- **Error Logs**: Detailed error information with stack traces
- **Performance Logs**: Response times and resource usage
- **Security Logs**: Authentication attempts and security events
- **AI Logs**: AI service requests and responses for debugging

### Metrics & Analytics
- **Performance Metrics**: Response times, throughput, error rates
- **Business Metrics**: Job creation trends, AI usage statistics
- **Security Metrics**: Authentication success/failure rates
- **Resource Metrics**: Memory usage, CPU utilization, database connections

## 🚀 Deployment Guide

### Production Deployment Checklist
- [ ] Environment variables configured for production
- [ ] Database connection pool optimized for load
- [ ] JWT secrets rotated and secured
- [ ] AI service quotas and rate limits configured
- [ ] Logging level set to 'info' or 'warn'
- [ ] Health check endpoints verified
- [ ] CORS policies configured for production domains
- [ ] Rate limiting tuned for expected load
- [ ] SSL/TLS certificates configured
- [ ] Monitoring and alerting configured

### Container Deployment
```dockerfile
# Dockerfile for production deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 8001
CMD ["node", "dist/server.js"]
```

### Kubernetes Configuration
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: job-creation-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: job-creation-service
  template:
    metadata:
      labels:
        app: job-creation-service
    spec:
      containers:
      - name: job-creation
        image: upzella/job-creation:latest
        ports:
        - containerPort: 8001
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## 🛡️ Security Best Practices

### Data Protection
- **Encryption**: All data encrypted at rest and in transit
- **Row Level Security**: Database-level data isolation
- **Input Sanitization**: Comprehensive input validation and sanitization
- **File Security**: MIME type validation and content scanning
- **Audit Logging**: Complete audit trail of all data access and modifications

### Authentication & Authorization
- **JWT Validation**: Automatic token validation on all protected routes
- **Role-Based Access**: Company-based data isolation
- **Token Refresh**: Automatic token refresh for seamless user experience
- **Rate Limiting**: Protective rate limiting to prevent abuse
- **CORS Protection**: Strict CORS policies for cross-origin requests

### AI Security
- **Prompt Injection Protection**: Input sanitization for AI requests
- **Response Validation**: AI response validation and sanitization
- **Rate Limiting**: AI-specific rate limiting to control costs
- **Error Handling**: Secure error handling that doesn't expose sensitive information
- **Audit Trail**: Complete logging of AI requests and responses

## 🤝 Contributing & Support

### Development Workflow
1. **Fork & Clone**: Fork repository and clone locally
2. **Branch**: Create feature branch from main
3. **Develop**: Implement feature with comprehensive tests
4. **Test**: Run full test suite and ensure coverage
5. **Document**: Update documentation and API specs
6. **PR**: Submit pull request with detailed description

### Code Standards
- **TypeScript**: Strict TypeScript with comprehensive type definitions
- **ESLint**: Follow established linting rules and patterns
- **Prettier**: Use Prettier for consistent code formatting
- **Testing**: Maintain minimum 80% test coverage
- **Documentation**: Update documentation for all changes
- **Security**: Follow security best practices and guidelines

### Issue Reporting
When reporting issues, please include:
- Service version and environment details
- Detailed steps to reproduce the issue
- Expected vs actual behavior
- Error messages and logs
- System specifications and dependencies

---

## 🔗 Related Resources

- 📚 **[Job Creation API Documentation](../../api-docs-jobcreation.md)** - Complete API reference
- 📊 **[Database Schema Documentation](../../db.md)** - Database structure and relationships
- 🏗️ **[Backend Architecture Documentation](../README.md)** - Overall backend architecture
- 🎨 **[Frontend Documentation](../../employer/README.md)** - Frontend application integration

For questions, support, or contributions, please contact the development team or create an issue in the project repository.
