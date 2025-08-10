import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const TrendUpIcon: React.FC<IconProps> = ({
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
              @keyframes trend-up {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
              }
              .trend-up-animate {
                animation: trend-up 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Simple trending line upward */}
      <path
        d="M3 17L9 11L15 13L21 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "trend-up-animate" : ""}
      />
      
      {/* Arrow pointing up */}
      <path
        d="M17 7L21 7L21 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default TrendUpIcon;
