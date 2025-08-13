# Job Creation API Documentation

## Base URL
```
http://localhost:8001
```

## Rate Limiting
- **Limit**: 100 requests per 15-minute window per IP address
- **Headers**: `RateLimit-*` headers are included in responses
- **Error Response**: `429 Too Many Requests` when limit exceeded

## Authentication
Most endpoints require Bearer token authentication:
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
  "timestamp": "2025-08-10T12:34:56.000Z",
  "environment": "development"
}
```

### Job Management

#### Create Job
**POST** `/api/jobs`

Creates a new job posting with enhanced job details using JSON structure for location, salary, experience, and resume scoring data.

**Request Body:**
```json
{
  "company_id": "123e4567-e89b-12d3-a456-426614174000",
  "role_name": "Senior Full Stack Developer",
  "title": "Senior Full Stack Developer - React & Node.js",
  "description": "We are looking for a skilled full stack developer with experience in modern web technologies...",
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
  "compensation": ["Medical Insurance", "Provident Fund", "Performance Bonus"],
  "resume_threshold": 65,
  "resume_score_weightage_details": [
    {
      "resume_section": "Education",
      "resume_criteria": "Bachelor's degree in Computer Science or related field",
      "resume_weightage": 20,
      "reason": "Educational background validates foundational knowledge"
    },
    {
      "resume_section": "Experience", 
      "resume_criteria": "3-7 years of full stack development experience",
      "resume_weightage": 40,
      "reason": "Practical experience is most critical for this role"
    },
    {
      "resume_section": "Skills",
      "resume_criteria": "Proficiency in React, Node.js, and TypeScript",
      "resume_weightage": 25,
      "reason": "Technical skills directly impact job performance"
    },
    {
      "resume_section": "Projects",
      "resume_criteria": "Portfolio of web applications or open source contributions", 
      "resume_weightage": 15,
      "reason": "Projects demonstrate practical application of skills"
    }
  ],
  "original_job_description_text": "Original job description text for audit trail (optional)"
}
```

**Field Descriptions:**
- **role_name**: Specific role title (e.g., "Senior Full Stack Developer", "Digital Marketing Manager")
- **title**: Complete descriptive job title combining role and specialization
- **work_type**: Array of work arrangement types: `["remote", "hybrid", "onsite", "all"]`
- **employment_type**: Array of employment types: `["part-time", "full-time", "contract", "internship", "freelance", "temporary"]`
- **seniority_level**: Array of experience levels: `["entry_level", "fresher", "junior", "senior", "manager"]`
- **location_details**: JSON object with location breakdown:
  - `location_country`: Country name
  - `location_state`: State/province name  
  - `location_city`: City name
  - `location_pin_code`: Postal/pin code
- **salary_details**: JSON object with salary information:
  - `salary_currency`: Currency code - `"INR"` or `"USD"`
  - `salary_from`: Minimum salary amount
  - `salary_to`: Maximum salary amount
  - `salary_period`: Salary frequency - `"per hour"`, `"per month"`, or `"per annum"`
- **experience_details**: JSON object with experience requirements:
  - `experience_min`: Minimum years of experience required
  - `experience_max`: Maximum years of experience preferred
- **compensation**: Array of benefits: `["Medical Insurance", "Provident Fund", "Food Allowance", "House Allowance", "Transport Allowance", "Performance Bonus", "Gym Membership", "Learning Stipend", "Flexible Hours", "Work From Home", "Stock Options"]`
- **resume_score_weightage_details**: Array of resume scoring criteria:
  - `resume_section`: Section to evaluate - `["Education", "Experience", "Projects", "Certifications", "Skills", "Achievements"]`
  - `resume_criteria`: Specific criteria description for evaluation
  - `resume_weightage`: Weightage percentage (must sum to 100 across all items)
  - `reason`: Justification for why this criteria is important

**Response:**
```json
{
  "status": "success",
  "message": "Job created successfully",
  "data": {
    "job_id": "456e7890-e89b-12d3-a456-426614174001"
  }
}
```

#### AI Extract Job Details
**POST** `/api/jobs/ai-extract`

Extracts structured job information from unstructured job description text using Google Gemini AI. This endpoint processes plain text job descriptions and returns structured data in the new JSON format that can be used to create a job posting.

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
    "work_type": ["remote", "hybrid"],
    "employment_type": ["full-time"],
    "seniority_level": ["senior"],
    "location_details": {
      "location_country": "India",
      "location_state": "Karnataka",
      "location_city": "Bangalore",
      "location_pin_code": ""
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
        "resume_section": "Education",
        "resume_criteria": "Bachelor's degree in Computer Science or related field",
        "resume_weightage": 20,
        "reason": "Educational background validates foundational knowledge"
      },
      {
        "resume_section": "Experience",
        "resume_criteria": "3-7 years of full stack development experience",
        "resume_weightage": 40,
        "reason": "Practical experience is most critical for this role"
      },
      {
        "resume_section": "Skills", 
        "resume_criteria": "Proficiency in React, Node.js, and TypeScript",
        "resume_weightage": 25,
        "reason": "Technical skills directly impact job performance"
      },
      {
        "resume_section": "Projects",
        "resume_criteria": "Portfolio of web applications or open source contributions",
        "resume_weightage": 15,
        "reason": "Projects demonstrate practical application of skills"
      }
    ]
  }
}
```
    "resume_threshold": 65,
    "resume_scoring": [
      {
        "section": "Education",
        "criteria": "Bachelor's degree in Computer Science or related field",
        "weightage": 20
      },
      {
        "section": "Experience",
        "criteria": "3-7 years of full stack development experience",
        "weightage": 40
      },
      {
        "section": "Skills",
        "criteria": "Proficiency in React, Node.js, TypeScript",
        "weightage": 25
      },
      {
        "section": "Projects",
        "criteria": "Portfolio of web applications",
        "weightage": 15
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

Retrieves a specific job posting with all enhanced fields including compensation, salary range, and multiselect attributes.

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "company_id": "123e4567-e89b-12d3-a456-426614174000",
    "job_name": "Software Engineer Position",
    "role_name": "Senior Full Stack Developer",
    "title": "Senior Full Stack Developer - React & Node.js",
    "description": "We are looking for a skilled full stack developer...",
    "skills_required": ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    "work_type": ["Full-time", "Remote"],
    "employment_type": ["Permanent"],
    "seniority_level": ["Senior"],
    "experience_min": 3,
    "experience_max": 7,
    "salary_currency": "INR",
    "salary_from": 800000,
    "salary_to": 1200000,
    "salary_period": "per annum",
    "location_details": "Bangalore, India (Remote available)",
    "compensation": ["Medical Insurance", "Provident Fund"],
    "resume_threshold": 65,
    "original_job_description_text": "Original job description for audit trail",
    "status": "draft",
    "created_at": "2025-08-10T12:34:56.000Z",
    "updated_at": "2025-08-10T12:34:56.000Z",
    "resume_scoring_weights": [
      {
        "id": "weight_id_1",
        "job_id": "456e7890-e89b-12d3-a456-426614174001",
        "section_name": "Education",
        "criteria_description": "Bachelor's degree in Computer Science or related field",
        "weightage": 20,
        "created_at": "2025-08-10T12:34:56.000Z"
      },
      {
        "id": "weight_id_2",
        "job_id": "456e7890-e89b-12d3-a456-426614174001",
        "section_name": "Experience",
        "criteria_description": "3-7 years of full stack development experience",
        "weightage": 40,
        "created_at": "2025-08-10T12:34:56.000Z"
      }
    ]
  }
}
```

#### List Jobs
**GET** `/api/jobs`

Retrieves all job postings for the authenticated user's company.

**Query Parameters:**
- `limit` (optional): Number of jobs to return (default: 20)
- `offset` (optional): Number of jobs to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174001",
      "title": "Senior Software Engineer",
      "employment_type": "Full-time",
      "created_at": "2025-08-10T12:34:56.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}
```

