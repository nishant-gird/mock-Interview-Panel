'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SAMPLE_SESSIONS } from '@/data/seed';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your sessions</h1>
        <p className="text-muted-foreground">View all your past and upcoming interviews</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Difficulty</th>
                <th className="text-left py-3 px-4 font-semibold">Score</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-right py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_SESSIONS.map(session => (
                <tr key={session.id} className="border-b border-border hover:bg-muted">
                  <td className="py-3 px-4">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-medium">{session.role}</td>
                  <td className="py-3 px-4 capitalize">{session.difficulty}</td>
                  <td className="py-3 px-4">{session.score || '—'}</td>
                  <td className="py-3 px-4">
                    <Badge variant={session.status === 'completed' ? 'success' : 'neutral'}>
                      {session.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {session.status === 'completed' && (
                      <Link href={`/report/${session.id}`}>
                        <Button variant="ghost" size="sm">
                          View report
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
