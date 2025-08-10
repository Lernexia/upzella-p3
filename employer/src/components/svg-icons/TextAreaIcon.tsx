import React from 'react';

interface TextAreaIconProps {
  className?: string;
  size?: number;
}

const TextAreaIcon: React.FC<TextAreaIconProps> = ({ className = '', size = 20 }) => {
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
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M6 9h6M6 12h8M6 15h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TextAreaIcon;
