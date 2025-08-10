import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ChevronUpIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  animate = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'animate-chevron-up' : ''} ${className}`}
    >
      {animate && (
        <defs>
          <style>
            {`
            
              @keyframes chevronPulseUp {
                0%, 100% { opacity: 0.7; stroke-width: 2; }
                50% { opacity: 1; stroke-width: 2.5; }
              }
              @keyframes chevronExpand {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              .animate-chevron-up {
                cursor: pointer;
                transition: all 0.3s ease-in-out;
              }
              .animate-chevron-up:hover {
                transform: translateY(-1px) scale(1.1);
              }
              .animate-chevron-up:active {
                transform: translateY(-2px) scale(0.95);
              }
              .animate-chevron-up path {
                animation: chevronPulseUp 2s ease-in-out infinite;
              }
              .animate-chevron-up:hover path {
                animation: chevronFloatUp 0.6s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      <path
        d="M18 15L12 9L6 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "chevron-path" : ""}
      />
 
    </svg>
  );
};

export default ChevronUpIcon;
