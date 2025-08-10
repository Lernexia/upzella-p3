import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const LoadingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  animate = true // Loading icon should animate by default
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
        <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0"/>
          <stop offset="100%" stopColor={color} stopOpacity="1"/>
        </linearGradient>
      </defs>
      
      {/* Loading spinner */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        fill="none" 
        stroke="url(#loading-gradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Center dot */}
      <circle cx="12" cy="12" r="2" fill={color} opacity="0.3"/>
    </svg>
  );
};

export default LoadingIcon;
