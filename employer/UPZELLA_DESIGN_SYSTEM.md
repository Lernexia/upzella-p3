# 🎨 Upzella Design System & Style Guide

**Version**: 1.0.0  
**Platform**: Next.js 15 + TypeScript + Tailwind CSS  
**Purpose**: Comprehensive design system for Upzella HR Assistant Platform  

---

## 🎯 Overview

The Upzella Design System provides a complete set of design tokens, components, and guidelines for building consistent, accessible, and beautiful user interfaces across the Upzella platform. This system ensures visual cohesion while maintaining flexibility for different use cases.

### ✨ Key Features

- **🎨 Modern Design Language**: Clean, professional aesthetics with subtle gradients
- **📱 Mobile-First**: Responsive components that work on all screen sizes  
- **♿ Accessibility**: WCAG AA compliant with proper contrast ratios
- **⚡ Performance**: Optimized components with minimal bundle impact
- **🔧 Developer Experience**: TypeScript support with comprehensive prop types

---

## 🌈 Color System

### Brand Colors

Our color palette is built around three primary color families that represent Upzella's core values:

| Color | Purpose | Hex Value | CSS Variable |
|-------|---------|-----------|--------------|
| **Primary Blue** | Trust & Reliability | `#2563eb` | `var(--blue-600)` |
| **Secondary Purple** | Innovation & Technology | `#9333ea` | `var(--purple-600)` |
| **Accent Pink** | Energy & Action | `#ec4899` | `var(--pink-500)` |

### Color Shades

Each color family includes 11 shades from 50 (lightest) to 950 (darkest):

#### Blue Shades
```css
--blue-50: #eff6ff    /* Backgrounds, subtle highlights */
--blue-100: #dbeafe   /* Light backgrounds */
--blue-200: #bfdbfe   /* Borders, dividers */
--blue-300: #93c5fd   /* Disabled states */
--blue-400: #60a5fa   /* Hover states */
--blue-500: #3b82f6   /* Primary actions */
--blue-600: #2563eb   /* Brand primary */
--blue-700: #1d4ed8   /* Active states */
--blue-800: #1e40af   /* Text on light backgrounds */
--blue-900: #1e3a8a   /* Headers, important text */
--blue-950: #172554   /* High contrast text */
```

#### Purple Shades
```css
--purple-50: #faf5ff  /* Backgrounds, subtle highlights */
--purple-100: #f3e8ff /* Light backgrounds */
--purple-200: #e9d5ff /* Borders, dividers */
--purple-300: #d8b4fe /* Disabled states */
--purple-400: #c084fc /* Hover states */
--purple-500: #a855f7 /* Secondary actions */
--purple-600: #9333ea /* Brand secondary */
--purple-700: #7c3aed /* Active states */
--purple-800: #6b21a8 /* Text on light backgrounds */
--purple-900: #581c87 /* Headers, important text */
--purple-950: #3b0764 /* High contrast text */
```

#### Pink Shades
```css
--pink-50: #fdf2f8    /* Backgrounds, subtle highlights */
--pink-100: #fce7f3   /* Light backgrounds */
--pink-200: #fbcfe8   /* Borders, dividers */
--pink-300: #f9a8d4   /* Disabled states */
--pink-400: #f472b6   /* Hover states */
--pink-500: #ec4899   /* Accent actions */
--pink-600: #db2777   /* Strong accents */
--pink-700: #be185d   /* Active states */
--pink-800: #9d174d   /* Text on light backgrounds */
--pink-900: #831843   /* Headers, important text */
--pink-950: #500724   /* High contrast text */
```

### Gradient System

```css
/* Primary Brand Gradient */
--upzella-gradient-primary: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);

/* Secondary Gradient */
--upzella-gradient-secondary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f472b6 100%);

/* Tertiary Gradient */
--upzella-gradient-tertiary: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #f59e0b 100%);
```

### Usage Guidelines

- **Light shades (50-200)**: Backgrounds, subtle highlights
- **Medium shades (300-600)**: Interactive elements, buttons, links
- **Dark shades (700-950)**: Text, borders, high contrast elements
- **Gradients**: Hero sections, CTAs, premium features

---

## 📝 Typography

### Font Families

#### Montserrat (Headings & Heroes)
```css
font-family: var(--font-montserrat);
```
- **Purpose**: Main headings, hero text, brand presence
- **Characteristics**: Bold, impactful, modern serif-like feel
- **Usage**: H1-H6, page titles, section headers

#### Outfit (Titles & Headers)
```css
font-family: var(--font-outfit);
```
- **Purpose**: Section titles, component headers, card titles
- **Characteristics**: Clean, modern, geometric
- **Usage**: Subsection titles, component headers, navigation

#### Inter (Body Text)
```css
font-family: var(--font-inter);
```
- **Purpose**: Body text, paragraphs, content areas
- **Characteristics**: Optimized for reading, excellent on screens
- **Usage**: Paragraphs, descriptions, form labels, content

