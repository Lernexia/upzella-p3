import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const UploadIcon: React.FC<IconProps> = ({
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
              @keyframes upload {
                0% { transform: translateY(2px); opacity: 0.7; }
                50% { transform: translateY(-2px); opacity: 1; }
                100% { transform: translateY(2px); opacity: 0.7; }
              }
              .upload-animate {
                animation: upload 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Upload arrow */}
      <path
        d="M12 2L12 16M5 9L12 2L19 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "upload-animate" : ""}
      />
      
      {/* Base/folder */}
      <path
        d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default UploadIcon;
