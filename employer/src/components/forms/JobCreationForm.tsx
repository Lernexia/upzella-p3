'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui-components/Button';
import { Input } from '@/components/ui-components/Input';
import { Textarea } from '@/components/ui-components/Textarea';
import { Select } from '@/components/ui-components/Select';
import { Checkbox } from '@/components/ui-components/Checkbox';
import { Card } from '@/components/ui-components/Card';
import { Badge } from '@/components/ui-components/Badge';
import { 
  PlusIcon, 
  DeleteIcon, 
  SaveIcon,
  JobIcon,
  UserIcon,
  SettingsIcon 
} from '@/components/svg-icons';
import { useToast } from '@/hooks/useToast';
import { JobService } from '@/services/job.service';
import { useAuth } from '@/context/AuthContext';
import { InlineLoader } from '../ui-components/loader';

// Validation schema
const jobCreationSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').max(200, 'Title must be less than 200 characters').required('Job title is required'),
  description: yup.string().min(50, 'Description must be at least 50 characters').max(5000, 'Description must be less than 5000 characters').required('Job description is required'),
  skills_required: yup.array().of(yup.string().required()).min(1, 'At least one skill is required').required('Skills are required'),
  work_type: yup.array().of(yup.string().oneOf(['Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site'])).min(1, 'At least one work type is required').required('Work type is required'),
  employment_type: yup.string().oneOf(['Permanent', 'Contract', 'Internship', 'Freelance']).required('Employment type is required'),
  experience_min: yup.number().min(0, 'Minimum experience cannot be negative').max(50, 'Maximum experience is 50 years').required('Minimum experience is required'),
  experience_max: yup.number().min(0, 'Maximum experience cannot be negative').max(50, 'Maximum experience is 50 years').required('Maximum experience is required').test('greater-than-min', 'Maximum experience must be greater than minimum', function(value) {
    return value >= this.parent.experience_min;
  }),
  resume_threshold: yup.number().min(1, 'Resume threshold must be at least 1%').max(100, 'Resume threshold cannot exceed 100%').required('Resume threshold is required'),
  resume_scoring: yup.array().of(
    yup.object({
      section_name: yup.string().oneOf(['Education', 'Experience', 'Projects', 'Certifications', 'Skills', 'Achievements']).required('Section name is required'),
      criteria_description: yup.string().max(500, 'Criteria description must be less than 500 characters'),
      weightage: yup.number().min(1, 'Weightage must be at least 1%').max(100, 'Weightage cannot exceed 100%').required('Weightage is required')
    })
  ).min(1, 'At least one scoring criterion is required').test('total-weight', 'Resume scoring weightage must sum to exactly 100%', function(value) {
    if (!value) return false;
    const total = value.reduce((sum, item) => sum + (item.weightage || 0), 0);
    return total === 100;
  }).required('Resume scoring is required')
});

interface JobCreationFormProps {
  initialData?: any;
  onSuccess?: (jobId: string) => void;
}

const workTypeOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'On-site', label: 'On-site' }
];

const employmentTypeOptions = [
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Freelance', label: 'Freelance' }
];

const sectionOptions = [
  { value: 'Education', label: 'Education' },
  { value: 'Experience', label: 'Experience' },
  { value: 'Projects', label: 'Projects' },
  { value: 'Certifications', label: 'Certifications' },
  { value: 'Skills', label: 'Skills' },
  { value: 'Achievements', label: 'Achievements' }
];

