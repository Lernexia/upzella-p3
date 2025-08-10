'use client';

import React, { useEffect, useState } from 'react';
import { ToastProps } from '@/types/props/ToastProps.types';
import { CheckIcon, CrossIcon, WarningIcon, SparkleIcon } from '@/components/svg-icons';
import { cn } from '@/lib/utils';

// Toast component
const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Animation entrance effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle close with exit animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  // Auto-close countdown
  const [timeLeft, setTimeLeft] = useState(toast.duration || 5000);
  
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 100) {
            handleClose();
            return 0;
          }
          return prev - 100;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  // Get toast icon based on type
  const getToastIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckIcon size={20} color="white" />;
      case 'error':
        return <CrossIcon size={20} color="white" />;
      case 'warning':
        return <WarningIcon size={20} color="white" />;
      case 'info':
      default:
        return <SparkleIcon size={20} color="white" />;
    }
  };

  // Get toast colors based on type
  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-rose-500 border-red-400';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400';
      case 'info':
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400';
    }
  };

  return (
    <div
      className={cn(
        'group relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm transform transition-all duration-300 ease-out min-w-[320px] max-w-[480px]',
        getToastStyles(),
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95',
        isExiting && 'translate-x-full opacity-0 scale-95'
      )}
      style={{ borderRadius: 'var(--border-radius-upzella)' }}
    >
      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg transition-all duration-100 ease-linear"
          style={{ 
            width: `${(timeLeft / (toast.duration || 5000)) * 100}%`,
            borderRadius: 'var(--border-radius-upzella)'
          }}
        />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {getToastIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-white text-sm leading-tight">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="font-body text-white/90 text-sm mt-1 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 group-hover:opacity-100 opacity-70"
        aria-label="Close notification"
      >
        <CrossIcon size={16} color="white" />
      </button>
    </div>
  );
};

export default ToastComponent;
