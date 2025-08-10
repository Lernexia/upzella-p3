import React from 'react';
import { cn } from '@/lib/utils';
import { FormProps, FormFieldProps, FormGroupProps } from '@/types/props/FormProps.types';

/**
 * FormField Component
 * A wrapper for individual form fields with consistent spacing
 */
const FormField = ({ children, className }: FormFieldProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  );
};

/**
 * FormGroup Component
 * A grid container for organizing form fields in columns
 */
const FormGroup = ({ children, className, cols = 1, gap = 4 }: FormGroupProps) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  return (
    <div className={cn(
      'grid',
      gridClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

/**
 * Form Component
 * The main form wrapper with customizable spacing
 */
const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, spacing = 6, children, ...props }, ref) => {
    const spacingClasses = {
      4: 'space-y-4',
      6: 'space-y-6',
      8: 'space-y-8'
    };

    return (
      <form
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";

export { Form, FormField, FormGroup };
