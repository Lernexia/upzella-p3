'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    EmployerSignupSchema,
    EmployerSignup,
    OTPVerificationSchema,
    OTPVerification
} from '@/lib/schema/employer.schema';
import {
    CompanySelect
} from '@/lib/schema/company.schema';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { SearchableSelect } from '@/components/ui-components/SearchableSelect';
import { BasicSelect } from '@/components/ui-components/BasicSelect';
import { Checkbox } from '@/components/ui-components/Checkbox';
import { Form, FormField, FormGroup } from '@/components/ui-components/form';
import { useToast } from '@/hooks/useToast';
import {
    SparkleIcon,
    AIIcon,
    HireIcon,
    SearchIcon,
    UserIcon,
    EmailIcon,
    PhoneIcon,
    CompanyIcon,
    CheckIcon,
    CrossIcon,
    LoadingIcon,
    ArrowLeftIcon
} from '@/components/svg-icons';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/Logo';

// Dynamically import PhoneInput to avoid hydration issues
const PhoneInput = dynamic(() => import('react-phone-input-2'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse" />
    )
});

// Import PhoneInput CSS
import "react-phone-input-2/lib/style.css";
import { companyService } from '@/services/companies.service';

// Step enum for the signup flow
enum SignupStep {
    FORM = 'form',
    OTP = 'otp'
}

