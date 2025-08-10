import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const StarIcon: React.FC<IconProps> = ({
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
              @keyframes starFill {
                0% { 
                  fill-opacity: 0;
                  transform: scale(1);
                }
                50% { 
                  fill-opacity: 0.5;
                  transform: scale(1.1);
                }
                100% { 
                  fill-opacity: 1;
                  transform: scale(1);
                }
              }
              @keyframes starGlow {
                0%{ 
                  filter: drop-shadow(0 0 0 rgba(255, 215, 0, 0));
                                    stroke: rgba(255, 215, 0, 0.6);

                }
                50%, 100% { 
                  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
                  stroke: rgba(255, 215, 0, 0.6);
                }
              }
              .star-main {
                animation: 
                  starFill 3s ease-in-out infinite,
                  starGlow 4s ease-in-out infinite;
                transform-origin: center center;
                animation-delay: 0s, 1s;
              }
            `}
                </style>
            </defs>
        )}      {/* Main star */}
            <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                fill={"rgba(255, 215, 0, 1)"}
            stroke={color}
            strokeWidth="0.5"
            strokeLinejoin="round"
            className={animate ? "star-main" : ""}
      />
        </svg>
    );
};

export default StarIcon;
