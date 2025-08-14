'use client';

import { LogoProps } from '@/types/props/LogoProps.types';
import Link from 'next/link';
import React from 'react';

// Professional Logo component for Upzella - HR Automation Platform
export const Logo = ({
  color = "gray-900",
  tagline = false,
  link = "/",
  size = "lg",
  className = "w-full"
}: LogoProps) => {
  const logoSizes: Record<"sm" | "md" | "lg", string> = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl"
  };

  const taglineSizes: Record<"sm" | "md" | "lg", string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm"
  };

  // Updated gradient: from-blue-500 via-purple-600 to-pink-500
  const gradientClass = "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500";

  return (
    <div className={`${className} flex items-start justify-start relative z-[20]`}>
      {link ? (
        <Link href={link} className="cursor-pointer relative group transition-all duration-300 ">
          <div className="flex flex-col items-start relative ">
            <h1 className={`${logoSizes[size]} font-brand font-bold tracking-tight leading-none w-fit`}>
              <span className={`text-${color} transition-colors duration-300`}>up</span>
              <span className={`text-transparent pr-[5px] bg-clip-text ${gradientClass} font-extrabold italic`}>zella</span>
            </h1>
            {tagline && (
              <p className={`${taglineSizes[size]} absolute top-[28px] right-[-30px] font-body font-medium text-${color} mt-1 tracking-wide uppercase`}>
                HR Autopilot
              </p>
            )}
          </div>
        </Link>
      ) : (
        <div className="relative">
          <div className="flex flex-col items-start relative">
            <h1 className={`${logoSizes[size]} font-brand font-bold tracking-tight leading-none`}>
              <span className={`text-${color}`}>up</span>
              <span className={`text-transparent pr-[5px] bg-clip-text ${gradientClass} font-extrabold italic`}>zella</span>
            </h1>
            {tagline && (
              <p className={`${taglineSizes[size]} absolute top-[28px] right-[-30px] font-body font-medium text-${color} mt-1 tracking-wide uppercase`}>
                HR Autopilot
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
