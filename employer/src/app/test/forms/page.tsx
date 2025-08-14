'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui-components/Input';
import { Textarea } from '@/components/ui-components/Textarea';
import { Select } from '@/components/ui-components/Select';
import { BasicSelect } from '@/components/ui-components/BasicSelect';
import { SearchableSelect } from '@/components/ui-components/SearchableSelect';
import { Toggle } from '@/components/ui-components/Toggle';
import { 
  CompanyIcon, 
  UserIcon, 
  EmailIcon, 
  PhoneIcon 
} from '@/components/svg-icons';

export default function FormsTestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    country: '',
    experience: '',
    skills: '',
    message: '',
    newsletter: false,
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companySearchQuery, setCompanySearchQuery] = useState('');

  // Sample data for testing
  const positionOptions = [
    { value: 'frontend', label: 'Frontend Developer', icon: <UserIcon size={20} color="#6b7280" /> },
    { value: 'backend', label: 'Backend Developer', icon: <UserIcon size={20} color="#6b7280" /> },
    { value: 'fullstack', label: 'Full Stack Developer', icon: <UserIcon size={20} color="#6b7280" /> },
    { value: 'designer', label: 'UI/UX Designer', icon: <UserIcon size={20} color="#6b7280" /> },
    { value: 'manager', label: 'Project Manager', icon: <UserIcon size={20} color="#6b7280" /> },
  ];

  const companyOptions = [
    { value: 'google', label: 'Google', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'microsoft', label: 'Microsoft', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'apple', label: 'Apple Inc.', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'amazon', label: 'Amazon', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'meta', label: 'Meta (Facebook)', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'netflix', label: 'Netflix', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'tesla', label: 'Tesla', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'spotify', label: 'Spotify', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'adobe', label: 'Adobe', icon: <CompanyIcon size={20} color="#6b7280" /> },
    { value: 'salesforce', label: 'Salesforce', icon: <CompanyIcon size={20} color="#6b7280" /> },
  ].filter(company => 
    company.label.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
  ];

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCompanySearch = (query: string) => {
    setCompanySearchQuery(query);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Form submitted successfully!');
  };

  const experienceOptions = [
    { value: '', label: 'Select experience level' },
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'mid', label: 'Mid-level (2-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
    { value: 'lead', label: 'Lead/Principal (8+ years)' },
  ];

  return (
    <div className="min-h-screen ">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <Link 
            href="/test" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-accent"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Test Index
          </Link>
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Form Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Complete form examples with validation, different input types, and form patterns
          </p>
        </div>

        <div className="pb-16">
          {/* Select Component Variants */}
          <section className="mb-16">
            <h2 className="font-heading text-center text-2xl font-bold text-gray-800 mb-6">Select Component Variants</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Basic Select */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Basic Select</h3>
                <p className="text-gray-600 text-sm mb-4">Simple dropdown without search functionality</p>
                <BasicSelect
                  label="Choose Position"
                  options={positionOptions}
                  value={formData.position}
                  onChange={(value: string) => handleInputChange('position', value)}
                  placeholder="Select a position"
                />
              </div>

              {/* Searchable Select */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Searchable Select</h3>
                <p className="text-gray-600 text-sm mb-4">Dropdown with search functionality and icons</p>
                <SearchableSelect
                  label="Search Company"
                  options={companyOptions}
                  value={formData.company}
                  onChange={(value: string) => handleInputChange('company', value)}
                  onSearch={handleCompanySearch}
                  placeholder="Search companies..."
                  leftIcon={<CompanyIcon size={20} color="#6b7280" />}
                />
              </div>

              {/* Legacy Select */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Legacy Select</h3>
                <p className="text-gray-600 text-sm mb-4">Original select component (backward compatibility)</p>
                <Select
                  label="Experience Level"
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(value: string) => handleInputChange('experience', value)}
                  searchable={false}
                />
              </div>
            </div>
          </section>

          {/* Job Application Form */}
          <section className="mb-16">
            <h2 className="font-heading text-center text-2xl font-bold text-gray-800 mb-6">Job Application Form</h2>
            
            <div className="card max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BasicSelect
                      label="Position (Basic Select)"
                      options={positionOptions}
                      value={formData.position}
                      onChange={(value: string) => handleInputChange('position', value)}
                      error={!!errors.position}
                      errorMessage={errors.position}
                      required
                    />
                    <Select
                      label="Experience Level (Legacy Select)"
                      options={experienceOptions}
                      value={formData.experience}
                      onChange={(value: string) => handleInputChange('experience', value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SearchableSelect
                      label="Company (Searchable Select)"
                      placeholder="Search for a company..."
                      options={companyOptions}
                      value={formData.company}
                      onChange={(value: string) => handleInputChange('company', value)}
                      onSearch={handleCompanySearch}
                      leftIcon={<CompanyIcon size={20} color="#6b7280" />}
                      searchPlaceholder="Type company name..."
                    />
                    <BasicSelect
                      label="Country"
                      options={countryOptions}
                      value={formData.country}
                      onChange={(value: string) => handleInputChange('country', value)}
                      placeholder="Select your country"
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      label="Skills"
                      placeholder="React, TypeScript, Node.js, etc."
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <Textarea
                      label="Why are you interested in this position?"
                      placeholder="Tell us about your motivation and what makes you a great fit..."
                      value={formData.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('message', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
                  <div className="space-y-3">
                    <Toggle
                      label="Subscribe to our newsletter for job updates"
                      checked={formData.newsletter}
                      onChange={(checked) => handleInputChange('newsletter', checked)}
                    />
                    <Toggle
                      label="I agree to the terms and conditions"
                      checked={formData.terms}
                      onChange={(checked) => handleInputChange('terms', checked)}
                      required
                    />
                    {errors.terms && (
                      <p className="text-red-600 text-sm mt-1">{errors.terms}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="spinner w-4 h-4"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Form Patterns */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Form Patterns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inline Form */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Inline Form</h3>
                <form className="flex gap-2">
                  <Input
                    placeholder="Enter email"
                    className="flex-1"
                  />
                  <button className="btn-primary px-4">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Search Form */}
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Search Form</h3>
                <form className="space-y-3">
                  <Input
                    placeholder="Search jobs..."
                    leftIcon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                  <div className="flex gap-2">
                    <Select
                      options={[
                        { value: '', label: 'All locations' },
                        { value: 'remote', label: 'Remote' },
                        { value: 'ny', label: 'New York' },
                        { value: 'sf', label: 'San Francisco' },
                      ]}
                      className="flex-1"
                    />
                    <button className="btn-secondary px-4">
                      Filter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Validation Examples */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Validation Examples</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Real-time Validation</h3>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="test@example.com"
                    isValid={true}
                    validationMessage="Email format is valid"
                    showValidationIcon={true}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    error="Password must be at least 8 characters"
                  />
                  <Input
                    label="Username"
                    placeholder="Enter username"
                    isValidating={true}
                    validationMessage="Checking availability..."
                  />
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Form States</h3>
                <div className="space-y-4">
                  <Input
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                  />
                  <Input
                    label="Read-only Input"
                    value="This is read-only"
                    readOnly
                  />
                  <Textarea
                    label="Disabled Textarea"
                    placeholder="This textarea is disabled"
                    disabled
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Form Best Practices</h2>
            
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-accent text-lg font-semibold text-gray-800 mb-3">Do&apos;s</h3>
                  <ul className="space-y-2 font-body text-gray-600">
                    <li>• Use clear, descriptive labels</li>
                    <li>• Provide helpful placeholder text</li>
                    <li>• Show validation feedback in real-time</li>
                    <li>• Group related fields together</li>
                    <li>• Make required fields obvious</li>
                    <li>• Use appropriate input types</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-accent text-lg font-semibold text-gray-800 mb-3">Don&apos;ts</h3>
                  <ul className="space-y-2 font-body text-gray-600">
                    <li>• Don&apos;t use vague error messages</li>
                    <li>• Don&apos;t make forms unnecessarily long</li>
                    <li>• Don&apos;t hide important information</li>
                    <li>• Don&apos;t use placeholders as labels</li>
                    <li>• Don&apos;t validate on every keystroke</li>
                    <li>• Don&apos;t disable the submit button permanently</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
