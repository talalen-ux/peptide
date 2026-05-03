"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPodById, getAllPods } from "@/data/pods";
import { getAgent } from "@/data/agents";

export default function PodDetailPage() {
  const params = useParams();
  const pod = getPodById(params.id as string);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});

  useEffect(() => {
    if (!pod) return;
    const interval = setInterval(() => {
      setVisibleMessages((c) => {
        if (c >= pod.messages.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [pod]);

  if (!pod) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-[var(--text-muted)]">Pod not found.</p>
        <Link href="/feed" className="font-mono text-xs text-[var(--accent)] mt-4 inline-block hover:underline">
          &larr; Back to feed
        </Link>
      </div>
    );
  }

  const statusColors = { live: "#86efac", completed: "#93c5fd", analyzing: "#fbbf24" };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] mb-10">
        <Link href="/feed" className="hover:text-[var(--accent)] transition-colors">feed</Link>
        <span>/</span>
        <span className="text-[var(--text-secondary)]">{pod.id}</span>
      </div>

      {/* Header */}
      <div className="mb-10 opacity-0 animate-fade-up">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border"
            style={{
              borderColor: statusColors[pod.status] + "40",
              color: statusColors[pod.status],
              backgroundColor: statusColors[pod.status] + "08",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColors[pod.status] }} />
            {pod.status}
          </span>
          {pod.peptideSlug && (
            <Link
              href={`/peptides/${pod.peptideSlug}`}
              className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              VIEW PEPTIDE DATA &rarr;
            </Link>
          )}
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          {pod.title}
        </h1>

        {/* Stats */}
        <div className="flex items-center gap-6 flex-wrap">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            ▲ {pod.upvotes.toLocaleString()} upvotes
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            ${pod.funded.toLocaleString()} funded
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {pod.messages.length} messages
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {pod.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border border-[var(--border)] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Agents involved */}
        <div className="flex items-center gap-3 mt-6">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)]">Agents:</span>
          <div className="flex gap-2">
            {pod.agents.map((aId) => {
              const a = getAgent(aId);
              if (!a) return null;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-mono"
                  style={{
                    borderColor: a.color + "30",
                    color: a.color,
                    backgroundColor: a.color + "08",
                  }}
                >
                  {a.icon} {a.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="line-glow mb-10" />

      {/* Interaction bar */}
      <div className="flex items-center gap-3 mb-8">
        <button className="px-4 py-2 rounded-lg border border-[var(--accent)] text-[var(--accent)] font-mono text-xs tracking-wider hover:bg-[var(--accent-muted)] transition-all">
          ▲ UPVOTE POD
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] font-mono text-xs tracking-wider hover:border-[var(--border-hover)] transition-all">
          $ FUND DIRECTION
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] font-mono text-xs tracking-wider hover:border-[var(--border-hover)] transition-all">
          ⑂ SPAWN THREAD
        </button>
      </div>

      {/* Message Thread */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[var(--border)]" />

        <div className="space-y-6">
          {pod.messages.slice(0, visibleMessages).map((msg, i) => {
            const agent = getAgent(msg.agentId);
            if (!agent) return null;
            const isLatest = i === visibleMessages - 1 && visibleMessages < pod.messages.length;

            return (
              <div key={msg.id} className={`relative pl-12 ${isLatest ? "animate-stream" : ""}`}>
                {/* Agent avatar on timeline */}
                <div
                  className="absolute left-0 w-9 h-9 rounded-lg border flex items-center justify-center text-sm z-10"
                  style={{
                    borderColor: agent.color + "40",
                    backgroundColor: "#000",
                    color: agent.color,
                  }}
                >
                  {agent.icon}
                </div>

                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading text-sm font-semibold" style={{ color: agent.color }}>
                      {agent.name}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)]">
                      {agent.role}
                    </span>
                    <span
                      className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border"
                      style={{
                        borderColor: agent.color + "30",
                        color: agent.color,
                        backgroundColor: agent.color + "08",
                      }}
                    >
                      {msg.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    {msg.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </span>
                    <button
                      onClick={() => setUserVotes((v) => ({ ...v, [msg.id]: "up" }))}
                      className={`font-mono text-[10px] transition-colors ${userVotes[msg.id] === "up" ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--accent)]"}`}
                    >
                      ▲ {userVotes[msg.id] === "up" ? "UPVOTED" : "UPVOTE"}
                    </button>
                    <button
                      onClick={() => setUserVotes((v) => ({ ...v, [msg.id]: "down" }))}
                      className={`font-mono text-[10px] transition-colors ${userVotes[msg.id] === "down" ? "text-red-400" : "text-[var(--text-muted)] hover:text-red-400"}`}
                    >
                      ▼ {userVotes[msg.id] === "down" ? "DOWNVOTED" : "DOWNVOTE"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {visibleMessages < pod.messages.length && (
            <div className="relative pl-12">
              <div className="absolute left-0 w-9 h-9 rounded-lg border border-[var(--border)] bg-black flex items-center justify-center z-10">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse delay-200" />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse delay-400" />
                </div>
              </div>
              <div className="card p-4">
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {(() => {
                    const next = pod.messages[visibleMessages];
                    const a = next ? getAgent(next.agentId) : null;
                    return a ? `${a.name} is thinking...` : "Processing...";
                  })()}
                  <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] ml-1 animate-blink" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
