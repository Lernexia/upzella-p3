'use client'

import React, { useState } from 'react';
import { EnhancedTabs } from '@/components/ui-components/EnhancedTabs';
import { Breadcrumb } from '@/components/ui-components/Breadcrumb';
import { Button } from '@/components/ui-components/Button';
import ChevronDownIcon from '@/components/svg-icons/ChevronDownIcon';
import NavigationIcon from '@/components/svg-icons/NavigationIcon';
import ArrowLeftIcon from '@/components/svg-icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/svg-icons/ArrowRightIcon';
import Link from 'next/link';
import { Select } from '@/components/ui-components/Select';

export default function NavigationTestPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabItems = [
    { id: 'overview', name: 'Overview', content: 'Overview content goes here' },
    { id: 'details', name: 'Details', content: 'Details content goes here' },
    { id: 'settings', name: 'Settings', content: 'Settings content goes here' },
    { id: 'history', name: 'History', content: 'History content goes here' },
  ];

  return (
    <div className="min-h-screen ">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Navigation Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Tabs, breadcrumbs, pagination, and navigation patterns
          </p>
        </div>

        <div className="pb-16">
          {/* Enhanced Tabs */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Enhanced Tabs</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Default Tabs</h3>
              <EnhancedTabs 
                tabs={tabItems} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          </section>

          {/* Breadcrumbs */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Breadcrumbs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Simple Breadcrumb</h3>
                <Breadcrumb 
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Jobs', href: '/jobs' },
                    { label: 'Job Details', isActive: true }
                  ]}
                />
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Complex Breadcrumb</h3>
                <Breadcrumb 
                  items={[
                    { label: 'Dashboard', href: '/' },
                    { label: 'Companies', href: '/companies' },
                    { label: 'Acme Corp', href: '/companies/acme' },
                    { label: 'Settings', isActive: true }
                  ]}
                  variant="colored"
                />
              </div>
              
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Minimal Breadcrumb</h3>
                <Breadcrumb 
                  items={[
                    { label: 'Test', href: '/test' },
                    { label: 'Navigation', isActive: true }
                  ]}
                  variant="minimal"
                />
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Custom Separator</h3>
                <Breadcrumb 
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Category', href: '/products/category' },
                    { label: 'Item', isActive: true }
                  ]}
                  separator={<span className="text-gray-400 mx-2">/</span>}
                />
              </div>
            </div>
          </section>

          {/* Pagination */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Pagination</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Simple Pagination</h3>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ArrowLeftIcon size={16} />
                  </Button>
                  <Button variant="secondary" size="sm">1</Button>
                  <Button variant="primary" size="sm">2</Button>
                  <Button variant="secondary" size="sm">3</Button>
                  <span className="px-2 text-gray-500">...</span>
                  <Button variant="secondary" size="sm">10</Button>
                  <Button variant="ghost" size="sm">
                    <ArrowRightIcon size={16} />
                  </Button>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Detailed Pagination</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-gray-600">
                      Showing 1 to 10 of 97 results
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-accent text-sm text-gray-600">Per page:</span>
                      <Select
                        value={"10"}
                        onChange={() => {}}
                        options={[
                          { label: "10", value: "10" },
                          { label: "25", value: "25" },
                          { label: "50", value: "50" },
                        ]}
                        size="sm"
                        className="w-20"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="sm" disabled>
                      <ArrowLeftIcon size={16} />
                    </Button>
                    <Button variant="primary" size="sm">1</Button>
                    <Button variant="secondary" size="sm">2</Button>
                    <Button variant="secondary" size="sm">3</Button>
                    <span className="px-2 text-gray-500">...</span>
                    <Button variant="secondary" size="sm">10</Button>
                    <Button variant="ghost" size="sm">
                      <ArrowRightIcon size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Menu */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Navigation Menus</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Vertical Menu</h3>
                <nav className="space-y-2">
                  <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-accent">
                    <NavigationIcon size={18} />
                    Dashboard
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-accent">
                    <NavigationIcon size={18} />
                    Jobs
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-accent">
                    <NavigationIcon size={18} />
                    Candidates
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-accent">
                    <NavigationIcon size={18} />
                    Settings
                  </Link>
                </nav>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Horizontal Menu</h3>
                <nav className="flex items-center gap-6">
                  <Link href="#" className="font-accent text-blue-700 border-b-2 border-blue-700 pb-2">
                    Overview
                  </Link>
                  <Link href="#" className="font-accent text-gray-600 hover:text-gray-800 pb-2">
                    Analytics
                  </Link>
                  <Link href="#" className="font-accent text-gray-600 hover:text-gray-800 pb-2">
                    Reports
                  </Link>
                  <Link href="#" className="font-accent text-gray-600 hover:text-gray-800 pb-2">
                    Settings
                  </Link>
                </nav>
              </div>
            </div>
          </section>

          {/* Step Navigation */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Step Navigation</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-6">Multi-Step Process</h3>
              <div className="flex items-center justify-between">
                {/* Step 1 - Completed */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-accent text-sm">
                    ✓
                  </div>
                  <div className="ml-3">
                    <div className="font-accent text-sm text-green-700">Step 1</div>
                    <div className="font-body text-xs text-gray-500">Company Info</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className="flex-1 h-0.5 bg-green-500 mx-4"></div>
                
                {/* Step 2 - Active */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-accent text-sm">
                    2
                  </div>
                  <div className="ml-3">
                    <div className="font-accent text-sm text-blue-700">Step 2</div>
                    <div className="font-body text-xs text-gray-500">Job Details</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                
                {/* Step 3 - Pending */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-accent text-sm">
                    3
                  </div>
                  <div className="ml-3">
                    <div className="font-accent text-sm text-gray-500">Step 3</div>
                    <div className="font-body text-xs text-gray-500">Review</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Enhanced Tabs Implementation</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { EnhancedTabs } from '@/components/ui-components/EnhancedTabs';

const tabItems = [
  { id: 'overview', label: 'Overview', content: 'Overview content' },
  { id: 'details', label: 'Details', content: 'Details content' },
];

<EnhancedTabs items={tabItems} />`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
