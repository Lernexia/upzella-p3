import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const WebsiteIcon: React.FC<IconProps> = ({ 
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
            {`              @keyframes sphereRotate {
                0% { 
                  transform: rotateY(0deg) rotateX(-15deg);
                }
                25% { 
                  transform: rotateY(90deg) rotateX(-10deg);
                }
                50% { 
                  transform: rotateY(180deg) rotateX(-15deg);
                }
                75% { 
                  transform: rotateY(270deg) rotateX(-20deg);
                }
                100% { 
                  transform: rotateY(360deg) rotateX(-15deg);
                }
              }
              
              @keyframes sphereShine {
                0%, 100% { 
                  fill-opacity: 0.08;
                  stroke-opacity: 1;
                }
                50% { 
                  fill-opacity: 0.15;
                  stroke-opacity: 0.9;
                }
              }
                       .sphere-container {
                animation: sphereRotate 10s linear infinite;
                transform-style: preserve-3d;
                transform-origin: center center;
              }
              .sphere-surface {
                animation: sphereShine 3s ease-in-out infinite;
              }
              .meridian-1 {
                animation: meridianFlow 4s ease-in-out infinite;
                animation-delay: 0s;
              }
              .meridian-2 {
                animation: meridianFlow 4s ease-in-out infinite;
                animation-delay: 2s;
              }
              .latitude {
                animation: latitudeFlow 3.5s ease-in-out infinite;
              }
              .latitude-1 { animation-delay: 0.5s; }
              .latitude-2 { animation-delay: 1s; }
              .latitude-3 { animation-delay: 1.5s; }
            `}
          </style>
        </defs>
      )}      <g className={animate ? "sphere-container" : ""}>
        {/* 3D Sphere */}
        <circle
          cx="12"
          cy="12"
          r="9"
          fill={color}
          opacity="0.1"
          className={animate ? "sphere-surface" : ""}
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Meridian lines (longitude) */}
        <path
          d="M12 3C16.5 8 16.5 16 12 21"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
          className={animate ? "meridian-1" : ""}
        />
        <path
          d="M12 3C7.5 8 7.5 16 12 21"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
          className={animate ? "meridian-2" : ""}
        />
        
        {/* Latitude lines */}
        <path
          d="M3 12H21"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
          className={animate ? "latitude latitude-1" : ""}
        />
        <path
          d="M5.636 7.5H18.364"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
          className={animate ? "latitude latitude-2" : ""}
        />
        <path
          d="M5.636 16.5H18.364"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
          className={animate ? "latitude latitude-3" : ""}
        />
      </g>    </svg>
  );
};

export default WebsiteIcon;
