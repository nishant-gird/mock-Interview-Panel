'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SAMPLE_REPORT } from '@/data/seed';
import { scoreLabel, scoreColor } from '@/lib/scoreColor';
import { useState } from 'react';

export default function ReportPage({ params }: { params: { id: string } }) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Interview Report</h1>
        <p className="text-muted-foreground">Frontend Engineer - Medium Difficulty</p>
      </div>

      <Card className="text-center">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white mb-6" style={{ backgroundColor: scoreColor(SAMPLE_REPORT.overall) }}>
            {SAMPLE_REPORT.overall}
          </div>
          <h2 className="text-3xl font-bold mb-2">{scoreLabel(SAMPLE_REPORT.overall)}</h2>
          <p className="text-muted-foreground mb-6">Overall Score</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Skill breakdown</h2>
        <div className="space-y-4">
          {Object.entries(SAMPLE_REPORT.skills).map(([skill, score]) => (
            <div key={skill} className="flex items-center justify-between">
              <span className="capitalize font-medium">{skill.replace(/([A-Z])/g, ' $1')}</span>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
              </div>
              <span className="font-bold ml-4 w-8 text-right">{score}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Question feedback</h2>
        <div className="space-y-4">
          {SAMPLE_REPORT.questions.map((q, i) => (
            <div key={i} className="border border-border rounded-lg">
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <span className="text-lg font-bold text-primary">{q.score}/10</span>
                  <span className="font-medium">{q.q}</span>
                </div>
                <span>{expandedQuestion === i ? '−' : '+'}</span>
              </button>
              {expandedQuestion === i && (
                <div className="p-4 border-t border-border space-y-4 bg-muted/30">
                  <div>
                    <h4 className="font-bold mb-2">Your answer</h4>
                    <p className="text-sm text-muted-foreground">{q.answer}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">AI Feedback</h4>
                    <p className="text-sm">{q.feedback}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Model answer</h4>
                    <p className="text-sm">{q.modelAnswer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <Button className="flex-1">Schedule another</Button>
        <Button variant="secondary" className="flex-1">
          Download PDF
        </Button>
      </div>
    </div>
  );
}
