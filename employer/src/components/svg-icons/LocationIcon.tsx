import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const LocationIcon: React.FC<IconProps> = ({ 
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
           
              @keyframes locationFound {
                0% { stroke-dasharray: 0 20; stroke-dashoffset: 20; }
                50% { stroke-dasharray: 10 10; stroke-dashoffset: 10; }
                100% { stroke-dasharray: 20 0; stroke-dashoffset: 0; }
              }
           
              .location-pin {
                animation: pinDrop 2s ease-out infinite;
              }
              .location-center {
                animation: locationFound 3s ease-in-out infinite;
              }
              .gps-signal {
                animation: gpsSignal 4s ease-out infinite;
              }
            `}
          </style>
        </defs>
      )}      {/* Location pin */}
      <path 
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
        className={animate ? "location-pin" : ""}
      />
      
      {/* Location center */}
      <circle 
        cx="12" 
        cy="10" 
        r="3" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
        className={animate ? "location-center" : ""}
      />
      
      {/* GPS signal waves when animated */}
      {animate && (
        <>
          <circle 
            cx="12" 
            cy="10" 
            r="6" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.5"
            className="gps-signal"
            style={{ animationDelay: '0s' }}
          />
          <circle 
            cx="12" 
            cy="10" 
            r="8" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.3"
            className="gps-signal"
            style={{ animationDelay: '1s' }}
          />
          <circle 
            cx="12" 
            cy="10" 
            r="10" 
            fill="none" 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.2"
            className="gps-signal"
            style={{ animationDelay: '2s' }}
          />
          
          {/* Accuracy indicator */}
          <circle 
            cx="12" 
            cy="10" 
            r="1" 
            fill={color} 
            opacity="0.8"
          />
        </>
      )}
    </svg>
  );
};

export default LocationIcon;
