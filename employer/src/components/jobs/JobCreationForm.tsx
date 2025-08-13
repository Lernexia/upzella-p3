


'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Textarea } from '@/components/ui-components/Textarea';
import { Select } from '@/components/ui-components/Select';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import Tooltip from '@/components/ui-components/Tooltip';
import { EnhancedToggle } from '@/components/ui-components/Toggle';
import {
  PlusIcon,
  DeleteIcon,
  SaveIcon,
  JobIcon,
  UserIcon,
  SettingsIcon,
  LocationIcon,
  SalaryIcon,
  AIIcon
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';
import { JobService } from '@/services/job.service';
import { useAuth } from '@/context/AuthContext';
import { InlineLoader } from '../ui-components/loader';
import { Form, FormField, FormGroup } from '../ui-components/form';
import {
  COMPENSATION_FORM_OPTIONS,
  EMPLOYMENT_TYPE_FORM_OPTIONS,
  WORK_TYPE_FORM_OPTIONS,
  SENIORITY_LEVEL_FORM_OPTIONS,
  WorkType,
  EmploymentType,
  SeniorityLevel,
  CreateJobSchema
} from '@/lib/schema/job.schema';



interface JobCreationFormProps {
  initialData?: any;
  onSuccess?: (jobId: string) => void;
  isUpdate?: boolean;
  jobId?: string;
}


export function JobCreationForm({ initialData, onSuccess, isUpdate, jobId }: JobCreationFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState<'draft' | 'published'>('draft');
  const [skillInput, setSkillInput] = useState('');
  const [customCompensationInput, setCustomCompensationInput] = useState('');
  const [showCustomCompensationInput, setShowCustomCompensationInput] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger
  } = useForm({
    resolver: zodResolver(CreateJobSchema), // Use Zod resolver
    mode: 'onChange',
    defaultValues: {
      role_name: '',
      title: '',
      description: '',
      skills_required: [],
      work_type: [],
      employment_type: [],
      seniority_level: [],
      location_details: {
        location_country: '',
        location_state: '',
        location_city: '',
        location_pin_code: ''
      },
      salary_details: {
        salary_currency: 'INR' as 'USD' | 'INR',
        salary_from: undefined,
        salary_to: undefined,
        salary_period: 'per annum'
      },
      experience_details: {
        experience_min: 0,
        experience_max: 5
      },
      compensation: [],
      resume_threshold: 60,
      resume_score_weightage_details: [
        { resume_section: 'Experience', resume_criteria: '', resume_weightage: 40, reason: undefined },
        { resume_section: 'Skills', resume_criteria: '', resume_weightage: 30, reason: undefined },
        { resume_section: 'Education', resume_criteria: '', resume_weightage: 20, reason: undefined },
        { resume_section: 'Projects', resume_criteria: '', resume_weightage: 10, reason: undefined }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resume_score_weightage_details'
  });

  if (isUpdate) {
    if (!jobId) {
      toast.error('Job ID is required for updating a job');
      return;
    }
  }

  const watchedValues = watch();

  // Update form when initial data changes (from AI extraction)
  useEffect(() => {
    if (initialData) {
      reset({
        role_name: initialData.role_name || '',
        title: initialData.title || '',
        description: initialData.description || '',
        skills_required: initialData.skills_required || [],
        work_type: initialData.work_type || [],
        employment_type: initialData.employment_type || [],
        seniority_level: initialData.seniority_level || [],
        location_details: initialData.location_details || {
          location_country: '',
          location_state: '',
          location_city: '',
          location_pin_code: ''
        },
        salary_details: initialData.salary_details || {
          salary_currency: 'INR' as 'USD' | 'INR',
          salary_from: undefined,
          salary_to: undefined,
          salary_period: 'per annum'
        },
        experience_details: initialData.experience_details || {
          experience_min: 0,
          experience_max: 5
        },
        compensation: initialData.compensation || [],
        resume_threshold: initialData.resume_threshold || 60,
        resume_score_weightage_details: initialData.resume_score_weightage_details?.map((item: any) => ({
          resume_section: item.resume_section,
          resume_criteria: item.resume_criteria || '',
          resume_weightage: item.resume_weightage,
          reason: item.reason || null
        })) || [
            { resume_section: 'Experience', resume_criteria: '', resume_weightage: 40, reason: '' },
            { resume_section: 'Skills', resume_criteria: '', resume_weightage: 30, reason: '' },
            { resume_section: 'Education', resume_criteria: '', resume_weightage: 20, reason: '' },
            { resume_section: 'Projects', resume_criteria: '', resume_weightage: 10, reason: '' }
          ]
      });
    }
  }, [initialData, reset]);

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = watchedValues.skills_required || [];
      // Split input by comma, trim each, filter out empty and already added skills
      const newSkills = skillInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s && !currentSkills.includes(s));
      if (newSkills.length > 0) {
        setValue('skills_required', [...currentSkills, ...newSkills]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = watchedValues.skills_required || [];
    setValue('skills_required', currentSkills.filter((_, i) => i !== index));
  };

  const addCustomCompensation = () => {
    if (customCompensationInput.trim()) {
      const currentCompensation = watchedValues.compensation || [];
      // Split input by comma, trim each, filter out empty and already added compensation
      const newCompensation = customCompensationInput
        .split(',')
        .map(c => c.trim())
        .filter(c => c && !currentCompensation.includes(c));
      if (newCompensation.length > 0) {
        setValue('compensation', [...currentCompensation, ...newCompensation]);
      }
      setCustomCompensationInput('');
      setShowCustomCompensationInput(false);
    }
  };

  const handleCompensationChange = (value: string) => {
    const selectedValues = value.split(',').filter(Boolean);

    // Check if "Others" is selected
    if (selectedValues.includes('Others')) {
      setShowCustomCompensationInput(true);
      // Remove "Others" from the actual compensation array
      const filteredValues = selectedValues.filter(v => v !== 'Others');
      setValue('compensation', filteredValues);
    } else {
      setShowCustomCompensationInput(false);
      setValue('compensation', selectedValues);
    }
  };

  const getTotalWeightage = () => {
    return (watchedValues.resume_score_weightage_details || []).reduce((sum, item) => sum + (Number(item.resume_weightage) || 0), 0);
  };

  const isFormValid = () => {
    const values = watchedValues;

    // Check required fields
    if (!values.role_name?.trim()) return false;
    if (!values.title?.trim()) return false;
    if (!values.description?.trim()) return false;

    // Check resume scoring details
    if (!values.resume_score_weightage_details?.length) return false;

    // Check each resume scoring detail has required fields
    for (const detail of values.resume_score_weightage_details) {
      if (!detail.resume_section?.trim()) return false;
      if (!detail.resume_criteria?.trim()) return false;
      if (!detail.resume_weightage || Number(detail.resume_weightage) <= 0) return false;
    }

    // Check total weightage equals 100%
    const totalWeightage = getTotalWeightage();
    if (totalWeightage !== 100) return false;

    return true;
  };

  const onSubmit = async (data: any) => {
    if (!user?.company_id) {
      toast.error(
        'Error',
        'Company information not found. Please complete your profile.'
      );
      return;
    }

    const myStatus = data.status ? data.status : submitAction;

    setIsSubmitting(true);
    try {
      const jobData = {
        ...data,
        company_id: user.company_id,
        // Include original job description text if it exists (from AI extraction)
        ...(initialData?.original_job_description_text && {
          original_job_description_text: initialData.original_job_description_text
        })
      };

      let result;
      let successTitle = '';
      let successMessage = '';

      if (isUpdate) {
        result = await JobService.updateJob(jobId as string, jobData);
        successTitle = myStatus === 'draft' ? 'Draft Saved' : 'Job Updated Successfully';
        successMessage = myStatus === 'draft'
        ? 'Your job has been saved as a draft. You can publish it later from your dashboard.'
        : 'Your job posting has been updated and is now live!';
        if (onSuccess) onSuccess(jobId as string);
      } else {
        result = await JobService.createJob(jobData);
        successTitle = myStatus === 'draft' ? 'Draft Saved' : 'Job Created Successfully';
        successMessage = myStatus === 'draft'
        ? 'Your job has been saved as a draft. You can publish it later from your dashboard.'
        : 'Your job posting has been created and is now live!';
        if (onSuccess) onSuccess(result.job_id);
      }

      toast.success(successTitle, successMessage);

    } catch (error: any) {
      console.error('Error creating job:', error);
      toast.error(
        'Error Creating Job',
        error.message || 'Failed to create job. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setSubmitAction('draft');

    // Skip form validation for drafts, just check basic fields manually
    const values = watchedValues;
    if (!values.role_name?.trim() || !values.title?.trim() || !values.description?.trim()) {
      toast.error(
        'Missing Required Fields',
        'Please fill in the basic required fields (Role Name, Title, Description) to save as draft.'
      );
      return;
    }

    // Call onSubmit directly with current form data
    await onSubmit({ ...values, status: 'draft' });
  };

  const handlePublish = async () => {
    setSubmitAction('published');
    const values = watchedValues;

    await onSubmit({ ...values, status: 'published' });
  };

  const totalWeightage = getTotalWeightage();
  const formValid = isFormValid();

  // Enhanced compensation options with "Others"
  const enhancedCompensationOptions = [
    ...COMPENSATION_FORM_OPTIONS,
    { value: 'Others', label: 'Others (Custom)' }
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Job Information */}
      <Card className="border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <JobIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-blue-700">Basic Job Information</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">Start with the fundamental details - role name, job title, and comprehensive description that will attract the right candidates</p>

          <FormGroup >
            <FormGroup cols={2}>
              <FormField>
                <Input
                  {...register('role_name')}
                  label="Role Name"
                  placeholder="e.g. Senior Software Engineer"
                  error={errors.role_name?.message}
                  required
                />
              </FormField>
              <FormField>
                <Input
                  {...register('title')}
                  label="Job Title"
                  placeholder="e.g. Senior Software Engineer - Full Stack Development"
                  error={errors.title?.message}
                  required
                />
              </FormField>
            </FormGroup>
            <FormField>
              <Textarea
                {...register('description')}
                label="Job Description"
                placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                rows={6}
                error={errors.description?.message}
                required
              />
            </FormField>
          </FormGroup>

        </div>
      </Card>

      {/* Skills & Requirements */}
      <Card className="border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-green-700">Skills & Work Requirements</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">Define essential skills, work arrangements, employment types, and experience levels to target the right talent pool</p>

          <div className="space-y-6">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Required Skills <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Add technical skills, technologies, or qualifications that are essential for this role
              </p>
              <div className="flex space-x-2 mb-3">
                <FormField className='w-full flex items-center h-auto justify-between gap-2'>
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js - Press Enter to add (comma separated)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1"
                  />
                </FormField>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(watchedValues.skills_required || []).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="pr-1 cursor-pointer"
                    onClick={() => removeSkill(index)}
                  >
                    {skill}
                    <span className='text-red-600 px-1'>x</span>
                  </Badge>
                ))}
              </div>
              {errors.skills_required && (
                <p className="text-sm text-red-600 mt-1">{errors.skills_required.message}</p>
              )}
            </div>

            <FormGroup cols={2}>
              {/* Work Types */}
              <FormField>
                <EnhancedToggle
                  label="Work Type"
                  options={WORK_TYPE_FORM_OPTIONS}
                  value=""
                  multiple={true}
                  className='w-fit'
                  values={(watchedValues.work_type || []).map(String)}
                  onChange={(value) => setValue('work_type', value.split(',').filter(Boolean) as WorkType[])}
                  required={true}
                  variant="default"
                />
                {errors.work_type && (
                  <p className="text-sm text-red-600 mt-1">{errors.work_type.message}</p>
                )}
              </FormField>

              {/* Employment Types */}
              <FormField>
                <EnhancedToggle
                  label="Employment Type"
                  options={EMPLOYMENT_TYPE_FORM_OPTIONS}
                  value=""
                  multiple={true}
                  values={(watchedValues.employment_type || []).map(String)}
                  onChange={(value) => setValue('employment_type', value.split(',').filter(Boolean) as EmploymentType[])}
                  required={true}
                  variant="default"
                />
                {errors.employment_type && (
                  <p className="text-sm text-red-600 mt-1">{errors.employment_type.message}</p>
                )}
              </FormField>
            </FormGroup>


            {/* Seniority Level */}
            <FormGroup cols={2}>
              <FormField>
                <EnhancedToggle
                  label="Seniority Level"
                  options={SENIORITY_LEVEL_FORM_OPTIONS}
                  value=""
                  multiple={true}
                  values={(watchedValues.seniority_level || []).map(String)}
                  onChange={(value) => setValue('seniority_level', value.split(',').filter(Boolean) as SeniorityLevel[])}
                  required={true}
                  variant="default"
                  className='w-fit'
                />
                {errors.seniority_level && (
                  <p className="text-sm text-red-600 mt-1">{errors.seniority_level.message}</p>
                )}
              </FormField>


              {/* Experience Details */}
              <FormField>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience Requirements <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Define the experience range in years to filter candidates appropriately
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField>
                    <Input
                      {...register('experience_details.experience_min')}
                      type="number"
                      label="Minimum Experience (years)"
                      placeholder="0"
                      error={errors.experience_details?.experience_min?.message}
                      required
                    />
                  </FormField>
                  <FormField>
                    <Input
                      {...register('experience_details.experience_max')}
                      type="number"
                      label="Maximum Experience (years)"
                      placeholder="5"
                      error={errors.experience_details?.experience_max?.message}
                      required
                    />
                  </FormField>
                </div>
              </FormField>
            </FormGroup>

          </div>
        </div>
      </Card>

      {/* Location & Compensation Details */}
      <Card className="border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <LocationIcon className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-purple-700">Location & Compensation Package</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">Specify job location, salary range, experience requirements, and additional benefits to complete your job offering</p>

          <div className="space-y-6">
            {/* Location Details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location Details
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Specify where this job is located - leave blank if location is flexible or fully remote
              </p>
              <FormGroup cols={4}>
                <FormField>
                  <Input
                    {...register('location_details.location_country')}
                    label="Country"
                    placeholder="e.g. India"
                    error={errors.location_details?.location_country?.message}
                  />
                </FormField>
                <FormField>
                  <Input
                    {...register('location_details.location_state')}
                    label="State/Province"
                    placeholder="e.g. Karnataka"
                    error={errors.location_details?.location_state?.message}
                  />
                </FormField>
                <FormField>
                  <Input
                    {...register('location_details.location_city')}
                    label="City"
                    placeholder="e.g. Bangalore"
                    error={errors.location_details?.location_city?.message}
                  />
                </FormField>
                <FormField>
                  <Input
                    {...register('location_details.location_pin_code')}
                    label="Pin/Postal Code"
                    placeholder="e.g. 560001"
                    error={errors.location_details?.location_pin_code?.message}
                  />
                </FormField>
              </FormGroup>
            </div>

            {/* Salary Details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Salary Details
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Set competitive salary range and payment period to attract quality candidates
              </p>
              <FormGroup cols={4}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Currency
                  </label>
                  <Controller
                    name="salary_details.salary_currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={[
                          { value: 'INR', label: 'INR (₹)' },
                          { value: 'USD', label: 'USD ($)' }
                        ]}
                        placeholder="Select currency"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.salary_details?.salary_currency?.message}
                        errorMessage={errors.salary_details?.salary_currency?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Salary From
                  </label>
                  <Controller
                    name="salary_details.salary_from"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="e.g. 800000"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        error={errors.salary_details?.salary_from?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Salary To
                  </label>
                  <Controller
                    name="salary_details.salary_to"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="e.g. 1200000"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        error={errors.salary_details?.salary_to?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Salary Period
                  </label>
                  <Controller
                    name="salary_details.salary_period"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={[
                          { value: 'per annum', label: 'Per Annum' },
                          { value: 'per month', label: 'Per Month' },
                          { value: 'per hour', label: 'Per Hour' }
                        ]}
                        placeholder="Select salary period"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.salary_details?.salary_period?.message}
                        errorMessage={errors.salary_details?.salary_period?.message}
                      />
                    )}
                  />
                </div>
              </FormGroup>
            </div>

            {/* Compensation */}
            <div>
              <div className="mb-3">
                <p className="text-xs text-slate-500">
                  Select additional benefits and perks to make your job offer more attractive
                </p>
              </div>
              <EnhancedToggle
                label="Compensation & Benefits"
                options={enhancedCompensationOptions}
                value=""
                multiple={true}
                values={(watchedValues.compensation || []).map(String)}
                onChange={handleCompensationChange}
                required={false}
                variant="default"
              />

              {/* Custom Compensation Input */}
              {showCustomCompensationInput && (
                <div className="mt-4">
                  <FormField>
                    <Input
                      value={customCompensationInput}
                      onChange={(e) => setCustomCompensationInput(e.target.value)}
                      placeholder="Enter custom benefits (comma separated): e.g. Childcare Support, Remote Work Stipend"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCompensation())}
                      label="Custom Compensation & Benefits"
                    />
                  </FormField>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={addCustomCompensation}
                      disabled={!customCompensationInput.trim()}
                    >
                      Add Benefits
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCustomCompensationInput(false);
                        setCustomCompensationInput('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Show all selected compensation as badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                {(watchedValues.compensation || []).map((item, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="pr-1 cursor-pointer"
                    onClick={() => {
                      // Remove compensation item on click
                      const currentComp = Array.isArray(watchedValues.compensation) ? watchedValues.compensation : [];
                      setValue('compensation', currentComp.filter((_, i) => i !== idx));
                    }}
                  >
                    {item}
                    <span className='text-red-600 px-1'>x</span>
                  </Badge>
                ))}
              </div>
              {errors.compensation && (
                <p className="text-sm text-red-600 mt-1">{errors.compensation.message}</p>
              )}
            </div>


          </div>
        </div>
      </Card>

      {/* Resume Scoring Configuration */}
      <Card className="border-l-4 border-l-orange-500">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-orange-700">AI Resume Scoring</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">Set up intelligent resume evaluation criteria and weightings to automatically score and rank candidates based on your specific requirements</p>

          <div className="flex items-center justify-between mb-6">

            {/* Resume Threshold */}
            <div>
              <FormField className='max-w-[160px]'>
                <Input
                  {...register('resume_threshold')}
                  type="number"
                  label="Resume Threshold (%)"
                  placeholder="60"
                  min="50"
                  max="100"
                  error={errors.resume_threshold?.message}
                  required
                />
              </FormField>
              <p className="text-sm text-slate-500 mt-1">
                Minimum score percentage required for a resume to pass initial screening
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${totalWeightage === 100
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
              }`}>
              Total: {totalWeightage}%
            </div>
          </div>


          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-4 ">

                <FormField
                  className='min-w-[150px]'
                >
                  <Input
                    label='Resume Section'
                    {...register(`resume_score_weightage_details.${index}.resume_section`)}
                    placeholder="e.g. Education, Experience, Skills, etc."
                  />
                </FormField>


                <FormField className='w-full'>
                  <Input
                    {...register(`resume_score_weightage_details.${index}.resume_criteria`)}
                    placeholder="e.g. Bachelor's degree in relevant field"
                    label='Criteria Description'
                  />
                </FormField>


                {/* AI-Generated Reason Display */}
                {watchedValues.resume_score_weightage_details?.[index]?.reason && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      AI Reasoning
                    </label>
                    <Tooltip content={watchedValues.resume_score_weightage_details[index].reason}>
                      <Badge
                        variant="secondary"
                        className="cursor-help inline-flex items-center space-x-1"
                      >
                        <AIIcon className="h-3 w-3" />
                        <span>AI Generated</span>
                      </Badge>
                    </Tooltip>
                  </div>
                )}
                <div className="min-w-[100px]">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Weight (%)
                  </label>
                  <FormField>
                    <Input
                      {...register(`resume_score_weightage_details.${index}.resume_weightage`)}
                      type="number"
                      min="1"
                      max="100"
                      placeholder="0"
                    />
                  </FormField>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-800 hover:border-red-800"
                  disabled={fields.length === 1}
                >
                  <DeleteIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ resume_section: 'Skills' as const, resume_criteria: '', resume_weightage: 0, reason: undefined })}
              className="w-full"
              leftIcon={<PlusIcon className="w-4 h-4 mr-2" />}
            >

              Add Scoring Criterion
            </Button>
          </div>

          {errors.resume_score_weightage_details && (
            <p className="text-sm text-red-600 mt-3">{errors.resume_score_weightage_details.message}</p>
          )}
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSubmitting}
          leftIcon={
            isSubmitting && submitAction === 'draft' ? (
              <>
                <InlineLoader size="sm" className="mr-2" />
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4 mr-2" />
              </>
            )
          }
        >
          {
            isSubmitting && submitAction === 'draft' ? (<></>) : (
              <>
                Save as Draft</>
            )
          }
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          disabled={isSubmitting || !formValid}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          leftIcon={
            isSubmitting && submitAction === 'published' ? (
              <>
                <InlineLoader text={`${isUpdate ? 'Updating Job...' : 'Publishing Job...'}`} size="sm" className="mr-2" />
              </>
            ) : (
              <>
                <SaveIcon className="w-4 h-4 mr-2" />
              </>
            )
          }
        >

          {isSubmitting && submitAction === 'published' ? (
            <>

            </>
          ) : (
            <>
              {isUpdate ? 'Update Job' : 'Create Job'}
            </>
          )}

        </Button>
      </div>
    </Form>
  );
}
