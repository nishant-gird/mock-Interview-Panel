'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { SessionsProvider } from './SessionsContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SessionsProvider>{children}</SessionsProvider>
    </AuthProvider>
  );
}
