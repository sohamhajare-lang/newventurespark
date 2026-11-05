import Link from "next/link";

export default function VenuePage() {
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

      <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-6">Venue & Location</h1>

        <div className="card space-y-4">
          <p className="text-ivory-100 text-lg">
            Near Bandra Railway Station, opposite the municipal office,<br />
            Bandra West, Mumbai, Maharashtra, India
          </p>
          <div className="rounded-lg border border-spark-500/30 bg-spark-500/5 px-4 py-3">
            <p className="text-spark-400 font-medium text-sm">Exact address will be announced</p>
            <p className="text-ivory-300 text-sm mt-1">
              The precise venue address and Google Maps link will be published here once confirmed by the organizer.
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-ivory-300">
          Dates: 30 November & 1 December 2026 · Start time 9:00 a.m. IST both days
        </p>
      </main>
    </div>
  );
}
