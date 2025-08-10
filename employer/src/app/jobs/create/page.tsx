'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { JobCreationForm } from '@/components/forms/JobCreationForm';
import { AIJobExtractModal } from '@/components/modals/AIJobExtractModal';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Logo } from '@/components/Logo';
import { AIIcon, PlusIcon, ArrowLeftIcon } from '@/components/svg-icons';
import Link from 'next/link';

export default function CreateJobPage() {
    const [showAIModal, setShowAIModal] = useState(false);
    const [jobFormData, setJobFormData] = useState(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleAIExtractSuccess = (extractedData: any) => {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors">
                                <ArrowLeftIcon className="w-4 h-4" />
                                <span>Back to Dashboard</span>
                            </Link>
                        </div>
                        <Logo size="sm" />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Job</h1>
                    <p className="text-slate-600">
                        Create a new job posting manually or use AI to extract details from a job description file.
                    </p>
                </div>

                {/* Action Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <PlusIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Manually</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Fill out the job details form manually with all required information.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {/* Form is already visible below */ }}
                            >
                                Start Creating
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <AIIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Auto-Fill</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Upload a job description file and let AI extract the details automatically.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setShowAIModal(true)}
                            >
                                Upload & Extract
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Job Creation Form */}
                <Card className="p-8">
                    <JobCreationForm
                        initialData={jobFormData}
                        onSuccess={handleJobCreateSuccess}
                    />
                </Card>
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
