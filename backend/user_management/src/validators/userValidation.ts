import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).trim(),
  phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-()]{7,15}$/).allow('', null),
  job_role: Joi.string().min(2).max(100).trim(),
  avatar_url: Joi.string().uri().allow('', null)
});

export const notificationPreferencesSchema = Joi.object({
  email_notifications: Joi.boolean(),
  sms_notifications: Joi.boolean(),
  push_notifications: Joi.boolean(),
  marketing_emails: Joi.boolean(),
  job_alerts: Joi.boolean(),
  weekly_summary: Joi.boolean()
});

export const privacySettingsSchema = Joi.object({
  profile_visibility: Joi.string().valid('public', 'private', 'company').required(),
  show_email: Joi.boolean(),
  show_phone: Joi.boolean(),
  allow_contact: Joi.boolean()
});

export const deactivateAccountSchema = Joi.object({
  reason: Joi.string().valid(
    'not_using',
    'found_alternative',
    'privacy_concerns',
    'temporary_break',
    'other'
  ).required(),
  feedback: Joi.string().max(1000).allow('', null)
});
