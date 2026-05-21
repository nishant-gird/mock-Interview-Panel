import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                  isComplete && 'bg-success text-white',
                  isActive && 'bg-primary text-white ring-4 ring-primary/20',
                  !isActive && !isComplete && 'bg-muted text-muted-foreground'
                )}
              >
                {isComplete ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={cn('mt-2 text-xs font-medium', isActive && 'text-primary')}>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 mx-2 transition-colors',
                  isComplete ? 'bg-success' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
