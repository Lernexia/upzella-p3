# Upzella Backend Services

A sophisticated microservices architecture for Upzella's recruitment platform providing comprehensive job management and user administration capabilities with AI-powered features.

## 🏗 Architecture Overview

The backend is structured as independent, scalable microservices, each handling specific business domains with dedicated databases and APIs:

```
backend/
├── job_creation/          # Job Management Service (Port: 8001)
├── user_management/       # User Administration Service (Port: 8002)
└── README.md             # This file
```

## 🚀 Services Overview

### 🔧 Job Creation Service
**Port**: `8001` | **Path**: `job_creation/` | **API Docs**: `/api-docs`

Advanced job management service with AI-powered content processing and intelligent resume scoring:

- **Core Features**: Complete CRUD operations for job postings with draft/published workflow
- **AI Integration**: Google Gemini AI for intelligent job description extraction and analysis
- **Smart Resume Scoring**: Configurable, weighted criteria system for automated candidate evaluation
- **Enhanced Data Model**: Advanced JSON-based fields for location, salary, experience, and scoring details
- **Status Management**: Draft, published, paused, and closed job lifecycle management
- **Validation System**: Contextual validation rules based on job publication status
- **Tech Stack**: Express.js, TypeScript, Supabase, Google Gemini AI, Winston, Joi validation

**Key Endpoints**:
- `GET /health` - Service health check with environment info
- `POST /api/jobs` - Create job postings (draft or published)
- `POST /api/jobs/ai-extract` - AI-powered job description extraction
- `GET /api/jobs` - List jobs with advanced pagination and filtering
- `GET /api/jobs/{id}` - Get detailed job information
- `PUT /api/jobs/{id}` - Update job details with smart validation
- `DELETE /api/jobs/{id}` - Permanently delete job postings

**Advanced Features**:
- **AI-Powered Extraction**: Automatically parse unstructured job descriptions
- **Smart Field Detection**: Intelligent identification of skills, salary ranges, locations
- **Resume Scoring Generation**: AI-generated scoring criteria with business justifications
- **Flexible Data Structure**: JSONB fields for complex data without schema migrations
- **Company Data Isolation**: Row Level Security ensuring data privacy

📋 **Documentation**: [Job Creation API Docs](../api-docs-jobcreation.md)

---

### 👥 User Management Service
**Port**: `8002` | **Path**: `user_management/` | **API Docs**: `/api-docs`

Comprehensive user account management service with profile management, security features, and file handling:

- **Profile Management**: Complete user information management with company association
- **Avatar Management**: Professional image upload with automatic resizing and optimization
- **Account Security**: Secure account deactivation with reason tracking and feedback collection
- **Activity Logging**: Comprehensive user action tracking for security and analytics
- **File Processing**: Advanced image processing with validation, resizing, and secure storage
- **Data Validation**: Robust input validation with detailed error messaging
- **Tech Stack**: Express.js, TypeScript, Supabase, Sharp (image processing), Winston, Joi validation

**Key Endpoints**:
- `GET /health` - Service health check with version information
- `GET /api/users/profile` - Get comprehensive user profile with company details
- `PUT /api/users/profile` - Update user profile information
- `POST /api/users/upload-avatar` - Upload and process profile avatars
- `POST /api/users/deactivate` - Secure account deactivation with feedback

**Advanced Features**:
- **Smart File Processing**: Automatic image optimization and resizing to 300x300px
- **Security-First Design**: Comprehensive file validation and malware protection
- **Detailed Error Handling**: Contextual error messages for better user experience
- **Performance Optimization**: Efficient file processing with progress tracking
- **Privacy Controls**: Secure data handling with audit trails

📋 **Documentation**: [User Management API Docs](../api-docs-user-management.md)

## 🛠 Advanced Tech Stack

### Core Technologies
- **Runtime**: Node.js 18+ with TypeScript for type safety and modern development
- **Framework**: Express.js with comprehensive middleware ecosystem
- **Database**: Supabase (PostgreSQL 17.4.1) with advanced JSON support and Row Level Security
- **Authentication**: JWT Bearer tokens with automatic validation and refresh
- **Validation**: Joi schemas with contextual validation rules
- **Testing**: Jest with comprehensive test coverage
- **Logging**: Winston with structured logging and multiple transports
- **Rate Limiting**: express-rate-limit with configurable policies per endpoint type

### Service-Specific Technologies

