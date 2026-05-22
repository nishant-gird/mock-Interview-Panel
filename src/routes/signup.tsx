import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, Divider } from "./login";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  return (
    <AuthShell title="Create your account" subtitle="Start practicing in under a minute">
      <form
        onSubmit={(e) => { e.preventDefault(); nav({ to: "/onboarding" }); }}
        className="space-y-4"
      >
        <Field label="Full name" value={name} onChange={setName} placeholder="Riya Sharma" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <Field label="Password" type="password" value={pw} onChange={setPw} placeholder="At least 8 characters" />
        <Field label="Confirm password" type="password" value={cpw} onChange={setCpw} />
        <button className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Create account</button>
      </form>
      <Divider />
      <button className="w-full rounded-md border border-border bg-card py-2.5 text-sm font-semibold hover:bg-muted">Sign up with Google</button>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="font-semibold text-primary">Log in</Link>
      </p>
    </AuthShell>
  );
}
