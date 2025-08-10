import React from 'react';

interface RadioIconProps {
  className?: string;
  size?: number;
}

const RadioIcon: React.FC<RadioIconProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
};

export default RadioIcon;
