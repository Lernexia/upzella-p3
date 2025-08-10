import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const TabSwitchIcon: React.FC<IconProps> = ({ 
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
              @keyframes tabSlide {
                0% { transform: translateX(0); }
                50% { transform: translateX(2px); }
                100% { transform: translateX(0); }
              }
              @keyframes indicatorPulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
              .tab-upper {
                animation: tabSlide 3s ease-in-out infinite;
              }
              .tab-lower {
                animation: tabSlide 3s ease-in-out infinite;
                animation-delay: 0.5s;
              }
              .tab-indicator {
                animation: indicatorPulse 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Upper tab */}
      <rect 
        x="3" 
        y="5" 
        width="18" 
        height="6" 
        rx="2" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        className={animate ? "tab-upper" : ""}
      />
      
      {/* Lower tab */}
      <rect 
        x="3" 
        y="13" 
        width="12" 
        height="6" 
        rx="2" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        className={animate ? "tab-lower" : ""}
      />
      
      {/* Indicators */}
      <path 
        d="M19 16v-2" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        className={animate ? "tab-indicator" : ""}
      />
      <path 
        d="M19 19v-1" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        className={animate ? "tab-indicator" : ""}
        style={animate ? { animationDelay: '0.5s' } : {}}
      />
    </svg>
  );
};

export default TabSwitchIcon;
