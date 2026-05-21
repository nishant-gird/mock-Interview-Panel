import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-3">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'w-5 h-5 rounded border border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer',
          className
        )}
        {...props}
      />
      {label && <label className="text-sm font-medium text-foreground cursor-pointer">{label}</label>}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';
