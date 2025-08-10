# 🚀 Upzella Job Creation API

Express.js backend service for Upzella's AI-powered job creation and management system.

## 🎯 Overview

This backend service provides APIs for:
- Creating and managing job postings
- AI-powered job description extraction from uploaded files
- Resume scoring configuration management
- Supabase PostgreSQL integration with RLS
- File storage via Supabase Storage

## 🛠️ Tech Stack

- **Backend**: Express.js + TypeScript
- **Database**: Supabase PostgreSQL
- **AI**: Google Gemini (gemini-1.5-flash)
- **Storage**: Supabase Storage
- **Validation**: Joi
- **Logging**: Winston
- **File Processing**: pdf-parse, mammoth (for DOCX)

## 📦 Installation

1. **Clone and navigate to the project**:
   ```bash
   cd backend/job_creation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env
   ```

4. **Configure your `.env` file**:
   ```env
   NODE_ENV=development
   PORT=3001
   
   # Supabase Configuration
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Google Gemini AI
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3000
   
   # File Upload Settings
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=uploads/
   ALLOWED_FILE_TYPES=pdf,docx,txt
   
   # Logging
   LOG_LEVEL=info
   ```

## 🗃️ Database Schema

The service uses the following Supabase tables:

### Jobs Table
```sql
- id (uuid, primary key)
- company_id (uuid, foreign key to companies)
- title (text)
- description (text)
- skills_required (text[])
- work_type (text[])
- employment_type (text)
- experience_min (integer)
- experience_max (integer)
- resume_threshold (integer, default 60)
- created_at, updated_at (timestamptz)
```

### Resume Scoring Weights Table
```sql
- id (uuid, primary key)
- job_id (uuid, foreign key to jobs)
- section_name (text)
- criteria_description (text)
- weightage (integer)
- created_at (timestamptz)
```

### AI Models Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key to employers)
- model_name (text)
- provider (text)
- configs (jsonb)
- created_at (timestamptz)
```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Health Check
Visit: `http://localhost:3001/health`

## 📡 API Endpoints

### Authentication
All endpoints require Bearer token authentication in the header:
```
Authorization: Bearer <supabase_jwt_token>
```

### 1. Create Job
```http
POST /api/jobs
Content-Type: application/json

{
  "company_id": "uuid",
  "title": "Backend Developer",
  "description": "We are looking for...",
  "skills_required": ["Node.js", "PostgreSQL"],
  "work_type": ["Full-time", "Remote"],
  "employment_type": "Permanent",
  "experience_min": 2,
  "experience_max": 5,
  "resume_threshold": 60,
  "resume_scoring": [
    {
      "section_name": "Education",
      "criteria_description": "Bachelor's degree",
      "weightage": 20
    },
    {
      "section_name": "Experience",
      "criteria_description": "2+ years backend",
      "weightage": 40
    },
    {
      "section_name": "Skills",
      "criteria_description": "Technical skills",
      "weightage": 25
    },
    {
      "section_name": "Projects",
      "criteria_description": "Relevant projects",
      "weightage": 15
    }
  ]
}
```

### 2. AI Job Extraction
```http
POST /api/jobs/ai-extract
Content-Type: multipart/form-data

company_id: uuid
file: job_description.pdf (or .docx, .txt)
```

### 3. Get Jobs (Paginated)
```http
GET /api/jobs?limit=50&offset=0
```

### 4. Get Single Job
```http
GET /api/jobs/:job_id
```

### 5. Update Job
```http
PUT /api/jobs/:job_id
Content-Type: application/json

{
  "title": "Updated Job Title",
  "description": "Updated description..."
}
```

### 6. Delete Job
```http
DELETE /api/jobs/:job_id
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Company Isolation**: Users can only access their company's data
- **File Validation**: Type and size restrictions on uploads
- **Input Validation**: Joi schemas for all endpoints
- **Authentication**: JWT token validation via Supabase Auth
- **CORS**: Configured for frontend domain

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Cases
- Job creation with valid data
- Job creation with invalid weightage (not 100%)
- AI extraction from PDF/DOCX files
- Authentication and authorization
- Company access validation
- File upload validation

## 📁 Project Structure

```
src/
├── controllers/
│   └── jobs.controller.ts       # Request handling logic
├── services/
│   ├── jobs.service.ts          # Job CRUD operations
│   ├── ai.service.ts            # Google Gemini integration
│   └── file.service.ts          # File upload/processing
├── routes/
│   └── jobs.routes.ts           # API route definitions
├── middleware/
│   ├── auth.ts                  # Authentication middleware
│   └── errorHandler.ts          # Global error handling
├── validators/
│   └── jobValidation.ts         # Joi validation schemas
├── db/
│   └── index.ts                 # Supabase client & types
├── utils/
│   └── logger.ts                # Winston logging setup
└── server.ts                    # Express app entry point
```

## 🔧 Configuration

### Supported File Types
- **PDF**: `.pdf` files (parsed with pdf-parse)
- **Word**: `.docx` files (parsed with mammoth)
- **Text**: `.txt` files (direct reading)

### AI Model Configuration
- **Default Model**: Google Gemini 1.5 Flash
- **Temperature**: 0 (deterministic output)
- **Response Format**: Structured JSON

### Storage Configuration
- **Bucket**: `job_descriptions` (Supabase Storage)
- **Max File Size**: 10MB
- **Public Access**: Read-only for authenticated users

## 🐛 Error Handling

All API responses follow this format:

**Success Response**:
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}
```

**Error Response**:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Detailed error message"
}
```

## 📊 Logging

Logs are written to:
- **Console**: All levels (development)
- **logs/error.log**: Error level only
- **logs/combined.log**: All levels

Log levels: error, warn, info, http, verbose, debug, silly

## 🚀 Deployment

1. Build the project: `npm run build`
2. Set production environment variables
3. Ensure Supabase database and storage are configured
4. Run: `npm start`


## 📞 Support

For issues or questions:
- Check the logs in `logs/` directory
- Verify Supabase connection and RLS policies
- Ensure AI API key is valid and has quota
- Check file permissions for uploads directory
