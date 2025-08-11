'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { JobService, CreateJobRequest } from '@/services/job.service';

// UI Components
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Textarea } from '@/components/ui-components/Textarea';
import { Select } from '@/components/ui-components/Select';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { EnhancedToggle } from '@/components/ui-components/Toggle';
import { Modal } from '@/components/ui-components/Modal';
import { InlineLoader } from '@/components/ui-components/loader';

// Icons
import {
    AIIcon,
    SaveIcon,
    PlusIcon,
    CrossIcon,
    CompanyIcon,
    LocationIcon,
    CurrencyIcon,
    ClockIcon,
    UserIcon,
    JobIcon,
    UploadIcon
} from '@/components/svg-icons';

// Validation Schema
const jobCreationSchema = yup.object({
    title: yup.string().required('Job title is required'),
    role_name: yup.string().required('Job role is required'),
    description: yup.string().required('Job description is required'),
    employment_type: yup.array().of(yup.string()).min(1, 'Select at least one employment type').required(),
    seniority_level: yup.array().of(yup.string()).min(1, 'Select at least one seniority level').required(),
    location_details: yup.object({
        location_country: yup.string().required('Country is required'),
        location_state: yup.string().required('State is required'),
        location_city: yup.string().required('City is required'),
        location_pin_code: yup.string().required('PIN code is required'),
    }).required(),
    salary_details: yup.object({
        salary_currency: yup.string().oneOf(['USD', 'INR']).required('Currency is required'),
        salary_from: yup.number().nullable(),
        salary_to: yup.number().nullable(),
        salary_period: yup.string().oneOf(['per hour', 'per month', 'per annum']).required('Salary period is required'),
    }).required(),
    experience_details: yup.object({
        experience_min: yup.number().min(0, 'Minimum experience must be at least 0').required(),
        experience_max: yup.number().min(0, 'Maximum experience must be at least 0').required(),
    }).required(),
    skills_required: yup.array().of(yup.string()).default([]),
    work_type: yup.array().of(yup.string()).default([]),
    compensation: yup.array().of(yup.string()).default([]),
    resume_threshold: yup.number().min(0, 'Resume threshold must be at least 0').max(100, 'Resume threshold cannot exceed 100').default(65),
    status: yup.string().oneOf(['draft', 'published', 'paused', 'closed']).default('draft'),
});

type JobFormData = yup.InferType<typeof jobCreationSchema>;

// Options for dropdowns
const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote', 'Hybrid'
];

const seniorityLevels = [
    'Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'
];

const workTypes = [
    'On-site', 'Remote', 'Hybrid', 'Travel Required', 'Field Work'
];

const compensationBenefits = [
    'Health Insurance', 'Dental Insurance', '401(k)', 'Paid Time Off',
    'Remote Work', 'Flexible Hours', 'Stock Options', 'Bonus',
    'Education Assistance', 'Gym Membership', 'Others'
];

const currencies = ['USD', 'INR'];
const salaryPeriods = ['per hour', 'per month', 'per annum'];

