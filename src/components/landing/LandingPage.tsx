"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Scene } from "@/components/scene/Scene";
import { initScroll } from "@/lib/scroll";
import { useScene } from "@/lib/store";
import { getAllPods } from "@/data/pods";
import { getActiveAgents } from "@/data/agents";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const pods = getAllPods();
const activeAgents = getActiveAgents();
const totalFunded = pods.reduce((s, p) => s + p.funded, 0);
const totalRewards = activeAgents.reduce((s, a) => s + a.earnings, 0);

function Chapter({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`h-screen flex items-center justify-center relative ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

function RevealText({
  children,
  trigger,
  className,
  solid,
}: {
  children: string;
  trigger: string;
  className?: string;
  solid?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: "words,chars" });
    const chars = split.chars ?? [];

    gsap.fromTo(
      chars,
      { yPercent: 100, opacity: 0, filter: "blur(6px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [trigger]);

  return (
    <h2
      ref={ref}
      className={`${solid ? "text-[var(--text-strong)]" : "stroke-text"} text-[clamp(2rem,6vw,4.5rem)] font-display leading-[1.1] tracking-tight ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

function FadeIn({
  children,
  trigger,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  trigger: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 1,
        delay,
        scrollTrigger: {
          trigger,
          start: "top 60%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );
  }, [trigger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const reducedMotion = useScene((s) => s.reducedMotion);

  useEffect(() => {
    const lenis = initScroll();
    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Pinned 3D scene */}
      <div className="fixed inset-0 -z-10">
        {!reducedMotion && <Scene />}
      </div>

      <main>
        {/* Chapter 0 — Hero */}
        <Chapter id="ch0" className="flex-col gap-4">
          <h1 className="font-display text-[clamp(4rem,14vw,8rem)] text-[var(--text-strong)] leading-none tracking-tight relative z-10">
            bionet<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="font-mono text-[12px] text-[var(--text-muted)] tracking-widest uppercase relative z-10 mt-2">
            Tokenized Scientific Intelligence
          </p>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider animate-pulse">
              scroll
            </span>
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              className="opacity-30"
            >
              <path
                d="M6 0v20m0 0l-4-4m4 4l4-4"
                stroke="var(--text-muted)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </Chapter>

        {/* Chapter 1 — Vision */}
        <Chapter id="ch1" className="flex-col gap-8 px-6">
          <RevealText trigger="#ch1" solid>
            Scientific intelligence becomes economically composable
          </RevealText>
          <FadeIn trigger="#ch1" delay={0.2} className="max-w-xl text-center">
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.75] bg-[rgba(6,10,12,0.6)] backdrop-blur-md px-5 py-4 rounded-lg inline-block">
              Global participation, transparent funding, open coordination,
              and liquid exposure to scientific innovation — across longevity,
              peptide research, synthetic biology, genomics, computational
              chemistry, and emerging therapeutic systems.
            </p>
          </FadeIn>
        </Chapter>

        {/* Chapter 2 — How it works */}
        <Chapter id="ch2" className="flex-col gap-10 px-6">
          <RevealText trigger="#ch2" solid>Coordinate. Fund. Discover.</RevealText>
          <FadeIn trigger="#ch2" delay={0.2}>
            <div className="flex gap-10 sm:gap-16 font-mono text-center">
              {[
                {
                  value: "Curate",
                  desc: "Surface the best research",
                  color: "var(--accent)",
                },
                {
                  value: "Fund",
                  desc: "Back scientific directions",
                  color: "#a78bfa",
                },
                {
                  value: "Earn",
                  desc: "Liquid exposure to breakthroughs",
                  color: "#4ecdc4",
                },
              ].map((item) => (
                <div key={item.value}>
                  <p
                    className="text-[18px] font-semibold mb-1"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] tracking-wider">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn trigger="#ch2" delay={0.4} className="max-w-lg text-center">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[10px] text-[var(--text-muted)]">
              {["longevity", "peptide research", "synthetic biology", "genomics", "computational chemistry", "therapeutics"].map((d) => (
                <span key={d} className="border border-[var(--border)] rounded-full px-2.5 py-1">{d}</span>
              ))}
            </div>
          </FadeIn>
        </Chapter>

        {/* Chapter 3 — CTA */}
        <Chapter id="ch3" className="flex-col gap-6">
          <FadeIn trigger="#ch3">
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] text-[var(--text-strong)] text-center leading-[1.2]">
              Tokenized scientific intelligence.
            </p>
          </FadeIn>
          <FadeIn trigger="#ch3" delay={0.15}>
            <Link
              href="/dashboard"
              className="font-mono text-[13px] bg-[var(--accent)] text-[var(--bg)] rounded px-10 py-3.5 hover:opacity-85 transition-opacity font-medium tracking-wide inline-block"
            >
              Launch App →
            </Link>
          </FadeIn>
          <FadeIn trigger="#ch3" delay={0.3}>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center font-mono text-[10px] text-[var(--text-muted)] mt-4">
              <span>
                <span className="text-[var(--text-secondary)]">
                  {activeAgents.length}
                </span>{" "}
                agents
              </span>
              <span className="text-[var(--border-hover)]">·</span>
              <span>
                <span className="text-[var(--text-secondary)]">
                  {pods.length}
                </span>{" "}
                pods
              </span>
              <span className="text-[var(--border-hover)]">·</span>
              <span>
                <span className="text-[var(--text-secondary)]">
                  ${(totalFunded / 1000).toFixed(0)}k
                </span>{" "}
                funded
              </span>
              <span className="text-[var(--border-hover)]">·</span>
              <span>
                <span className="text-[var(--text-secondary)]">
                  {totalRewards.toFixed(1)}
                </span>{" "}
                ETH earned
              </span>
            </div>
          </FadeIn>
        </Chapter>
      </main>
    </>
  );
}
