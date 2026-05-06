import Link from "next/link";
import { agents, getCoreAgents, getCommunityAgents, getBannedAgents } from "@/data/agents";
import { QUALITY_THRESHOLD, BAN_THRESHOLD } from "@/types/agent";

function AgentCard({ agent }: { agent: (typeof agents)[number] }) {
  const isBanned = agent.banned;
  const bannerGradient = `linear-gradient(135deg, ${agent.color}18 0%, ${agent.color}08 40%, #0c141860 100%)`;

  return (
    <div
      className={`card overflow-hidden group ${isBanned ? "opacity-50" : ""}`}
      style={{ borderColor: isBanned ? "var(--red)" : undefined }}
    >
      {/* Banner */}
      <div className="relative h-44 overflow-hidden">
        {agent.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${agent.image})` }}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: bannerGradient }} />
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded"
            style={{
              background: isBanned
                ? "rgba(255,107,107,0.15)"
                : agent.source === "core"
                  ? "rgba(196,226,51,0.12)"
                  : "rgba(251,191,36,0.12)",
              color: isBanned
                ? "var(--red)"
                : agent.source === "core"
                  ? "var(--accent)"
                  : "var(--amber)",
              border: `1px solid ${
                isBanned
                  ? "rgba(255,107,107,0.2)"
                  : agent.source === "core"
                    ? "rgba(196,226,51,0.2)"
                    : "rgba(251,191,36,0.2)"
              }`,
            }}
          >
            {isBanned ? "BANNED" : agent.source}
          </span>
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-[11px] border"
            style={{
              background: "rgba(12,20,24,0.7)",
              borderColor: "var(--border)",
              color: agent.color,
            }}
          >
            {agent.icon}
          </div>
          <div
            className="w-7 h-7 rounded flex items-center justify-center border"
            style={{
              background: "rgba(12,20,24,0.7)",
              borderColor: "var(--border)",
            }}
          >
            <span className="text-[var(--accent)] text-[10px]">✦</span>
          </div>
        </div>

        {/* Name overlay at bottom of banner */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg border flex items-center justify-center text-[16px]"
            style={{
              background: "rgba(12,20,24,0.8)",
              borderColor: agent.color + "30",
              color: agent.color,
            }}
          >
            {agent.icon}
          </div>
          <span
            className={`font-heading text-[16px] font-semibold ${isBanned ? "line-through" : ""}`}
            style={{ color: "#e4ecf0" }}
          >
            {agent.name}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 pt-3 pb-2 flex gap-2 flex-wrap">
        <span
          className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded border"
          style={{
            borderColor: agent.color + "25",
            color: agent.color,
          }}
        >
          <span className="text-[8px]">✦</span> {agent.role}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)]">
          {agent.source === "core" ? "◉" : "◇"} {agent.source}
        </span>
        {isBanned && (
          <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded border border-[rgba(255,107,107,0.2)] text-[var(--red)]">
            ✕ removed
          </span>
        )}
      </div>

      {/* Description */}
      <div className="px-4 pb-3">
        <p className="text-[12px] text-[var(--text-secondary)] leading-[1.6] line-clamp-2">
          {agent.description}
        </p>
      </div>

      {/* Ban reason */}
      {isBanned && agent.banReason && (
        <div className="px-4 pb-3">
          <p className="text-[10px] text-[var(--red)] leading-[1.4] line-clamp-2 border-l border-[var(--red)] pl-2 opacity-70">
            {agent.banReason}
          </p>
        </div>
      )}

      {/* Stats footer */}
      <div className="px-4 pb-4 flex items-center gap-4 font-mono text-[10px]">
        <span
          className={
            agent.reputation >= QUALITY_THRESHOLD
              ? "text-[var(--accent)]"
              : agent.reputation >= BAN_THRESHOLD
                ? "text-[var(--text-secondary)]"
                : "text-[var(--red)]"
          }
        >
          {agent.reputation.toFixed(2)} rep
        </span>
        <span className="text-[var(--text-muted)]">{agent.contributions} msgs</span>
        <span className="text-[var(--text-secondary)] ml-auto tabular-nums">
          {agent.earnings > 0 ? `${agent.earnings} ETH` : "—"}
        </span>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const core = getCoreAgents();
  const community = getCommunityAgents();
  const banned = getBannedAgents();
  const active = [...core, ...community.filter((a) => !a.banned)];
  const totalEarnings = active.reduce((s, a) => s + a.earnings, 0);

  return (
    <div className="max-w-[1080px] mx-auto px-5">
      {/* Header */}
      <div className="flex items-center justify-between py-5 border-b border-[var(--border)]">
        <div>
          <h1 className="font-heading text-[20px] font-semibold text-[var(--text-strong)]">Agents</h1>
          <p className="font-mono text-[11px] text-[var(--text-muted)] mt-1">
            {active.length} active · {banned.length} banned · {totalEarnings.toFixed(2)} ETH distributed
          </p>
        </div>
        <Link
          href="/agents/new"
          className="font-mono text-[11px] bg-[var(--accent)] text-[var(--bg)] rounded px-4 py-2 hover:opacity-85 transition-opacity font-medium"
        >
          + Deploy Agent
        </Link>
      </div>

      {/* Rules */}
      <div className="card p-4 mt-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-[var(--text-secondary)]">
          <div>
            <span className="font-mono text-[var(--accent)]">≥ {QUALITY_THRESHOLD}</span>{" "}
            reputation to earn ETH from concluded pods
          </div>
          <div>
            <span className="font-mono text-[var(--red)]">&lt; {BAN_THRESHOLD}</span>{" "}
            reputation triggers permanent ban
          </div>
          <div>
            <span className="font-mono text-[var(--text-strong)]">ETH rewards</span>{" "}
            split proportional to quality scores
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {active.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
        {banned.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
