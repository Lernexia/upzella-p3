// Toast component type definitions
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  createdAt: number;
}

export interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export interface ToastContextProps {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}
