'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from './Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const authPages = ['/auth/login', '/auth/signup', '/auth/callback'];
const publicPages = ['/', ...authPages];

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Don't show navbar on public pages or when loading
  const shouldShowNavbar = !publicPages.includes(pathname) && user && !loading;

  // For auth pages, show children without navbar
  if (publicPages.includes(pathname)) {
    return <>{children}</>;
  }

  // For protected pages, show navbar if user is authenticated
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className={shouldShowNavbar ? '' : ''}>
        {children}
      </div>
    </>
  );
};
