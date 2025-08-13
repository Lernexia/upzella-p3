'use client';

import Link from 'next/link';
import { Button } from '@/components/ui-components/Button';
import { useState } from 'react';

export default function ButtonsTestPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const variants: Array<'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'warning' | 'danger'> = [
    'primary', 'secondary', 'tertiary', 'outline', 'ghost', 'gradient', 'success', 'warning', 'danger'
  ];

  const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

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
          <h1 className="font-heading text-5xl font-bold text-gradient mb-4">
            Button Components
          </h1>
          <p className="font-body text-xl text-gray-700">
            All button variants, sizes, states, and interactive examples
          </p>
        </div>

        {/* Button Variants */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Button Variants
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {variants.map((variant) => (
              <div key={variant} className="text-center">
                <Button variant={variant} className="w-full mb-3">
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                </Button>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  variant="{variant}"
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Button Sizes */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Button Sizes
          </h2>
          <div className="grid md:grid-cols-4 gap-6 items-end">
            {sizes.map((size) => (
              <div key={size} className="text-center">
                <Button variant="primary" size={size} className="w-full mb-3">
                  Size {size.toUpperCase()}
                </Button>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  size="{size}"
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Button States */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Button States
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Button variant="primary" className="w-full mb-3">
                Normal State
              </Button>
              <p className="font-body text-sm text-gray-600">Default interactive state</p>
            </div>
            <div className="text-center">
              <Button variant="primary" disabled className="w-full mb-3">
                Disabled State
              </Button>
              <p className="font-body text-sm text-gray-600">Non-interactive state</p>
            </div>
            <div className="text-center">
              <Button 
                variant="primary" 
                loading={loading}
                loadingText="Processing..."
                className="w-full mb-3"
                onClick={handleLoadingDemo}
              >
                {loading ? 'Loading...' : 'Click for Loading'}
              </Button>
              <p className="font-body text-sm text-gray-600">Loading state demo</p>
            </div>
            <div className="text-center">
              <Button variant="primary" fullWidth className="mb-3">
                Full Width
              </Button>
              <p className="font-body text-sm text-gray-600">Expands to container</p>
            </div>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Buttons with Icons
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              variant="primary"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Item
            </Button>
            <Button 
              variant="secondary"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Continue
            </Button>
            <Button 
              variant="outline"
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              Download
            </Button>
            <Button 
              variant="ghost"
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              }
            >
              Open Link
            </Button>
          </div>
        </div>

        {/* Button Groups */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Button Groups & Combinations
          </h2>
          
          <div className="space-y-8">
            {/* Primary Action Group */}
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Primary Action Group</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="ghost">Preview</Button>
              </div>
            </div>

            {/* Status Action Group */}
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Status Action Group</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="success">Approve</Button>
                <Button variant="warning">Pending</Button>
                <Button variant="danger">Reject</Button>
              </div>
            </div>

            {/* Size Variations */}
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Mixed Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="gradient" size="xl">Call to Action</Button>
                <Button variant="primary" size="lg">Secondary Action</Button>
                <Button variant="outline" size="md">Normal Action</Button>
                <Button variant="ghost" size="sm">Small Action</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Interactive Examples
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Form Actions</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="space-y-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="input-field"
                  />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" fullWidth>Submit Form</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Card Actions</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-title text-lg font-semibold text-gray-800 mb-2">Product Card</h4>
                <p className="font-body text-gray-600 mb-6">This is a sample product card with various action buttons.</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="gradient" size="sm">Buy Now</Button>
                  <Button variant="outline" size="sm">Add to Cart</Button>
                  <Button variant="ghost" size="sm">♡ Wishlist</Button>
                </div>
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
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">When to Use Each Variant</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li><strong>Primary:</strong> Main call-to-action, submit buttons</li>
                <li><strong>Secondary:</strong> Important but not primary actions</li>
                <li><strong>Outline:</strong> Secondary actions, cancel buttons</li>
                <li><strong>Ghost:</strong> Subtle actions, navigation</li>
                <li><strong>Gradient:</strong> Hero CTAs, premium actions</li>
                <li><strong>Success/Warning/Danger:</strong> Status-specific actions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Best Practices</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use only one primary button per section</li>
                <li>• Keep button text concise and action-oriented</li>
                <li>• Maintain consistent spacing between buttons</li>
                <li>• Use loading states for async operations</li>
                <li>• Ensure sufficient touch targets (44px minimum)</li>
                <li>• Provide clear visual feedback on hover/focus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
