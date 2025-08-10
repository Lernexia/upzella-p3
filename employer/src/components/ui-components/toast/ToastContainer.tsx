'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '@/context/ToastContext';
import ToastComponent from './ToastComponent';

// Toast container component
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  // Don't render if no toasts
  if (toasts.length === 0) return null;

  // Create portal to render toasts at the top level
  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastComponent
            toast={toast}
            onRemove={removeToast}
          />
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
