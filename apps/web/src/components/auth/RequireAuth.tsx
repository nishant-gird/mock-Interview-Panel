'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/login');
  //   }
  // }, [isLoggedIn, router]);

  // if (!isLoggedIn) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return <>{children}</>;
}
