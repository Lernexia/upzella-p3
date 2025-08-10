import React from 'react';

interface EditIconProps {
  className?: string;
  size?: number;
  color?: string;
  animate?: boolean;
}

export const EditIcon: React.FC<EditIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
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
      {/* Pencil body */}
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? 'animate-pulse' : ''}
        style={{
          animationDuration: animate ? '2s' : undefined,
          animationDelay: animate ? '0.2s' : undefined
        }}
      />
      
      {/* Edit pencil */}
      <path
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={animate ? 'none' : 'none'}
        className={animate ? 'edit-pencil-animation' : ''}
      />
      
      {/* Edit line indicator */}
      <path
        d="M15 7l2 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? 'edit-line-animation' : ''}
      />

      {/* Animation styles */}
      <style jsx>{`
        @keyframes editPencil {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          25% { 
            transform: translate(-1px, -1px) rotate(-2deg);
            opacity: 0.8;
          }
          50% { 
            transform: translate(1px, 1px) rotate(2deg);
            opacity: 0.9;
          }
          75% { 
            transform: translate(-0.5px, 0.5px) rotate(-1deg);
            opacity: 0.8;
          }
        }
        
        @keyframes editLine {
          0%, 100% { 
            opacity: 0.6;
            stroke-width: 2;
          }
          50% { 
            opacity: 1;
            stroke-width: 3;
          }
        }
        
        .edit-pencil-animation {
          animation: editPencil 1.5s ease-in-out infinite;
          transform-origin: center;
        }
        
        .edit-line-animation {
          animation: editLine 1.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>
    </svg>
  );
};

export default EditIcon;
