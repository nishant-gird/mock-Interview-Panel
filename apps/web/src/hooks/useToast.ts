'use client';

import { useState, useCallback } from 'react';

export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 5000) => {
      const id = `toast_${Date.now()}`;
      const toast: Toast = { id, message, type };
      setToasts(prev => [...prev, toast]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    },
    []
  );

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, add, remove };
}
