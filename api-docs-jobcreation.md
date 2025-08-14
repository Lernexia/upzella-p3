# Job Creation API Documentation

## Base URL
```
http://localhost:8001
```

## Rate Limiting
- **Standard Endpoints**: 100 requests per 15-minute window per IP address
- **AI Processing Endpoints**: 100 requests per 15-minute window per IP address
- **Headers**: `RateLimit-*` headers are included in responses
- **Error Response**: `429 Too Many Requests` when limit exceeded

## Authentication
Most endpoints require Bearer token authentication:
```
Authorization: Bearer <your-jwt-token>
```

## Swagger Documentation
Interactive API documentation is available at:
```
http://localhost:8001/api-docs
```

## Endpoints

### Health Check
**GET** `/health`

Returns API status, timestamp, and environment information. This endpoint is public and does not require authentication.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-14T12:34:56.000Z",
  "environment": "development"
}
```

### Job Management

#### Create Job
**POST** `/api/jobs`

Creates a new job posting with enhanced job details using JSON structure for location, salary, experience, and resume scoring data. Supports both draft and published job creation with different validation rules.

**Request Body:**
```json
{
  "company_id": "123e4567-e89b-12d3-a456-426614174000",
  "role_name": "Senior Full Stack Developer",
  "title": "Senior Full Stack Developer - React & Node.js",
  "description": "We are looking for a skilled full stack developer to join our dynamic team...",
  "skills_required": ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  "work_type": ["remote", "hybrid"],
  "employment_type": ["full-time"],
  "seniority_level": ["senior"],
  "location_details": {
    "location_country": "India",
    "location_state": "Karnataka",
    "location_city": "Bangalore",
    "location_pin_code": "560001"
  },
  "salary_details": {
    "salary_currency": "INR",
    "salary_from": 800000,
    "salary_to": 1200000,
    "salary_period": "per annum"
  },
  "experience_details": {
    "experience_min": 3,
    "experience_max": 7
  },
  "compensation": ["Medical Insurance", "Provident Fund", "Work From Home"],
  "resume_threshold": 65,
  "resume_score_weightage_details": [
    {
      "resume_section": "Experience",
      "resume_criteria": "3-7 years in full stack development",
      "resume_weightage": 40,
      "reason": "Critical for role performance"
    },
    {
      "resume_section": "Skills",
      "resume_criteria": "React, Node.js, TypeScript proficiency",
      "resume_weightage": 35,
      "reason": "Essential technical skills"
    },
    {
      "resume_section": "Education",
      "resume_criteria": "Computer Science or related degree",
      "resume_weightage": 25,
      "reason": "Foundation knowledge requirement"
    }
  ],
  "original_job_description_text": "Original job description text for audit trail",
  "status": "draft"
}
```

**Field Descriptions:**
- **company_id**: UUID of the company creating the job (required)
- **role_name**: Specific role title (e.g., "Senior Full Stack Developer")
- **title**: Complete descriptive job title combining role and specialization
- **description**: Detailed job description (minimum 50 characters for published jobs)
- **skills_required**: Array of required technical and soft skills (required for published jobs)
- **work_type**: Array of work arrangement types: `["remote", "hybrid", "onsite", "all"]` (required for published jobs)
- **employment_type**: Array of employment types: `["part-time", "full-time", "contract", "internship", "freelance", "temporary"]` (required for published jobs)
- **seniority_level**: Array of experience levels: `["entry_level", "fresher", "junior", "senior", "manager"]` (required for published jobs)
- **location_details**: JSON object with location breakdown (optional)
- **salary_details**: JSON object with salary information (optional)
- **experience_details**: JSON object with experience requirements (required for published jobs)
- **compensation**: Array of standard benefits (optional)
- **resume_threshold**: Minimum score threshold (0-100, default: 60)
- **resume_score_weightage_details**: Array of resume scoring criteria (required for published jobs, must sum to 100%)
- **original_job_description_text**: Original text for audit trail (optional)
- **status**: Job status: `"draft"` (default), `"published"`, `"paused"`, `"closed"`

**Validation Rules:**
- **Draft Jobs**: Minimal validation - only company_id, title, and description required
- **Published Jobs**: Strict validation - all marked fields required, resume scoring must sum to 100%

**Response:**
```json
{
  "status": "success",
  "message": "Job saved as draft successfully",
  "data": {
    "job_id": "456e7890-e89b-12d3-a456-426614174001"
  }
}
```

#### AI Extract Job Details
**POST** `/api/jobs/ai-extract`

Extracts structured job information from unstructured job description text using Google Gemini AI. This endpoint processes plain text job descriptions and returns structured data that can be used to create a job posting.

**Request Body:**
```json
{
  "job_description_text": "We are seeking a Senior Full Stack Developer to join our dynamic team. The ideal candidate will have 3-7 years of experience in React, Node.js, and TypeScript. We offer competitive salary of 8-12 LPA, medical insurance, and remote work options. Bachelor's degree in Computer Science preferred. Location: Bangalore, Karnataka, India."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Job details extracted successfully",
  "data": {
    "role_name": "Senior Full Stack Developer",
    "title": "Senior Full Stack Developer - React & Node.js",
    "description": "We are seeking a Senior Full Stack Developer to join our dynamic team...",
    "skills_required": ["React", "Node.js", "TypeScript", "JavaScript"],
    "work_type": ["remote"],
    "employment_type": ["full-time"],
    "seniority_level": ["senior"],
    "location_details": {
      "location_country": "India",
      "location_state": "Karnataka",
      "location_city": "Bangalore"
    },
    "salary_details": {
      "salary_currency": "INR",
      "salary_from": 800000,
      "salary_to": 1200000,
      "salary_period": "per annum"
    },
    "experience_details": {
      "experience_min": 3,
      "experience_max": 7
    },
    "compensation": ["Medical Insurance"],
    "resume_threshold": 65,
    "resume_score_weightage_details": [
      {
        "resume_section": "Experience",
        "resume_criteria": "3-7 years full stack development experience",
        "resume_weightage": 40,
        "reason": "Essential for senior role requirements"
      },
      {
        "resume_section": "Skills",
        "resume_criteria": "Proficiency in React, Node.js, TypeScript",
        "resume_weightage": 35,
        "reason": "Core technical skills for the position"
      },
      {
        "resume_section": "Education",
        "resume_criteria": "Bachelor's degree in Computer Science or related field",
        "resume_weightage": 25,
        "reason": "Educational foundation for technical role"
      }
    ]
  }
}
```

**Features:**
- **Smart Field Extraction**: Automatically identifies job name, role name, and title
- **Multi-select Support**: Extracts arrays for work type, employment type, and seniority level
- **Salary Intelligence**: Detects salary ranges, currency, and period from text
- **Location Parsing**: Identifies location details and remote work options
- **Benefits Recognition**: Categorizes standard and custom compensation
- **Resume Scoring**: Generates weighted scoring criteria automatically
- **Validation**: All extracted data is validated against predefined enums and constraints

**Error Responses:**
```json
{
  "status": "error",
  "message": "Job description text must be at least 50 characters long"
}
```

#### Get Job by ID
**GET** `/api/jobs/{jobId}`

Retrieves a specific job posting with all enhanced fields including compensation, salary range, and multiselect attributes. Only returns jobs from the authenticated user's company.

**Path Parameters:**
- `jobId` (required): UUID of the job to retrieve

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "company_id": "123e4567-e89b-12d3-a456-426614174000",
    "role_name": "Senior Full Stack Developer",
    "title": "Senior Full Stack Developer - React & Node.js",
    "description": "We are looking for a skilled full stack developer to join our dynamic team...",
    "skills_required": ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    "work_type": ["remote", "hybrid"],
    "employment_type": ["full-time"],
    "seniority_level": ["senior"],
    "location_details": {
      "location_country": "India",
      "location_state": "Karnataka",
      "location_city": "Bangalore",
      "location_pin_code": "560001"
    },
    "salary_details": {
      "salary_currency": "INR",
      "salary_from": 800000,
      "salary_to": 1200000,
      "salary_period": "per annum"
    },
    "experience_details": {
      "experience_min": 3,
      "experience_max": 7
    },
    "compensation": ["Medical Insurance", "Provident Fund", "Work From Home"],
    "resume_threshold": 65,
    "resume_score_weightage_details": [
      {
        "resume_section": "Experience",
        "resume_criteria": "3-7 years in full stack development",
        "resume_weightage": 40,
        "reason": "Critical for role performance"
      }
    ],
    "original_job_description_text": "Original AI-extracted job description text",
    "status": "published",
    "created_at": "2025-08-14T12:34:56.000Z",
    "updated_at": "2025-08-14T12:34:56.000Z"
  }
}
```

