import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CrossIcon: React.FC<IconProps> = ({ 
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
      xmlns="http://www.w3.org/2000/svg"      className={className}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes crossDraw1 {
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
              @keyframes crossDraw2 {
                0%, 40% { 
                  stroke-dasharray: 0 20;
                  opacity: 0.3;
                }
                70% { 
                  stroke-dasharray: 10 10;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 20 0;
                  opacity: 1;
                }
              }
              @keyframes crossShake {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                }
                10% { 
                  transform: scale(1.05) rotate(-2deg);
                }
                30% { 
                  transform: scale(0.95) rotate(1deg);
                }
                50% { 
                  transform: scale(1.08) rotate(-1deg);
                }
                70% { 
                  transform: scale(0.98) rotate(1.5deg);
                }
                90% { 
                  transform: scale(1.02) rotate(-0.5deg);
                }
              }
              @keyframes errorGlow {
                0%, 100% { 
                  filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0));
                }
                50% { 
                  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6));
                }
              }
              @keyframes errorPulse {
                0% { 
                  stroke: ${color};
                  stroke-width: 2;
                }
                30% { 
                  stroke: #ef4444;
                  stroke-width: 3;
                }
                60% { 
                  stroke: #dc2626;
                  stroke-width: 2.5;
                }
                100% { 
                  stroke: #ef4444;
                  stroke-width: 2;
                }
              }
              @keyframes crossStrike {
                0%, 80% { 
                  transform: scale(1);
                }
                85% { 
                  transform: scale(1.15);
                }
                90% { 
                  transform: scale(0.9);
                }
                95% { 
                  transform: scale(1.05);
                }
                100% { 
                  transform: scale(1);
                }
              }
              .cross-line-1 {
                animation: 
                  crossDraw1 2.5s ease-out infinite,
                  crossShake 2.5s ease-in-out infinite,
                  errorGlow 2.5s ease-in-out infinite,
                  errorPulse 2.5s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 0.5s, 0.8s, 1s;
              }
              .cross-line-2 {
                animation: 
                  crossDraw2 2.5s ease-out infinite,
                  crossShake 2.5s ease-in-out infinite,
                  errorGlow 2.5s ease-in-out infinite,
                  errorPulse 2.5s ease-in-out infinite,
                  crossStrike 2.5s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 0.5s, 0.8s, 1s, 1.5s;
              }
            `}
          </style>
        </defs>
      )}      {/* Cross lines */}
      <line 
        x1="18" 
        y1="6" 
        x2="6" 
        y2="18" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "cross-line-1" : ""}
      />
      <line 
        x1="6" 
        y1="6" 
        x2="18" 
        y2="18" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "cross-line-2" : ""}
      />
    </svg>
  );
};

export default CrossIcon;
