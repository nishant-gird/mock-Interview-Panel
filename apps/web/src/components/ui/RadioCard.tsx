import { HTMLAttributes, forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface RadioCardProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, label, description, icon, ...props }, ref) => (
    <label className="flex items-start gap-4 cursor-pointer">
      <input
        ref={ref}
        type="radio"
        className="w-5 h-5 mt-1 text-primary rounded focus:ring-primary"
        {...props}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-medium text-foreground">{label}</span>
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    </label>
  )
);

RadioCard.displayName = 'RadioCard';
