'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobService } from '@/services/job.service';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { Table } from '@/components/ui-components/Table';
import { UpzellaLoader } from '@/components/ui-components/loader';
import { Logo } from '@/components/Logo';
import {
    PlusIcon,
    DocumentIcon,
    EditIcon,
    DeleteIcon,
    ViewIcon,
    LocationIcon,
    SalaryIcon,
    CalendarIcon,
    UserIcon,
    CompanyIcon,
    SearchIcon,
    FilterIcon,
    ArrowLeftIcon
} from '@/components/svg-icons';
import { useAuth } from '@/context/AuthContext';
import { GradientBar } from '@/components/ui-components/GradientBar';
import { Input } from '@/components/ui-components/Input';
import { BasicSelect } from '@/components/ui-components';

interface Job {
    id: string;
    title: string;
    role_name?: string;
    description?: string;
    skills_required?: string[];
    work_type?: string[];
    employment_type?: string[];
    seniority_level?: string[];
    company_name?: string;
    company_logo?: string;
    location_details?: {
        location_city?: string;
        location_state?: string;
        location_country?: string;
    };
    salary_details?: {
        salary_from?: number;
        salary_to?: number;
        salary_currency?: string;
        salary_period?: string;
    };
    experience_details?: {
        experience_min?: number;
        experience_max?: number;
    };
    compensation?: string[];
    status?: 'draft' | 'published' | 'paused' | 'closed';
    created_at: string;
    updated_at: string;
    applications_count?: number;
}

