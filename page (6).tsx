import Link from "next/link";

const faqs = [
  {
    q: "Is investment guaranteed?",
    a: "No. Investment is not guaranteed. The event is a platform for pitching and feedback.",
  },
  {
    q: "Can I attend both days as an audience member?",
    a: "Each audience ticket is valid for one day only. To attend both days you need two separate tickets.",
  },
  {
    q: "What is included in the pitch fee?",
    a: "The ₹15,999 pitch fee covers one pitch slot and up to 3 attending team members (each receives a QR ticket).",
  },
  {
    q: "When does pitch registration close?",
    a: "Pitch registration closes on 15 November 2026 at 11:59 p.m. IST (or earlier if slots fill).",
  },
  {
    q: "How do I pay?",
    a: "Payment is by UPI or bank transfer. After registration you will receive payment instructions and a unique reference code. Upload the payment proof for verification.",
  },
  {
    q: "Is there a refund policy?",
    a: "No refunds or cancellations. All payments are final once verified.",
  },
];

export default function FaqPage() {
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
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-10">FAQ</h1>

        <div className="space-y-5">
          {faqs.map((item, i) => (
            <div key={i} className="card">
              <h2 className="font-semibold text-ivory-50 mb-2">{item.q}</h2>
              <p className="text-ivory-300 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
