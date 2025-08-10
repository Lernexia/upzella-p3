'use client';

import Link from 'next/link';
import { Input } from '@/components/ui-components/Input';
import { useState } from 'react';

export default function InputsTestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleEmailValidation = (value: string) => {
    setEmail(value);
    if (value.length > 0) {
      setIsValidating(true);
      setTimeout(() => {
        setIsValidating(false);
        setIsValid(value.includes('@') && value.includes('.'));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
          <h1 className="font-heading text-5xl font-bold text-gradient mb-4">
            Input Components
          </h1>
          <p className="font-body text-xl text-gray-700">
            Form inputs, validation states, variants, and interactive examples
          </p>
        </div>

        {/* Basic Input Variants */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Input Variants
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Default Variant</h3>
              <div className="space-y-4">
                <Input 
                  label="Full Name" 
                  placeholder="Enter your full name"
                  variant="default"
                />
                <Input 
                  label="Email Address" 
                  type="email"
                  placeholder="you@company.com"
                  variant="default"
                />
                <Input 
                  label="Phone Number" 
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  variant="default"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Filled Variant</h3>
              <div className="space-y-4">
                <Input 
                  label="Company Name" 
                  placeholder="Your company"
                  variant="filled"
                />
                <Input 
                  label="Job Title" 
                  placeholder="Your role"
                  variant="filled"
                />
                <Input 
                  label="Website" 
                  type="url"
                  placeholder="https://yourcompany.com"
                  variant="filled"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input with Icons */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Inputs with Icons
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Left Icons</h3>
              <div className="space-y-4">
                <Input 
                  label="Email"
                  placeholder="Enter email"
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
                <Input 
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
                <Input 
                  label="Search"
                  placeholder="Search..."
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Right Icons</h3>
              <div className="space-y-4">
                <Input 
                  label="Website URL"
                  placeholder="https://"
                  rightIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  }
                />
                <Input 
                  label="Amount"
                  type="number"
                  placeholder="0.00"
                  rightIcon={
                    <span className="text-gray-400 font-accent text-sm">USD</span>
                  }
                />
                <Input 
                  label="Date"
                  type="date"
                  rightIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Validation States */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Validation States
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Success & Error States</h3>
              <div className="space-y-4">
                <Input 
                  label="Valid Email"
                  value="user@company.com"
                  isValid={true}
                  showValidationIcon={true}
                  validationMessage="Email is valid"
                />
                <Input 
                  label="Invalid Email"
                  value="invalid-email"
                  error="Please enter a valid email address"
                  isValid={false}
                  showValidationIcon={true}
                />
                <Input 
                  label="Required Field"
                  placeholder="This field is required"
                  required
                  error="This field is required"
                />
              </div>
            </div>

            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Live Validation</h3>
              <div className="space-y-4">
                <Input 
                  label="Email with Live Validation"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailValidation(e.target.value)}
                  isValidating={isValidating}
                  isValid={isValid}
                  showValidationIcon={true}
                  placeholder="Type an email to see validation"
                />
                <Input 
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  validationMessage={password.length > 0 ? `${password.length}/8 characters` : ''}
                />
                <Input 
                  label="Read Only"
                  value="This field is read-only"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Types */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Input Types
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input 
              label="Text"
              type="text"
              placeholder="Text input"
            />
            <Input 
              label="Email"
              type="email"
              placeholder="email@example.com"
            />
            <Input 
              label="Password"
              type="password"
              placeholder="Password"
            />
            <Input 
              label="Number"
              type="number"
              placeholder="123"
            />
            <Input 
              label="Tel"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
            <Input 
              label="URL"
              type="url"
              placeholder="https://example.com"
            />
            <Input 
              label="Date"
              type="date"
            />
            <Input 
              label="Time"
              type="time"
            />
            <Input 
              label="Color"
              type="color"
              defaultValue="#3b82f6"
            />
          </div>
        </div>

        {/* Form Examples */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Complete Form Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-6">User Registration</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <Input 
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                </div>
                <Input 
                  label="Email Address"
                  type="email"
                  placeholder="john@company.com"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
                <Input 
                  label="Company"
                  placeholder="Acme Corp"
                  required
                />
                <Input 
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  required
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
                <button className="btn-primary w-full">Create Account</button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <Input 
                  label="Full Name"
                  placeholder="Your full name"
                  required
                />
                <Input 
                  label="Business Email"
                  type="email"
                  placeholder="you@business.com"
                  required
                />
                <Input 
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />
                <Input 
                  label="Website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input 
                    label="Country"
                    placeholder="United States"
                  />
                  <Input 
                    label="State/Province"
                    placeholder="California"
                  />
                </div>
                <button className="btn-secondary w-full">Save Contact Info</button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Best Practices</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use clear, descriptive labels for all inputs</li>
                <li>• Provide helpful placeholder text as examples</li>
                <li>• Show validation feedback immediately when possible</li>
                <li>• Use appropriate input types for better mobile experience</li>
                <li>• Group related fields together logically</li>
                <li>• Indicate required fields clearly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Accessibility</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• All inputs must have proper labels</li>
                <li>• Use ARIA attributes for screen readers</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Support keyboard navigation</li>
                <li>• Provide clear error messages</li>
                <li>• Use semantic HTML elements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
