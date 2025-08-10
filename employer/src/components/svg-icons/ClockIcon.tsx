import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ClockIcon: React.FC<IconProps> = ({ 
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
              @keyframes clockRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes clockTick {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(90deg); }
                50% { transform: rotate(180deg); }
                75% { transform: rotate(270deg); }
              }
              @keyframes clockPulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
              }
              .clock-face {
                animation: clockPulse 4s ease-in-out infinite;
              }
              .hour-hand {
                transform-origin: center;
                animation: clockRotate 12s linear infinite;
              }
              .minute-hand {
                transform-origin: center;
                animation: clockRotate 3s linear infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Clock face */}
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "clock-face" : ""}
      />
      
      {/* Clock markings */}
      <line 
        x1="12" 
        y1="6" 
        x2="12" 
        y2="7.5" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <line 
        x1="12" 
        y1="16.5" 
        x2="12" 
        y2="18" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <line 
        x1="6" 
        y1="12" 
        x2="7.5" 
        y2="12" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <line 
        x1="16.5" 
        y1="12" 
        x2="18" 
        y2="12" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Clock hands */}
      <line 
        x1="12" 
        y1="12" 
        x2="12" 
        y2="8" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        className={animate ? "hour-hand" : ""}
        transform={!animate ? "rotate(-30 12 12)" : ""}
      />
      <line 
        x1="12" 
        y1="12" 
        x2="16" 
        y2="12" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round"
        className={animate ? "minute-hand" : ""}
        transform={!animate ? "rotate(60 12 12)" : ""}
      />
      
      {/* Clock center */}
      <circle 
        cx="12" 
        cy="12" 
        r="1" 
        fill={color} 
      />
    </svg>
  );
};

export default ClockIcon;