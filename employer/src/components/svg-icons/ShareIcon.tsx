import React from 'react';

interface ShareIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const ShareIcon: React.FC<ShareIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor'
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
      {/* Share icon with three connected circles representing sharing */}
      <circle
        cx="18"
        cy="5"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
        style={{
          animationDelay: '0s',
          animationDuration: '2s'
        }}
      />
      <circle
        cx="6"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
        style={{
          animationDelay: '0.3s',
          animationDuration: '2s'
        }}
      />
      <circle
        cx="18"
        cy="19"
        r="3"
        stroke={color}
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
        style={{
          animationDelay: '0.6s',
          animationDuration: '2s'
        }}
      />
      
      {/* Connection lines */}
      <path
        d="M8.59 13.51L15.42 17.49"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70 hover:opacity-100 transition-opacity duration-300"
      />
      <path
        d="M15.41 6.51L8.59 10.49"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70 hover:opacity-100 transition-opacity duration-300"
      />
    </svg>
  );
};

export default ShareIcon;
