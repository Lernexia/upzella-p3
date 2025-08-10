import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

interface GripVerticalIconProps extends IconProps {
  orientation?: 'vertical' | 'horizontal';
}

const GripVerticalIcon: React.FC<GripVerticalIconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  animate = false,
  orientation = 'vertical'
}) => {
  const dotSize = size <= 16 ? 1.5 : size <= 20 ? 2 : 2.5;
  const spacing = size <= 16 ? 3 : size <= 20 ? 4 : 5;
  
  // Calculate positions based on orientation
  const positions = orientation === 'vertical' 
    ? [
        // Left column
        { x: size/2 - spacing/2, y: size/2 - spacing },
        { x: size/2 - spacing/2, y: size/2 },
        { x: size/2 - spacing/2, y: size/2 + spacing },
        // Right column
        { x: size/2 + spacing/2, y: size/2 - spacing },
        { x: size/2 + spacing/2, y: size/2 },
        { x: size/2 + spacing/2, y: size/2 + spacing }
      ]
    : [
        // Top row
        { x: size/2 - spacing, y: size/2 - spacing/2 },
        { x: size/2, y: size/2 - spacing/2 },
        { x: size/2 + spacing, y: size/2 - spacing/2 },
        // Bottom row
        { x: size/2 - spacing, y: size/2 + spacing/2 },
        { x: size/2, y: size/2 + spacing/2 },
        { x: size/2 + spacing, y: size/2 + spacing/2 }
      ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes gripPulse {
                0%, 100% { 
                  opacity: 0.6;
                  transform: scale(1);
                }
                50% { 
                  opacity: 1;
                  transform: scale(1.1);
                }
              }
              .grip-dot {
                animation: gripPulse 2s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {positions.map((pos, index) => (
        <circle
          key={index}
          cx={pos.x}
          cy={pos.y}
          r={dotSize}
          fill={color}
          className={animate ? 'grip-dot' : ''}
          style={animate ? { animationDelay: `${index * 0.1}s` } : {}}
        />
      ))}
    </svg>
  );
};

export default GripVerticalIcon;