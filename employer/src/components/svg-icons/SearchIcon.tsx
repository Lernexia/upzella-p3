import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SearchIcon: React.FC<IconProps> = ({ 
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
              @keyframes searchPulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.1); }
              }
              @keyframes searchScan {
                0% { stroke-dasharray: 0 25; }
                50% { stroke-dasharray: 12.5 12.5; }
                100% { stroke-dasharray: 25 0; }
              }
              .search-indicator {
                animation: searchPulse 2s ease-in-out infinite;
              }
              .search-circle {
                animation: searchScan 3s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Search circle */}
      <circle 
        cx="11" 
        cy="11" 
        r="8" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
        className={animate ? "search-circle" : ""}
      />
      
      {/* Search handle */}
      <path 
        d="m21 21-4.35-4.35" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* AI search indicator */}
      <circle cx="11" cy="11" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
      <circle cx="11" cy="11" r="1" fill={color} opacity="0.4" className={animate ? "search-indicator" : ""}/>
    </svg>
  );
};

export default SearchIcon;
