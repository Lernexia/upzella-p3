'use client';

import { InputProps } from "@/types/props/InputProps.types";
import React, { forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import clsx from 'clsx';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      type = "text",
      label,
      error,
      isValid,
      isValidating,
      validationMessage,
      showValidationIcon = false,
      leftIcon,
      rightIcon,
      variant = "default",
      placeholder,
      id,
      readOnly,
      required,
      ...props
    },
    ref
  ) => {
    // Generate stable ID to prevent hydration mismatches
    const reactId = React.useId();
    const inputId = id || `input-${reactId}`;
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!props.value || !!props.defaultValue);
    
    // Update hasValue when controlled value changes
    useEffect(() => {
      setHasValue(!!props.value);
    }, [props.value]);

    const getValidationState = () => {
      if (props.value && !isValidating && showValidationIcon) {
        return isValid ? "valid" : "invalid";
      }
      return "default";
    };

    const validationState = getValidationState();
    const isFloating = isFocused || hasValue || !!props.value;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    // Enhanced input classes with modern styling and animations
    const baseInputClasses = variant === 'floating'
      ? "block w-full px-4 py-3.5 border-2 rounded-[var(--border-radius-upzella)] text-slate-900 bg-white focus:outline-none focus:ring-0 transition-all duration-300 text-sm font-medium"
      : "block w-full px-4 py-3.5 border-2 rounded-[var(--border-radius-upzella)] placeholder-slate-400 text-slate-900 bg-white focus:outline-none focus:ring-0 transition-all duration-300 text-sm font-medium";

    const inputClasses = cn(
      baseInputClasses,
      clsx({
        // Valid state with enhanced elevation and emerald theme
        'border-emerald-300 focus:border-emerald-500 bg-gradient-to-br from-white to-emerald-50/20 shadow-[0_2px_10px_0_rgba(16,185,129,0.08),0_1px_3px_0_rgba(16,185,129,0.05)] focus:shadow-[0_6px_25px_0_rgba(16,185,129,0.15),0_3px_10px_0_rgba(16,185,129,0.1)]': validationState === 'valid',
        // Invalid state with enhanced elevation and red theme
        'border-red-300 focus:border-red-500 bg-gradient-to-br from-white to-red-50/20 shadow-[0_2px_10px_0_rgba(239,68,68,0.08),0_1px_3px_0_rgba(239,68,68,0.05)] focus:shadow-[0_6px_25px_0_rgba(239,68,68,0.15),0_3px_10px_0_rgba(239,68,68,0.1)]': validationState === 'invalid',
        // Readonly state with distinct styling
        'border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed': readOnly,
        // Default state with modern indigo theme and enhanced focus animation
        'border-slate-200 focus:border-indigo-500 hover:border-indigo-300 bg-gradient-to-br from-white to-slate-50/30 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] focus:bg-white': validationState === 'default' && !readOnly,
        'pl-12': !!leftIcon,
        'pr-12': !!rightIcon || (showValidationIcon && (isValidating || !!props.value))
      }),
      className
    );

    // Enhanced floating label component with improved animation
    const FloatingLabel = () => {
      if (variant !== "floating" || !placeholder) return null;

      return (
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 pointer-events-none font-normal origin-left",
            "transition-all duration-200 ease-in-out",
            isFloating
              ? `top-0 -translate-y-1/2 text-xs bg-white px-2 rounded scale-90 shadow-sm border ${
                  readOnly 
                    ? 'text-slate-500 border-slate-200' 
                    : validationState === 'valid'
                    ? 'text-emerald-600 border-emerald-100'
                    : validationState === 'invalid'
                    ? 'text-red-600 border-red-100'
                    : 'text-indigo-600 border-indigo-100'
                }`
              : `top-1/2 -translate-y-1/2 text-sm scale-100 ${
                  readOnly ? 'text-slate-400' : 'text-slate-500'
                } ${leftIcon ? "ml-7" : ""}`
          )}
        >
          {placeholder}
          {required && <span className="text-gradient-pink-shade ml-1">*</span>}
        </label>
      );
    };

    // Enhanced validation icon with modern styling
    const ValidationIcon = () => {
      if (isValidating) {
        return (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <div className="bg-indigo-50 rounded-full p-1.5 shadow-sm">
              <svg 
                className="animate-spin h-4 w-4 text-indigo-500" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        );
      }

      if (props.value && !isValidating && showValidationIcon) {
        return (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {isValid ? (
              <div className="bg-emerald-100 rounded-full p-1.5 shadow-sm border border-emerald-200">
                <svg 
                  className="h-4 w-4 text-emerald-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            ) : (
              <div className="bg-red-100 rounded-full p-1.5 shadow-sm border border-red-200">
                <svg 
                  className="h-4 w-4 text-red-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            )}
          </div>
        );
      }

      return null;
    };

    // Enhanced validation message with modern styling
    const ValidationMessage = () => {
      if (props.value && validationMessage && !isValidating) {
        return (
          <div className={cn(
            "mt-3 text-sm flex items-center gap-2 font-medium",
            isValid ? 'text-emerald-700' : 'text-red-700'
          )}>
            {isValid ? (
              <div className="bg-emerald-100 rounded-full p-0.5">
                <svg 
                  className="h-3 w-3 text-emerald-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            ) : (
              <div className="bg-red-100 rounded-full p-0.5">
                <svg 
                  className="h-3 w-3 text-red-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            )}
            {validationMessage}
          </div>
        );
      }

      if (error) {
        return (
          <div className="mt-3 text-sm text-red-700 flex items-center gap-2 font-medium">
            <div className="bg-red-100 rounded-full p-0.5">
              <svg 
                className="h-3 w-3 text-red-600" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            {error}
          </div>
        );
      }

      return null;
    };

    return (
      <>
        {variant === "default" && label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-semibold text-slate-800 mb-[8px] tracking-wide"
          >
            {label}
            {required && <span className="text-gradient-pink-shade ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <div className="text-slate-500">{leftIcon}</div>
            </div>
          )}
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={inputClasses}
            placeholder={variant === "floating" ? "" : placeholder}
            suppressHydrationWarning={true}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            {...props}
          />
          <FloatingLabel />
          {rightIcon && showValidationIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <div className="text-slate-500">{rightIcon}</div>
            </div>
          )}
          <ValidationIcon />
        </div>
        <ValidationMessage />
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
