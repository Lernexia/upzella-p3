'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Toggle } from './Toggle';
import { Card } from './Card';
import { CrossIcon, CheckIcon, MessageIcon, EmailIcon } from '@/components/svg-icons';

interface NotificationSettings {
  email: {
    hiringStatusUpdates: boolean;
    candidateApplications: boolean;
    interviewReminders: boolean;
    systemUpdates: boolean;
  };
  whatsapp: {
    hiringStatusUpdates: boolean;
    candidateApplications: boolean;
    interviewReminders: boolean;
    systemUpdates: boolean;
  };
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [localSettings, setLocalSettings] = useState<NotificationSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleToggle = (channel: 'email' | 'whatsapp', setting: keyof NotificationSettings['email']) => {
    setLocalSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: !prev[channel][setting]
      }
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const notificationTypes = [
    {
      key: 'hiringStatusUpdates' as const,
      title: 'Hiring status updates',
      description: 'Notify candidate when hiring status changes'
    },
    {
      key: 'candidateApplications' as const,
      title: 'New candidate applications',
      description: 'Get notified when new candidates apply'
    },
    {
      key: 'interviewReminders' as const,
      title: 'Interview reminders',
      description: 'Reminders for upcoming interviews'
    },
    {
      key: 'systemUpdates' as const,
      title: 'System updates',
      description: 'Important system notifications and updates'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Notifications"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between text-sm font-medium text-slate-600">
            <span></span>
            <div className="flex space-x-8">
              <div className="flex items-center space-x-1">
                <EmailIcon className="w-4 h-4" />
                <span>EMAIL</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageIcon className="w-4 h-4" />
                <span>WHATSAPP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          {notificationTypes.map((notificationType) => (
            <Card key={notificationType.key} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 font-heading">
                    {notificationType.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-body mt-1">
                    {notificationType.description}
                  </p>
                </div>
                <div className="flex items-center space-x-8 ml-6">
                  {/* Email Toggle */}
                  <div className="flex items-center justify-center w-12">
                    <Toggle
                      checked={localSettings.email[notificationType.key]}
                      onChange={() => handleToggle('email', notificationType.key)}
                      size="sm"
                    />
                  </div>
                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-center w-12">
                    <Toggle
                      checked={localSettings.whatsapp[notificationType.key]}
                      onChange={() => handleToggle('whatsapp', notificationType.key)}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            <CrossIcon className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1 sm:flex-none"
          >
            <CheckIcon className="w-4 h-4 mr-1" />
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
};
