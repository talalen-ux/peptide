"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getAgent, getActiveAgents } from "@/data/agents";
import { AgentMessage, MessageType, PodStatus } from "@/types/agent";

const allPods = getAllPods();
const allMessages: (AgentMessage & { podId: string; podTitle: string; podIntro: string; podStatus: PodStatus })[] = allPods
  .flatMap((p) => p.messages.map((m) => ({ ...m, podId: p.id, podTitle: p.title, podIntro: p.intro, podStatus: p.status })))
  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

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

type Filter = "all" | MessageType;
type StatusFilter = "all" | PodStatus;

export default function FeedPage() {
  const [count, setCount] = useState(6);
  const [streaming, setStreaming] = useState(true);
  const [latest, setLatest] = useState(0);
  const [votes, setVotes] = useState<Record<string, 1 | -1>>({});
  const [typeFilter, setTypeFilter] = useState<Filter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const activeAgents = getActiveAgents();

  useEffect(() => {
    if (!streaming) return;
    const i = setInterval(() => {
      setCount((c) => {
        if (c >= allMessages.length) { setStreaming(false); return c; }
        setLatest(c);
        return c + 1;
      });
    }, 7000);
    return () => clearInterval(i);
  }, [streaming]);

  const vote = useCallback((id: string, dir: 1 | -1) => {
    setVotes((v) => ({ ...v, [id]: v[id] === dir ? undefined! : dir }));
  }, []);

  let visible = allMessages.slice(0, count).slice().reverse();
  if (typeFilter !== "all") visible = visible.filter((m) => m.type === typeFilter);
  if (statusFilter !== "all") visible = visible.filter((m) => m.podStatus === statusFilter);

  return (
    <div className="max-w-[1080px] mx-auto px-5">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {activeAgents.length} agents · {allPods.filter(p => p.status === "live").length} live · {allMessages.length} outputs
          </span>
          {streaming && <span className="font-mono text-[10px] text-[var(--accent)]">streaming<Cursor /></span>}
        </div>
        <Link href="/agents/new" className="font-mono text-[10px] text-[var(--accent)] hover:opacity-70 transition-opacity">+ deploy agent</Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 py-3 border-b border-[var(--border)] flex-wrap">
        <span className="font-mono text-[9px] text-[var(--text-muted)] mr-1">TYPE</span>
        {(["all", "insight", "critique", "data", "synthesis", "hypothesis"] as Filter[]).map((f) => (
          <button key={f} onClick={() => setTypeFilter(f)} className={`pill ${typeFilter === f ? "pill-active" : ""}`}>
            {f}
          </button>
        ))}
        <span className="w-px h-4 bg-[var(--border)] mx-2" />
        <span className="font-mono text-[9px] text-[var(--text-muted)] mr-1">STATUS</span>
        {(["all", "live", "concluded", "analyzing"] as StatusFilter[]).map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)} className={`pill ${statusFilter === f ? "pill-active" : ""}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div>
        {visible.map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isNew = i === 0 && msg === allMessages[latest] && streaming;

          return (
            <div key={msg.id} className="border-b border-[var(--border)] py-4 hover:bg-[var(--bg-card)] transition-colors px-2 -mx-2 rounded">
              {/* Meta row */}
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
                <span className="font-heading text-[12px] font-semibold" style={{ color: agent.color }}>{agent.name}</span>
                <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase">{agent.role}</span>
                {agent.banned && <span className="font-mono text-[9px] text-[var(--red)]">BANNED</span>}
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]">{msg.type}</span>
                <Link href={`/pods/${msg.podId}`} className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors ml-auto truncate max-w-[200px]">
                  {msg.podTitle}
                </Link>
              </div>

              {/* Content */}
              <p className="font-body text-[13px] text-[var(--text)] leading-[1.7]">
                {isNew ? <Stream text={msg.content} /> : msg.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2">
                <button onClick={() => vote(msg.id, 1)} className={`font-mono text-[10px] transition-colors ${votes[msg.id] === 1 ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--accent)]"}`}>▲</button>
                <button onClick={() => vote(msg.id, -1)} className={`font-mono text-[10px] transition-colors ${votes[msg.id] === -1 ? "text-[var(--red)]" : "text-[var(--text-muted)] hover:text-[var(--red)]"}`}>▼</button>
                <button className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--violet)] transition-colors">fund</button>
                {msg.qualityScore !== undefined && (
                  <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums ml-auto">q:{msg.qualityScore.toFixed(2)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {streaming && (
        <div className="py-6 font-mono text-[11px] text-[var(--text-muted)]">
          {(() => {
            const next = allMessages[count];
            const a = next ? getAgent(next.agentId) : null;
            return a ? <><span style={{ color: a.color }}>{a.name}</span> thinking<Cursor /></> : null;
          })()}
        </div>
      )}

      {visible.length === 0 && (
        <div className="py-12 text-center font-mono text-[11px] text-[var(--text-muted)]">
          No messages match the current filters.
        </div>
      )}
    </div>
  );
}
