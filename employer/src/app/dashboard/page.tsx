'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui-components/Button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="sizer">
        <div className="pt-16 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user.full_name}!
                  </h1>
                  <p className="font-body text-lg text-gray-600">
                    {user.company?.name} • {user.job_role}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/onboarding/user')}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title text-lg font-semibold text-gray-900">
                    Quick Stats
                  </h3>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    📊
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Jobs</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interviews</span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    🔔
                  </div>
                </div>
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Start by creating your first job posting
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title text-lg font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    disabled
                  >
                    Create Job Posting
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    disabled
                  >
                    View Applications
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => router.push('/onboarding/company')}
                    disabled={!user.company}
                  >
                    Company Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mt-8">
              <h2 className="font-title text-2xl font-semibold text-gray-900 mb-6">
                Company Information
              </h2>
              
              {user.company ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Company Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> {user.company.name}</p>
                      <p><span className="text-gray-600">Industry:</span> {user.company.industry || 'Not specified'}</p>
                      <p><span className="text-gray-600">Size:</span> {user.company.employee_count || 'Not specified'}</p>
                      <p><span className="text-gray-600">Location:</span> {user.company.country || 'Not specified'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Role</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Position:</span> {user.job_role}</p>
                      <p><span className="text-gray-600">Email:</span> {user.email}</p>
                      <p><span className="text-gray-600">Phone:</span> {user.phone || 'Not provided'}</p>
                      <p><span className="text-gray-600">Verified:</span> {user.is_verified ? '✅ Yes' : '❌ No'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No company information available</p>
                  <Button
                    variant="primary"
                    onClick={() => router.push('/onboarding/company')}
                  >
                    Set Up Company
                  </Button>
                </div>
              )}
            </div>

            {/* Development Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    🚧
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-title text-lg font-semibold text-yellow-800 mb-2">
                    Development Mode
                  </h3>
                  <p className="text-yellow-700">
                    This is the authentication and onboarding module for Upzella Phase 1. 
                    Job posting, candidate management, and other HR features will be added in future phases.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push('/auth/test')}
                    >
                      View Auth Test Page
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
