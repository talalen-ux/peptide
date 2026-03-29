"use client";

import { useState } from "react";
import { Peptide } from "@/types/peptide";

const tabs = ["Benefits", "Risks", "Dosage", "Mechanism", "Research"] as const;

export default function DetailTabs({ peptide }: { peptide: Peptide }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Benefits");

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-gray-800 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              active === tab
                ? "text-primary-400 border-b-2 border-primary-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {active === "Benefits" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-400">Potential Benefits</h3>
            <ul className="space-y-2">
              {peptide.benefits.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "Risks" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-400">Risks & Side Effects</h3>
            <ul className="space-y-2">
              {peptide.risks.map((r, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-gray-300">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "Dosage" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-400">Dosage Protocol</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoBox label="Route" value={peptide.dosage.route} />
              <InfoBox label="Typical Dose" value={peptide.dosage.typicalDose} />
              <InfoBox label="Frequency" value={peptide.dosage.frequency} />
              {peptide.dosage.cycleLength && (
                <InfoBox label="Cycle Length" value={peptide.dosage.cycleLength} />
              )}
            </div>
            {peptide.dosage.notes && (
              <div className="mt-4 rounded-lg bg-gray-800/50 border border-gray-700 p-4">
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-300">Notes:</strong> {peptide.dosage.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {active === "Mechanism" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-400">Mechanisms of Action</h3>
            <ol className="space-y-3">
              {peptide.mechanismsOfAction.map((m, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/50 text-xs text-purple-300 shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {active === "Research" && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-cyan-400">Research & References</h3>
            <div className="space-y-3">
              {peptide.researchLinks.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-gray-800 bg-gray-900 p-4 hover:border-cyan-700 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-200">{r.title}</p>
                  <div className="mt-2 flex gap-3 text-xs text-gray-500">
                    <span className="rounded bg-cyan-900/30 px-2 py-0.5 text-cyan-400">{r.source}</span>
                    {r.year && <span>{r.year}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <p className="mt-1 text-sm text-gray-200 font-medium">{value}</p>
    </div>
  );
}
