import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const UserIcon: React.FC<IconProps> = ({ 
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
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes profileScan {
                0% { stroke-dasharray: 0 25; }
                50% { stroke-dasharray: 12.5 12.5; }
                100% { stroke-dasharray: 25 0; }
              }
              @keyframes userActivity {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
              }
              @keyframes candidateStatus {
                0%, 100% { stroke-width: 2; opacity: 0.8; }
                50% { stroke-width: 2.2; opacity: 1; }
              }
              .user-head {
                animation: profileScan 3s ease-in-out infinite;
              }
              .user-body {
                animation: candidateStatus 4s ease-in-out infinite;
              }
              .user-status {
                animation: userActivity 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
        {/* User head */}
      <circle 
        cx="12" 
        cy="8" 
        r="4" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        className={animate ? "user-head" : ""}
      />
      
      {/* User body */}
      <path 
        d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "user-body" : ""}
        style={animate ? { animationDelay: '0.5s' } : {}}
      />
      
      {/* Professional accent - Online/Active status */}
      {/* <circle cx="16" cy="6" r="1.5" fill={color} opacity="0.3" className={animate ? "user-status" : ""}/> */}
      
      {/* Skills/Rating indicator when animated */}
      {/* {animate && (
        <circle 
          cx="8" 
          cy="6" 
          r="1" 
          fill={color} 
          opacity="0.4"
          className="user-status"
          style={{ animationDelay: '1s' }}
        />
      )} */}
    </svg>
  );
};

export default UserIcon;
