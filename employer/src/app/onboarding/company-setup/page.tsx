'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CreateCompany, CreateCompanySchema } from '@/lib/schema/company.schema';
import { z } from 'zod';
import { Form, FormField, FormGroup } from '@/components/ui-components/form';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Select } from '@/components/ui-components';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import {
  CompanyIcon,
  LinkedInIcon,
  PhoneIcon,
  LocationIcon,
  UploadIcon,
  CheckIcon,
  CrossIcon,
  LoadingIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';
import { createClient } from '@/utils/supabase/client';
import { Logo } from '@/components/Logo';
import { Textarea } from '@/components/ui-components/Textarea';
import { companyService } from '@/services/companies.service';

// Custom icon components for missing icons
const WebsiteIcon = ({ size = 20, color = '#6b7280' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill={color} />
  </svg>
);

const XIcon = ({ size = 20, color = '#6b7280' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill={color} />
  </svg>
);

export default function CompanyCreationPage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const supabase = createClient();

  // Get company name from localStorage (from signup flow)
  const [pendingCompanyName, setPendingCompanyName] = useState('');

  const [formData, setFormData] = useState<CreateCompany>({
    name: '',
    country: 'India',
    timezone: 'Asia/Kolkata',
    domain: '',
    website_url: 'www.example.com',
    linkedin_url: '',
    x_url: '',
    instagram_url: '',
    phone: '',
    industry: '',
    employee_count: '1-10',
    company_type: 'startup',
    address: '',
    state: '',
    pincode: '',
    logo_url: '',
  });

  // Load pending company name on mount
  useEffect(() => {
    const pendingSignupData = localStorage.getItem('upzella_pending_signup');
    const shouldCreateCompany = localStorage.getItem('upzella_create_company') === 'true';

    if (pendingSignupData && shouldCreateCompany) {
      try {
        const signupData = JSON.parse(pendingSignupData);
        const companyName = localStorage.getItem('upzella_create_company_name') || '';
        const domain = (signupData.email || '').split('@')[1];
        const website = `https://www.${domain}`;
        setPendingCompanyName(companyName);
        setFormData(prev => ({
          ...prev,
          name: companyName,
          domain: domain || '',
          website_url: website
        }));
      } catch (error) {
        console.error('Error parsing signup data:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));


  };

  const uploadLogoToSupabase = async (file: File): Promise<string | null> => {
    try {
      setLogoUploading(true);

      const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_COMPANY_BUCKET || 'company'; // Use the correct bucket name
      const fileName = `logo/${Date.now()}-${formData.name.replace(/[^a-zA-Z0-9]/g, '_')}-${file.name}`;

      // Use the regular supabase client instead of service client for authenticated uploads
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '100',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload logo: ${error.message}`);
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      toast.success('Logo uploaded successfully!');

      return publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
      return null;
    } finally {
      setLogoUploading(false);
    }
  };

  const requiredFields = [
    'company_name',
    'country',
    'domain',
    'employee_count',
    'industry',
    'linkedin_url',
    'name',
    // 'logo_url',
    'website_url',
  ];

  const isFormComplete = requiredFields.every(field => String(formData[field as keyof typeof formData]).trim() !== '');




  const validateForm = (): boolean => {
    try {
      CreateCompanySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path && issue.path[0]) {
            newErrors[String(issue.path[0])] = issue.message;
          }
        });
        setErrors(newErrors);
        toast.error('Please fix the form errors before submitting.');
      }
      // Show toast for missing required fields
      const missingFields = requiredFields.filter(field => {
        const key = field as keyof typeof formData;
        return !formData[key] || String(formData[key]).trim() === '';
      });
      if (missingFields.length > 0) {
        toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      router.push('/auth/login');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);

    try {
      let logoUrl = '';

      // Upload logo if selected
      if (logoFile) {
        const uploadedLogoUrl = await uploadLogoToSupabase(logoFile);
        if (uploadedLogoUrl) {
          logoUrl = uploadedLogoUrl;
        }
      }

      // Create company with logo URL
      const companyDataWithLogo = {
        ...formData,
        logo_url: logoUrl
      };

      const result = await companyService.createCompanyAndLink(user.id, companyDataWithLogo);

      if (result.success) {
        // Update user metadata with company_id
        if (result.data?.company) {
          await updateProfile({ company_id: result.data.company.id });
        }

        // Clear localStorage
        let storageItems = [
          "upzella_create_company_name",
          "upzella_pending_signup",
          "upzella_pending_verification",
          "upzella_auth_user",
          "upzella_create_company",
        ];

        storageItems.forEach((items: string) => {
          if (localStorage.getItem(items)) {
            localStorage.removeItem(items);
          }
        });


        toast.success('Company created successfully!');
        router.push('/dashboard');
      } else {
        setErrors({ general: result.error || 'Failed to create company' });
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error creating company:', error);
      setErrors({ general: 'An unexpected error occurred' });
      toast.error('Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Singapore', 'United Arab Emirates', 'China', 'Japan', 'Brazil', 'Other'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Retail',
    'Manufacturing', 'Consulting', 'Media & Entertainment', 'Real Estate',
    'Transportation', 'Energy', 'Food & Beverage', 'Automotive', 'Other'
  ];

  const timezones = [
    'Asia/Kolkata', 'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Singapore', 'Australia/Sydney'
  ];

  // Add a ref for the file input
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="sizer">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-10 w-auto">
            <Logo tagline className='w-auto' />
          </div>
          <h1 className="text-3xl font-bold flex w-full justify-center items-center gap-2 mx-auto text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Setup Your Company {
              pendingCompanyName && (
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>{pendingCompanyName}</span>
              )
            }
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Complete your company profile to get started with Upzella's AI-powered recruitment platform
          </p>
        </div>

        <Card className="shadow-xl border-0 p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <CrossIcon size={20} color="#ef4444" />
                <span className="ml-3 text-red-600">{errors.general}</span>
              </div>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Basic Company Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center" style={{ fontFamily: 'var(--font-heading)' }}>
                <CompanyIcon size={24} className="mr-3 " />
                Basic Information
              </h2>

              <FormGroup cols={2} gap={6}>
                <FormField>
                  <Input
                    label="Company Name"
                    placeholder="Enter your company name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    leftIcon={<CompanyIcon size={20} color="#6b7280" />}
                    readOnly={!!pendingCompanyName}
                    className={pendingCompanyName ? 'bg-gray-50' : ''}
                    required
                  />
                </FormField>
                <FormField>
                  <Input
                    label="Company Domain"
                    placeholder="e.g., yourcompany.com"
                    value={formData.domain || ''}
                    onChange={(e) => handleInputChange('domain', e.target.value)}
                    error={errors.domain}
                    leftIcon={<WebsiteIcon size={20} color="#6b7280" />}
                    required
                  />
                </FormField>
              </FormGroup>

              {/* Logo Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Logo <span className='text-gradient-pink-shade'>*</span></h3>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 border-2 border-gray-300 border-dashed rounded-xl flex items-center justify-center bg-gray-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                      ) : (
                        <UploadIcon size={32} color="#9ca3af" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                      required
                      ref={logoInputRef}
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        loading={logoUploading}
                        className="mb-2"
                        onClick={() => logoInputRef.current?.click()}
                      >
                        <UploadIcon size={16} />
                        {logoUploading ? 'Uploading...' : 'Upload Logo'}
                      </Button>
                    </label>
                    <p className="text-sm text-gray-500">
                      Only JPG or PNG images up to 5MB. Square images work best.
                    </p>
                    {logoFile && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <CheckIcon size={16} className="mr-1" />
                        {logoFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center" style={{ fontFamily: 'var(--font-heading)' }}>
                  <PhoneIcon size={24} className="mr-3 " />
                  Contact Information
                </h2>

                <FormGroup cols={2} gap={6}>
                  <FormField>
                    <Input
                      label="Website URL"
                      placeholder="https://www.yourcompany.com"
                      value={formData.website_url || ''}
                      onChange={(e) => handleInputChange('website_url', e.target.value)}
                      error={errors.website_url}
                      leftIcon={<WebsiteIcon size={20} color="#6b7280" />}
                      required
                    />
                  </FormField>

                  <FormField>
                    <Input
                      label="Phone Number"
                      placeholder="+91 98765 43210"
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      error={errors.phone}
                      leftIcon={<PhoneIcon size={20} color="#6b7280" />}
                    />
                  </FormField>

                  <FormField>
                    <Input
                      label="LinkedIn URL"
                      placeholder="https://linkedin.com/company/yourcompany"
                      value={formData.linkedin_url || ''}
                      onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                      error={errors.linkedin_url}
                      leftIcon={<LinkedInIcon size={20} color="#6b7280" />}
                      required
                    />
                  </FormField>

                  <FormField>
                    <Input
                      label="X (Twitter) URL"
                      placeholder="https://x.com/yourcompany"
                      value={formData.x_url || ''}
                      onChange={(e) => handleInputChange('x_url', e.target.value)}
                      error={errors.x_url}
                      leftIcon={<XIcon size={20} color="#6b7280" />}
                    />
                  </FormField>
                  <FormField>
                    <Input
                      label="Instagram URL"
                      placeholder="https://instagram.com/yourcompany"
                      value={formData.instagram_url || ''}
                      onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                      error={errors.instagram_url}
                      leftIcon={<CompanyIcon size={20} color="#6b7280" />}
                    />
                  </FormField>


                </FormGroup>


              </div>

              {/* Company Details & Location */}
              <div className="grid md:grid-cols-2 gap-8">

                {/* Company Details (Upzella Components) */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
                  <div className="space-y-4">
                    <FormField>
                      <Select
                        label="Industry"
                        value={formData.industry || ''}
                        onChange={(val) => handleInputChange('industry', val)}
                        options={industries.map(ind => ({ value: ind, label: ind }))}
                        error={errors.industry}
                        placeholder="Select Industry"
                        required
                      />
                    </FormField>
                    <FormField>
                      <Select
                        label="Company Size"
                        value={formData.employee_count}
                        onChange={(val) => handleInputChange('employee_count', val)}
                        options={[
                          { value: '1-10', label: '1-10 employees' },
                          { value: '11-50', label: '11-50 employees' },
                          { value: '51-200', label: '51-200 employees' },
                          { value: '201-500', label: '201-500 employees' },
                          { value: '501-1000', label: '501-1000 employees' },
                          { value: '1000+', label: '1000+ employees' }
                        ]}
                        error={errors.employee_count}
                        placeholder="Select Company Size"
                        required
                      />
                    </FormField>

                    <FormField>
                      <Select
                        label="Company Type"
                        value={formData.company_type}
                        onChange={(val) => handleInputChange('company_type', val)}
                        options={[
                          { value: 'startup', label: 'Startup' },
                          { value: 'small', label: 'Small Business' },
                          { value: 'mid-market', label: 'Mid-Market' },
                          { value: 'enterprise', label: 'Enterprise' }
                        ]}
                        error={errors.company_type}
                        placeholder="Select Company Type"
                        required
                      />
                    </FormField>
                    <FormField>
                      <Select
                        label="Timezone"
                        value={formData.timezone}
                        onChange={(val) => handleInputChange('timezone', val)}
                        options={timezones.map(tz => ({ value: tz, label: tz }))}
                        error={errors.timezone}
                        placeholder="Select Timezone"
                        required
                      />
                    </FormField>
                  </div>
                </div>

                {/* Location Information (Upzella Components) */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="space-y-4">
                    <FormField>
                      <Select
                        label="Country"
                        value={formData.country}
                        onChange={(val) => handleInputChange('country', val)}
                        options={countries.map(country => ({ value: country, label: country }))}
                        error={errors.country}
                        placeholder="Select Country"
                        required
                      />
                    </FormField>
                    <FormField>
                      <Input
                        label="State/Province"
                        placeholder="State/Province"
                        value={formData.state || ''}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        error={errors.state}
                      />
                    </FormField>
                    <FormField>
                      <Textarea
                        label="Complete Address"
                        placeholder="Complete address"
                        value={formData.address || ''}
                        onChange={(e: any) => handleInputChange('address', e)}
                        error={errors.address}
                        rows={3}
                      />
                    </FormField>
                    <FormField>
                      <Input
                        label="ZIP/Postal Code"
                        placeholder="ZIP/Postal Code"
                        value={formData.pincode || ''}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        error={errors.pincode}
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={!(isFormComplete && (logoFile === null ? false : true))}
                  className="px-8"
                >
                  {loading ? 'Creating Company...' : 'Complete Setup'}
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
