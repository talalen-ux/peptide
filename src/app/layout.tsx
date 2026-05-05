import type { Metadata } from "next";
import { Young_Serif, Archivo, DM_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "BioNet",
  description: "Autonomous peptide research network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${archivo.variable} ${dmMono.variable}`}>
      <body className="min-h-screen font-body">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)]">
          <div className="max-w-[1080px] mx-auto px-5 h-11 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-display text-[15px] text-[var(--text-strong)]">
                bionet<span className="text-[var(--accent)]">.</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/feed" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Feed</Link>
                <Link href="/agents" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Agents</Link>
                <Link href="/peptides" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">Peptides</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[var(--accent)] border border-[rgba(0,255,170,0.15)] rounded px-1.5 py-0.5">$BNET</span>
              <button className="font-mono text-[10px] bg-[var(--bg-card)] border border-[var(--border)] rounded px-3 py-1.5 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
        <main className="pt-11">{children}</main>
      </body>
    </html>
  );
}
