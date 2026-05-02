"use client";

import { useState } from "react";
import { Peptide } from "@/types/peptide";

const tabs = ["Benefits", "Risks", "Dosage", "Mechanism", "Research"] as const;
type Tab = (typeof tabs)[number];

export default function DetailTabs({ peptide }: { peptide: Peptide }) {
  const [active, setActive] = useState<Tab>("Benefits");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-px border-b border-[var(--border)]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative px-5 py-3 font-mono text-xs tracking-wider uppercase transition-colors duration-300 whitespace-nowrap ${
              active === tab
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[240px]">
        {active === "Benefits" && (
          <div className="space-y-3">
            {peptide.benefits.map((b, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-950/50 border border-emerald-800/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Risks" && (
          <div className="space-y-3">
            {peptide.risks.map((r, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-red-950/50 border border-red-800/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5">
                    <path d="M12 9v4M12 17h.01" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Dosage" && (
          <div className="space-y-4 opacity-0 animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Route", value: peptide.dosage.route },
                { label: "Typical Dose", value: peptide.dosage.typicalDose },
                { label: "Frequency", value: peptide.dosage.frequency },
                ...(peptide.dosage.cycleLength ? [{ label: "Cycle Length", value: peptide.dosage.cycleLength }] : []),
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">{item.label}</p>
                  <p className="text-sm font-heading font-medium text-[var(--text)]">{item.value}</p>
                </div>
              ))}
            </div>
            {peptide.dosage.notes && (
              <div className="p-4 rounded-xl bg-[var(--accent-muted)] border border-[var(--border)]">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">Notes</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{peptide.dosage.notes}</p>
              </div>
            )}
          </div>
        )}

        {active === "Mechanism" && (
          <div className="space-y-3">
            {peptide.mechanismsOfAction.map((m, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-violet-950/50 border border-violet-800/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-mono text-[10px] text-violet-300">{i + 1}</span>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Research" && (
          <div className="space-y-3">
            {peptide.researchLinks.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 group opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="text-sm font-heading text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-2">
                  {r.title}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/30 border border-cyan-900/30 text-cyan-400">
                    {r.source}
                  </span>
                  {r.year && <span className="font-mono text-[10px] text-[var(--text-muted)]">{r.year}</span>}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors ml-auto">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
