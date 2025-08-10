'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, usePendingVerification } from '@/context/AuthContext';
import { 
  EmployerLoginSchema, 
  EmployerLogin,
  OTPVerificationSchema,
  OTPVerification 
} from '@/lib/schema/employer.schema';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Form, FormField, FormGroup } from '@/components/ui-components/form';
import { useToast } from '@/hooks/useToast';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { 
  EmailIcon
} from '@/components/svg-icons';

// Step enum for the login flow
enum LoginStep {
  EMAIL = 'email',
  OTP = 'otp'
}

export default function LoginPage() {
  const router = useRouter();
  const { login, verifyOTP, resendOTP, loading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const pendingEmail = usePendingVerification();

  // State management
  const [currentStep, setCurrentStep] = useState<LoginStep>(LoginStep.EMAIL);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Form data
  const [loginData, setLoginData] = useState<EmployerLogin>({
    email: '',
  });

  const [otpData, setOtpData] = useState<OTPVerification>({
    email: '',
    otp_code: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Check for pending verification
  useEffect(() => {
    if (pendingEmail) {
      setOtpData({ email: pendingEmail, otp_code: '' });
      setCurrentStep(LoginStep.OTP);
    }
  }, [pendingEmail]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  /**
   * Validate login form
   */
  function validateLoginForm(): boolean {
    const newErrors: Record<string, string> = {};

    try {
      EmployerLoginSchema.parse(loginData);
    } catch (error: any) {
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /**
   * Handle login form submission
   */
  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await login(loginData);

      if (result.success) {
        setOtpData({ email: loginData.email, otp_code: '' });
        setCurrentStep(LoginStep.OTP);
        toast.success('Login code sent to your email');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
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
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(otpData);

      if (result.success && result.redirectTo) {
        toast.success('Login successful!');
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
      const result = await resendOTP(otpData.email);
      
      if (result.success) {
        toast.success('Login code sent successfully');
        setResendCooldown(60); // 60 second cooldown
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend login code');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle input changes
   */
  function handleInputChange(field: string, value: string) {
    if (field === 'email') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setOtpData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  }

  /**
   * Render email input form
   */
  function renderEmailForm() {
    return (
      <div className="min-h-screen flex">
        {/* Left Panel - Hero & Branding (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
          <div className="flex flex-col justify-center items-center w-full px-8 relative">
            {/* Logo */}
            <div className="absolute top-8 left-8">
              <Logo tagline color='white' className="text-white" />
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Network Animation - Top Left */}
              <div className="absolute top-16 left-16 opacity-60 transform -rotate-12">
                <svg width="90" height="80" viewBox="0 0 90 80" className="text-purple-400">
                  <circle cx="25" cy="25" r="8" fill="currentColor" opacity="0.6"/>
                  <circle cx="45" cy="20" r="10" fill="currentColor" opacity="0.7"/>
                  <circle cx="65" cy="25" r="8" fill="currentColor" opacity="0.6"/>
                  <path d="M15 45 Q25 40 35 45 L35 55 L15 55 Z" fill="currentColor" opacity="0.5"/>
                  <path d="M35 50 Q45 45 55 50 L55 60 L35 60 Z" fill="currentColor" opacity="0.6"/>
                  <path d="M55 45 Q65 40 75 45 L75 55 L55 55 Z" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>

              {/* Growth Chart - Bottom Right */}
              <div className="absolute bottom-20 right-12 opacity-60 transform rotate-6">
                <svg width="70" height="100" viewBox="0 0 70 100" className="text-pink-300">
                  <rect x="10" y="70" width="12" height="20" rx="2" fill="currentColor" opacity="0.5"/>
                  <rect x="25" y="50" width="12" height="40" rx="2" fill="currentColor" opacity="0.6"/>
                  <rect x="40" y="30" width="12" height="60" rx="2" fill="currentColor" opacity="0.7"/>
                  <rect x="55" y="10" width="12" height="80" rx="2" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
            </div>

            <div className="text-center space-y-8 relative max-w-md">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  <span className="block text-purple-300 text-lg font-medium mb-3 tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                    WELCOME BACK TO UPZELLA
                  </span>
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                    Continue Your
                  </span>
                  <span className="block bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                    Recruitment Journey
                  </span>
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto font-light" style={{ fontFamily: "var(--font-body)" }}>
                  Access your dashboard and continue building amazing teams with AI-powered recruitment solutions.
                </p>
              </div>

              <div className="text-white/60 text-sm pt-8">
                © 2025 Upzella. Smarter recruitment starts here.
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen lg:bg-gray-50 bg-gradient-to-tl from-pink-100 via-blue-100 to-purple-100 overflow-y-auto">
          <div className="flex items-center justify-center p-6 lg:p-12 min-h-screen">
            <div className="w-full max-w-md py-8">
              <div className="text-center mb-8 lg:hidden">
                <Logo tagline={true} />
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Welcome Back
                  </h2>
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    Sign in to your Upzella account
                  </p>
                </div>

                <Form onSubmit={handleLoginSubmit} className="space-y-6">
                  <FormGroup cols={1} gap={4}>
                    <FormField>
                      <Input
                        type="email"
                        label="Business Email"
                        placeholder="your@company.com"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        error={errors.email}
                        leftIcon={<EmailIcon size={20} color="#6b7280" />}
                        autoFocus
                        required
                      />
                    </FormField>
                  </FormGroup>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading || authLoading}
                    disabled={loading || authLoading || !loginData.email.trim()}
                  >
                    {loading ? 'Sending Login Code...' : 'Send Login Code'}
                  </Button>
                </Form>

                <div className="text-center mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    Don't have an account?
                  </p>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-accent)' }}
                  >
                    Create Account
                  </Link>
                </div>
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
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="min-h-screen flex">
        {/* Left Panel - Hero & Branding (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
          <div className="flex flex-col justify-center items-center w-full px-8 relative">
            {/* Logo */}
            <div className="absolute top-8 left-8">
              <Logo tagline color='white' className="text-white" />
            </div>

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Security Shield - Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40">
                <svg width="120" height="140" viewBox="0 0 120 140" className="text-purple-300">
                  <path
                    d="M60 20 L40 30 L40 60 Q40 100 60 120 Q80 100 80 60 L80 30 Z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path
                    d="M60 35 L48 42 L48 62 Q48 85 60 95 Q72 85 72 62 L72 42 Z"
                    fill="currentColor"
                    opacity="0.5"
                  />
                  <circle cx="60" cy="65" r="8" fill="currentColor" opacity="0.8"/>
                  <path d="M60 55 L60 75" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
                </svg>
              </div>

              {/* Clock Animation - Top Right */}
              <div className="absolute top-20 right-16 opacity-50 transform rotate-12">
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-pink-300">
                  <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M30 10 L30 30 L45 35" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                  <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
            </div>

            <div className="text-center space-y-8 relative max-w-md">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  <span className="block text-purple-300 text-lg font-medium mb-3 tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                    VERIFY YOUR IDENTITY
                  </span>
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent">
                    Secure Login
                  </span>
                  <span className="block bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                    Code Verification
                  </span>
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto font-light" style={{ fontFamily: "var(--font-body)" }}>
                  We've sent a secure verification code to your email. Enter it below to access your account.
                </p>
              </div>

              <div className="text-white/60 text-sm pt-8">
                © 2025 Upzella. Smarter recruitment starts here.
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen lg:bg-gray-50 bg-gradient-to-tl from-pink-100 via-blue-100 to-purple-100 overflow-y-auto">
          <div className="flex items-center justify-center p-6 lg:p-12 min-h-screen">
            <div className="w-full max-w-md py-8">
              <div className="text-center mb-8 lg:hidden">
                <Logo tagline={true} />
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Enter Login Code
                  </h2>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    We've sent a 6-digit code to
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                    <EmailIcon size={16} color="#3b82f6" />
                    <span className="ml-2 text-blue-700 font-medium text-sm">{otpData.email}</span>
                  </div>
                </div>

                <Form onSubmit={handleOTPSubmit} className="space-y-6">
                  <FormGroup cols={1} gap={4}>
                    <FormField>
                      <Input
                        label="Login Code"
                        placeholder="Enter 6-digit code"
                        value={otpData.otp_code}
                        onChange={(e) => handleInputChange('otp_code', e.target.value)}
                        error={errors.otp_code}
                        maxLength={6}
                        className="text-center text-xl tracking-widest font-mono"
                        autoFocus
                        required
                      />
                      {resendCooldown > 0 && (
                        <p className="text-sm text-gray-500 mt-2 text-center" style={{ fontFamily: 'var(--font-body)' }}>
                          Code expires in {formatTime(resendCooldown)}
                        </p>
                      )}
                    </FormField>
                  </FormGroup>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={loading || otpData.otp_code.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>
                </Form>

                <div className="text-center mt-6 pt-6 border-t border-gray-200 space-y-4">
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                    Didn't receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleResendOTP}
                    disabled={resendCooldown > 0 || loading}
                  >
                    {resendCooldown > 0 
                      ? `Resend in ${formatTime(resendCooldown)}`
                      : 'Resend Code'
                    }
                  </Button>

                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(LoginStep.EMAIL)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ← Back to Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render based on current step
  return currentStep === LoginStep.EMAIL ? renderEmailForm() : renderOTPForm();
}
