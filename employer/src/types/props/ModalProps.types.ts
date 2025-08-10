import { ReactNode, HTMLAttributes } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  customHeader?: ReactNode;
  scrollable?: boolean;
  centered?: boolean;
  backdropClassName?: string;
  animation?: 'fade' | 'scale' | 'slide';
  zIndex?: number;
}
