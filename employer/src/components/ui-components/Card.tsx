'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Base Card Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined' | 'subtle';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

// Define compound component type
interface CardCompound extends React.FC<CardProps> {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
}

export const Card: CardCompound = ({
    variant = 'default',
    size = 'md',
    className,
    children,
    ...props
}) => {
    const baseStyles = "bg-white overflow-hidden transition-all duration-200";
    
    const variantStyles = {
        default: "shadow-lg border border-white/20 backdrop-blur-sm",
        elevated: "shadow-2xl border border-white/30 backdrop-blur-md",
        outlined: "shadow-sm border-2 border-slate-200",
        subtle: "shadow-md border border-slate-100 bg-slate-50/50"
    };

    const sizeStyles = {
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
    };

    return (
        <div
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            style={{ borderRadius: 'var(--border-radius-upzella)' }}
            {...props}
        >
            {children}
        </div>
    );
};

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    icon,
    actions,
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "border-b border-slate-200/50 pb-4 mb-4",
                className
            )}
            {...props}
        >
            {children ? (
                children
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="flex-shrink-0">
                                {icon}
                            </div>
                        )}
                        <div>
                            {title && (
                                <h3 
                                    className="text-lg font-semibold text-slate-800"
                                    style={{ fontFamily: 'var(--font-accent)' }}
                                >
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p 
                                    className="text-sm text-slate-600 mt-1"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                    {actions && (
                        <div className="flex items-center gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Card Content Component (Scrollable)
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    scrollable?: boolean;
    maxHeight?: string;
    children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
    scrollable = false,
    maxHeight = '400px',
    children,
    className,
    ...props
}) => {
    const scrollStyles = scrollable ? {
        overflowY: 'auto' as const,
        maxHeight: maxHeight,
        scrollbarWidth: 'thin' as const,
        scrollbarColor: '#cbd5e1 transparent'
    } : {};

    return (
        <div
            className={cn(
                "text-slate-700",
                scrollable && "pr-2", // Add padding for scrollbar
                className
            )}
            style={{
                fontFamily: 'var(--font-body)',
                ...scrollStyles
            }}
            {...props}
        >
            {children}
        </div>
    );
};

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    actions?: React.ReactNode;
    variant?: 'default' | 'bordered' | 'subtle';
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    actions,
    variant = 'default',
    className,
    ...props
}) => {
    const variantStyles = {
        default: "border-t border-slate-200/50 pt-4 mt-4",
        bordered: "border-t-2 border-slate-300 pt-4 mt-4",
        subtle: "bg-slate-50/50 -mx-6 -mb-6 px-6 py-4 mt-4"
    };

    return (
        <div
            className={cn(
                "flex items-center justify-between",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            <div className="flex-1">
                {children}
            </div>
            {actions && (
                <div className="flex items-center gap-2 ml-4">
                    {actions}
                </div>
            )}
        </div>
    );
};

// Compound component exports
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
