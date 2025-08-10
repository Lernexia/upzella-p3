import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CompanyIcon: React.FC<IconProps> = ({ 
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
              @keyframes buildingGlow {
                0%, 100% { stroke-opacity: 0.8; }
                50% { stroke-opacity: 1; }
              }
              @keyframes windowLights {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.8; }
              }
              @keyframes companyActivity {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
              }
              @keyframes elevatorMove {
                0%, 100% { transform: translateY(0); opacity: 0.3; }
                25% { transform: translateY(-2px); opacity: 0.8; }
                50% { transform: translateY(-4px); opacity: 1; }
                75% { transform: translateY(-2px); opacity: 0.8; }
              }
              .building-structure {
                animation: buildingGlow 4s ease-in-out infinite;
              }
              .window-light {
                animation: windowLights 3s ease-in-out infinite;
              }
              .company-logo {
                animation: companyActivity 2.5s ease-in-out infinite;
              }
              .elevator-indicator {
                animation: elevatorMove 3s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Building */}
      <path 
        d="M3 21h18" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M5 21V7l8-4v18" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "building-structure" : ""}
      />
      <path 
        d="M13 9h8v12" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "building-structure" : ""}
        style={animate ? { animationDelay: '0.5s' } : {}}
      />
      
      {/* Windows with animated lights */}
      <rect 
        x="9" 
        y="9" 
        width="2" 
        height="2" 
        fill={color} 
        opacity="0.4"
        className={animate ? "window-light" : ""}
        style={animate ? { animationDelay: '0s' } : {}}
      />
      <rect 
        x="9" 
        y="13" 
        width="2" 
        height="2" 
        fill={color} 
        opacity="0.4"
        className={animate ? "window-light" : ""}
        style={animate ? { animationDelay: '1s' } : {}}
      />
      <rect 
        x="15" 
        y="13" 
        width="2" 
        height="2" 
        fill={color} 
        opacity="0.4"
        className={animate ? "window-light" : ""}
        style={animate ? { animationDelay: '1.5s' } : {}}
      />
      <rect 
        x="17" 
        y="13" 
        width="2" 
        height="2" 
        fill={color} 
        opacity="0.4"
        className={animate ? "window-light" : ""}
        style={animate ? { animationDelay: '2s' } : {}}
      />
      
      {/* Additional animated elements when animate is true */}
      {animate && (
        <>
          {/* Company logo/sign */}
          <circle 
            cx="7" 
            cy="5" 
            r="1" 
            fill={color} 
            opacity="0.6"
            className="company-logo"
          />
          
          {/* Elevator indicator */}
          <rect 
            x="6" 
            y="16" 
            width="1" 
            height="1" 
            fill={color} 
            opacity="0.5"
            className="elevator-indicator"
          />
          
          {/* More office windows */}
          <rect 
            x="15" 
            y="15" 
            width="2" 
            height="2" 
            fill={color} 
            opacity="0.3"
            className="window-light"
            style={{ animationDelay: '2.5s' }}
          />
          <rect 
            x="17" 
            y="15" 
            width="2" 
            height="2" 
            fill={color} 
            opacity="0.3"
            className="window-light"
            style={{ animationDelay: '3s' }}
          />
        </>
      )}
    </svg>
  );
};

export default CompanyIcon;
