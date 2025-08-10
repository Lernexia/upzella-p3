import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CodeIcon: React.FC<IconProps> = ({ 
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
              @keyframes codePulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              @keyframes codeType {
                0% { stroke-dasharray: 0 20; }
                50% { stroke-dasharray: 10 10; }
                100% { stroke-dasharray: 20 0; }
              }
              .code-brackets {
                animation: codePulse 2s ease-in-out infinite;
              }
              .code-lines {
                animation: codeType 3s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Left bracket */}
      <path 
        d="M16 18l6-6-6-6" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "code-brackets" : ""}
      />
      
      {/* Right bracket */}
      <path 
        d="M8 6l-6 6 6 6" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "code-brackets" : ""}
        style={animate ? { animationDelay: '0.3s' } : {}}
      />
      
      {/* Code lines */}
      {animate && (
        <>
          <line 
            x1="10" 
            y1="9" 
            x2="14" 
            y2="9" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            className="code-lines"
            opacity="0.7"
            style={{ animationDelay: '0.6s' }}
          />
          <line 
            x1="10" 
            y1="12" 
            x2="16" 
            y2="12" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            className="code-lines"
            opacity="0.5"
            style={{ animationDelay: '0.9s' }}
          />
          <line 
            x1="10" 
            y1="15" 
            x2="13" 
            y2="15" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            className="code-lines"
            opacity="0.6"
            style={{ animationDelay: '1.2s' }}
          />
        </>
      )}
    </svg>
  );
};

export default CodeIcon;
