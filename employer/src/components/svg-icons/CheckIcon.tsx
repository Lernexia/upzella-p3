import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CheckIcon: React.FC<IconProps> = ({ 
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
      className={className}    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes checkDraw {
                0% { 
                  stroke-dasharray: 0 50;
                  opacity: 0.3;
                }
                50% { 
                  stroke-dasharray: 25 25;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 50 0;
                  opacity: 1;
                }
              }
              @keyframes checkBounce {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                }
                20% { 
                  transform: scale(1.1) rotate(2deg);
                }
                40% { 
                  transform: scale(0.95) rotate(-1deg);
                }
                60% { 
                  transform: scale(1.05) rotate(1deg);
                }
                80% { 
                  transform: scale(0.98) rotate(-0.5deg);
                }
              }
              @keyframes checkGlow {
                0%, 100% { 
                  filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0));
                }
                50% { 
                  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6));
                }
              }
              @keyframes successPulse {
                0% { 
                  stroke: ${color};
                  stroke-width: 2;
                }
                30% { 
                  stroke: #22c55e;
                  stroke-width: 3;
                }
                60% { 
                  stroke: #16a34a;
                  stroke-width: 2.5;
                }
                100% { 
                  stroke: #22c55e;
                  stroke-width: 2;
                }
              }
              .check-mark {
                animation: 
                  checkDraw 2s ease-out infinite,
                  checkBounce 2s ease-in-out infinite,
                  checkGlow 2s ease-in-out infinite,
                  successPulse 2s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 0.3s, 0.5s, 0.8s;
              }
            `}
          </style>
        </defs>
      )}      {/* Checkmark */}
      <path 
        d="M20 6 9 17l-5-5" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "check-mark" : ""}
      />
    </svg>
  );
};

export default CheckIcon;