#### List Jobs
**GET** `/api/jobs`

Retrieves all job postings for the authenticated user's company with pagination support.

**Query Parameters:**
- `limit` (optional): Number of jobs to return (default: 50, maximum: 100)
- `offset` (optional): Number of jobs to skip (default: 0)

**Response:**
```json
{
  "status": "success",
  "data": {
    "jobs": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174001",
        "title": "Senior Full Stack Developer - React & Node.js",
        "role_name": "Senior Full Stack Developer",
        "status": "published",
        "employment_type": ["full-time"],
        "work_type": ["remote", "hybrid"],
        "created_at": "2025-08-14T12:34:56.000Z",
        "updated_at": "2025-08-14T12:34:56.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 50,
      "offset": 0,
      "has_more": false
    }
  }
}
```

#### Update Job
**PUT** `/api/jobs/{jobId}`

Updates an existing job posting. Supports partial updates and status changes with appropriate validation based on the target status.

**Path Parameters:**
- `jobId` (required): UUID of the job to update

**Request Body:**
```json
{
  "title": "Updated Senior Full Stack Developer - React & Node.js",
  "description": "Updated comprehensive job description...",
  "skills_required": ["React", "Node.js", "TypeScript", "Python"],
  "resume_threshold": 70,
  "status": "published"
}
```

