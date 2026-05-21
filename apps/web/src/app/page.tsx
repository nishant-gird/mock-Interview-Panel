import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft to-background">
      {/* Navbar */}
      <nav className="bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">MIP</h1>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </a>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h2 className="text-5xl font-bold text-foreground mb-6">
          Ace your next interview with AI
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Practice with an AI panel of interviewers tailored to your role. Get instant, detailed
          feedback and track your progress.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Start free</Button>
          </Link>
          <Button variant="secondary" size="lg">
            Watch demo
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-card py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center mb-16">How it works</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: CheckCircle, title: 'Pick a role', desc: 'Choose from Frontend, Backend, Full Stack, or more' },
              { icon: Zap, title: 'Meet your panel', desc: 'Get paired with AI interviewers tailored to your role' },
              { icon: TrendingUp, title: 'Get feedback', desc: 'Receive scored reports with detailed analysis' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-3xl font-bold text-center mb-16">Simple, transparent pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '₹0', features: ['3 sessions/month', 'Basic feedback'] },
              {
                name: 'Pro',
                price: '₹499',
                features: ['Unlimited sessions', 'Detailed reports', 'Progress tracking', 'Premium interviewers'],
              },
              { name: 'Enterprise', price: 'Custom', features: ['Team accounts', 'Custom training', 'Admin dashboard'] },
            ].map((plan, i) => (
              <div key={i} className="bg-card rounded-lg p-8 border border-border shadow-sm">
                <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                <p className="text-3xl font-bold text-primary mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8" variant={i === 1 ? 'primary' : 'secondary'}>
                  Get started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-8 text-center text-sm text-muted-foreground">
          <p>© 2024 MIP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
