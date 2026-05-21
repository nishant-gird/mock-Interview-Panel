import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return src ? (
    <img
      src={src}
      alt={name}
      className={cn('rounded-full bg-primary/10 object-cover', sizes[size], className)}
    />
  ) : (
    <div
      className={cn(
        'rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary',
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
