import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const AudioIcon: React.FC<IconProps> = ({ 
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
              @keyframes speakerPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.95); }
              }
              @keyframes volumeWave {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
              }
              @keyframes barVibrate {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.9); }
              }
              .speaker-box {
                animation: speakerPulse 1.5s ease-in-out infinite;
              }
              .speaker-bar {
                animation: barVibrate 0.8s ease-in-out infinite;
              }
              .volume-wave {
                animation: volumeWave 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Speaker box */}
      <rect 
        x="4" 
        y="9" 
        width="5" 
        height="6" 
        rx="1.5" 
        fill={color} 
        className={animate ? "speaker-box" : ""}
      />
      
      {/* Speaker bar */}
      <rect 
        x="9" 
        y="7" 
        width="2" 
        height="10" 
        rx="1" 
        fill={color} 
        className={animate ? "speaker-bar" : ""}
      />
      
      {/* Volume wave */}
      <path 
        d="M15 12c0-2.21 1.79-4 4-4v8c-2.21 0-4-1.79-4-4z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        className={animate ? "volume-wave" : ""}
      />
    </svg>
  );
};

export default AudioIcon;
