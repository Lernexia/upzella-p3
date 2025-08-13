'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  onClick,
  icon,
  removable = false,
  onRemove,
  disabled = false,
  style = {},
}) => {
  // Size configurations
  const sizeConfig = {
    xs: {
      padding: 'px-2 py-0.5',
      text: 'text-xs',
      iconSize: 'w-3 h-3',
      gap: 'gap-1'
    },
    sm: {
      padding: 'px-3 py-1',
      text: 'text-xs',
      iconSize: 'w-3.5 h-3.5',
      gap: 'gap-1.5'
    },
    md: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-2'
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-2'
    }
  };

  // Variant configurations
  const variantConfig = {
    default: {
      background: 'bg-gradient-to-r from-slate-100 to-slate-200',
      text: 'text-slate-700',
      border: 'border border-slate-200',
      hover: 'hover:from-slate-200 hover:to-slate-300',
      ring: 'focus:ring-slate-500/20'
    },
    primary: {
      background: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      text: 'text-white',
      border: 'border border-purple-300',
      hover: 'hover:from-purple-600 hover:to-indigo-700',
      ring: 'focus:ring-purple-500/30'
    },
    secondary: {
      background: 'bg-gradient-to-r from-gray-100 to-gray-200',
      text: 'text-gray-700',
      border: 'border border-gray-200',
      hover: 'hover:from-gray-200 hover:to-gray-300',
      ring: 'focus:ring-gray-500/20'
    },
    success: {
      background: 'bg-gradient-to-r from-green-500 to-emerald-600',
      text: 'text-white',
      border: 'border border-green-300',
      hover: 'hover:from-green-600 hover:to-emerald-700',
      ring: 'focus:ring-green-500/30'
    },
    warning: {
      background: 'bg-gradient-to-r from-orange-500 to-amber-600',
      text: 'text-white',
      border: 'border border-orange-300',
      hover: 'hover:from-orange-600 hover:to-amber-700',
      ring: 'focus:ring-orange-500/30'
    },
    error: {
      background: 'bg-gradient-to-r from-red-500 to-rose-600',
      text: 'text-white',
      border: 'border border-red-300',
      hover: 'hover:from-red-600 hover:to-rose-700',
      ring: 'focus:ring-red-500/30'
    },
    info: {
      background: 'bg-gradient-to-r from-blue-500 to-cyan-600',
      text: 'text-white',
      border: 'border border-blue-300',
      hover: 'hover:from-blue-600 hover:to-cyan-700',
      ring: 'focus:ring-blue-500/30'
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const isClickable = onClick || removable;

  return (
    <span
      className={`
        ${className}
        ${currentSize.padding}
        ${currentSize.text}
        ${currentVariant.background}
        ${currentVariant.text}
        ${currentVariant.border}
        ${isClickable && !disabled ? `${currentVariant.hover} cursor-pointer` : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isClickable ? `transition-all duration-200 focus:outline-none focus:ring-4 ${currentVariant.ring}` : ''}
        inline-flex items-center ${currentSize.gap} font-medium shadow-sm
      `}
      style={{ 
        borderRadius: 'var(--border-radius-upzella)',
        fontFamily: 'var(--font-accent)',
        ...style
      }}
      onClick={!disabled ? onClick : undefined}
      tabIndex={isClickable && !disabled ? 0 : -1}
      role={isClickable ? 'button' : undefined}
      onKeyDown={(e) => {
        if (isClickable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {icon && (
        <span className={currentSize.iconSize}>
          {icon}
        </span>
      )}
      
      <span className="truncate">
        {children}
      </span>

      {removable && onRemove && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`
            ${currentSize.iconSize}
            ml-1 rounded-full transition-colors duration-200
            hover:bg-black/10 focus:outline-none focus:bg-black/20
          `}
          aria-label="Remove badge"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};