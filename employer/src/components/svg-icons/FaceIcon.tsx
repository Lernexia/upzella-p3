import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const FaceIcon: React.FC<IconProps> = ({ 
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
              @keyframes faceAnimation {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
              @keyframes eyeBlink {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.1); }
              }
              @keyframes smileAnimation {
                0%, 100% { transform: scaleX(1); }
                50% { transform: scaleX(1.1); }
              }
              .face-circle {
                animation: faceAnimation 4s ease-in-out infinite;
              }
              .eye-circle {
                animation: eyeBlink 3s ease-in-out infinite;
              }
              .smile-path {
                animation: smileAnimation 4s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Face */}
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2" 
        fill="none" 
        className={animate ? "face-circle" : ""}
      />
      
      {/* Eyes */}
      <circle 
        cx="9" 
        cy="10" 
        r="1.2" 
        fill={color} 
        className={animate ? "eye-circle" : ""}
      />
      <circle 
        cx="15" 
        cy="10" 
        r="1.2" 
        fill={color} 
        className={animate ? "eye-circle" : ""}
        style={animate ? { animationDelay: '0.2s' } : {}}
      />
      
      {/* Smile */}
      <path 
        d="M9 15c1.2 1 4.8 1 6 0" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        className={animate ? "smile-path" : ""}
      />
    </svg>
  );
};

export default FaceIcon;
