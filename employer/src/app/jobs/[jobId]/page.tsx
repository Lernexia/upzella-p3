"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobService, Job } from '@/services/job.service';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { Select } from '@/components/ui-components/Select';
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
import { Company } from '@/lib/schema/company.schema';
import { companyService } from '@/services/companies.service';

export default function JobDetailPage() {
    const [job, setJob] = useState<{ job: Job; company: Company } | null>(null);
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
            const companyData = await companyService.getCompanyById(jobData.company_id);
            setJob({ job: jobData, company: companyData! });
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
            await JobService.deleteJob(job.job.id);
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

            const { salary_currency, salary_from, salary_to, salary_period } = salary;
            if (!salary_from || !salary_to) return 'Not specified';
            if (salary_from && salary_to) {
                return `${salary_currency} ${salary_from.toLocaleString()} - ${salary_to.toLocaleString()} ${salary_period}`;
            }


        }
        return salary.toString();
    };

    const formatLocation = (location: any) => {
        if (!location) return 'Not specified';
        if (typeof location === 'object') {


            const { location_country, location_state, location_city, location_pin_code } = location;
            let locationStr = '';
            if (location_city) locationStr += location_city;
            if (location_state) locationStr += (locationStr ? ', ' : '') + location_state;
            if (location_country) locationStr += (locationStr ? ', ' : '') + location_country;
            return locationStr || 'Not specified';
        }
        return location.toString();
    };

    const formatExperience = (experience: any) => {
        if (!experience) return 'Not specified';
        if (typeof experience === 'object') {
            const { experience_min, experience_max } = experience;
            if (experience_min && experience_max) {
                return `${experience_min}-${experience_max} years`;
            }
            if (experience_min) return `${experience_min}+ years`;
            if (experience_max) return `Up to ${experience_max} years`;
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
            'published': 'success',
            'paused': 'warning',
            'closed': 'error',
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
                                <h1 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-700 to-slate-950">{job.job.title}</h1>
                                <p className="text-slate-600 font-body">
                                    {job.company.name}
                                </p>
                            </div>
                        </div>
                        {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <ViewIcon className="w-5 h-5 text-white" />
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 relative">
                {/* Grain effect overlay */}

                <div className='sizer relative z-10'>
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            {job.company.logo_url ? (
                                <img
                                    src={job.company.logo_url}
                                    alt={job.company.name}
                                    className="w-20 h-20 rounded-[14px] object-cover bg-white shadow-2xl border border-white/40 backdrop-blur-[2px]"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-white/80 rounded-xl flex items-center justify-center shadow-2xl border border-white/40 backdrop-blur-[2px]">
                                    <CompanyIcon className="w-10 h-10 text-blue-600" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <h2 className="text-2xl font-bold text-white truncate drop-shadow-lg">
                                    {job.job.title}
                                </h2>
                                {job.job.role_name && job.job.role_name !== job.job.title && (
                                    <Badge variant='primary' className="bg-white/30 text-white border-white/40 shadow-md backdrop-blur-[2px]">
                                        {job.job.role_name}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-xl text-blue-100 font-medium mb-4 drop-shadow">
                                @{job.company.name}
                            </p>

                            {/* Job Details Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/20 backdrop-blur-[6px] rounded-2xl p-6 border border-white/30 shadow-lg">
                                <div className="flex items-center space-x-3">
                                    <SalaryIcon className="w-10 h-10 text-white/90 drop-shadow" />
                                    <div>
                                        <p className="text-sm text-blue-100/90">Salary</p>
                                        <p className="text-white font-semibold drop-shadow">
                                            {formatSalary(job.job.salary_details)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <LocationIcon className="w-5 h-5 text-white/90 drop-shadow" />
                                    <div>
                                        <p className="text-sm text-blue-100/90">Location</p>
                                        <p className="text-white font-semibold drop-shadow">
                                            {formatLocation(job.job.location_details)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <UserIcon className="w-5 h-5 text-white/90 drop-shadow" />
                                    <div>
                                        <p className="text-sm text-blue-100/90">Experience</p>
                                        <p className="text-white font-semibold drop-shadow">
                                            {formatExperience(job.job.experience_details)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status and Work Type */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(job.job.status!)} className="capitalize ">
                                {job.job.status}
                            </Badge>
                        </div>
                        {job.job.employment_type?.map((type, idx) => (
                            <Badge key={idx} variant="default" >
                                {type.replace('-', ' ')}
                            </Badge>
                        ))}
                        {job.job.work_type?.map((type, idx) => (
                            <Badge key={idx} variant="secondary" >
                                {type}
                            </Badge>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8 items-center">
                        {/* Status Changer Dropdown (Upzella Select) */}
                        <div className="min-w-[140px]">
                            <Select
                                value={job.job.status}
                                onChange={async (newStatus: any) => {
                                    try {
                                        await JobService.updateJob(job.job.id, (newStatus !== 'published') ? { status: newStatus } : {...job.job});
                                        setJob((prev) => prev ? { ...prev, job: { ...prev.job, status: newStatus } } : prev);
                                        toast.success('Status Updated', `Job status changed to ${newStatus}`);
                                    } catch (err) {
                                        toast.error('Error', 'Failed to update status.');
                                    }
                                }}
                                disabled={deleting}
                                options={[
                                    { value: 'published', label: 'Published' },
                                    { value: 'draft', label: 'Draft' },
                                    { value: 'paused', label: 'Paused' },
                                    { value: 'closed', label: 'Closed' },
                                ]}
                                className="text-sm font-medium"
                            />
                        </div>
                        <Link href={`/jobs/${job.job.id}/dashboard`}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-blue-600 hover:bg-blue-50"
                                leftIcon={<ViewIcon className="w-5 h-5" />}
                            >
                                View Dashboard
                            </Button>
                        </Link>
                        <Link href={`/jobs/${job.job.id}/edit`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-400 text-white hover:bg-green-400 hover:text-white hover:border-nono"
                                leftIcon={<EditIcon className="w-5 h-5" />}
                            >
                                Edit Job
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-500 text-red-100 hover:bg-red-500/80 hover:border-none"
                            onClick={handleDelete}
                            disabled={deleting}
                            leftIcon={<DeleteIcon className="w-5 h-5" />}
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Job Header Card */}
            <div className="sizer">

                {/* Stats Section */}
                <StatsContainer
                    stats={generateJobStats(job.job)}
                    cols={4}
                    gap={6}
                    className="mb-8"
                />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Description */}
                        <Card className="p-5">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <JobIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                            </div>
                            <div className="prose prose-gray max-w-none">
                                <div className="text-gray-700 leading-relaxed space-y-4">
                                    {job.job.description.split('\n').map((paragraph, index) => (
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
                        {job.job.skills_required && job.job.skills_required.length > 0 && (
                            <Card className="p-5">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <SparkleIcon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Skills & Technologies</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {job.job.skills_required.map((skill, index) => {
                                        const variants = ["success", "error", "primary", "info"];
                                        const variant = variants[index % variants.length];
                                        return (
                                            <Badge
                                                key={index}
                                                variant={variant as any}
                                                className="justify-center py-2 text-center"
                                            >
                                                {skill}
                                            </Badge>
                                        );
                                    })}

                                </div>
                            </Card>
                        )}

                        {/* Resume Scoring */}
                        {job.job.resume_score_weightage_details && job.job.resume_score_weightage_details.length > 0 && (
                            <Card className="p-5">
                                <div className='flex items-center justify-between mb-4'>
                                    <h3 className="text-lg font-bold text-gray-900">Resume Scoring</h3>
                                    <span className='text-sm font-semibold text-gray-700'>Total: {job.job.resume_score_weightage_details.reduce((acc, curr) => acc + curr.resume_weightage, 0)}%</span>
                                </div>
                                <div className="space-y-3">
                                    {job.job.resume_score_weightage_details.map((criteria, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <Badge variant="info" className="text-xs">
                                                    {criteria.resume_section}
                                                </Badge>
                                                <span className="text-sm font-bold text-blue-600">
                                                    {criteria.resume_weightage}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 font-semibold">Criteria</p>
                                            <p className="text-sm text-gray-600 italic ml-1">{criteria.resume_criteria}</p>
                                            {/* Reason */}
                                            {criteria.reason && (
                                                <>
                                                    <p className="text-sm text-gray-700 font-semibold">Reason</p>
                                                    <p className="text-sm text-gray-600 italic ml-1">{criteria.reason}</p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Overview */}
                        <Card className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Resume Threshold</p>
                                    <p className="text-lg font-semibold text-gray-900">{job.job.resume_threshold}%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Posted</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(job.job.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                    <p className="text-lg font-semibold text-gray-900">{formatDate(job.job.updated_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Applications</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {job.job.applications_count || Math.floor(Math.random() * 156) + 25}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-5 bg-gradient-to-tr from-purple-50 via-blue-50 to-pink-50">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link href={`/jobs/${job.job.id}/dashboard`}>
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
                                    className="w-full justify-start mt-3"
                                    leftIcon={<ShareIcon className="w-4 h-4" />}
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success('Success', 'Job link copied to clipboard!');
                                    }}
                                >
                                    Share Job Link
                                </Button>
                                <Link href={`/jobs/${job.job.id}/edit`}>
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


                        {/* Benefits */}
                        {job.job.compensation && job.job.compensation.length > 0 && (
                            <Card className="p-5">
                                <div className="flex items-center space-x-3 mb-6">

                                    <h2 className="text-xl font-bold text-gray-900">Benefits & Perks</h2>
                                </div>
                                <div className="space-y-3">
                                    {job.job.compensation.map((benefit, index) => (
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
                </div>
            </div>
        </div>
    );
}