export default function CreateJobPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiText, setAIText] = useState('');
    const [aiFile, setAIFile] = useState<File | null>(null);
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [uploadMode, setUploadMode] = useState<'text' | 'file'>('file');

    // Skills and compensation state
    const [skillInput, setSkillInput] = useState('');
    const [customCompensation, setCustomCompensation] = useState('');
    const [showCustomCompensation, setShowCustomCompensation] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<JobFormData>({
        resolver: yupResolver(jobCreationSchema),
        defaultValues: {
            title: '',
            role_name: '',
            description: '',
            employment_type: [],
            seniority_level: [],
            location_details: {
                location_country: '',
                location_state: '',
                location_city: '',
                location_pin_code: '',
            },
            salary_details: {
                salary_currency: 'INR',
                salary_from: null,
                salary_to: null,
                salary_period: 'per annum',
            },
            experience_details: {
                experience_min: 0,
                experience_max: 5,
            },
            skills_required: [],
            work_type: [],
            compensation: [],
            resume_threshold: 65,
            status: 'draft',
        },
    });

    const watchedSkills = watch('skills_required') || [];
    const watchedCompensation = watch('compensation') || [];
    const watchedEmploymentTypes = watch('employment_type') || [];
    const watchedSeniorityLevels = watch('seniority_level') || [];
    const watchedWorkTypes = watch('work_type') || [];

    const handleSkillAdd = () => {
        if (skillInput.trim() && !watchedSkills.includes(skillInput.trim())) {
            setValue('skills_required', [...watchedSkills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const handleSkillRemove = (skillToRemove: string) => {
        setValue('skills_required', watchedSkills.filter(skill => skill !== skillToRemove));
    };

    const handleSkillKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSkillAdd();
        }
    };

    const handleCustomCompensationAdd = () => {
        if (customCompensation.trim()) {
            const newBenefits = customCompensation.split(',').map(b => b.trim()).filter(b => b);
            const uniqueBenefits = [...new Set([...watchedCompensation, ...newBenefits])];
            setValue('compensation', uniqueBenefits);
            setCustomCompensation('');
            setShowCustomCompensation(false);
        }
    };

    const handleCustomCompensationKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCustomCompensationAdd();
        }
    };

    const handleCompensationRemove = (benefitToRemove: string) => {
        setValue('compensation', watchedCompensation.filter(benefit => benefit !== benefitToRemove));
    };

    const handleAIExtraction = async () => {
        let extractedText = '';

        if (uploadMode === 'file') {
            if (!aiFile) {
                toast.error('Please select a file for AI extraction');
                return;
            }
            
            try {
                setIsAIProcessing(true);
                
                // Extract text from file
                const formData = new FormData();
                formData.append('file', aiFile);
                
                const extractResponse = await fetch('/api/extract-file', {
                    method: 'POST',
                    body: formData,
                });
                
                if (!extractResponse.ok) {
                    throw new Error('Failed to extract text from file');
                }
                
                const extractResult = await extractResponse.json();
                extractedText = extractResult.text;
                
            } catch (error) {
                console.error('File extraction error:', error);
                toast.error('Failed to extract text from file');
                setIsAIProcessing(false);
                return;
            }
        } else {
            if (!aiText.trim()) {
                toast.error('Please enter job description text for AI extraction');
                return;
            }
            extractedText = aiText;
        }

        try {
            const result = await JobService.extractJobFromText(extractedText);

            if (result) {
                // Fill form with extracted data
                setValue('title', result.title || '');
                setValue('role_name', result.role_name || '');
                setValue('description', result.description || '');
                setValue('employment_type', result.employment_type || []);
                setValue('seniority_level', result.seniority_level || []);
                setValue('skills_required', result.skills_required || []);
                setValue('work_type', result.work_type || []);
                setValue('compensation', result.compensation || []);
                setValue('resume_threshold', result.resume_threshold || 65);

                if (result.location_details) {
                    setValue('location_details', result.location_details);
                }

                if (result.salary_details) {
                    setValue('salary_details', result.salary_details);
                }

                if (result.experience_details) {
                    setValue('experience_details', result.experience_details);
                }

                toast.success('Job details extracted successfully!');
                setShowAIModal(false);
                setAIText('');
                setAIFile(null);
            }
        } catch (error) {
            console.error('AI extraction error:', error);
            toast.error('Failed to extract job details');
        } finally {
            setIsAIProcessing(false);
        }
    };

    const onSubmit = async (data: JobFormData) => {
        try {
            setIsSubmitting(true);

            // TODO: Get company_id from auth context
            const company_id = 'temp-company-id'; // This should come from auth context

            // Create default resume score weightage
            const defaultWeightage = [
                { resume_section: 'skills', resume_criteria: 'Required skills match', resume_weightage: 30, reason: 'Technical skills alignment' },
                { resume_section: 'experience', resume_criteria: 'Years of experience', resume_weightage: 25, reason: 'Experience level requirement' },
                { resume_section: 'education', resume_criteria: 'Educational background', resume_weightage: 20, reason: 'Educational qualification' },
                { resume_section: 'projects', resume_criteria: 'Relevant projects', resume_weightage: 15, reason: 'Practical application' },
                { resume_section: 'certifications', resume_criteria: 'Professional certifications', resume_weightage: 10, reason: 'Industry credentials' },
            ];

            const jobData: CreateJobRequest = {
                company_id,
                role_name: data.role_name,
                title: data.title,
                description: data.description,
                skills_required: data.skills_required.filter(Boolean) as string[],
                work_type: data.work_type.filter(Boolean) as string[],
                employment_type: data.employment_type.filter(Boolean) as string[],
                seniority_level: data.seniority_level.filter(Boolean) as string[],
                location_details: data.location_details,
                salary_details: {
                    ...data.salary_details,
                    salary_from: data.salary_details.salary_from || undefined,
                    salary_to: data.salary_details.salary_to || undefined,
                },
                experience_details: data.experience_details,
                compensation: data.compensation.filter(Boolean) as string[],
                resume_threshold: data.resume_threshold,
                resume_score_weightage_details: defaultWeightage,
                status: data.status,
                original_job_description_text: aiText || undefined,
            };

            const result = await JobService.createJob(jobData);

            toast.success('Job created successfully!');
            router.push('/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
            toast.error('Failed to create job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="sizer">
                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h1 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-blue-600 to-blue-900/95 bg-clip-text text-transparent">
                            Create New Job Listing
                        </h1>
                        <p className="text-sm text-gray-600 mt-1 font-inter">Fill out the details below to create a new job opportunity.</p>
                    </div>

                    <Button
                        onClick={() => setShowAIModal(true)}
                        variant="primary"
                        size="sm"
                        leftIcon={<AIIcon className="h-4 w-4" />}
                    >
                        AI Auto Fill
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                <CompanyIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                                <p className="text-xs text-gray-600 mt-0.5">Job title, role, and description</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <Input
                                {...register('title')}
                                label="Job Title"
                                placeholder="e.g. Senior Software Engineer"
                                error={errors.title?.message}
                                required
                            />

                            <Input
                                {...register('role_name')}
                                label="Job Role"
                                placeholder="e.g. Software Engineer"
                                error={errors.role_name?.message}
                                required
                            />
                        </div>

                        <Textarea
                            {...register('description')}
                            label="Job Description"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            rows={5}
                            error={errors.description?.message}
                            required
                        />
                    </Card>

                    {/* Work Details */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                                <UserIcon className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Work Details</h2>
                                <p className="text-xs text-gray-600 mt-0.5">Employment type, seniority, and requirements</p>
                            </div>
                        </div>

                        {/* Employment Type */}
                        <div className="mb-6">
                            <EnhancedToggle
                                label="Employment Type"
                                options={employmentTypes.map(type => ({ value: type, label: type }))}
                                value={watchedEmploymentTypes.join(",")}
                                values={watchedEmploymentTypes.filter(Boolean) as string[]}
                                onChange={(value) => setValue('employment_type', value.split(",").filter(v => v))}
                                variant="default"
                                multiple
                                required
                            />
                            {errors.employment_type && (
                                <p className="mt-2 text-sm text-red-600">{errors.employment_type.message}</p>
                            )}
                        </div>

                        {/* Seniority Levels */}
                        <div className="mb-6">
                            <EnhancedToggle
                                label="Seniority Levels"
                                options={seniorityLevels.map(level => ({ value: level, label: level }))}
                                value={watchedSeniorityLevels.filter(Boolean).join(",")}
                                values={watchedSeniorityLevels.filter(Boolean) as string[]}
                                onChange={(value) => setValue('seniority_level', value.split(",").filter(v => v))}
                                variant="default"
                                multiple
                                required
                            />
                            {errors.seniority_level && (
                                <p className="mt-2 text-sm text-red-600">{errors.seniority_level.message}</p>
                            )}
                        </div>

                        {/* Work Type */}
                        <div className="mb-6">
                            <EnhancedToggle
                                label="Work Type"
                                options={workTypes.map(type => ({ value: type, label: type }))}
                                value={watchedWorkTypes.filter(Boolean).join(",")}
                                values={watchedWorkTypes.filter(Boolean) as string[]}
                                onChange={(value) => setValue('work_type', value.split(",").filter(v => v))}
                                variant="default"
                                multiple
                            />
                        </div>

                        {/* Experience Range */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Experience Required <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    {...register('experience_details.experience_min', { valueAsNumber: true })}
                                    type="number"
                                    label="Min Years"
                                    placeholder="0"
                                    error={errors.experience_details?.experience_min?.message}
                                />
                                <Input
                                    {...register('experience_details.experience_max', { valueAsNumber: true })}
                                    type="number"
                                    label="Max Years"
                                    placeholder="5"
                                    error={errors.experience_details?.experience_max?.message}
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Required Skills
                            </label>
                            <div className="flex gap-2 mb-3">
                                <Input
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyPress}
                                    placeholder="Enter a skill and press Enter"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    onClick={handleSkillAdd}
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={<PlusIcon className="h-4 w-4" />}
                                >
                                    Add
                                </Button>
                            </div>

                            {watchedSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {watchedSkills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-2 text-xs"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => skill && handleSkillRemove(skill)}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <CrossIcon className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Resume Threshold */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Resume Scoring Threshold
                            </label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    {...register('resume_threshold', { valueAsNumber: true })}
                                    placeholder="65"
                                    className="w-32"
                                    error={errors.resume_threshold?.message}
                                />
                                <span className="text-sm text-gray-500">
                                    % minimum score required for resume to pass initial screening
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Location Details */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg">
                                <LocationIcon className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Location Details</h2>
                                <p className="text-xs text-gray-600 mt-0.5">Where the job is located</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                {...register('location_details.location_country')}
                                label="Country"
                                placeholder="e.g. United States"
                                error={errors.location_details?.location_country?.message}
                                required
                            />

                            <Input
                                {...register('location_details.location_state')}
                                label="State"
                                placeholder="e.g. California"
                                error={errors.location_details?.location_state?.message}
                                required
                            />

                            <Input
                                {...register('location_details.location_city')}
                                label="City"
                                placeholder="e.g. San Francisco"
                                error={errors.location_details?.location_city?.message}
                                required
                            />

                            <Input
                                {...register('location_details.location_pin_code')}
                                label="ZIP/PIN Code"
                                placeholder="e.g. 94105"
                                error={errors.location_details?.location_pin_code?.message}
                                required
                            />
                        </div>
                    </Card>

                    {/* Compensation */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                                <CurrencyIcon className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Compensation & Benefits</h2>
                                <p className="text-xs text-gray-600 mt-0.5">Salary and benefits package</p>
                            </div>
                        </div>

                        {/* Salary Details */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Salary Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
                                    <Select
                                        value={watch('salary_details.salary_currency') || 'USD'}
                                        onChange={(value) => setValue('salary_details.salary_currency', value as 'USD' | 'INR')}
                                        options={currencies.map(c => ({ value: c, label: c }))}
                                        error={errors.salary_details?.salary_currency?.message}
                                    />
                                </div>

                                <Input
                                    {...register('salary_details.salary_from', { valueAsNumber: true })}
                                    type="number"
                                    label="Min Salary"
                                    placeholder="50000"
                                    error={errors.salary_details?.salary_from?.message}
                                />

                                <Input
                                    {...register('salary_details.salary_to', { valueAsNumber: true })}
                                    type="number"
                                    label="Max Salary"
                                    placeholder="80000"
                                    error={errors.salary_details?.salary_to?.message}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Period *</label>
                                    <Select
                                        value={watch('salary_details.salary_period') || 'per annum'}
                                        onChange={(value) => setValue('salary_details.salary_period', value as 'per hour' | 'per month' | 'per annum')}
                                        options={salaryPeriods.map(p => ({ value: p, label: p }))}
                                        error={errors.salary_details?.salary_period?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div>
                            <EnhancedToggle
                                label="Benefits & Perks"
                                options={compensationBenefits.map(benefit => ({ value: benefit, label: benefit }))}
                                value={watchedCompensation.filter(Boolean).join(",")}
                                values={watchedCompensation.filter(Boolean) as string[]}
                                onChange={(value) => {
                                    const selectedBenefits = value.split(",").filter(v => v);
                                    setValue('compensation', selectedBenefits);
                                    setShowCustomCompensation(selectedBenefits.includes('Others'));
                                }}
                                variant="default"
                                multiple
                            />

                            {showCustomCompensation && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add Custom Benefits</h4>
                                    <div className="flex gap-2">
                                        <Input
                                            value={customCompensation}
                                            onChange={(e) => setCustomCompensation(e.target.value)}
                                            onKeyDown={handleCustomCompensationKeyPress}
                                            placeholder="Enter custom benefits (comma separated)"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleCustomCompensationAdd}
                                            variant="secondary"
                                            size="sm"
                                            leftIcon={<PlusIcon className="h-4 w-4" />}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {watchedCompensation.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Benefits:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {watchedCompensation.map((benefit, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="flex items-center gap-2 text-xs"
                                            >
                                                {benefit}
                                                <button
                                                    type="button"
                                                    onClick={() => benefit && handleCompensationRemove(benefit)}
                                                    className="text-gray-500 hover:text-red-500"
                                                >
                                                    <CrossIcon className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="md"
                            leftIcon={<SaveIcon className="h-4 w-4" />}
                        >
                            {isSubmitting ? (
                                <>
                                    <InlineLoader size="sm" variant="dots" />
                                    Creating Job...
                                </>
                            ) : (
                                'Create Job'
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {/* AI Auto Fill Modal */}
            <Modal
                isOpen={showAIModal}
                onClose={() => setShowAIModal(false)}
                title="AI Auto Fill"
                size="lg"
            >
                <div className="space-y-4">
                    <div className="text-center py-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-3">
                            <AIIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Let AI extract job details</h3>
                        <p className="text-sm text-gray-600">Upload a job description file or paste text and let AI fill out the form</p>
                    </div>

                    {/* Upload Mode Toggle */}
                    <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setUploadMode('file')}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                uploadMode === 'file'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <UploadIcon className="h-4 w-4 inline mr-2" />
                            Upload File
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadMode('text')}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                uploadMode === 'text'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Paste Text
                        </button>
                    </div>

                    {uploadMode === 'file' ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Description File
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setAIFile(file || null);
                                    }}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100
                                        border border-gray-300 rounded-lg
                                        cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {aiFile && (
                                    <p className="text-xs text-green-600 mt-1">
                                        Selected: {aiFile.name}
                                    </p>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Supported formats: PDF, DOC, DOCX, TXT (max 10MB)
                            </p>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Description Text
                            </label>
                            <Textarea
                                value={aiText}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAIText(e.target.value)}
                                placeholder="Paste the job description text here..."
                                rows={8}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                The more detailed the description, the better our AI can extract information
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            onClick={() => {
                                setShowAIModal(false);
                                setAIText('');
                                setAIFile(null);
                            }}
                            variant="secondary"
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAIExtraction}
                            disabled={
                                (uploadMode === 'file' ? !aiFile : !aiText.trim()) || 
                                isAIProcessing
                            }
                            leftIcon={<AIIcon className="h-4 w-4" />}
                            size="sm"
                        >
                            {isAIProcessing ? (
                                <>
                                    <InlineLoader size="sm" variant="dots" />
                                    {uploadMode === 'file' ? 'Extracting from file...' : 'Processing...'}
                                </>
                            ) : (
                                'Extract Details'
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
