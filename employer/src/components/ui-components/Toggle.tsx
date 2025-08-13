'use client';

import React, { useEffect, useState } from 'react';

interface ToggleProps {
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

export const Toggle: React.FC<ToggleProps> = ({
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
    // Only update internal state if uncontrolled
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
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

  // Generate a stable ID on the client side to prevent hydration mismatches
  const [uniqueId, setUniqueId] = useState(id || '');
  
  useEffect(() => {
    if (!id) {
      // Only generate random ID on client side
      setUniqueId(`toggle-${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [id]);

  // Make Toggle fully controlled if checked prop is provided
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

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
          className="absolute opacity-0 w-full h-full cursor-pointer z-10"
          style={{ left: 0, top: 0, margin: 0, padding: 0 }}
        />
        {uniqueId ? (
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
            suppressHydrationWarning={true}
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
        ) : (
          <div
            className={`
              ${currentSize.track}
              ${isChecked ? currentVariant.trackOn : currentVariant.trackOff}
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${readOnly ? 'cursor-default' : ''}
              relative inline-flex items-center rounded-full
              transition-all duration-300 ease-in-out
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
          </div>
        )}
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && uniqueId ? (
            <label
              htmlFor={uniqueId}
              className={`
                ${currentSize.text}
                ${disabled ? 'text-slate-400 cursor-not-allowed' : 'text-slate-900 cursor-pointer'}
                font-medium block leading-tight
              `}
              style={{ fontFamily: 'var(--font-accent)' }}
              suppressHydrationWarning={true}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          ) : label && (
            <div
              className={`
                ${currentSize.text}
                ${disabled ? 'text-slate-400 cursor-not-allowed' : 'text-slate-900 cursor-pointer'}
                font-medium block leading-tight
              `}
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </div>
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
    </div>  );
};

// Enhanced Toggle with button-style design
export const EnhancedToggle: React.FC<{
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  values?: string[];
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  multiple = false,
  values = [],
  className = '',
  variant = 'default'
}) => {
  const variantConfig = {
    default: 'from-purple-500 to-indigo-500',
    success: 'from-green-500 to-emerald-500', 
    warning: 'from-orange-500 to-amber-500',
    error: 'from-red-500 to-rose-500'
  };

  const handleSingleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
    }
  };

  const handleMultiSelect = (optionValue: string) => {
    if (!disabled) {
      const currentValues = values || [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue).join(','));
      } else {
        onChange([...currentValues, optionValue].join(','));
      }
    }
  };

  // Use useEffect to ensure client-side only rendering for elements with auto-generated attributes
  const [isMounted, setIsMounted] = useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        {label} {required && <span className="text-gradient-pink-shade">*</span>}
      </label>
      <div className="flex flex-wrap items-center gap-1.5 bg-gradient-to-r from-slate-100/70 to-slate-50/70 backdrop-blur-sm rounded-xl p-1.5 shadow-inner">
        {options.map((option) => {
          const isSelected = multiple 
            ? values.includes(option.value)
            : value === option.value;
          
          return (
            <div
              key={option.value}
              onClick={() => multiple ? handleMultiSelect(option.value) : handleSingleSelect(option.value)}
              suppressHydrationWarning={true} // Suppress hydration warnings for this element
              className={`px-4 py-2 text-sm cursor-pointer font-semibold rounded-lg transition-all duration-300 relative ${
                isSelected
                  ? `bg-gradient-to-tr ${variantConfig[variant]} text-white shadow-lg transform`
                  : 'text-slate-600 hover:text-slate-900'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
