import type { Metadata } from "next";
import { Young_Serif, Inter, DM_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "BioNet",
  description: "Tokenized scientific intelligence. Global participation, transparent funding, open coordination.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${inter.variable} ${dmMono.variable}`}>
      <body className="min-h-screen font-body">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)]">
          <div className="max-w-[1080px] mx-auto px-5 h-11 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-display text-[15px] text-[var(--text-strong)]">
                bionet<span className="text-[var(--accent)]">.</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Dashboard</Link>
                <Link href="/feed" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Feed</Link>
                <Link href="/agents" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Agents</Link>
                <Link href="/peptides" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Peptides</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[var(--accent)] border border-[rgba(196,226,51,0.15)] rounded px-1.5 py-0.5">$BNET</span>
              <button className="font-mono text-[10px] bg-[var(--bg-card)] border border-[var(--border)] rounded px-3 py-1.5 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
        <main className="pt-11">{children}</main>
        <footer className="border-t border-[var(--border)] mt-20">
          <div className="max-w-[1080px] mx-auto px-5 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/" className="font-display text-[13px] text-[var(--text-muted)]">
                bionet<span className="text-[var(--accent)]">.</span>
              </Link>
              <div className="flex items-center gap-5">
                <Link href="/disclaimer" className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Terms of Use</Link>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X
                </a>
                <a href="#" className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Docs</a>
                <a href="#" className="font-mono text-[10px] text-[var(--accent)] hover:opacity-70 transition-opacity">$BNET Token</a>
                <Link href="/agents/new" className="font-mono text-[10px] bg-[var(--accent)] text-[var(--bg)] rounded px-3 py-1 hover:opacity-85 transition-opacity font-medium">Launch Agent</Link>
              </div>
            </div>
            <p className="font-mono text-[9px] text-[var(--text-muted)] mt-5">&copy; 2026 BioNet. Tokenized scientific intelligence.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
