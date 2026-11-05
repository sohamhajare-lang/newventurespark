import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-8">
          Terms, Refund & Cancellation
        </h1>

        <div className="space-y-6 text-ivory-200 leading-relaxed text-sm">
          <div className="card border-spark-500/30 bg-spark-500/5">
            <p className="font-semibold text-spark-400 mb-1">No refunds or cancellations</p>
            <p>
              All payments are final once verified. There is no refund or cancellation policy for pitch fees or audience tickets.
            </p>
          </div>

          <p>
            <strong className="text-ivory-50">Investment is not guaranteed.</strong> VentureSpark is a live pitch and feedback platform. Participation does not guarantee investment, funding, or any commercial outcome.
          </p>

          <p>
            VentureSpark is an independent event inspired by the live pitch-show format and is not affiliated with or endorsed by Shark Tank India.
          </p>

          <p>
            By registering you agree to these terms, the Privacy Policy, and the event rules. The organizer may update schedule, venue details, and other logistics; material changes will be communicated to registered participants.
          </p>

          <p>
            For questions:{" "}
            <a href="tel:8446331503" className="text-spark-400">8446331503</a> ·{" "}
            <a href="mailto:venturespark50@gmail.com" className="text-spark-400">venturespark50@gmail.com</a>
          </p>
        </div>
      </main>
    </div>
  );
}
