'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { StatsContainer, StatItem } from '@/components/ui-components/StatsContainer';
import { InfoCardContainer, InfoCardData } from '@/components/ui-components/InfoCard';
import { UpzellaLoader } from '@/components/ui-components/loader';
import { JobService, Job } from '@/services/job.service';
import {
  PlusIcon,
  JobIcon,
  UserIcon,
  ViewIcon,
  CalendarIcon,
  TrendUpIcon,
  SparkleIcon,
  ClockIcon
} from '@/components/svg-icons';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    thisMonthJobs: 0,
    successRate: 95
  });

  useEffect(() => {
    if (user) {
      loadRecentJobs();
    }
  }, [user]);

  const loadRecentJobs = async () => {
    try {
      const response = await JobService.getJobs(5, 0);
      setRecentJobs(response.jobs);

      // Calculate stats
      const now = new Date();
      const thisMonthJobs = response.jobs.filter(job => {
        const jobDate = new Date(job.created_at);
        return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
      });

      setStats({
        totalJobs: response.jobs.length,
        activeJobs: response.jobs.length, // Assuming all jobs are active for now
        thisMonthJobs: thisMonthJobs.length,
        successRate: 95
      });
    } catch (error) {
      console.error('Error loading recent jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  if (loading) {
    return <UpzellaLoader text="Loading your dashboard..." />;
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  // Stats data for StatsContainer
  const statsData: StatItem[] = [
    {
      id: 'total-jobs',
      label: 'Total Jobs',
      value: stats.totalJobs,
      icon: JobIcon,
      colorVariant: 'purple'
    },
    {
      id: 'active-jobs',
      label: 'Active Jobs',
      value: stats.activeJobs,
      icon: ViewIcon,
      colorVariant: 'green'
    },
    {
      id: 'monthly-jobs',
      label: 'This Month',
      value: stats.thisMonthJobs,
      icon: CalendarIcon,
      colorVariant: 'blue'
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: SparkleIcon,
      colorVariant: 'amber'
    }
  ];

  // Info cards data for additional metrics
  const infoCardsData: InfoCardData[] = [
    {
      label: 'Applications Received',
      value: '247',
      icon: UserIcon,
      colorVariant: 'indigo'
    },
    {
      label: 'Response Time',
      value: '2.4h',
      icon: ClockIcon,
      colorVariant: 'teal'
    },
    {
      label: 'Interviews Scheduled',
      value: '18',
      icon: CalendarIcon,
      colorVariant: 'rose'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="sizer">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-montserrat bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome back, {user.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-lg text-gray-600 mt-2 font-inter">
              Here's what's happening with your hiring process today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/jobs/create">
              <Button
                leftIcon={<PlusIcon className="h-4 w-4 mr-2" />}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
                Create Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Primary Stats */}
        <StatsContainer
          stats={statsData}
          cols={4}
          gap={6}
          className="mb-8"
        />

        {/* Additional Info Cards */}
        <InfoCardContainer
          cards={infoCardsData}
          cols={3}
          gap={6}
          size="md"
          interactive={true}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="p-6 border-b border-purple-200/30 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 font-outfit">
                    Recent Job Postings
                  </h2>
                  <Link href="/jobs">
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100" rightIcon={<ViewIcon className="h-4 w-4 ml-2" />}>
                      View All

                    </Button>
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-purple-200/30">
                {loadingJobs ? (
                  <div className="p-8 text-center">
                    <UpzellaLoader text="Loading jobs..." fullScreen={false} />
                  </div>
                ) : recentJobs.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <JobIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-outfit">No jobs yet</h3>
                    <p className="text-gray-500 mb-4 font-inter">Create your first job posting to get started.</p>
                    <Link href="/jobs/create">
                      <Button leftIcon={<PlusIcon className="h-4 w-4 mr-2" />} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">

                        Create Your First Job
                      </Button>
                    </Link>
                  </div>
                ) : (
                  recentJobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <JobIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 font-outfit">{job.title}</h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="primary" size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                {job.employment_type}
                              </Badge>
                              <span className="text-sm text-gray-500 font-inter">
                                {job.experience_min}-{job.experience_max} years
                              </span>
                              <span className="text-sm text-gray-500 font-inter">
                                {new Date(job.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-100">
                            <ViewIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-t-lg">
                <div className="flex items-center space-x-4 mb-4">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Profile"
                      className="h-16 w-16 rounded-full object-cover border-2 border-purple-200 shadow-lg"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <UserIcon className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 font-outfit">{user.full_name}</h3>
                    <p className="text-sm text-purple-600 font-medium font-inter">{user.job_role || 'HR Manager'}</p>
                    {user.company?.name && (
                      <p className="text-sm text-gray-500 font-inter">{user.company.name}</p>
                    )}
                  </div>
                </div>
                <Link href="/profile">
                  <Button variant="outline" leftIcon={<UserIcon className="h-4 w-4 mr-2" />} className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">

                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 font-outfit">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/jobs/create">
                    <Button
                      leftIcon={<PlusIcon className="h-4 w-4 mr-2" />}
                      variant="outline" className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50">

                      Create New Job
                    </Button>
                  </Link>

                  <Link href="/jobs">
                    <Button
                      leftIcon={<JobIcon className="h-4 w-4 mr-2" />}
                      variant="outline" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50">
                      Manage Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 font-outfit">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900 font-inter">Account created</p>
                      <p className="text-xs text-gray-500 font-inter">Welcome to Upzella!</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
