'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Define color variants for info cards
export type InfoCardColorVariant = 
  | 'purple'    // Purple to Fuchsia gradient
  | 'blue'      // Indigo to Blue gradient
  | 'green'     // Emerald to Teal gradient
  | 'orange'    // Orange to Amber gradient
  | 'red'       // Rose to Pink gradient
  | 'indigo'    // Indigo to Purple gradient
  | 'teal'      // Teal to Cyan gradient
  | 'rose'      // Rose to Pink gradient
  | 'slate'     // Slate to Gray gradient
  | 'amber';    // Amber to Yellow gradient

// Define info card item
export interface InfoCardData {
  id?: string;
  label: string;
  value: string | number | React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  colorVariant?: InfoCardColorVariant;
  onClick?: () => void;
  className?: string;
}

// Props for the info card component
export interface InfoCardProps extends InfoCardData {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

// Background color class mappings for card backgrounds
const getBackgroundColorClass = (variant: InfoCardColorVariant): string => {
  const backgroundClasses: Record<InfoCardColorVariant, string> = {
    purple: 'bg-gradient-to-br from-purple-50 via-fuchsia-50/50 to-fuchsia-50',
    blue: 'bg-gradient-to-br from-indigo-50 via-blue-50/50 to-blue-50',
    green: 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-teal-50',
    orange: 'bg-gradient-to-br from-orange-50 via-amber-50/50 to-amber-50',
    red: 'bg-gradient-to-br from-rose-50 via-pink-50/50 to-pink-50',
    indigo: 'bg-gradient-to-br from-indigo-50 via-purple-50/50 to-purple-50',
    teal: 'bg-gradient-to-br from-teal-50 via-cyan-50/50 to-cyan-50',
    rose: 'bg-gradient-to-br from-rose-50 via-pink-50/50 to-pink-50',
    slate: 'bg-gradient-to-br from-slate-50 via-gray-50/50 to-gray-50',
    amber: 'bg-gradient-to-br from-amber-50 via-yellow-50/50 to-yellow-50',
  };
  return backgroundClasses[variant];
};

// Border color class mappings
const getBorderColorClass = (variant: InfoCardColorVariant): string => {
  const borderClasses: Record<InfoCardColorVariant, string> = {
    purple: 'border border-purple-200/50',
    blue: 'border border-indigo-200/50',
    green: 'border border-emerald-200/50',
    orange: 'border border-orange-200/50',
    red: 'border border-rose-200/50',
    indigo: 'border border-indigo-200/50',
    teal: 'border border-teal-200/50',
    rose: 'border border-rose-200/50',
    slate: 'border border-slate-200/50',
    amber: 'border border-amber-200/50',
  };
  return borderClasses[variant];
};

// Text gradient class mappings
const getTextGradientClass = (variant: InfoCardColorVariant): string => {
  const textGradientClasses: Record<InfoCardColorVariant, string> = {
    purple: 'text-gradient-pink-shade',
    blue: 'text-gradient-blue-shade',
    green: 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent',
    orange: 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent',
    red: 'text-gradient-pink-shade',
    indigo: 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent',
    teal: 'bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent',
    rose: 'text-gradient-pink-shade',
    slate: 'bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent',
    amber: 'bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent',
  };
  return textGradientClasses[variant];
};

// Icon background class mappings
const getIconBackgroundClass = (variant: InfoCardColorVariant): string => {
  const iconBackgroundClasses: Record<InfoCardColorVariant, string> = {
    purple: 'bg-gradient-to-br from-purple-100 to-fuchsia-100',
    blue: 'bg-gradient-to-br from-indigo-100 to-blue-100',
    green: 'bg-gradient-to-br from-emerald-100 to-teal-100',
    orange: 'bg-gradient-to-br from-orange-100 to-amber-100',
    red: 'bg-gradient-to-br from-rose-100 to-pink-100',
    indigo: 'bg-gradient-to-br from-indigo-100 to-purple-100',
    teal: 'bg-gradient-to-br from-teal-100 to-cyan-100',
    rose: 'bg-gradient-to-br from-rose-100 to-pink-100',
    slate: 'bg-gradient-to-br from-slate-100 to-gray-100',
    amber: 'bg-gradient-to-br from-amber-100 to-yellow-100',
  };
  return iconBackgroundClasses[variant];
};

// Icon color class mappings
const getIconColorClass = (variant: InfoCardColorVariant): string => {
  const iconColorClasses: Record<InfoCardColorVariant, string> = {
    purple: 'text-purple-600',
    blue: 'text-indigo-600',
    green: 'text-emerald-600',
    orange: 'text-orange-600',
    red: 'text-rose-600',
    indigo: 'text-indigo-600',
    teal: 'text-teal-600',
    rose: 'text-rose-600',
    slate: 'text-slate-600',
    amber: 'text-amber-600',
  };
  return iconColorClasses[variant];
};

export function InfoCard({ 
  label,
  value,
  icon: IconComponent,
  colorVariant = 'blue',
  onClick,
  size = 'md',
  interactive = true,
  className
}: InfoCardProps) {
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const iconSizes = {
    sm: { container: 'w-10 h-10', icon: 20 },
    md: { container: 'w-14 h-14', icon: 28 },
    lg: { container: 'w-16 h-16', icon: 32 }
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const isClickable = interactive && onClick;

  return (
    <div
      className={cn(
        "backdrop-blur-sm transition-all duration-300",
        getBackgroundColorClass(colorVariant),
        getBorderColorClass(colorVariant),
        sizeClasses[size],
        isClickable && "group cursor-pointer hover:shadow-xl transform hover:-translate-y-1",
        !isClickable && "hover:shadow-lg",
        className
      )}
      style={{ borderRadius: "var(--border-radius-upzella)" }}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className={cn(
          "flex-1 min-w-0",
          !IconComponent && "text-wrap "
        )}>
          <p className="text-sm font-semibold text-slate-600 mb-2 font-body text-wrap">
            {label}
          </p>
          <div className={cn(
            "font-bold font-heading text-wrap",
            textSizes[size],
            getTextGradientClass(colorVariant),
            !IconComponent && "text-wrap"
          )}>
            {value}
          </div>
        </div>
        
        {IconComponent && (
          <div
            className={cn(
              "flex items-center justify-center flex-shrink-0 ml-4",
              iconSizes[size].container,
              getIconBackgroundClass(colorVariant),
              interactive && "group-hover:scale-110 transition-transform duration-300"
            )}
            style={{ borderRadius: "var(--border-radius-upzella)" }}
          >
            <IconComponent 
              size={iconSizes[size].icon} 
              className={cn("w-7 h-7", getIconColorClass(colorVariant))} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Container component for multiple info cards
export interface InfoCardContainerProps {
  cards: InfoCardData[];
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 3 | 4 | 5 | 6 | 8;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export function InfoCardContainer({
  cards,
  cols = 3,
  gap = 6,
  size = 'md',
  interactive = true,
  className
}: InfoCardContainerProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapClasses = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={cn(
      'grid',
      gridCols[cols],
      gapClasses[gap],
      className
    )}>
      {cards.map((card, index) => (
        <InfoCard
          key={card.id || index}
          {...card}
          size={size}
          interactive={interactive}
        />
      ))}
    </div>
  );
}

// Export for easier imports
export default InfoCard;
