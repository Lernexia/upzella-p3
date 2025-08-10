import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const InputIcon: React.FC<IconProps> = ({ 
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
              @keyframes cursorBlink {
                0%, 50% { 
                  opacity: 1;
                }
                51%, 100% { 
                  opacity: 0;
                }
              }
              @keyframes typingEffect {
                0% { 
                  stroke-dasharray: 0 20;
                  opacity: 0.3;
                }
                50% { 
                  stroke-dasharray: 10 10;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 20 0;
                  opacity: 1;
                }
              }
              @keyframes inputFocus {
                0%, 100% { 
                  stroke-width: 1.5;
                  opacity: 1;
                }
                50% { 
                  stroke-width: 2;
                  opacity: 0.8;
                }
              }
              .input-field {
                animation: inputFocus 4s ease-in-out infinite;
              }
              .cursor {
                animation: cursorBlink 1s ease-in-out infinite;
              }
              .typing-line {
                animation: typingEffect 3s ease-in-out infinite;
              }
              .typing-line-1 { animation-delay: 0s; }
              .typing-line-2 { animation-delay: 1.5s; }
            `}
          </style>
        </defs>
      )}

      {/* Input field border */}
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        className={animate ? "input-field" : ""}
      />
      
      {/* Cursor */}
      <path
        d="M7 10L7 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        className={animate ? "cursor" : ""}
      />
      
      {/* Text lines */}
      <path
        d="M10 10H17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        className={animate ? "typing-line typing-line-1" : ""}
      />
      <path
        d="M10 14H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        className={animate ? "typing-line typing-line-2" : ""}
      />
      
      {/* Status indicator */}
      <circle
        cx="18"
        cy="7"
        r="1"
        fill={color}
      />
    </svg>
  );
};

export default InputIcon;
