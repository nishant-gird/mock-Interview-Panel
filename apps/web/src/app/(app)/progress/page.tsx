'use client';

import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { SAMPLE_SESSIONS, generateHeatmapData } from '@/data/seed';

export default function ProgressPage() {
  const scoreData = SAMPLE_SESSIONS.filter(s => s.score)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10)
    .map(s => ({
      name: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: s.score || 0,
    }));

  const radarData = [
    { skill: 'Communication', score: 75 },
    { skill: 'Problem solving', score: 80 },
    { skill: 'Technical', score: 82 },
    { skill: 'System design', score: 70 },
    { skill: 'Behavioral', score: 77 },
  ];

  const heatmapData = generateHeatmapData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your progress</h1>
        <p className="text-muted-foreground">Track your improvement over time</p>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Score trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Skill performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
            <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Practice activity (last 12 weeks)</h2>
        <div className="grid grid-cols-12 gap-1">
          {heatmapData.map((day, i) => {
            const intensity = Math.min(3, day.count);
            const colors = ['bg-muted', 'bg-primary/30', 'bg-primary/60', 'bg-primary'];
            return (
              <div
                key={day.date}
                className={`w-full aspect-square rounded-sm ${colors[intensity]}`}
                title={`${day.date}: ${day.count} sessions`}
              />
            );
          })}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold mb-4">Top improvements</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Communication +12%</li>
            <li>✓ Problem solving +8%</li>
            <li>✓ Technical depth +6%</li>
          </ul>
        </Card>
        <Card>
          <h3 className="font-bold mb-4">Areas to focus</h3>
          <ul className="space-y-2 text-sm">
            <li>• System design (70%)</li>
            <li>• Behavioral interview (77%)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
