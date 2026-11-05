import Link from "next/link";

export default function HomePage() {
  // Countdown target: 30 November 2026 09:00 IST
  const eventStart = new Date("2026-11-30T09:00:00+05:30");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-charcoal-800 bg-charcoal-950/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-ivory-50">
            Venture<span className="text-spark-500">Spark</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-ivory-200">
            <Link href="/about" className="hover:text-spark-400 transition">About</Link>
            <Link href="/agenda" className="hover:text-spark-400 transition">Agenda</Link>
            <Link href="/judges" className="hover:text-spark-400 transition">Judges</Link>
            <Link href="/pitch" className="hover:text-spark-400 transition">Pitch</Link>
            <Link href="/tickets" className="hover:text-spark-400 transition">Tickets</Link>
            <Link href="/contact" className="hover:text-spark-400 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/tickets" className="btn-secondary text-xs px-4 py-2 hidden sm:inline-flex">
              Audience
            </Link>
            <Link href="/pitch" className="btn-primary text-xs px-4 py-2">
              Pitch Your Startup
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-spark-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28 w-full relative">
          <p className="text-spark-500 font-medium tracking-widest text-sm uppercase mb-4">
            30 November – 1 December 2026 · Bandra West, Mumbai
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory-50 leading-[1.1] max-w-4xl">
            VentureSpark
            <span className="block text-spark-500 mt-1">The Founders’ Arena</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ivory-200 max-w-2xl leading-relaxed">
            Where bold ideas meet sharp questions.
          </p>
          <p className="mt-3 text-ivory-300/80 max-w-xl">
            A live startup pitch event. Founders present. Judges probe. The room decides.
            Investment is not guaranteed.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/pitch" className="btn-primary text-base px-8 py-3.5">
              Pitch Your Startup →
            </Link>
            <Link href="/tickets" className="btn-secondary text-base px-8 py-3.5">
              Get Audience Ticket
            </Link>
          </div>

          <div className="mt-12 p-4 rounded-lg border border-spark-500/30 bg-spark-500/5 max-w-md">
            <p className="text-sm text-spark-400 font-medium">Pitch registration closes</p>
            <p className="text-ivory-100 font-semibold">15 November 2026 · 11:59 p.m. IST</p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-t border-charcoal-800 bg-charcoal-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-display font-bold text-spark-500">50</p>
            <p className="text-sm text-ivory-300 mt-1">Pitch slots</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-spark-500">2</p>
            <p className="text-sm text-ivory-300 mt-1">Days</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-spark-500">5</p>
            <p className="text-sm text-ivory-300 mt-1">Judges</p>
          </div>
          <div>
            <p className="text-3xl font-display font-bold text-spark-500">₹15,999</p>
            <p className="text-sm text-ivory-300 mt-1">Pitch fee</p>
          </div>
        </div>
      </section>

      {/* Disclaimer footer strip */}
      <footer className="border-t border-charcoal-800 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-sm text-ivory-300/70">
          <p>
            VentureSpark is an independent event inspired by the live pitch-show format and is not
            affiliated with or endorsed by Shark Tank India.
          </p>
          <p className="mt-2">
            Investment is not guaranteed. · Contact: 8446331503 · venturespark50@gmail.com
          </p>
          <p className="mt-4 text-xs">
            © 2026 VentureSpark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
