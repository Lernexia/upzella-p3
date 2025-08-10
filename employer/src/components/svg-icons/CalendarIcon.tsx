import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CalendarIcon: React.FC<IconProps> = ({ 
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
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes pageFlip {
                0% { 
                  transform: perspective(200px) rotateY(0deg);
                  opacity: 1;
                }
                25% { 
                  transform: perspective(200px) rotateY(-45deg);
                  opacity: 0.8;
                }
                50% { 
                  transform: perspective(200px) rotateY(-90deg);
                  opacity: 0.3;
                }
                75% { 
                  transform: perspective(200px) rotateY(-135deg);
                  opacity: 0.8;
                }
                100% { 
                  transform: perspective(200px) rotateY(-180deg);
                  opacity: 1;
                }
              }
              @keyframes pageReveal {
                0%, 50% { opacity: 0; }
                51%, 100% { opacity: 1; }
              }
              @keyframes pageHide {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
              }
              .flip-page {
                transform-origin: left center;
                animation: pageFlip 3s ease-in-out infinite;
                transform-style: preserve-3d;
              }
              .page-content-old {
                animation: pageHide 3s ease-in-out infinite;
              }
              .page-content-new {
                animation: pageReveal 3s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Calendar body */}
      <rect 
        x="3" 
        y="4" 
        width="18" 
        height="18" 
        rx="2" 
        ry="2" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
      />
      
      {/* Calendar bindings/rings */}
      <line 
        x1="16" 
        y1="2" 
        x2="16" 
        y2="6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <line 
        x1="8" 
        y1="2" 
        x2="8" 
        y2="6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Calendar header divider */}
      <line 
        x1="3" 
        y1="10" 
        x2="21" 
        y2="10" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Static calendar dates (always visible) */}
      <circle 
        cx="8" 
        cy="14" 
        r="1" 
        fill={color} 
        opacity="0.3"
      />
      <circle 
        cx="12" 
        cy="14" 
        r="1" 
        fill={color} 
        opacity="0.3"
      />
      <circle 
        cx="16" 
        cy="14" 
        r="1" 
        fill={color} 
        opacity="0.3"
      />
      
      {/* Flipping page element */}
      {animate && (
        <g className="flip-page">
          {/* Page background */}
          <rect 
            x="3" 
            y="10" 
            width="18" 
            height="12" 
            rx="0" 
            ry="0" 
            fill="white" 
            stroke={color} 
            strokeWidth="1"
            opacity="0.9"
          />
          
          {/* Old page content (visible first half) */}
          <g className="page-content-old">
            <circle cx="8" cy="14" r="1" fill={color} opacity="0.6" />
            <circle cx="12" cy="14" r="1" fill={color} opacity="0.6" />
            <circle cx="16" cy="14" r="1" fill={color} opacity="0.6" />
            <circle cx="8" cy="18" r="1" fill={color} opacity="0.4" />
            <rect x="11" y="17" width="2" height="2" rx="1" fill={color} opacity="0.8" />
          </g>
          
          {/* New page content (visible second half) */}
          <g className="page-content-new">
            <circle cx="8" cy="14" r="1" fill="#e74c3c" opacity="0.8" />
            <circle cx="12" cy="14" r="1" fill="#3498db" opacity="0.8" />
            <circle cx="16" cy="14" r="1" fill="#2ecc71" opacity="0.8" />
            <circle cx="8" cy="18" r="1" fill="#f39c12" opacity="0.8" />
            <circle cx="12" cy="18" r="1" fill="#9b59b6" opacity="0.8" />
            <rect x="15" y="17" width="2" height="2" rx="1" fill="#e67e22" opacity="0.9" />
          </g>
          
          {/* Page edge highlight for 3D effect */}
          <line 
            x1="3" 
            y1="10" 
            x2="3" 
            y2="22" 
            stroke={color} 
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      )}      
      {/* Non-animated additional dates */}
      {!animate && (
        <>
          <circle 
            cx="8" 
            cy="18" 
            r="1" 
            fill={color} 
            opacity="0.5"
          />
          <circle 
            cx="12" 
            cy="18" 
            r="1" 
            fill={color} 
            opacity="0.4"
          />
          <circle 
            cx="16" 
            cy="18" 
            r="1" 
            fill={color} 
            opacity="0.6"
          />
          
          {/* Today's date highlight */}
          <rect 
            x="11" 
            y="13" 
            width="2" 
            height="2" 
            rx="1" 
            fill={color} 
            opacity="0.8"
          />
        </>
      )}
    </svg>
  );
};

export default CalendarIcon;
