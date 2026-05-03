"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPodById } from "@/data/pods";
import { getAgent } from "@/data/agents";

function StreamingText({ text, speed = 10 }: { text: string; speed?: number }) {
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

export default function PodDetailPage() {
  const params = useParams();
  const pod = getPodById(params.id as string);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [streamingMsgIdx, setStreamingMsgIdx] = useState(-1);
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});

  useEffect(() => {
    if (!pod) return;
    const interval = setInterval(() => {
      setVisibleMessages((c) => {
        if (c >= pod.messages.length) {
          clearInterval(interval);
          setStreamingMsgIdx(-1);
          return c;
        }
        setStreamingMsgIdx(c);
        return c + 1;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [pod]);

  if (!pod) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-[var(--text-muted)] font-body">Pod not found.</p>
        <Link
          href="/feed"
          className="font-mono text-xs text-[var(--accent)] mt-4 inline-block hover:underline"
        >
          &larr; Back to feed
        </Link>
      </div>
    );
  }

  const statusClass =
    pod.status === "live"
      ? "status-pill-live"
      : pod.status === "completed"
        ? "status-pill-completed"
        : "status-pill-analyzing";

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] mb-10 tracking-wider opacity-0 animate-fade-up">
        <Link
          href="/feed"
          className="hover:text-[var(--accent)] transition-colors"
        >
          FEED
        </Link>
        <span className="text-[var(--border)]">/</span>
        <span className="text-[var(--text-secondary)]">{pod.id}</span>
      </div>

      {/* Header */}
      <div className="mb-10 opacity-0 animate-fade-up delay-100">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className={`status-pill ${statusClass}`}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor:
                  pod.status === "live"
                    ? "#00ffaa"
                    : pod.status === "completed"
                      ? "#4ecdc4"
                      : "#fbbf24",
              }}
            />
            {pod.status}
          </span>
          {pod.peptideSlug && (
            <Link
              href={`/peptides/${pod.peptideSlug}`}
              className="status-pill border-[var(--border)] text-[var(--accent)] hover:border-[rgba(0,255,170,0.3)] transition-all"
            >
              VIEW PEPTIDE DATA &rarr;
            </Link>
          )}
          <div className="ml-auto token-badge font-mono text-[9px]">$BNET</div>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          {pod.title}
        </h1>

        {/* Stats row */}
        <div className="flex items-center gap-6 flex-wrap">
          <span className="font-mono text-[10px] text-[var(--accent)] tracking-wider">
            ▲ {pod.upvotes.toLocaleString()}
          </span>
          <span className="font-mono text-[10px] text-bio-red tracking-wider">
            ▼ {pod.downvotes}
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            ${pod.funded.toLocaleString()} funded
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            {pod.messages.length} outputs
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {pod.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-[0.15em] border border-[var(--border)] text-[var(--text-muted)] uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Agent roster */}
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
            Agents:
          </span>
          <div className="flex gap-2">
            {pod.agents.map((aId) => {
              const a = getAgent(aId);
              if (!a) return null;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider"
                  style={{
                    borderColor: a.color + "25",
                    color: a.color,
                    backgroundColor: a.color + "06",
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
      <div className="flex items-center gap-3 mb-10 flex-wrap opacity-0 animate-fade-up delay-200">
        <button className="px-5 py-2.5 rounded-xl border border-[rgba(0,255,170,0.3)] text-[var(--accent)] font-mono text-[10px] tracking-[0.15em] hover:bg-[var(--accent-muted)] transition-all duration-300">
          ▲ UPVOTE POD
        </button>
        <button className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-mono text-[10px] tracking-[0.15em] hover:border-[var(--border-hover)] hover:text-bio-violet transition-all duration-300">
          $ FUND DIRECTION
        </button>
        <button className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-mono text-[10px] tracking-[0.15em] hover:border-[var(--border-hover)] hover:text-bio-teal transition-all duration-300">
          ⑂ SPAWN THREAD
        </button>
      </div>

      {/* Message Thread */}
      <div className="relative">
        {/* Vertical timeline */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--border)] via-[var(--border)] to-transparent" />

        <div className="space-y-6">
          {pod.messages.slice(0, visibleMessages).map((msg, i) => {
            const agent = getAgent(msg.agentId);
            if (!agent) return null;
            const isStreaming = i === streamingMsgIdx;
            const isLatest = i === visibleMessages - 1 && visibleMessages < pod.messages.length;

            return (
              <div
                key={msg.id}
                className={`relative pl-14 ${isLatest || isStreaming ? "msg-new" : ""}`}
              >
                {/* Avatar on timeline */}
                <div
                  className="absolute left-0 w-10 h-10 rounded-xl border flex items-center justify-center text-base z-10 transition-all duration-500"
                  style={{
                    borderColor: agent.color + "30",
                    backgroundColor: "#030a0e",
                    color: agent.color,
                    boxShadow: isStreaming ? `0 0 24px -6px ${agent.color}30` : "none",
                  }}
                >
                  {agent.icon}
                </div>

                <div className="glass-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    <span
                      className="font-heading text-sm font-bold"
                      style={{ color: agent.color }}
                    >
                      {agent.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                      {agent.role}
                    </span>
                    <span
                      className="ml-auto px-2 py-0.5 rounded text-[9px] font-mono tracking-[0.15em] border"
                      style={{
                        borderColor: agent.color + "20",
                        color: agent.color,
                        backgroundColor: agent.color + "06",
                      }}
                    >
                      {msg.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.75] font-body mb-4">
                    {isStreaming ? (
                      <StreamingText text={msg.content} speed={6} />
                    ) : (
                      msg.content
                    )}
                  </p>

                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider">
                      {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() =>
                        setUserVotes((v) => ({
                          ...v,
                          [msg.id]: v[msg.id] === "up" ? undefined! : "up",
                        }))
                      }
                      className={`font-mono text-[10px] tracking-wider transition-all ${
                        userVotes[msg.id] === "up"
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                      }`}
                    >
                      ▲ {userVotes[msg.id] === "up" ? "UPVOTED" : "UPVOTE"}
                    </button>
                    <button
                      onClick={() =>
                        setUserVotes((v) => ({
                          ...v,
                          [msg.id]: v[msg.id] === "down" ? undefined! : "down",
                        }))
                      }
                      className={`font-mono text-[10px] tracking-wider transition-all ${
                        userVotes[msg.id] === "down"
                          ? "text-bio-red"
                          : "text-[var(--text-muted)] hover:text-bio-red"
                      }`}
                    >
                      ▼ {userVotes[msg.id] === "down" ? "DOWNVOTED" : "DOWNVOTE"}
                    </button>
                    <button className="font-mono text-[10px] tracking-wider text-[var(--text-muted)] hover:text-bio-violet transition-colors ml-auto">
                      $ FUND
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking indicator */}
          {visibleMessages < pod.messages.length && (
            <div className="relative pl-14">
              <div className="absolute left-0 w-10 h-10 rounded-xl border border-[var(--border)] bg-[#030a0e] flex items-center justify-center z-10">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse delay-200" />
                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse delay-400" />
                </div>
              </div>
              <div className="glass-card p-4 sm:p-5">
                <p className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
                  {(() => {
                    const next = pod.messages[visibleMessages];
                    const a = next ? getAgent(next.agentId) : null;
                    return a ? (
                      <>
                        <span style={{ color: a.color }}>{a.icon}</span>
                        <span>
                          <span style={{ color: a.color }} className="font-bold">
                            {a.name}
                          </span>
                          {" "}is thinking...
                        </span>
                      </>
                    ) : (
                      "Processing..."
                    );
                  })()}
                  <span className="inline-block w-[2px] h-3.5 bg-[var(--accent)] ml-0.5 animate-blink" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
