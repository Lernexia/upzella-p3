import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const CurrencyIcon: React.FC<IconProps> = ({
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
              @keyframes currency-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
              .currency-animate {
                animation: currency-float 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Currency symbol outline */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className={animate ? "currency-animate" : ""}
      />
      
      {/* Dollar/Currency symbol */}
      <path
        d="M12 6v12M8 9.5a3.5 3.5 0 0 1 7 0M8 14.5a3.5 3.5 0 0 0 7 0"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "currency-animate" : ""}
      />
    </svg>
  );
};

export default CurrencyIcon;
