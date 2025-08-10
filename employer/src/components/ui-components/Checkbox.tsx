'use client';

import React, { useState } from 'react';
import { CheckIcon } from '@/components/svg-icons';

interface CheckboxProps {
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

export const Checkbox: React.FC<CheckboxProps> = ({
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
      checkbox: 'w-4 h-4',
      icon: 12,
      text: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      checkbox: 'w-5 h-5',
      icon: 14,
      text: 'text-base',
      gap: 'gap-3'
    },
    lg: {
      checkbox: 'w-6 h-6',
      icon: 16,
      text: 'text-lg',
      gap: 'gap-3'
    }
  };

  // Variant configurations
  const variantConfig = {
    default: {
      border: 'border-slate-300 hover:border-purple-400 focus:border-purple-500',
      bg: isChecked ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-white',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
      ring: 'focus:ring-purple-500/20'
    },
    success: {
      border: 'border-green-300 hover:border-green-400 focus:border-green-500',
      bg: isChecked ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-white',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
      ring: 'focus:ring-green-500/20'
    },
    warning: {
      border: 'border-orange-300 hover:border-orange-400 focus:border-orange-500',
      bg: isChecked ? 'bg-gradient-to-r from-orange-600 to-amber-600' : 'bg-white',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
      ring: 'focus:ring-orange-500/20'
    },
    error: {
      border: 'border-red-300 hover:border-red-400 focus:border-red-500',
      bg: isChecked ? 'bg-gradient-to-r from-red-600 to-rose-600' : 'bg-white',
      shadow: 'shadow-sm hover:shadow-md focus:shadow-lg',
      ring: 'focus:ring-red-500/20'
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const uniqueId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-start ${currentSize.gap} ${className}`}>
      <div suppressHydrationWarning suppressContentEditableWarning className="relative flex items-center">
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
            ${currentSize.checkbox}
            ${currentVariant.border}
            ${currentVariant.bg}
            ${currentVariant.shadow}
            ${currentVariant.ring}
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
            ${readOnly ? 'cursor-default' : ''}
            border-2 rounded-lg flex items-center justify-center
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4
            hover:scale-105 active:scale-95
          `}
          style={{ borderRadius: 'var(--border-radius-upzella)' }}
        >
          {isChecked && (
            <CheckIcon
              size={currentSize.icon}
              color="white"
              className="transition-all duration-200 ease-in-out animate-in zoom-in-50"
            />
          )}
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
