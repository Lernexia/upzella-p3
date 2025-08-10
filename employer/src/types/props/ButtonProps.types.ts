import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  ripple?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
