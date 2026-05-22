import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarPlus,
  History,
  TrendingUp,
  FileText,
  Target,
  Settings as SettingsIcon,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/schedule", label: "New Interview", icon: CalendarPlus },
  { to: "/sessions", label: "Sessions", icon: History },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/settings", label: "Resume", icon: FileText, hash: "resume" },
  { to: "/settings", label: "Goals", icon: Target, hash: "goals" },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function AppLayout({ children, title }: { children: ReactNode; title?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">M</div>
          <span className="text-lg font-bold tracking-tight">MIP</span>
        </Link>
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-md p-2 hover:bg-muted">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          <div className="relative">
            <button
              onClick={() => setMenu((v) => !v)}
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">RS</div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {menu && (
              <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-card p-1 text-sm shadow-lg">
                <Link to="/settings" className="block rounded px-3 py-2 hover:bg-muted">Profile</Link>
                <Link to="/settings" className="block rounded px-3 py-2 hover:bg-muted">Settings</Link>
                <Link to="/" className="block rounded px-3 py-2 text-danger hover:bg-muted">Sign out</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 border-r border-border bg-card p-3 lg:block">
          <nav className="space-y-1">
            {navItems.map((it) => {
              const active = path === it.to;
              const Icon = it.icon;
              return (
                <Link
                  key={it.label}
                  to={it.to}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary-soft font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
