import Link from "next/link";

export default function AboutPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-6">
          About VentureSpark
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-ivory-200 leading-relaxed">
          <p>
            VentureSpark is a live startup pitch event where founders present their businesses to a
            judging panel, answer questions, and receive feedback. It offers a platform to showcase
            your brand and connect with the startup community.
          </p>
          <p>
            Founders may have the opportunity to connect with investors;{" "}
            <strong className="text-spark-400">investment is not guaranteed</strong>.
          </p>
          <p>
            The event takes place over two days — 30 November and 1 December 2026 — near Bandra
            Railway Station, Bandra West, Mumbai.
          </p>
          <p>
            Up to 50 business pitches will be selected across the two days (25 per day). Each pitch
            is allotted 10–15 minutes for presentation followed by 5 minutes of live Q&A.
          </p>
        </div>

        <div className="mt-12 p-5 rounded-lg border border-charcoal-700 bg-charcoal-900">
          <p className="text-sm text-ivory-300 leading-relaxed">
            <strong className="text-ivory-100">Independent-event disclaimer:</strong> VentureSpark
            is an independent event inspired by the live pitch-show format and is not affiliated
            with or endorsed by Shark Tank India.
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/pitch" className="btn-primary">Pitch Your Startup</Link>
          <Link href="/tickets" className="btn-secondary">Get Audience Ticket</Link>
        </div>
      </main>
    </div>
  );
}
