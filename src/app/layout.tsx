import type { Metadata } from "next";
import {
  Instrument_Serif,
  Bricolage_Grotesque,
  Manrope,
  Fira_Code,
} from "next/font/google";
import Link from "next/link";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Peptide Analyzer — Research-Backed Peptide Database",
  description:
    "Comprehensive peptide research database. Explore benefits, risks, dosage protocols, and scientific literature for top peptides.",
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-muted)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors duration-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M12 2v20M7 7c0 5 10 5 10 0M7 17c0-5 10-5 10 0" />
              </svg>
            </div>
            <span className="font-heading text-lg font-semibold tracking-tight text-[var(--text)]">
              Peptide<span className="text-[var(--accent)]">Analyzer</span>
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/peptides"
              className="text-sm font-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              Browse
            </Link>
            <Link
              href="/disclaimer"
              className="text-sm font-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-md bg-[var(--accent-muted)] border border-[var(--border)] flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M12 2v20M7 7c0 5 10 5 10 0M7 17c0-5 10-5 10 0" />
                </svg>
              </div>
              <span className="font-heading text-sm font-semibold text-[var(--text)]">
                PeptideAnalyzer
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Research-backed peptide information for educational and
              informational purposes only.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5">
              Navigate
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/peptides", label: "Browse Peptides" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-5">
              Categories
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { slug: "healing-recovery", label: "Healing & Recovery" },
                { slug: "growth-hormone", label: "Growth Hormone" },
                { slug: "cognitive", label: "Cognitive" },
                { slug: "anti-aging", label: "Anti-Aging" },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/peptides?category=${cat.slug}`}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="line-glow mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} PeptideAnalyzer. For research
            purposes only.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Not medical advice. Consult a healthcare professional.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${bricolage.variable} ${manrope.variable} ${firaCode.variable}`}
    >
      <body className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
