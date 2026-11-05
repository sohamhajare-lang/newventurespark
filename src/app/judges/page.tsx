import Link from "next/link";

const judges = [
  {
    name: "Aadit Palicha",
    role: "Co-founder of Zepto",
    areas: "Quick commerce, logistics, operations, customer demand, scaling",
  },
  {
    name: "Alakh Pandey",
    role: "Co-founder of PhysicsWallah",
    areas: "Education, digital learning, affordability, reaching learners at scale",
  },
  {
    name: "Nikhil Kamath",
    role: "Co-founder of Zerodha",
    areas: "Business models, finance, growth strategy",
  },
  {
    name: "Vijay Shekhar Sharma",
    role: "Founder of Paytm",
    areas: "Fintech, digital products, technology-led businesses",
  },
  {
    name: "Peyush Bansal",
    role: "Co-founder and CEO of Lenskart",
    areas: "Customer experience, branding, retail, scaling a consumer business",
  },
];

export default function JudgesPage() {
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

      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory-50 mb-3">Judges</h1>
        <p className="text-ivory-300 mb-2">
          The organizer has confirmed these judges. Their experience may guide feedback.
        </p>
        <p className="text-sm text-spark-400 mb-12">
          Investment is not guaranteed.
        </p>

        <div className="space-y-6">
          {judges.map((j, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 rounded-lg border border-charcoal-700 bg-charcoal-900 p-6"
            >
              <div className="w-16 h-16 rounded-full bg-charcoal-700 flex items-center justify-center text-2xl font-display text-spark-500 shrink-0">
                {j.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-ivory-50">{j.name}</h2>
                <p className="text-spark-400 text-sm mt-0.5">{j.role}</p>
                <p className="text-ivory-300 text-sm mt-3">
                  <span className="text-ivory-400">Potential feedback areas: </span>
                  {j.areas}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-ivory-300/60">
          Judge photos will appear once the organizer uploads and approves them.
        </p>
      </main>
    </div>
  );
}
