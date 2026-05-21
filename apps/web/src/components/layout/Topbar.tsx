'use client';

import { ReactNode } from 'react';
import { Bell, Search } from 'lucide-react';

interface TopbarProps {
  title?: string;
  children?: ReactNode;
}

export function Topbar({ title, children }: TopbarProps) {
  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-card border-b border-border flex items-center px-8 gap-6 z-40">
      {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}

      <div className="flex-1 flex items-center gap-4">
        {children}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
