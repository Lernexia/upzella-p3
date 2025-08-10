import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const LogoutIcon: React.FC<IconProps> = ({ 
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
      className={className}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes slideOut {
                0%, 100% { 
                  transform: translateX(0);
                }
                50% { 
                  transform: translateX(2px);
                }
              }
              .logout-animated {
                animation: slideOut 1.5s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}

      <g className={animate ? 'logout-animated' : ''}>
        {/* Door Frame */}
        <rect 
          x="3" 
          y="4" 
          width="8" 
          height="16" 
          rx="1" 
          stroke={color} 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Exit Arrow */}
        <path 
          d="M14 12h6m0 0l-3-3m3 3l-3 3" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Person Icon */}
        <circle 
          cx="7" 
          cy="9" 
          r="1.5" 
          fill={color}
          opacity="0.8"
        />
        <path 
          d="M5 15c0-1.1 0.9-2 2-2s2 0.9 2 2" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </g>
    </svg>
  );
};

export default LogoutIcon;
