import { cn } from '@/lib/utils';
import React from 'react';

// ===== Form =====
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => (
    <form ref={ref} className={cn('space-y-6', className)} {...props}>
      {children}
    </form>
  )
);
Form.displayName = 'Form';

// ===== FormField =====
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ children, className, ...props }) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
);

// ===== FormGroup =====
interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  icon,
  className,
  ...props
}) => (
  <div
    className={cn('bg-white rounded-xl border border-slate-200 shadow-sm', className)}
    {...props}
  >
    <div className="p-6 border-b border-slate-100">
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ===== FormLabel =====
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block text-sm font-medium text-slate-700 mb-2', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
);
FormLabel.displayName = 'FormLabel';

// ===== FormError =====
interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const FormError: React.FC<FormErrorProps> = ({ children, className, ...props }) => {
  if (!children) return null;
  return (
    <p className={cn('text-sm text-red-600 mt-1', className)} {...props}>
      {children}
    </p>
  );
};

// ===== FormDescription =====
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const FormDescription: React.FC<FormDescriptionProps> = ({
  children,
  className,
  ...props
}) => (
  <p className={cn('text-sm text-slate-600 mt-1', className)} {...props}>
    {children}
  </p>
);
