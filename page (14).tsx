import Link from "next/link";

const locations = [
  { name: "Bandra Railway Station", fare: "₹199", starts: "7:00 a.m." },
  { name: "Mumbai Central Bus Station", fare: "₹499", starts: "7:00 a.m." },
  { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", fare: "₹699", starts: "7:00 a.m." },
];

export default function TransportPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-3">Transport</h1>
        <p className="text-ivory-300 mb-2">Paid one-way pickup / drop-off (proposed rates)</p>
        <p className="text-sm text-spark-400 mb-10">
          Service starts at 7:00 a.m. on both event days. Advance booking is required. Fares are proposed event rates.
        </p>

        <div className="space-y-4 mb-12">
          {locations.map((loc, i) => (
            <div key={i} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ivory-50">{loc.name}</p>
                <p className="text-sm text-ivory-300">Starts {loc.starts}</p>
              </div>
              <p className="text-spark-500 font-bold text-lg">{loc.fare} <span className="text-sm font-normal text-ivory-400">/ person</span></p>
            </div>
          ))}
        </div>

        <div className="card bg-charcoal-800/50">
          <p className="text-ivory-200 text-sm leading-relaxed">
            Transport booking form will open once the organizer confirms operator costs and exact pickup points.
            For now, contact us at <a href="tel:8446331503" className="text-spark-400">8446331503</a> or{" "}
            <a href="mailto:venturespark50@gmail.com" className="text-spark-400">venturespark50@gmail.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
