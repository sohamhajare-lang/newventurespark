"use client";

import { useState } from "react";
import Link from "next/link";

export default function PitchPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ registrationId: string; paymentRef: string } | null>(null);

  const [form, setForm] = useState({
    founderName: "",
    email: "",
    mobile: "",
    city: "",
    designation: "",
    startupName: "",
    website: "",
    industry: "",
    stage: "prototype",
    yearFounded: "",
    oneLiner: "",
    summary: "",
    problem: "",
    targetCustomers: "",
    businessModel: "",
    traction: "",
    fundingRaised: "",
    wantsFromEvent: "",
    teamSize: "1",
    attendingCount: "1",
    preferredDay: "no_preference",
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
      const res = await fetch("/api/register/pitch", {
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
          <h1 className="font-display text-2xl font-bold text-spark-500 mb-2">Application received</h1>
          <p className="text-ivory-200 mb-4">
            Your registration ID is <strong className="text-ivory-50">{success.registrationId}</strong>
          </p>
          <p className="text-sm text-ivory-300 mb-6">
            Please complete payment of <strong>₹15,999</strong> using the payment page. Reference:{" "}
            <strong>{success.paymentRef}</strong>
          </p>
          <Link href={`/payment/${success.paymentRef}`} className="btn-primary">
            Go to Payment Instructions →
          </Link>
          <p className="mt-6 text-xs text-ivory-300/60">
            Investment is not guaranteed. A temporary hold has been placed on a pitch slot for 48 hours.
          </p>
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
          Pitch Your Startup
        </h1>
        <p className="text-ivory-300 mb-2">₹15,999 · covers up to 3 attending team members</p>
        <p className="text-sm text-spark-400 mb-8">
          Registration closes 15 November 2026, 11:59 p.m. IST · Investment is not guaranteed
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="card space-y-4">
            <h2 className="font-semibold text-ivory-100">Founder details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full name *</label>
                <input className="input" required value={form.founderName} onChange={(e) => update("founderName", e.target.value)} />
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
                <label className="label">City *</label>
                <input className="input" required value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Designation</label>
                <input className="input" value={form.designation} onChange={(e) => update("designation", e.target.value)} />
              </div>
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="font-semibold text-ivory-100">Startup details</h2>
            <div>
              <label className="label">Startup name *</label>
              <input className="input" required value={form.startupName} onChange={(e) => update("startupName", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Website / social link</label>
                <input className="input" value={form.website} onChange={(e) => update("website", e.target.value)} />
              </div>
              <div>
                <label className="label">Industry / sector</label>
                <input className="input" value={form.industry} onChange={(e) => update("industry", e.target.value)} />
              </div>
              <div>
                <label className="label">Stage</label>
                <select className="input" value={form.stage} onChange={(e) => update("stage", e.target.value)}>
                  <option value="idea">Idea</option>
                  <option value="prototype">Prototype</option>
                  <option value="early_revenue">Early revenue</option>
                  <option value="scaling">Scaling</option>
                </select>
              </div>
              <div>
                <label className="label">Year founded</label>
                <input type="number" className="input" value={form.yearFounded} onChange={(e) => update("yearFounded", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">One-line description</label>
              <input className="input" value={form.oneLiner} onChange={(e) => update("oneLiner", e.target.value)} />
            </div>
            <div>
              <label className="label">Short business summary</label>
              <textarea className="input min-h-[80px]" value={form.summary} onChange={(e) => update("summary", e.target.value)} />
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="font-semibold text-ivory-100">Pitch details</h2>
            <div>
              <label className="label">Problem you solve</label>
              <textarea className="input min-h-[60px]" value={form.problem} onChange={(e) => update("problem", e.target.value)} />
            </div>
            <div>
              <label className="label">Target customers</label>
              <textarea className="input min-h-[60px]" value={form.targetCustomers} onChange={(e) => update("targetCustomers", e.target.value)} />
            </div>
            <div>
              <label className="label">Business model</label>
              <textarea className="input min-h-[60px]" value={form.businessModel} onChange={(e) => update("businessModel", e.target.value)} />
            </div>
            <div>
              <label className="label">Current traction</label>
              <textarea className="input min-h-[60px]" value={form.traction} onChange={(e) => update("traction", e.target.value)} />
            </div>
            <div>
              <label className="label">What you want from the event</label>
              <textarea className="input min-h-[60px]" value={form.wantsFromEvent} onChange={(e) => update("wantsFromEvent", e.target.value)} />
            </div>
          </section>

          <section className="card space-y-4">
            <h2 className="font-semibold text-ivory-100">Team & day preference</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Team size</label>
                <input type="number" min="1" className="input" value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)} />
              </div>
              <div>
                <label className="label">Attending members (1–3) *</label>
                <select className="input" required value={form.attendingCount} onChange={(e) => update("attendingCount", e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="label">Preferred pitch day</label>
                <select className="input" value={form.preferredDay} onChange={(e) => update("preferredDay", e.target.value)}>
                  <option value="no_preference">No preference</option>
                  <option value="2026-11-30">30 November 2026</option>
                  <option value="2026-12-01">1 December 2026</option>
                </select>
              </div>
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
            {loading ? "Submitting…" : "Submit Application & Proceed to Payment"}
          </button>
        </form>
      </main>
    </div>
  );
}
