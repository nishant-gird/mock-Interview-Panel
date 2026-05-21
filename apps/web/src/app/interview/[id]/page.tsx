'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/Avatar';
import { QUESTIONS_BY_ROLE, INTERVIEWERS } from '@/data/seed';
import { Clock, Mic } from 'lucide-react';

const TOTAL_QUESTIONS = 8;

export default function InterviewPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [isEvaluating, setIsEvaluating] = useState(false);
  const router = useRouter();

  const questions = QUESTIONS_BY_ROLE['frontend'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = async () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setIsEvaluating(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEvaluating(false);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push(`/report/${params.id}`);
    }
  };

  const handleEnd = () => {
    router.push(`/report/${params.id}`);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Frontend Interview</h1>
          <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {TOTAL_QUESTIONS}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Clock className="w-5 h-5" />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Button variant="danger" size="sm" onClick={handleEnd}>
            End session
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6 flex-1">
        {/* Question panel (60%) */}
        <div className="flex-[3] space-y-6">
          <Card className="flex-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
                <p className="text-lg">{questions[currentQuestion % questions.length]}</p>
              </div>

              {isEvaluating && (
                <div className="text-center py-8">
                  <div className="inline-block">
                    <div className="animate-spin">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">Evaluating your answer...</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  disabled={isEvaluating}
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                >
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={isEvaluating} className="flex-1">
                  {isEvaluating ? 'Evaluating...' : currentQuestion === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next question'}
                </Button>
                <Button variant="secondary" disabled={isEvaluating}>
                  Skip
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Panel (40%) */}
        <div className="flex-[2] space-y-6">
          <Card>
            <h3 className="font-bold mb-6">Your panel</h3>
            <div className="space-y-4">
              {INTERVIEWERS.slice(0, 2).map((interviewer, i) => (
                <div
                  key={interviewer.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    i === currentQuestion % 2 ? 'border-primary bg-primary/5 ring-2 ring-primary/20 animate-pulse' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={interviewer.name} size="md" />
                    <div>
                      <p className="font-bold">{interviewer.name}</p>
                      <p className="text-xs text-muted-foreground">{interviewer.specialty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4">Status</h3>
            <div className="flex items-center gap-2 text-sm">
              <Mic className="w-4 h-4 text-success animate-pulse" />
              <span>Listening...</span>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4">Notes</h3>
            <textarea
              className="w-full h-32 p-3 border border-border rounded-lg resize-none text-sm"
              placeholder="Personal notes..."
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