export function JobCreationForm({ initialData, onSuccess }: JobCreationFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(jobCreationSchema),
    defaultValues: {
      title: '',
      description: '',
      skills_required: [],
      work_type: [],
      employment_type: 'Permanent',
      experience_min: 0,
      experience_max: 5,
      resume_threshold: 60,
      resume_scoring: [
        { section_name: 'Experience', criteria_description: '', weightage: 40 },
        { section_name: 'Skills', criteria_description: '', weightage: 30 },
        { section_name: 'Education', criteria_description: '', weightage: 20 },
        { section_name: 'Projects', criteria_description: '', weightage: 10 }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'resume_scoring'
  });

  const watchedValues = watch();

  // Update form when initial data changes (from AI extraction)
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.job_title || '',
        description: initialData.job_description || '',
        skills_required: initialData.skills_required || [],
        work_type: initialData.work_type || [],
        employment_type: initialData.employment_type || 'Permanent',
        experience_min: initialData.experience_range?.min || 0,
        experience_max: initialData.experience_range?.max || 5,
        resume_threshold: initialData.resume_threshold || 60,
        resume_scoring: initialData.resume_scoring?.map((item: any) => ({
          section_name: item.section,
          criteria_description: item.criteria || '',
          weightage: item.weightage
        })) || [
          { section_name: 'Experience', criteria_description: '', weightage: 40 },
          { section_name: 'Skills', criteria_description: '', weightage: 30 },
          { section_name: 'Education', criteria_description: '', weightage: 20 },
          { section_name: 'Projects', criteria_description: '', weightage: 10 }
        ]
      });
    }
  }, [initialData, reset]);

  const addSkill = () => {
    if (skillInput.trim() && !watchedValues.skills_required?.includes(skillInput.trim())) {
      const currentSkills = watchedValues.skills_required || [];
      setValue('skills_required', [...currentSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = watchedValues.skills_required || [];
    setValue('skills_required', currentSkills.filter((_, i) => i !== index));
  };

  const handleWorkTypeChange = (value: string, checked: boolean) => {
    const currentTypes = watchedValues.work_type || [];
    if (checked) {
      setValue('work_type', [...currentTypes, value]);
    } else {
      setValue('work_type', currentTypes.filter(type => type !== value));
    }
  };

  const getTotalWeightage = () => {
    return (watchedValues.resume_scoring || []).reduce((sum, item) => sum + (item.weightage || 0), 0);
  };

  const onSubmit = async (data: any) => {
    if (!user?.company_id) {
        toast.error(
            'Error',
            'Company information not found. Please complete your profile.'
        );
  
      return;
    }

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

      const result = await JobService.createJob(jobData);

      toast.success(
          'Job Created Successfully',
          'Your job posting has been created and is now live.'
      );

      if (onSuccess) {
        onSuccess(result.job_id);
      }
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

  const totalWeightage = getTotalWeightage();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Job Information */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <JobIcon className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Input
              {...register('title')}
              label="Job Title"
              placeholder="e.g. Senior Frontend Developer"
              error={errors.title?.message}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <Select
              {...register('employment_type')}
              options={employmentTypeOptions}
              placeholder="Select employment type"
              error={errors.employment_type?.message}
            />
          </div>
        </div>

        <div className="mt-6">
          <Textarea
            {...register('description')}
            label="Job Description"
            placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
            rows={6}
            error={errors.description?.message}
            required
          />
        </div>
      </div>

      {/* Skills & Requirements */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Skills & Requirements</h2>
        </div>

        <div className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 mb-3">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. React, TypeScript"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1"
              />
              <Button type="button" onClick={addSkill} variant="outline">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {(watchedValues.skills_required || []).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pr-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            {errors.skills_required && (
              <p className="text-sm text-red-600 mt-1">{errors.skills_required.message}</p>
            )}
          </div>

          {/* Work Types */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Work Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {workTypeOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={(watchedValues.work_type || []).includes(option.value)}
                  onChange={(checked) => handleWorkTypeChange(option.value, checked)}
                />
              ))}
            </div>
            {errors.work_type && (
              <p className="text-sm text-red-600 mt-1">{errors.work_type.message}</p>
            )}
          </div>

          {/* Experience Range */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Input
                {...register('experience_min')}
                type="number"
                label="Minimum Experience (years)"
                placeholder="0"
                error={errors.experience_min?.message}
                required
              />
            </div>
            <div>
              <Input
                {...register('experience_max')}
                type="number"
                label="Maximum Experience (years)"
                placeholder="5"
                error={errors.experience_max?.message}
                required
              />
            </div>
          </div>

          {/* Resume Threshold */}
          <div>
            <Input
              {...register('resume_threshold')}
              type="number"
              label="Resume Threshold (%)"
              placeholder="60"
              min="1"
              max="100"
              error={errors.resume_threshold?.message}
              help="Minimum score percentage required for a resume to pass initial screening"
              required
            />
          </div>
        </div>
      </div>

      {/* Resume Scoring */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Resume Scoring</h2>
              <p className="text-sm text-slate-600">
                Configure how resumes will be evaluated. Total must equal 100%.
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            totalWeightage === 100 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            Total: {totalWeightage}%
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Section
                  </label>
                  <Select
                    {...register(`resume_scoring.${index}.section_name`)}
                    options={sectionOptions}
                    placeholder="Select section"
                  />
                </div>
                <div className="flex-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Criteria Description
                  </label>
                  <Input
                    {...register(`resume_scoring.${index}.criteria_description`)}
                    placeholder="e.g. Bachelor's degree in relevant field"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Weight (%)
                  </label>
                  <Input
                    {...register(`resume_scoring.${index}.weightage`)}
                    type="number"
                    min="1"
                    max="100"
                    placeholder="0"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
              onClick={() => append({ section_name: '', criteria_description: '', weightage: 0 })}
              className="w-full"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Scoring Criterion
            </Button>
          </div>

          {errors.resume_scoring && (
            <p className="text-sm text-red-600 mt-3">{errors.resume_scoring.message}</p>
          )}
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || totalWeightage !== 100}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
        >
          {isSubmitting ? (
            <>
              <InlineLoader text='Creating Job...' size="sm" className="mr-2" />
            </>
          ) : (
            <>
              <SaveIcon className="w-4 h-4 mr-2" />
              Create Job
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
