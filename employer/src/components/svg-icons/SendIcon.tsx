import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SendIcon: React.FC<IconProps> = ({
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
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes send-pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
              .send-animate {
                animation: send-pulse 2s ease-in-out infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Simple paper plane */}
      <path
        d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
        fill={color}
        className={animate ? "send-animate" : ""}
      />
    </svg>
  );
};

export default SendIcon;
