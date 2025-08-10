'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui-components/Button';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { Table } from '@/components/ui-components/Table';
import { Logo } from '@/components/Logo';
import {
    ArrowLeftIcon,
    EditIcon,
    ShareIcon,
    SettingsIcon,
    UserIcon,
    HireIcon
} from '@/components/svg-icons';
import { JobService } from '@/services/job.service';
import Link from 'next/link';
import { InlineLoader, UpzellaLoader } from '@/components/ui-components/loader';

interface Job {
    id: string;
    title: string;
    description: string;
    skills_required: string[];
    work_type: string[];
    employment_type: string;
    experience_min: number;
    experience_max: number;
    resume_threshold: number;
    resume_scoring_weights: Array<{
        section_name: string;
        criteria_description: string;
        weightage: number;
    }>;
    created_at: string;
}

export default function JobDashboardPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    const jobId = params.jobId as string;

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const jobData = await JobService.getJob(jobId);
                setJob(jobData);
            } catch (error) {
                console.error('Error fetching job:', error);
                toast.error(
                    'Error Loading Job',
                    'Failed to load job details. Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJob();
        }
    }, [jobId]);

    const handleSyncCandidates = async () => {
        setSyncing(true);
        try {
            // Future: Implement HubSpot sync
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            toast.info(
                'Candidate sync feature will be available in the next release.'
            );
        } catch (error) {
            toast.error(
                'Sync Failed',
                'Failed to sync candidates. Please try again.'
            );
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <UpzellaLoader
                text="Loading job details..."
            />
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h2>
                    <p className="text-slate-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
                    <Link href="/dashboard">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
    }

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Job Header */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <Badge variant="primary">{job.employment_type}</Badge>
                                {job.work_type.map((type, index) => (
                                    <Badge key={index} variant="secondary">{type}</Badge>
                                ))}
                            </div>
                            <p className="text-slate-600 text-sm">
                                Created on {new Date(job.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <EditIcon className="w-4 h-4 mr-2" />
                                Edit Job
                            </Button>
                            <Button variant="outline" size="sm">
                                <ShareIcon className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                            <Button variant="outline" size="sm">
                                <SettingsIcon className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <UserIcon className="w-5 h-5 text-slate-600" />
                                <span className="font-medium text-slate-900">Experience Required</span>
                            </div>
                            <p className="text-slate-600">
                                {job.experience_min} - {job.experience_max} years
                            </p>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <HireIcon className="w-5 h-5 text-slate-600" />
                                <span className="font-medium text-slate-900">Resume Threshold</span>
                            </div>
                            <p className="text-slate-600">{job.resume_threshold}%</p>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center space-x-3 mb-2">
                                <SettingsIcon className="w-5 h-5 text-slate-600" />
                                <span className="font-medium text-slate-900">Skills Required</span>
                            </div>
                            <p className="text-slate-600">{job.skills_required.length} skills</p>
                        </Card>
                    </div>
                </div>

                {/* Resume Scoring Table */}
                <Card className="p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Resume Scoring Configuration</h2>
                            <p className="text-slate-600">
                                Configure how resumes will be scored for this position.
                            </p>
                        </div>
                        <Button variant="outline">
                            <EditIcon className="w-4 h-4 mr-2" />
                            Edit Scoring
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Section</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Criteria</th>
                                    <th className="text-right py-3 px-4 font-semibold text-slate-900">Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {job.resume_scoring_weights.map((weight, index) => (
                                    <tr key={index} className="border-b border-slate-100">
                                        <td className="py-3 px-4">
                                            <Badge>{weight.section_name}</Badge>
                                        </td>
                                        <td className="py-3 px-4 text-slate-600">
                                            {weight.criteria_description || 'No specific criteria'}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <span className="font-semibold text-slate-900">{weight.weightage}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Sync Candidates Section */}
                <Card className="p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HireIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Find Candidates?</h3>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            Sync with external platforms to start receiving candidate applications for this position.
                        </p>
                        <Button
                            onClick={handleSyncCandidates}
                            disabled={syncing}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                        >
                            {syncing ? (
                                <>
                                    <InlineLoader size="sm" className="mr-2" text='Syncing...' />
                                </>
                            ) : (
                                <>
                                    <HireIcon className="w-4 h-4 mr-2" />
                                    Sync Candidates
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
