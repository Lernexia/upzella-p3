import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const PhoneIcon: React.FC<IconProps> = ({ 
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
              @keyframes phoneRing {
                0%, 100% { transform: rotate(0deg); }
                10% { transform: rotate(-3deg); }
                20% { transform: rotate(3deg); }
                30% { transform: rotate(-3deg); }
                40% { transform: rotate(3deg); }
                50% { transform: rotate(0deg); }
              }
              @keyframes signalWave {
                0% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 0.8; transform: scale(1.2); }
                100% { opacity: 0; transform: scale(1.5); }
              }
              @keyframes callPulse {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.1); }
              }
              .phone-body {
                transform-origin: center;
                animation: phoneRing 2s ease-in-out infinite;
              }
              .signal-wave {
                animation: signalWave 2s ease-out infinite;
              }
              .call-indicator {
                animation: callPulse 1.5s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Phone body */}
      <path 
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "phone-body" : ""}
      />
      
      {/* Signal waves - appear when animated */}
      {animate && (
        <>
          <circle 
            cx="16" 
            cy="8" 
            r="2" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.6"
            className="signal-wave"
            style={{ animationDelay: '0s' }}
          />
          <circle 
            cx="16" 
            cy="8" 
            r="3.5" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.4"
            className="signal-wave"
            style={{ animationDelay: '0.3s' }}
          />
          <circle 
            cx="16" 
            cy="8" 
            r="5" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.3"
            className="signal-wave"
            style={{ animationDelay: '0.6s' }}
          />
          
          {/* Call indicator dot */}
          <circle 
            cx="18" 
            cy="6" 
            r="1" 
            fill={color} 
            opacity="0.7"
            className="call-indicator"
          />
        </>
      )}
    </svg>
  );
};

export default PhoneIcon;