export default function SignupPage() {
    const router = useRouter();
    const { signup, verifyOTP, resendOTP, loading: authLoading, user } = useAuth();
    const { toast } = useToast();

    // Client-side mounting state to prevent hydration issues
    const [mounted, setMounted] = useState(false);

    // State management
    const [currentStep, setCurrentStep] = useState<SignupStep>(SignupStep.FORM);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<CompanySelect[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [companyNameSearched, setCompanyNameSearched] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState<CompanySelect[]>([]);
    const [showCreateOption, setShowCreateOption] = useState(false);
    const [pendingEmail, setPendingEmail] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Form data
    const [signupData, setSignupData] = useState<EmployerSignup>({
        full_name: '',
        email: '',
        phone: '',
        company_id: undefined,
        job_role: 'HR Manager',
        terms_agreed: false,
    });

    const [otpData, setOtpData] = useState<OTPVerification>({
        email: '',
        otp_code: '',
    });

    // Form validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [emailValidation, setEmailValidation] = useState<{
        isValid: boolean;
        message: string;
        isChecking: boolean;
    }>({
        isValid: false,
        message: '',
        isChecking: false
    });

    // Set mounted state on client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    // Load companies on mount
    useEffect(() => {
        loadCompanies();
    }, []);

    /**
     * Validate business email in real-time
     */
    async function validateBusinessEmail(email: string) {
        if (!email) {
            setEmailValidation({ isValid: false, message: '', isChecking: false });
            return;
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailValidation({ isValid: false, message: 'Invalid email format', isChecking: false });
            return;
        }

        setEmailValidation({ isValid: false, message: '', isChecking: true });

        // Check for consumer email domains
        const consumerDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'aol.com', 'icloud.com', 'live.com', 'msn.com'
        ];

        const domain = email.split('@')[1]?.toLowerCase();

        if (consumerDomains.includes(domain)) {
            setEmailValidation({
                isValid: false,
                message: 'Please use your company email address',
                isChecking: false
            });
            return;
        }

        // Simulate API check delay
        setTimeout(() => {
            setEmailValidation({
                isValid: true,
                message: 'Business email verified',
                isChecking: false
            });
        }, 500);
    }

    /**
     * Company Logo Component with fallback
     */
    function CompanyLogo({ logoUrl, companyName }: { logoUrl?: string | null; companyName: string }) {
        const [imageError, setImageError] = useState(false);

        if (!logoUrl || imageError) {
            return (
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-300">
                    <CompanyIcon size={32} color="#6b7280" />
                </div>
            );
        }

        return (
            <img
                src={logoUrl}
                alt={`${companyName} logo`}
                className="w-full h-full object-cover border border-gray-200 shadow-sm"
                onError={() => setImageError(true)}
            />
        );
    }

    /**
     * Load available companies
     */
    async function loadCompanies() {
        try {
            const companiesList = await companyService.getCompanies();
            setCompanies(companiesList);
            setFilteredCompanies(companiesList);
        } catch (error) {
            console.error('Error loading companies:', error);
            toast.error('Failed to load companies');
        }
    }

    /**
     * Handle company search and show create option if no results
     */
    function handleCompanySearch(query: string) {
        setSearchQuery(query);

        if (!query) {
            setFilteredCompanies(companies);
            setShowCreateOption(false);
            return;
        }

        const filtered = companies.filter(company =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.industry?.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredCompanies(filtered);
        setShowCreateOption(filtered.length === 0 && query.length > 2);
    }

    /**
     * Check if all required fields are completed
     */
    function isFormComplete(): boolean {
        return !!(
            signupData.full_name &&
            signupData.email &&
            emailValidation.isValid &&
            signupData.phone &&
            signupData.job_role &&
            (signupData.company_id || showCreateOption) &&
            signupData.terms_agreed
        );
    }

    /**
     * Validate signup form
     */
    function validateSignupForm(): boolean {
        const newErrors: Record<string, string> = {};

        try {
            EmployerSignupSchema.parse(signupData);
        } catch (error: any) {
            error.errors?.forEach((err: any) => {
                newErrors[err.path[0]] = err.message;
            });
        }

        // Check if company is selected or create new company option is chosen
        if (!signupData.company_id && !showCreateOption) {
            newErrors.company_id = 'Please select a company or search to create a new one';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    /**
     * Handle signup form submission
     */
    async function handleSignupSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validateSignupForm()) {
            toast.error('Please fix the form errors');
            return;
        }


        setLoading(true);

        try {
            const result = await signup(
                signupData,
                {
                    companyName: companyNameSearched,
                    isCreateNew: showCreateOption && !signupData.company_id
                }
            );

            if (result.success) {
                setPendingEmail(signupData.email);
                setOtpData({ email: signupData.email, otp_code: '' });
                setCurrentStep(SignupStep.OTP);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handle OTP verification
     */
    async function handleOTPSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            OTPVerificationSchema.parse(otpData);
        } catch (error: any) {
            const otpErrors: Record<string, string> = {};
            error.errors?.forEach((err: any) => {
                otpErrors[err.path[0]] = err.message;
            });
            setErrors(otpErrors);
            return;
        }

        setLoading(true);
        try {
            const result = await verifyOTP(otpData);

            if (result.success && result.redirectTo) {
                toast.success('Account verified successfully!');
                router.push(result.redirectTo);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('Verification failed');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handle resend OTP
     */
    async function handleResendOTP() {
        if (resendCooldown > 0) return;

        setLoading(true);
        try {
            const result = await resendOTP(pendingEmail);

            if (result.success) {
                toast.success('OTP sent successfully');
                setResendCooldown(60); // 60 second cooldown
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            toast.error('Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handle input changes
     */
    function handleInputChange(field: string, value: any) {
        setSignupData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }

        // Validate email on change
        if (field === 'email') {
            validateBusinessEmail(value);
        }
    }

    /**
     * Render signup form
     */
    function renderSignupForm() {
        return (
            <div className="min-h-screen flex">
                <style jsx global>
                    {`
          .phone-input-container .react-tel-input {
            font-family: var(--font-body);
          }

          .phone-input-container .react-tel-input .form-control:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            border-width: 2px;
          }
          
          .phone-input-container .react-tel-input .flag-dropdown {
            border: 2px solid #e5e7eb;
            border-right: none;
            border-radius: var(--border-radius-upzella) 0 0 var(--border-radius-upzella);
            background-color: #f9fafb;
            transition: all 0.2s ease-in-out;
            height: 48px;
          }
          
          .phone-input-container .react-tel-input .flag-dropdown:hover {
            background-color: #f3f4f6;
            border-color: #d1d5db;
          }
          
          .phone-input-container .react-tel-input .flag-dropdown:focus,
          .phone-input-container .react-tel-input .flag-dropdown.open {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
          
          .phone-input-container .react-tel-input .country-list {
            border-radius: var(--border-radius-upzella);
            border: 2px solid #e5e7eb;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 50;
            font-family: var(--font-body);
            max-height: 300px;
            overflow-y: auto;
          }
          
          .phone-input-container .react-tel-input .country-list .search {
            padding: 10px 15px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .phone-input-container .react-tel-input .country-list .search input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            border-radius: var(--border-radius-upzella);
            font-size: 14px;
            font-family: var(--font-body);
          }
          
          .phone-input-container .react-tel-input .country-list .search input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
          }
          
          .phone-input-container .react-tel-input .country-list .country {
            padding: 10px 15px;
            transition: background-color 0.15s ease-in-out;
          }
          
          .phone-input-container .react-tel-input .country-list .country:hover {
            background-color: #f9fafb;
          }
          
          .phone-input-container .react-tel-input .country-list .country.highlight {
            background-color: #6366f1;
            color: white;
          }
          
          .phone-input-container .react-tel-input .country-list .country .country-name {
            font-family: var(--font-body);
            font-size: 14px;
          }
          
          .phone-input-container .react-tel-input .country-list .country .dial-code {
            font-family: var(--font-body);
            font-size: 14px;
            color: #6b7280;
          }
          
          .phone-input-container .react-tel-input .country-list .country.highlight .dial-code {
            color: rgba(255, 255, 255, 0.8);
          }
        `}
                </style>

                {/* Left Panel - Branding (Fixed/Sticky) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-950 via-purple-950 to-purple-950 p-12 flex-col justify-center items-center overflow-hidden fixed left-0 top-0 h-screen">
                    {/* Dynamic Background Effects */}
                    <div className="absolute inset-0 w-full h-full">
                        {/* Primary gradient overlay */}
                        <div className="absolute w-full h-full inset-0 bg-gradient-to-br from-purple-600/10 opacity-50 to-pink-600/10"></div>

                        {/* Geometric pattern overlay */}
                        <div className="absolute inset-0 opacity-60">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `
                    radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0),
                    linear-gradient(45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                                    backgroundSize: "40px 40px, 60px 60px, 60px 60px",
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="absolute top-8 left-8 z-10 w-fit">
                        <Logo color="white" size="lg" tagline link="" />
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* AI Brain Icon - Top Right */}
                        <div className="absolute top-16 right-16 opacity-80 transform rotate-12">
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 80 80"
                                className="text-purple-300"
                            >
                                <path
                                    d="M40 10 C55 10 67 22 67 37 C67 42 65 46 62 50 C65 52 67 55 67 59 C67 64 63 68 58 68 C55 68 52 66 50 63 C47 64 44 65 40 65 C36 65 33 64 30 63 C28 66 25 68 22 68 C17 68 13 64 13 59 C13 55 15 52 18 50 C15 46 13 42 13 37 C13 22 25 10 40 10 Z"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <circle cx="33" cy="33" r="3" fill="currentColor" />
                                <circle cx="47" cy="33" r="3" fill="currentColor" />
                                <path
                                    d="M30 45 Q40 50 50 45"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M25 25 L35 35 M45 35 L55 25 M35 40 L45 40"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity="0.4"
                                />
                            </svg>
                        </div>

                        {/* Team Building Icon - Bottom Left */}
                        <div className="absolute bottom-20 left-12 opacity-80 transform -rotate-12">
                            <svg
                                width="90"
                                height="90"
                                viewBox="0 0 90 90"
                                className="text-indigo-300"
                            >
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="8"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <circle
                                    cx="45"
                                    cy="20"
                                    r="10"
                                    fill="currentColor"
                                    opacity="0.7"
                                />
                                <circle
                                    cx="65"
                                    cy="25"
                                    r="8"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <path
                                    d="M15 45 Q25 40 35 45 L35 55 L15 55 Z"
                                    fill="currentColor"
                                    opacity="0.5"
                                />
                                <path
                                    d="M35 50 Q45 45 55 50 L55 60 L35 60 Z"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <path
                                    d="M55 45 Q65 40 75 45 L75 55 L55 55 Z"
                                    fill="currentColor"
                                    opacity="0.5"
                                />
                                <path
                                    d="M20 65 L70 65 M25 70 L65 70"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    opacity="0.4"
                                />
                            </svg>
                        </div>

                        {/* Growth Chart - Center Right */}
                        <div className="absolute top-1/2 right-8 opacity-80 transform translate-y-[-50%] rotate-6">
                            <svg
                                width="70"
                                height="120"
                                viewBox="0 0 70 120"
                                className="text-pink-300"
                            >
                                <rect
                                    x="10"
                                    y="90"
                                    width="12"
                                    height="20"
                                    rx="2"
                                    fill="currentColor"
                                    opacity="0.5"
                                />
                                <rect
                                    x="25"
                                    y="70"
                                    width="12"
                                    height="40"
                                    rx="2"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <rect
                                    x="40"
                                    y="50"
                                    width="12"
                                    height="60"
                                    rx="2"
                                    fill="currentColor"
                                    opacity="0.7"
                                />
                                <rect
                                    x="55"
                                    y="30"
                                    width="12"
                                    height="80"
                                    rx="2"
                                    fill="currentColor"
                                    opacity="0.8"
                                />
                                <path
                                    d="M16 90 L31 70 L46 50 L61 30"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    opacity="0.4"
                                />
                                <circle
                                    cx="16"
                                    cy="90"
                                    r="3"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <circle
                                    cx="31"
                                    cy="70"
                                    r="3"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <circle
                                    cx="46"
                                    cy="50"
                                    r="3"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                                <circle
                                    cx="61"
                                    cy="30"
                                    r="3"
                                    fill="currentColor"
                                    opacity="0.6"
                                />
                            </svg>
                        </div>
                    </div>


                    <div className="text-center space-y-8 relative max-w-md">
                        <div className="space-y-4">
                            <h1
                                className="text-4xl font-bold text-white leading-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                <span
                                    className="block text-purple-300 text-lg font-medium mb-3 tracking-wide"
                                    style={{ fontFamily: "var(--font-accent)" }}
                                >
                                    JOIN UPZELLA
                                </span>
                                <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                                    Start Your
                                </span>
                                <span className="block bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                                    Recruitment Journey
                                </span>
                            </h1>

                            <p
                                className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto font-light"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Join thousands of companies revolutionizing their talent
                                acquisition with AI-driven recruitment solutions.
                            </p>
                        </div>

                        <div className="text-white/60 text-sm pt-8">
                            © 2025 Upzella. Smarter recruitment starts here.
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form (Scrollable) */}
                <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen lg:bg-gray-50 bg-gradient-to-tl from-pink-100 via-blue-100 to-purple-100 overflow-y-auto">
                    <div className="flex items-center justify-center p-6 lg:p-12 min-h-screen">
                        <div className="w-full max-w-md py-8">
                            <div className="text-center mb-8 lg:hidden">
                                <Logo tagline={true} />
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Create Your Account
                                    </h2>
                                    <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                        Start building amazing teams today
                                    </p>
                                </div>

                                <Form onSubmit={handleSignupSubmit} className="space-y-6">
                                    {/* Personal Information */}
                                    <FormGroup cols={1} gap={4}>
                                        <FormField>
                                            <Input
                                                label="Full Name"
                                                placeholder="Enter your full name"
                                                value={signupData.full_name}
                                                onChange={(e) => handleInputChange('full_name', e.target.value)}
                                                error={errors.full_name}
                                                leftIcon={<UserIcon size={20} color="#6b7280" />}
                                                required
                                            />
                                        </FormField>

                                        <FormField>
                                            <Input
                                                type="email"
                                                label="Business Email"
                                                placeholder="your@company.com"
                                                value={signupData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                error={errors.email || (!emailValidation.isValid && emailValidation.message)}
                                                leftIcon={<EmailIcon size={20} color="#6b7280" />}
                                                rightIcon={
                                                    emailValidation.isChecking ? (
                                                        <LoadingIcon size={16} color="#6366f1" animate={true} />
                                                    ) : emailValidation.isValid ? (
                                                        <CheckIcon size={16} color="#10b981" />
                                                    ) : signupData.email && emailValidation.message ? (
                                                        <CrossIcon size={16} color="#ef4444" />
                                                    ) : null
                                                }
                                                required
                                            />
                                            {emailValidation.isValid && (
                                                <p className="text-sm text-green-600 mt-1 flex items-center font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                                                    <CheckIcon size={16} color="#10b981" className="mr-1 flex-shrink-0" />
                                                    {emailValidation.message}
                                                </p>
                                            )}
                                        </FormField>

                                        <FormField>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-accent)' }}>
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    {mounted ? (
                                                        <PhoneInput
                                                            country={"in"}
                                                            value={signupData.phone || ""}
                                                            onChange={(phone) => {
                                                                handleInputChange('phone', phone);
                                                            }}
                                                            inputProps={{
                                                                id: "phone",
                                                                name: "phone",
                                                                autoComplete: "tel",
                                                            }}
                                                            containerStyle={{
                                                                width: "100%",
                                                            }}
                                                            inputStyle={{
                                                                width: "100%",
                                                                height: "48px",
                                                                fontSize: "14px",
                                                                paddingLeft: "52px",
                                                                border: errors.phone ? "2px solid #ef4444" : "2px solid #e5e7eb",
                                                                borderRadius: "var(--border-radius-upzella)",
                                                                backgroundColor: "#ffffff",
                                                                color: "#111827",
                                                                fontFamily: "var(--font-body)",
                                                                transition: "all 0.2s ease-in-out",
                                                                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                                            }}
                                                            buttonStyle={{
                                                                border: errors.phone ? "2px solid #ef4444" : "2px solid #e5e7eb",
                                                                borderRight: "none",
                                                                borderRadius: "var(--border-radius-upzella) 0 0 var(--border-radius-upzella)",
                                                                backgroundColor: "#f9fafb",
                                                                padding: "0 10px",
                                                                height: "48px",
                                                                transition: "all 0.2s ease-in-out",
                                                            }}
                                                            dropdownStyle={{
                                                                borderRadius: "var(--border-radius-upzella)",
                                                                border: "2px solid #e5e7eb",
                                                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                                                color: "#111827",
                                                                zIndex: 50,
                                                                fontFamily: "var(--font-body)",
                                                            }}
                                                            enableSearch={true}
                                                            searchPlaceholder="Search countries..."
                                                            specialLabel=""
                                                            disabled={loading}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-12 bg-gray-100 rounded-[var(--border-radius-upzella)] animate-pulse" />
                                                    )}
                                                </div>
                                                {errors.phone && (
                                                    <p className="text-sm text-red-600 mt-1 flex items-center font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                                                        <CrossIcon size={16} color="#ef4444" className="mr-1 flex-shrink-0" />
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </FormField>

                                        <FormField>
                                            <Input
                                                label="Job Title"
                                                placeholder="e.g., HR Manager, Recruiter, CEO"
                                                value={signupData.job_role}
                                                onChange={(e) => handleInputChange('job_role', e.target.value)}
                                                error={errors.job_role}
                                                leftIcon={<UserIcon size={20} color="#6b7280" />}
                                                required
                                            />
                                        </FormField>
                                    </FormGroup>

                                    {/* Company Selection */}
                                    <FormGroup cols={1} gap={4}>
                                        <FormField>
                                            <SearchableSelect
                                                label="Search for your company"
                                                placeholder="Type to search companies..."
                                                options={[
                                                    ...filteredCompanies.map(company => ({
                                                        value: company.id,
                                                        label: `${company.name}${company.industry ? ` • ${company.industry}` : ''}`,
                                                        icon: <CompanyLogo logoUrl={company.logo_url} companyName={company.name} />
                                                    })),
                                                    ...(showCreateOption ? [{
                                                        value: 'CREATE_NEW',
                                                        label: `Create "${searchQuery}" as new company`,
                                                        icon: <CompanyIcon size={20} color="#6b7280" />
                                                    }] : [])
                                                ]}
                                                value={signupData.company_id}
                                                onChange={(value: string) => {
                                                    if (value === 'CREATE_NEW') {
                                                        handleInputChange('company_id', '');
                                                        setCompanyNameSearched(searchQuery)
                                                    } else {
                                                        handleInputChange('company_id', value);
                                                    }
                                                }}
                                                onSearch={handleCompanySearch}
                                                error={!!errors.company_id}
                                                errorMessage={errors.company_id}
                                                leftIcon={<CompanyIcon size={20} color="#6b7280" />}
                                                required
                                            />

                                            {showCreateOption && !signupData.company_id && (
                                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-[var(--border-radius-upzella)] shadow-sm">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <CompanyIcon size={20} color="#3b82f6" />
                                                        </div>
                                                        <p className="text-sm text-blue-800 leading-relaxed font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                                                            We'll help you set up "<span className="font-semibold text-blue-900">{searchQuery}</span>" as a new company after you verify your email.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </FormField>
                                    </FormGroup>

                                    {/* Terms Agreement */}
                                    <FormGroup cols={1} gap={4}>
                                        <FormField>
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 pt-1">
                                                    <Checkbox
                                                        id='terms_agreed'
                                                        onChange={(checked, value) => handleInputChange('terms_agreed', checked)}
                                                        checked={signupData.terms_agreed}
                                                        required
                                                    />

                                                </div>
                                                <label htmlFor="terms_agreed" className="text-sm text-gray-700 leading-relaxed cursor-pointer select-none">
                                                    I agree to the{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => window.open('/legal/terms', '_blank')}
                                                        className="text-indigo-600 hover:text-indigo-700 underline font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-sm"
                                                    >
                                                        Terms of Service
                                                    </button>
                                                    {' '}and{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => window.open('/legal/privacy', '_blank')}
                                                        className="text-indigo-600 hover:text-indigo-700 underline font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-sm"
                                                    >
                                                        Privacy Policy
                                                    </button>
                                                </label>
                                            </div>
                                            {errors.terms_agreed && (
                                                <p className="text-sm text-red-600 mt-1 flex items-center font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                                                    <CrossIcon size={16} color="#ef4444" className="mr-1 flex-shrink-0" />
                                                    {errors.terms_agreed}
                                                </p>
                                            )}
                                        </FormField>
                                    </FormGroup>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={loading || authLoading}
                                        disabled={loading || authLoading || !isFormComplete()}
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </Button>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                            Already have an account?{' '}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="lg"
                                                onClick={() => router.push('/auth/login')}
                                                className="!p-0 !h-auto !min-h-0 text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline transition-colors duration-200"
                                            >
                                                Sign in
                                            </Button>
                                        </p>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render OTP verification form
     */
    function renderOTPForm() {
        return (
            <div className="min-h-screen flex">
                {/* Left Panel - Branding (Fixed/Sticky) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-900 p-12 flex-col justify-center items-center overflow-hidden fixed left-0 top-0 h-screen">
                    {/* Dynamic Background Effects */}
                    <div className="absolute inset-0 w-full h-full">
                        {/* Primary gradient overlay */}
                        <div className="absolute w-full h-full inset-0 bg-gradient-to-br from-purple-600/10 opacity-50 to-pink-600/10"></div>

                        {/* Geometric pattern overlay */}
                        <div className="absolute inset-0 opacity-60">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `
                    radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0),
                    linear-gradient(45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                                    backgroundSize: "40px 40px, 60px 60px, 60px 60px",
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="absolute top-8 left-8 z-10 w-fit">
                        <Logo color="white" size="lg" tagline link="" />
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Shield/Lock Icon - Top Right (Security/Verification) */}
                        <div className="absolute top-16 right-16 opacity-80 transform rotate-12">
                            <svg width="80" height="80" viewBox="0 0 80 80" className="text-indigo-300">
                                <rect x="20" y="30" width="40" height="30" rx="10" fill="currentColor" opacity="0.6" />
                                <rect x="32" y="40" width="16" height="20" rx="4" fill="#fff" opacity="0.7" />
                                <circle cx="40" cy="50" r="3" fill="currentColor" />
                                <rect x="37" y="55" width="6" height="5" rx="2" fill="currentColor" opacity="0.8" />
                                <path d="M40 30 v-8 a8 8 0 0 1 16 0 v8" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
                            </svg>
                        </div>

                        {/* Envelope/Email Icon - Bottom Left (Email Verification) */}
                        <div className="absolute bottom-20 left-12 opacity-80 transform -rotate-12">
                            <svg width="90" height="90" viewBox="0 0 90 90" className="text-purple-300">
                                <rect x="15" y="30" width="60" height="40" rx="8" fill="currentColor" opacity="0.5" />
                                <polyline points="15,30 45,60 75,30" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
                                <rect x="25" y="40" width="40" height="20" rx="4" fill="#fff" opacity="0.3" />
                            </svg>
                        </div>

                        {/* Checkmark/Success Icon - Center Right (Verified/Success) */}
                        <div className="absolute top-1/2 right-8 opacity-80 transform translate-y-[-50%] rotate-6">
                            <svg width="70" height="70" viewBox="0 0 70 70" className="text-green-400">
                                <circle cx="35" cy="35" r="30" fill="currentColor" opacity="0.2" />
                                <circle cx="35" cy="35" r="24" fill="#fff" opacity="0.5" />
                                <polyline points="25,38 33,46 47,28" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="text-white text-center space-y-8 relative z-10 max-w-md">
                        <div className="space-y-6">
                            <div className="flex items-center justify-center">
                                <SparkleIcon size={40} color="#ffffff" className="animate-pulse" />
                            </div>

                            <h1 className="text-4xl font-heading font-bold leading-tight">
                                Almost There!
                            </h1>

                            <p className="text-xl text-white/90 leading-relaxed">
                                We've sent a verification code to your email. Enter it to complete your account setup and start hiring.
                            </p>


                        </div>

                        <div className="text-white/60 text-sm pt-8">
                            © 2025 Upzella. Smarter recruitment starts here.
                        </div>
                    </div>
                </div>

                {/* Right Panel - OTP Form (Scrollable) */}
                <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen bg-gray-50 overflow-y-auto">
                    <div className="flex items-center justify-center p-6 lg:p-12 min-h-screen">
                        <div className="w-full max-w-md py-8">
                            <div className="text-center mb-8 lg:hidden">
                                <Logo size="lg" />
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                <div className="text-center mb-8">

                                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Verify Your Email
                                    </h2>
                                    <p className="text-gray-600 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                                        We sent a 6-digit code to
                                    </p>
                                    <p className="text-indigo-600 font-medium" style={{ fontFamily: 'var(--font-accent)' }}>
                                        {(() => {
                                            if (!pendingEmail) return null;
                                            const [local, domain] = pendingEmail.split('@');
                                            if (!local || !domain) return pendingEmail;
                                            const firstChar = local[0];
                                            const lastChar = local[local.length - 1];
                                            return `${firstChar}***${lastChar}@${domain}`;
                                        })()}
                                    </p>
                                </div>

                                <Form onSubmit={handleOTPSubmit} className="space-y-6">
                                    <FormField>
                                        <Input
                                            label="Verification Code"
                                            placeholder="Enter 6-digit code"
                                            value={otpData.otp_code}
                                            onChange={(e) => setOtpData(prev => ({ ...prev, otp_code: e.target.value }))}
                                            error={errors.otp_code}
                                            maxLength={6}
                                            className="text-center text-xl font-mono font-bold"
                                            required
                                        />
                                    </FormField>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={loading}
                                        disabled={loading || otpData.otp_code.length !== 6}
                                    >
                                        {loading ? 'Verifying...' : 'Verify & Continue'}
                                    </Button>

                                    <div className="text-center space-y-3">
                                        <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                                            Didn't receive the code?
                                        </p>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleResendOTP}
                                            disabled={resendCooldown > 0 || loading}
                                            className="font-medium"
                                        >
                                            {resendCooldown > 0
                                                ? `Resend in ${resendCooldown}s`
                                                : 'Resend Code'
                                            }
                                        </Button>

                                    </div>

                                    <div className="text-center group">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setCurrentStep(SignupStep.FORM)}
                                            className='hover:bg-white underline text-blue-500 '
                                            leftIcon={<ArrowLeftIcon size={16} className='text-blue-500' />}
                                        >
                                            Back to signup
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render based on current step
    return currentStep === SignupStep.FORM ? renderSignupForm() : renderOTPForm();
}
