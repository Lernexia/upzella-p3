import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const DocumentIcon: React.FC<IconProps> = ({ 
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
      className={className}    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes documentWrite {
                0% { 
                  stroke-dasharray: 0 100;
                  opacity: 0.3;
                }
                50% { 
                  stroke-dasharray: 50 50;
                  opacity: 0.7;
                }
                100% { 
                  stroke-dasharray: 100 0;
                  opacity: 1;
                }
              }
              @keyframes pageFlutter {
                0%, 100% { 
                  transform: rotate(0deg) scale(1);
                }
                25% { 
                  transform: rotate(0.5deg) scale(1.02);
                }
                75% { 
                  transform: rotate(-0.5deg) scale(0.98);
                }
              }
              @keyframes foldReveal {
                0% { 
                  transform: scale(0) rotate(-45deg);
                  opacity: 0;
                }
                60% { 
                  transform: scale(0) rotate(-45deg);
                  opacity: 0;
                }
                100% { 
                  transform: scale(1) rotate(0deg);
                  opacity: 1;
                }
              }
              @keyframes contentWrite {
                0% { 
                  stroke-dasharray: 0 20;
                  opacity: 0;
                }
                30% { 
                  stroke-dasharray: 0 20;
                  opacity: 0;
                }
                100% { 
                  stroke-dasharray: 20 0;
                  opacity: 1;
                }
              }
              .document-body {
                animation: pageFlutter 4s ease-in-out infinite;
                transform-origin: center center;
              }
              .document-fold {
                animation: foldReveal 4s ease-out infinite;
                transform-origin: 14px 8px;
              }
              .document-line {
                animation: contentWrite 4s ease-out infinite;
              }
              .document-line-1 {
                animation-delay: 1s;
              }
              .document-line-2 {
                animation-delay: 1.5s;
              }
              .document-line-3 {
                animation-delay: 2s;
              }
              .document-header {
                animation: contentWrite 4s ease-out infinite;
                animation-delay: 2.5s;
              }
            `}
          </style>
        </defs>
      )}      {/* Document body */}
      <path 
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "document-body" : ""}
      />
      
      {/* Document fold */}
      <polyline 
        points="14,2 14,8 20,8" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "document-fold" : ""}
      />
      
      {/* Document lines */}
      <line 
        x1="16" 
        y1="13" 
        x2="8" 
        y2="13" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        className={animate ? "document-line document-line-1" : ""}
      />
      <line 
        x1="16" 
        y1="17" 
        x2="8" 
        y2="17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        className={animate ? "document-line document-line-2" : ""}
      />
      <polyline 
        points="10,9 9,9 8,9" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round"
        className={animate ? "document-header" : ""}
      />
    </svg>
  );
};

export default DocumentIcon;