**Job Creation Service**:
- **AI Integration**: Google Gemini AI (Vertex AI) for intelligent content processing
- **File Handling**: Multer for multipart form data processing
- **Data Processing**: Advanced JSON manipulation with JSONB optimization
- **API Documentation**: Swagger/OpenAPI 3.0 with interactive documentation

**User Management Service**:
- **Image Processing**: Sharp for high-performance image manipulation and optimization
- **File Validation**: Comprehensive MIME type and content validation
- **Security**: Multi-layer security with input sanitization and content scanning
- **Performance**: Optimized file processing with streaming and compression

## 🚀 Quick Start & Development

### Prerequisites
- **Node.js**: 18+ with npm/yarn/pnpm package manager
- **Database**: Active Supabase account with project setup
- **AI Services**: Google Cloud Project with Vertex AI enabled (for job creation service)
- **Development Tools**: VS Code with TypeScript extensions recommended

### 1. Clone Repository
```bash
git clone <repository-url>
cd upzella-p3/backend
```

## 🔧 Configuration Reference

### Environment Variables

Both services require comprehensive environment configuration. Create `.env` files in each service directory:

#### Job Creation Service (.env)
```bash
# Core Service Configuration
NODE_ENV=development                    # Environment: development/production
PORT=8001                              # Service port number
SERVICE_NAME=job_creation              # Service identifier for logging

# Database Configuration
DATABASE_URL=postgresql://user:pass@host:port/db  # Supabase database URL
SUPABASE_URL=https://your-project.supabase.co     # Supabase project URL
SUPABASE_ANON_KEY=your_anon_key                   # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Service role key for admin operations

# AI Service Configuration (Google Vertex AI)
GOOGLE_PROJECT_ID=your-google-project-id          # Google Cloud project ID
GOOGLE_LOCATION=us-central1                       # Vertex AI location
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json  # Service account key path

# JWT Configuration
JWT_SECRET=your-jwt-secret-key                     # JWT signing key (min 32 chars)
JWT_EXPIRES_IN=7d                                 # Token expiration time

# Logging Configuration
LOG_LEVEL=info                         # Logging level: error/warn/info/debug
LOG_FILE_PATH=./logs                   # Log file directory
LOG_MAX_FILES=10                       # Max log file retention
LOG_MAX_SIZE=5m                        # Max log file size

# API Configuration
API_RATE_LIMIT_WINDOW_MS=900000        # Rate limit window (15 minutes)
API_RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window
MAX_FILE_SIZE=10485760                 # Max upload size (10MB)
ALLOWED_FILE_TYPES=pdf,docx,txt        # Allowed file extensions

# AI Processing Configuration  
AI_REQUEST_TIMEOUT=30000               # AI request timeout (30 seconds)
AI_MAX_RETRY_ATTEMPTS=3                # Max retry attempts for AI requests
AI_TEMPERATURE=0.3                     # AI response creativity (0.0-1.0)
```

#### User Management Service (.env)
```bash
# Core Service Configuration
NODE_ENV=development                    # Environment: development/production
PORT=8002                              # Service port number
SERVICE_NAME=user_management           # Service identifier for logging

# Database Configuration (Same as Job Creation)
DATABASE_URL=postgresql://user:pass@host:port/db  # Supabase database URL
SUPABASE_URL=https://your-project.supabase.co     # Supabase project URL
SUPABASE_ANON_KEY=your_anon_key                   # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Service role key

# JWT Configuration (Same as Job Creation)
JWT_SECRET=your-jwt-secret-key         # JWT signing key (must match job creation)
JWT_EXPIRES_IN=7d                      # Token expiration time

# File Processing Configuration
UPLOAD_DIR=./uploads                   # File upload directory
MAX_FILE_SIZE=5242880                  # Max avatar size (5MB)
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif   # Allowed image extensions
AVATAR_WIDTH=300                       # Avatar resize width
AVATAR_HEIGHT=300                      # Avatar resize height
AVATAR_QUALITY=80                      # JPEG compression quality (1-100)

# Security Configuration
BCRYPT_SALT_ROUNDS=12                  # Password hashing strength
RATE_LIMIT_WINDOW_MS=900000           # Rate limit window (15 minutes)
RATE_LIMIT_MAX_REQUESTS=50            # Max requests per window (stricter than jobs)
ACCOUNT_LOCKOUT_ATTEMPTS=5            # Max failed login attempts
ACCOUNT_LOCKOUT_DURATION=1800000      # Lockout duration (30 minutes)

# Image Processing Configuration
SHARP_PROGRESSIVE=true                 # Progressive JPEG encoding
SHARP_OPTIMIZE_SCANS=true             # Optimize JPEG scans
SHARP_STRIP_METADATA=true             # Remove image metadata for privacy
```

