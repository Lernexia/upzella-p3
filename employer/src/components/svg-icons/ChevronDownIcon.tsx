import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ChevronDownIcon: React.FC<IconProps> = ({ 
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
      className={`${animate ? 'animate-chevron-down' : ''} ${className}`}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes chevronBounce {
                0%, 100% { transform: translateY(0); opacity: 0.8; }
                50% { transform: translateY(2px); opacity: 1; }
              }
              @keyframes chevronPulse {
                0%, 100% { opacity: 0.7; stroke-width: 2; }
                50% { opacity: 1; stroke-width: 2.5; }
              }
              @keyframes chevronGlow {
                0%, 100% { filter: drop-shadow(0 0 0 ${color}); }
                50% { filter: drop-shadow(0 0 4px ${color}); }
              }
              .animate-chevron-down {
                cursor: pointer;
                transition: all 0.3s ease-in-out;
              }
              .animate-chevron-down:hover {
                transform: translateY(1px) scale(1.1);
              }
              .animate-chevron-down:active {
                transform: translateY(2px) scale(0.95);
              }
              .animate-chevron-down path {
                animation: chevronPulse 2s ease-in-out infinite;
              }
              .animate-chevron-down:hover path {
                animation: chevronBounce 0.6s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "chevron-path" : ""}
      />
      
      {/* Additional animated elements when animate is true */}
 
    </svg>
  );
};

export default ChevronDownIcon;
