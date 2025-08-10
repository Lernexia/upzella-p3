import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ShieldIcon: React.FC<IconProps> = ({ 
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
              @keyframes shieldPulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
              }
              @keyframes shieldGlow {
                0%, 100% { stroke-width: 2; opacity: 0.6; }
                50% { stroke-width: 2.5; opacity: 1; }
              }
              @keyframes securityScan {
                0% { stroke-dasharray: 0 30; }
                50% { stroke-dasharray: 15 15; }
                100% { stroke-dasharray: 30 0; }
              }
              .shield-main {
                animation: shieldPulse 3s ease-in-out infinite;
              }
              .shield-check {
                animation: shieldGlow 2s ease-in-out infinite;
              }
              .shield-border {
                animation: securityScan 4s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Shield outline */}
      <path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "shield-main" : ""}
      />
      
      {/* Shield border effect when animated */}
      {animate && (
        <path 
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
          fill="none" 
          stroke={color} 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="shield-border"
          opacity="0.4"
        />
      )}
      
      {/* Check mark */}
      <path 
        d="M9 12l2 2 4-4" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "shield-check" : ""}
        style={animate ? { animationDelay: '0.5s' } : {}}
      />
      
      {/* Security dots when animated */}
      {animate && (
        <>
          <circle 
            cx="8" 
            cy="8" 
            r="0.5" 
            fill={color} 
            opacity="0.6"
            className="shield-check"
            style={{ animationDelay: '1s' }}
          />
          <circle 
            cx="16" 
            cy="8" 
            r="0.5" 
            fill={color} 
            opacity="0.6"
            className="shield-check"
            style={{ animationDelay: '1.2s' }}
          />
        </>
      )}
    </svg>
  );
};

export default ShieldIcon;
