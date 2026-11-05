"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send. Please try again.");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please email us directly.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-charcoal-800 bg-charcoal-950/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ivory-50">
            Venture<span className="text-spark-500">Spark</span>
          </Link>
          <Link href="/" className="text-sm text-ivory-300 hover:text-spark-400">← Back</Link>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-3">Contact</h1>
        <p className="text-ivory-300 mb-10">Questions about the event? Reach out.</p>

        <div className="card mb-10 space-y-3">
          <p className="text-ivory-100">
            <span className="text-ivory-400">Phone:</span>{" "}
            <a href="tel:8446331503" className="text-spark-400 hover:underline">8446331503</a>
          </p>
          <p className="text-ivory-100">
            <span className="text-ivory-400">Email:</span>{" "}
            <a href="mailto:venturespark50@gmail.com" className="text-spark-400 hover:underline">
              venturespark50@gmail.com
            </a>
          </p>
        </div>

        {done ? (
          <div className="card text-center">
            <p className="text-spark-500 font-semibold text-lg">Message sent</p>
            <p className="text-ivory-300 mt-2">We’ll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div>
              <label className="label">Name *</label>
              <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email *</label>
              <input type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea className="input min-h-[120px]" required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{error}</p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
