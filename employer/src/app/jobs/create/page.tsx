'use client';

import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { EnhancedToggle } from '@/components/ui-components/EnhancedToggle';
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
  JobIcon
} from '@/components/svg-icons';

// Validation Schema
const jobCreationSchema = yup.object({
  title: yup.string().required('Job title is required'),
  role: yup.string().required('Job role is required'),
  description: yup.string().required('Job description is required'),
  employment_type: yup.array().of(yup.string()).min(1, 'Select at least one employment type'),
  seniority_levels: yup.array().of(yup.string()).min(1, 'Select at least one seniority level'),
  location_details: yup.object({
    location_country: yup.string().required('Country is required'),
    location_state: yup.string().required('State is required'),
    location_city: yup.string().required('City is required'),
    location_pin_code: yup.string().required('PIN code is required'),
  }),
  salary_details: yup.object({
    salary_currency: yup.string().required('Currency is required'),
    salary_from: yup.number().nullable(),
    salary_to: yup.number().nullable(),
    salary_period: yup.string().required('Salary period is required'),
  }),
  experience_details: yup.object({
    experience_min: yup.number().min(0, 'Minimum experience must be at least 0').required(),
    experience_max: yup.number().min(0, 'Maximum experience must be at least 0').required(),
  }),
  skills: yup.array().of(yup.string()),
  compensation_benefits: yup.array().of(yup.string()),
  resume_score_weightage_details: yup.object({
    skills_weightage: yup.number().min(0).max(100).default(30),
    experience_weightage: yup.number().min(0).max(100).default(25),
    education_weightage: yup.number().min(0).max(100).default(20),
    projects_weightage: yup.number().min(0).max(100).default(15),
    certifications_weightage: yup.number().min(0).max(100).default(10),
  }),
  status: yup.string().oneOf(['draft', 'active', 'paused', 'closed']).default('draft'),
});

type JobFormData = yup.InferType<typeof jobCreationSchema>;

// Options for dropdowns
const employmentTypes = [
  'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote', 'Hybrid'
];

const seniorityLevels = [
  'Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'
];

const compensationBenefits = [
  'Health Insurance', 'Dental Insurance', '401(k)', 'Paid Time Off', 
  'Remote Work', 'Flexible Hours', 'Stock Options', 'Bonus', 
  'Education Assistance', 'Gym Membership', 'Others'
];

const currencies = ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD'];
const salaryPeriods = ['per hour', 'per month', 'per annum'];

