# Upzella Employer App

A modern Next.js 14 application for employers to manage job postings, view applications, and handle recruitment processes with AI-powered features.

## 🚀 Overview

The Upzella Employer App is a comprehensive recruitment platform built with Next.js 14, featuring a professional UI/UX design system, job management capabilities, and AI-powered job creation tools. The application provides employers with everything needed to post jobs, manage applications, and streamline their hiring process.


## 🏗 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Backend Services
   NEXT_PUBLIC_JOB_SERVICE_URL=http://localhost:8001
   NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8002
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── globals.css           # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Home page
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Main dashboard page
│   ├── jobs/                 # Job management pages
│   ├── profile/              # User profile management
│   ├── settings/             # Application settings
│   └── onboarding/           # Company setup process
├── components/               # Reusable React components
│   ├── Logo.tsx              # Company logo component
│   ├── forms/                # Form components
│   ├── modals/               # Modal components
│   ├── svg-icons/            # 40+ custom SVG icon components
│   └── ui-components/        # Design system components
├── context/                  # React Context providers
├── hooks/                    # Custom React hooks
├── lib/                      # Utility libraries
├── services/                 # API service layers
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

## 🎨 Design System

### Enhanced Components

**Professional Table Component**:
- 5 color schemes (purple, blue, pink, slate, gradient)
- Professional variants with enhanced UX
- Fixed pagination and responsive design
- Status badges and action buttons

**StatsContainer Component**:
- Multi-color variants with trending indicators
- Professional styling with gradient backgrounds
- Flexible grid layouts (2-6 columns)
- Animated hover effects

**UI Components Library**:
- Button with multiple variants and sizes
- Card with professional styling
- Badge for status indicators
- Modal with modern design
- Form components with validation

## 🔗 API Integration

### Backend Services

**Job Creation Service (Port 8001)**:
- Job CRUD operations
- AI-powered job extraction
- Resume scoring configuration

**User Management Service (Port 8002)**:
- Profile management
- Avatar uploads
- Settings and preferences

### Service Classes

```typescript
import { JobService } from '@/services/job.service';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';
```

## 📱 Key Features

### Job Management
- **Create Jobs**: Rich form with AI extraction
- **Edit Jobs**: Comprehensive editing interface
- **Job Listings**: Professional table with sorting/filtering
- **Job Details**: Modern detail view with statistics
- **Applications Dashboard**: Candidate management

### User Experience
- **Professional UI**: Clean, modern interface design
- **Responsive Design**: Mobile-first responsive layout
- **Toast Notifications**: User feedback system
- **Loading States**: Smooth user experience

### AI Integration
- **Job Extraction**: AI-powered job posting creation
- **Smart Parsing**: Automatic skill and requirement detection
- **Resume Scoring**: Configurable candidate evaluation

## 🔐 Authentication & Security

- **Supabase Auth**: Email/password and OAuth providers
- **JWT Tokens**: Secure API communication
- **Route Protection**: Middleware-based route guards
- **Session Management**: Persistent login state

## 📚 Learn More

### Internal Resources
- Design System Guide: `UPZELLA_DESIGN_SYSTEM.md`
- Backend API Docs: `../backend/api-docs-*.md`
- Database Schema: `../backend/db.md`

## 🤝 Contributing

1. **TypeScript**: Use strict typing for all components
2. **Component Structure**: Follow established patterns
3. **Styling**: Use Tailwind CSS classes consistently
4. **API Integration**: Use service layer for all API calls
5. **Error Handling**: Implement proper error boundaries

