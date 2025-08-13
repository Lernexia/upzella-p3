# Upzella Employer App

A modern Next.js 14 application for employers to manage job postings, view applications, and handle recruitment processes with AI-powered features.

## 🚀 Overview

The Upzella Employer App is a comprehensive recruitment platform built with Next.js 14, featuring a professional UI/UX design system, job management capabilities, and AI-powered job creation tools. The application provides employers with everything needed to post jobs, manage applications, and streamline their hiring process.

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **React**: Component-based UI library

### UI/UX Components
- **Custom Design System**: Upzella-specific component library
- **SVG Icons**: Custom icon library for consistent branding
- **Responsive Design**: Mobile-first approach
- **Professional Themes**: Multiple color schemes and variants

### State Management & Context
- **React Context**: Authentication and toast notifications
- **Custom Hooks**: Reusable state logic
- **Local Storage**: Persistent user preferences

### Backend Integration
- **Supabase**: Database and authentication
- **REST APIs**: Job Creation and User Management services
- **File Uploads**: Resume and company logo handling
- **Real-time Updates**: Live data synchronization

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization
- **TypeScript Config**: Strict type checking
- **Environment Variables**: Secure configuration management

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Backend services running (Job Creation + User Management)

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

## 🚀 Development

### Available Scripts

- **`npm run dev`**: Start development server
- **`npm run build`**: Create production build
- **`npm run start`**: Start production server
- **`npm run lint`**: Run ESLint

### Environment Configuration

**Development**:
```env
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_JOB_SERVICE_URL=http://localhost:8001
```

**Production**:
```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_JOB_SERVICE_URL=https://your-job-service.com
```

## 📊 Performance

### Next.js Optimizations
- **App Router**: Latest routing system
- **Server Components**: Reduced client bundle
- **Image Optimization**: Automatic image processing
- **Code Splitting**: Automatic bundle optimization

## 🧪 Testing & Quality

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms
- **Docker**: Containerized deployment
- **AWS**: EC2, Lambda, or ECS deployment
- **DigitalOcean**: App Platform deployment

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

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

## 🐛 Troubleshooting

### Common Issues

**Build Failures**:
- Check TypeScript errors: `npx tsc --noEmit`
- Verify environment variables
- Clear Next.js cache: `rm -rf .next`

**Authentication Issues**:
- Verify Supabase configuration
- Check JWT token expiration
- Validate redirect URLs

---

**Framework**: Next.js 14 with App Router  
**UI Library**: Custom Design System + Tailwind CSS  
**Backend**: Microservices Architecture  
**Development URL**: `http://localhost:3000`
