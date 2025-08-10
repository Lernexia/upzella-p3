'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type PopoverPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end';

export type PopoverTrigger = 'hover' | 'click' | 'focus';

export interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
  placement?: PopoverPlacement;
  triggerOn?: PopoverTrigger;
  hoverDelay?: number;
  maxWidth?: string;
  offset?: number;
  className?: string;
  disabled?: boolean;
  arrow?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  trigger,
  placement = 'bottom',
  triggerOn = 'hover',
  hoverDelay = 100,
  maxWidth = '320px',
  offset = 8,
  className = '',
  disabled = false,
  arrow = true,
  onOpenChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let top = 0;
    let left = 0;

    // Calculate base position
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top - popoverRect.height - offset;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + offset;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        left = triggerRect.left - popoverRect.width - offset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        left = triggerRect.right + offset;
        break;
    }

    // Calculate left position for vertical placements
    if (placement.includes('top') || placement.includes('bottom')) {
      if (placement.endsWith('-start')) {
        left = triggerRect.left;
      } else if (placement.endsWith('-end')) {
        left = triggerRect.right - popoverRect.width;
      } else {
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      }
    }

    // Calculate top position for horizontal placements
    if (placement.includes('left') || placement.includes('right')) {
      if (placement.endsWith('-start')) {
        top = triggerRect.top;
      } else if (placement.endsWith('-end')) {
        top = triggerRect.bottom - popoverRect.height;
      } else {
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      }
    }

    // Viewport boundary adjustments
    if (left < 0) left = offset;
    if (left + popoverRect.width > viewport.width) {
      left = viewport.width - popoverRect.width - offset;
    }
    if (top < 0) top = offset;
    if (top + popoverRect.height > viewport.height) {
      top = viewport.height - popoverRect.height - offset;
    }

    setPosition({ top, left });
  };
  const handleOpen = () => {
    if (disabled) return;
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    setIsVisible(true);
    // Small delay to ensure the element is rendered before fading in
    setTimeout(() => setIsOpen(true), 10);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
    // Keep the element visible until fade out completes
    fadeTimeoutRef.current = setTimeout(() => setIsVisible(false), 200);
  };

  const handleMouseEnter = () => {
    if (triggerOn !== 'hover') return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleOpen, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (triggerOn !== 'hover') return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleClose, 100);
  };
  const handleClick = () => {
    if (triggerOn !== 'click') return;
    if (isVisible) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleFocus = () => {
    if (triggerOn !== 'focus') return;
    handleOpen();
  };

  const handleBlur = () => {
    if (triggerOn !== 'focus') return;
    handleClose();
  };
  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, placement]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerOn === 'click' &&
        isVisible &&
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, triggerOn]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const getArrowClasses = () => {
    const baseArrow = 'absolute w-2 h-2 bg-white border transform rotate-45';
    
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `${baseArrow} top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-none border-r-0 border-b-0`;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `${baseArrow} bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-none border-l-0 border-t-0`;
      case 'left':
      case 'left-start':
      case 'left-end':
        return `${baseArrow} left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-none border-l-0 border-b-0`;
      case 'right':
      case 'right-start':
      case 'right-end':
        return `${baseArrow} right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-none border-r-0 border-t-0`;
      default:
        return `${baseArrow} top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-none border-r-0 border-b-0`;
    }
  };  
  
  const popoverContent = isVisible && (
    <div
      ref={popoverRef}
      className={`
        fixed z-50 bg-white border border-slate-200 shadow-xl transition-opacity duration-200 ease-out
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{
        top: position.top,
        left: position.left,
        maxWidth,
        borderRadius: 'var(--border-radius-upzella)'
      }}
      onMouseEnter={triggerOn === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={triggerOn === 'hover' ? handleMouseLeave : undefined}
    >
      <div className="p-4">
        {children}
      </div>
      {arrow && (
        <div className={getArrowClasses()} />
      )}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
      >
        {trigger}
      </div>
      {typeof document !== 'undefined' && createPortal(popoverContent, document.body)}
    </>
  );
};

export default Popover;