#### Poppins (Accent & UI)
```css
font-family: var(--font-poppins);
```
- **Purpose**: Buttons, labels, UI elements
- **Characteristics**: Friendly, approachable, rounded
- **Usage**: Buttons, badges, navigation, UI labels

### Typography Scale

| Element | Font Family | Size | Weight | Line Height | Usage |
|---------|-------------|------|--------|-------------|-------|
| **Hero** | Montserrat | 4rem-5rem | 700 | 1.1 | Landing pages, main heroes |
| **H1** | Montserrat | 2.5rem-3rem | 700 | 1.2 | Page titles |
| **H2** | Montserrat | 2rem-2.5rem | 700 | 1.3 | Section titles |
| **H3** | Montserrat | 1.5rem-2rem | 700 | 1.4 | Subsection titles |
| **H4** | Outfit | 1.25rem-1.5rem | 600 | 1.4 | Component titles |
| **H5** | Outfit | 1.125rem | 600 | 1.5 | Card titles |
| **H6** | Outfit | 1rem | 600 | 1.5 | Small titles |
| **Body Large** | Inter | 1.125rem | 400 | 1.6 | Introduction text |
| **Body** | Inter | 1rem | 400 | 1.6 | Regular content |
| **Body Small** | Inter | 0.875rem | 400 | 1.6 | Captions, metadata |
| **Label** | Poppins | 0.875rem | 500 | 1.4 | Form labels, UI text |
| **Button** | Poppins | 0.875rem-1rem | 600 | 1.2 | Button text |

### CSS Classes

```css
/* Typography Helper Classes */
.font-heading { font-family: var(--font-montserrat); }
.font-title { font-family: var(--font-outfit); }
.font-body { font-family: var(--font-inter); }
.font-accent { font-family: var(--font-poppins); }

/* Gradient Text */
.text-gradient {
  background: var(--upzella-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🔘 Button Components

### Variants

#### Primary Button
```tsx
<Button variant="primary">Primary Action</Button>
```
- **Use case**: Main call-to-action, submit buttons
- **Style**: Blue gradient with white text
- **Behavior**: Hover lift effect, ripple animation

#### Secondary Button
```tsx
<Button variant="secondary">Secondary Action</Button>
```
- **Use case**: Important but not primary actions
- **Style**: Green gradient with white text
- **Behavior**: Subtle hover effects

#### Outline Button
```tsx
<Button variant="outline">Outline Action</Button>
```
- **Use case**: Cancel actions, secondary options
- **Style**: Transparent with colored border
- **Behavior**: Background fill on hover

#### Ghost Button
```tsx
<Button variant="ghost">Ghost Action</Button>
```
- **Use case**: Subtle actions, navigation
- **Style**: Transparent with minimal styling
- **Behavior**: Background color on hover

#### Gradient Button
```tsx
<Button variant="gradient">Premium Action</Button>
```
- **Use case**: Hero CTAs, premium features
- **Style**: Multi-color gradient
- **Behavior**: Scale and shadow effects

### Sizes

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| `sm` | 38px | 16px 16px | 12px | Compact spaces, tables |
| `md` | 44px | 24px 24px | 14px | Default size, forms |
| `lg` | 48px | 32px 32px | 16px | Important actions |
| `xl` | 52px | 40px 40px | 18px | Hero CTAs |

### States

- **Normal**: Default interactive state
- **Hover**: Elevated with shadow effects
- **Active**: Pressed state with reduced elevation
- **Loading**: Spinner with optional loading text
- **Disabled**: Reduced opacity, non-interactive

### Props Interface

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  children: ReactNode;
}
```

---

## 📝 Input Components

### Variants

#### Default Input
```tsx
<Input label="Email" placeholder="Enter your email" />
```
- **Style**: Clean border with focus states
- **Behavior**: Border color change and shadow on focus

#### Filled Input
```tsx
<Input variant="filled" label="Name" />
```
- **Style**: Background filled with subtle color
- **Behavior**: Smooth transitions

#### Outlined Input
```tsx
<Input variant="outlined" label="Company" />
```
- **Style**: Prominent border styling
- **Behavior**: Animated border effects

### Features

- **Floating Labels**: Labels animate on focus/value
- **Validation States**: Success, error, and loading indicators
- **Icon Support**: Left and right icon slots
- **Accessibility**: Proper ARIA labels and keyboard navigation

---

## 🏗️ Layout System

### Simplified Container System

The Upzella layout system uses a single, consistent container approach for all content across the platform.

```css
/* Main Content Container */
.sizer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 97%;
}
```

#### Usage

```tsx
// Standard page layout
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
  <div className="sizer">
    <div className="text-center mb-16 pt-16">
      <h1>Page Title</h1>
    </div>
    
    <div className="pb-16">
      {/* Your content here */}
    </div>
  </div>
</div>

// 404 Page Layout
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div className="sizer text-center">
    <h1>404 - Page Not Found</h1>
    <p>Content goes here...</p>
  </div>
</div>
```

### Border Radius

```css
--border-radius-sm: 8px;
--border-radius-md: 12px;  /* Default Upzella radius */
--border-radius-lg: 16px;
--border-radius-xl: 20px;
--border-radius-upzella: 12px;  /* Brand standard */
```

