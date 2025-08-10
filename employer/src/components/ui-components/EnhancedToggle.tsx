'use client';

import React, { useState } from 'react';

interface EnhancedToggleProps {
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
  onChange?: (checked: boolean, value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const EnhancedToggle: React.FC<EnhancedToggleProps> = ({
  id,
  name,
  value,
  checked,
  defaultChecked = false,
  disabled = false,
  readOnly = false,
  required = false,
  label,
  description,
  size = 'md',
  variant = 'default',
  className = '',
  onChange,
  onFocus,
  onBlur,
}) => {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked, value);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: isChecked ? 'translate-x-4' : 'translate-x-0.5',
      text: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      translate: isChecked ? 'translate-x-5' : 'translate-x-0.5',
      text: 'text-base',
      gap: 'gap-3'
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      translate: isChecked ? 'translate-x-6' : 'translate-x-0.5',
      text: 'text-lg',
      gap: 'gap-3'
    }
  };

  // Variant configurations
  const variantConfig = {
    default: {
      trackOn: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      trackOff: 'bg-slate-200',
      thumbShadow: 'shadow-lg',
      ring: 'focus:ring-purple-500/30'
    },
    success: {
      trackOn: 'bg-gradient-to-r from-green-500 to-emerald-600',
      trackOff: 'bg-slate-200',
      thumbShadow: 'shadow-lg',
      ring: 'focus:ring-green-500/30'
    },
    warning: {
      trackOn: 'bg-gradient-to-r from-orange-500 to-amber-600',
      trackOff: 'bg-slate-200',
      thumbShadow: 'shadow-lg',
      ring: 'focus:ring-orange-500/30'
    },
    error: {
      trackOn: 'bg-gradient-to-r from-red-500 to-rose-600',
      trackOff: 'bg-slate-200',
      thumbShadow: 'shadow-lg',
      ring: 'focus:ring-red-500/30'
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const uniqueId = id || `enhanced-toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-start ${currentSize.gap} ${className}`}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={uniqueId}
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="sr-only"
        />
        <label
          htmlFor={uniqueId}
          className={`
            ${currentSize.track}
            ${isChecked ? currentVariant.trackOn : currentVariant.trackOff}
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${readOnly ? 'cursor-default' : ''}
            relative inline-flex items-center rounded-full
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 ${currentVariant.ring}
            hover:scale-105 active:scale-95
          `}
          style={{ borderRadius: 'var(--border-radius-upzella)' }}
        >
          <span
            className={`
              ${currentSize.thumb}
              ${currentSize.translate}
              ${currentVariant.thumbShadow}
              bg-white rounded-full
              transition-all duration-300 ease-in-out
              flex items-center justify-center
              ${isChecked ? 'shadow-purple-200' : 'shadow-slate-300'}
            `}
            style={{ borderRadius: 'var(--border-radius-upzella)' }}
          >
            {/* Optional inner indicator */}
            <div
              className={`
                w-1 h-1 rounded-full transition-all duration-200
                ${isChecked ? 'bg-purple-400' : 'bg-slate-400'}
              `}
            />
          </span>
        </label>
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={uniqueId}
              className={`
                ${currentSize.text}
                ${disabled ? 'text-slate-400 cursor-not-allowed' : 'text-slate-900 cursor-pointer'}
                font-medium block leading-tight
              `}
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p
              className={`
                ${size === 'sm' ? 'text-xs' : 'text-sm'}
                ${disabled ? 'text-slate-300' : 'text-slate-600'}
                mt-1 leading-relaxed
              `}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedToggle;
