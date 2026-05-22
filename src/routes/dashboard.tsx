import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { Play, Flame, Trophy, Calendar, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const skills = [
  { n: "Communication", v: 82, c: "bg-primary" },
  { n: "Technical Depth", v: 71, c: "bg-success" },
  { n: "Answer Structure", v: 64, c: "bg-warning" },
  { n: "Confidence", v: 78, c: "bg-primary" },
];

const recent = [
  { id: "1", role: "Backend Engineer", date: "May 11, 2026", dur: "38 min", score: 82 },
  { id: "2", role: "Product Manager", date: "May 8, 2026", dur: "42 min", score: 67 },
  { id: "3", role: "Data Scientist", date: "May 5, 2026", dur: "35 min", score: 74 },
  { id: "4", role: "Backend Engineer", date: "May 2, 2026", dur: "30 min", score: 58 },
];

function scoreColor(s: number) {
  if (s >= 75) return "bg-success/15 text-success";
  if (s >= 60) return "bg-warning/15 text-warning";
  return "bg-danger/15 text-danger";
}

function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-border bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div>
          <div className="text-xs opacity-80">Welcome back</div>
          <h1 className="mt-1 text-2xl font-bold">Hi, Riya 👋</h1>
          <p className="mt-1 text-sm opacity-90">Your panel is warmed up. Let's run a session.</p>
        </div>
        <Link to="/schedule" className="inline-flex items-center gap-2 rounded-md bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:bg-card/90">
          <Play className="h-4 w-4" /> Start interview
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Calendar} label="Total Sessions" value="24" />
        <Stat icon={Trophy} label="Average Score" value="76%" />
        <Stat icon={Flame} label="Streak" value="7 days" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold">Skill performance</h3>
          <div className="mt-5 space-y-4">
            {skills.map((s) => (
              <div key={s.n}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.n}</span>
                  <span className="text-muted-foreground">{s.v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${s.c}`} style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold">Recent sessions</h3>
          <div className="mt-4 divide-y divide-border">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <div className="text-sm font-semibold">{r.role}</div>
                  <div className="text-xs text-muted-foreground">{r.date} · {r.dur}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${scoreColor(r.score)}`}>{r.score}%</span>
                  <Link to="/report/$id" params={{ id: r.id }} className="inline-flex items-center text-xs font-semibold text-primary hover:underline">
                    Report <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="grid h-9 w-9 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="h-4 w-4" /></div>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
    </div>
  );
}
