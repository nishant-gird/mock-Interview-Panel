import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "../components/AppLayout";
import { TrendingUp, Target } from "lucide-react";

export const Route = createFileRoute("/progress")({ component: Progress });

const trend = [62, 58, 65, 70, 68, 72, 75, 71, 78, 82];
const radar = [
  { n: "Communication", v: 82 },
  { n: "Technical", v: 71 },
  { n: "Structure", v: 75 },
  { n: "Confidence", v: 84 },
  { n: "Problem Solving", v: 68 },
];

const weak = [
  { n: "STAR storytelling", t: "Practice 3 behavioral questions" },
  { n: "System design tradeoffs", t: "Read scaling case studies" },
  { n: "Quantifying impact", t: "Rewrite 2 resume bullets with metrics" },
];

function Progress() {
  return (
    <AppLayout title="Progress">
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Score trend (last 10 sessions)" icon={TrendingUp}>
          <LineChart data={trend} />
        </Card>

        <Card title="Skill radar" icon={Target}>
          <Radar data={radar} />
        </Card>

        <Card title="Practice streak" icon={TrendingUp} className="lg:col-span-2">
          <Heatmap />
        </Card>

        <Card title="Top areas to improve" icon={Target} className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            {weak.map((w) => (
              <div key={w.n} className="rounded-lg border border-border p-4">
                <div className="text-sm font-semibold">{w.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{w.t}</div>
                <button className="mt-3 rounded-md bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Practice now</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

function Card({ title, icon: Icon, children, className = "" }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function LineChart({ data }: { data: number[] }) {
  const w = 600, h = 200, pad = 20;
  const min = 50, max = 100;
  const pts = data.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (data.length - 1);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  const area = path + ` L ${pts.at(-1)![0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <path d={area} fill="oklch(0.48 0.13 250 / 0.12)" />
      <path d={path} fill="none" stroke="oklch(0.48 0.13 250)" strokeWidth={2.5} />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={4} fill="oklch(0.48 0.13 250)" />)}
    </svg>
  );
}

function Radar({ data }: { data: { n: string; v: number }[] }) {
  const cx = 150, cy = 150, R = 110;
  const pts = data.map((d, i) => {
    const a = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const r = (d.v / 100) * R;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  const labels = data.map((d, i) => {
    const a = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    return [cx + Math.cos(a) * (R + 18), cy + Math.sin(a) * (R + 18), d.n];
  });
  const poly = pts.map(p => p.join(",")).join(" ");
  return (
    <svg viewBox="0 0 300 300" className="mx-auto w-full max-w-sm">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <circle key={s} cx={cx} cy={cy} r={R * s} fill="none" stroke="oklch(0.92 0.01 250)" />
      ))}
      <polygon points={poly} fill="oklch(0.48 0.13 250 / 0.25)" stroke="oklch(0.48 0.13 250)" strokeWidth={2} />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="oklch(0.48 0.13 250)" />)}
      {labels.map(([x, y, n], i) => (
        <text key={i} x={x as number} y={y as number} textAnchor="middle" className="fill-muted-foreground text-[10px]">{n as string}</text>
      ))}
    </svg>
  );
}

function Heatmap() {
  const weeks = 26;
  const cells = Array.from({ length: weeks * 7 }, (_, i) => {
    const r = Math.sin(i * 0.7) + Math.cos(i * 0.3);
    return Math.max(0, Math.min(4, Math.round(r + 2)));
  });
  const colors = ["bg-muted", "bg-primary/20", "bg-primary/40", "bg-primary/70", "bg-primary"];
  return (
    <div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
        {cells.map((c, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${colors[c]}`} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        Less {colors.map((c, i) => <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />)} More
      </div>
    </div>
  );
}
