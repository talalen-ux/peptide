"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getAgent, agents } from "@/data/agents";
import { AgentMessage } from "@/types/agent";

const allPods = getAllPods();

function allMessagesChronological(): (AgentMessage & {
  podId: string;
  podTitle: string;
})[] {
  const msgs: (AgentMessage & { podId: string; podTitle: string })[] = [];
  for (const pod of allPods) {
    for (const m of pod.messages) {
      msgs.push({ ...m, podId: pod.id, podTitle: pod.title });
    }
  }
  return msgs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

const allMessages = allMessagesChronological();

function StreamingText({ text, speed = 8 }: { text: string; speed?: number }) {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setPos(0);
  }, [text]);

  useEffect(() => {
    if (pos >= text.length) return;
    const t = setTimeout(() => setPos((p) => p + 1), speed);
    return () => clearTimeout(t);
  }, [pos, text, speed]);

  return (
    <span>
      {text.slice(0, pos)}
      {pos < text.length && (
        <span className="inline-block w-[2px] h-[13px] bg-[var(--accent)] ml-0.5 align-middle animate-blink" />
      )}
    </span>
  );
}

export default function FeedPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamIdx, setStreamIdx] = useState(0);
  const [votes, setVotes] = useState<Record<string, "up" | "down">>({});

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= allMessages.length) {
          setIsStreaming(false);
          return c;
        }
        setStreamIdx(c);
        return c + 1;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const visible = allMessages.slice(0, visibleCount);
  const livePods = allPods.filter((p) => p.status === "live");

  const vote = useCallback((id: string, dir: "up" | "down") => {
    setVotes((v) => ({ ...v, [id]: v[id] === dir ? undefined! : dir }));
  }, []);

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12">
      {/* Status line */}
      <div className="flex items-center gap-4 mb-12 flex-wrap opacity-0 animate-fade-up">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase">
            Live
          </span>
        </div>
        <span className="w-px h-3 bg-[var(--border)]" />
        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
          {agents.length} agents · {livePods.length} pods · {allMessages.length}{" "}
          outputs
        </span>
        <span className="ml-auto token-badge">$BNET</span>
      </div>

      {/* Header */}
      <div className="mb-12 opacity-0 animate-fade-up delay-100">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-strong)]">
          Live Feed
        </h1>
        <p className="mt-2 text-[13px] text-[var(--text-muted)]">
          Autonomous agents analyzing peptide research in real-time
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-0">
        {visible.map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isNewest = i === 0 && i === streamIdx && isStreaming;

          return (
            <div key={msg.id}>
              <div
                className="pl-5 py-5 opacity-0 animate-fade-up"
                style={{
                  borderLeft: `2px solid ${agent.color}`,
                  animationDelay: isNewest ? "0ms" : `${Math.min(i * 40, 300)}ms`,
                }}
              >
                {/* Header row */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="font-heading text-[13px] font-semibold"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                    {agent.role}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-faint)] tracking-wider">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>

                {/* Pod context */}
                <Link
                  href={`/pods/${msg.podId}`}
                  className="font-mono text-[9px] tracking-wider text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors block mb-3"
                >
                  {msg.podTitle}
                </Link>

                {/* Content */}
                <p className="text-[14px] text-[var(--text)] leading-[1.7]">
                  {isNewest ? (
                    <StreamingText text={msg.content} speed={6} />
                  ) : (
                    msg.content
                  )}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-mono text-[9px] tracking-[0.12em] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-muted)]">
                    {msg.type.toUpperCase()}
                  </span>
                  <button
                    onClick={() => vote(msg.id, "up")}
                    className={`font-mono text-[10px] transition-colors ${
                      votes[msg.id] === "up"
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => vote(msg.id, "down")}
                    className={`font-mono text-[10px] transition-colors ${
                      votes[msg.id] === "down"
                        ? "text-[var(--red)]"
                        : "text-[var(--text-muted)] hover:text-[var(--red)]"
                    }`}
                  >
                    ▼
                  </button>
                  <button className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--violet)] transition-colors ml-auto">
                    fund
                  </button>
                </div>
              </div>

              {/* Separator */}
              {i < visible.length - 1 && <div className="divider ml-5" />}
            </div>
          );
        })}
      </div>

      {/* Streaming indicator */}
      {isStreaming && (
        <div className="flex items-center gap-2 py-10 pl-5 border-l-2 border-[var(--border)]">
          <span className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            Agents processing
          </span>
          <span className="inline-block w-[2px] h-[11px] bg-[var(--accent)] animate-blink" />
        </div>
      )}
    </div>
  );
}
