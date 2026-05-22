import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";

export const Route = createFileRoute("/settings")({ component: Settings });

const tabs = ["Profile", "Resume", "Notifications", "Account"] as const;
type Tab = typeof tabs[number];

function Settings() {
  const [tab, setTab] = useState<Tab>("Profile");
  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex gap-1 rounded-lg border border-border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >{t}</button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-7">
          {tab === "Profile" && <Profile />}
          {tab === "Resume" && <Resume />}
          {tab === "Notifications" && <Notifications />}
          {tab === "Account" && <Account />}
        </div>
      </div>
    </AppLayout>
  );
}

const inp = "w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Profile() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Profile</h2>
      <div className="mt-5 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">RS</div>
        <button className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted">Upload photo</button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <L l="Full name"><input className={inp} defaultValue="Riya Sharma" /></L>
        <L l="Email"><input className={inp} defaultValue="riya@example.com" /></L>
        <L l="Current role"><input className={inp} defaultValue="Software Engineer" /></L>
        <L l="Experience"><select className={inp}><option>2–4 years</option><option>5–7 years</option></select></L>
        <L l="Target role"><input className={inp} defaultValue="Senior Backend Engineer" /></L>
      </div>
      <button className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Save changes</button>
    </div>
  );
}

function Resume() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Resume</h2>
      <div className="mt-5 flex items-center gap-4 rounded-xl border border-border p-4">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-primary-soft text-primary"><FileText className="h-5 w-5" /></div>
        <div className="flex-1">
          <div className="text-sm font-semibold">Riya_Sharma_Resume.pdf</div>
          <div className="text-xs text-muted-foreground">Uploaded May 1, 2026 · 184 KB</div>
        </div>
        <button className="text-xs font-semibold text-primary hover:underline">Preview</button>
      </div>
      <button className="mt-5 inline-flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-3 text-sm font-semibold hover:bg-muted">
        <Upload className="h-4 w-4" /> Replace resume
      </button>
    </div>
  );
}

function Notifications() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="mt-5 space-y-3">
        <Toggle l="Email reminders" d="Tips, weekly progress, product updates." def />
        <Toggle l="Session reminder · 24h before" def />
        <Toggle l="Session reminder · 1h before" def />
        <Toggle l="Marketing emails" />
      </div>
    </div>
  );
}

function Account() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Account</h2>
      <div className="mt-5 space-y-4">
        <L l="Current password"><input type="password" className={inp} /></L>
        <L l="New password"><input type="password" className={inp} /></L>
        <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Update password</button>
      </div>
      <div className="mt-10 rounded-xl border border-danger/40 bg-danger/5 p-5">
        <h3 className="text-sm font-semibold text-danger">Danger zone</h3>
        <p className="mt-1 text-xs text-muted-foreground">Delete your account and all associated data. This cannot be undone.</p>
        <button className="mt-3 inline-flex items-center gap-2 rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          <Trash2 className="h-4 w-4" /> Delete account
        </button>
      </div>
    </div>
  );
}

function L({ l, children }: { l: string; children: React.ReactNode }) {
  return <label><span className="mb-1.5 block text-sm font-medium">{l}</span>{children}</label>;
}

function Toggle({ l, d, def }: { l: string; d?: string; def?: boolean }) {
  const [on, setOn] = useState(!!def);
  return (
    <div className="flex items-center justify-between rounded-md border border-border p-4">
      <div>
        <div className="text-sm font-semibold">{l}</div>
        {d && <div className="text-xs text-muted-foreground">{d}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform left-0 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
