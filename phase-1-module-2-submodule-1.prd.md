Alright — here’s **Phase 1 – Module 2, Submodule 1 PRD**
(**Express.js backend + Database creation**).

I’ll keep it fully structured so your backend devs can follow step-by-step to implement the APIs and DB schema for **Job Creation & AI-Assisted Job Setup**.

---

# 📄 **PRD: Phase 1 – Module 2 – Submodule 1**

## **Express.js Backend & Database Layer**

**Version:** 1.0
**Product:** Upzella – AI-Powered HR Assistant Platform
**Owner:** Backend Team
**Status:** Draft for Implementation
**Target Release:** MVP Sprint 2 – Backend
**Tech Stack:**

* **Backend:** Express.js + TypeScript
* **Database:** Supabase PostgreSQL
* **AI:** Google Gemini (default model)
* **Storage:** Supabase Storage for uploaded job description files

---

## 🎯 **Objective**

Build the backend service and database schema to:

1. Create & manage job postings
2. Store structured resume scoring configs
3. Support AI-powered job creation from an uploaded job description
4. Provide APIs for the Next.js frontend to use

---

## 🗃 **Database Schema**

### 1. **jobs** Table

Stores basic job details.

```sql
create table jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text not null,
  description text not null,
  skills_required text[] not null,
  work_type text[] not null, -- Full-time, Part-time, Remote, Hybrid, etc.
  employment_type text not null, -- Permanent, Contract, Internship
  experience_min int not null,
  experience_max int not null,
  resume_threshold int not null default 60, -- default 60%
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

### 2. **resume\_scoring\_weights** Table

Stores scoring rules for resume sections.

```sql
create table resume_scoring_weights (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade,
  section_name text not null, -- Education, Experience, etc.
  criteria_description text,
  weightage int not null, -- % value, sum across all = 100
  created_at timestamptz default now()
);
```

---

### 3. **ai\_models** Table

Stores AI model configs per user.

```sql
create table ai_models (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references employers(id) on delete cascade,
  model_name text not null,
  provider text not null,
  configs jsonb not null,
  created_at timestamptz default now()
);

