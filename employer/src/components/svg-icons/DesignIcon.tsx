import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const DesignIcon: React.FC<IconProps> = ({
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
              @keyframes canvasDraw {
                0% { 
                  stroke-dasharray: 0 64;
                  opacity: 0.5;
                }
                50% { 
                  stroke-dasharray: 32 32;
                  opacity: 0.8;
                }
                100% { 
                  stroke-dasharray: 64 0;
                  opacity: 1;
                }
              }
              @keyframes penTool {
                0%, 100% { 
                  transform: rotate(0deg) scale(1);
                }
                50% { 
                  transform: rotate(15deg) scale(1.1);
                }
              }
              @keyframes anchorPulse {
                0%, 100% { 
                  transform: scale(1);
                  opacity: 1;
                }
                50% { 
                  transform: scale(1.3);
                  opacity: 0.7;
                }
              }
              @keyframes shapeAppear {
                0% { 
                  opacity: 0;
                  transform: scale(0.5);
                }
                50% { 
                  opacity: 0.5;
                  transform: scale(0.8);
                }
                100% { 
                  opacity: 0.3;
                  transform: scale(1);
                }
              }
              @keyframes circleCreate {
                0% { 
                  stroke-dasharray: 0 18;
                  opacity: 0.3;
                }
                50% { 
                  stroke-dasharray: 9 9;
                  opacity: 0.5;
                }
                100% { 
                  stroke-dasharray: 18 0;
                  opacity: 0.6;
                }
              }
              @keyframes colorPick {
                0%, 100% { 
                  transform: scale(1);
                  opacity: 0.8;
                }
                33% { 
                  transform: scale(1.2);
                  opacity: 1;
                }
                66% { 
                  transform: scale(0.9);
                  opacity: 0.6;
                }
              }
              .design-canvas {
                animation: canvasDraw 4s ease-in-out infinite;
              }
              .pen-tool {
                animation: penTool 3s ease-in-out infinite;
                transform-origin: center center;
              }
              .anchor-point {
                animation: anchorPulse 2s ease-in-out infinite;
              }
              .anchor-point-1 { animation-delay: 0s; }
              .anchor-point-2 { animation-delay: 1s; }
              .design-shape {
                animation: shapeAppear 4s ease-in-out infinite;
                animation-delay: 1.5s;
              }
              .design-circle {
                animation: circleCreate 3s ease-in-out infinite;
                animation-delay: 2s;
              }
              .color-swatch {
                animation: colorPick 3s ease-in-out infinite;
              }
              .color-swatch-1 { animation-delay: 0s; }
              .color-swatch-2 { animation-delay: 1s; }
              .color-swatch-3 { animation-delay: 2s; }
            `}
          </style>
        </defs>
      )}

      {/* Main design canvas */}
      <rect
        x="3"
        y="4"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        className={animate ? "design-canvas" : ""}
      />
      
      {/* Design tool - Pen tool */}
      <path
        d="M7 9L9 7L11 9L9 11L7 9Z"
        fill={color}
        fillOpacity="0.8"
        className={animate ? "pen-tool" : ""}
      />
      
      {/* Bezier anchor points */}
      <circle
        cx="9"
        cy="7"
        r="0.8"
        fill={color}
        className={animate ? "anchor-point anchor-point-1" : ""}
      />
      
      <circle
        cx="11"
        cy="9"
        r="0.8"
        fill={color}
        className={animate ? "anchor-point anchor-point-2" : ""}
      />
      
      {/* Design elements - simple shapes */}
      <rect
        x="14"
        y="7"
        width="5"
        height="3"
        rx="0.5"
        fill={color}
        fillOpacity="0.3"
        className={animate ? "design-shape" : ""}
      />
      
      <circle
        cx="16.5"
        cy="13"
        r="1.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.6"
        className={animate ? "design-circle" : ""}
      />
      
      {/* Color palette - simplified */}
      <circle
        cx="6"
        cy="15"
        r="1"
        fill={color}
        fillOpacity="0.8"
        className={animate ? "color-swatch color-swatch-1" : ""}
      />
      
      <circle
        cx="8.5"
        cy="15"
        r="1"
        fill={color}
        fillOpacity="0.5"
        className={animate ? "color-swatch color-swatch-2" : ""}
      />
      
      <circle
        cx="11"
        cy="15"
        r="1"
        fill={color}
        fillOpacity="0.3"
        className={animate ? "color-swatch color-swatch-3" : ""}
      />
    </svg>
  );
};

export default DesignIcon;
