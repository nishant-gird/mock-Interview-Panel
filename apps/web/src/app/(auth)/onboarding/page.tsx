'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Stepper } from '@/components/Stepper';
import { Card } from '@/components/ui/Card';

const steps = ['Profile', 'Role', 'Experience', 'Goals'];
const roles = [
  { value: 'frontend', label: 'Frontend Engineer' },
  { value: 'backend', label: 'Backend Engineer' },
  { value: 'fullstack', label: 'Full Stack Engineer' },
];
const goals = ['FAANG prep', 'Switch domains', 'First job', 'Promotion', 'Practice English'];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => (prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-soft to-background p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Let's get started</h1>

        <Stepper steps={steps} currentStep={currentStep} />

        <div className="mt-12 min-h-48">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What's your name?</h2>
              <Input
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What role are you targeting?</h2>
              <Select
                options={roles}
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Years of experience</h2>
              <input
                type="range"
                min="0"
                max="20"
                value={experience}
                onChange={e => setExperience(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-center text-lg font-bold">{experience} years</p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">What are your goals?</h2>
              <div className="space-y-3">
                {goals.map(goal => (
                  <Checkbox
                    key={goal}
                    label={goal}
                    checked={selectedGoals.includes(goal)}
                    onChange={e => toggleGoal(goal)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="secondary" onClick={handleBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            {currentStep === steps.length - 1 ? 'Get started' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
