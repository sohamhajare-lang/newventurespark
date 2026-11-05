"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Setup failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-950 px-4">
        <div className="card max-w-md w-full text-center">
          <h1 className="font-display text-2xl font-bold text-spark-500 mb-2">Setup complete</h1>
          <p className="text-ivory-200">Redirecting to admin dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-950 px-4">
      <div className="card max-w-md w-full">
        <h1 className="font-display text-2xl font-bold text-ivory-50 mb-1">VentureSpark Setup</h1>
        <p className="text-sm text-ivory-300 mb-6">
          Create the first Super Admin account. This page works only once.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="label">Password (min 10 characters)</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={10}
              placeholder="Strong password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Setting up…" : "Create Super Admin & Seed Database"}
          </button>
        </form>

        <p className="mt-6 text-xs text-ivory-300/60 text-center">
          This will push the database schema and load event seed data (judges, agenda, UPI, etc.).
        </p>
      </div>
    </div>
  );
}
