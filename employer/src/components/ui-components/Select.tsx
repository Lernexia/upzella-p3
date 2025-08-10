"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/svg-icons";
import { SelectOption, SelectProps } from "@/types/props/InputProps.types";
import { Input } from "./Input";

// Legacy Select component - use BasicSelect or SearchableSelect instead
export const Select: React.FC<SelectProps> = ({
  id,
  label,
  placeholder = "Select an option",
  value,
  options,
  onChange,
  onSearch,
  required = false,
  disabled = false,
  className = "",
  leftIcon,
  error = false,
  errorMessage,
  selectPosition = 'absolute',
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    value ? options.find((opt) => opt.value === value) || null : null
  );
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>('below');
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        const dropdownHeight = Math.min(240, options.length * 48 + 16); // max-h-60 = 240px, each option ~48px
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Position above if there's not enough space below but enough space above
        if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
          setDropdownPosition('above');
        } else {
          setDropdownPosition('below');
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      calculateDropdownPosition();
      window.addEventListener('resize', calculateDropdownPosition);
      window.addEventListener('scroll', calculateDropdownPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', calculateDropdownPosition);
      window.removeEventListener('scroll', calculateDropdownPosition);
    };
  }, [isOpen, options.length]);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchQuery('');
    onChange?.(option.value);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        // Focus search input when opening
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 10);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch?.(query);
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
        } else {
          // Focus next option logic can be added here
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          // Focus previous option logic can be added here
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
        </div>        {/* Options dropdown */}
        {isOpen && (
          <div
            ref={optionsRef}
            className={`
              ${selectPosition === 'absolute' ? 'absolute' : 'relative'}
              z-50 w-full bg-white border border-slate-300 shadow-lg max-h-60 overflow-auto
              ${dropdownPosition === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'}
            `}
            style={{ borderRadius: "var(--border-radius-upzella)" }}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-label={!label ? `${placeholder} options` : undefined}
          >
            {searchable && (
              <div className="p-2 border-b border-slate-200">
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-indigo-500"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
              </div>
            )}
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

export default Select;
