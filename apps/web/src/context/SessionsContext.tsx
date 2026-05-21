'use client';

import { createContext, useCallback, useState, ReactNode } from 'react';

export type Session = {
  id: string;
  date: string;
  role: string;
  panel: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  score: number | null;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export type SessionsContextType = {
  sessions: Session[];
  addSession: (session: Session) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
};

export const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = useCallback((session: Session) => {
    setSessions(prev => [session, ...prev]);
  }, []);

  const updateSession = useCallback((id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  return (
    <SessionsContext.Provider value={{ sessions, addSession, updateSession }}>
      {children}
    </SessionsContext.Provider>
  );
}
