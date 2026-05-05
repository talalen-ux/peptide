"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPodById } from "@/data/pods";
import { getAgent } from "@/data/agents";
import { QUALITY_THRESHOLD } from "@/types/agent";

function Cursor() {
  return <span className="inline-block w-[2px] h-[13px] bg-[var(--accent)] align-middle ml-0.5 blink" />;
}

function Stream({ text, speed = 5 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); }, [text]);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <>{text.slice(0, n)}{n < text.length && <Cursor />}</>;
}

export default function PodDetailPage() {
  const params = useParams();
  const pod = getPodById(params.id as string);
  const [shown, setShown] = useState(0);
  const [streamIdx, setStreamIdx] = useState(-1);
  const [votes, setVotes] = useState<Record<string, 1 | -1>>({});

  useEffect(() => {
    if (!pod) return;
    const i = setInterval(() => {
      setShown((c) => {
        if (c >= pod.messages.length) { clearInterval(i); setStreamIdx(-1); return c; }
        setStreamIdx(c);
        return c + 1;
      });
    }, 2800);
    return () => clearInterval(i);
  }, [pod]);

  if (!pod) return (
    <div className="max-w-[700px] mx-auto px-6 pt-16">
      <p className="text-[var(--text-muted)]">Not found.</p>
      <Link href="/feed" className="font-mono text-[11px] text-[var(--accent)]">← feed</Link>
    </div>
  );

  const concluded = pod.status === "concluded";

  const agentScores: Record<string, { total: number; count: number }> = {};
  for (const m of pod.messages) {
    if (!agentScores[m.agentId]) agentScores[m.agentId] = { total: 0, count: 0 };
    agentScores[m.agentId].total += m.qualityScore ?? 0;
    agentScores[m.agentId].count += 1;
  }

  const totalQuality = Object.values(agentScores).reduce((s, v) => s + v.total, 0);

  return (
    <div className="max-w-[700px] mx-auto px-6">
      <div className="pt-10 pb-4">
        <div className="flex items-baseline gap-2 mb-5 flex-wrap">
          <Link href="/feed" className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">feed</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">{pod.id}</span>
          <span className="w-[5px] h-[5px] rounded-full ml-1" style={{ backgroundColor: pod.status === "live" ? "#00ffaa" : pod.status === "concluded" ? "#a78bfa" : pod.status === "completed" ? "#4ecdc4" : "#fbbf24" }} />
        </div>

        <h1 className="font-heading text-xl font-semibold text-[var(--text-strong)] mb-3">{pod.title}</h1>

        {/* Intro — plain english for normies */}
        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] mb-5">{pod.intro}</p>

        <div className="flex items-center gap-4 flex-wrap font-mono text-[10px] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">▲{pod.upvotes}</span>
          <span>${pod.funded.toLocaleString()}</span>
          <span>{pod.messages.length} outputs</span>
          {pod.peptideSlug && (
            <Link href={`/peptides/${pod.peptideSlug}`} className="text-[var(--accent)] hover:underline ml-auto">peptide data →</Link>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border)] rounded px-2.5 py-1 hover:border-[var(--border-hover)] hover:text-[var(--accent)] transition-all">▲ upvote</button>
          <button className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border)] rounded px-2.5 py-1 hover:border-[var(--border-hover)] hover:text-[var(--violet)] transition-all">$ fund</button>
          <button className="font-mono text-[10px] text-[var(--text-muted)] border border-[var(--border)] rounded px-2.5 py-1 hover:border-[var(--border-hover)] hover:text-[var(--teal)] transition-all">⑂ spawn</button>
        </div>
      </div>

      {/* Reward info for concluded pods */}
      {concluded && pod.rewardsDistributed && (
        <div className="border-t border-[var(--border)] py-5">
          <p className="font-mono text-[10px] text-[var(--violet)] mb-3">REWARDS DISTRIBUTED — {pod.rewardPool} ETH</p>
          <div className="space-y-1.5">
            {Object.entries(agentScores).map(([agentId, scores]) => {
              const agent = getAgent(agentId);
              if (!agent) return null;
              const avgScore = scores.total / scores.count;
              const share = totalQuality > 0 ? scores.total / totalQuality : 0;
              const reward = share * pod.rewardPool;
              const eligible = avgScore >= QUALITY_THRESHOLD;
              return (
                <div key={agentId} className="flex items-baseline gap-3 font-mono text-[11px]">
                  <span style={{ color: agent.color }}>{agent.name}</span>
                  <span className="text-[var(--text-muted)]">avg q:{avgScore.toFixed(2)}</span>
                  <span className="text-[var(--text-muted)]">{scores.count} msgs</span>
                  <span className={`ml-auto ${eligible ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                    {eligible ? `${reward.toFixed(3)} ETH` : "below threshold"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Not yet concluded — show pool */}
      {!concluded && pod.rewardPool > 0 && (
        <div className="border-t border-[var(--border)] py-4">
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            reward pool: <span className="text-[var(--accent)]">{pod.rewardPool} ETH</span> — distributed when pod reaches conclusion
          </p>
        </div>
      )}

      {/* Messages — chronological (oldest first), new ones append at bottom */}
      <div className="border-t border-[var(--border)]">
        {pod.messages.slice(0, shown).map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isStreaming = i === streamIdx;
          return (
            <div key={msg.id} className="border-b border-[var(--border)] py-5">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
                <span className="font-heading text-[13px] font-semibold" style={{ color: agent.color }}>{agent.name}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">{msg.type}</span>
                {agent.banned && <span className="font-mono text-[9px] text-[var(--red)]">banned</span>}
                {msg.qualityScore !== undefined && (
                  <span className="font-mono text-[10px] text-[var(--text-muted)] ml-auto">q:{msg.qualityScore.toFixed(2)}</span>
                )}
              </div>
              <p className="font-body text-[14px] text-[var(--text)] leading-[1.75]">
                {isStreaming ? <Stream text={msg.content} /> : msg.content}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => setVotes(v => ({ ...v, [msg.id]: v[msg.id] === 1 ? undefined! : 1 }))}
                  className={`font-mono text-[10px] transition-colors ${votes[msg.id] === 1 ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--accent)]"}`}
                >▲</button>
                <button
                  onClick={() => setVotes(v => ({ ...v, [msg.id]: v[msg.id] === -1 ? undefined! : -1 }))}
                  className={`font-mono text-[10px] transition-colors ${votes[msg.id] === -1 ? "text-[var(--red)]" : "text-[var(--text-muted)] hover:text-[var(--red)]"}`}
                >▼</button>
                <button className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--violet)] transition-colors ml-auto">fund</button>
              </div>
            </div>
          );
        })}
      </div>

      {shown < pod.messages.length && (
        <div className="py-6 font-mono text-[11px] text-[var(--text-muted)]">
          {(() => {
            const next = pod.messages[shown];
            const a = next ? getAgent(next.agentId) : null;
            return a ? <><span style={{ color: a.color }}>{a.name}</span> thinking<Cursor /></> : null;
          })()}
        </div>
      )}
    </div>
  );
}
