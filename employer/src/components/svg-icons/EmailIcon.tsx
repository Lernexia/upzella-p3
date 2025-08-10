import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const EmailIcon: React.FC<IconProps> = ({ 
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
              @keyframes emailTopFlap {
                0%, 100% { transform: rotateX(0deg); }
                25% { transform: rotateX(-45deg); }
                50% { transform: rotateX(-60deg); }
                75% { transform: rotateX(-45deg); }
              }
              @keyframes emailContent {
                0%, 25% { opacity: 0; transform: translateY(3px); }
                50%, 75% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(3px); }
              }
              @keyframes newEmailPulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.4); }
              }
              .email-top-flap {
                transform-origin: 12px 7px;
                animation: emailTopFlap 4s ease-in-out infinite;
              }
              .email-content {
                animation: emailContent 4s ease-in-out infinite;
              }
              .email-notification {
                animation: newEmailPulse 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Email envelope base */}
      <rect 
        x="2" 
        y="4" 
        width="20" 
        height="16" 
        rx="2" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
      />
      
      {/* Email back flap (static) */}
      <path 
        d="m2 7 10 6 10-6" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.3"
      />
      
      {/* Email top flap - animated opening/closing */}
      <path 
        d="M2 7 L12 13 L22 7" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "email-top-flap" : ""}
      />
      
      {/* Email content lines - appear when opening */}
      {animate && (
        <>
          <line 
            x1="5" 
            y1="11" 
            x2="15" 
            y2="11" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.6"
            className="email-content"
          />
          <line 
            x1="5" 
            y1="13" 
            x2="19" 
            y2="13" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.6"
            className="email-content"
            style={{ animationDelay: '0.2s' }}
          />
          <line 
            x1="5" 
            y1="15" 
            x2="12" 
            y2="15" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.6"
            className="email-content"
            style={{ animationDelay: '0.4s' }}
          />
        </>
      )}
      
      {/* New email notification indicator */}
      <circle 
        cx="18" 
        cy="6" 
        r="1" 
        fill={color} 
        opacity="0.4" 
        className={animate ? "email-notification" : ""}
      />
    </svg>
  );
};

export default EmailIcon;
