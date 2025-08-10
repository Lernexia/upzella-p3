import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ViewIcon: React.FC<IconProps> = ({ 
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
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes naturalBlink {
                0%, 85%, 100% { 
                  transform: scaleY(1);
                  opacity: 1;
                }
                90% { 
                  transform: scaleY(0.05);
                  opacity: 1;
                }
                95% { 
                  transform: scaleY(0.02);
                  opacity: 1;
                }
                97% { 
                  transform: scaleY(0.3);
                  opacity: 1;
                }
              }
              @keyframes eyeTracking {
                0%, 100% { 
                  transform: translateX(0px) translateY(0px);
                }
                20% { 
                  transform: translateX(0.5px) translateY(-0.2px);
                }
                40% { 
                  transform: translateX(-0.3px) translateY(0.3px);
                }
                60% { 
                  transform: translateX(0.8px) translateY(-0.1px);
                }
                80% { 
                  transform: translateX(-0.5px) translateY(0.2px);
                }
              }
              @keyframes irisShift {
                0%, 100% { 
                  transform: translate(0px, 0px) scale(1);
                  opacity: 1;
                }
                25% { 
                  transform: translate(0.3px, -0.2px) scale(1.02);
                  opacity: 1;
                }
                50% { 
                  transform: translate(-0.2px, 0.3px) scale(0.98);
                  opacity: 1;
                }
                75% { 
                  transform: translate(0.4px, 0.1px) scale(1.01);
                  opacity: 1;
                }
              }
              @keyframes pupilDilation {
                0%, 100% { 
                  transform: scale(1);
                  opacity: 1;
                }
                30% { 
                  transform: scale(1.1);
                  opacity: 1;
                }
                60% { 
                  transform: scale(0.95);
                  opacity: 1.1;
                }
              }
         
          
              .eye-container {
                animation: 
                  naturalBlink 6s ease-in-out infinite,
                  microSaccade 0.8s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 2s;
              }
              .eye-shape {
                animation: 
                  eyeTracking 8s ease-in-out infinite,
                  focusGaze 5s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 1s, 0s;
              }
            
         
            `}
          </style>
        </defs>
      )}      <g className={animate ? "eye-container" : ""}>
        {/* Eye shape */}
        <path
          d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
          fill={color}
          opacity="0.1"
          className={animate ? "eye-shape" : ""}
        />
        <path
          d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "eye-shape" : ""}
        />
        
        {/* Iris/Pupil area */}
        <circle
          cx="12"
          cy="12"
          r="3"
          fill={color}
          opacity="0.3"
          className={animate ? "iris-area" : ""}
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "iris-area" : ""}
        />
        
        {/* Pupil center */}
        <circle
          cx="12"
          cy="12"
          r="1"
          fill={color}
          className={animate ? "pupil-center" : ""}
        />
      </g>
    </svg>
  );
};

export default ViewIcon;
