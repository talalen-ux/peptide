"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { initScroll } from "@/lib/scroll";
import { useScene } from "@/lib/store";
import { getAllPods } from "@/data/pods";
import { getActiveAgents } from "@/data/agents";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((m) => m.Scene),
  { ssr: false }
);

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
      className={`${solid ? "text-[var(--text-strong)]" : "stroke-text"} text-[clamp(1.6rem,5vw,3.5rem)] sm:text-[clamp(2rem,6vw,4.5rem)] font-display leading-[1.1] tracking-tight ${className ?? ""}`}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    const lenis = initScroll();
    return () => {
      lenis.destroy();
      window.removeEventListener("resize", check);
    };
  }, []);

  const showScene = !reducedMotion && !isMobile;

  return (
    <>
      {/* Pinned 3D scene — desktop only */}
      {showScene && (
        <div className="fixed inset-0 -z-10">
          <Scene />
        </div>
      )}

      {/* Mobile: animated SVG flask background instead of WebGL */}
      {!showScene && (
        <div className="fixed inset-0 -z-10 flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(196,226,51,0.06) 0%, transparent 70%)",
            }}
          />
          {/* CSS-animated SVG flask for mobile */}
          <svg
            viewBox="0 0 64 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-64 opacity-20"
            style={{ filter: "drop-shadow(0 0 40px rgba(196,226,51,0.15))" }}
          >
            <rect x="20" y="2" width="24" height="4" rx="2" fill="#c4e233" opacity="0.7" />
            <path
              d="M24 6 L24 28 L6 66 Q6 76 16 76 L48 76 Q58 76 58 66 L40 28 L40 6"
              stroke="#c4e233"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="#c4e233"
              fillOpacity="0.03"
            />
            <path
              d="M10 52 Q20 46 32 52 Q44 58 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z"
              fill="#c4e233"
              fillOpacity="0.25"
            >
              <animate attributeName="d" dur="3s" repeatCount="indefinite" values="
                M10 52 Q20 46 32 52 Q44 58 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z;
                M10 52 Q22 58 32 52 Q42 46 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z;
                M10 52 Q20 46 32 52 Q44 58 54 52 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z
              " />
            </path>
            <path
              d="M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z"
              fill="#c4e233"
              fillOpacity="0.5"
            >
              <animate attributeName="d" dur="3s" repeatCount="indefinite" values="
                M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z;
                M10 56 Q20 62 32 56 Q44 50 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z;
                M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z
              " />
            </path>
            <path d="M8 64 L56 64 Q58 76 48 76 L16 76 Q6 76 8 64 Z" fill="#c4e233" fillOpacity="0.7" />
            <circle cx="22" cy="68" r="2.5" fill="#060a0c" fillOpacity="0.3">
              <animate attributeName="cy" dur="2.8s" repeatCount="indefinite" values="68;42;68" />
              <animate attributeName="opacity" dur="2.8s" repeatCount="indefinite" values="0.3;0.5;0.3" />
              <animate attributeName="r" dur="2.8s" repeatCount="indefinite" values="2.5;1;2.5" />
            </circle>
            <circle cx="36" cy="70" r="1.8" fill="#060a0c" fillOpacity="0.25">
              <animate attributeName="cy" dur="3.5s" repeatCount="indefinite" values="70;46;70" begin="0.8s" />
              <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0.25;0.4;0.25" begin="0.8s" />
              <animate attributeName="r" dur="3.5s" repeatCount="indefinite" values="1.8;0.8;1.8" begin="0.8s" />
            </circle>
            <circle cx="28" cy="72" r="1.5" fill="#060a0c" fillOpacity="0.2">
              <animate attributeName="cy" dur="4s" repeatCount="indefinite" values="72;48;72" begin="1.5s" />
              <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.2;0.35;0.2" begin="1.5s" />
              <animate attributeName="r" dur="4s" repeatCount="indefinite" values="1.5;0.6;1.5" begin="1.5s" />
            </circle>
          </svg>
        </div>
      )}

      <main className="landing-text">
        {/* Chapter 0 — Hero */}
        <Chapter id="ch0" className="flex-col gap-3 sm:gap-4 px-6">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="font-display text-[clamp(3rem,12vw,7rem)] text-[var(--text-strong)] leading-none tracking-tight">
              bionet<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-[12px] text-[var(--text-muted)] tracking-[0.2em] uppercase mt-3">
              Tokenized Scientific Intelligence
            </p>
          </div>
          <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider animate-pulse">
              scroll
            </span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="opacity-30">
              <path d="M6 0v16m0 0l-4-4m4 4l4-4" stroke="var(--text-muted)" strokeWidth="1" />
            </svg>
          </div>
        </Chapter>

        {/* Chapter 1 — Vision */}
        <Chapter id="ch1" className="flex-col gap-6 sm:gap-8 px-6">
          <div className="relative z-10 max-w-2xl text-center">
            <RevealText trigger="#ch1" solid>
              Scientific intelligence becomes economically composable
            </RevealText>
            <FadeIn trigger="#ch1" delay={0.2} className="mt-6">
              <p className="text-[13px] sm:text-[15px] text-[var(--text)] leading-[1.75]">
                Global participation, transparent funding, open coordination,
                and liquid exposure to scientific innovation — across longevity,
                peptide research, synthetic biology, genomics, computational
                chemistry, and emerging therapeutic systems.
              </p>
            </FadeIn>
          </div>
        </Chapter>

        {/* Chapter 2 — How it works */}
        <Chapter id="ch2" className="flex-col gap-8 sm:gap-10 px-6">
          <div className="relative z-10 max-w-2xl text-center">
            <RevealText trigger="#ch2" solid>Coordinate. Fund. Discover.</RevealText>
            <FadeIn trigger="#ch2" delay={0.2} className="mt-8">
              <div className="flex gap-8 sm:gap-16 font-mono text-center justify-center">
                {[
                  { value: "Curate", desc: "Surface the best research", color: "var(--accent)" },
                  { value: "Fund", desc: "Back scientific directions", color: "#a78bfa" },
                  { value: "Earn", desc: "Liquid exposure to breakthroughs", color: "#4ecdc4" },
                ].map((item) => (
                  <div key={item.value}>
                    <p className="text-[16px] sm:text-[18px] font-semibold mb-1" style={{ color: item.color }}>
                      {item.value}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] tracking-wider max-w-[100px]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn trigger="#ch2" delay={0.4} className="mt-6">
              <div className="flex flex-wrap justify-center gap-2 font-mono text-[9px] sm:text-[10px] text-[var(--text-secondary)]">
                {["longevity", "peptide research", "synthetic biology", "genomics", "computational chemistry", "therapeutics"].map((d) => (
                  <span key={d} className="border border-[var(--border)] rounded-full px-2 sm:px-2.5 py-1">{d}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </Chapter>

        {/* Chapter 3 — CTA */}
        <Chapter id="ch3" className="flex-col gap-5 sm:gap-6 px-6">
          <div className="relative z-10 text-center">
            <FadeIn trigger="#ch3">
              <p className="font-display text-[clamp(1.3rem,3.5vw,2.5rem)] text-[var(--text-strong)] text-center leading-[1.2]">
                Tokenized scientific intelligence.
              </p>
            </FadeIn>
            <FadeIn trigger="#ch3" delay={0.15} className="mt-6">
              <Link
                href="/dashboard"
                className="font-mono text-[12px] sm:text-[13px] bg-[var(--accent)] text-[var(--bg)] rounded px-8 sm:px-10 py-3 sm:py-3.5 hover:opacity-85 transition-opacity font-medium tracking-wide inline-block"
              >
                Launch App →
              </Link>
            </FadeIn>
            <FadeIn trigger="#ch3" delay={0.3} className="mt-8">
              <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)]">
                <span><span className="text-[var(--text-secondary)]">{activeAgents.length}</span> agents</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">{pods.length}</span> pods</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">${(totalFunded / 1000).toFixed(0)}k</span> funded</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">{totalRewards.toFixed(1)}</span> ETH earned</span>
              </div>
            </FadeIn>
          </div>
        </Chapter>
      </main>
    </>
  );
}
