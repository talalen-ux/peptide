import Link from "next/link";

export default function Page() {
  return (
    <div className="relative">
      {/* Fixed flask background — pure CSS, no JS */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 45% at 65% 50%, rgba(196,226,51,0.035) 0%, transparent 70%)" }} />
        <div className="absolute right-[8%] sm:right-[12%] top-1/2 -translate-y-1/2">
          <svg viewBox="0 0 64 88" fill="none" className="w-44 sm:w-64 lg:w-80 h-auto flask-float">
            <rect x="20" y="2" width="24" height="4" rx="2" fill="#c4e233" opacity="0.5" />
            <path d="M24 6 L24 28 L6 66 Q6 76 16 76 L48 76 Q58 76 58 66 L40 28 L40 6" stroke="#c4e233" strokeWidth="1" strokeLinejoin="round" fill="#c4e233" fillOpacity="0.02" opacity="0.4" />
            <path d="M10 52 Q20 46 32 52 Q44 58 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z" fill="#c4e233" fillOpacity="0.15" className="liquid-back" />
            <path d="M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z" fill="#c4e233" fillOpacity="0.3" className="liquid-front" />
            <path d="M8 64 L56 64 Q58 76 48 76 L16 76 Q6 76 8 64 Z" fill="#c4e233" fillOpacity="0.45" />
            <circle cx="22" cy="68" r="2" fill="#060a0c" fillOpacity="0.25" className="bubble-1" />
            <circle cx="36" cy="70" r="1.5" fill="#060a0c" fillOpacity="0.2" className="bubble-2" />
            <circle cx="28" cy="72" r="1.2" fill="#060a0c" fillOpacity="0.15" className="bubble-3" />
          </svg>
        </div>
      </div>

      {/* Chapter 0 — Hero */}
      <section className="min-h-screen flex items-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl fade-section">
          <h1 className="font-display text-[clamp(3rem,10vw,6.5rem)] text-[var(--text-strong)] leading-[0.95] tracking-tight">
            bionet<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="font-mono text-[11px] sm:text-[12px] text-[var(--text-secondary)] tracking-[0.2em] uppercase mt-4">
            Tokenized Scientific Intelligence
          </p>
        </div>
      </section>

      {/* Chapter 1 — Vision */}
      <section className="min-h-screen flex items-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl fade-section">
          <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[var(--text-strong)] leading-[1.1] tracking-tight">
            Scientific intelligence becomes economically composable
          </h2>
          <p className="text-[13px] sm:text-[15px] text-[var(--text)] leading-[1.75] mt-6">
            Global participation, transparent funding, open coordination,
            and liquid exposure to scientific innovation — across longevity,
            peptide research, synthetic biology, genomics, computational
            chemistry, and emerging therapeutic systems.
          </p>
        </div>
      </section>

      {/* Chapter 2 — How it works */}
      <section className="min-h-screen flex items-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl fade-section">
          <h2 className="font-display text-[clamp(1.6rem,5vw,3.5rem)] text-[var(--text-strong)] leading-[1.1] tracking-tight">
            Coordinate. Fund. Discover.
          </h2>
          <div className="flex gap-8 sm:gap-12 font-mono mt-8">
            {[
              { value: "Curate", desc: "Surface the best research", color: "var(--accent)" },
              { value: "Fund", desc: "Back scientific directions", color: "#a78bfa" },
              { value: "Earn", desc: "Liquid exposure to breakthroughs", color: "#4ecdc4" },
            ].map((item) => (
              <div key={item.value}>
                <p className="text-[16px] sm:text-[18px] font-semibold mb-1" style={{ color: item.color }}>{item.value}</p>
                <p className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] tracking-wider max-w-[120px]">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[9px] sm:text-[10px] text-[var(--text-secondary)] mt-6">
            {["longevity", "peptide research", "synthetic biology", "genomics", "computational chemistry", "therapeutics"].map((d) => (
              <span key={d} className="border border-[var(--border)] rounded-full px-2 sm:px-2.5 py-1">{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 3 — CTA */}
      <section className="min-h-screen flex items-center px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl fade-section">
          <p className="font-display text-[clamp(1.3rem,3.5vw,2.5rem)] text-[var(--text-strong)] leading-[1.2]">
            Tokenized scientific intelligence.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="font-mono text-[12px] sm:text-[13px] bg-[var(--accent)] text-[var(--bg)] rounded px-8 sm:px-10 py-3 sm:py-3.5 hover:opacity-85 transition-opacity font-medium tracking-wide inline-block"
            >
              Launch App →
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] mt-8">
            <span><span className="text-[var(--text-secondary)]">6</span> agents</span>
            <span className="text-[var(--border-hover)]">·</span>
            <span><span className="text-[var(--text-secondary)]">5</span> pods</span>
            <span className="text-[var(--border-hover)]">·</span>
            <span><span className="text-[var(--text-secondary)]">$100k</span> funded</span>
            <span className="text-[var(--border-hover)]">·</span>
            <span><span className="text-[var(--text-secondary)]">7.6</span> ETH earned</span>
          </div>
        </div>
      </section>
    </div>
  );
}
