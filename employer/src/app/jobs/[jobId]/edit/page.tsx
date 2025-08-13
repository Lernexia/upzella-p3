"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobService, Job } from '@/services/job.service';
import { JobCreationForm } from '@/components/jobs/JobCreationForm';
import { Card } from '@/components/ui-components/Card';
import { Button } from '@/components/ui-components/Button';
import { UpzellaLoader } from '@/components/ui-components/loader';
import { GradientBar } from '@/components/ui-components/GradientBar';
import { Logo } from '@/components/Logo';
import {
    ArrowLeftIcon,
    EditIcon,
    JobIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';

export default function JobEditPage() {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
            const jobData = await JobService.getJob(jobId);
            setJob(jobData);
        } catch (error) {
            console.error('Error loading job:', error);
            setError('Failed to load job details');
            toast.error('Error', 'Failed to load job details');
        } finally {
            setLoading(false);
        }
    };

    const handleSuccess = (updatedJobId: string) => {
        toast.success('Success', 'Job updated successfully!');
        router.push(`/jobs/${updatedJobId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <UpzellaLoader text='Loading job details...' />
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
                        {error || 'The job you\'re trying to edit doesn\'t exist or has been removed.'}
                    </p>
                    <Link href="/jobs">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Back to Jobs
                        </button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="">
                <div className="sizer py-4 ">
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
                                    <GradientBar color='purple' />
                                </div>
                                <div className='flex items-center space-x-4'>

                                    <div className='flex flex-col'>

                                        <h1 className="text-xl font-heading font-bold text-slate-900">Edit Job Posting</h1>
                                        <p className="text-slate-600 font-body">
                                            Update your job details and requirements for "{job.title}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="sizer">
                {/* Edit Form */}
                <JobCreationForm
                    jobId={jobId}
                    isUpdate
                    initialData={job}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
}
