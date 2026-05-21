import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  delta?: string;
  className?: string;
}

export function StatCard({ icon, label, value, delta, className }: StatCardProps) {
  return (
    <div className={cn('bg-card rounded-lg p-6 shadow-sm border border-border', className)}>
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {delta && <span className={cn('text-sm font-medium', delta.startsWith('+') ? 'text-success' : 'text-danger')}>{delta}</span>}
      </div>
    </div>
  );
}
