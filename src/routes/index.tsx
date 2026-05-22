import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, ArrowRight, Play, UserPlus, CalendarCheck, BarChart3,
  Users, Activity, Layers, FileText, LineChart, Mic, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "MIP — Ace your next interview with AI" },
      { name: "description", content: "Practice mock interviews with an AI panel. Get real-time feedback, multi-round simulations, and progress tracking." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">M</div>
            <span className="text-lg font-bold">MIP</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/login" className="hover:text-foreground">Login</Link>
          </nav>
          <Link to="/signup" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Get started
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Panel · Voice + Text · Real-time scoring
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Ace your next interview <span className="text-primary">with AI</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              MIP simulates a real interview panel — HR, tech lead and manager — that adapts to you.
              Practice 24/7, get instant feedback, and walk into your interview ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 font-semibold hover:bg-muted">
                <Play className="h-4 w-4" /> Watch demo
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">No credit card · 3 free sessions / month</p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <div className="text-xs font-medium text-muted-foreground">Round 2 · Backend Engineer</div>
                <div className="flex items-center gap-1 text-xs text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" />Live</div>
              </div>
              <div className="space-y-3">
                {[
                  { i: "PR", n: "Priya R.", r: "HR Lead" },
                  { i: "AS", n: "Arjun S.", r: "Tech Lead" },
                  { i: "RK", n: "Rahul K.", r: "Eng Manager" },
                ].map((p) => (
                  <div key={p.i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">{p.i}</div>
                    <div>
                      <div className="text-sm font-semibold">{p.n}</div>
                      <div className="text-xs text-muted-foreground">{p.r}</div>
                    </div>
                    <div className="ml-auto text-[10px] font-bold text-primary">AI</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-primary-soft p-3 text-sm">
                <div className="mb-1 text-xs font-semibold text-primary">Arjun S.</div>
                Walk me through how you'd design a rate limiter for 50k req/sec.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">Three simple steps to start practicing.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { i: UserPlus, t: "Create profile", d: "Sign up and upload your resume so questions are tailored to you." },
              { i: CalendarCheck, t: "Schedule interview", d: "Pick a role, build your AI panel, and choose a time that works." },
              { i: BarChart3, t: "Get feedback", d: "Receive scores, ideal answers, and a personalized improvement plan." },
            ].map((s, idx) => (
              <div key={s.t} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <s.i className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground">STEP {idx + 1}</div>
                <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-bold md:text-4xl">Everything you need to prep</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">A complete mock-interview studio built around AI personas.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Users, t: "AI Panel Simulation", d: "HR, tech lead and manager — distinct personalities and pressure styles." },
            { i: Activity, t: "Real-time Feedback", d: "Get scored across 5 dimensions seconds after each answer." },
            { i: Layers, t: "Multi-round Interviews", d: "HR · Technical · System Design · Behavioral · Case study." },
            { i: FileText, t: "Resume-based Questions", d: "Upload your resume + JD; questions reference your real experience." },
            { i: LineChart, t: "Progress Tracking", d: "Streaks, score trends, and weak-area heatmaps over time." },
            { i: Mic, t: "Voice Support", d: "Speak your answers in-browser with live transcription." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
                <f.i className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Simple pricing</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">Pay less than one coaching session.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: "Free", p: "₹0", b: "Get started", f: ["3 sessions / month", "1 interviewer role", "Basic scoring", "Text mode"] },
              { n: "Pro", p: "₹499", b: "Most popular", f: ["Unlimited sessions", "Full panel mode", "Detailed reports", "Voice mode", "Resume + JD personalization"], hi: true },
              { n: "Enterprise", p: "Custom", b: "Contact us", f: ["White-label portal", "Cohort analytics", "Custom question banks", "SSO + admin", "Success manager"] },
            ].map((p) => (
              <div key={p.n} className={`relative rounded-2xl border p-7 ${p.hi ? "border-primary bg-card shadow-lg" : "border-border bg-card"}`}>
                {p.hi && <div className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Most popular</div>}
                <div className="text-sm font-semibold text-muted-foreground">{p.n}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.p}</span>
                  {p.p !== "Custom" && <span className="text-sm text-muted-foreground">/month</span>}
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.f.map((x) => (
                    <li key={x} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{x}</span></li>
                  ))}
                </ul>
                <Link to="/signup" className={`mt-7 block rounded-md py-2.5 text-center text-sm font-semibold ${p.hi ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-muted"}`}>
                  {p.b}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded bg-primary text-xs font-bold text-primary-foreground">M</div>
            <span>© 2026 MIP — Mock Interview Panel</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