export default function JobsPage() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const { toast } = useToast();

    const router = useRouter();

    useEffect(() => {
        fetchJobs();
    }, [user]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await JobService.getJobs();
            setJobs(response.jobs || []);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            await JobService.deleteJob(jobId);
            toast.success('Job Deleted', 'The job has been deleted successfully.');
            setJobs(jobs.filter(job => job.id !== jobId));
        } catch (err) {
            console.error('Error deleting job:', err);
            toast.error('Delete Failed', 'An error occurred while deleting the job');
        }
        finally {
            setLoading(false);
        }
    };

    const formatSalary = (salaryDetails?: Job['salary_details']) => {
        if (!salaryDetails?.salary_from && !salaryDetails?.salary_to) return 'Not specified';
        const currency = salaryDetails?.salary_currency || 'INR';
        const period = salaryDetails?.salary_period ? ` ${salaryDetails.salary_period}` : '';

        if (salaryDetails?.salary_from && salaryDetails?.salary_to) {
            return `${currency} ${salaryDetails.salary_from.toLocaleString()} - ${salaryDetails.salary_to.toLocaleString()}${period}`;
        }
        if (salaryDetails?.salary_from) {
            return `From ${currency} ${salaryDetails.salary_from.toLocaleString()}${period}`;
        }
        if (salaryDetails?.salary_to) {
            return `Up to ${currency} ${salaryDetails.salary_to.toLocaleString()}${period}`;
        }
        return 'Not specified';
    };

    const formatLocation = (locationDetails?: Job['location_details']) => {
        if (!locationDetails) return 'Not specified';
        const parts = [
            locationDetails.location_city,
            locationDetails.location_state,
            locationDetails.location_country
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'Not specified';
    };

    const formatExperience = (experienceDetails?: Job['experience_details']) => {
        if (!experienceDetails) return 'Not specified';
        const { experience_min, experience_max } = experienceDetails;
        if (experience_min === experience_max) {
            return `${experience_min} year${experience_min !== 1 ? 's' : ''}`;
        }
        return `${experience_min || 0} - ${experience_max || 0} years`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'success';
            case 'draft': return 'default';
            case 'paused': return 'info';
            case 'closed': return 'error';
            default: return 'default';
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = searchQuery === '' ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.role_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company_name?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <UpzellaLoader text='Loading jobs...' />
        );
    }


    return (
        <div className="min-h-screen ">
            {/* Header */}

            
            <div className="">
                <div className="sizer py-4">
                    <div className="h-16">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center space-x-4'>
                                <div className='flex items-center space-x-4'>
                                    <Button
                                        variant='ghost'
                                        onClick={() => router.back()}
                                        leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                                        className='bg-transparent hover:bg-transparent text-blue-500 hover:underline hover:animate-pulse'
                                    >
                                        Back
                                    </Button>
                                    <GradientBar color='purple' />
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className="text-xl font-heading font-bold text-slate-900">Job Management</h1>
                                    <p className="text-slate-600 font-body">
                                        Manage your job postings, track applications, and analyze performance
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Link href="/jobs/create">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        leftIcon={<PlusIcon className="w-5 h-5" />}
                                    >
                                        Create New Job
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="sizer">
                {/* Jobs Table */}
                {error ? (
                    <Card className="text-center py-12">
                        <div className="text-red-500 mb-4">
                            <DocumentIcon className="w-12 h-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">Error loading jobs</h3>
                        <p className="text-slate-600 mb-4">{error}</p>
                        <Button variant="secondary" onClick={fetchJobs}>
                            Try Again
                        </Button>
                    </Card>
                ) : filteredJobs.length === 0 ? (
                    <Card className="text-center py-16 p-0 overflow-visible">
                        {/* Filters & Search */}
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex-1">
                                    <Input
                                        leftIcon={<SearchIcon className="w-5 h-5 text-slate-400" />}
                                        placeholder="Search jobs by title, role, or company..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FilterIcon className="w-5 h-5 text-slate-400" />
                                    <BasicSelect
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        options={[
                                            { value: 'all', label: 'All Status' },
                                            { value: 'draft', label: 'Draft' },
                                            { value: 'published', label: 'Published' },
                                            { value: 'paused', label: 'Paused' },
                                            { value: 'closed', label: 'Closed' },
                                        ]}
                                        className="min-w-[160px]"
                                    />
                                </div>
                            </div>


                        </div>
                        <div className="text-slate-400 mb-6">
                            <DocumentIcon className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2">
                            {searchQuery || statusFilter !== 'all' ? 'No jobs match your filters' : 'No jobs posted yet'}
                        </h3>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                                : 'Get started by creating your first job posting and start attracting top talent.'
                            }
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <Link href="/jobs/create">
                                <Button
                                    variant="primary"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    leftIcon={<PlusIcon className="w-5 h-5" />}
                                >
                                    Create Your First Job
                                </Button>
                            </Link>
                        )}
                    </Card>
                ) : (
                    <Card className='p-0 bg-transparent shadow-none border-none'>
                        <div className="overflow-hidden">
                            {/* Filters & Search */}
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="flex-1">
                                        <Input
                                            leftIcon={<SearchIcon className="w-5 h-5 text-slate-400" />}
                                            placeholder="Search jobs by title, role, or company..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <FilterIcon className="w-5 h-5 text-slate-400" />
                                        <BasicSelect
                                            value={statusFilter}
                                            onChange={setStatusFilter}
                                            options={[
                                                { value: 'all', label: 'All Status' },
                                                { value: 'draft', label: 'Draft' },
                                                { value: 'published', label: 'Published' },
                                                { value: 'paused', label: 'Paused' },
                                                { value: 'closed', label: 'Closed' },
                                            ]}
                                            className="min-w-[160px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2 px-1">
                                    <h3 className="text-sm font-heading font-semibold text-slate-900">
                                        {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                                    </h3>
                                    <div className="text-sm text-slate-500">
                                        Total: {jobs.length} • Filtered: {filteredJobs.length}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <Table
                                    variant="minimal"
                                    colorScheme="blue"
                                    size="md"
                                    hoverable={true}
                                    responsive={true}
                                    stickyHeader={true}
                                    stickyColumns={[0, 7]}
                                    paginated={true}
                                    pageSize={5}
                                    page={currentPage}
                                    onPageChange={setCurrentPage}
                                    totalRows={filteredJobs.length}
                                    showColumnLines={true}
                                    showRowLines={true}
                                    // maxHeight={600}
                                    // className="shadow-lg border border-purple-100/50 rounded-xl overflow-hidden"
                                >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell className="min-w-[250px]">Job Details</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[200px]">Location & Type</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[180px]">Experience & Level</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[200px]">Compensation</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[240px]">Skills Required</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[120px]">Status</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[120px]">Created</Table.HeaderCell>
                                            <Table.HeaderCell className="min-w-[140px]">Actions</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredJobs.map((job) => (
                                            <Table.Row key={job.id} className="group hover:bg-gradient-to-r hover:from-violet-200/30 hover:via-purple-200/30 hover:to-blue-200/30 transition-all duration-300">
                                                <Table.Cell className="py-4">
                                                    <div className="space-y-2">
                                                        <h3 className="font-heading font-bold text-slate-900 text-[15px] leading-tight line-clamp-2" title={job.title}>
                                                            {job.title}
                                                        </h3>
                                                        {job.role_name && (
                                                            <p className="font-body text-slate-600 text-sm line-clamp-1">
                                                                {job.role_name}
                                                            </p>
                                                        )}
                                                        {job.company_name && (
                                                            <div className="flex items-center space-x-1">
                                                                <CompanyIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                                <span className="font-body text-slate-500 text-xs line-clamp-1">
                                                                    {job.company_name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-1">
                                                            <LocationIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                            <span className="font-body text-slate-700 text-sm line-clamp-1">
                                                                {formatLocation(job.location_details)}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {job.work_type?.map((type, idx) => (
                                                                <Badge 
                                                                    key={idx} 
                                                                    variant="info" 
                                                                    size="xs" 
                                                                    className="capitalize bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                                                                >
                                                                    {type.replace('_', ' ')}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-1">
                                                            <UserIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                                            <span className="font-body text-slate-700 text-sm font-medium">
                                                                {formatExperience(job.experience_details)}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {job.seniority_level?.map((level, idx) => (
                                                                <Badge 
                                                                    key={idx} 
                                                                    variant="warning" 
                                                                    size="xs" 
                                                                    className="capitalize bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 transition-colors"
                                                                >
                                                                    {level.replace('_', ' ')}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-1">
                                                            <SalaryIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
                                                            <span className="font-body font-semibold text-slate-900 text-sm line-clamp-1">
                                                                {formatSalary(job.salary_details)}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {job.employment_type?.map((type, idx) => (
                                                                <Badge 
                                                                    key={idx} 
                                                                    variant="success" 
                                                                    size="xs" 
                                                                    className="capitalize bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors"
                                                                >
                                                                    {type.replace('-', ' ')}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                                                        {job.skills_required?.slice(0, 3).map((skill, idx) => (
                                                            <Badge 
                                                                key={idx} 
                                                                size="xs" 
                                                                variant="primary" 
                                                                // className="capitalize bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-violet-200 hover:from-violet-100 hover:to-purple-100 transition-all duration-200"
                                                            >
                                                                {skill.replace('-', ' ')}
                                                            </Badge>
                                                        ))}
                                                        {job.skills_required && job.skills_required.length > 3 && (
                                                            <div title={`All skills: ${job.skills_required.join(', ')}`}>
                                                                <Badge 
                                                                    size="xs" 
                                                                    variant="secondary" 
                                                                    className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-150 transition-colors cursor-help"
                                                                >
                                                                    +{job.skills_required.length - 3} more
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <Badge 
                                                        // variant={getStatusColor(job.status!)} 
                                                        size="sm" 
                                                        style={{
                                                            textTransform: 'capitalize',
                                                            fontWeight: 500,
                                                            padding: '0.25rem 0.75rem',
                                                            background:
                                                                job.status === 'published'
                                                                    ? '#d1fae5'
                                                                    : job.status === 'draft'
                                                                    ? '#8ec7ff'
                                                                    : job.status === 'paused'
                                                                    ? '#dbeafe'
                                                                    : '#fee2e2',
                                                            color:
                                                                job.status === 'published'
                                                                    ? '#065f46'
                                                                    : job.status === 'draft'
                                                                    ? '#334155'
                                                                    : job.status === 'paused'
                                                                    ? '#1e40af'
                                                                    : '#991b1b',
                                                            border: '1px solid',
                                                            borderColor:
                                                                job.status === 'published'
                                                                    ? '#6ee7b7'
                                                                    : job.status === 'draft'
                                                                    ? '#cbd5e1'
                                                                    : job.status === 'paused'
                                                                    ? '#93c5fd'
                                                                    : '#fecaca',
                                                            boxShadow: job.status === 'published' ? '0 1px 2px 0 rgba(16,185,129,0.08)' : undefined,
                                                        }}
                                                    >
                                                        {job.status}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="flex items-center space-x-1">
                                                        <CalendarIcon className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                                        <span className="font-body text-slate-600 text-sm">
                                                            {formatDate(job.created_at)}
                                                        </span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="py-4">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <Link href={`/jobs/${job.id}`}>
                                                            <button className="group/btn flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:scale-110 hover:shadow-md transition-all duration-200">
                                                                <ViewIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                            </button>
                                                        </Link>
                                                        <Link href={`/jobs/${job.id}/edit`}>
                                                            <button className="group/btn flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 hover:scale-110 hover:shadow-md transition-all duration-200">
                                                                <EditIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteJob(job.id)}
                                                            className="group/btn flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:scale-110 hover:shadow-md transition-all duration-200"
                                                            title="Delete Job"
                                                        >
                                                            <DeleteIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                        </button>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
