import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const HelpIcon: React.FC<IconProps> = ({ 
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
              @keyframes helpPulse {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
              }
              .help-icon-animated circle {
                animation: helpPulse 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animate ? 'help-icon-animated' : ''}
      />
      <path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="17"
        r="1"
        fill={color}
        className={animate ? 'help-icon-animated' : ''}
      />
    </svg>
  );
};

export default HelpIcon;
export { HelpIcon };
