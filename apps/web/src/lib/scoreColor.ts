export function scoreColor(score: number): string {
  if (score >= 80) return 'hsl(var(--success))';
  if (score >= 60) return 'hsl(var(--warning))';
  return 'hsl(var(--danger))';
}

export function scoreLabel(score: number): string {
  if (score >= 80) return 'Strong hire';
  if (score >= 60) return 'Hire';
  if (score >= 40) return 'Lean hire';
  return 'No hire';
}
