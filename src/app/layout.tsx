import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VentureSpark: The Founders’ Arena",
  description:
    "Live startup pitch event in Mumbai. Where bold ideas meet sharp questions. 30 Nov – 1 Dec 2026, Bandra West.",
  keywords: ["startup", "pitch", "Mumbai", "VentureSpark", "founders"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-charcoal-950 text-ivory-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
