

"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { Moon, Sun, Bell, User, Shield, LogOut } from "lucide-react";

interface Setting {
  id: string;
  label: string;
  description: string;
  type: "toggle" | "select";
  value: boolean | string;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: "email-notifications",
      label: "Email Notifications",
      description: "Receive email updates about your progress and new features",
      type: "toggle",
      value: true,
    },
    {
      id: "performance-alerts",
      label: "Performance Alerts",
      description: "Get notified when you reach certain performance milestones",
      type: "toggle",
      value: true,
    },
    {
      id: "weekly-summary",
      label: "Weekly Summary",
      description: "Receive a weekly recap of your learning progress",
      type: "toggle",
      value: false,
    },
    {
      id: "goal-reminder",
      label: "Goal Reminder",
      description: "Daily reminders to stay on track with your roadmap",
      type: "toggle",
      value: true,
    },
  ]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, value: !s.value } : s)));
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* <Navigation />
      <Navbar/> */}
      <main className="md:ml-20 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="space-y-2 border-b border-border pb-6 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Settings</h1>
            <p className="text-muted-foreground">Customize your AI Career Copilot experience.</p>
          </div>

          {/* Account Section */}
            <div className="glass rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <User size={24} className="text-primary" />
                Account
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
                  <div>
                    <p className="font-semibold text-foreground">Email Address</p>
                    <p className="text-sm text-muted-foreground">sarah@example.com</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
                  <div>
                    <p className="font-semibold text-foreground">Password</p>
                    <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            </div>

          {/* ... your previous Account section ... */}

          {/* ✅ Appearance Section (Updated for real dark/light toggle) */}
          <div className="glass rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              {theme === "dark" ? (
                <Moon size={24} className="text-primary" />
              ) : (
                <Sun size={24} className="text-accent" />
              )}
              Appearance
            </h2>

            <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">
                  {theme === "dark" ? "Dark" : "Light"} Mode
                </p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-colors"
              >
                Toggle
              </button>
            </div>
          </div>

          {/* Notifications Section */}
            <div className="glass rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Bell size={24} className="text-primary" />
                Notifications
              </h2>

              <div className="space-y-3">
                {settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => toggleSetting(setting.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        setting.value ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          setting.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Section */}
            <div className="glass rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Shield size={24} className="text-primary" />
                Privacy & Security
              </h2>

              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
                >
                  <p className="font-semibold text-primary hover:text-accent">Privacy Policy</p>
                  <p className="text-sm text-muted-foreground mt-1">Review how we handle your data</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
                >
                  <p className="font-semibold text-primary hover:text-accent">Terms of Service</p>
                  <p className="text-sm text-muted-foreground mt-1">Read our terms and conditions</p>
                </a>

                <a
                  href="#"
                  className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
                >
                  <p className="font-semibold text-primary hover:text-accent">Data Export</p>
                  <p className="text-sm text-muted-foreground mt-1">Download your data</p>
                </a>
              </div>
            </div>

            {/* Logout */}
            <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 font-semibold gap-2">
              <LogOut size={18} />
              Sign Out
            </Button>
        </div>
      </main>
    </div>
  );
}
