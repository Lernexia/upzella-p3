'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContextProps, ToastProviderProps } from '@/types/props/ToastProps.types';

// Create toast context
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Generate unique ID for toasts
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Add new toast
  const addToast = useCallback((toastData: Omit<Toast, 'id' | 'createdAt'>) => {
    const newToast: Toast = {
      ...toastData,
      id: generateId(),
      createdAt: Date.now(),
      duration: toastData.duration || 5000, // Default 5 seconds
    };    setToasts(prev => [...prev, newToast]);

    // Auto-remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, newToast.duration);
    }
  }, [generateId]);

  // Remove toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Clear all toasts
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextProps = {
    toasts,
    addToast,
    removeToast,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
