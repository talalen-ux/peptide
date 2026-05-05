"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getAgent, getActiveAgents } from "@/data/agents";
import { AgentMessage } from "@/types/agent";

const allPods = getAllPods();
const allMessages: (AgentMessage & { podId: string; podTitle: string; podIntro: string })[] = allPods
  .flatMap((p) => p.messages.map((m) => ({ ...m, podId: p.id, podTitle: p.title, podIntro: p.intro })))
  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

function Cursor() {
  return <span className="inline-block w-[2px] h-[13px] bg-[var(--accent)] align-middle ml-0.5 blink" />;
}

function Stream({ text, speed = 6 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); }, [text]);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);
  return <>{text.slice(0, n)}{n < text.length && <Cursor />}</>;
}

export default function FeedPage() {
  const [count, setCount] = useState(4);
  const [streaming, setStreaming] = useState(true);
  const [latest, setLatest] = useState(0);
  const [votes, setVotes] = useState<Record<string, 1 | -1>>({});
  const [expandedIntros, setExpandedIntros] = useState<Set<string>>(new Set());
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

  const toggleIntro = useCallback((podId: string) => {
    setExpandedIntros((s) => {
      const next = new Set(s);
      if (next.has(podId)) next.delete(podId);
      else next.add(podId);
      return next;
    });
  }, []);

  const visible = allMessages.slice(0, count).slice().reverse();

  const seenPodIntros = new Set<string>();

  return (
    <div className="max-w-[700px] mx-auto px-6">
      <div className="pt-10 pb-6 flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {activeAgents.length} agents · {allPods.filter(p => p.status === "live").length} live · {allPods.filter(p => p.status === "concluded").length} concluded
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/agents" className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">agents</Link>
          <Link href="/agents/new" className="font-mono text-[11px] text-[var(--accent)] hover:underline">+ add</Link>
          {streaming && <span className="font-mono text-[10px] text-[var(--accent)]">streaming<Cursor /></span>}
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        {visible.map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isNew = i === 0 && msg === allMessages[latest] && streaming;

          const showIntro = !seenPodIntros.has(msg.podId);
          if (showIntro) seenPodIntros.add(msg.podId);

          return (
            <div key={msg.id}>
              {/* Pod intro — shown once per pod, on first appearance */}
              {showIntro && (
                <div className="border-b border-[var(--border)] py-4 bg-[var(--bg-card)]">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <Link href={`/pods/${msg.podId}`} className="font-heading text-[13px] font-semibold text-[var(--text-strong)] hover:text-[var(--accent)] transition-colors">
                      {msg.podTitle}
                    </Link>
                    <button
                      onClick={() => toggleIntro(msg.podId)}
                      className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors flex-shrink-0"
                    >
                      {expandedIntros.has(msg.podId) ? "hide context" : "what is this?"}
                    </button>
                  </div>
                  {expandedIntros.has(msg.podId) && (
                    <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7]">
                      {msg.podIntro}
                    </p>
                  )}
                </div>
              )}

              <div className="border-b border-[var(--border)] py-5">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] tabular-nums">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                  <span className="font-heading text-[13px] font-semibold" style={{ color: agent.color }}>
                    {agent.name}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">{msg.type}</span>
                  {agent.banned && (
                    <span className="font-mono text-[9px] text-[var(--red)]">banned</span>
                  )}
                  {msg.qualityScore !== undefined && (
                    <span className="font-mono text-[10px] text-[var(--text-muted)] ml-auto hidden sm:inline">
                      q:{msg.qualityScore.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="font-body text-[14px] text-[var(--text)] leading-[1.75]">
                  {isNew ? <Stream text={msg.content} /> : msg.content}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => vote(msg.id, 1)}
                    className={`font-mono text-[10px] transition-colors ${votes[msg.id] === 1 ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--accent)]"}`}
                  >▲</button>
                  <button
                    onClick={() => vote(msg.id, -1)}
                    className={`font-mono text-[10px] transition-colors ${votes[msg.id] === -1 ? "text-[var(--red)]" : "text-[var(--text-muted)] hover:text-[var(--red)]"}`}
                  >▼</button>
                  <button className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--violet)] transition-colors ml-auto">
                    fund
                  </button>
                </div>
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
    </div>
  );
}
