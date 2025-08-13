'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { JobCreationForm } from '@/components/jobs/JobCreationForm';
import { AIJobExtractModal } from '@/components/jobs/AIJobExtractModal';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { AIIcon, PlusIcon, ArrowLeftIcon } from '@/components/svg-icons';
import { GradientBar } from '@/components/ui-components/GradientBar';
import Link from 'next/link';

export default function CreateJobPage() {
    const [showAIModal, setShowAIModal] = useState(false);
    const [jobFormData, setJobFormData] = useState(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleAIExtractSuccess = (extractedData: any) => {
        console.log('handleAIExtractSuccess called with:', extractedData);
        setJobFormData(extractedData);
        setShowAIModal(false);
        toast.success(
            "AI Extraction completed",
            'Job details have been populated automatically. Please review and edit as needed.'
        );
    };

    const handleJobCreateSuccess = (jobId: string) => {
        toast.success(
            'Job Created Successfully',
            'Your job posting has been created and is now live.'
        )

        router.push(`/jobs/${jobId}/dashboard`);
    };

    return (
        <div className="min-h-screen">

            <div className="sizer">
                <div className='flex justify-between items-center mb-8'>

                    {/* Header */}
                    <div className="h-16 w-full">
                        <div className="flex items-center justify-between space-x-4">
                            <div className='flex items-center space-x-4'>
                                <div className='inline-flex space-x-4'>
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
                                    <h1 className="text-xl font-heading font-bold text-slate-900">Ceate New Job</h1>
                                    <p className="text-slate-600 font-body max-w-lg">
                                        Create a new job posting manually or use AI to extract details from a job description file.
                                    </p>
                                </div>
                            </div>
                            <div className='w-fit'>
                                <Button
                                    size="md"
                                    onClick={() => setShowAIModal(true)}
                                    className="flex items-center gap-3 py-0"
                                    leftIcon={<AIIcon className="w-10 h-10" />}
                                >
                                    AI Auto-Fill
                                </Button>
                            </div>
                        </div>
                    </div>


                    {/* Page Header */}
                    {/* <div className="mb-8">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent w-fit font-montserrat bg-gradient-to-r from-blue-600 via-blue-800 to-blue-900/95 ">Create New Job</h1>
                    
                    </div> */}

                </div>

                {/* Job Creation Form */}
                <JobCreationForm
                    initialData={jobFormData}
                    onSuccess={handleJobCreateSuccess}
                />

            </div>

            {/* AI Extract Modal */}
            <AIJobExtractModal
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                onSuccess={handleAIExtractSuccess}
            />
        </div>
    );
}