**Validation:**
- Same validation rules as create job apply based on target status
- Publishing a draft job requires all required fields to be present

**Response:**
```json
{
  "status": "success",
  "message": "Job updated successfully",
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "title": "Updated Senior Full Stack Developer - React & Node.js",
    "status": "published",
    "updated_at": "2025-08-14T12:45:00.000Z"
  }
}
```

#### Delete Job
**DELETE** `/api/jobs/{jobId}`

Permanently deletes a job posting and all associated data. This action cannot be undone.

**Path Parameters:**
- `jobId` (required): UUID of the job to delete

**Response:**
```json
{
  "status": "success",
  "message": "Job deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses with detailed information:

```json
{
  "status": "error",
  "message": "Detailed error description",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `400` - Bad Request (validation errors, malformed data)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions, company access denied)
- `404` - Not Found (job doesn't exist or access denied)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `503` - Service Unavailable (AI service temporarily unavailable)

### Validation Error Examples
```json
{
  "status": "error",
  "message": "Skills are required for published jobs"
}
```

```json
{
  "status": "error",
  "message": "Resume scoring weightage must sum to exactly 100% for published jobs"
}
```

```json
{
  "status": "error",
  "message": "Job description text must be at least 50 characters long"
}
```

## AI Integration

The API leverages Google Gemini AI for advanced job processing capabilities:

### AI-Powered Features
1. **Job Description Extraction**: Intelligently parses unstructured text to extract structured job data
2. **Automatic Field Population**: Identifies and populates role names, skills, salary ranges, and locations
3. **Resume Scoring Generation**: Creates intelligent scoring criteria based on job requirements
4. **Skill Detection**: Automatically identifies required technical and soft skills
5. **Compensation Analysis**: Recognizes and categorizes benefits and compensation packages

### AI Service Reliability
- **Fallback Handling**: Graceful degradation when AI service is unavailable
- **Rate Limiting**: Dedicated rate limits for AI-intensive operations
- **Error Recovery**: Automatic retry mechanisms for transient failures
- **Validation**: All AI-generated content is validated against business rules

## Data Storage & Architecture

### Database Integration
- **Database**: Supabase PostgreSQL with advanced JSON support
- **Schema**: Enhanced JSONB fields for flexible data structures
- **Indexing**: GIN indexes on JSONB fields for efficient querying
- **Row Level Security**: Company-based data isolation

### File Storage
- **Original Text Storage**: Preserves original job description text for audit trails
- **Document Support**: Future support for PDF/DOCX job description uploads
- **Version Control**: Tracks job posting changes over time

### Performance Features
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Optimized queries for large-scale job listings
- **Caching**: Strategic caching for frequently accessed data
- **Real-time Updates**: WebSocket support for live job status changes

## Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure Bearer token authentication
- **Company Isolation**: Users can only access their company's jobs
- **Role-Based Access**: Different permissions for different user roles
- **Session Management**: Automatic token validation and refresh

### Data Protection
- **Input Validation**: Comprehensive validation using Joi schemas
- **SQL Injection Protection**: Parameterized queries via Supabase client
- **XSS Prevention**: Input sanitization and output encoding
- **Rate Limiting**: Multiple rate limiting strategies to prevent abuse

### Audit & Compliance
- **Activity Logging**: Comprehensive logging of all job operations
- **Data Retention**: Configurable data retention policies
- **GDPR Compliance**: Data export and deletion capabilities
- **Audit Trail**: Complete history of job posting changes

## Rate Limiting Details

### Standard Endpoints
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Scope**: Per IP address
- **Headers**: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

### AI Processing Endpoints
- **Window**: 15 minutes  
- **Limit**: 100 requests per IP
- **Scope**: Per IP address
- **Special Handling**: Extended timeout handling for AI processing

### Error Handling
When rate limits are exceeded:
```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "15 minutes"
}
```

## SDK Integration

### Frontend Integration
```typescript
import { JobService } from '@/services/job.service';

// Create a job
const jobData = await JobService.createJob({
  company_id: 'uuid',
  title: 'Software Engineer',
  description: 'Job description...',
  // ... other fields
});

// Extract job from text
const extractedJob = await JobService.extractJobFromText(
  'Job description text...'
);

// Get job listings
const { jobs, pagination } = await JobService.getJobs(50, 0);
```

### Error Handling
```typescript
try {
  const job = await JobService.getJob(jobId);
} catch (error) {
  if (error.message.includes('404')) {
    // Handle job not found
  } else if (error.message.includes('403')) {
    // Handle access denied
  }
}
```

---

**Service URL**: `http://localhost:8001`  
**Health Check**: `GET /health`  
**API Documentation**: `http://localhost:8001/api-docs`
