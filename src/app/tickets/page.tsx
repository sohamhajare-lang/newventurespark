"use client";

import { useState } from "react";
import Link from "next/link";

export default function TicketsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ registrationId: string; paymentRef: string } | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    organization: "",
    attendeeType: "student",
    interests: "",
    attendanceDay: "2026-11-30",
    consent: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      setError("You must accept the Terms and acknowledge that investment is not guaranteed.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }
      setSuccess({ registrationId: data.registrationId, paymentRef: data.paymentRef });
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-950 px-4">
        <div className="card max-w-lg w-full text-center">
          <h1 className="font-display text-2xl font-bold text-spark-500 mb-2">Registration received</h1>
          <p className="text-ivory-200 mb-4">
            Your registration ID is <strong className="text-ivory-50">{success.registrationId}</strong>
          </p>
          <p className="text-sm text-ivory-300 mb-6">
            Please complete payment of <strong>₹1,599</strong>. Reference:{" "}
            <strong>{success.paymentRef}</strong>
          </p>
          <Link href={`/payment/${success.paymentRef}`} className="btn-primary">
            Go to Payment Instructions →
          </Link>
        </div>
      </div>
    );
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

      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ivory-50 mb-2">
          Audience Tickets
        </h1>
        <p className="text-ivory-300 mb-2">₹1,599 · valid for one selected day only</p>
        <p className="text-sm text-spark-400 mb-8">
          To attend both days, please buy two separate tickets. Investment is not guaranteed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="card space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full name *</label>
                <input className="input" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <label className="label">Email *</label>
                <input type="email" className="input" required value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label className="label">Mobile (Indian) *</label>
                <input className="input" required value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="10-digit number" />
              </div>
              <div>
                <label className="label">City</label>
                <input className="input" value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div>
                <label className="label">Organization / College</label>
                <input className="input" value={form.organization} onChange={(e) => update("organization", e.target.value)} />
              </div>
              <div>
                <label className="label">I am a…</label>
                <select className="input" value={form.attendeeType} onChange={(e) => update("attendeeType", e.target.value)}>
                  <option value="student">Student</option>
                  <option value="founder">Founder</option>
                  <option value="investor">Investor</option>
                  <option value="professional">Professional</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Interests</label>
              <input className="input" value={form.interests} onChange={(e) => update("interests", e.target.value)} placeholder="e.g. fintech, AI, consumer" />
            </div>
            <div>
              <label className="label">Attendance day *</label>
              <select className="input" required value={form.attendanceDay} onChange={(e) => update("attendanceDay", e.target.value)}>
                <option value="2026-11-30">30 November 2026</option>
                <option value="2026-12-01">1 December 2026</option>
              </select>
            </div>
          </section>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-ivory-300">
              I accept the Terms, Privacy Policy, and acknowledge that{" "}
              <strong className="text-spark-400">investment is not guaranteed</strong>. *
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Submitting…" : "Register & Proceed to Payment (₹1,599)"}
          </button>
        </form>
      </main>
    </div>
  );
}
