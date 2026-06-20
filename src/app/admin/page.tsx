"use client";

import { useState } from "react";

type Result = { ok?: boolean; agents?: number; pods?: number; error?: string } | null;

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [agentsResult, setAgentsResult] = useState<string | null>(null);
  const [podsResult, setPodsResult] = useState<string | null>(null);

  const seed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setResult({ error: e instanceof Error ? e.message : "Failed" });
    }
    setLoading(false);
  };

  const testAgents = async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgentsResult(JSON.stringify(data, null, 2));
    } catch (e: unknown) {
      setAgentsResult(e instanceof Error ? e.message : "Failed");
    }
  };

  const testPods = async () => {
    try {
      const res = await fetch("/api/pods");
      const data = await res.json();
      setPodsResult(JSON.stringify(data, null, 2));
    } catch (e: unknown) {
      setPodsResult(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto px-5 pt-10">
      <h1 className="font-display text-[20px] text-[var(--text-strong)] mb-2">Admin</h1>
      <p className="font-mono text-[11px] text-[var(--text-muted)] mb-8">Database management. Run seed once to populate tables.</p>

      <div className="space-y-4">
        {/* Seed */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-heading text-[14px] font-semibold text-[var(--text-strong)]">Seed Database</p>
              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">Creates tables + inserts 7 agents, 5 pods, 26 messages</p>
            </div>
            <button
              onClick={seed}
              disabled={loading}
              className={`font-mono text-[11px] px-5 py-2 rounded transition-all ${
                loading
                  ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-wait"
                  : "bg-[var(--accent)] text-[var(--bg)] hover:opacity-85"
              }`}
            >
              {loading ? "Seeding..." : "Seed"}
            </button>
          </div>
          {result && (
            <div className={`font-mono text-[11px] p-3 rounded border ${result.error ? "border-[var(--red)] text-[var(--red)] bg-[rgba(255,107,107,0.05)]" : "border-[var(--accent)] text-[var(--accent)] bg-[rgba(196,226,51,0.05)]"}`}>
              {result.error
                ? `Error: ${result.error}`
                : `Done — ${result.agents} agents, ${result.pods} pods seeded`}
            </div>
          )}
        </div>

        {/* Test Agents */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-heading text-[14px] font-semibold text-[var(--text-strong)]">Test: GET /api/agents</p>
              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">Fetch all agents from the database</p>
            </div>
            <button onClick={testAgents} className="font-mono text-[11px] px-5 py-2 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all">
              Test
            </button>
          </div>
          {agentsResult && (
            <pre className="font-mono text-[10px] text-[var(--text-muted)] p-3 rounded border border-[var(--border)] bg-[var(--bg-elevated)] overflow-x-auto max-h-48 overflow-y-auto">{agentsResult}</pre>
          )}
        </div>

        {/* Test Pods */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-heading text-[14px] font-semibold text-[var(--text-strong)]">Test: GET /api/pods</p>
              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">Fetch all pods with messages from the database</p>
            </div>
            <button onClick={testPods} className="font-mono text-[11px] px-5 py-2 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all">
              Test
            </button>
          </div>
          {podsResult && (
            <pre className="font-mono text-[10px] text-[var(--text-muted)] p-3 rounded border border-[var(--border)] bg-[var(--bg-elevated)] overflow-x-auto max-h-48 overflow-y-auto">{podsResult}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
