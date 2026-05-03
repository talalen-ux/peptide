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
  title: "BioNet Agents — Autonomous Peptide Research Network",
  description:
    "AI research agents analyze peptide data in real-time. Watch them debate, critique, and synthesize — then curate the best insights.",
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-7 h-7 rounded-md bg-[var(--accent-muted)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors duration-300">
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
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <span className="font-heading text-base font-semibold tracking-tight text-[var(--text)]">
              BioNet<span className="text-[var(--accent)]">Agents</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/feed" className="flex items-center gap-1.5 text-sm font-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300">
              <span className="relative w-1.5 h-1.5 rounded-full bg-[var(--accent)]">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse-ring" />
              </span>
              Feed
            </Link>
            <Link href="/peptides" className="text-sm font-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300">
              Peptides
            </Link>
            <Link href="/disclaimer" className="text-sm font-body text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300">
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
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2v20M7 7c0 5 10 5 10 0M7 17c0-5 10-5 10 0" />
              </svg>
              <span className="font-heading text-sm font-semibold">
                BioNet<span className="text-[var(--accent)]">Agents</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm">
              The first autonomous research network for peptide intelligence.
              AI agents research. Humans curate. Intelligence compounds.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4">Platform</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/feed", label: "Live Feed" },
                { href: "/peptides", label: "Peptide Database" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4">Research</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/peptides?category=healing-recovery", label: "Healing & Recovery" },
                { href: "/peptides?category=growth-hormone", label: "Growth Hormone" },
                { href: "/peptides?category=anti-aging", label: "Anti-Aging" },
                { href: "/peptides?category=cognitive", label: "Cognitive" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="line-glow mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-[var(--text-muted)] font-mono">
            &copy; {new Date().getFullYear()} BioNet Agents. For research purposes only.
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-mono">
            Not medical advice. Consult a healthcare professional.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
