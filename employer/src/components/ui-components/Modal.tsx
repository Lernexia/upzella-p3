'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '@/types/props/ModalProps.types';
import { cn } from '@/lib/utils';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({
        isOpen,
        onClose,
        title,
        children,
        footer,
        className = '',
        size = 'md',
        closeOnBackdropClick = true,
        closeOnEscape = true,
        showCloseButton = true,
        customHeader,
        scrollable = true,
        centered = true,
        backdropClassName = '',
        animation = 'fade',
        zIndex = 50,
        ...props
    }, ref) => {
        const modalRef = useRef<HTMLDivElement>(null);
        const backdropRef = useRef<HTMLDivElement>(null);

        // Handle escape key
        useEffect(() => {
            if (!closeOnEscape) return;

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && isOpen) {
                    onClose();
                }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }, [isOpen, closeOnEscape, onClose]);

        // Handle backdrop click
        const handleBackdropClick = (e: React.MouseEvent) => {
            if (closeOnBackdropClick && e.target === backdropRef.current) {
                onClose();
            }
        };

        // Size variants
        const sizeClasses = {
            sm: "max-w-md",
            md: "max-w-lg",
            lg: "max-w-2xl",
            xl: "max-w-4xl",
            full: "max-w-7xl mx-4"
        };

        // Animation classes
        const animationClasses = {
            fade: {
                backdrop: "transition-opacity duration-300",
                modal: "transition-all duration-300 transform"
            },
            slideUp: {
                backdrop: "transition-opacity duration-300",
                modal: "transition-all duration-300 transform translate-y-0"
            },
            slideDown: {
                backdrop: "transition-opacity duration-300",
                modal: "transition-all duration-300 transform -translate-y-0"
            },
            scale: {
                backdrop: "transition-opacity duration-300",
                modal: "transition-all duration-300 transform scale-100"
            }
        };

        // Base classes for backdrop
        const backdropClasses = cn(
            "fixed inset-0 backdrop-blur-sm bg-black/50",
            animationClasses[animation].backdrop,
            !isOpen && "opacity-0 pointer-events-none",
            backdropClassName
        );

        // Base classes for modal
        const modalClasses = cn(
            "relative w-full bg-white shadow-2xl border border-purple-100/50",
            "flex flex-col max-h-[90vh]",
            sizeClasses[size],
            animationClasses[animation].modal,
            !isOpen && {
                fade: "opacity-0 scale-95",
                slideUp: "opacity-0 translate-y-8",
                slideDown: "opacity-0 -translate-y-8",
                scale: "opacity-0 scale-75"
            }[animation],
            className
        );

        // Position classes
        const positionClasses = cn(
            "fixed inset-0 z-50 flex p-4",
            centered ? "items-center justify-center" : "items-start justify-center pt-16"
        );

        if (!isOpen) {
            return null;
        }

        const modalContent = (
            <div
                ref={backdropRef}
                className={backdropClasses}
                style={{ zIndex }}
                onClick={handleBackdropClick}
            >
                <div className={positionClasses}>
                    <div
                        ref={ref || modalRef}
                        className={modalClasses}
                        style={{ borderRadius: 'var(--border-radius-upzella)' }}
                        {...props}
                    >
                        {/* Modal Header */}
                        {(title || customHeader || showCloseButton) && (
                            <div 
                                className="flex items-center justify-between px-6 py-4 border-b border-purple-100/50 bg-gradient-to-r from-purple-25 to-blue-25 flex-shrink-0"
                                style={{ 
                                    borderRadius: 'var(--border-radius-upzella) var(--border-radius-upzella) 0 0',
                                    fontFamily: 'var(--font-heading)'
                                }}
                            >
                                {customHeader ? (
                                    customHeader
                                ) : (
                                    <h2 className="text-xl font-semibold text-slate-800 truncate pr-4">
                                        {title}
                                    </h2>
                                )}
                                
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60 transition-colors duration-200 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                                        style={{ borderRadius: 'var(--border-radius-upzella)' }}
                                        aria-label="Close modal"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Modal Body */}
                        <div 
                            className={cn(
                                "flex-1 px-6 py-6",
                                scrollable ? "overflow-y-auto" : "overflow-hidden"
                            )}
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            {children}
                        </div>

                        {/* Modal Footer */}
                        {footer && (
                            <div 
                                className="flex-shrink-0 px-6 py-4 border-t border-purple-100/50 bg-gradient-to-r from-slate-25 to-purple-25/30"
                                style={{ 
                                    borderRadius: '0 0 var(--border-radius-upzella) var(--border-radius-upzella)',
                                    fontFamily: 'var(--font-accent)'
                                }}
                            >
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

        // Use portal to render modal at body level
        return typeof window !== 'undefined' 
            ? createPortal(modalContent, document.body)
            : null;
    }
);

Modal.displayName = 'Modal';
