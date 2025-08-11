# Database Schema - Upzella P3

## Overview
This document represents the updated database schema of the Upzella P3 system with JSON-based field restructuring. The database consists of 4 main tables with enhanced JSON data structures for better organization.

```mermaid
erDiagram
    companies ||--o{ jobs : "has"
    companies ||--o{ employers : "employs"
    employers ||--o{ ai_models : "uses"

    companies {
        uuid id PK "gen_random_uuid()"
        text name "NOT NULL"
        text domain
        text website_url
        text linkedin_url
        text x_url
        text instagram_url
        text phone
        text logo_url
        text employee_count "CHECK: 1-10,11-50,51-200,201-500,501-1000,1000+"
        text company_type "CHECK: startup,small,mid-market,enterprise"
        text industry
        text country "NOT NULL"
        text state
        text address
        text pincode
        text timezone "DEFAULT: UTC, NOT NULL"
        timestamptz created_at "DEFAULT: now()"
        timestamptz updated_at "DEFAULT: now()"
    }

    employers {
        uuid id PK "gen_random_uuid()"
        text full_name "NOT NULL"
        text email UK "NOT NULL, UNIQUE"
        text phone
        uuid company_id FK
        text job_role "DEFAULT: HR Manager"
        text avatar_url
        boolean is_active "DEFAULT: true"
        boolean is_verified "DEFAULT: false"
        timestamptz last_login_at
        timestamptz created_at "DEFAULT: now()"
        timestamptz updated_at "DEFAULT: now()"
    }

    jobs {
        uuid id PK "gen_random_uuid()"
        uuid company_id FK "NOT NULL"
        text role_name "NOT NULL"
        text title "NOT NULL"
        text description "NOT NULL"
        text[] skills_required "NOT NULL, ARRAY"
        text[] work_type "NOT NULL, ARRAY, CHECK: remote,hybrid,onsite,all"
        text[] employment_type "NOT NULL, ARRAY, CHECK: part-time,full-time,contract,internship,freelance,temporary"
        text[] seniority_level "NOT NULL, ARRAY, CHECK: entry-level,fresher,junior,senior,manager,director,executive"
        jsonb location_details "JSONB: {location_country, location_state, location_city, location_pin_code}"
        jsonb salary_details "JSONB: {salary_currency, salary_from, salary_to, salary_period}"
        jsonb experience_details "JSONB: {experience_min, experience_max}, NOT NULL"
        text[] compensation "ARRAY, CHECK: Medical Insurance,Provident Fund,Food Allowance,etc"
        integer resume_threshold "DEFAULT: 65, NOT NULL"
        jsonb resume_score_weightage_details "JSONB ARRAY: [{resume_section, resume_criteria, resume_weightage, reason}], NOT NULL"
        text original_job_description_text
        text status "DEFAULT: draft, NOT NULL, CHECK: draft,published,paused,closed"
        timestamptz created_at "DEFAULT: now()"
        timestamptz updated_at "DEFAULT: now()"
    }

    ai_models {
        uuid id PK "uuid_generate_v4()"
        uuid user_id FK
        text model_name "NOT NULL"
        text provider "NOT NULL"
        jsonb configs "NOT NULL"
        timestamptz created_at "DEFAULT: now()"
    }
```

## Table Details

### Companies Table
- **Purpose**: Stores company information and profile details
- **RLS**: Disabled
- **Size**: 144 kB (53 live rows, 9 dead rows)
- **Primary Key**: `id` (UUID)
- **Constraints**: 
  - `employee_count` must be one of: '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
  - `company_type` must be one of: 'startup', 'small', 'mid-market', 'enterprise'
- **Foreign Key Relations**: Referenced by `jobs.company_id` and `employers.company_id`

### Employers Table  
- **Purpose**: Stores employer/user account information
- **RLS**: Disabled
- **Size**: 160 kB (2 live rows, 20 dead rows)
- **Primary Key**: `id` (UUID)
- **Unique Constraints**: `email` must be unique
- **Comments**: `job_role` field represents the employer's position within their company
- **Foreign Key Relations**: 
  - References `companies.id` via `company_id`
  - Referenced by `ai_models.user_id`