-- Insert default Gemini config
insert into ai_models (user_id, model_name, provider, configs)
values (null, 'gemini-default', 'google', '{"temperature":0}');
```

---

## 🔄 **API Endpoints**

### 1. **POST /api/jobs**

**Purpose:** Create a new job with its scoring weights.

**Request Body:**

```json
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
    {"section_name": "Education", "criteria_description": "Bachelor's degree", "weightage": 20},
    {"section_name": "Projects", "criteria_description": "Relevant backend projects", "weightage": 20},
    {"section_name": "Experience", "criteria_description": "2+ years backend", "weightage": 40},
    {"section_name": "Certifications", "criteria_description": "Node.js cert", "weightage": 20}
  ],
  "original_job_description_text": "Optional: Original text from AI extraction for storage backup"
}
```

**Validation Rules:**

* All required fields present
* `resume_scoring` sum of `weightage` = **100**
* `experience_min` ≤ `experience_max`

**Response:**

```json
{ "job_id": "uuid" }
```

**New Feature:** If `original_job_description_text` is provided, it will be saved to Supabase Storage under `job-descriptions/{company_id}/job-description-{job_id}.txt` for backup purposes.

---

### 2. **POST /api/jobs/ai-extract**

**Purpose:** Extract structured job details from job description text using Gemini AI.

**Request Body:**

```json
{
  "job_description_text": "We are looking for a Backend Developer with 2+ years of experience..."
}
```

**Process:**

1. Validate the input text (minimum 50 characters)
2. Send text to Gemini AI with structured extraction prompt
3. Return structured fields to frontend for pre-fill
4. Frontend handles text extraction from uploaded files (PDF/DOCX/TXT)

**Response Example:**

```json
{
  "job_title": "Backend Developer",
  "job_description": "We are looking for a Backend Developer...",
  "skills_required": ["Node.js", "Express.js", "PostgreSQL"],
  "work_type": ["Full-time", "Remote"],
  "employment_type": "Permanent",
  "experience_range": { "min": 2, "max": 5 },
  "resume_threshold": 65,
  "resume_scoring": [
    {"section": "Education", "criteria": "Bachelor's degree", "weightage": 20},
    {"section": "Projects", "criteria": "Relevant backend projects", "weightage": 20},
    {"section": "Experience", "criteria": "2+ years backend", "weightage": 40},
    {"section": "Certifications", "criteria": "Node.js cert", "weightage": 20}
  ]
}
```

**Updated Implementation Notes:**
- Text extraction now happens in the frontend using browser libraries (PDF.js, mammoth.js)
- Backend only receives extracted text, not files
- Original job description text is preserved and stored to Supabase Storage when job is created

---

## 📂 **Backend File Structure**

```
src/
├── server.ts                    # Express app entry point
├── __tests__/
│   ├── jobs.test.ts             # API tests (Jest + Supertest)
│   └── setup.ts                 # Test environment setup
├── controllers/
│   └── jobs.controller.ts       # Job API logic
├── db/
│   ├── index.ts                 # Supabase client setup
│   └── migrations.sql           # Database migration SQL
├── middleware/
│   ├── auth.ts                  # JWT authentication middleware
│   └── errorHandler.ts          # Error handling middleware
├── routes/
│   └── jobs.routes.ts           # Job API routes
├── services/
│   ├── ai.service.ts            # Gemini AI integration
│   ├── file.service.ts          # File parsing, upload, Supabase Storage
│   └── jobs.service.ts          # Job DB logic
├── utils/
│   └── logger.ts                # Winston logger
├── validators/
│   └── jobValidation.ts         # Joi validation schemas
logs/
├── combined.log                 # All logs
└── error.log                    # Error logs
```

### Key Implementation Details (August 2025)
- **server.ts**: Central Express app, CORS, helmet, logging, error handling, health check.
- **auth.ts**: JWT authentication using Supabase, attaches user/company info to requests.
- **errorHandler.ts**: Centralized error handling for API responses.
- **file.service.ts**: Handles PDF/DOCX/TXT parsing, uploads to Supabase Storage, bucket creation/check.
- **ai.service.ts**: Google Gemini integration for extracting job details from text.
- **jobs.service.ts**: Handles job creation, update, delete, and scoring weights in Supabase.
- **jobValidation.ts**: Joi schemas for validating job creation and AI extraction.
- **migrations.sql**: Full migration for jobs, resume_scoring_weights, ai_models, RLS, triggers, storage bucket, and policies.
- **__tests__**: Jest + Supertest setup for API endpoint testing.

### Security & Storage
- **RLS policies**: Enforced for jobs, resume_scoring_weights, ai_models.
- **Supabase Storage**: Bucket `job_descriptions` auto-created if missing, public read, authenticated upload.
- **Auth Middleware**: Validates JWT, checks employer status, attaches company_id to request.

### Testing
- **Jest**: Configured for TypeScript, coverage, and test environment.
- **Supertest**: Used for API endpoint tests.
- **Test Cases**: Health check, authentication required, validation errors, file upload, AI extraction.

### Other Improvements
- **Logging**: Winston logger with colorized console and file output.
- **Error Handling**: Consistent error responses, stack traces in development.
- **Validation**: Joi schemas ensure strict API input validation.
- **Triggers**: Automatic updated_at timestamp, resume scoring weightage validation.

---

## 🧪 **Testing Scenarios**

| Test Case                       | Action                    | Expected Result                    |
| ------------------------------- | ------------------------- | ---------------------------------- |
| 1. Create job with valid fields | POST /api/jobs            | Job inserted, scoring rules stored |
| 2. Weightage not 100%           | POST /api/jobs            | Validation error                   |
| 3. AI extract valid text        | POST /api/jobs/ai-extract | Structured JSON returned           |
| 4. AI extract short text        | POST /api/jobs/ai-extract | Error response (min 50 chars)     |
| 5. Create job with original text | POST /api/jobs            | Job created, text saved to storage |
| 6. Storage backup verification   | Check Supabase Storage    | Original text file exists          |

---

## 🔐 **Security**

* Auth middleware: validate employer’s company\_id matches token
* RLS in Supabase: company isolation
* File uploads: authenticated, public read only for extracted JD
