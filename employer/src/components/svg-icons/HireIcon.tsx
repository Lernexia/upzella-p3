import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const HireIcon: React.FC<IconProps> = ({
  size = 24, 
  color = 'currentColor',
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="hire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* Success checkmark */}
      <path 
        d="m9 12 2 2 4-4" 
        fill="none" 
        stroke="url(#hire-gradient)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Professional badge circle */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        fill="none" 
        stroke="url(#hire-gradient)" 
        strokeWidth="2"
      />
      
      {/* Hire indicator stars */}
      <circle cx="18" cy="6" r="1" fill="url(#hire-gradient)" opacity="0.6"/>
      <circle cx="6" cy="18" r="1" fill="url(#hire-gradient)" opacity="0.6"/>
    </svg>
  );
};

export default HireIcon;