### Shadow System

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## 🎴 Card Components

### Basic Card
```css
.card {
  background: white;
  border-radius: var(--border-radius-upzella);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--blue-100);
}
```

### Gradient Card
```css
.card-gradient {
  background: var(--upzella-gradient-secondary);
  border: 1px solid var(--purple-200);
}
```

---

## 🎭 Animation System

### Duration Scale

```css
--duration-fast: 150ms;    /* Quick interactions */
--duration-normal: 300ms;  /* Standard transitions */
--duration-slow: 500ms;    /* Complex animations */
```

### Common Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide In */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Button Hover */
.btn-hover {
  transition: all 0.3s ease;
}
.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.35);
}
```

---

## ♿ Accessibility Guidelines

### Color Contrast

- **AA Standard**: Minimum 4.5:1 contrast ratio for normal text
- **AAA Standard**: 7:1 contrast ratio for better accessibility
- **Large Text**: 3:1 minimum for text 18px+ or 14px+ bold

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Focus indicators must be clearly visible
- Tab order should be logical and predictable

### Screen Readers

- Use semantic HTML elements
- Provide alt text for images
- Include ARIA labels where necessary
- Ensure proper heading hierarchy

---

## 🧪 Testing & Quality

### Component Testing

```bash
# Run component tests
npm run test:components

# Visual regression testing
npm run test:visual

# Accessibility testing
npm run test:a11y
```

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Android Chrome 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

---

## 🚀 Getting Started

### Installation

```bash
# Clone the project
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Component Usage

```tsx
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';

function MyComponent() {
  return (
    <div className="card">
      <h2 className="font-heading text-2xl font-bold mb-4">
        Welcome to Upzella
      </h2>
      <Input 
        label="Email" 
        placeholder="Enter your email"
        className="mb-4"
      />
      <Button variant="primary" fullWidth>
        Get Started
      </Button>
    </div>
  );
}
```

### CSS Custom Properties

```css
/* Use design tokens in your CSS */
.my-component {
  background: var(--upzella-gradient-primary);
  border-radius: var(--border-radius-upzella);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}
```

---

## 📚 Component Library

### Available Components

#### Core Components
- ✅ **Button** - Multiple variants and sizes with interactive states
- ✅ **Input** - Form inputs with validation and icons
- ✅ **Textarea** - Multi-line text input with auto-resize
- ✅ **Select** - Dropdown selections with search
- ✅ **Checkbox** - Selection controls with custom styling
- ✅ **Toggle** - Switch components with enhanced variants
- ✅ **Label** - Form labels with proper accessibility

#### Layout & Display
- ✅ **Card** - Content containers with multiple variants
- ✅ **Modal** - Dialog and popup components
- ✅ **Table** - Data display tables with sorting
- ✅ **Badge** - Status indicators and labels
- ✅ **InfoCard** - Information display cards
- ✅ **StatsContainer** - Statistics and metrics display

#### Feedback & Interaction
- ✅ **Toast** - Notification messages with actions
- ✅ **Tooltip** - Contextual help and information
- ✅ **Popover** - Contextual overlays and menus
- ✅ **Loader** - Loading indicators and spinners
- ✅ **NotificationModal** - System notifications

#### Advanced Components
- ✅ **EnhancedTabs** - Tabbed navigation with animations
- ✅ **EnhancedToggle** - Advanced toggle with states
- ✅ **GradientBar** - Progress and visual indicators
- ✅ **InterviewInfo** - Specialized HR components
- ✅ **InviteCandidateModal** - HR workflow modals

#### Form Components
- ✅ **Form** - Complete form wrapper with validation
- ✅ **Form Controls** - Integrated form field components

#### Icons & Visual Elements
- ✅ **SVG Icons** - Comprehensive icon library with animations

### Component Documentation

Each component includes:
- **Props interface** with TypeScript definitions
- **Usage examples** with code snippets
- **Accessibility guidelines** and ARIA support
- **Browser support** information
- **Performance considerations**

---

## 🔄 Version History

### v1.0.0 (Current)
- Initial design system release
- Complete color palette implementation
- Typography system with 4 font families
- Button component with 9 variants
- Input component with validation states
- Comprehensive documentation

---

## 🤝 Contributing

### Adding New Components

1. Create component in `/components/ui-components/`
2. Add TypeScript interfaces in `/types/props/`
3. Include comprehensive tests
4. Update documentation
5. Add to test pages for visual verification

### Design Token Updates

1. Update CSS variables in `globals.css`
2. Update documentation
3. Test across all components
4. Verify accessibility compliance

---

## 📞 Support

For questions, issues, or contributions:

- **Documentation**: `/test` routes for live examples
- **Component Issues**: Check existing components in `/components/ui-components/`
- **Design Questions**: Refer to this style guide
- **Development**: Follow TypeScript best practices

---

**Built with ❤️ for the Upzella Platform**  
*Empowering HR professionals with beautiful, accessible, and performant user interfaces.*
