'use client';

import { createContext, useCallback, useState, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    // Fake login — just create a user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: email.split('@')[0],
      email,
    };
    setUser(newUser);
    setIsLoggedIn(true);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // Fake signup
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
    };
    setUser(newUser);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