#### Update Job
**PUT** `/api/jobs/{jobId}`

Updates an existing job posting.

**Request Body:**
```json
{
  "title": "Updated Job Title",
  "description": "Updated description...",
  "skills_required": ["JavaScript", "TypeScript", "React", "Node.js"],
  "resume_threshold": 70
}
```

#### Delete Job
**DELETE** `/api/jobs/{jobId}`

Deletes a job posting and its associated scoring weights.

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### Resume Scoring Weights

#### Get Scoring Weights
**GET** `/api/jobs/{jobId}/scoring-weights`

Retrieves resume scoring criteria for a specific job.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174002",
      "section_name": "Technical Skills",
      "criteria_description": "JavaScript, TypeScript, React experience",
      "weightage": 30,
      "created_at": "2025-08-10T12:34:56.000Z"
    }
  ]
}
```

#### Update Scoring Weights
**PUT** `/api/jobs/{jobId}/scoring-weights`

Updates resume scoring criteria for a job.

**Request Body:**
```json
{
  "weights": [
    {
      "section_name": "Technical Skills",
      "criteria_description": "JavaScript, TypeScript, React experience",
      "weightage": 35
    },
    {
      "section_name": "Experience",
      "criteria_description": "3+ years in software development",
      "weightage": 25
    }
  ]
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": "Job title is required",
    "code": "VALIDATION_ERROR"
  }
}
```

### Common Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## AI Integration

The API uses Google Gemini AI for:
1. **Job Description Extraction**: Parses uploaded text to extract structured job data
2. **Resume Scoring Criteria**: Automatically generates scoring weights based on job requirements
3. **Skills Extraction**: Identifies required technical and soft skills from job descriptions

## Data Storage

- **Database**: All structured job data stored in Supabase PostgreSQL
- **File Storage**: Original job description text stored in Supabase Storage
- **Row Level Security**: Enabled for multi-tenant data isolation

## Rate Limits

- Standard endpoints: 100 requests per minute
- AI processing endpoints: 10 requests per minute
- File upload endpoints: 5 requests per minute

## SDK Support

For frontend integration, use the provided service layer:
```typescript
import { jobService } from '@/services/job.service';

const newJob = await jobService.createJob({
  text: extractedText,
  companyId: 'company-uuid'
});
```
