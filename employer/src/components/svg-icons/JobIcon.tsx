import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const JobIcon: React.FC<IconProps> = ({ 
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
      className={`${animate ? 'animate-job-icon' : ''} ${className}`}
    >      {animate && (
        <defs>
          <style>
            {`
              @keyframes briefcaseOpen {
                0%, 20% { 
                  transform: rotateX(0deg);
                  opacity: 1;
                }
                30%, 70% { 
                  transform: rotateX(-25deg);
                  opacity: 0.9;
                }
                80%, 100% { 
                  transform: rotateX(0deg);
                  opacity: 1;
                }
              }
              @keyframes briefcaseBottom {
                0%, 100% { 
                  transform: translateY(0);
                  opacity: 1;
                }
                30%, 70% { 
                  transform: translateY(1px);
                  opacity: 0.95;
                }
              }
              @keyframes handleLift {
                0%, 20% { 
                  transform: translateY(0) scaleY(1);
                  opacity: 0.8;
                }
                30%, 70% { 
                  transform: translateY(-2px) scaleY(1.1);
                  opacity: 1;
                }
                80%, 100% { 
                  transform: translateY(0) scaleY(1);
                  opacity: 0.8;
                }
              }
              @keyframes lockClick {
                0%, 15%, 85%, 100% { 
                  transform: scale(1);
                  opacity: 0.6;
                }
                20%, 80% { 
                  transform: scale(0.8);
                  opacity: 0.8;
                }
                25%, 75% { 
                  transform: scale(1.2);
                  opacity: 1;
                }
              }
              @keyframes documentsReveal {
                0%, 25% { 
                  opacity: 0;
                  transform: translateY(3px) scale(0.8);
                }
                35%, 65% { 
                  opacity: 0.8;
                  transform: translateY(0) scale(1);
                }
                75%, 100% { 
                  opacity: 0;
                  transform: translateY(3px) scale(0.8);
                }
              }
              .animate-job-icon {
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transform-origin: center bottom;
              }
              .animate-job-icon:hover {
                transform: translateY(-2px) scale(1.05);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
              }
              .animate-job-icon:active {
                transform: translateY(0) scale(1.02);
                transition: all 0.1s ease-out;
              }
              .briefcase-top {
                animation: briefcaseOpen 4s ease-in-out infinite;
                transform-origin: bottom center;
              }
              .briefcase-bottom {
                animation: briefcaseBottom 4s ease-in-out infinite;
                transform-origin: center;
              }
              .job-handle {
                animation: handleLift 4s ease-in-out infinite;
                transform-origin: center;
              }
              .job-lock {
                animation: lockClick 4s ease-in-out infinite;
                transform-origin: center;
              }
              .job-documents {
                animation: documentsReveal 4s ease-in-out infinite;
                transform-origin: center;
              }
            `}
          </style>
        </defs>
      )}      
      {/* Briefcase handle */}
      <path 
        d="M6 7V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "job-handle" : ""}
      />
      
      {/* Handle detail */}
      <line 
        x1="10" 
        y1="7" 
        x2="14" 
        y2="7" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round"
        opacity="0.8"
        className={animate ? "job-handle" : ""}
      />
      
      {/* Briefcase bottom (stays stationary) */}
      <rect 
        x="3" 
        y="12.5" 
        width="18" 
        height="5.5" 
        rx="2" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        className={animate ? "briefcase-bottom" : ""}
      />
      
      {/* Briefcase top (opens) */}
      <rect 
        x="3" 
        y="7" 
        width="18" 
        height="5.5" 
        rx="2" 
        stroke={color} 
        strokeWidth="2" 
        fill="none"
        className={animate ? "briefcase-top" : ""}
      />
      
      {/* Briefcase lock/clasp */}
      <circle 
        cx="12" 
        cy="12.5" 
        r="1" 
        fill={color} 
        opacity="0.7"
        className={animate ? "job-lock" : ""}
      />
      
      {/* Documents inside briefcase (visible when opened) */}
      {animate && (
        <>
          <rect 
            x="7" 
            y="14" 
            width="4" 
            height="1" 
            fill={color} 
            opacity="0.6"
            className="job-documents"
            style={{ animationDelay: '0.5s' }}
          />
          <rect 
            x="7" 
            y="15.5" 
            width="3" 
            height="1" 
            fill={color} 
            opacity="0.6"
            className="job-documents"
            style={{ animationDelay: '0.7s' }}
          />
          <rect 
            x="13" 
            y="14" 
            width="4" 
            height="1" 
            fill={color} 
            opacity="0.6"
            className="job-documents"
            style={{ animationDelay: '0.9s' }}
          />
          <rect 
            x="13" 
            y="15.5" 
            width="3" 
            height="1" 
            fill={color} 
            opacity="0.6"
            className="job-documents"
            style={{ animationDelay: '1.1s' }}
          />
        </>
      )}
    </svg>
  );
};

export default JobIcon;
