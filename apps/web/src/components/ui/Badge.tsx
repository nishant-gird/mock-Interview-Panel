import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', ...props }, ref) => {
    const variants = {
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      danger: 'bg-danger/10 text-danger',
      neutral: 'bg-muted text-muted-foreground',
      primary: 'bg-primary/10 text-primary',
    };

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold', variants[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
