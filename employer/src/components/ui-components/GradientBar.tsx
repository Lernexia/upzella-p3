import React from 'react';

interface GradientBarProps {
  color: 'green' | 'violet' | 'blue' | 'purple' | 'amber' | 'orange' | 'emerald' | 'cyan' | 'slate';
  className?: string;
}

const colorGradients = {
  green: 'from-green-500 to-cyan-600',
  violet: 'from-violet-500 to-purple-600',
  blue: 'from-blue-500 to-purple-600',
  purple: 'from-purple-500 to-pink-600',
  amber: 'from-amber-500 to-orange-600',
  orange: 'from-orange-500 to-red-600',
  emerald: 'from-emerald-500 to-cyan-600',
  cyan: 'from-cyan-500 to-blue-600',
  slate: 'from-slate-500 to-slate-700'
};

export const GradientBar: React.FC<GradientBarProps> = ({ 
  color, 
  className = '' 
}) => {
  return (
    <span 
      className={`w-2 h-8 bg-gradient-to-b ${colorGradients[color]} ${className}`}
    />
  );
};
