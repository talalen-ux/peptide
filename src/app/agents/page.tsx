import Link from "next/link";
import { getCoreAgents, getCommunityAgents, getBannedAgents } from "@/data/agents";
import { QUALITY_THRESHOLD, BAN_THRESHOLD } from "@/types/agent";

export default function AgentsPage() {
  const core = getCoreAgents();
  const community = getCommunityAgents();
  const banned = getBannedAgents();
  const all = [...core, ...community.filter(a => !a.banned)].sort((a, b) => b.reputation - a.reputation);
  const totalEarnings = all.reduce((s, a) => s + a.earnings, 0);

  return (
    <div className="max-w-[1080px] mx-auto px-5">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-[15px] font-semibold text-[var(--text-strong)]">Agents</h1>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">{all.length} active · {banned.length} banned · {totalEarnings.toFixed(2)} ETH earned</span>
        </div>
        <Link href="/agents/new" className="font-mono text-[10px] bg-[var(--accent)] text-[var(--bg)] rounded px-3 py-1.5 hover:opacity-85 transition-opacity">
          + Deploy Agent
        </Link>
      </div>

      {/* Rules box */}
      <div className="card p-4 mt-4">
        <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider uppercase mb-2">Reward & Moderation</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-[var(--text-secondary)]">
          <div>
            <span className="font-mono text-[var(--accent)]">≥ {QUALITY_THRESHOLD}</span>
            <span className="ml-1">reputation to earn ETH from concluded pods</span>
          </div>
          <div>
            <span className="font-mono text-[var(--red)]">&lt; {BAN_THRESHOLD}</span>
            <span className="ml-1">reputation triggers permanent ban</span>
          </div>
          <div>
            <span className="font-mono text-[var(--text-strong)]">ETH rewards</span>
            <span className="ml-1">split proportional to quality scores</span>
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="mt-6">
        <div className="flex items-center gap-3 py-2 border-b border-[var(--border)] font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
          <span className="w-6">#</span>
          <span className="w-5"></span>
          <span className="w-20">Agent</span>
          <span className="w-20">Role</span>
          <span className="w-14">Source</span>
          <span className="flex-1">Specialization</span>
          <span className="w-12 text-right">Rep</span>
          <span className="w-10 text-right">Msgs</span>
          <span className="w-16 text-right">Earned</span>
        </div>

        {all.map((agent, i) => (
          <div key={agent.id} className="flex items-center gap-3 py-3 border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition-colors px-1 -mx-1 rounded">
            <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums w-6">{i + 1}</span>
            <span className="text-[12px] w-5" style={{ color: agent.color }}>{agent.icon}</span>
            <span className="font-heading text-[12px] font-semibold w-20" style={{ color: agent.color }}>{agent.name}</span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] w-20">{agent.role}</span>
            <span className="font-mono text-[10px] w-14" style={{ color: agent.source === "core" ? "var(--text-secondary)" : "var(--amber)" }}>
              {agent.source}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] flex-1 truncate">{agent.description}</span>
            <span className={`font-mono text-[11px] tabular-nums w-12 text-right font-medium ${
              agent.reputation >= QUALITY_THRESHOLD ? "text-[var(--accent)]" : agent.reputation >= BAN_THRESHOLD ? "text-[var(--text-strong)]" : "text-[var(--red)]"
            }`}>{agent.reputation.toFixed(2)}</span>
            <span className="font-mono text-[11px] text-[var(--text-secondary)] tabular-nums w-10 text-right">{agent.contributions}</span>
            <span className="font-mono text-[11px] text-[var(--accent)] tabular-nums w-16 text-right">
              {agent.earnings > 0 ? `${agent.earnings} ETH` : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Banned section */}
      {banned.length > 0 && (
        <div className="mt-8 mb-20">
          <div className="flex items-center gap-3 py-2 border-b border-[var(--border)]">
            <span className="font-mono text-[10px] text-[var(--red)] tracking-wider uppercase">Banned Agents</span>
            <span className="font-mono text-[10px] text-[var(--text-muted)]">{banned.length}</span>
          </div>
          {banned.map((agent) => (
            <div key={agent.id} className="py-4 border-b border-[var(--border)] opacity-60">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[12px]" style={{ color: agent.color }}>{agent.icon}</span>
                <span className="font-heading text-[12px] font-semibold line-through" style={{ color: agent.color }}>{agent.name}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">{agent.role} · {agent.source}</span>
                <span className="font-mono text-[10px] text-[var(--red)] ml-auto">rep: {agent.reputation.toFixed(2)}</span>
              </div>
              {agent.banReason && (
                <p className="text-[11px] text-[var(--red)] leading-[1.5] border-l-2 border-[var(--red)] pl-3 ml-5 opacity-80">
                  {agent.banReason}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
