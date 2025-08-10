import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SparkleIcon: React.FC<IconProps> = ({
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
              @keyframes sparkle {
                0%, 100% { opacity: 0.7; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
              }
              .sparkle-main {
                animation: sparkle 2s ease-in-out infinite;
              }
              .sparkle-small {
                animation: sparkle 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Large central sparkle */}
      <path
        d="M12 2L13.5 7.5L19 9L13.5 10.5L12 16L10.5 10.5L5 9L10.5 7.5L12 2Z"
        fill={color}
        fillOpacity="0.9"
        className={animate ? "sparkle-main" : ""}
      />
      
      {/* Medium sparkle - top right */}
      <path
        d="M18 4L18.8 6.2L21 7L18.8 7.8L18 10L17.2 7.8L15 7L17.2 6.2L18 4Z"
        fill={color}
        fillOpacity="0.7"
        className={animate ? "sparkle-small" : ""}
        style={animate ? { animationDelay: '0.5s' } : {}}
      />
      
      {/* Medium sparkle - bottom left */}
      <path
        d="M6 14L6.8 16.2L9 17L6.8 17.8L6 20L5.2 17.8L3 17L5.2 16.2L6 14Z"
        fill={color}
        fillOpacity="0.7"
        className={animate ? "sparkle-small" : ""}
        style={animate ? { animationDelay: '1s' } : {}}
      />
      
      {/* Small sparkle - top left */}
      <path
        d="M5 5L5.4 6.6L7 7L5.4 7.4L5 9L4.6 7.4L3 7L4.6 6.6L5 5Z"
        fill={color}
        fillOpacity="0.5"
        className={animate ? "sparkle-small" : ""}
        style={animate ? { animationDelay: '1.5s' } : {}}
      />
      
      {/* Small sparkle - bottom right */}
      <path
        d="M19 15L19.4 16.6L21 17L19.4 17.4L19 19L18.6 17.4L17 17L18.6 16.6L19 15Z"
        fill={color}
        fillOpacity="0.5"
        className={animate ? "sparkle-small" : ""}
        style={animate ? { animationDelay: '2s' } : {}}
      />
    </svg>
  );
};

export default SparkleIcon;