### Jobs Table
- **Purpose**: Stores enhanced job postings with JSON-structured data for better organization and flexibility
- **RLS**: Enabled (Row Level Security)
- **Size**: 64 kB (estimated - will grow with new JSON fields)
- **Primary Key**: `id` (UUID)
- **Enhanced JSON Structure Features**: 
  - Consolidated location information in `location_details` JSONB field with country, state, city, pin_code
  - Unified salary information in `salary_details` JSONB field with currency, range, and period
  - Experience requirements in `experience_details` JSONB field with min/max values
  - Resume scoring criteria moved to `resume_score_weightage_details` JSONB array eliminating separate table
  - Updated constraint values for modern work arrangements
- **JSONB Fields**: 
  - `location_details`: `{location_country, location_state, location_city, location_pin_code}`
  - `salary_details`: `{salary_currency: 'USD'|'INR', salary_from, salary_to, salary_period: 'per hour'|'per month'|'per annum'}`
  - `experience_details`: `{experience_min, experience_max}` (NOT NULL)
  - `resume_score_weightage_details`: Array of `{resume_section: 'Education'|'Experience'|'Projects'|'Certifications'|'Skills'|'Achievements', resume_criteria: string, resume_weightage: number, reason: string}` (NOT NULL)
- **Array Fields**: 
  - `skills_required` - Technical and professional skills (text array)
  - `work_type` - Work arrangements (constrained to: remote, hybrid, onsite, all)
  - `employment_type` - Employment types (constrained to: part-time, full-time, contract, internship, freelance, temporary)
  - `seniority_level` - Experience levels (constrained to: entry-level, fresher, junior, senior, manager, director, executive)
  - `compensation` - Standard benefits (Medical Insurance, Provident Fund, Food Allowance, House Allowance, Transport Allowance, Performance Bonus, Gym Membership, Learning Stipend, Flexible Hours, Work From Home, Stock Options)
- **Removed Fields**: 
  - `job_name` - Eliminated in favor of using title field
  - Individual experience fields (`experience_min`, `experience_max`) - Moved to JSON
  - Individual salary fields (`salary_currency`, `salary_from`, `salary_to`, `salary_period`) - Moved to JSON
- **Foreign Key Relations**: 
  - References `companies.id` via `company_id`

### AI Models Table
- **Purpose**: Stores AI model configurations for users
- **RLS**: Enabled (Row Level Security) 
- **Size**: 48 kB (1 live row, 5 dead rows)
- **Primary Key**: `id` (UUID)
- **JSONB Field**: `configs` stores model configuration data
- **Foreign Key Relations**: References `employers.id` via `user_id`

## Security Features

### Row Level Security (RLS)
The following tables have RLS enabled:
- `jobs` - Ensures users can only access jobs from their company
- `ai_models` - Limits AI model access to the owning user

### Data Validation
- Company employee count and type are constrained to specific values
- Email uniqueness is enforced at database level
- All foreign key relationships maintain referential integrity
- JSON schema validation for structured JSONB fields
- Resume scoring weightage validation (must sum to 100)
- GIN indexes on JSONB fields for efficient querying

## Major Schema Changes
- **Removed Tables**: `resume_scoring_weights` table eliminated - data consolidated into jobs table JSON field
- **JSON Consolidation**: Individual columns converted to structured JSONB fields for better data organization
- **Constraint Updates**: Work type and employment type values updated for modern work arrangements
- **Field Elimination**: Redundant `job_name` field removed in favor of `title`
- **Enhanced Validation**: JSON structure allows for more complex validation and data integrity

## Database Statistics
- **Total Tables**: 4 (reduced from 5)
- **Tables with RLS**: 2 (jobs, ai_models)
- **Total Database Size**: ~465 kB (optimized with JSON structure)
- **Active Records**: 66 live rows across all tables
- **PostgreSQL Version**: 17.4.1.068
