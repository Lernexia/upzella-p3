'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Define color variants for stats cards
export type StatsColorVariant = 
  | 'purple'    // Purple to Pink gradient (primary brand)
  | 'blue'      // Blue to Cyan gradient (info/data)
  | 'green'     // Green to Emerald gradient (success/growth)
  | 'orange'    // Orange to Yellow gradient (warnings/metrics)
  | 'red'       // Red to Pink gradient (alerts/critical)
  | 'indigo'    // Indigo to Purple gradient (insights/analytics)
  | 'teal'      // Teal to Green gradient (performance)
  | 'rose'      // Rose to Pink gradient (engagement/social)
  | 'slate'     // Slate to Gray gradient (neutral/default)
  | 'amber';    // Amber to Orange gradient (activity/trending)

// Define individual stat item
export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  colorVariant?: StatsColorVariant;
  description?: string;
  trending?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

// Props for the container
export interface StatsContainerProps {
  stats: StatItem[];
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 2 | 3 | 4 | 5 | 6 | 8;
  className?: string;
  background?: 'transparent' | 'gradient' | 'solid';
  title?: string;
  description?: string;
}

// Color variant mappings
const colorVariants: Record<StatsColorVariant, string> = {
  purple: 'from-purple-500 to-pink-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  orange: 'from-orange-500 to-yellow-500',
  red: 'from-red-500 to-pink-500',
  indigo: 'from-indigo-500 to-purple-500',
  teal: 'from-teal-500 to-green-500',
  rose: 'from-rose-500 to-pink-500',
  slate: 'from-slate-500 to-gray-500',
  amber: 'from-amber-500 to-orange-500',
};

// Background color class mappings
const getBackgroundColorClass = (variant: StatsColorVariant): string => {
  const backgroundClasses: Record<StatsColorVariant, string> = {
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
const getBorderColorClass = (variant: StatsColorVariant): string => {
  const borderClasses: Record<StatsColorVariant, string> = {
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
const getTextGradientClass = (variant: StatsColorVariant): string => {
  const textGradientClasses: Record<StatsColorVariant, string> = {
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
const getIconBackgroundClass = (variant: StatsColorVariant): string => {
  const iconBackgroundClasses: Record<StatsColorVariant, string> = {
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
const getIconColorClass = (variant: StatsColorVariant): string => {
  const iconColorClasses: Record<StatsColorVariant, string> = {
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

// Trending icons (using basic icons for now)
const TrendingUpIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendingDownIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const TrendingStableIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export function StatsContainer({ 
  stats, 
  cols = 3, 
  gap = 6, 
  className,
  background = 'transparent',
  title,
  description
}: StatsContainerProps) {
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

  const backgroundClasses = {
    transparent: '',
    gradient: 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-6 rounded-xl',
    solid: 'bg-white border border-slate-200 p-6',
  };

  return (
    <div className={cn(
      'space-y-6',
      backgroundClasses[background],
      className
    )}>
      {/* Header */}
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-xl font-heading font-semibold text-slate-800 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-slate-600 font-body">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className={cn(
        'grid',
        gridCols[cols],
        gapClasses[gap]
      )}>
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          const gradientClass = colorVariants[stat.colorVariant || 'purple'];
          
          const getTrendingIcon = (trend?: 'up' | 'down' | 'stable') => {
            switch (trend) {
              case 'up':
                return <TrendingUpIcon size={14} className="text-green-600" />;
              case 'down':
                return <TrendingDownIcon size={14} className="text-red-600" />;
              case 'stable':
                return <TrendingStableIcon size={14} className="text-slate-500" />;
              default:
                return null;
            }
          };

          const getTrendingColor = (trend?: 'up' | 'down' | 'stable') => {
            switch (trend) {
              case 'up':
                return 'text-green-600';
              case 'down':
                return 'text-red-600';
              case 'stable':
                return 'text-slate-500';
              default:
                return 'text-slate-500';
            }
          };          return (
            <div
              key={stat.id}
              className={cn(
                "backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1",
                getBackgroundColorClass(stat.colorVariant || 'purple'),
                getBorderColorClass(stat.colorVariant || 'purple')
              )}
              style={{ borderRadius: "var(--border-radius-upzella)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2 font-body">
                    {stat.label}
                  </p>
                  <p className={cn(
                    "text-3xl font-bold font-heading",
                    getTextGradientClass(stat.colorVariant || 'purple')
                  )}>
                    {stat.value}
                  </p>
                  {stat.description && (
                    <p className="text-xs text-slate-500 mt-2 font-body">
                      {stat.description}
                    </p>
                  )}
                  {/* Trending indicator */}
                  {stat.trending && stat.trendValue && (
                    <div className={cn(
                      'flex items-center space-x-1 text-xs font-medium font-accent mt-1',
                      getTrendingColor(stat.trending)
                    )}>
                      {getTrendingIcon(stat.trending)}
                      <span>{stat.trendValue}</span>
                    </div>
                  )}
                </div>
                {IconComponent && (
                  <div
                    className={cn(
                      "w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                      getIconBackgroundClass(stat.colorVariant || 'purple')
                    )}
                    style={{ borderRadius: "var(--border-radius-upzella)" }}
                  >
                    <IconComponent size={28} className={cn("w-7 h-7", getIconColorClass(stat.colorVariant || 'purple'))} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Export for easier imports
export default StatsContainer;
