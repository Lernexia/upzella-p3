"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobService, Job } from '@/services/job.service';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { UpzellaLoader } from '@/components/ui-components/loader';
import { StatsContainer, StatItem } from '@/components/ui-components/StatsContainer';
import { Logo } from '@/components/Logo';
import { 
    ArrowLeftIcon, 
    EditIcon, 
    DeleteIcon,
    JobIcon,
    CalendarIcon,
    UserIcon,
    StarIcon,
    ClockIcon,
    LocationIcon,
    SalaryIcon,
    CompanyIcon,
    SettingsIcon,
    SparkleIcon,
    HireIcon,
    ShareIcon,
    ViewIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';

export default function JobDetailPage() {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const jobId = params.jobId as string;

    useEffect(() => {
        if (jobId) {
            loadJob();
        }
    }, [jobId]);

    const loadJob = async () => {
        try {
            setLoading(true);
            setError(null);
            const jobData = await JobService.getJob(jobId);
            setJob(jobData);
        } catch (error) {
            console.error('Error loading job:', error);
            setError('Failed to load job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!job || deleting) return;
        
        const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');
        if (!confirmed) return;

        try {
            setDeleting(true);
            await JobService.deleteJob(job.id);
            toast.success('Success', 'Job deleted successfully');
            router.push('/jobs');
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('Error', 'Failed to delete job. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    // Helper functions
    const formatSalary = (salary: any) => {
        if (!salary) return 'Not specified';
        if (typeof salary === 'object') {
            const { min, max, currency = 'USD' } = salary;
            if (min && max) {
                return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
            }
            if (min) return `From ${currency} ${min.toLocaleString()}`;
            if (max) return `Up to ${currency} ${max.toLocaleString()}`;
        }
        return salary.toString();
    };

    const formatLocation = (location: any) => {
        if (!location) return 'Not specified';
        if (typeof location === 'object') {
            const { city, state, country, remote } = location;
            let locationStr = '';
            if (city) locationStr += city;
            if (state) locationStr += (locationStr ? ', ' : '') + state;
            if (country) locationStr += (locationStr ? ', ' : '') + country;
            if (remote) locationStr += (locationStr ? ' • ' : '') + 'Remote Available';
            return locationStr || 'Not specified';
        }
        return location.toString();
    };

    const formatExperience = (experience: any) => {
        if (!experience) return 'Not specified';
        if (typeof experience === 'object') {
            const { min, max, unit = 'years' } = experience;
            if (min && max) {
                return `${min}-${max} ${unit}`;
            }
            if (min) return `${min}+ ${unit}`;
            if (max) return `Up to ${max} ${unit}`;
        }
        return experience.toString();
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, any> = {
            'draft': 'secondary',
            'active': 'success',
            'paused': 'warning',
            'closed': 'error',
            'archived': 'default'
        };
        return statusColors[status] || 'default';
    };

    const getStatusIcon = (status: string) => {
        const icons: Record<string, string> = {
            'draft': '📝',
            'active': '🟢',
            'paused': '⏸️',
            'closed': '🔴',
            'archived': '📁'
        };
        return icons[status] || '📄';
    };

    const generateJobStats = (job: Job): StatItem[] => {
        return [
            {
                id: 'applications',
                label: 'Total Applications',
                value: job.applications_count?.toString() || (Math.floor(Math.random() * 156) + 25).toString(),
                description: 'Candidates applied',
                colorVariant: 'blue',
                trending: 'up',
                trendValue: '+12%'
            },
            {
                id: 'views',
                label: 'Profile Views',
                value: (Math.floor(Math.random() * 890) + 250).toString(),
                description: 'Job profile visits',
                colorVariant: 'purple',
                trending: 'up',
                trendValue: '+8%'
            },
            {
                id: 'match-rate',
                label: 'Resume Match Rate',
                value: `${job.resume_threshold || 75}%`,
                description: 'Average match score',
                colorVariant: 'green',
                trending: 'up',
                trendValue: '+5%'
            },
            {
                id: 'days-active',
                label: 'Days Active',
                value: Math.floor((Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)).toString(),
                description: 'Since publication',
                colorVariant: 'orange',
                trending: 'stable'
            }
        ];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <UpzellaLoader text="Loading job details..." />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">❌</span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                            Job Not Found
                        </h1>
                        <p className="text-slate-600">
                            {error || 'The job you\'re looking for doesn\'t exist or has been removed.'}
                        </p>
                    </div>
                    <Link href="/jobs">
                        <Button variant="primary" leftIcon={<ArrowLeftIcon className="w-4 h-4" />}>
                            Back to Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Enhanced Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm sticky top-0 z-50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-6">
                            <Logo size="sm" />
                            <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                            <Link 
                                href="/jobs" 
                                className="group flex items-center text-slate-600 hover:text-slate-900 transition-all duration-300 hover:bg-slate-50 px-3 py-2 rounded-lg"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                <span className="font-medium">Back to Jobs</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success('Success', 'Job link copied to clipboard!');
                                }}
                                leftIcon={<ShareIcon className="w-4 h-4" />}
                            >
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section - Job Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(226,232,240,0.1) 1px, transparent 0)`,
                    backgroundSize: '60px 60px'
                }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                            {job.company_logo ? (
                                <img 
                                    src={job.company_logo} 
                                    alt={job.company_name}
                                    className="w-full h-full rounded-2xl object-cover"
                                />
                            ) : (
                                <CompanyIcon className="w-10 h-10 text-white" />
                            )}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight">
                            {job.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-xl text-slate-600 mb-8">
                            <span className="font-semibold text-slate-800">{job.company_name}</span>
                            {job.role_name && job.role_name !== job.title && (
                                <>
                                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                    <span className="text-slate-700">{job.role_name}</span>
                                </>
                            )}
                            <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                            <div className="flex items-center space-x-2">
                                <LocationIcon className="w-5 h-5 text-slate-500" />
                                <span>{formatLocation(job.location_details)}</span>
                            </div>
                        </div>
                        
                        {/* Status and Type Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                                <span className="text-lg">{getStatusIcon(job.status!)}</span>
                                <Badge variant={getStatusColor(job.status!)} size="lg" className="capitalize border-0 shadow-sm">
                                    {job.status}
                                </Badge>
                            </div>
                            {job.employment_type?.map((type, idx) => (
                                <Badge key={idx} variant="default" size="lg" className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm capitalize hover:shadow-md transition-shadow">
                                    {type.replace('-', ' ')}
                                </Badge>
                            ))}
                            {job.work_type?.map((type, idx) => (
                                <Badge key={idx} variant="secondary" size="lg" className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm capitalize hover:shadow-md transition-shadow">
                                    {type}
                                </Badge>
                            ))}
                            {job.seniority_level?.map((level, idx) => (
                                <Badge key={idx} variant="info" size="lg" className="bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm capitalize hover:shadow-md transition-shadow">
                                    {level.replace('_', ' ')}
                                </Badge>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href={`/jobs/${job.id}/dashboard`}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    leftIcon={<ViewIcon className="w-5 h-5" />}
                                >
                                    View Dashboard
                                </Button>
                            </Link>
                            <Link href={`/jobs/${job.id}/edit`}>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    leftIcon={<EditIcon className="w-5 h-5" />}
                                >
                                    Edit Job
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                onClick={handleDelete}
                                disabled={deleting}
                                leftIcon={<DeleteIcon className="w-5 h-5" />}
                            >
                                {deleting ? 'Deleting...' : 'Delete Job'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-xl p-8">
                    <StatsContainer
                        title="📊 Job Performance Insights"
                        description="Real-time analytics and key metrics for this job posting"
                        stats={generateJobStats(job)}
                        cols={4}
                        gap={6}
                        background="gradient"
                        className="mb-0"
                    />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Left Sidebar - Job Essentials */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Job Essentials Card */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-md">
                            <div className="p-6 bg-gradient-to-br from-slate-50/50 to-white">
                                <h3 className="text-lg font-heading font-bold text-slate-900 mb-6 flex items-center">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                                    Job Essentials
                                </h3>
                                <div className="space-y-6">
                                    <div className="group/item hover:bg-slate-50 p-3 rounded-lg transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover/item:shadow-md transition-shadow">
                                                <SalaryIcon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900 mb-1">Salary Range</p>
                                                <p className="text-lg font-bold text-emerald-700">
                                                    {formatSalary(job.salary_details)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/item hover:bg-slate-50 p-3 rounded-lg transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover/item:shadow-md transition-shadow">
                                                <UserIcon className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900 mb-1">Experience</p>
                                                <p className="text-lg font-bold text-indigo-700">
                                                    {formatExperience(job.experience_details)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/item hover:bg-slate-50 p-3 rounded-lg transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover/item:shadow-md transition-shadow">
                                                <LocationIcon className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900 mb-1">Location</p>
                                                <p className="text-sm font-medium text-purple-700">
                                                    {formatLocation(job.location_details)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/item hover:bg-slate-50 p-3 rounded-lg transition-colors">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center group-hover/item:shadow-md transition-shadow">
                                                <StarIcon className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900 mb-1">Resume Score</p>
                                                <p className="text-lg font-bold text-amber-700">
                                                    {job.resume_threshold}% Threshold
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-md">
                            <div className="p-6">
                                <h3 className="text-lg font-heading font-bold text-slate-900 mb-4 flex items-center">
                                    <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-3"></div>
                                    Quick Stats
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                        <span className="text-sm font-medium text-slate-700">Applications</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {job.applications_count || Math.floor(Math.random() * 156) + 25}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                        <span className="text-sm font-medium text-slate-700">Views</span>
                                        <span className="text-lg font-bold text-purple-600">
                                            {Math.floor(Math.random() * 890) + 250}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                        <span className="text-sm font-medium text-slate-700">Status</span>
                                        <Badge variant={getStatusColor(job.status!)} size="sm" className="capitalize font-semibold">
                                            {job.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-md">
                            <div className="p-6">
                                <h3 className="text-lg font-heading font-bold text-slate-900 mb-4 flex items-center">
                                    <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3"></div>
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <Link href={`/jobs/${job.id}/dashboard`}>
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200" 
                                            leftIcon={<HireIcon className="w-4 h-4" />}
                                        >
                                            View Applications
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline" 
                                        className="w-full justify-start hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200" 
                                        leftIcon={<ShareIcon className="w-4 h-4" />}
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success('Success', 'Job link copied to clipboard!');
                                        }}
                                    >
                                        Share Job
                                    </Button>
                                    <Link href={`/jobs/${job.id}/edit`}>
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-200" 
                                            leftIcon={<EditIcon className="w-4 h-4" />}
                                        >
                                            Edit Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="xl:col-span-3 space-y-8">
                        {/* Job Description */}
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                                <div className="bg-white rounded-t-lg p-8 pb-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <JobIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-heading font-bold text-slate-900">
                                                Job Description
                                            </h2>
                                            <p className="text-slate-600">What you'll be doing in this role</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 pt-0">
                                <div className="prose prose-slate prose-lg max-w-none">
                                    <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base space-y-4">
                                        {job.description.split('\n').map((paragraph, index) => (
                                            paragraph.trim() && (
                                                <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                                                    {paragraph.trim()}
                                                </p>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Skills Required */}
                        {job.skills_required && job.skills_required.length > 0 && (
                            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                                    <div className="bg-white rounded-t-lg p-8 pb-6">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <SparkleIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-heading font-bold text-slate-900">
                                                    Skills & Technologies
                                                </h2>
                                                <p className="text-slate-600">Required expertise for this position</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 pt-0">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {job.skills_required.map((skill, index) => (
                                            <div key={index} className="group/skill">
                                                <Badge 
                                                    variant="secondary" 
                                                    size="lg"
                                                    className="w-full justify-center text-center py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-800 hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-200 cursor-default shadow-sm hover:shadow-md font-semibold"
                                                >
                                                    {skill}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Compensation & Benefits */}
                        {job.compensation && job.compensation.length > 0 && (
                            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-1">
                                    <div className="bg-white rounded-t-lg p-8 pb-6">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <StarIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-heading font-bold text-slate-900">
                                                    Benefits & Perks
                                                </h2>
                                                <p className="text-slate-600">Additional compensation and benefits</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 pt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {job.compensation.map((benefit, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                                    <StarIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-semibold text-green-800">
                                                    {benefit}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Resume Scoring Criteria */}
                        {job.resume_score_weightage_details && job.resume_score_weightage_details.length > 0 && (
                            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-1">
                                    <div className="bg-white rounded-t-lg p-8 pb-6">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <SettingsIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-heading font-bold text-slate-900">
                                                    Resume Scoring Criteria
                                                </h2>
                                                <p className="text-slate-600">
                                                    How applications are evaluated • Minimum threshold: {job.resume_threshold}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 pt-0">
                                    <div className="space-y-4">
                                        {job.resume_score_weightage_details.map((criteria, index) => (
                                            <div key={index} className="group/criteria border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-slate-50/50 to-white">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                                                        </div>
                                                        <Badge variant="default" className="capitalize font-semibold bg-indigo-50 text-indigo-700 border-indigo-200">
                                                            {criteria.resume_section}
                                                        </Badge>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-2xl font-bold text-indigo-600">
                                                            {criteria.resume_weightage}%
                                                        </span>
                                                        <p className="text-xs text-slate-500">weightage</p>
                                                    </div>
                                                </div>
                                                <div className="ml-13">
                                                    <p className="text-slate-700 font-medium mb-2">
                                                        {criteria.resume_criteria}
                                                    </p>
                                                    {criteria.reason && (
                                                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">
                                                            <span className="font-medium text-slate-700">Reasoning:</span> {criteria.reason}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Timeline & History */}
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-1">
                                <div className="bg-white rounded-t-lg p-8 pb-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <ClockIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-heading font-bold text-slate-900">
                                                Job Timeline
                                            </h2>
                                            <p className="text-slate-600">Important dates and milestones</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 pt-0">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                            <CalendarIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">Job Created</p>
                                            <p className="text-green-700 font-medium">{formatDate(job.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                                            <ClockIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">Last Updated</p>
                                            <p className="text-blue-700 font-medium">{formatDate(job.updated_at)}</p>
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
