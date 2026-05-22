import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import { Download, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/report/$id")({ component: Report });

const breakdown = [
  { n: "Communication", v: 82 },
  { n: "Technical Depth", v: 71 },
  { n: "Structure", v: 75 },
  { n: "Confidence", v: 84 },
];

const qs = [
  { q: "Tell me about yourself.", a: "I'm a backend engineer with 4 years of experience…", fb: "Strong, concise opening. Try to mention one specific impact metric.", score: 82, model: "Use the present–past–future framework…" },
  { q: "Design a rate limiter for 50k req/sec.", a: "I'd use a token bucket per user, stored in Redis…", fb: "Good structure, missed discussing edge cases for distributed counters.", score: 71, model: "Start by clarifying scope (per-user vs global)…" },
  { q: "Tell me about a disagreement.", a: "I once disagreed about migrating to a new framework…", fb: "Apply STAR more clearly. The Result section was light.", score: 68, model: "Situation: We needed to choose between… Task… Action… Result…" },
];

function ringColor(s: number) {
  if (s >= 75) return "text-success";
  if (s >= 60) return "text-warning";
  return "text-danger";
}

function Report() {
  return (
    <AppLayout title="Feedback Report">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Backend Engineer</div>
            <h1 className="mt-1 text-2xl font-bold">Mock Interview · May 11, 2026</h1>
            <div className="mt-1 text-sm text-muted-foreground">38 min · 6 questions · 3 interviewers</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Overall score</div>
            <div className={`text-5xl font-bold ${ringColor(78)}`}>78%</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {breakdown.map((b) => (
            <div key={b.n} className="rounded-xl border border-border p-4">
              <div className="text-xs text-muted-foreground">{b.n}</div>
              <div className="mt-1 text-2xl font-bold">{b.v}%</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${b.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">Question breakdown</h2>
      <div className="space-y-3">
        {qs.map((it, i) => <QCard key={i} idx={i} {...it} />)}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Summary icon={CheckCircle2} color="text-success" bg="bg-success/10" title="Strengths" items={["Clear structured opening", "Good ownership of past work", "Confident tone"]} />
        <Summary icon={AlertTriangle} color="text-warning" bg="bg-warning/10" title="Areas to Improve" items={["Use STAR more consistently", "Quantify impact (numbers, %)", "Address edge cases in design"]} />
        <Summary icon={Sparkles} color="text-primary" bg="bg-primary-soft" title="Recommended next steps" items={["Run a System Design round", "Re-do behavioral with STAR", "Read 'Designing Data-Intensive Apps'"]} />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/schedule" className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Schedule next session</Link>
        <button className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted">
          <Download className="h-4 w-4" /> Download report
        </button>
      </div>
    </AppLayout>
  );
}

function QCard({ idx, q, a, fb, score, model }: { idx: number; q: string; a: string; fb: string; score: number; model: string }) {
  const [open, setOpen] = useState(false);
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground">Q{idx + 1}</div>
          <div className="mt-1 font-semibold">{q}</div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${score >= 75 ? "bg-success/15 text-success" : score >= 60 ? "bg-warning/15 text-warning" : "bg-danger/15 text-danger"}`}>{score}%</span>
      </div>
      <button onClick={() => setOpen((v) => !v)} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />} Your answer
      </button>
      {open && <div className="mt-2 rounded-md bg-muted/40 p-3 text-sm">{a}</div>}
      <div className="mt-4 rounded-md border border-border bg-card p-3 text-sm">
        <div className="text-xs font-semibold text-primary">AI feedback</div>
        <div className="mt-1">{fb}</div>
      </div>
      <button onClick={() => setShowModel((v) => !v)} className="mt-3 text-xs font-semibold text-primary hover:underline">
        {showModel ? "Hide" : "Show"} model answer
      </button>
      {showModel && <div className="mt-2 rounded-md bg-primary-soft p-3 text-sm">{model}</div>}
    </div>
  );
}

function Summary({ icon: Icon, color, bg, title, items }: { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-md ${bg} ${color}`}><Icon className="h-4 w-4" /></div>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((x) => <li key={x} className="flex gap-2"><span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${color.replace("text-", "bg-")}`} />{x}</li>)}
      </ul>
    </div>
  );
}
