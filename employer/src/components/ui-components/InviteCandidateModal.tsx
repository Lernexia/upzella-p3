'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Card } from './Card';
import { Badge } from './Badge';
import { 
  SendIcon, 
  CrossIcon, 
  EmailIcon, 
  UserIcon,
  MessageIcon,
  CheckIcon,
  PlusIcon
} from '@/components/svg-icons';

interface InviteCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewTitle: string;
  interviewUrl: string;
  onSendInvite: (inviteData: InviteData) => Promise<void>;
}

interface InviteData {
  emails: string[];
  subject: string;
  message: string;
  sendWhatsApp: boolean;
  phoneNumbers?: string[];
}

export const InviteCandidateModal: React.FC<InviteCandidateModalProps> = ({
  isOpen,
  onClose,
  interviewTitle,
  interviewUrl,
  onSendInvite
}) => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  const [subject, setSubject] = useState(`Interview Invitation: ${interviewTitle}`);
  const [message, setMessage] = useState(
    `You're invited to participate in an interview for ${interviewTitle}.\n\nPlease click the link below to start your interview:\n${interviewUrl}\n\nBest regards`
  );
  const [sendWhatsApp, setSendWhatsApp] = useState(false);
  const [loading, setLoading] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const addPhoneField = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const removeEmailField = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const removePhoneField = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...phoneNumbers];
    newPhones[index] = value;
    setPhoneNumbers(newPhones);
  };

  const validateForm = () => {
    const validEmails = emails.filter(email => email.trim() && /\S+@\S+\.\S+/.test(email));
    const validPhones = sendWhatsApp ? phoneNumbers.filter(phone => phone.trim()) : [];
    
    return validEmails.length > 0 || (sendWhatsApp && validPhones.length > 0);
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const validEmails = emails.filter(email => email.trim() && /\S+@\S+\.\S+/.test(email));
      const validPhones = sendWhatsApp ? phoneNumbers.filter(phone => phone.trim()) : [];

      await onSendInvite({
        emails: validEmails,
        subject,
        message,
        sendWhatsApp,
        phoneNumbers: validPhones
      });

      onClose();
    } catch (error) {
      console.error('Error sending invite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Candidates"
      size="lg"
    >
      <div className="space-y-6">
        {/* Email Section */}
        <Card className="p-4 bg-slate-50">
          <div className="flex items-center space-x-2 mb-3">
            <EmailIcon className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-slate-900 font-heading">
              Email Invitations
            </h3>
          </div>
          
          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="email"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  className="flex-1"
                />
                {emails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEmailField(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <CrossIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={addEmailField}
              className="flex items-center space-x-1"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Email</span>
            </Button>
          </div>
        </Card>

        {/* WhatsApp Section */}
        <Card className="p-4 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MessageIcon className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-slate-900 font-heading">
                WhatsApp Invitations
              </h3>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendWhatsApp}
                onChange={(e) => setSendWhatsApp(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-slate-600">Enable</span>
            </label>
          </div>
          
          {sendWhatsApp && (
            <div className="space-y-3">
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="tel"
                    placeholder="+1234567890"
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                    className="flex-1"
                  />
                  {phoneNumbers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoneField(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <CrossIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={addPhoneField}
                className="flex items-center space-x-1"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Phone</span>
              </Button>
            </div>
          )}
        </Card>

        {/* Message Customization */}
        <div className="space-y-3">
          <Input
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Interview invitation subject"
          />
          
          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Write your invitation message..."
          />
        </div>

        {/* Preview */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide">
            Preview
          </div>
          <div className="text-sm text-slate-900 font-body whitespace-pre-wrap">
            {message}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            <CrossIcon className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!validateForm() || loading}
            loading={loading}
          >
            <SendIcon className="w-4 h-4 mr-1" />
            Send Invitations
          </Button>
        </div>
      </div>
    </Modal>
  );
};
