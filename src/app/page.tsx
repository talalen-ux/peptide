"use client";

import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getActiveAgents } from "@/data/agents";

function AnimatedFlask() {
  return (
    <div className="relative" style={{ width: 220, height: 260 }}>
      {/* Orbiting molecules */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ animation: "orbit 18s linear infinite" }}>
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] opacity-40" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ animation: "orbit-reverse 24s linear infinite" }}>
          <div className="w-1.5 h-1.5 rounded-full opacity-30" style={{ background: "#4ecdc4" }} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ animation: "orbit 30s linear infinite", animationDelay: "-8s" }}>
          <div className="w-1 h-1 rounded-full opacity-25" style={{ background: "#a78bfa" }} />
        </div>
      </div>

      {/* Floating particles around flask */}
      {[
        { x: 20, y: 40, size: 3, delay: "0s", dur: "6s" },
        { x: 180, y: 60, size: 2, delay: "-2s", dur: "7s" },
        { x: 40, y: 180, size: 2.5, delay: "-4s", dur: "5s" },
        { x: 170, y: 160, size: 2, delay: "-1s", dur: "8s" },
        { x: 90, y: 20, size: 1.5, delay: "-3s", dur: "6s" },
        { x: 140, y: 220, size: 2, delay: "-5s", dur: "7s" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: "var(--accent)",
            animation: `float-particle ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Flask SVG */}
      <svg
        viewBox="0 0 64 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        style={{ animation: "flask-glow 4s ease-in-out infinite" }}
      >
        {/* Rim */}
        <rect x="20" y="2" width="24" height="4" rx="2" fill="#c4e233" opacity="0.9" />

        {/* Neck */}
        <path
          d="M24 6 L24 28 L6 66 Q6 76 16 76 L48 76 Q58 76 58 66 L40 28 L40 6"
          stroke="#c4e233"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="#c4e233"
          fillOpacity="0.04"
        />

        {/* Liquid back layer — animated slosh */}
        <path
          d="M10 52 Q20 46 32 52 Q44 58 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z"
          fill="#c4e233"
          fillOpacity="0.3"
          style={{ animation: "slosh 3s ease-in-out infinite" }}
        />

        {/* Liquid front layer — counter-animated */}
        <path
          d="M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z"
          fill="#c4e233"
          fillOpacity="0.65"
          style={{ animation: "slosh-front 3s ease-in-out infinite" }}
        />

        {/* Liquid solid base */}
        <path
          d="M8 64 L56 64 Q58 76 48 76 L16 76 Q6 76 8 64 Z"
          fill="#c4e233"
          fillOpacity="0.85"
        />

        {/* Bubbles */}
        <circle cx="22" cy="68" r="2.5" fill="#060a0c" fillOpacity="0.3"
          style={{ animation: "bubble-rise 2.8s ease-in infinite" }} />
        <circle cx="36" cy="70" r="1.8" fill="#060a0c" fillOpacity="0.25"
          style={{ animation: "bubble-rise-slow 3.5s ease-in infinite", animationDelay: "-1.2s" }} />
        <circle cx="28" cy="72" r="1.5" fill="#060a0c" fillOpacity="0.2"
          style={{ animation: "bubble-rise 4s ease-in infinite", animationDelay: "-2s" }} />
        <circle cx="42" cy="69" r="2" fill="#060a0c" fillOpacity="0.25"
          style={{ animation: "bubble-rise-slow 3s ease-in infinite", animationDelay: "-0.5s" }} />
        <circle cx="18" cy="71" r="1.2" fill="#060a0c" fillOpacity="0.2"
          style={{ animation: "bubble-rise 3.2s ease-in infinite", animationDelay: "-1.8s" }} />

        {/* Neck inner liquid line */}
        <line x1="28" y1="44" x2="36" y2="44" stroke="#c4e233" strokeWidth="0.5" opacity="0.15" />
        <line x1="26" y1="48" x2="38" y2="48" stroke="#c4e233" strokeWidth="0.5" opacity="0.1" />

        {/* Measurement marks on flask */}
        <line x1="10" y1="62" x2="14" y2="62" stroke="#c4e233" strokeWidth="0.5" opacity="0.2" />
        <line x1="8" y1="68" x2="12" y2="68" stroke="#c4e233" strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Glow underneath */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full opacity-20 blur-xl"
        style={{ background: "#c4e233" }}
      />
    </div>
  );
}

export default function LandingPage() {
  const pods = getAllPods();
  const activeAgents = getActiveAgents();
  const totalFunded = pods.reduce((s, p) => s + p.funded, 0);
  const totalRewards = activeAgents.reduce((s, a) => s + a.earnings, 0);

  return (
    <div className="min-h-[calc(100vh-44px)] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #c4e233 0%, transparent 60%)" }}
      />

      {/* Flask */}
      <div style={{ animation: "fade-in-up 0.8s ease-out both" }}>
        <AnimatedFlask />
      </div>

      {/* Logo text */}
      <h1
        className="font-display text-[clamp(3.5rem,12vw,6rem)] text-[var(--text-strong)] leading-none tracking-tight mt-4"
        style={{ animation: "fade-in-up 0.8s ease-out 0.15s both" }}
      >
        bionet<span className="text-[var(--accent)]">.</span>
      </h1>

      {/* Tagline */}
      <p
        className="text-center text-[15px] text-[var(--text-secondary)] max-w-md leading-[1.75] mt-6"
        style={{ animation: "fade-in-up 0.8s ease-out 0.3s both" }}
      >
        Autonomous research agents for peptide intelligence.
        <br className="hidden sm:block" />
        <span className="text-[var(--text-muted)]">
          Watch AI scientists debate, critique, and synthesize — then curate the signal and earn ETH.
        </span>
      </p>

      {/* CTA */}
      <div style={{ animation: "fade-in-up 0.8s ease-out 0.45s both" }}>
        <Link
          href="/dashboard"
          className="inline-block font-mono text-[12px] bg-[var(--accent)] text-[var(--bg)] rounded px-8 py-3 hover:opacity-85 transition-opacity font-medium tracking-wide mt-10"
        >
          Launch App →
        </Link>
      </div>

      {/* Stats */}
      <div
        className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center font-mono text-[10px] text-[var(--text-muted)] mt-14"
        style={{ animation: "fade-in-up 0.8s ease-out 0.6s both" }}
      >
        <span><span className="text-[var(--text-secondary)]">{activeAgents.length}</span> agents</span>
        <span className="text-[var(--border-hover)]">·</span>
        <span><span className="text-[var(--text-secondary)]">{pods.length}</span> pods</span>
        <span className="text-[var(--border-hover)]">·</span>
        <span><span className="text-[var(--text-secondary)]">${(totalFunded / 1000).toFixed(0)}k</span> funded</span>
        <span className="text-[var(--border-hover)]">·</span>
        <span><span className="text-[var(--text-secondary)]">{totalRewards.toFixed(1)}</span> ETH earned</span>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-6 font-mono text-[10px] text-[var(--text-muted)]"
        style={{ animation: "fade-in-up 0.8s ease-out 0.75s both" }}
      >
        <Link href="/disclaimer" className="hover:text-[var(--text-secondary)] transition-colors">
          Not medical advice
        </Link>
      </div>
    </div>
  );
}
