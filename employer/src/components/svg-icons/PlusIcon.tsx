"use client";

import { IconProps } from "@/types/props/IconProps.types";
import React from "react";

interface PlusIconProps extends IconProps {
    animate?: boolean;
    style?: React.CSSProperties;
}
export type SvgIconProps = PlusIconProps & React.SVGProps<SVGSVGElement>;

export const PlusIcon: React.FC<SvgIconProps> = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
    style,
    animate = false,
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`upzella-icon upzella-plus-icon ${animate ? 'animate-plus' : ''} ${className}`}
            style={style}
            {...props}
        >
            {/* Horizontal line */}
            <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                className={animate ? 'plus-vertical' : ''}
            />
            {/* Vertical line */}
            <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                className={animate ? 'plus-horizontal' : ''}
            />

            <style jsx>{`
        .animate-plus {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-plus:hover {
          transform: rotate(90deg) scale(1.1);
        }
        
        .animate-plus .plus-vertical {
          transform-origin: center;
          animation: plusVertical 0.6s ease-in-out;
        }
        
        .animate-plus .plus-horizontal {
          transform-origin: center;
          animation: plusHorizontal 0.6s ease-in-out 0.1s;
        }
        
        .animate-plus:hover .plus-vertical {
          animation: plusVerticalHover 0.3s ease-in-out;
        }
        
        .animate-plus:hover .plus-horizontal {
          animation: plusHorizontalHover 0.3s ease-in-out 0.05s;
        }
        
        .animate-plus:active {
          transform: rotate(90deg) scale(0.95);
          transition: all 0.1s ease-in-out;
        }
        
        /* Initial load animations */
        @keyframes plusVertical {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(0.7);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        @keyframes plusHorizontal {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(0.7);
          }
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        
        /* Hover animations */
        @keyframes plusVerticalHover {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.2);
          }
          100% {
            transform: scaleY(1);
          }
        }
        
        @keyframes plusHorizontalHover {
          0% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.2);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        /* Pulse animation for attention */
        .animate-plus.pulse {
          animation: plusPulse 2s infinite;
        }
        
        @keyframes plusPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        /* Rotate in animation */
        .animate-plus.rotate-in {
          animation: plusRotateIn 0.5s ease-out;
        }
        
        @keyframes plusRotateIn {
          0% {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          50% {
            opacity: 0.7;
            transform: rotate(-90deg) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }
        
        /* Success morph animation */
        .animate-plus.morph-success {
          animation: plusToCheck 0.6s ease-in-out;
        }
        
        @keyframes plusToCheck {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(45deg) scale(0.8);
          }
          50% {
            transform: rotate(90deg) scale(1.1);
          }
          75% {
            transform: rotate(135deg) scale(0.9);
          }
          100% {
            transform: rotate(180deg) scale(1);
          }
        }
      `}</style>
        </svg>
    );
};
