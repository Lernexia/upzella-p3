import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const MessageIcon: React.FC<IconProps> = ({ 
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
              @keyframes messageFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-2px); }
              }
              @keyframes messageType {
                0% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0.8; transform: scale(1); }
              }
              @keyframes messageBubble {
                0%, 100% { stroke-width: 2; }
                50% { stroke-width: 2.5; }
              }
              .message-bubble {
                animation: messageFloat 3s ease-in-out infinite, messageBubble 2s ease-in-out infinite;
              }
              .message-dots {
                animation: messageType 1.5s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Message bubble */}
      <path 
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "message-bubble" : ""}
      />
      
      {/* Message dots */}
      <circle 
        cx="9" 
        cy="10" 
        r="1" 
        fill={color}
        className={animate ? "message-dots" : ""}
      />
      <circle 
        cx="12" 
        cy="10" 
        r="1" 
        fill={color}
        className={animate ? "message-dots" : ""}
        style={animate ? { animationDelay: '0.2s' } : {}}
      />
      <circle 
        cx="15" 
        cy="10" 
        r="1" 
        fill={color}
        className={animate ? "message-dots" : ""}
        style={animate ? { animationDelay: '0.4s' } : {}}
      />
      
      {/* Notification indicator when animated */}
      {animate && (
        <circle 
          cx="18" 
          cy="6" 
          r="2" 
          fill="#EF4444" 
          opacity="0.8"
          className="message-dots"
          style={{ animationDelay: '0.6s' }}
        />
      )}
    </svg>
  );
};

export default MessageIcon;
