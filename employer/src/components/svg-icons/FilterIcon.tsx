import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const FilterIcon: React.FC<IconProps> = ({
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
              @keyframes filter-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
              .filter-animate {
                animation: filter-bounce 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Filter funnel shape */}
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4C21 4.55228 20.5523 5 20 5H4C3.44772 5 3 4.55228 3 4Z"
        fill={color}
        className={animate ? "filter-animate" : ""}
      />
      <path
        d="M6 8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H7C6.44772 9 6 8.55228 6 8Z"
        fill={color}
        className={animate ? "filter-animate" : ""}
        style={animate ? { animationDelay: '0.2s' } : {}}
      />
      <path
        d="M9 12C9 11.4477 9.44772 11 10 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H10C9.44772 13 9 12.5523 9 12Z"
        fill={color}
        className={animate ? "filter-animate" : ""}
        style={animate ? { animationDelay: '0.4s' } : {}}
      />
      
      {/* Filter result indicator */}
      <circle
        cx="12"
        cy="17"
        r="2"
        fill={color}
        opacity="0.7"
        className={animate ? "filter-animate" : ""}
        style={animate ? { animationDelay: '0.6s' } : {}}
      />
    </svg>
  );
};

export default FilterIcon;
