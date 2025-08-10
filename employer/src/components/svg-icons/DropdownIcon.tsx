import React from 'react';

interface DropdownIconProps {
  className?: string;
  size?: number;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="3"
        y="6"
        width="18"
        height="3"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M18 7.5l-2 2-2-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="11"
        width="14"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="5"
        y="15"
        width="10"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
};

export default DropdownIcon;
