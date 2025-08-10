import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const SecurityIcon: React.FC<IconProps> = ({ 
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
              @keyframes lockSecure {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                  filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0));
                }
                50% { 
                  transform: scale(1.08) rotate(1deg);
                  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.5));
                }
              }
              @keyframes shackleClose {
                0% { 
                  stroke-dasharray: 0 28;
                  transform: translateY(-2px) scale(1.1);
                  opacity: 0.6;
                }
                30% { 
                  stroke-dasharray: 14 14;
                  transform: translateY(-1px) scale(1.05);
                  opacity: 0.8;
                }
                60% { 
                  stroke-dasharray: 28 0;
                  transform: translateY(0px) scale(1);
                  opacity: 1;
                }
                70% { 
                  transform: translateY(0px) scale(0.98);
                }
                80% { 
                  transform: translateY(0px) scale(1.02);
                }
                100% { 
                  stroke-dasharray: 28 0;
                  transform: translateY(0px) scale(1);
                  opacity: 1;
                }
              }
              @keyframes keyholeGlow {
                0%, 100% { 
                  fill: ${color};
                  transform: scale(1) rotate(0deg);
                  filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0));
                }
                30% { 
                  fill: #22c55e;
                  transform: scale(1.2) rotate(45deg);
                  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.6));
                }
                60% { 
                  fill: #22c55e;
                  transform: scale(1.3) rotate(180deg);
                  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.8));
                }
              }
              @keyframes keyholeTurn {
                0%, 100% { 
                  transform: rotate(0deg);
                  stroke: ${color};
                }
                50% { 
                  transform: rotate(90deg);
                  stroke: #22c55e;
                }
              }
              @keyframes securityScan {
                0% { 
                  stroke-dasharray: 0 20;
                  opacity: 0.2;
                  stroke: ${color};
                }
                25% { 
                  stroke-dasharray: 5 15;
                  opacity: 0.6;
                  stroke: #22c55e;
                }
                50% { 
                  stroke-dasharray: 10 10;
                  opacity: 1;
                  stroke: #22c55e;
                }
                75% { 
                  stroke-dasharray: 15 5;
                  opacity: 0.8;
                  stroke: #22c55e;
                }
                100% { 
                  stroke-dasharray: 20 0;
                  opacity: 0.4;
                  stroke: #22c55e;
                }
              }
              @keyframes protectionShield {
                0%, 100% { 
                  opacity: 0;
                  transform: scale(0.8);
                  stroke-width: 3;
                }
                50% { 
                  opacity: 0.3;
                  transform: scale(1.2);
                  stroke-width: 1.5;
                }
              }
              @keyframes securityBeam {
                0% { 
                  opacity: 0;
                  transform: translateY(-8px) scaleY(0.2);
                }
                30% { 
                  opacity: 0.8;
                  transform: translateY(-4px) scaleY(0.6);
                }
                60% { 
                  opacity: 1;
                  transform: translateY(0px) scaleY(1);
                }
                100% { 
                  opacity: 0;
                  transform: translateY(8px) scaleY(0.2);
                }
              }
              @keyframes lockBodySecure {
                0%, 100% { 
                  fill: rgba(107, 114, 128, 0.05);
                  stroke: ${color};
                }
                50% { 
                
                }
              }
              .lock-body {
                animation: 
                  lockSecure 4s ease-in-out infinite,
                  lockBodySecure 4s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 0.5s;
              }
              .lock-body-fill {
                animation: lockBodySecure 4s ease-in-out infinite;
                animation-delay: 0.5s;
              }
              .lock-shackle {
                animation: 
                  shackleClose 5s ease-in-out infinite,
                  securityScan 3s ease-in-out infinite;
                transform-origin: 12px 6px;
                animation-delay: 0s, 1.5s;
              }
              .keyhole-center {
                animation: keyholeGlow 3s ease-in-out infinite;
                animation-delay: 2s;
                transform-origin: center center;
              }
              .keyhole-key {
                animation: keyholeTurn 3s ease-in-out infinite;
                animation-delay: 2.2s;
                transform-origin: 12px 15.5px;
              }
              .security-beam {
                animation: securityBeam 2.5s ease-in-out infinite;
                transform-origin: center center;
              }
              .security-beam-1 { animation-delay: 0.5s; }
              .security-beam-2 { animation-delay: 0.8s; }
              .security-beam-3 { animation-delay: 1.1s; }
              .protection-shield {
                animation: protectionShield 6s ease-in-out infinite;
                animation-delay: 3s;
                transform-origin: center center;
              }
            `}
          </style>
        </defs>
      )}

      

   
      {/* Lock body fill */}
      <rect
        x="6"
        y="10"
        width="12"
        height="10"
        rx="2"
        fill={animate ? "rgba(107, 114, 128, 0.05)" : "transparent"}
        className={animate ? "lock-body-fill" : ""}
      />

      {/* Lock body outline */}
      <rect
        x="6"
        y="10"
        width="12"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "lock-body" : ""}
      />

      {/* Lock shackle */}
      <path
        d="M9 10V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "lock-shackle" : ""}
      />

      {/* Keyhole center */}
      <circle
        cx="12"
        cy="14"
        r="1.5"
        fill={color}
        className={animate ? "keyhole-center" : ""}
      />

      {/* Keyhole key slot */}
      <path
        d="M12 15.5V17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "keyhole-key" : ""}
      />
    </svg>
  );
};

export default SecurityIcon;
