'use client';

import { useState } from 'react';
import { Button } from '@/components/ui-components/Button';
import { EnhancedToggle } from '@/components/ui-components/EnhancedToggle';
import Tooltip from '@/components/ui-components/Tooltip';
import Popover from '@/components/ui-components/Popover';
import { Checkbox } from '@/components/ui-components/Checkbox';
import { GradientBar } from '@/components/ui-components/GradientBar';
import { InfoCard } from '@/components/ui-components/InfoCard';
import { Badge } from '@/components/ui-components/Badge';
import SettingsIcon from '@/components/svg-icons/SettingsIcon';
import HelpIcon from '@/components/svg-icons/HelpIcon';
import SparkleIcon from '@/components/svg-icons/SparkleIcon';
import StarIcon from '@/components/svg-icons/StarIcon';

export default function ExtendedUITestPage() {
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
    darkMode: false,
  });

  const [checkboxStates, setCheckboxStates] = useState({
    terms: false,
    newsletter: true,
    updates: false,
    privacy: true,
  });

  const handleToggleChange = (key: keyof typeof toggleStates) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen ">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Extended UI Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Advanced toggles, tooltips, popovers, checkboxes, and specialized components
          </p>
        </div>

        <div className="pb-16">
          {/* Enhanced Toggles */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Enhanced Toggles</h2>
            
            <div className="grid md:grid-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Settings Toggles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-accent text-sm text-gray-800">Push Notifications</div>
                      <div className="font-body text-xs text-gray-500">Receive notifications about new job applications</div>
                    </div>
                    <EnhancedToggle
                      checked={toggleStates.notifications}
                      onChange={() => handleToggleChange('notifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-accent text-sm text-gray-800">Marketing Emails</div>
                      <div className="font-body text-xs text-gray-500">Get updates about new features and offers</div>
                    </div>
                    <EnhancedToggle
                      checked={toggleStates.marketing}
                      onChange={() => handleToggleChange('marketing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-accent text-sm text-gray-800">Analytics</div>
                      <div className="font-body text-xs text-gray-500">Help us improve by sharing usage data</div>
                    </div>
                    <EnhancedToggle
                      checked={toggleStates.analytics}
                      onChange={() => handleToggleChange('analytics')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-accent text-sm text-gray-800">Dark Mode</div>
                      <div className="font-body text-xs text-gray-500">Switch to dark theme</div>
                    </div>
                    <EnhancedToggle
                      checked={toggleStates.darkMode}
                      onChange={() => handleToggleChange('darkMode')}
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Toggle States</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-accent text-sm text-gray-600">Current States:</span>
                    <div className="mt-2 space-y-1">
                      {Object.entries(toggleStates).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="font-body text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <Badge variant={value ? 'success' : 'secondary'}>
                            {value ? 'On' : 'Off'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checkboxes */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Checkboxes</h2>
            
            <div className="grid md:grid-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Form Checkboxes</h3>
                <div className="space-y-4">
                  <Checkbox
                    id="terms"
                    checked={checkboxStates.terms}
                    onChange={() => handleCheckboxChange('terms')}
                    label="I agree to the Terms of Service"
                    required
                  />
                  
                  <Checkbox
                    id="newsletter"
                    checked={checkboxStates.newsletter}
                    onChange={() => handleCheckboxChange('newsletter')}
                    label="Subscribe to our newsletter"
                    description="Get weekly updates about new features and job opportunities"
                  />
                  
                  <Checkbox
                    id="updates"
                    checked={checkboxStates.updates}
                    onChange={() => handleCheckboxChange('updates')}
                    label="Product updates"
                    description="Receive notifications about product updates and announcements"
                  />
                  
                  <Checkbox
                    id="privacy"
                    checked={checkboxStates.privacy}
                    onChange={() => handleCheckboxChange('privacy')}
                    label="I have read the Privacy Policy"
                    required
                  />
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Checkbox Variations</h3>
                <div className="space-y-4">
                  <Checkbox
                    id="disabled-checked"
                    checked={true}
                    disabled
                    label="Disabled (checked)"
                  />
                  
                  <Checkbox
                    id="disabled-unchecked"
                    checked={false}
                    disabled
                    label="Disabled (unchecked)"
                  />
                  
                  <Checkbox
                    id="with-icon"
                    checked={true}
                    label="With icon"
                    description="This checkbox includes additional styling"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Tooltips */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Tooltips</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-6">Interactive Elements with Tooltips</h3>
              <div className="grid md:grid-2 lg:grid-4 gap-6">
                <div className="text-center">
                  <Tooltip content="This icon represents settings and configuration options">
                    <Button variant="ghost" size="lg" className="bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <SettingsIcon size={24} />
                    </Button>
                  </Tooltip>
                  <p className="font-accent text-sm text-gray-600 mt-2">Settings</p>
                </div>
                
                <div className="text-center">
                  <Tooltip content="Get help and support for your account and features">
                    <Button variant="ghost" size="lg" className="bg-green-100 text-green-600 hover:bg-green-200">
                      <HelpIcon size={24} />
                    </Button>
                  </Tooltip>
                  <p className="font-accent text-sm text-gray-600 mt-2">Help</p>
                </div>
                
                <div className="text-center">
                  <Tooltip content="Premium features and advanced functionality">
                    <Button variant="ghost" size="lg" className="bg-purple-100 text-purple-600 hover:bg-purple-200">
                      <SparkleIcon size={24} />
                    </Button>
                  </Tooltip>
                  <p className="font-accent text-sm text-gray-600 mt-2">Premium</p>
                </div>
                
                <div className="text-center">
                  <Tooltip content="Featured content and top-rated items">
                    <Button variant="ghost" size="lg" className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                      <StarIcon size={24} />
                    </Button>
                  </Tooltip>
                  <p className="font-accent text-sm text-gray-600 mt-2">Featured</p>
                </div>
              </div>
            </div>
          </section>

          {/* Gradient Bars */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Gradient Bars</h2>
            
            <div className="card">
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Decorative Gradient Bars</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-accent text-sm text-gray-600">Blue Gradient</span>
                    <span className="font-mono text-sm text-gray-500">Primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientBar color="blue" className="w-full h-3 rounded-full" />
                    <GradientBar color="blue" className="w-8 h-8 rounded" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-accent text-sm text-gray-600">Green Gradient</span>
                    <span className="font-mono text-sm text-gray-500">Success</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientBar color="green" className="w-full h-3 rounded-full" />
                    <GradientBar color="green" className="w-8 h-8 rounded" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-accent text-sm text-gray-600">Orange Gradient</span>
                    <span className="font-mono text-sm text-gray-500">Warning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientBar color="orange" className="w-full h-3 rounded-full" />
                    <GradientBar color="orange" className="w-8 h-8 rounded" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-accent text-sm text-gray-600">Purple Gradient</span>
                    <span className="font-mono text-sm text-gray-500">Info</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientBar color="purple" className="w-full h-3 rounded-full" />
                    <GradientBar color="purple" className="w-8 h-8 rounded" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-accent text-sm text-gray-600">Violet Gradient</span>
                    <span className="font-mono text-sm text-gray-500">Accent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GradientBar color="violet" className="w-full h-3 rounded-full" />
                    <GradientBar color="violet" className="w-8 h-8 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Info Cards */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Info Cards</h2>
            
            <div className="grid md:grid-2 gap-6">
              <InfoCard
                label="Welcome to Upzella"
                value="Start building your team with our powerful recruitment platform. Post jobs, review candidates, and hire the best talent."
                colorVariant="blue"
                icon={SparkleIcon}
                interactive
              />
              
              <InfoCard
                label="Upgrade Your Plan"
                value="Unlock premium features including AI-powered candidate matching, advanced analytics, and priority support."
                colorVariant="purple"
                icon={StarIcon}
                interactive
              />
              
              <InfoCard
                label="Complete Your Profile"
                value="Add your company information and preferences to help us match you with the best candidates."
                colorVariant="orange"
                icon={SettingsIcon}
                interactive
              />
              
              <InfoCard
                label="Need Help?"
                value="Our support team is here to help you get the most out of Upzella. Contact us anytime for assistance."
                colorVariant="green"
                icon={HelpIcon}
                interactive
              />
            </div>
          </section>

          {/* Usage Examples */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>
            
            <div className="grid md:grid-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Enhanced Toggle</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { EnhancedToggle } from '@/components/ui-components/EnhancedToggle';

<EnhancedToggle
  checked={isEnabled}
  onChange={(checked) => setIsEnabled(checked)}
  label="Enable notifications"
/>`}
                  </pre>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Tooltip</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { Tooltip } from '@/components/ui-components/Tooltip';
import { Button } from '@/components/ui-components/Button';

<Tooltip content="Helpful information">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`}
                  </pre>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">InfoCard</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { InfoCard } from '@/components/ui-components/InfoCard';

<InfoCard
  title="Card Title"
  description="Card description"
  variant="primary"
  icon={StarIcon}
  action={{
    label: "Action",
    href: "/link"
  }}
/>`}
                  </pre>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">GradientBar</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="font-mono text-sm text-gray-700 overflow-x-auto">
{`import { GradientBar } from '@/components/ui-components/GradientBar';

<GradientBar 
  progress={75} 
  variant="primary" 
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
