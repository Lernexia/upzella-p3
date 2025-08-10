import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const NavigationIcon: React.FC<IconProps> = ({ 
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
              @keyframes menuSlide {
                0% { 
                  stroke-dasharray: 0 36;
                  opacity: 0.5;
                }
                50% { 
                  stroke-dasharray: 18 18;
                  opacity: 0.8;
                }
                100% { 
                  stroke-dasharray: 36 0;
                  opacity: 1;
                }
              }
              @keyframes menuHover {
                0%, 100% { 
                  transform: translateX(0px) scaleX(1);
                  opacity: 1;
                }
                50% { 
                  transform: translateX(2px) scaleX(1.05);
                  opacity: 0.8;
                }
              }
              @keyframes arrowMove {
                0%, 100% { 
                  transform: translateX(0px);
                  opacity: 0.6;
                }
                50% { 
                  transform: translateX(2px);
                  opacity: 1;
                }
              }
              @keyframes arrowMoveLeft {
                0%, 100% { 
                  transform: translateX(0px);
                  opacity: 0.6;
                }
                50% { 
                  transform: translateX(-2px);
                  opacity: 1;
                }
              }
              @keyframes navPulse {
                0%, 100% { 
                  stroke-width: 2;
                }
                50% { 
                  stroke-width: 2.5;
                }
              }
              .menu-bar {
                animation: 
                  menuSlide 3s ease-in-out infinite,
                  navPulse 4s ease-in-out infinite;
                transform-origin: left center;
              }
              .menu-bar-1 { 
                animation-delay: 0s, 0s; 
              }
              .menu-bar-2 { 
                animation-delay: 0.5s, 1s;
                animation: 
                  menuSlide 3s ease-in-out infinite,
                  menuHover 3s ease-in-out infinite,
                  navPulse 4s ease-in-out infinite;
              }
              .menu-bar-3 { 
                animation-delay: 1s, 2s; 
              }
              .nav-arrow-right {
                animation: arrowMove 2s ease-in-out infinite;
                animation-delay: 1.5s;
              }
              .nav-arrow-left {
                animation: arrowMoveLeft 2s ease-in-out infinite;
                animation-delay: 2.5s;
              }
            `}
          </style>
        </defs>
      )}

      {/* Navigation menu bars - hamburger style */}
      <path
        d="M3 6H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className={animate ? "menu-bar menu-bar-1" : ""}
      />
      <path
        d="M3 12H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className={animate ? "menu-bar menu-bar-2" : ""}
      />
      <path
        d="M3 18H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className={animate ? "menu-bar menu-bar-3" : ""}
      />
      
      {/* Navigation arrows indicating movement */}
      <path
        d="M17 8L19 6L17 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
        className={animate ? "nav-arrow-right" : ""}
      />
      
      <path
        d="M7 16L5 18L7 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
        className={animate ? "nav-arrow-left" : ""}
      />
    </svg>
  );
};

export default NavigationIcon;
