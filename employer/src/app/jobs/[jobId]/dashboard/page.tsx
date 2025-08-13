"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobService, Job } from '@/services/job.service';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { Table } from '@/components/ui-components/Table';
import { UpzellaLoader } from '@/components/ui-components/loader';
import { GradientBar } from '@/components/ui-components/GradientBar';
import { 
    ArrowLeftIcon, 
    JobIcon,
    UserIcon,
    CalendarIcon,
    StarIcon,
    ViewIcon,
    CompanyIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';

interface ApplicationData {
    id: string;
    candidate_name: string;
    email: string;
    phone: string;
    experience: string;
    skills: string[];
    location: string;
    resume_score: number;
    applied_date: string;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
    resume_url?: string;
}

export default function JobDashboardPage() {
    const [job, setJob] = useState<Job | null>(null);
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const jobId = params.jobId as string;

    // Generate random applications data for demo
    const generateRandomApplications = (): ApplicationData[] => {
        const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'Christopher Lee', 'Amanda Garcia'];
        const skills = [
            ['JavaScript', 'React', 'Node.js'], 
            ['Python', 'Django', 'PostgreSQL'], 
            ['Java', 'Spring Boot', 'MySQL'], 
            ['TypeScript', 'Angular', 'MongoDB'],
            ['PHP', 'Laravel', 'Redis'],
            ['C#', '.NET', 'SQL Server'],
            ['Go', 'Docker', 'Kubernetes'],
            ['Ruby', 'Rails', 'PostgreSQL']
        ];
        const locations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA', 'Los Angeles, CA', 'Denver, CO'];
        const statuses: ApplicationData['status'][] = ['pending', 'reviewed', 'shortlisted', 'interview', 'rejected', 'hired'];
        
        return Array.from({ length: 47 }, (_, index) => ({
            id: `app-${index + 1}`,
            candidate_name: names[Math.floor(Math.random() * names.length)],
            email: `candidate${index + 1}@example.com`,
            phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            experience: `${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 5) + 2} years`,
            skills: skills[Math.floor(Math.random() * skills.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            resume_score: Math.floor(Math.random() * 40) + 60, // 60-100
            applied_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
            status: statuses[Math.floor(Math.random() * statuses.length)]
        }));
    };

    useEffect(() => {
        if (jobId) {
            loadJobAndData();
        }
    }, [jobId]);

    const loadJobAndData = async () => {
        try {
            setLoading(true);
            const jobData = await JobService.getJob(jobId);
            setJob(jobData);
            // Generate random applications for demo
            setApplications(generateRandomApplications());
        } catch (error) {
            console.error('Error loading job:', error);
            setError('Failed to load job details');
            toast.error('Error', 'Failed to load job details');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: ApplicationData['status']) => {
        switch (status) {
            case 'hired': return 'success';
            case 'shortlisted': return 'info';
            case 'interview': return 'warning';
            case 'rejected': return 'error';
            case 'reviewed': return 'secondary';
            case 'pending': return 'default';
            default: return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-50';
        if (score >= 80) return 'text-blue-600 bg-blue-50';
        if (score >= 70) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <UpzellaLoader text='Loading dashboard...' />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <Card className="text-center py-16 max-w-md mx-4">
                    <div className="text-red-500 mb-6">
                        <JobIcon className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2">
                        Job Not Found
                    </h3>
                    <p className="text-slate-600 mb-6">
                        {error || 'The job dashboard you\'re looking for doesn\'t exist.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/jobs">
                            <Button variant="primary">
                                Back to Jobs
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="">
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
            </div>

            {/* Main Content */}
            <div className="sizer pb-8">
                {/* Applications Table */}
                <Card className="overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-slate-900">
                                    Applications ({applications.length})
                                </h2>
                                <p className="text-slate-600 text-sm">
                                    Manage and review candidate applications
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant="info" size="sm">
                                    {applications.filter(app => app.status === 'pending').length} Pending
                                </Badge>
                                <Badge variant="success" size="sm">
                                    {applications.filter(app => app.status === 'shortlisted').length} Shortlisted
                                </Badge>
                            </div>
                        </div>
                    </div>
                    
                    <Table
                        variant="professional"
                        colorScheme="gradient"
                        pageSize={10}
                        page={currentPage}
                        onPageChange={setCurrentPage}
                        totalRows={applications.length}
                        paginated={true}
                        hoverable={true}
                        size="md"
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Candidate</Table.HeaderCell>
                                <Table.HeaderCell>Skills</Table.HeaderCell>
                                <Table.HeaderCell>Experience</Table.HeaderCell>
                                <Table.HeaderCell>Location</Table.HeaderCell>
                                <Table.HeaderCell>Score</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Applied</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {applications
                                .slice((currentPage - 1) * 10, currentPage * 10)
                                .map((app) => (
                                <Table.Row key={app.id}>
                                    <Table.Cell>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <UserIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{app.candidate_name}</div>
                                                <div className="text-sm text-slate-500">{app.email}</div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-1">
                                            {app.skills.slice(0, 2).map((skill, index) => (
                                                <Badge key={index} variant="secondary" size="sm">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {app.skills.length > 2 && (
                                                <Badge variant="default" size="sm">
                                                    +{app.skills.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-slate-700">{app.experience}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-slate-600 text-sm">{app.location}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(app.resume_score)}`}>
                                            {app.resume_score}%
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant={getStatusColor(app.status)} size="sm" className="capitalize">
                                            {app.status.replace('_', ' ')}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="text-sm text-slate-600">
                                            {formatDate(app.applied_date)}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
