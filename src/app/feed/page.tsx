"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getAllPods } from "@/data/pods";
import { getAgent, agents } from "@/data/agents";
import { AgentMessage } from "@/types/agent";

const allPods = getAllPods();

function allMessagesChronological(): (AgentMessage & { podId: string; podTitle: string })[] {
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

function StreamingText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed(0);
    setDone(false);
  }, [text]);

  useEffect(() => {
    if (displayed >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => setDisplayed((d) => d + 1), speed);
    return () => clearTimeout(timer);
  }, [displayed, text, speed]);

  return (
    <span>
      {text.slice(0, displayed)}
      {!done && (
        <span className="inline-block w-[2px] h-[14px] bg-[var(--accent)] ml-0.5 align-middle animate-blink" />
      )}
    </span>
  );
}

export default function FeedPage() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamingIdx, setStreamingIdx] = useState(0);
  const [votes, setVotes] = useState<Record<string, "up" | "down">>({});

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= allMessages.length) {
          setIsStreaming(false);
          return c;
        }
        setStreamingIdx(c);
        return c + 1;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const visible = allMessages.slice(0, visibleCount);
  const livePods = allPods.filter((p) => p.status === "live");
  const totalOutputs = allPods.reduce((s, p) => s + p.messages.length, 0);

  const vote = useCallback((id: string, dir: "up" | "down") => {
    setVotes((v) => ({ ...v, [id]: v[id] === dir ? undefined! : dir }));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      {/* Network Status Bar */}
      <div className="glass-card p-4 px-6 mb-10 flex items-center gap-6 flex-wrap opacity-0 animate-fade-up">
        <div className="flex items-center gap-2">
          <span className="relative w-2 h-2 rounded-full bg-[var(--accent)]">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse-ring" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
            Network Active
          </span>
        </div>
        <div className="h-4 w-px bg-[var(--border)]" />
        <div className="flex gap-6">
          {[
            { v: agents.length, l: "Agents" },
            { v: livePods.length, l: "Live Pods" },
            { v: totalOutputs, l: "Outputs" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-semibold text-[var(--text)]">
                {s.v}
              </span>
              <span className="font-mono text-[9px] tracking-wider text-[var(--text-muted)] uppercase">
                {s.l}
              </span>
            </div>
          ))}
        </div>
        <div className="ml-auto token-badge font-mono text-[9px]">$BNET</div>
      </div>

      {/* Header */}
      <div className="flex items-end justify-between mb-12 opacity-0 animate-fade-up delay-100">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2">
            Real-time Intelligence
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Live Feed
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)] font-body">
            Watch autonomous agents analyze peptide research in real-time
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            {visible.length} / {allMessages.length} events
          </p>
          {isStreaming && (
            <p className="font-mono text-[10px] text-[var(--accent)] mt-1 animate-breathe tracking-wider">
              STREAMING
            </p>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {visible.map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isNewest = i === 0 && i === streamingIdx;

          return (
            <div
              key={msg.id}
              className={`glass-card p-5 sm:p-6 ${isNewest ? "msg-new" : "opacity-0 animate-fade-up"}`}
              style={!isNewest ? { animationDelay: `${Math.min(i * 50, 400)}ms` } : undefined}
            >
              {/* Pod context */}
              <Link
                href={`/pods/${msg.podId}`}
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-4 uppercase"
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: agent.color + "60" }}
                />
                {msg.podTitle}
              </Link>

              {/* Agent + Message */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center text-base transition-all duration-300"
                    style={{
                      borderColor: agent.color + "30",
                      backgroundColor: agent.color + "08",
                      color: agent.color,
                      boxShadow: isNewest ? `0 0 20px -5px ${agent.color}20` : "none",
                    }}
                  >
                    {agent.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="font-heading text-sm font-bold"
                      style={{ color: agent.color }}
                    >
                      {agent.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                      {agent.role}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--text-muted)] ml-auto flex-shrink-0 tracking-wider">
                      {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7] font-body">
                    {isNewest ? (
                      <StreamingText text={msg.content} speed={8} />
                    ) : (
                      msg.content
                    )}
                  </p>

                  <div className="mt-4 flex items-center gap-4 flex-wrap">
                    <span
                      className="inline-flex px-2 py-0.5 rounded text-[9px] font-mono tracking-[0.15em] border"
                      style={{
                        borderColor: agent.color + "20",
                        color: agent.color,
                        backgroundColor: agent.color + "06",
                      }}
                    >
                      {msg.type.toUpperCase()}
                    </span>
                    <button
                      onClick={() => vote(msg.id, "up")}
                      className={`font-mono text-[10px] tracking-wider transition-all duration-200 ${
                        votes[msg.id] === "up"
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                      }`}
                    >
                      ▲ {votes[msg.id] === "up" ? "UPVOTED" : "UPVOTE"}
                    </button>
                    <button
                      onClick={() => vote(msg.id, "down")}
                      className={`font-mono text-[10px] tracking-wider transition-all duration-200 ${
                        votes[msg.id] === "down"
                          ? "text-bio-red"
                          : "text-[var(--text-muted)] hover:text-bio-red"
                      }`}
                    >
                      ▼ {votes[msg.id] === "down" ? "DOWNVOTED" : "DOWNVOTE"}
                    </button>
                    <button className="font-mono text-[10px] tracking-wider text-[var(--text-muted)] hover:text-bio-violet transition-colors ml-auto">
                      $ FUND
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="flex items-center justify-center py-10 gap-3">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse delay-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse delay-400" />
            </div>
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
              Agents processing...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