### Database Setup

The services use Supabase PostgreSQL with the following requirements:

#### Required Tables
- `companies` - Company information and settings
- `employers` - User accounts and profile data  
- `jobs` - Job postings with JSONB fields for flexible data
- `ai_models` - AI model configurations and settings

#### Row Level Security (RLS)
Both services implement Row Level Security to ensure data isolation:
- Users can only access their own company's data
- Automatic filtering based on JWT token claims
- Secure API access without additional authorization layers

📋 **Complete Schema**: [Database Documentation](../db.md)

### Google Cloud Setup (Job Creation Only)

The job creation service requires Google Vertex AI for AI-powered features:

1. **Create Google Cloud Project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable Required APIs**
   ```bash
   gcloud services enable aiplatform.googleapis.com
   gcloud services enable compute.googleapis.com
   ```

3. **Create Service Account**
   ```bash
   gcloud iam service-accounts create upzella-ai
   gcloud iam service-accounts keys create key.json \
     --iam-account=upzella-ai@your-project-id.iam.gserviceaccount.com
   ```

4. **Grant Permissions**
   ```bash
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:upzella-ai@your-project-id.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   ```

## 🧪 Testing & Quality Assurance

### Running Tests
```bash
# Job Creation Service
cd job_creation
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report

# User Management Service  
cd user_management
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Coverage
- **Unit Tests**: Individual function and method testing
- **Integration Tests**: API endpoint testing with real database
- **Error Handling**: Comprehensive error scenario coverage
- **Authentication**: JWT validation and security testing
- **File Processing**: Upload validation and processing tests

### Code Quality Tools
```bash
npm run lint          # ESLint code analysis
npm run lint:fix      # Auto-fix linting issues  
npm run format        # Prettier code formatting
npm run type-check    # TypeScript compilation check
```

## 🔍 Monitoring & Debugging

### Health Checks
Both services provide comprehensive health endpoints:

```bash
# Job Creation Service Health
curl http://localhost:8001/health

# Response includes:
# - Service status and uptime
# - Database connection status  
# - AI service availability
# - Memory and CPU usage
# - Environment information

# User Management Service Health
curl http://localhost:8002/health

# Response includes:
# - Service status and uptime
# - Database connection status
# - File system status
# - Performance metrics
```

### Logging System
Advanced logging with multiple levels and outputs:

- **Console Logs**: Development-friendly formatted output
- **File Logs**: Structured JSON logs for production analysis
- **Error Logs**: Separate error file for critical issues
- **Request Logs**: Detailed HTTP request/response logging
- **Performance Logs**: Response time and resource usage tracking

### API Documentation
Interactive API documentation available at:
- Job Creation: `http://localhost:8001/api-docs`
- User Management: `http://localhost:8002/api-docs`

Features:
- **Interactive Testing**: Try API endpoints directly from documentation
- **Request/Response Examples**: Real-world usage examples
- **Schema Validation**: Input/output data structure documentation
- **Error Code Reference**: Comprehensive error handling documentation

## 🚦 Deployment & Production

### Production Checklist
- [ ] Environment variables configured for production
- [ ] Database connection pool optimized
- [ ] JWT secrets rotated and secured
- [ ] File upload limits configured appropriately
- [ ] Rate limiting enabled and tuned
- [ ] Logging configured for production (no debug logs)
- [ ] Health check endpoints verified
- [ ] SSL/TLS certificates configured
- [ ] CORS policies configured for frontend domains
- [ ] Database migrations applied
- [ ] AI service quotas and limits configured
- [ ] Monitoring and alerting configured

### Recommended Production Setup
- **Process Management**: PM2 or similar for process management
- **Reverse Proxy**: Nginx for load balancing and SSL termination  
- **Container Orchestration**: Docker with Kubernetes or Docker Swarm
- **Monitoring**: Application Performance Monitoring (APM) tools
- **Backup Strategy**: Regular database backups with point-in-time recovery
- **Security**: Web Application Firewall (WAF) and DDoS protection

### Performance Optimization
- **Database**: Connection pooling, query optimization, indexing
- **Caching**: Redis for session storage and API response caching
- **File Storage**: CDN for static file delivery and image optimization
- **API Gateway**: Centralized routing, authentication, and rate limiting
- **Load Balancing**: Multiple service instances with health-based routing

## 📞 Support & Contributing

### Issue Reporting
When reporting issues, please include:
- Service name and version
- Environment details (Node.js version, OS)
- Error messages and stack traces
- Steps to reproduce the issue
- Expected vs actual behavior

