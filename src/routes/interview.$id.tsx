import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { useEffect, useState } from "react";
import { Mic, Send, Clock, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

export const Route = createFileRoute("/interview/$id")({ component: Interview });

const questions = [
  "Tell me a bit about yourself and what brings you here.",
  "Walk me through a recent project you're proud of. What was your role?",
  "Design a rate limiter that handles 50,000 requests per second. What data structure would you reach for first?",
  "Tell me about a time you disagreed with a teammate. How did you resolve it?",
  "How would you scale a write-heavy database to handle 10x growth?",
  "Where do you see yourself in 3 years, and how does this role fit?",
];

function Interview() {
  const [q, setQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const submit = () => {
    if (!answer.trim()) return;
    setEvaluating(true);
    setTimeout(() => {
      setHistory((h) => [...h, { q: questions[q], a: answer }]);
      setAnswer("");
      setEvaluating(false);
      if (q + 1 >= questions.length) nav({ to: "/report/$id", params: { id: "new" } });
      else setQ((x) => x + 1);
    }, 1200);
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <AppLayout title="Live Interview">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3">
        <div>
          <div className="text-sm font-semibold">Backend Engineer</div>
          <div className="text-xs text-muted-foreground">Interviewer: Arjun Sharma · Tech Lead</div>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div className="text-muted-foreground">Q{q + 1} of {questions.length}</div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-primary font-semibold">
            <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">AS</div>
            <div>
              <div className="text-sm font-semibold">Arjun Sharma</div>
              <div className="text-xs text-muted-foreground">Technical Lead</div>
            </div>
          </div>

          {history.length > 0 && (
            <button onClick={() => setOpen((v) => !v)} className="mt-4 flex w-full items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted">
              <span>Previous Q&A ({history.length})</span>
              {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
          {open && (
            <div className="mt-3 space-y-3">
              {history.map((h, i) => (
                <div key={i} className="rounded-lg border border-border p-3 text-sm">
                  <div className="text-xs font-semibold text-primary">Q{i + 1}</div>
                  <div className="mt-1">{h.q}</div>
                  <div className="mt-2 rounded bg-muted/40 p-2 text-xs">{h.a}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-primary-soft p-5">
            <div className="mb-2 text-xs font-semibold text-primary">QUESTION {q + 1}</div>
            <p className="text-base leading-relaxed">{questions[q]}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">Your answer</h3>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={evaluating}
            placeholder="Type your answer here…"
            className="mt-3 h-56 w-full resize-none rounded-md border border-border bg-card p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{answer.length} characters</span>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              <Mic className="h-3.5 w-3.5" /> Use voice
            </button>
          </div>
          <button
            onClick={submit}
            disabled={evaluating || !answer.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {evaluating ? <><Loader2 className="h-4 w-4 animate-spin" /> Evaluating…</> : <>Submit answer <Send className="h-4 w-4" /></>}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {questions.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i < q ? "w-2 bg-primary" : i === q ? "w-6 bg-primary" : "w-2 bg-muted"}`} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
