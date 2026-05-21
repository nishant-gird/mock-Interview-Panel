'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Stepper } from '@/components/Stepper';
import { RadioCard } from '@/components/ui/RadioCard';
import { SAMPLE_SESSIONS, INTERVIEWERS } from '@/data/seed';

const steps = ['Role', 'Panel', 'Difficulty', 'Date & Time', 'Confirm'];
const roles = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
];

export default function SchedulePage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [selectedPanel, setSelectedPanel] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('');
  const router = useRouter();

  const handleSchedule = () => {
    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Schedule an interview</h1>
        <p className="text-muted-foreground">Choose your role, panel, and difficulty</p>
      </div>

      <Card>
        <Stepper steps={steps} currentStep={step} />

        <div className="mt-12 min-h-96">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Pick a role</h2>
              {roles.map(r => (
                <RadioCard
                  key={r.value}
                  label={r.label}
                  name="role"
                  value={r.value}
                  checked={role === r.value}
                  onChange={e => setRole(e.target.value)}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Build your panel (2-4 interviewers)</h2>
              {INTERVIEWERS.slice(0, 4).map(interviewer => (
                <label key={interviewer.id} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPanel.includes(interviewer.id)}
                    onChange={e =>
                      setSelectedPanel(e.target.checked ? [...selectedPanel, interviewer.id] : selectedPanel.filter(id => id !== interviewer.id))
                    }
                  />
                  <div>
                    <p className="font-medium">{interviewer.name}</p>
                    <p className="text-sm text-muted-foreground">{interviewer.specialty}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Select difficulty</h2>
              {['easy', 'medium', 'hard'].map(d => (
                <RadioCard
                  key={d}
                  label={d.charAt(0).toUpperCase() + d.slice(1)}
                  name="difficulty"
                  value={d}
                  checked={difficulty === d}
                  onChange={e => setDifficulty(e.target.value)}
                />
              ))}
            </div>
          )}

          {step >= 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Confirm your selection</h2>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>
                  <strong>Role:</strong> {role}
                </p>
                <p>
                  <strong>Difficulty:</strong> {difficulty}
                </p>
                <p>
                  <strong>Panel:</strong> {selectedPanel.length} interviewers
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} className="flex-1">
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1">
              Next
            </Button>
          ) : (
            <Button onClick={handleSchedule} className="flex-1">
              Schedule interview
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
