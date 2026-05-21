import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
      <textarea
        ref={ref}
        className={cn(
          'w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-muted disabled:cursor-not-allowed',
          error && 'border-danger focus:ring-danger',
          className
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  )
);

Textarea.displayName = 'Textarea';
