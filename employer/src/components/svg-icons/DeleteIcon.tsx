import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const DeleteIcon: React.FC<IconProps> = ({ 
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
              @keyframes trashShake {
                0%, 100% { 
                  transform: translateX(0px) rotate(0deg);
                }
                10% { 
                  transform: translateX(-1px) rotate(-1deg);
                }
                20% { 
                  transform: translateX(1px) rotate(1deg);
                }
                30% { 
                  transform: translateX(-1px) rotate(-1deg);
                }
                40% { 
                  transform: translateX(1px) rotate(1deg);
                }
                50% { 
                  transform: translateX(0px) rotate(0deg);
                }
              }
              @keyframes lidOpen {
                0%, 100% { 
                  transform: translateY(0px) rotate(0deg);
                  opacity: 1;
                }
                30% { 
                  transform: translateY(-2px) rotate(-5deg);
                  opacity: 0.9;
                }
                60% { 
                  transform: translateY(-3px) rotate(-8deg);
                  opacity: 0.8;
                }
                80% { 
                  transform: translateY(-2px) rotate(-5deg);
                  opacity: 0.9;
                }
              }
              @keyframes canTilt {
                0%, 100% { 
                  transform: rotate(0deg) scale(1);
                  transform-origin: center bottom;
                }
                50% { 
                  transform: rotate(3deg) scale(0.98);
                  transform-origin: center bottom;
                }
              }
              @keyframes contentDisappear {
                0% { 
                  opacity: 1;
                  transform: translateY(0px) scaleY(1);
                }
                30% { 
                  opacity: 0.7;
                  transform: translateY(2px) scaleY(0.8);
                }
                60% { 
                  opacity: 0.3;
                  transform: translateY(4px) scaleY(0.4);
                }
                80% { 
                  opacity: 0.1;
                  transform: translateY(6px) scaleY(0.1);
                }
                100% { 
                  opacity: 0;
                  transform: translateY(8px) scaleY(0);
                }
              }
              @keyframes handleBounce {
                0%, 100% { 
                  transform: translateY(0px) scale(1);
                }
                50% { 
                  transform: translateY(-1px) scale(1.05);
                }
              }
              @keyframes deleteGlow {
                0%, 100% { 
                  stroke: ${color};
                  filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0));
                }
                50% { 
                  stroke: #ef4444;
                  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6));
                }
              }
              @keyframes warningPulse {
                0%, 100% { 
                  transform: scale(1);
                  filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0));
                }
                50% { 
                  transform: scale(1.05);
                  filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.4));
                }
              }
              @keyframes bodyFill {
                0% { 
                  fill-opacity: 0.1;
                  fill: ${color};
                }
                50% { 
                  fill-opacity: 0.2;
                  fill: #ef4444;
                }
                100% { 
                  fill-opacity: 0.15;
                  fill: #ef4444;
                }
              }
              .trash-container {
                animation: 
                  trashShake 4s ease-in-out infinite,
                  warningPulse 3s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 1s;
              }
              .trash-body {
                animation: 
                  canTilt 4s ease-in-out infinite,
                  deleteGlow 3s ease-in-out infinite;
                transform-origin: center bottom;
                animation-delay: 0.5s, 1.5s;
              }
              .trash-body-fill {
                animation: bodyFill 3s ease-in-out infinite;
                animation-delay: 1.5s;
              }
              .trash-lid {
                animation: 
                  lidOpen 4s ease-in-out infinite,
                  deleteGlow 3s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 1s, 2s;
              }
              .trash-handle {
                animation: 
                  handleBounce 3s ease-in-out infinite,
                  deleteGlow 3s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0.8s, 2.2s;
              }
              .delete-line {
                animation: 
                  contentDisappear 4s ease-out infinite,
                  deleteGlow 3s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 2.5s, 2.8s;
              }
              .delete-line-1 { animation-delay: 2.5s, 2.8s; }
              .delete-line-2 { animation-delay: 2.8s, 3.1s; }
            `}
          </style>
        </defs>
      )}

      <g className={animate ? "trash-container" : ""}>
        {/* Trash can body fill */}
        <path
          d="M5 7H19L18 21H6L5 7Z"
          fill={color}
          opacity="0.1"
          className={animate ? "trash-body-fill" : ""}
        />
        
        {/* Trash can body outline */}
        <path
          d="M5 7H19L18 21H6L5 7Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={animate ? "trash-body" : ""}
        />
        
        {/* Trash can lid */}
        <path
          d="M3 7H21"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "trash-lid" : ""}
        />
        
        {/* Handle */}
        <path
          d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "trash-handle" : ""}
        />
        
        {/* Delete lines */}
        <path
          d="M10 11V17"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "delete-line delete-line-1" : ""}
        />
        <path
          d="M14 11V17"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "delete-line delete-line-2" : ""}
        />
      </g>
    </svg>
  );
};

export default DeleteIcon;
