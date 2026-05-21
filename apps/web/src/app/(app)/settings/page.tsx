'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const tabs = ['Profile', 'Account', 'Notifications', 'Billing'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === i ? 'text-primary border-primary' : 'text-muted-foreground border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        {activeTab === 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Profile settings</h2>
            <Input label="Full name" defaultValue={user?.name} />
            <Input label="Email" type="email" defaultValue={user?.email} />
            <Input label="Bio" placeholder="Tell us about yourself" />
            <Button>Save changes</Button>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account</h2>
            <div>
              <h3 className="font-bold mb-4">Change password</h3>
              <Input label="Current password" type="password" />
              <Input label="New password" type="password" />
              <Button className="mt-4">Update password</Button>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-bold mb-4 text-danger">Danger zone</h3>
              <Button variant="danger">Delete account</Button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <Checkbox label="Email notifications" />
            <Checkbox label="Interview reminders" />
            <Checkbox label="Weekly digest" />
            <Button>Save preferences</Button>
          </div>
        )}

        {activeTab === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Billing</h2>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="font-bold text-primary mb-2">Free Plan</p>
              <p className="text-sm text-muted-foreground">3 sessions per month</p>
            </div>
            <Button>Upgrade to Pro</Button>
          </div>
        )}
      </Card>

      <Button variant="ghost" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
