import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-8">Privacy Policy</h1>
        <div className="space-y-5 text-ivory-200 leading-relaxed text-sm">
          <p>
            We collect only the information needed to process your registration, issue tickets, and communicate about the event (name, email, mobile, city, and related registration details).
          </p>
          <p>
            Payment proof images and pitch decks are stored securely and are accessible only to authorized event staff.
          </p>
          <p>
            We do not sell or share your personal data with third parties for marketing. Data may be shared with service providers strictly required to run the event (email delivery, file storage).
          </p>
          <p>
            By registering you consent to us contacting you about your registration, payment status, schedule, and event logistics.
          </p>
          <p>
            For any privacy-related request, email{" "}
            <a href="mailto:venturespark50@gmail.com" className="text-spark-400">venturespark50@gmail.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
