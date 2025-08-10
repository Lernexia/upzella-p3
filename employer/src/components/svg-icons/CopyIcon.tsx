import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CopyIcon: React.FC<IconProps> = ({ 
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
              @keyframes copyFloat {
                0%, 100% { 
                  transform: translate(0, 0);
                  opacity: 1;
                }
                50% { 
                  transform: translate(1px, -1px);
                  opacity: 0.8;
                }
              }
              @keyframes copyGlow {
                0%, 100% { 
                  opacity: 0.7;
                }
                50% { 
                  opacity: 1;
                }
              }
              .copy-back {
                animation: copyGlow 2s ease-in-out infinite;
              }
              .copy-front {
                animation: copyFloat 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Back document (behind) */}
      <rect
        x="4"
        y="6"
        width="12"
        height="15"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animate ? 'copy-back' : ''}
      />
      
      {/* Front document (in front) */}
      <rect
        x="8"
        y="2"
        width="12"
        height="15"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animate ? 'copy-front' : ''}
      />
      
      {/* Simple content lines */}
      <line
        x1="11"
        y1="6"
        x2="17"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="9"
        x2="16"
        y2="9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="12"
        x2="17"
        y2="12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CopyIcon;
