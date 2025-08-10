import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const TrendDownIcon: React.FC<IconProps> = ({
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
              @keyframes trend-down {
                0% { opacity: 1; }
                50% { opacity: 0.6; }
                100% { opacity: 1; }
              }
              .trend-down-animate {
                animation: trend-down 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Simple trending line downward */}
      <path
        d="M3 7L9 13L15 11L21 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "trend-down-animate" : ""}
      />
      
      {/* Arrow pointing down */}
      <path
        d="M17 17L21 17L21 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default TrendDownIcon;
