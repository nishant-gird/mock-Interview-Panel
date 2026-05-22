import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import {
  Search, Code2, BarChart3, Briefcase, Megaphone, Calculator, Users,
  CheckCircle2, ArrowRight, ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/schedule")({ component: Schedule });

const roles = [
  { i: Code2, t: "Software Engineer", d: "Coding, system design, architecture" },
  { i: BarChart3, t: "Data Scientist", d: "ML, statistics, case studies" },
  { i: Briefcase, t: "Product Manager", d: "Product sense, prioritization" },
  { i: Megaphone, t: "Marketing Manager", d: "Strategy, growth, brand" },
  { i: Calculator, t: "Finance Analyst", d: "Modeling, valuation, accounting" },
  { i: Users, t: "HR Manager", d: "People ops, hiring, culture" },
];

const interviewers = [
  { id: "hr", name: "Priya Rao", role: "HR Interviewer", initials: "PR", focus: ["Behavioral", "Culture fit", "Motivation"] },
  { id: "tech", name: "Arjun Sharma", role: "Technical Lead", initials: "AS", focus: ["Coding", "Problem solving", "System design"] },
  { id: "mgr", name: "Rahul Kapoor", role: "Engineering Manager", initials: "RK", focus: ["Leadership", "Conflict", "Strategy"] },
];

const STEPS = ["Role", "Panel", "Difficulty", "Date & Time", "Confirm"];

function Schedule() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [role, setRole] = useState("Software Engineer");
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState<string[]>(["hr", "tech", "mgr"]);
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [rounds, setRounds] = useState<string[]>(["Technical Round", "HR Round"]);
  const [exp, setExp] = useState(3);
  const [date, setDate] = useState<number | null>(15);
  const [time, setTime] = useState<string | null>("10:30 AM");

  const nav = useNavigate();

  if (done) return <Confirmation role={role} date={date} time={time} onDash={() => nav({ to: "/dashboard" })} onStart={() => nav({ to: "/interview/$id", params: { id: "new" } })} />;

  const togglePanel = (id: string) => setPanel((p) => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleRound = (r: string) => setRounds((p) => p.includes(r) ? p.filter(x => x !== r) : [...p, r]);

  return (
    <AppLayout title="Schedule Interview">
      <div className="mx-auto max-w-4xl">
        <Stepper step={step} />

        <div className="mt-6 rounded-2xl border border-border bg-card p-7 shadow-sm">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold">Choose your role</h2>
              <p className="mt-1 text-sm text-muted-foreground">We'll tailor questions to this role.</p>
              <div className="relative mt-5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles…"
                  className="w-full rounded-md border border-border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roles.filter(r => r.t.toLowerCase().includes(search.toLowerCase())).map((r) => {
                  const sel = role === r.t;
                  return (
                    <button
                      key={r.t}
                      onClick={() => setRole(r.t)}
                      className={`rounded-xl border p-4 text-left transition ${sel ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}
                    >
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary"><r.i className="h-4 w-4" /></div>
                      <div className="text-sm font-semibold">{r.t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{r.d}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold">Choose your interviewers</h2>
              <p className="mt-1 text-sm text-muted-foreground">Pick one or more to build your panel.</p>
              <div className="mt-5 space-y-3">
                {interviewers.map((p) => {
                  const on = panel.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePanel(p.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${on ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}
                    >
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{p.initials}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.role}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.focus.map((f) => (
                            <span key={f} className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground border border-border">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className={`grid h-6 w-6 place-items-center rounded-full border-2 ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                        {on && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 rounded-lg bg-muted/50 px-4 py-3 text-sm">
                <span className="font-semibold">{panel.length}-person panel</span>
                <span className="text-muted-foreground"> · Est. {15 + panel.length * 10}–{20 + panel.length * 12} min</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold">Difficulty & rounds</h2>
              <p className="mt-1 text-sm text-muted-foreground">Set the bar for this session.</p>
              <div className="mt-5">
                <div className="text-sm font-medium">Difficulty</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced", "FAANG Level"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium ${difficulty === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <div className="text-sm font-medium">Round type</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {["HR Round", "Technical Round", "System Design", "Behavioral (STAR)", "Case Study"].map((r) => (
                    <label key={r} className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-muted/40">
                      <input type="checkbox" checked={rounds.includes(r)} onChange={() => toggleRound(r)} className="h-4 w-4 accent-[oklch(0.48_0.13_250)]" />
                      <span className="text-sm">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Experience level</span>
                  <span className="text-muted-foreground">{exp} year{exp === 1 ? "" : "s"}</span>
                </div>
                <input type="range" min={0} max={10} value={exp} onChange={(e) => setExp(+e.target.value)} className="mt-2 w-full accent-[oklch(0.48_0.13_250)]" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold">Pick a date & time</h2>
              <p className="mt-1 text-sm text-muted-foreground">May 2026</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Calendar selected={date} onSelect={setDate} />
                <div>
                  <div className="mb-3 text-sm font-medium">Available time slots</div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-md border px-2 py-2 text-xs font-medium ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              {date && time && (
                <div className="mt-5 rounded-lg border border-primary/30 bg-primary-soft p-4 text-sm">
                  <div className="text-xs font-semibold text-primary">SCHEDULED FOR</div>
                  <div className="mt-1 font-semibold">May {date}, 2026 · {time}</div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold">Confirm & schedule</h2>
              <p className="mt-1 text-sm text-muted-foreground">Review your interview details.</p>
              <div className="mt-5 space-y-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
                <Row k="Role" v={role} />
                <Row k="Panel" v={
                  <div className="flex gap-1.5">
                    {interviewers.filter(i => panel.includes(i.id)).map((i) => (
                      <span key={i.id} className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground" title={i.name}>{i.initials}</span>
                    ))}
                  </div>
                } />
                <Row k="Difficulty" v={difficulty} />
                <Row k="Rounds" v={rounds.join(", ") || "—"} />
                <Row k="Date & Time" v={`May ${date}, 2026 · ${time}`} />
                <Row k="Estimated duration" v={`${15 + panel.length * 10}–${20 + panel.length * 12} min`} />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> {step === 4 ? "Edit" : "Back"}
            </button>
            <button
              onClick={() => step === 4 ? setDone(true) : setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {step === 4 ? "Confirm & Schedule" : "Next"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const timeSlots = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM"];

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-2">
          <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
          <div className={`hidden text-xs sm:block ${i === step ? "font-semibold" : "text-muted-foreground"}`}>{s}</div>
          {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function Calendar({ selected, onSelect }: { selected: number | null; onSelect: (d: number) => void }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const offset = 4; // May 1, 2026 is a Friday (dummy)
  const today = 13;
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-muted-foreground">
        {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: offset }).map((_, i) => <div key={"e"+i} />)}
        {days.map((d) => {
          const isSel = selected === d;
          const isToday = d === today;
          const isPast = d < today;
          return (
            <button
              key={d}
              disabled={isPast}
              onClick={() => onSelect(d)}
              className={`grid h-9 place-items-center rounded-md text-sm transition ${
                isSel ? "bg-primary text-primary-foreground font-bold"
                : isPast ? "text-muted-foreground/40"
                : isToday ? "border border-primary text-primary font-semibold hover:bg-primary-soft"
                : "hover:bg-muted"
              }`}
            >{d}</button>
          );
        })}
      </div>
    </div>
  );
}

function Confirmation({ role, date, time, onDash, onStart }: { role: string; date: number | null; time: string | null; onDash: () => void; onStart: () => void }) {
  return (
    <AppLayout title="Scheduled">
      <div className="mx-auto mt-12 max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success animate-in zoom-in">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-2xl font-bold">Interview Scheduled!</h2>
        <p className="mt-2 text-sm text-muted-foreground">{role} · May {date}, 2026 · {time}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onDash} className="rounded-md border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">Go to dashboard</button>
          <button onClick={onStart} className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Start now</button>
        </div>
      </div>
    </AppLayout>
  );
}
