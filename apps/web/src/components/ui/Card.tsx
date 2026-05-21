import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-card rounded-lg p-6 shadow-sm border border-border', className)}
      {...props}
    />
  )
);

Card.displayName = 'Card';
