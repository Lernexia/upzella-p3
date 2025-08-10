'use client';

import React from 'react';
import Link from 'next/link';
import ChevronDownIcon from '@/components/svg-icons/ChevronDownIcon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'colored';
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className = '',
  variant = 'default'
}) => {
  const defaultSeparator = (
    <ChevronDownIcon 
      size={16}
      className="text-gray-400 rotate-[-90deg]" 
    />
  );

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'text-sm text-gray-500';
      case 'colored':
        return 'text-sm';
      default:
        return 'text-sm text-gray-700';
    }
  };

  const getLinkClasses = (isActive: boolean) => {
    if (variant === 'colored') {
      return isActive 
        ? 'text-purple-600 font-semibold' 
        : 'text-blue-600 hover:text-blue-800 font-accent transition-colors';
    }
    
    return isActive 
      ? 'text-gray-500 font-body cursor-default' 
      : 'text-blue-600 hover:text-blue-800 font-accent transition-colors';
  };

  return (
    <nav 
      className={`flex items-center space-x-2 ${getVariantClasses()} ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="flex items-center">
              {separator || defaultSeparator}
            </span>
          )}
          
          {item.href && !item.isActive ? (
            <Link 
              href={item.href}
              className={getLinkClasses(false)}
            >
              {item.label}
            </Link>
          ) : (
            <span className={getLinkClasses(item.isActive || false)}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
