'use client';

import React, { useState } from 'react';
import CheckIcon from '@/components/svg-icons/CheckIcon';
import WarningIcon from '@/components/svg-icons/WarningIcon';
import XIcon from '@/components/svg-icons/XIcon';
import HelpIcon from '@/components/svg-icons/HelpIcon';

export default function FeedbackTestPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Job Posted Successfully', message: 'Your job posting is now live and visible to candidates.', time: '2 minutes ago' },
    { id: 2, type: 'warning', title: 'Profile Incomplete', message: 'Please complete your company profile to attract more candidates.', time: '1 hour ago' },
    { id: 3, type: 'info', title: 'New Feature Available', message: 'Check out our new AI-powered candidate matching feature.', time: '3 hours ago' },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Feedback Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Alerts, notifications, and status indicators
          </p>
        </div>

        <div className="pb-16">
          {/* Alert Banners */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Alert Banners</h2>
            
            <div className="space-y-6">
              {/* Success Alert */}
              <div className="card border-l-4 border-green-500 bg-green-50">
                <div className="flex items-start gap-3">
                  <CheckIcon size={20} className="text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-title text-lg font-semibold text-green-800 mb-2">
                      Account Verification Complete
                    </h3>
                    <p className="font-body text-green-700">
                      Your account has been successfully verified. You can now access all premium features 
                      and start posting job openings.
                    </p>
                  </div>
                  <button className="text-green-600 hover:text-green-800">
                    <XIcon size={20} className="" />
                  </button>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="card border-l-4 border-yellow-500 bg-yellow-50">
                <div className="flex items-start gap-3">
                  <WarningIcon size={20} className="text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-title text-lg font-semibold text-yellow-800 mb-2">
                      Action Required
                    </h3>
                    <p className="font-body text-yellow-700 mb-3">
                      Your subscription will expire in 7 days. Renew now to continue accessing 
                      premium features without interruption.
                    </p>
                    <button className="btn-warning">
                      Renew Subscription
                    </button>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <XIcon size={20} className="" />
                  </button>
                </div>
              </div>

              {/* Info Alert */}
              <div className="card border-l-4 border-blue-500 bg-blue-50">
                <div className="flex items-start gap-3">
                  <HelpIcon size={20} className="text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-title text-lg font-semibold text-blue-800 mb-2">
                      New Feature Update
                    </h3>
                    <p className="font-body text-blue-700">
                      We've added AI-powered candidate matching to help you find the best talent faster. 
                      Try it out on your next job posting.
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <XIcon size={20} className="" />
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              <div className="card border-l-4 border-red-500 bg-red-50">
                <div className="flex items-start gap-3">
                  <XIcon size={20} className="text-red-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-title text-lg font-semibold text-red-800 mb-2">
                      Upload Failed
                    </h3>
                    <p className="font-body text-red-700 mb-3">
                      The file could not be uploaded. Please check the file format and size, then try again.
                    </p>
                    <button className="btn-danger">
                      Try Again
                    </button>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    <XIcon size={20} className="" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Status Badges */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Status Badges</h2>
            
            <div className="card">
              <div className="grid grid-2 md:grid-4 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-accent mb-2">
                    <CheckIcon size={14} className="text-green-600" />
                    Active
                  </div>
                  <p className="font-body text-xs text-gray-500">Success state</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-accent mb-2">
                    <WarningIcon size={14} className="text-yellow-600" />
                    Pending
                  </div>
                  <p className="font-body text-xs text-gray-500">Warning state</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-accent mb-2">
                    <XIcon size={14} className="text-red-600" />
                    Inactive
                  </div>
                  <p className="font-body text-xs text-gray-500">Error state</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-accent mb-2">
                    <HelpIcon size={14} className="text-blue-600" />
                    Info
                  </div>
                  <p className="font-body text-xs text-gray-500">Info state</p>
                </div>
              </div>
            </div>
          </section>

          {/* Progress Indicators */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Progress Indicators</h2>
            
            <div className="grid md:grid-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Linear Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-accent text-sm text-gray-600">Profile Completion</span>
                      <span className="font-mono text-sm text-gray-500">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-accent text-sm text-gray-600">Job Applications</span>
                      <span className="font-mono text-sm text-gray-500">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-300" style={{width: '45%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Loading States</h3>
                <div className="space-y-4">
                  {/* Spinner */}
                  <div className="flex items-center gap-3">
                    <div className="spinner"></div>
                    <span className="font-body text-sm text-gray-600">Loading...</span>
                  </div>
                  
                  {/* Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Center */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Notification Center</h2>
            
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-title text-lg font-semibold text-gray-800">Recent Notifications</h3>
                <button className="font-accent text-sm text-blue-600 hover:text-blue-800">
                  Mark all as read
                </button>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-title text-sm font-semibold text-gray-800">
                          {notification.title}
                        </h4>
                        <button 
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XIcon size={16} className="" />
                        </button>
                      </div>
                      <p className="font-body text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <span className="font-accent text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {notifications.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔔</div>
                  <h3 className="font-title text-lg text-gray-600 mb-2">No notifications</h3>
                  <p className="font-body text-gray-500">
                    You're all caught up! New notifications will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
