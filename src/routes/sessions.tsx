import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import { Filter, Calendar } from "lucide-react";

export const Route = createFileRoute("/sessions")({ component: Sessions });

const upcoming = [
  { id: "u1", role: "Backend Engineer", date: "May 15, 2026 · 10:30 AM", panel: "PR · AS · RK", dur: "—", status: "Scheduled" },
];

const past = [
  { id: "1", role: "Backend Engineer", date: "May 11, 2026", panel: "AS · RK", dur: "38 min", score: 82, status: "Completed" },
  { id: "2", role: "Product Manager", date: "May 8, 2026", panel: "PR · RK", dur: "42 min", score: 67, status: "Completed" },
  { id: "3", role: "Data Scientist", date: "May 5, 2026", panel: "AS", dur: "35 min", score: 74, status: "Completed" },
  { id: "4", role: "Backend Engineer", date: "May 2, 2026", panel: "AS · RK", dur: "30 min", score: 58, status: "Completed" },
  { id: "5", role: "HR Manager", date: "Apr 28, 2026", panel: "PR", dur: "—", score: 0, status: "Cancelled" },
];

function color(s: number) {
  if (s >= 75) return "bg-success/15 text-success";
  if (s >= 60) return "bg-warning/15 text-warning";
  return "bg-danger/15 text-danger";
}

function Sessions() {
  const [role, setRole] = useState("All");
  return (
    <AppLayout title="Sessions">
      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4" /> Filters</div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">
          <option>All</option><option>Backend Engineer</option><option>Product Manager</option><option>Data Scientist</option>
        </select>
        <input type="date" className="rounded-md border border-border bg-card px-3 py-1.5 text-sm" />
        <input type="date" className="rounded-md border border-border bg-card px-3 py-1.5 text-sm" />
        <select className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">
          <option>Any score</option><option>80%+</option><option>60–79%</option><option>Below 60%</option>
        </select>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Upcoming</h3>
      <div className="mb-8 space-y-2">
        {upcoming.map((u) => (
          <div key={u.id} className="flex items-center gap-4 rounded-xl border border-primary/30 bg-primary-soft p-4">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><Calendar className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{u.role}</div>
              <div className="text-xs text-muted-foreground">{u.date} · Panel: {u.panel}</div>
            </div>
            <Link to="/interview/$id" params={{ id: u.id }} className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Join</Link>
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Past sessions</h3>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-left font-semibold">Panel</th>
              <th className="px-4 py-3 text-left font-semibold">Duration</th>
              <th className="px-4 py-3 text-left font-semibold">Score</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {past.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30">
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3 font-medium">{p.role}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.panel}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.dur}</td>
                <td className="px-4 py-3">
                  {p.status === "Completed"
                    ? <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${color(p.score)}`}>{p.score}%</span>
                    : <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    p.status === "Completed" ? "border-success/40 text-success"
                    : p.status === "Cancelled" ? "border-danger/40 text-danger" : "border-primary/40 text-primary"
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.status === "Completed" && (
                    <Link to="/report/$id" params={{ id: p.id }} className="text-xs font-semibold text-primary hover:underline">View report</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
