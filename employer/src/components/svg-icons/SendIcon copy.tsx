import React from 'react';
import { IconProps } from '@/types/props/common/IconProps.types';

const SendIcon: React.FC<IconProps> = ({
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
              @keyframes send-fly {
                0% { transform: translateX(0) translateY(0); opacity: 1; }
                50% { transform: translateX(3px) translateY(-2px); opacity: 0.8; }
                100% { transform: translateX(0) translateY(0); opacity: 1; }
              }
              @keyframes send-trail {
                0%, 100% { opacity: 0; }
                50% { opacity: 0.6; }
              }
              .send-animate {
                animation: send-fly 1.5s ease-in-out infinite;
              }
              .send-trail {
                animation: send-trail 1.5s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Paper plane */}
      <path
        d="M2 12L22 2L18 10H10L2 12Z"
        fill={color}
        className={animate ? "send-animate" : ""}
      />
      <path
        d="M10 10V16L14 12"
        fill={color}
        className={animate ? "send-animate" : ""}
      />
      <path
        d="M22 2L14 22L10 16"
        fill={color}
        className={animate ? "send-animate" : ""}
      />
      
      {/* Animated trail effect */}
      {animate && (
        <>
          <circle
            cx="6"
            cy="11"
            r="0.5"
            fill={color}
            opacity="0"
            className="send-trail"
            style={{ animationDelay: '0.2s' }}
          />
          <circle
            cx="4"
            cy="12"
            r="0.5"
            fill={color}
            opacity="0"
            className="send-trail"
            style={{ animationDelay: '0.4s' }}
          />
          <circle
            cx="2"
            cy="13"
            r="0.5"
            fill={color}
            opacity="0"
            className="send-trail"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
    </svg>
  );
};

export default SendIcon;
