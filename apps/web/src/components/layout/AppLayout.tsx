'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { RequireAuth } from '../auth/RequireAuth';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <RequireAuth>
      <Sidebar />
      <div className="ml-56">
        <Topbar title={title} />
        <main className="pt-20 pb-12 px-8">{children}</main>
      </div>
    </RequireAuth>
  );
}
