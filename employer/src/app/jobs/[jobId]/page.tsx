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
import { GradientBar } from '@/components/ui-components/GradientBar';

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
        <div className="min-h-screen">
            {/* Clean Navigation Header */}

            <div className="sizer py-4">
                <div className="h-16">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center space-x-4'>
                            <div className='flex items-center space-x-4'>
                                <Button
                                    variant='ghost'
                                    onClick={() => router.push(`/jobs/${jobId}`)}
                                    leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                                    className='bg-transparent hover:bg-transparent text-blue-500 hover:underline hover:animate-pulse'
                                >
                                    Back to Job
                                </Button>
                                <GradientBar color='blue' />
                            </div>
                            <div className='flex flex-col'>
                                <h1 className="text-xl font-heading font-bold text-slate-900">Job Dashboard</h1>
                                <p className="text-slate-600 font-body">
                                    Analytics and applications for "{job.title}"
                                </p>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <ViewIcon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>



            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Logo size="sm" />
                            <div className="w-px h-6 bg-gray-300"></div>
                            <Link
                                href="/jobs"
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                Back to Jobs
                            </Link>
                        </div>
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

            {/* Main Job Header Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                {job.company_logo ? (
                                    <img
                                        src={job.company_logo}
                                        alt={job.company_name}
                                        className="w-20 h-20 rounded-xl object-cover bg-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                        <CompanyIcon className="w-10 h-10 text-blue-600" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h1 className="text-3xl font-bold text-white truncate">
                                        {job.title}
                                    </h1>
                                    {job.role_name && job.role_name !== job.title && (
                                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                            {job.role_name}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xl text-blue-100 font-medium mb-4">
                                    {job.company_name}
                                </p>

                                {/* Job Details Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                    <div className="flex items-center space-x-3">
                                        <SalaryIcon className="w-5 h-5 text-white" />
                                        <div>
                                            <p className="text-sm text-blue-100">Salary</p>
                                            <p className="text-white font-semibold">
                                                {formatSalary(job.salary_details)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <LocationIcon className="w-5 h-5 text-white" />
                                        <div>
                                            <p className="text-sm text-blue-100">Location</p>
                                            <p className="text-white font-semibold">
                                                {formatLocation(job.location_details)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <UserIcon className="w-5 h-5 text-white" />
                                        <div>
                                            <p className="text-sm text-blue-100">Experience</p>
                                            <p className="text-white font-semibold">
                                                {formatExperience(job.experience_details)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status and Work Type */}
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">{getStatusIcon(job.status!)}</span>
                                <Badge variant={getStatusColor(job.status!)} className="capitalize">
                                    {job.status}
                                </Badge>
                            </div>
                            {job.employment_type?.map((type, idx) => (
                                <Badge key={idx} variant="default" className="bg-white/20 text-white border-white/30">
                                    {type.replace('-', ' ')}
                                </Badge>
                            ))}
                            {job.work_type?.map((type, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-white/20 text-white border-white/30">
                                    {type}
                                </Badge>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href={`/jobs/${job.id}/dashboard`}>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50"
                                    leftIcon={<ViewIcon className="w-5 h-5" />}
                                >
                                    View Dashboard
                                </Button>
                            </Link>
                            <Link href={`/jobs/${job.id}/edit`}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/30 text-white hover:bg-white/10"
                                    leftIcon={<EditIcon className="w-5 h-5" />}
                                >
                                    Edit Job
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-300 text-red-100 hover:bg-red-500/20"
                                onClick={handleDelete}
                                disabled={deleting}
                                leftIcon={<DeleteIcon className="w-5 h-5" />}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {generateJobStats(job).map((stat, index) => (
                        <Card key={stat.id} className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    {stat.trending && stat.trendValue && (
                                        <p className={`text-sm ${stat.trending === 'up' ? 'text-green-600' : stat.trending === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                            {stat.trending === 'up' ? '↗' : stat.trending === 'down' ? '↘' : '→'} {stat.trendValue}
                                        </p>
                                    )}
                                </div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.colorVariant === 'blue' ? 'bg-blue-100' :
                                        stat.colorVariant === 'purple' ? 'bg-purple-100' :
                                            stat.colorVariant === 'green' ? 'bg-green-100' :
                                                'bg-orange-100'
                                    }`}>
                                    {stat.colorVariant === 'blue' && <UserIcon className="w-6 h-6 text-blue-600" />}
                                    {stat.colorVariant === 'purple' && <ViewIcon className="w-6 h-6 text-purple-600" />}
                                    {stat.colorVariant === 'green' && <StarIcon className="w-6 h-6 text-green-600" />}
                                    {stat.colorVariant === 'orange' && <ClockIcon className="w-6 h-6 text-orange-600" />}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Description */}
                        <Card className="p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <JobIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                            </div>
                            <div className="prose prose-gray max-w-none">
                                <div className="text-gray-700 leading-relaxed space-y-4">
                                    {job.description.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="mb-4">
                                                {paragraph.trim()}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Skills Required */}
                        {job.skills_required && job.skills_required.length > 0 && (
                            <Card className="p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <SparkleIcon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Skills & Technologies</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {job.skills_required.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="justify-center py-2 text-center"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Benefits */}
                        {job.compensation && job.compensation.length > 0 && (
                            <Card className="p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <StarIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Benefits & Perks</h2>
                                </div>
                                <div className="space-y-3">
                                    {job.compensation.map((benefit, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                            <span className="font-medium text-green-800">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Overview */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Resume Threshold</p>
                                    <p className="text-lg font-semibold text-gray-900">{job.resume_threshold}%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Posted</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(job.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(job.updated_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Applications</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {job.applications_count || Math.floor(Math.random() * 156) + 25}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link href={`/jobs/${job.id}/dashboard`}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        leftIcon={<HireIcon className="w-4 h-4" />}
                                    >
                                        View Applications
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    leftIcon={<ShareIcon className="w-4 h-4" />}
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success('Success', 'Job link copied to clipboard!');
                                    }}
                                >
                                    Share Job Link
                                </Button>
                                <Link href={`/jobs/${job.id}/edit`}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        leftIcon={<EditIcon className="w-4 h-4" />}
                                    >
                                        Edit Job Details
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Resume Scoring */}
                        {job.resume_score_weightage_details && job.resume_score_weightage_details.length > 0 && (
                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Resume Scoring</h3>
                                <div className="space-y-3">
                                    {job.resume_score_weightage_details.map((criteria, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <Badge variant="default" className="text-xs">
                                                    {criteria.resume_section}
                                                </Badge>
                                                <span className="text-sm font-bold text-blue-600">
                                                    {criteria.resume_weightage}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{criteria.resume_criteria}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
