import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ArrowLeftIcon: React.FC<IconProps> = ({ 
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
      xmlns="http://www.w3.org/2000/svg"      className={className}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes arrowDrawLeft {
                0% { 
                  stroke-dasharray: 0 30;
                  opacity: 0.3;
                }
                50% { 
                  stroke-dasharray: 15 15;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 30 0;
                  opacity: 1;
                }
              }
              @keyframes arrowHeadDrawLeft {
                0%, 40% { 
                  stroke-dasharray: 0 20;
                  opacity: 0.3;
                }
                70% { 
                  stroke-dasharray: 10 10;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 20 0;
                  opacity: 1;
                }
              }
              @keyframes arrowMoveLeft {
                0%, 100% { 
                  transform: translateX(0px);
                }
                25% { 
                  transform: translateX(-2px);
                }
                75% { 
                  transform: translateX(1px);
                }
              }
              @keyframes arrowPulseLeft {
                0%, 100% { 
                  stroke-width: 2;
                }
                50% { 
                  stroke-width: 2.5;
                }
              }
              @keyframes arrowPointLeft {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                }
                30% { 
                  transform: scale(1.1) rotate(-2deg);
                }
                70% { 
                  transform: scale(0.95) rotate(1deg);
                }
              }
              .arrow-line-left {
                animation: 
                  arrowDrawLeft 2.5s ease-out infinite,
                  arrowMoveLeft 2.5s ease-in-out infinite,
                  arrowPulseLeft 2.5s ease-in-out infinite;
                animation-delay: 0s, 0.5s, 1s;
              }
              .arrow-head-left {
                animation: 
                  arrowHeadDrawLeft 2.5s ease-out infinite,
                  arrowMoveLeft 2.5s ease-in-out infinite,
                  arrowPulseLeft 2.5s ease-in-out infinite,
                  arrowPointLeft 2.5s ease-in-out infinite;
                transform-origin: 5px 12px;
                animation-delay: 0s, 0.5s, 1s, 1.2s;
              }
            `}
          </style>
        </defs>
      )}      {/* Arrow line */}
      <line 
        x1="19" 
        y1="12" 
        x2="5" 
        y2="12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "arrow-line-left" : ""}
      />
      
      {/* Arrow head */}
      <polyline 
        points="12,19 5,12 12,5" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "arrow-head-left" : ""}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
