'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/StatCard';
import { ProgressBar } from '@/components/ProgressBar';
import { SAMPLE_SESSIONS } from '@/data/seed';
import { Zap, Clock, Flame, Target } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const completedSessions = SAMPLE_SESSIONS.filter(s => s.status === 'completed').length;
  const avgScore = Math.round(
    SAMPLE_SESSIONS.filter(s => s.score).reduce((a, b) => a + (b.score || 0), 0) /
      SAMPLE_SESSIONS.filter(s => s.score).length
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-muted-foreground">You're making great progress. Keep it up!</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard icon={<Zap className="w-6 h-6" />} label="Sessions completed" value={completedSessions} />
        <StatCard icon={<Target className="w-6 h-6" />} label="Avg score" value={avgScore} />
        <StatCard icon={<Flame className="w-6 h-6" />} label="Current streak" value="3 days" />
        <StatCard icon={<Clock className="w-6 h-6" />} label="Hours practiced" value="12.5h" />
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Skill performance</h2>
        <div className="space-y-6">
          <ProgressBar label="Communication" value={72} />
          <ProgressBar label="Problem solving" value={78} />
          <ProgressBar label="Technical depth" value={81} />
          <ProgressBar label="System design" value={65} />
          <ProgressBar label="Behavioral" value={74} />
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Recent sessions</h2>
        <div className="space-y-4">
          {SAMPLE_SESSIONS.slice(0, 3).map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{session.role} Interview</p>
                <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-bold ${session.score ? 'text-primary' : 'text-muted-foreground'}`}>
                  {session.score || 'Scheduled'}
                </span>
                <Link href={`/report/${session.id}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Link href="/schedule">
        <Button size="lg" className="w-full">
          Schedule your next interview
        </Button>
      </Link>
    </div>
  );
}
