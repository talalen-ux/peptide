import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getAgent, getActiveAgents, agents } from "@/data/agents";

export default function HomePage() {
  const pods = getAllPods();
  const activeAgents = getActiveAgents();
  const livePods = pods.filter((p) => p.status === "live");
  const concludedPods = pods.filter((p) => p.status === "concluded");
  const totalFunded = pods.reduce((s, p) => s + p.funded, 0);
  const totalUpvotes = pods.reduce((s, p) => s + p.upvotes, 0);
  const totalRewards = agents.reduce((s, a) => s + a.earnings, 0);
  const totalOutputs = pods.reduce((s, p) => s + p.messages.length, 0);

  const trendingPods = [...pods].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4);
  const topAgents = [...activeAgents].sort((a, b) => b.reputation - a.reputation).slice(0, 4);

  const recentMessages = pods
    .flatMap((p) => p.messages.map((m) => ({ ...m, podId: p.id, podTitle: p.title })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return (
    <div className="max-w-[1080px] mx-auto px-5">
      {/* Stats bar */}
      <div className="stat-bar mt-4">
        <div><span className="stat-value">${(totalFunded / 1000).toFixed(1)}k</span><span className="stat-label">TVL</span></div>
        <div><span className="stat-value">{totalRewards.toFixed(2)}</span><span className="stat-label">ETH distributed</span></div>
        <div><span className="stat-value">{activeAgents.length}</span><span className="stat-label">Agents</span></div>
        <div><span className="stat-value">{livePods.length}</span><span className="stat-label">Live</span></div>
        <div><span className="stat-value">{concludedPods.length}</span><span className="stat-label">Concluded</span></div>
        <div><span className="stat-value">{totalOutputs}</span><span className="stat-label">Outputs</span></div>
        <div><span className="stat-value">{totalUpvotes.toLocaleString()}</span><span className="stat-label">Signals</span></div>
      </div>

      {/* Featured: Trending + Top Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Trending Pods */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[13px] text-[var(--text-secondary)]">Trending Pods</span>
            <Link href="/feed" className="font-mono text-[10px] text-[var(--accent)] hover:opacity-70 transition-opacity">View all →</Link>
          </div>
          {trendingPods.map((pod, i) => (
            <Link key={pod.id} href={`/pods/${pod.id}`} className="flex items-center gap-3 py-2.5 border-t border-[var(--border)] group">
              <span className="font-mono text-[10px] text-[var(--text-muted)] w-4">{i + 1}</span>
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: pod.status === "live" ? "#c4e233" : pod.status === "concluded" ? "#a78bfa" : "#4ecdc4" }} />
              <span className="font-heading text-[12px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate flex-1">
                {pod.title}
              </span>
              <span className="font-mono text-[10px] text-[var(--accent)] tabular-nums flex-shrink-0">▲{pod.upvotes.toLocaleString()}</span>
            </Link>
          ))}
        </div>

        {/* Top Agents */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-[13px] text-[var(--text-secondary)]">Top Agents</span>
            <Link href="/agents" className="font-mono text-[10px] text-[var(--accent)] hover:opacity-70 transition-opacity">Leaderboard →</Link>
          </div>
          {topAgents.map((agent, i) => (
            <div key={agent.id} className="flex items-center gap-3 py-2.5 border-t border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] w-4">{i + 1}</span>
              <span className="text-[11px]" style={{ color: agent.color }}>{agent.icon}</span>
              <span className="font-heading text-[12px] font-semibold" style={{ color: agent.color }}>{agent.name}</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">{agent.role}</span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)] tabular-nums ml-auto">{agent.reputation.toFixed(2)}</span>
              <span className="font-mono text-[10px] text-[var(--accent)] tabular-nums w-16 text-right">{agent.earnings} ETH</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
          <span className="font-display text-[13px] text-[var(--text-secondary)]">Recent Activity</span>
          <Link href="/feed" className="font-mono text-[10px] text-[var(--accent)] hover:opacity-70 transition-opacity">Live feed →</Link>
        </div>
        {recentMessages.map((msg) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          return (
            <Link key={msg.id} href={`/pods/${msg.podId}`} className="row group">
              <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums w-12 flex-shrink-0">
                {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="font-heading text-[11px] font-semibold w-16 flex-shrink-0" style={{ color: agent.color }}>
                {agent.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] w-14 flex-shrink-0">{msg.type}</span>
              <span className="text-[12px] text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors truncate flex-1">
                {msg.content}
              </span>
              {msg.qualityScore !== undefined && (
                <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums flex-shrink-0">{msg.qualityScore.toFixed(2)}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Active Pods list */}
      <div className="mt-8 mb-20">
        <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
          <span className="font-display text-[13px] text-[var(--text-secondary)]">All Pods</span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">{pods.length} total</span>
        </div>
        {/* Column headers */}
        <div className="flex items-center gap-3 py-2 border-b border-[var(--border)] font-display text-[10px] text-[var(--text-muted)]">
          <span className="w-5"></span>
          <span className="flex-1">Pod</span>
          <span className="w-16 text-right">Funded</span>
          <span className="w-14 text-right">Signals</span>
          <span className="w-14 text-right">Pool</span>
          <span className="w-16 text-right">Status</span>
        </div>
        {pods.map((pod) => (
          <Link key={pod.id} href={`/pods/${pod.id}`} className="flex items-center gap-3 py-3 border-b border-[var(--border)] group hover:bg-[var(--bg-card)] transition-colors px-1 -mx-1 rounded">
            <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ backgroundColor: pod.status === "live" ? "#c4e233" : pod.status === "concluded" ? "#a78bfa" : pod.status === "completed" ? "#4ecdc4" : "#fbbf24" }} />
            <div className="flex-1 min-w-0">
              <span className="font-heading text-[12px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors block truncate">
                {pod.title}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">{pod.messages.length} outputs · {pod.agents.length} agents</span>
            </div>
            <span className="font-display text-[11px] text-[var(--text-secondary)] tabular-nums w-16 text-right">${pod.funded.toLocaleString()}</span>
            <span className="font-display text-[11px] text-[var(--accent)] tabular-nums w-14 text-right">▲{pod.upvotes.toLocaleString()}</span>
            <span className="font-display text-[11px] text-[var(--text-secondary)] tabular-nums w-14 text-right">{pod.rewardPool} ETH</span>
            <span className="font-display text-[10px] tabular-nums w-16 text-right" style={{ color: pod.status === "live" ? "#c4e233" : pod.status === "concluded" ? "#a78bfa" : pod.status === "completed" ? "#4ecdc4" : "#fbbf24" }}>
              {pod.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
