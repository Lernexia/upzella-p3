import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const ExternalLinkIcon: React.FC<IconProps> = ({
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
              @keyframes external-link {
                0% { transform: translateY(0px) translateX(0px); }
                50% { transform: translateY(-2px) translateX(2px); }
                100% { transform: translateY(0px) translateX(0px); }
              }
              .external-link-animate {
                animation: external-link 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Link box */}
      <path
        d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* External arrow */}
      <path
        d="M14 4h6v6M20 4l-6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "external-link-animate" : ""}
      />
    </svg>
  );
};

export default ExternalLinkIcon;
