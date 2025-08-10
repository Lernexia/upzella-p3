'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { ButtonProps } from '@/types/props/ButtonProps.types';
import { cn } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        children,
        variant = 'primary',
        size = 'md',
        loading = false,
        loadingText,
        leftIcon,
        rightIcon,
        fullWidth = false,
        disabled,
        className = '',
        ripple = true,
        onClick,
        ...props
    }, ref) => {
        // Enhanced ripple system with multiple concurrent ripples
        const [splashes, setSplashes] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const splashIdRef = useRef(0);

        // Enhanced base classes with better performance
        const baseClasses = "outline-none cursor-pointer inline-flex items-center justify-center transition-all duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed select-none relative overflow-hidden font-semibold";

        // Modern variant styles with sophisticated gradients and animations
        const variants = {
            primary: "text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 shadow-[0_4px_14px_0_rgba(79,70,229,0.15)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none",
            secondary: "text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none",
            tertiary: "text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:from-amber-700 active:to-orange-700 shadow-[0_4px_14px_0_rgba(245,158,11,0.15)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none",
            outline: "text-indigo-600 bg-transparent border-2 border-indigo-500 hover:border-indigo-600 hover:bg-indigo-50/30 focus:ring-2 focus:ring-indigo-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_2px_5px_0_rgba(0,0,0,0.02)] hover:shadow-[0_4px_10px_rgba(79,70,229,0.1)] disabled:hover:translate-y-0 disabled:shadow-none",
            ghost: "text-slate-700 bg-transparent hover:bg-slate-100/80 focus:ring-2 focus:ring-slate-200 disabled:hover:bg-transparent",
            gradient: "text-white bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 shadow-[0_4px_20px_0_rgba(139,92,246,0.2)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.3)] hover:-translate-y-1 hover:scale-105 active:scale-100 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:shadow-none",
            success: "text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:from-green-700 active:to-emerald-800 shadow-[0_4px_14px_0_rgba(34,197,94,0.15)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none",
            warning: "text-white bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 active:from-yellow-700 active:to-amber-700 shadow-[0_4px_14px_0_rgba(245,158,11,0.15)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none",
            danger: "text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 active:from-red-700 active:to-rose-800 shadow-[0_4px_14px_0_rgba(239,68,68,0.15)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.25)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:shadow-none"
        };

        // Enhanced size variants with better proportions
        const sizes = {
            sm: "px-4 py-2.5 text-xs rounded-[var(--border-radius-upzella)] gap-1.5 font-medium min-h-[38px]",
            md: "px-6 py-3 text-sm rounded-[var(--border-radius-upzella)] gap-2 font-semibold min-h-[44px]",
            lg: "px-8 py-3.5 text-base rounded-[var(--border-radius-upzella)] gap-3 font-semibold min-h-[48px]",
            xl: "px-10 py-4 text-lg rounded-[var(--border-radius-upzella)] gap-3 font-bold min-h-[52px]"
        };

        const isDisabled = disabled || loading;

        // Enhanced click handler with improved ripple calculation
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!ripple || isDisabled) {
                onClick?.(e);
                return;
            }

            const button = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
            if (button) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate the maximum distance from click point to button edges
                const maxX = Math.max(x, rect.width - x);
                const maxY = Math.max(y, rect.height - y);
                const rippleSize = Math.sqrt(maxX * maxX + maxY * maxY) * 2;

                const splashId = splashIdRef.current++;
                setSplashes(prev => [...prev, { id: splashId, x, y, size: rippleSize }]);

                // Remove splash after animation
                setTimeout(() => {
                    setSplashes(prev => prev.filter(splash => splash.id !== splashId));
                }, 700);
            }

            onClick?.(e);
        };

        // Enhanced loading spinner component
        const LoadingSpinner = () => (
            <svg
                className={cn(
                    "animate-spin text-current",
                    size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : size === 'xl' ? 'h-6 w-6' : 'h-4 w-4'
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        return (
            <button
                className={cn(
                    baseClasses,
                    variants[variant],
                    sizes[size],
                    fullWidth && "w-full",
                    className
                )}
                disabled={isDisabled}
                suppressHydrationWarning={true}
                ref={(node) => {
                    if (buttonRef) buttonRef.current = node;
                    if (typeof ref === 'function') ref(node);
                    else if (ref) ref.current = node;
                }}
                onClick={handleClick}
                {...props}
            >
                {/* Enhanced ripple effects */}
                {splashes.map(splash => (
                    <span
                        key={splash.id}
                        className="absolute pointer-events-none rounded-full bg-white/30"
                        style={{
                            left: splash.x,
                            top: splash.y,
                            transform: 'translate(-50%, -50%)',
                            width: 0,
                            height: 0,
                            animation: `ripple 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                            '--ripple-size': `${splash.size}px`
                        } as React.CSSProperties & { '--ripple-size': string }}
                    />
                ))}

                {loading ? (
                    <>
                        <LoadingSpinner />
                        {loadingText || children}
                    </>
                ) : (
                    <>
                        {leftIcon && (
                            <span className="flex-shrink-0 mr-1">
                                {leftIcon}
                            </span>
                        )}
                        <span className={`${leftIcon || rightIcon ? 'flex-1' : ''} text-center`}>
                            {children}
                        </span>
                        {rightIcon && (
                            <span className="flex-shrink-0 ml-1">
                                {rightIcon}
                            </span>
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

// Export enhanced button compositions for AI hiring platform
export const AIButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="gradient" {...props}>
        {children}
    </Button>
);

export const HireButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="primary" {...props}>
        {children}
    </Button>
);

export const SecondaryButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="secondary" {...props}>
        {children}
    </Button>
);

export const ApprovalButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="secondary" {...props}>
        {children}
    </Button>
);

export const WarningButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="tertiary" {...props}>
        {children}
    </Button>
);

export const GhostButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="ghost" {...props}>
        {children}
    </Button>
);

export const OutlineButton = ({ children, ...props }: Omit<ButtonProps, 'variant'>) => (
    <Button variant="outline" {...props}>
        {children}
    </Button>
);
