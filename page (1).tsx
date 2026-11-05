import Link from "next/link";

const day1Items = [
  { time: "08:00 – 08:45", activity: "Venue setup and technical checks" },
  { time: "08:45 – 09:00", activity: "Judges arrive and check in" },
  { time: "09:00 – 09:15", activity: "Welcome, event briefing, and judging format" },
  { time: "09:15 – 12:35", activity: "Pitches 1–10" },
  { time: "12:35 – 13:20", activity: "Lunch break" },
  { time: "13:20 – 16:40", activity: "Pitches 11–20" },
  { time: "16:40 – 16:55", activity: "Short break" },
  { time: "16:55 – 18:35", activity: "Pitches 21–25" },
  { time: "18:35 – 19:00", activity: "Judges’ deliberation" },
  { time: "19:00 – 19:20", activity: "Closing remarks and next steps" },
];

export default function AgendaPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-3">Agenda</h1>
        <p className="text-ivory-300 mb-2">30 November & 1 December 2026 · Same schedule both days</p>
        <p className="text-sm text-spark-400/90 mb-10">
          Final pitch order depends on registrations and judge availability; final timings may change.
        </p>

        <div className="space-y-3">
          {day1Items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 rounded-lg border border-charcoal-700 bg-charcoal-900 px-5 py-4"
            >
              <span className="text-spark-500 font-medium text-sm sm:w-36 shrink-0">{item.time}</span>
              <span className="text-ivory-100">{item.activity}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-ivory-300/70">
          Each pitch is allotted 10–15 minutes for presentation + 5 minutes Q&A (up to 20 minutes total).
        </p>
      </main>
    </div>
  );
}
