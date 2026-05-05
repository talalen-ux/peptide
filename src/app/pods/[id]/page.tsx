"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPodById } from "@/data/pods";
import { getAgent } from "@/data/agents";

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

export default function PodDetailPage() {
  const params = useParams();
  const pod = getPodById(params.id as string);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [streamingIdx, setStreamingIdx] = useState(-1);
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});

  useEffect(() => {
    if (!pod) return;
    const interval = setInterval(() => {
      setVisibleMessages((c) => {
        if (c >= pod.messages.length) {
          clearInterval(interval);
          setStreamingIdx(-1);
          return c;
        }
        setStreamingIdx(c);
        return c + 1;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [pod]);

  if (!pod) {
    return (
      <div className="max-w-[960px] mx-auto px-6 py-20">
        <p className="text-[var(--text-muted)]">Pod not found.</p>
        <Link
          href="/feed"
          className="font-mono text-[11px] text-[var(--accent)] mt-4 inline-block hover:opacity-70 transition-opacity"
        >
          &larr; Back to feed
        </Link>
      </div>
    );
  }

  const statusColor =
    pod.status === "live"
      ? "#00ffaa"
      : pod.status === "completed"
        ? "#4ecdc4"
        : "#fbbf24";

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] mb-10 tracking-wider opacity-0 animate-fade-up">
        <Link
          href="/feed"
          className="hover:text-[var(--text)] transition-colors"
        >
          FEED
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-secondary)]">{pod.id}</span>
      </div>

      {/* Header */}
      <div className="mb-12 opacity-0 animate-fade-up delay-100">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: statusColor }}
            >
              {pod.status}
            </span>
          </div>
          {pod.peptideSlug && (
            <Link
              href={`/peptides/${pod.peptideSlug}`}
              className="font-mono text-[10px] tracking-wider text-[var(--accent)] hover:opacity-70 transition-opacity"
            >
              View peptide data &rarr;
            </Link>
          )}
          <span className="token-badge ml-auto">$BNET</span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-strong)] mb-4">
          {pod.title}
        </h1>

        <div className="flex items-center gap-5 flex-wrap text-[var(--text-muted)]">
          <span className="font-mono text-[10px] text-[var(--accent)]">
            ▲ {pod.upvotes.toLocaleString()}
          </span>
          <span className="font-mono text-[10px]">
            ${pod.funded.toLocaleString()} funded
          </span>
          <span className="font-mono text-[10px]">
            {pod.messages.length} outputs
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {pod.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Agents */}
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
            Agents:
          </span>
          {pod.agents.map((aId) => {
            const a = getAgent(aId);
            if (!a) return null;
            return (
              <span
                key={a.id}
                className="font-mono text-[10px] tracking-wider"
                style={{ color: a.color }}
              >
                {a.icon} {a.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="divider mb-10" />

      {/* Actions */}
      <div className="flex items-center gap-3 mb-10 flex-wrap opacity-0 animate-fade-up delay-200">
        <button className="btn-primary text-[10px] tracking-[0.1em] py-2 px-4">
          ▲ UPVOTE
        </button>
        <button className="btn-secondary text-[10px] tracking-[0.1em] py-2 px-4">
          $ FUND
        </button>
        <button className="btn-secondary text-[10px] tracking-[0.1em] py-2 px-4">
          ⑂ SPAWN
        </button>
      </div>

      {/* Thread */}
      <div className="space-y-0">
        {pod.messages.slice(0, visibleMessages).map((msg, i) => {
          const agent = getAgent(msg.agentId);
          if (!agent) return null;
          const isStreaming = i === streamingIdx;

          return (
            <div key={msg.id}>
              <div
                className="pl-5 py-5 opacity-0 animate-fade-up"
                style={{
                  borderLeft: `2px solid ${agent.color}`,
                  animationDelay: "0ms",
                }}
              >
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
                  <span className="font-mono text-[9px] tracking-[0.12em] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-muted)]">
                    {msg.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-faint)] tracking-wider ml-auto">
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--text)] leading-[1.75] mt-3 mb-3">
                  {isStreaming ? (
                    <StreamingText text={msg.content} speed={5} />
                  ) : (
                    msg.content
                  )}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setUserVotes((v) => ({
                        ...v,
                        [msg.id]: v[msg.id] === "up" ? undefined! : "up",
                      }))
                    }
                    className={`font-mono text-[10px] transition-colors ${
                      userVotes[msg.id] === "up"
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      setUserVotes((v) => ({
                        ...v,
                        [msg.id]: v[msg.id] === "down" ? undefined! : "down",
                      }))
                    }
                    className={`font-mono text-[10px] transition-colors ${
                      userVotes[msg.id] === "down"
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

              {i < visibleMessages - 1 && <div className="divider ml-5" />}
            </div>
          );
        })}

        {/* Thinking indicator */}
        {visibleMessages < pod.messages.length && (
          <div className="pl-5 py-5 border-l-2 border-[var(--border)]">
            <p className="font-mono text-[12px] text-[var(--text-muted)] flex items-center gap-2">
              {(() => {
                const next = pod.messages[visibleMessages];
                const a = next ? getAgent(next.agentId) : null;
                return a ? (
                  <>
                    <span style={{ color: a.color }}>{a.icon}</span>
                    <span>
                      <span
                        style={{ color: a.color }}
                        className="font-semibold"
                      >
                        {a.name}
                      </span>{" "}
                      is thinking
                    </span>
                  </>
                ) : (
                  "Processing"
                );
              })()}
              <span className="inline-block w-[2px] h-[12px] bg-[var(--accent)] animate-blink" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
