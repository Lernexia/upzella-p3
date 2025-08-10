"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/svg-icons";
import { SelectOption, SelectProps } from "@/types/props/InputProps.types";

// Basic Select Props (no search functionality)
interface BasicSelectProps extends Omit<SelectProps, 'onSearch' | 'searchable'> {}

export const BasicSelect: React.FC<BasicSelectProps> = ({
  id,
  label,
  placeholder = "Select an option",
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  className = "",
  leftIcon,
  error = false,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    value ? options.find((opt) => opt.value === value) || null : null
  );
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>('below');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      setSelectedOption(option || null);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const calculateDropdownPosition = () => {
      if (selectRef.current && isOpen) {
        const rect = selectRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = Math.min(options.length * 48 + 16, 240); // Estimated height
        
        setDropdownPosition(spaceBelow >= dropdownHeight ? 'below' : 'above');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      calculateDropdownPosition();
      window.addEventListener('scroll', calculateDropdownPosition);
      window.addEventListener('resize', calculateDropdownPosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', calculateDropdownPosition);
      window.removeEventListener('resize', calculateDropdownPosition);
    };
  }, [isOpen, options.length]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="block text-sm font-semibold text-slate-800 mb-3 tracking-wide"
        >
          {label}
          {required && <span className="text-gradient-pink-shade">*</span>}
        </label>
      )}
      
      <div className="relative" ref={selectRef}>
        <div
          id={id}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-label={!label ? placeholder : undefined}
          className={`
            relative w-full h-12 px-4 py-3 bg-white border transition-all duration-200 cursor-pointer
            ${leftIcon ? "pl-12" : "pl-4"}
            ${error 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
              : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
            }
            ${disabled 
              ? "bg-slate-100 text-slate-500 cursor-not-allowed" 
              : "hover:border-slate-400"
            }
            ${isOpen ? "ring-2 ring-indigo-500/20" : ""}
            focus:outline-none focus:ring-2
          `}
          style={{ borderRadius: "var(--border-radius-upzella)" }}
        >
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <div className={`flex items-center gap-3 truncate ${
            selectedOption ? "text-slate-900" : "text-slate-500"
          }`}>
            {selectedOption?.icon && (
              <div className="w-5 h-5 flex-shrink-0">
                {selectedOption.icon}
              </div>
            )}
            <span className="flex-1 truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {isOpen ? (
              <ChevronUpIcon size={20} color="#64748b" animate={true} />
            ) : (
              <ChevronDownIcon size={20} color="#64748b" animate={true} />
            )}
          </div>
        </div>

        {isOpen && (
          <div
            className={`
              absolute left-0 right-0 bg-white border border-slate-200 shadow-lg z-50 max-h-60 overflow-y-auto
              ${dropdownPosition === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'}
            `}
            style={{ borderRadius: "var(--border-radius-upzella)" }}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : undefined}
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-slate-500 text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center gap-3
                    ${selectedOption?.value === option.value
                      ? "bg-indigo-50 text-indigo-900 font-medium"
                      : "text-slate-900 hover:bg-purple-50"
                    }
                  `}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  {option.icon && (
                    <div className="w-5 h-5 flex-shrink-0">
                      {option.icon}
                    </div>
                  )}
                  <span className="flex-1">{option.label}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default BasicSelect;
