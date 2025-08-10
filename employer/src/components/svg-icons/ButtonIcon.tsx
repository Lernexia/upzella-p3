import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ButtonIcon: React.FC<IconProps> = ({
  size = 24, 
  color = 'currentColor',
  className = '',
  animate = false
}) => {  return (
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
              @keyframes buttonPress {
                0%, 100% { 
                  transform: scale(1) translateY(0px);
                  opacity: 0.8;
                }
                50% { 
                  transform: scale(0.95) translateY(1px);
                  opacity: 1;
                }
              }
              @keyframes buttonHover {
                0%, 100% { 
                  transform: scale(1);
                  filter: brightness(1);
                }
                50% { 
                  transform: scale(1.02);
                  filter: brightness(1.1);
                }
              }
              .primary-button {
                animation: buttonPress 3s ease-in-out infinite;
                transform-origin: center center;
              }
              .secondary-button {
                animation: buttonHover 3s ease-in-out infinite;
                animation-delay: 1.5s;
                transform-origin: center center;
              }
            `}
          </style>
        </defs>
      )}

      {/* Primary Button */}
      <rect
        x="2"
        y="4"
        width="20"
        height="6"
        rx="3"
        fill={color}
        fillOpacity="0.8"
        className={animate ? "primary-button" : ""}
      />
      <text
        x="12"
        y="8"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontWeight="500"
        className={animate ? "primary-button" : ""}
      >
        Button
      </text>
      
      {/* Secondary Button */}
      <rect
        x="2"
        y="14"
        width="20"
        height="6"
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.8"
        className={animate ? "secondary-button" : ""}
      />
      <text
        x="12"
        y="18"
        textAnchor="middle"
        fontSize="3"
        fill={color}
        fontWeight="500"
        fillOpacity="0.8"
        className={animate ? "secondary-button" : ""}
      >
        Button
      </text>
    </svg>
  );
};

export default ButtonIcon;
