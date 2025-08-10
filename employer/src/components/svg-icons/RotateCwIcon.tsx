import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const RotateCwIcon: React.FC<IconProps> = ({
  size = 15, 
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
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes rotate-cw {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .rotate-cw-animate {
                animation: rotate-cw 3s linear infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Simple refresh arrow */}
      <path
        d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "rotate-cw-animate" : ""}
      />
    </svg>
  );
};

export default RotateCwIcon;
