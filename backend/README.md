# Upzella Backend Services

A microservices architecture for Upzella's recruitment platform providing job management and user administration capabilities.

## 🏗 Architecture Overview

The backend is structured as independent microservices, each handling specific business domains:

```
backend/
├── job_creation/          # Job Management Service
├── user_management/       # User Administration Service
└── README.md             # This file
```

## 🚀 Services Overview

### 🔧 Job Creation Service
**Port**: `8001` | **Path**: `job_creation/`

Handles all job-related operations with AI-powered features:

- **Core Features**: CRUD operations for job postings
- **AI Integration**: Google Gemini AI for job description extraction
- **Resume Scoring**: Configurable criteria for candidate evaluation
- **Enhanced Schema**: JSON-based fields for location, salary, and experience
- **File Processing**: Support for PDF, DOCX, and TXT job descriptions
- **Tech Stack**: Express.js, TypeScript, Supabase, Google Gemini AI

**Key Endpoints**:
- `POST /api/jobs` - Create job postings
- `POST /api/jobs/ai-extract` - AI-powered job extraction
- `GET /api/jobs` - List jobs with pagination
- `PUT /api/jobs/{id}` - Update job details
- `DELETE /api/jobs/{id}` - Delete job postings

📋 **Documentation**: [Job Creation API Docs](./api-docs-jobcreation.md)

---

### 👥 User Management Service
**Port**: `8002` | **Path**: `user_management/`

Comprehensive user account and profile management:

- **Profile Management**: User information and avatar uploads
- **Security Features**: Password changes, account deactivation
- **Preferences**: Notification and privacy settings
- **Activity Tracking**: Detailed user action logging
- **File Processing**: Avatar upload with automatic resizing
- **Tech Stack**: Express.js, TypeScript, Supabase, Sharp (image processing)

**Key Endpoints**:
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile information
- `POST /api/users/upload-avatar` - Upload profile picture
- `POST /api/users/change-password` - Change password
- `GET /api/users/activity-log` - View activity history

📋 **Documentation**: [User Management API Docs](./api-docs-user-management.md)

## 🛠 Tech Stack

### Common Technologies
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT Bearer tokens
- **Validation**: Joi schemas
- **Testing**: Jest
- **Logging**: Winston
- **Rate Limiting**: express-rate-limit

### Service-Specific Technologies

**Job Creation Service**:
- Google Gemini AI (vertex-ai)
- Multer (file uploads)
- PDF parsing libraries

**User Management Service**:
- Sharp (image processing)
- bcrypt (password hashing)
- Activity logging system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account with database setup
- Google Cloud Project (for AI features)

### 1. Clone Repository
```bash
git clone <repository-url>
cd upzella-p3/backend
```

### 2. Setup Job Creation Service
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

## 🧪 Testing

### Run All Tests
```bash
# Job Creation Service
cd job_creation && npm test

# User Management Service  
cd user_management && npm test
```

### Test Coverage
Both services include comprehensive test suites covering:
- API endpoint functionality
- Authentication and authorization
- Data validation
- Error handling
- Business logic
- Database operations

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

## 🚀 Deployment

### Development Mode
```bash
# Start both services
npm run dev:all

# Or individually
cd job_creation && npm run dev
cd user_management && npm run dev
```

### Production Build
```bash
# Build both services
npm run build:all

# Start production servers
npm run start:all
```

### Docker Support
Each service includes Docker configuration:
```bash
# Job Creation Service
cd job_creation
docker build -t upzella-job-service .
docker run -p 8001:8001 upzella-job-service

# User Management Service
cd user_management
docker build -t upzella-user-service .
docker run -p 8002:8002 upzella-user-service
```

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

## 🤝 Contributing

### Development Guidelines
1. **TypeScript**: Strict typing for all code
2. **Testing**: Comprehensive test coverage required
3. **Documentation**: Update API docs for changes
4. **Security**: Follow security best practices
5. **Code Quality**: ESLint and Prettier configuration

### Adding New Services
1. Create service directory in `backend/`
2. Follow existing service structure
3. Implement health check endpoint
4. Add comprehensive README
5. Update this main README

## 🐛 Troubleshooting

### Common Issues

**Service Won't Start**:
- Check environment variables
- Verify database connection
- Ensure ports aren't in use

**Authentication Failures**:
- Verify JWT secret consistency
- Check token expiration
- Validate Supabase configuration

**AI Service Issues**:
- Confirm Google Cloud credentials
- Check API quotas and limits
- Verify project permissions

### Log Locations
- Application logs: `{service}/logs/`
- Error logs: `{service}/logs/error.log`
- Combined logs: `{service}/logs/combined.log`

## 📞 Support

For technical issues:
- Check service-specific README files
- Review API documentation
- Consult error logs
- Check database schema documentation

---

**Architecture**: Microservices  
**Database**: Supabase PostgreSQL  
**Authentication**: JWT Tokens  
**Documentation**: [Complete API Docs](./)