export default function CreateJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiText, setAIText] = useState('');
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Skills state
  const [skillInput, setSkillInput] = useState('');
  const [customCompensation, setCustomCompensation] = useState('');
  const [showCustomCompensation, setShowCustomCompensation] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<JobFormData>({
    resolver: yupResolver(jobCreationSchema),
    defaultValues: {
      title: '',
      role: '',
      description: '',
      employment_type: [],
      seniority_levels: [],
      location_details: {
        location_country: '',
        location_state: '',
        location_city: '',
        location_pin_code: '',
      },
      salary_details: {
        salary_currency: 'USD',
        salary_from: null,
        salary_to: null,
        salary_period: 'per annum',
      },
      experience_details: {
        experience_min: 0,
        experience_max: 5,
      },
      skills: [],
      compensation_benefits: [],
      resume_score_weightage_details: {
        skills_weightage: 30,
        experience_weightage: 25,
        education_weightage: 20,
        projects_weightage: 15,
        certifications_weightage: 10,
      },
      status: 'draft',
    },
  });

  const watchedSkills = watch('skills') || [];
  const watchedCompensation = watch('compensation_benefits') || [];
  const watchedEmploymentTypes = watch('employment_type') || [];
  const watchedSeniorityLevels = watch('seniority_levels') || [];

  const handleSkillAdd = () => {
    if (skillInput.trim() && !watchedSkills.includes(skillInput.trim())) {
      setValue('skills', [...watchedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setValue('skills', watchedSkills.filter(skill => skill !== skillToRemove));
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
      setValue('compensation_benefits', uniqueBenefits);
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
    setValue('compensation_benefits', watchedCompensation.filter(benefit => benefit !== benefitToRemove));
  };

  const handleEmploymentTypeToggle = (type: string, checked: boolean) => {
    if (checked) {
      setValue('employment_type', [...watchedEmploymentTypes, type]);
    } else {
      setValue('employment_type', watchedEmploymentTypes.filter(t => t !== type));
    }
  };

  const handleSeniorityLevelToggle = (level: string, checked: boolean) => {
    if (checked) {
      setValue('seniority_levels', [...watchedSeniorityLevels, level]);
    } else {
      setValue('seniority_levels', watchedSeniorityLevels.filter(l => l !== level));
    }
  };

  const handleCompensationToggle = (benefit: string, checked: boolean) => {
    if (benefit === 'Others') {
      setShowCustomCompensation(checked);
      return;
    }

    if (checked) {
      setValue('compensation_benefits', [...watchedCompensation, benefit]);
    } else {
      setValue('compensation_benefits', watchedCompensation.filter(b => b !== benefit));
    }
  };

  const handleAIExtraction = async () => {
    if (!aiText.trim()) {
      toast.error('Please enter job description text for AI extraction');
      return;
    }

    try {
      setIsAIProcessing(true);
      const result = await JobService.extractJobFromText({ text: aiText });
      
      if (result.success && result.data) {
        const extractedData = result.data;
        
        // Fill form with extracted data
        setValue('title', extractedData.title || '');
        setValue('role', extractedData.role || '');
        setValue('description', extractedData.description || '');
        setValue('employment_type', extractedData.employment_type || []);
        setValue('seniority_levels', extractedData.seniority_levels || []);
        setValue('skills', extractedData.skills || []);
        
        if (extractedData.location_details) {
          setValue('location_details', extractedData.location_details);
        }
        
        if (extractedData.salary_details) {
          setValue('salary_details', extractedData.salary_details);
        }
        
        if (extractedData.experience_details) {
          setValue('experience_details', extractedData.experience_details);
        }

        toast.success('Job details extracted successfully!');
        setShowAIModal(false);
        setAIText('');
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
      
      const jobData: CreateJobRequest = {
        ...data,
        location_details: data.location_details as any,
        salary_details: data.salary_details as any,
        experience_details: data.experience_details as any,
        resume_score_weightage_details: data.resume_score_weightage_details as any,
      };

      const result = await JobService.createJob(jobData);
      
      if (result.success) {
        toast.success('Job created successfully!');
        router.push('/jobs');
      } else {
        throw new Error(result.error || 'Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Create New Job
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to post a new job opening
          </p>
          
          {/* AI Auto Fill Button */}
          <div className="mt-6">
            <Button
              onClick={() => setShowAIModal(true)}
              variant="secondary"
              size="md"
              leftIcon={<AIIcon className="h-5 w-5" />}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
            >
              AI Auto Fill
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CompanyIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Job Title"
                    placeholder="e.g. Senior Software Engineer"
                    error={errors.title?.message}
                    required
                  />
                )}
              />
              
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Job Role"
                    placeholder="e.g. Software Engineer"
                    error={errors.role?.message}
                    required
                  />
                )}
              />
            </div>
            
            <div className="mt-6">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Job Description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                    error={errors.description?.message}
                    required
                  />
                )}
              />
            </div>
          </Card>

          {/* Work Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <JobIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Work Details</h2>
            </div>
            
            {/* Employment Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {employmentTypes.map((type) => (
                  <EnhancedToggle
                    key={type}
                    label={type}
                    checked={watchedEmploymentTypes.includes(type)}
                    onChange={(checked) => handleEmploymentTypeToggle(type, checked)}
                    size="sm"
                  />
                ))}
              </div>
              {errors.employment_type && (
                <p className="mt-2 text-sm text-red-600">{errors.employment_type.message}</p>
              )}
            </div>

            {/* Seniority Levels */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Seniority Levels <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seniorityLevels.map((level) => (
                  <EnhancedToggle
                    key={level}
                    label={level}
                    checked={watchedSeniorityLevels.includes(level)}
                    onChange={(checked) => handleSeniorityLevelToggle(level, checked)}
                    size="sm"
                  />
                ))}
              </div>
              {errors.seniority_levels && (
                <p className="mt-2 text-sm text-red-600">{errors.seniority_levels.message}</p>
              )}
            </div>

            {/* Experience Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Experience Required (Years) <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="experience_details.experience_min"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Minimum Experience"
                      placeholder="0"
                      value={value || ''}
                      onChange={(e) => onChange(Number(e.target.value))}
                      error={errors.experience_details?.experience_min?.message}
                    />
                  )}
                />
                <Controller
                  name="experience_details.experience_max"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Maximum Experience"
                      placeholder="5"
                      value={value || ''}
                      onChange={(e) => onChange(Number(e.target.value))}
                      error={errors.experience_details?.experience_max?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
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
                      className="flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <CrossIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Location Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <LocationIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Location Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="location_details.location_country"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Country"
                    placeholder="e.g. United States"
                    error={errors.location_details?.location_country?.message}
                    required
                  />
                )}
              />
              
              <Controller
                name="location_details.location_state"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="State"
                    placeholder="e.g. California"
                    error={errors.location_details?.location_state?.message}
                    required
                  />
                )}
              />
              
              <Controller
                name="location_details.location_city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="City"
                    placeholder="e.g. San Francisco"
                    error={errors.location_details?.location_city?.message}
                    required
                  />
                )}
              />
              
              <Controller
                name="location_details.location_pin_code"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="PIN Code"
                    placeholder="e.g. 94105"
                    error={errors.location_details?.location_pin_code?.message}
                    required
                  />
                )}
              />
            </div>
          </Card>

          {/* Compensation */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CurrencyIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Compensation</h2>
            </div>
            
            {/* Salary Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Controller
                name="salary_details.salary_currency"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Currency"
                    options={currencies.map(c => ({ value: c, label: c }))}
                    error={errors.salary_details?.salary_currency?.message}
                    required
                  />
                )}
              />
              
              <Controller
                name="salary_details.salary_from"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Minimum Salary"
                    placeholder="50000"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                    error={errors.salary_details?.salary_from?.message}
                  />
                )}
              />
              
              <Controller
                name="salary_details.salary_to"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Maximum Salary"
                    placeholder="80000"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                    error={errors.salary_details?.salary_to?.message}
                  />
                )}
              />
              
              <Controller
                name="salary_details.salary_period"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Period"
                    options={salaryPeriods.map(p => ({ value: p, label: p }))}
                    error={errors.salary_details?.salary_period?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Benefits & Compensation
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {compensationBenefits.map((benefit) => (
                  <EnhancedToggle
                    key={benefit}
                    label={benefit}
                    checked={benefit === 'Others' ? showCustomCompensation : watchedCompensation.includes(benefit)}
                    onChange={(checked) => handleCompensationToggle(benefit, checked)}
                    size="sm"
                  />
                ))}
              </div>
              
              {showCustomCompensation && (
                <div className="mt-4">
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
                <div className="flex flex-wrap gap-2 mt-4">
                  {watchedCompensation.map((benefit, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => handleCompensationRemove(benefit)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <CrossIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Resume Scoring */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Resume Scoring Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="resume_score_weightage_details.skills_weightage"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Skills Weight (%)"
                    placeholder="30"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.resume_score_weightage_details?.skills_weightage?.message}
                  />
                )}
              />
              
              <Controller
                name="resume_score_weightage_details.experience_weightage"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Experience Weight (%)"
                    placeholder="25"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.resume_score_weightage_details?.experience_weightage?.message}
                  />
                )}
              />
              
              <Controller
                name="resume_score_weightage_details.education_weightage"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Education Weight (%)"
                    placeholder="20"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.resume_score_weightage_details?.education_weightage?.message}
                  />
                )}
              />
              
              <Controller
                name="resume_score_weightage_details.projects_weightage"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Projects Weight (%)"
                    placeholder="15"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.resume_score_weightage_details?.projects_weightage?.message}
                  />
                )}
              />
              
              <Controller
                name="resume_score_weightage_details.certifications_weightage"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Certifications Weight (%)"
                    placeholder="10"
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.resume_score_weightage_details?.certifications_weightage?.message}
                  />
                )}
              />
            </div>
          </Card>

          {/* Job Status */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ClockIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Job Status</h2>
            </div>
            
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'active', label: 'Active' },
                    { value: 'paused', label: 'Paused' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                  error={errors.status?.message}
                  required
                />
              )}
            />
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              leftIcon={<SaveIcon className="h-5 w-5" />}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none px-8 py-3"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Job Description Text
            </label>
            <Textarea
              value={aiText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAIText(e.target.value)}
              placeholder="Paste the job description text here and AI will automatically extract job details..."
              rows={8}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setShowAIModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAIExtraction}
              disabled={!aiText.trim() || isAIProcessing}
              leftIcon={<AIIcon className="h-4 w-4" />}
            >
              {isAIProcessing ? (
                <>
                  <InlineLoader size="sm" variant="dots" />
                  Processing...
                </>
              ) : (
                'Extract Job Details'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
