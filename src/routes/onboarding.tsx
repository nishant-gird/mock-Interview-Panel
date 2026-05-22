import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const steps = ["Basic info", "Resume", "Goals", "Done"];

function Onboarding() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">M</div>
          <span className="text-xl font-bold">MIP</span>
        </Link>

        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <div className={`hidden text-xs sm:block ${i === step ? "font-semibold" : "text-muted-foreground"}`}>{s}</div>
              {i < steps.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {step === 0 && <BasicInfo />}
          {step === 1 && <Resume />}
          {step === 2 && <Goals />}
          {step === 3 && <Done onGo={() => nav({ to: "/dashboard" })} />}

          {step < 3 && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex gap-2">
                {step === 1 && (
                  <button onClick={() => setStep(2)} className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Skip</button>
                )}
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {step === 2 ? "Finish" : "Next"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-sm font-medium">{children}</span>;
}
const inputCls = "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function BasicInfo() {
  return (
    <div>
      <h2 className="text-xl font-bold">Tell us about yourself</h2>
      <p className="mt-1 text-sm text-muted-foreground">We'll personalize your panel and questions.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label><Label>Full name</Label><input className={inputCls} defaultValue="Riya Sharma" /></label>
        <label><Label>Current role</Label><input className={inputCls} placeholder="Software Engineer" /></label>
        <label>
          <Label>Years of experience</Label>
          <select className={inputCls}>
            <option>0–1 years</option><option>2–4 years</option><option>5–7 years</option><option>8+ years</option>
          </select>
        </label>
        <label><Label>Target role</Label><input className={inputCls} placeholder="Senior Backend Engineer" /></label>
      </div>
    </div>
  );
}

function Resume() {
  const [file, setFile] = useState<string | null>(null);
  return (
    <div>
      <h2 className="text-xl font-bold">Upload your resume</h2>
      <p className="mt-1 text-sm text-muted-foreground">PDF preferred. We use it to tailor questions.</p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center hover:bg-muted/60">
        <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
        <div className="text-sm font-semibold">{file ?? "Drag & drop your resume"}</div>
        <div className="mt-1 text-xs text-muted-foreground">or click to browse · PDF, DOCX up to 5MB</div>
        <input type="file" hidden onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
      </label>
    </div>
  );
}

function Goals() {
  const [intensity, setIntensity] = useState("Regular");
  return (
    <div>
      <h2 className="text-xl font-bold">Set your goal</h2>
      <p className="mt-1 text-sm text-muted-foreground">We'll build a prep schedule around it.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label><Label>Target company</Label><input className={inputCls} placeholder="e.g. Google" /></label>
        <label><Label>Target date</Label><input type="date" className={inputCls} /></label>
      </div>
      <Label>Prep intensity</Label>
      <div className="flex gap-2">
        {["Casual", "Regular", "Intensive"].map((x) => (
          <button
            key={x}
            onClick={() => setIntensity(x)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${intensity === x ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
          >{x}</button>
        ))}
      </div>
    </div>
  );
}

function Done({ onGo }: { onGo: () => void }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h2 className="mt-5 text-2xl font-bold">You're all set!</h2>
      <p className="mt-2 text-sm text-muted-foreground">Your dashboard is ready. Time to face the panel.</p>
      <button onClick={onGo} className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
        Go to dashboard <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
