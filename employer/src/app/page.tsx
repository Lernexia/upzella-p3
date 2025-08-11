"use client";
import React from "react";
import { UpzellaLoader } from '@/components/ui-components/loader';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {

  // Redirect to dashboard if user is authenticated
  // Otherwise, show login options
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <UpzellaLoader text='Redirecting...' />
  );
}
