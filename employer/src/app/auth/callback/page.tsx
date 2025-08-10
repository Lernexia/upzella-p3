'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient();
        
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        if (data.session) {
          // Session established, redirect to appropriate page
          // The auth context will handle the rest
          router.push('/dashboard');
        } else {
          // No session, redirect to login
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('Callback handling error:', err);
        setError('An unexpected error occurred');
        setTimeout(() => router.push('/auth/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="font-title text-xl font-semibold text-gray-900 mb-2">
            Completing Sign In...
          </h2>
          <p className="text-gray-600">Please wait while we set up your account</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="font-title text-xl font-semibold text-red-800 mb-2">
            Authentication Error
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
