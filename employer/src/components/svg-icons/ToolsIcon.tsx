import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ToolsIcon: React.FC<IconProps> = ({ 
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
              @keyframes wrenchTighten {
                0%, 100% { 
                  transform: rotate(0deg) translateX(0px);
                }
                25% { 
                  transform: rotate(-15deg) translateX(-1px);
                }
                50% { 
                  transform: rotate(-30deg) translateX(-2px);
                }
                75% { 
                  transform: rotate(-15deg) translateX(-1px);
                }
              }
              @keyframes screwdriverTurn {
                0%, 100% { 
                  transform: rotate(0deg);
                }
                25% { 
                  transform: rotate(90deg);
                }
                50% { 
                  transform: rotate(180deg);
                }
                75% { 
                  transform: rotate(270deg);
                }
              }
              @keyframes toolGlow {
                0%, 100% { 
                  filter: drop-shadow(0 0 0 rgba(249, 115, 22, 0));
                  stroke-width: 1.5;
                }
                50% { 
                  stroke-width: 2;
                }
              }
              @keyframes workSparks {
                0% { 
                  opacity: 0;
                  transform: scale(0) rotate(0deg);
                }
                50% { 
                  opacity: 1;
                  transform: scale(1.2) rotate(180deg);
                }
                100% { 
                  opacity: 0;
                  transform: scale(0) rotate(360deg);
                }
              }
              @keyframes toolShake {
                0%, 100% { 
                  transform: translateY(0px);
                }
                25% { 
                  transform: translateY(-0.5px);
                }
                75% { 
                  transform: translateY(0.5px);
                }
              }
              .wrench-tool {
                animation: 
                  wrenchTighten 3s ease-in-out infinite,
                  toolGlow 3s ease-in-out infinite,
                  toolShake 3s ease-in-out infinite;
                transform-origin: 12px 12px;
                animation-delay: 0s, 0.5s, 1s;
              }
              .screwdriver-handle {
                animation: 
                  screwdriverTurn 2.5s linear infinite,
                  toolGlow 3s ease-in-out infinite;
                transform-origin: 18px 5px;
                animation-delay: 0.8s, 1s;
              }
              .screwdriver-tip {
                animation: 
                  screwdriverTurn 2.5s linear infinite,
                  toolGlow 3s ease-in-out infinite;
                transform-origin: 8px 17px;
                animation-delay: 0.8s, 1s;
              }
              .work-spark {
                animation: workSparks 2s ease-out infinite;
              }
              .work-spark-1 { animation-delay: 1.2s; }
              .work-spark-2 { animation-delay: 1.8s; }
              .work-spark-3 { animation-delay: 2.4s; }
            `}
          </style>
        </defs>
      )}      {/* Wrench */}
      <g className={animate ? "wrench-tool" : ""}>
        <path
          d="M14.7 6.3C15.1 6.7 15.1 7.3 14.7 7.7L11.4 11L13 12.6L16.3 9.3C16.7 8.9 17.3 8.9 17.7 9.3L19.4 11C20.2 11.8 20.2 13.1 19.4 13.9L13.9 19.4C13.1 20.2 11.8 20.2 11 19.4L9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L12.6 13L11 11.4L7.7 14.7C7.3 15.1 6.7 15.1 6.3 14.7L4.6 13C3.8 12.2 3.8 10.9 4.6 10.1L10.1 4.6C10.9 3.8 12.2 3.8 13 4.6L14.7 6.3Z"
          fill={color}
          opacity="0.1"
        />
        <path
          d="M14.7 6.3C15.1 6.7 15.1 7.3 14.7 7.7L7.7 14.7C7.3 15.1 6.7 15.1 6.3 14.7L4.6 13C3.8 12.2 3.8 10.9 4.6 10.1L10.1 4.6C10.9 3.8 12.2 3.8 13 4.6L14.7 6.3Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Screwdriver Handle */}
      <path
        d="M17 7L20 4L19 3L16 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "screwdriver-handle" : ""}
      />
      
      {/* Screwdriver Tip */}
      <path
        d="M9 15L6 18L7 19L10 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "screwdriver-tip" : ""}
      />

      {/* Work sparks when animated */}
      {animate && (
        <>
          <circle 
            cx="12" 
            cy="12" 
            r="0.5" 
            fill="#fbbf24" 
            opacity="0.8"
            className="work-spark work-spark-1"
          />
          <circle 
            cx="10" 
            cy="14" 
            r="0.3" 
            fill="#f59e0b" 
            opacity="0.9"
            className="work-spark work-spark-2"
          />
          <circle 
            cx="14" 
            cy="10" 
            r="0.4" 
            fill="#fbbf24" 
            opacity="0.7"
            className="work-spark work-spark-3"
          />
        </>
      )}
    </svg>
  );
};

export default ToolsIcon;
