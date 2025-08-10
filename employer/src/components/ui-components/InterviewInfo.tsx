'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { 
  CalendarIcon, 
  ViewIcon, 
  UserIcon, 
  CompanyIcon,
  LocationIcon,
  ShareIcon,
  CheckIcon,
  AIIcon
} from '@/components/svg-icons';

interface InterviewInfoProps {
  interview: {
    id: string;
    interview_name: string;
    role_name: string;
    duration: number;
    language: string;
    interview_mode: string;
    status: string;
    location?: any;
    job_description: string;
    skills_required?: any;
    experience_level?: string;
    created_at: string;
    created_by?: string;
  };
  formUrl?: string;
  onTryInterview: () => void;
  onInviteCandidate: () => void;
  onCopyLink: () => void;
}

export const InterviewInfo: React.FC<InterviewInfoProps> = ({
  interview,
  formUrl,
  onTryInterview,
  onInviteCandidate,
  onCopyLink
}) => {
  const getStatusBadge = () => {
    switch (interview.status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
      case 'paused':
        return <Badge variant="error">Paused</Badge>;
      default:
        return <Badge variant="secondary">{interview.status || 'Unknown'}</Badge>;
    }
  };

  const getInterviewModeIcon = () => {
    switch (interview.interview_mode) {
      case 'flextalk':
        return <UserIcon className="w-4 h-4" />;
      case 'codepro':
        return <AIIcon className="w-4 h-4" />;
      default:
        return <ViewIcon className="w-4 h-4" />;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const formatSkills = (skills: any) => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'object') return Object.values(skills);
    return [];
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {interview.interview_name}
              </h2>
              {getStatusBadge()}
            </div>
            <div className="flex items-center space-x-2 text-slate-600 mb-3">
              <CompanyIcon className="w-4 h-4" />
              <span className="font-semibold text-purple-700">{interview.role_name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onTryInterview}
              className="flex items-center space-x-1"
            >
              <ViewIcon className="w-4 h-4" />
              <span>Try Interview</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onInviteCandidate}
              className="flex items-center space-x-1"
            >
              <UserIcon className="w-4 h-4" />
              <span>Invite Candidate</span>
            </Button>
          </div>
        </div>

        {/* Interview Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-xs text-slate-500 font-body">Duration</span>
              <p className="text-sm font-semibold text-slate-900">
                {formatDuration(interview.duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {getInterviewModeIcon()}
            <div>
              <span className="text-xs text-slate-500 font-body">Mode</span>
              <p className="text-sm font-semibold text-slate-900 capitalize">
                {interview.interview_mode}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <LocationIcon className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-xs text-slate-500 font-body">Language</span>
              <p className="text-sm font-semibold text-slate-900">
                {interview.language || 'English'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <UserIcon className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-xs text-slate-500 font-body">Level</span>
              <p className="text-sm font-semibold text-slate-900 capitalize">
                {interview.experience_level || 'Any'}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        {interview.skills_required && formatSkills(interview.skills_required).length > 0 && (
          <div className="mb-4">
            <span className="text-xs text-slate-500 font-body mb-2 block">Required Skills</span>
            <div className="flex flex-wrap gap-2">
              {formatSkills(interview.skills_required).slice(0, 6).map((skill: string, index: number) => (
                <Badge key={index} variant="secondary" size="xs">
                  {skill}
                </Badge>
              ))}
              {formatSkills(interview.skills_required).length > 6 && (
                <Badge variant="secondary" size="xs">
                  +{formatSkills(interview.skills_required).length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Copy Link Section */}
        {formUrl && (
          <div className="bg-white rounded-lg border border-purple-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-3">
                <span className="text-xs text-slate-500 font-body">Interview Link</span>
                <p className="text-sm text-slate-600 font-mono truncate">
                  {formUrl}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onCopyLink}
                className="flex items-center space-x-1 flex-shrink-0"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Copy Link</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
