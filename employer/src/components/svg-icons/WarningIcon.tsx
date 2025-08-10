import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const WarningIcon: React.FC<IconProps> = ({
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
              @keyframes emergencyFlash {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                  filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0)) brightness(1);
                }
                15% { 
                  transform: scale(1.15) rotate(2deg);
                  filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.9)) brightness(1.3);
                }
                30% { 
                  transform: scale(0.95) rotate(-1deg);
                  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4)) brightness(0.8);
                }
                45% { 
                  transform: scale(1.2) rotate(3deg);
                  filter: drop-shadow(0 0 25px rgba(245, 158, 11, 1)) brightness(1.5);
                }
                60% { 
                  transform: scale(0.9) rotate(-2deg);
                  filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.2)) brightness(0.7);
                }
                75% { 
                  transform: scale(1.1) rotate(1deg);
                  filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.7)) brightness(1.2);
                }
              }
              @keyframes warningPulse {
                0%, 100% { 
                  transform: scale(1) rotate(0deg);
                  filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0));
                }
                50% { 
                  transform: scale(1.1) rotate(1deg);
                  filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.6));
                }
              }              @keyframes triangleAlert {
                0% { 
                  stroke-dasharray: 0 60;
                  fill-opacity: 0;
                  transform: scale(0.8);
                  stroke: ${color};
                }
                15% { 
                  stroke-dasharray: 15 45;
                  fill-opacity: 0.03;
                  transform: scale(0.9);
                  stroke: #f59e0b;
                }
                30% { 
                  stroke-dasharray: 30 30;
                  fill-opacity: 0.08;
                  transform: scale(0.95);
                  stroke: #f59e0b;
                }
                45% { 
                  stroke-dasharray: 45 15;
                  fill-opacity: 0.12;
                  transform: scale(1.02);
                  stroke: #f97316;
                }
                60% { 
                  stroke-dasharray: 60 0;
                  fill-opacity: 0.15;
                  transform: scale(1);
                  stroke: #f97316;
                }
                70% { 
                  transform: scale(1.08);
                  stroke: #ea580c;
                  fill-opacity: 0.2;
                }
                80% { 
                  transform: scale(0.96);
                  stroke: #f59e0b;
                  fill-opacity: 0.12;
                }
                90% { 
                  transform: scale(1.03);
                  stroke: #f97316;
                  fill-opacity: 0.16;
                }
                100% { 
                  stroke-dasharray: 60 0;
                  fill-opacity: 0.1;
                  transform: scale(1);
                  stroke: #f59e0b;
                }
              }              @keyframes exclamationDraw {
                0% { 
                  stroke-dasharray: 0 8;
                  transform: scaleY(0.2) translateY(3px);
                  opacity: 0.2;
                  stroke: ${color};
                  stroke-width: 2.5;
                }
                20% { 
                  stroke-dasharray: 2 6;
                  transform: scaleY(0.5) translateY(2px);
                  opacity: 0.5;
                  stroke: #f59e0b;
                  stroke-width: 3;
                }
                40% { 
                  stroke-dasharray: 4 4;
                  transform: scaleY(0.8) translateY(1px);
                  opacity: 0.8;
                  stroke: #f97316;
                  stroke-width: 3.5;
                }
                60% { 
                  stroke-dasharray: 6 2;
                  transform: scaleY(1) translateY(0px);
                  opacity: 1;
                  stroke: #ea580c;
                  stroke-width: 4;
                }
                70% { 
                  stroke-dasharray: 8 0;
                  transform: scaleY(1.15) translateY(-1px);
                  stroke: #dc2626;
                  stroke-width: 4.5;
                }
                80% { 
                  transform: scaleY(1.25) translateY(-2px) rotateZ(2deg);
                  stroke: #dc2626;
                  stroke-width: 5;
                }
                90% { 
                  transform: scaleY(0.9) translateY(1px) rotateZ(-1deg);
                  stroke: #f97316;
                  stroke-width: 3.5;
                }
                100% { 
                  stroke-dasharray: 8 0;
                  transform: scaleY(1) translateY(0px) rotateZ(0deg);
                  opacity: 1;
                  stroke: #f59e0b;
                  stroke-width: 3;
                }
              }              @keyframes dotAppear {
                0% { 
                  transform: scale(0) translateY(4px) rotate(0deg);
                  opacity: 0;
                  fill: ${color};
                  filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0));
                }
                25% { 
                  transform: scale(0.3) translateY(2px) rotate(45deg);
                  opacity: 0.4;
                  fill: #f59e0b;
                  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
                }
                50% { 
                  transform: scale(0.8) translateY(1px) rotate(90deg);
                  opacity: 0.8;
                  fill: #f97316;
                  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
                }
                65% { 
                  transform: scale(1.4) translateY(0px) rotate(180deg);
                  opacity: 1;
                  fill: #ea580c;
                  filter: drop-shadow(0 0 12px rgba(234, 88, 12, 0.8));
                }
                75% { 
                  transform: scale(1.6) translateY(-1px) rotate(270deg);
                  fill: #dc2626;
                  filter: drop-shadow(0 0 16px rgba(220, 38, 38, 1));
                }
                85% { 
                  transform: scale(0.8) translateY(1px) rotate(315deg);
                  fill: #f97316;
                  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
                }
                95% { 
                  transform: scale(1.1) translateY(0px) rotate(350deg);
                  fill: #f59e0b;
                  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4));
                }
                100% { 
                  transform: scale(1) translateY(0px) rotate(360deg);
                  opacity: 1;
                  fill: #f59e0b;
                  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
                }
              }              @keyframes urgentShake {
                0%, 100% { 
                  transform: translateX(0px) rotate(0deg);
                }
                5% { 
                  transform: translateX(-2px) rotate(-1deg);
                }
                10% { 
                  transform: translateX(2px) rotate(1deg);
                }
                15% { 
                  transform: translateX(-2px) rotate(-1deg);
                }
                20% { 
                  transform: translateX(2px) rotate(1deg);
                }
                25% { 
                  transform: translateX(-1px) rotate(-0.5deg);
                }
                30% { 
                  transform: translateX(1px) rotate(0.5deg);
                }
                35% { 
                  transform: translateX(-1px) rotate(-0.5deg);
                }
                40% { 
                  transform: translateX(1px) rotate(0.5deg);
                }
                45% { 
                  transform: translateX(0px) rotate(0deg);
                }
                50% { 
                  transform: translateX(0px) rotate(0deg);
                }
              }
              @keyframes criticalVibration {
                0%, 100% { 
                  transform: translateY(0px) translateX(0px) rotate(0deg);
                }
                10% { 
                  transform: translateY(-0.5px) translateX(-0.5px) rotate(-0.2deg);
                }
                20% { 
                  transform: translateY(0.5px) translateX(0.5px) rotate(0.2deg);
                }
                30% { 
                  transform: translateY(-0.5px) translateX(0.5px) rotate(-0.2deg);
                }
                40% { 
                  transform: translateY(0.5px) translateX(-0.5px) rotate(0.2deg);
                }
                50% { 
                  transform: translateY(0px) translateX(0px) rotate(0deg);
                }
                60% { 
                  transform: translateY(-0.3px) translateX(-0.3px) rotate(-0.1deg);
                }
                70% { 
                  transform: translateY(0.3px) translateX(0.3px) rotate(0.1deg);
                }
                80% { 
                  transform: translateY(-0.3px) translateX(0.3px) rotate(-0.1deg);
                }
                90% { 
                  transform: translateY(0.3px) translateX(-0.3px) rotate(0.1deg);
                }
              }              @keyframes warningGlow {
                0%, 100% { 
                  stroke: ${color};
                  fill: ${color};
                  filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0));
                }
                25% { 
                  stroke: #f59e0b;
                  fill: #f59e0b;
                  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));
                }
                50% { 
                  stroke: #f97316;
                  fill: #f97316;
                  filter: drop-shadow(0 0 16px rgba(249, 115, 22, 0.8));
                }
                75% { 
                  stroke: #ea580c;
                  fill: #ea580c;
                  filter: drop-shadow(0 0 20px rgba(234, 88, 12, 1));
                }
              }
              @keyframes intensityFlicker {
                0%, 100% { 
                  opacity: 1;
                  brightness: 1;
                }
                10% { 
                  opacity: 0.8;
                  brightness: 0.7;
                }
                20% { 
                  opacity: 1.2;
                  brightness: 1.4;
                }
                30% { 
                  opacity: 0.6;
                  brightness: 0.5;
                }
                40% { 
                  opacity: 1.3;
                  brightness: 1.6;
                }
                50% { 
                  opacity: 0.9;
                  brightness: 0.8;
                }
                60% { 
                  opacity: 1.1;
                  brightness: 1.2;
                }
                70% { 
                  opacity: 0.7;
                  brightness: 0.6;
                }
                80% { 
                  opacity: 1.4;
                  brightness: 1.8;
                }
                90% { 
                  opacity: 0.8;
                  brightness: 0.7;
                }
              }              @keyframes alertBeam {
                0% { 
                  opacity: 0;
                  transform: translateY(-8px) scaleY(0.1) scaleX(0.5);
                  stroke: #f59e0b;
                  stroke-width: 0.5;
                }
                20% { 
                  opacity: 0.4;
                  transform: translateY(-4px) scaleY(0.4) scaleX(0.8);
                  stroke: #f97316;
                  stroke-width: 1;
                }
                40% { 
                  opacity: 0.8;
                  transform: translateY(-2px) scaleY(0.7) scaleX(1);
                  stroke: #ea580c;
                  stroke-width: 1.5;
                }
                60% { 
                  opacity: 1;
                  transform: translateY(0px) scaleY(1) scaleX(1.2);
                  stroke: #dc2626;
                  stroke-width: 2;
                }
                80% { 
                  opacity: 0.6;
                  transform: translateY(2px) scaleY(0.7) scaleX(1);
                  stroke: #f97316;
                  stroke-width: 1.5;
                }
                100% { 
                  opacity: 0;
                  transform: translateY(8px) scaleY(0.1) scaleX(0.5);
                  stroke: #f59e0b;
                  stroke-width: 0.5;
                }
              }
              @keyframes emergencyStrobe {
                0%, 100% { 
                  opacity: 0.1;
                  transform: scaleX(0.8) scaleY(0.2);
                  stroke: #f59e0b;
                }
                25% { 
                  opacity: 0.8;
                  transform: scaleX(1.5) scaleY(0.8);
                  stroke: #dc2626;
                }
                50% { 
                  opacity: 0.2;
                  transform: scaleX(0.6) scaleY(0.1);
                  stroke: #f97316;
                }
                75% { 
                  opacity: 0.9;
                  transform: scaleX(1.8) scaleY(1);
                  stroke: #dc2626;
                }
              }              .warning-container {
                animation: 
                  emergencyFlash 2.5s ease-in-out infinite,
                  urgentShake 3s ease-in-out infinite,
                  criticalVibration 1.5s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 1s, 0.5s;
              }
              .warning-triangle {
                animation: 
                  triangleAlert 4s ease-out infinite,
                  warningGlow 2.8s ease-in-out infinite,
                  intensityFlicker 1.2s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 0.8s, 1.5s;
              }
              .exclamation-line {
                animation: 
                  exclamationDraw 3.2s ease-out infinite,
                  warningGlow 2.5s ease-in-out infinite,
                  criticalVibration 1.8s ease-in-out infinite;
                transform-origin: 12px 10.5px;
                animation-delay: 1.2s, 1.8s, 2.2s;
              }
              .exclamation-dot {
                animation: 
                  dotAppear 3.5s ease-out infinite,
                  urgentShake 3.5s ease-in-out infinite,
                  intensityFlicker 1s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 2s, 2.8s, 3.2s;
              }              .alert-beam {
                animation: alertBeam 2s ease-in-out infinite;
                transform-origin: center center;
              }
              .alert-beam-1 { animation-delay: 0.3s; }
              .alert-beam-2 { animation-delay: 0.7s; }
              .alert-beam-3 { animation-delay: 1.1s; }
              .emergency-strobe {
                animation: emergencyStrobe 0.8s ease-in-out infinite;
                transform-origin: center center;
              }
              .emergency-strobe-1 { animation-delay: 0s; }
              .emergency-strobe-2 { animation-delay: 0.2s; }
              .emergency-strobe-3 { animation-delay: 0.4s; }
              .emergency-strobe-4 { animation-delay: 0.6s; }
            `}
          </style>
        </defs>
      )}

      <g className={animate ? "warning-container" : ""}>
        {/* Warning triangle - simplified */}
        <path
          d="M12 2L22 20H2L12 2Z"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          className={animate ? "warning-triangle" : ""}
        />
        
        {/* Exclamation mark - cleaner design */}
        <path
          d="M12 8V13"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          className={animate ? "exclamation-line" : ""}
        />
        
        <circle
          cx="12"
          cy="17"
          r="1.5"
          fill={color}
          className={animate ? "exclamation-dot" : ""}
        />
      </g>
    </svg>
  );
};

export default WarningIcon;
