import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SaveIcon: React.FC<IconProps> = ({ 
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
              @keyframes drawOutline {
                0% { 
                  stroke-dasharray: 0 100;
                  opacity: 0.7;
                }
                50% { 
                  stroke-dasharray: 50 50;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 100 0;
                  opacity: 1;
                }
              }
              @keyframes drawSlot {
                0% { 
                  stroke-dasharray: 0 32;
                  opacity: 0.7;
                }
                50% { 
                  stroke-dasharray: 16 16;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 32 0;
                  opacity: 1;
                }
              }
              @keyframes drawLabel {
                0% { 
                  stroke-dasharray: 0 28;
                  opacity: 0.7;
                }
                50% { 
                  stroke-dasharray: 14 14;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 28 0;
                  opacity: 1;
                }
              }
              .disk-outline {
                animation: drawOutline 3s ease-in-out infinite;
                animation-delay: 0s;
              }
              .disk-slot {
                animation: drawSlot 3s ease-in-out infinite;
                animation-delay: 0s;
              }
              .save-label {
                animation: drawLabel 3s ease-in-out infinite;
                animation-delay: 0s;
              }
            `}
          </style>
        </defs>
      )}

      {/* Floppy disk outline */}
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "disk-outline" : ""}
      />
      
      {/* Disk slot */}
      <rect
        x="7"
        y="3"
        width="10"
        height="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "disk-slot" : ""}
      />
      
      {/* Save label */}
      <rect
        x="8"
        y="13"
        width="8"
        height="6"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "save-label" : ""}
      />
    </svg>
  );
};

export default SaveIcon;
     