# Job Creation Service

A Node.js microservice for managing job postings with AI-powered extraction capabilities using Google Gemini AI.

## 🚀 Overview

The Job Creation Service handles all job-related operations including CRUD operations, AI-powered job description extraction, and resume scoring criteria management. It provides RESTful APIs for creating, updating, retrieving, and managing job postings with enhanced features like location details, salary information, and automated resume scoring.

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Google Gemini AI (vertex-ai)
- **Authentication**: JWT Bearer tokens
- **Validation**: Joi validation schemas
- **Testing**: Jest
- **Logging**: Winston
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project with database setup
- Google Cloud Project with Vertex AI enabled

## 🏗 Installation

1. **Clone and navigate to the service:**
   ```bash
   cd backend/job_creation
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
   PORT=8001
   NODE_ENV=development
   
   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Google AI Configuration
   GOOGLE_PROJECT_ID=your_google_project_id
   GOOGLE_LOCATION=your_google_location
   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
   
   # Security
   JWT_SECRET=your_jwt_secret
   ```


## � Project Structure

```
src/
├── server.ts              # Main application entry point
├── controllers/
│   └── jobs.controller.ts  # Job-related HTTP request handlers
├── db/
│   ├── index.ts           # Database connection and client setup
│   └── migrations.sql     # Database schema and migrations
├── middleware/
│   ├── auth.ts            # JWT authentication middleware
│   └── errorHandler.ts    # Global error handling middleware
├── routes/
│   └── jobs.routes.ts     # Job API route definitions
├── services/
│   ├── ai.service.ts      # Google Gemini AI integration service
│   └── jobs.service.ts    # Business logic for job operations
├── utils/
│   └── logger.ts          # Winston logging configuration
├── validators/
│   └── jobValidation.ts   # Joi validation schemas for job data
└── __tests__/
    ├── setup.ts           # Test environment configuration
    └── jobs.test.ts       # Comprehensive test suites
```

### 📄 File Descriptions

- **`server.ts`**: Express application setup with middleware, routes, and error handling
- **`controllers/jobs.controller.ts`**: HTTP request/response handlers for job endpoints
- **`db/index.ts`**: Supabase client configuration and database connection
- **`db/migrations.sql`**: Database schema definitions and migration scripts
- **`middleware/auth.ts`**: JWT token validation and user authentication
- **`middleware/errorHandler.ts`**: Centralized error handling and response formatting
- **`routes/jobs.routes.ts`**: Express route definitions with middleware integration
- **`services/ai.service.ts`**: Google Gemini AI service for job description extraction
- **`services/jobs.service.ts`**: Core business logic for job CRUD operations
- **`utils/logger.ts`**: Winston logger configuration for request/error logging
- **`validators/jobValidation.ts`**: Joi schemas for request data validation

## 🔗 API Endpoints

For complete API documentation, see: [Job Creation API Documentation](../../api-docs-jobcreation.md)

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `POST` | `/api/jobs` | Create new job posting |
| `GET` | `/api/jobs` | List all jobs with pagination |
| `GET` | `/api/jobs/{id}` | Get specific job details |
| `PUT` | `/api/jobs/{id}` | Update job posting |
| `DELETE` | `/api/jobs/{id}` | Delete job posting |
| `POST` | `/api/jobs/ai-extract` | Extract job details using AI |
| `GET` | `/api/jobs/{id}/scoring-weights` | Get resume scoring criteria |
| `PUT` | `/api/jobs/{id}/scoring-weights` | Update resume scoring criteria |

### Key Features

- **AI-Powered Extraction**: Automatically extract structured job data from plain text descriptions
- **Enhanced Job Schema**: Support for location details, salary ranges, experience requirements
- **Resume Scoring**: Configurable criteria for automatic resume evaluation
- **Multi-select Support**: Work types, employment types, and seniority levels
- **Rate Limiting**: 100 requests per 15-minute window
- **File Upload**: Support for job description document uploads
- **Data Validation**: Comprehensive input validation using Joi schemas


## � Database Schema

The service uses the following main table:

**Jobs Table Structure:**
- Enhanced JSON fields for location, salary, and experience details
- Array fields for skills, work types, and employment types
- Resume scoring criteria stored as JSONB
- Row Level Security (RLS) enabled

## 🔒 Security Features

- **JWT Authentication**: Bearer token validation for all protected endpoints
- **Rate Limiting**: Prevents API abuse with configurable limits
- **Input Validation**: Joi schemas validate all incoming data
- **SQL Injection Protection**: Parameterized queries via Supabase client
- **Error Handling**: Secure error messages without sensitive data exposure

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Support
The service includes Dockerfile and can be containerized:
```bash
docker build -t job-creation-service .
docker run -p 8001:8001 job-creation-service
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 8001)
- `NODE_ENV`: Environment mode (development/production/test)
- `SUPABASE_*`: Database connection configuration
- `GOOGLE_*`: AI service configuration
- `JWT_SECRET`: Token signing secret

### Rate Limiting
- Standard endpoints: 100 requests/15 minutes
- AI processing: 10 requests/minute
- File uploads: 5 requests/minute

## � Logging

Winston logger with multiple transports:
- Console output for development
- File logging (`logs/combined.log`, `logs/error.log`)
- Structured JSON format for production

---

**Service URL**: `http://localhost:8001`  
**Health Check**: `GET /health`  
**Documentation**: [API Documentation](../../api-docs-jobcreation.md)
