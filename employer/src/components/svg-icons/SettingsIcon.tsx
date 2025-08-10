import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SettingsIcon: React.FC<IconProps> = ({
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
              @keyframes settings-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .settings-animate {
                animation: settings-rotate 4s linear infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>
      )}      {/* Simple gear outline */}
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animate ? "settings-animate" : ""}
      />
      
      {/* Gear teeth */}
      <path
        d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className={animate ? "settings-animate" : ""}
      />
      
      {/* Center dot */}
      <circle
        cx="12"
        cy="12"
        r="1"
        fill={color}
      />
    </svg>
  );
};

export default SettingsIcon;
