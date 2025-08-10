import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string | boolean;
  isValid?: boolean;
  isValidating?: boolean;
  validationMessage?: string;
  showValidationIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'filled' | 'outlined' | 'minimal' | 'floating';
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  leftIcon?: ReactNode;
  error?: boolean | string;
  errorMessage?: string;
  selectPosition?: 'absolute' | 'relative';
  searchable?: boolean;
}
