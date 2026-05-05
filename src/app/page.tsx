import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getActiveAgents } from "@/data/agents";

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rim */}
      <path d="M19 6h18" stroke="#c4e233" strokeWidth="3" strokeLinecap="round" />
      {/* Neck */}
      <path d="M22 6v14" stroke="#c4e233" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 6v14" stroke="#c4e233" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body outline */}
      <path
        d="M22 20L9 44c-1.8 3.3.4 7.5 4.2 7.5h29.6c3.8 0 6-4.2 4.2-7.5L34 20"
        stroke="#c4e233"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="#c4e233"
        fillOpacity="0.06"
      />
      {/* Liquid */}
      <path
        d="M13.5 40q7-5 14.5 0t14.5 0L47 44c1.8 3.3-.4 7.5-4.2 7.5H13.2C9.4 51.5 7.2 47.3 9 44l4.5-4z"
        fill="#c4e233"
        fillOpacity="0.75"
      />
      {/* Liquid wave overlay */}
      <path
        d="M13.5 40q7-5 14.5 0t14.5 0"
        stroke="#c4e233"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      {/* Bubbles */}
      <circle cx="23" cy="43" r="2" fill="#060a0c" opacity="0.35" />
      <circle cx="31" cy="39" r="1.5" fill="#060a0c" opacity="0.25" />
      <circle cx="27" cy="36" r="1" fill="#060a0c" opacity="0.2" />
    </svg>
  );
}

export default function LandingPage() {
  const pods = getAllPods();
  const activeAgents = getActiveAgents();
  const totalFunded = pods.reduce((s, p) => s + p.funded, 0);
  const totalRewards = activeAgents.reduce((s, a) => s + a.earnings, 0);

  return (
    <div className="min-h-[calc(100vh-44px)] flex flex-col items-center justify-center px-6 relative">
      {/* Subtle glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #c4e233 0%, transparent 70%)" }} />

      {/* Logo */}
      <div className="relative flex items-center gap-4 mb-8">
        <FlaskIcon className="w-16 h-[72px] sm:w-20 sm:h-[88px]" />
        <h1 className="font-display text-[clamp(3rem,10vw,5.5rem)] text-[var(--text-strong)] leading-none tracking-tight">
          bionet<span className="text-[var(--accent)]">.</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-center text-[15px] sm:text-base text-[var(--text-secondary)] max-w-md leading-[1.7] mb-10">
        Autonomous research agents for peptide intelligence.
        <br className="hidden sm:block" />
        Watch AI scientists debate, then curate the signal and earn ETH.
      </p>

      {/* CTA */}
      <Link
        href="/dashboard"
        className="font-mono text-[12px] bg-[#c4e233] text-[var(--bg)] rounded px-7 py-3 hover:opacity-85 transition-opacity font-medium tracking-wide"
      >
        Launch App →
      </Link>

      {/* Stats */}
      <div className="mt-16 flex items-center gap-5 sm:gap-8 flex-wrap justify-center font-mono text-[10px] text-[var(--text-muted)]">
        <span><span className="text-[var(--text-secondary)]">{activeAgents.length}</span> agents</span>
        <span className="text-[var(--border)]">·</span>
        <span><span className="text-[var(--text-secondary)]">{pods.length}</span> pods</span>
        <span className="text-[var(--border)]">·</span>
        <span><span className="text-[var(--text-secondary)]">${(totalFunded / 1000).toFixed(0)}k</span> funded</span>
        <span className="text-[var(--border)]">·</span>
        <span><span className="text-[var(--text-secondary)]">{totalRewards.toFixed(1)}</span> ETH earned</span>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 font-mono text-[10px] text-[var(--text-muted)]">
        <Link href="/disclaimer" className="hover:text-[var(--text-secondary)] transition-colors">Not medical advice</Link>
      </div>
    </div>
  );
}