### Development Guidelines
- **Code Style**: Follow existing patterns and ESLint rules
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update API docs and README for changes
- **Type Safety**: Maintain strict TypeScript compliance
- **Error Handling**: Implement comprehensive error scenarios
- **Security**: Follow security best practices for all changes

### Service Architecture Principles
- **Single Responsibility**: Each service handles one business domain
- **Stateless Design**: Services don't maintain client state
- **Database Per Service**: No direct database sharing between services
- **API-First**: All interactions through well-defined APIs
- **Independent Deployment**: Services can be deployed independently
- **Graceful Degradation**: Services handle dependency failures gracefully

---

## 🔗 Additional Resources

- 📚 **[Job Creation API Documentation](../api-docs-jobcreation.md)** - Complete API reference for job management
- 📚 **[User Management API Documentation](../api-docs-user-management.md)** - Complete API reference for user administration  
- 📊 **[Database Schema Documentation](../db.md)** - Detailed database structure and relationships
- 🎨 **[Design System Documentation](../employer/UPZELLA_DESIGN_SYSTEM.md)** - Frontend design guidelines
- 🏗️ **[Frontend Documentation](../employer/README.md)** - Frontend application documentation

For questions, support, or contributions, please contact the development team or create an issue in the project repository.
```bash
cd job_creation
npm install
cp env.example .env
# Configure environment variables
npm run dev
```

### 3. Setup User Management Service
```bash
cd ../user_management
npm install
cp env.example .env
# Configure environment variables
npm run dev
```

### 4. Verify Services
- Job Creation: `http://localhost:8001/health`
- User Management: `http://localhost:8002/health`

## 🔧 Configuration

### Environment Variables

**Job Creation Service (Port 8001)**:
```env
PORT=8001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_PROJECT_ID=your_google_project_id
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
JWT_SECRET=your_jwt_secret
```

**User Management Service (Port 8002)**:
```env
PORT=8002
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
BCRYPT_ROUNDS=12
MAX_AVATAR_SIZE=5242880
```

## 📊 Database Schema

The services share a common Supabase database with the following structure:

### Main Tables
- **`companies`**: Company information and profiles
- **`employers`**: User accounts and profile data
- **`jobs`**: Job postings with enhanced JSON fields
- **`ai_models`**: AI model configurations

### Key Features
- **Row Level Security (RLS)**: Enabled on sensitive tables
- **JSONB Fields**: Flexible data structures for complex information
- **Foreign Key Constraints**: Maintaining data integrity
- **Indexes**: Optimized for common query patterns

📋 **Full Schema**: [Database Documentation](./db.md)


## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Row Level Security**: Database-level access control
- **Company Isolation**: Users access only their company's data

### Input Validation
- **Joi Schemas**: Comprehensive request validation
- **File Validation**: Type and size restrictions
- **SQL Injection Protection**: Parameterized queries

### Rate Limiting
- **Standard Endpoints**: 100 requests/15 minutes
- **AI Processing**: 10 requests/minute
- **File Uploads**: 5 requests/minute

### Activity Logging
- **User Actions**: Comprehensive activity tracking
- **Security Events**: Login, password changes, profile updates
- **IP Tracking**: Request origin monitoring


## 📝 API Documentation

### Service URLs
- **Job Creation**: `http://localhost:8001`
- **User Management**: `http://localhost:8002`

### Health Checks
- Job Creation: `GET http://localhost:8001/health`
- User Management: `GET http://localhost:8002/health`

### Complete Documentation
- [Job Creation API Documentation](./api-docs-jobcreation.md)
- [User Management API Documentation](./api-docs-user-management.md)
- [Database Schema Documentation](./db.md)

## 🔄 Inter-Service Communication

Services communicate through:
- **Shared Database**: Common Supabase instance
- **JWT Tokens**: Consistent authentication across services
- **REST APIs**: Standard HTTP/JSON interfaces

## 📊 Monitoring & Logging

### Logging Strategy
- **Winston Logger**: Structured logging across all services
- **Log Files**: `logs/combined.log` and `logs/error.log`
- **Console Output**: Development mode logging
- **Activity Logs**: User action tracking in database

### Health Monitoring
- **Health Endpoints**: Service status monitoring
- **Database Health**: Connection and query monitoring
- **External Dependencies**: AI service availability

---

**Architecture**: Microservices  
**Database**: Supabase PostgreSQL  
**Authentication**: JWT Tokens  
**Documentation**: [Complete API Docs](./)
