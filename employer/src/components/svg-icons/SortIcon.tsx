import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SortIcon: React.FC<IconProps> = ({
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
              @keyframes sort-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
              .sort-animate {
                animation: sort-bounce 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Sort arrows */}
      <path
        d="M8 9l4-4 4 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "sort-animate" : ""}
      />
      <path
        d="M8 15l4 4 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "sort-animate" : ""}
      />
    </svg>
  );
};

export default SortIcon;
