"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { initScroll } from "@/lib/scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((m) => m.Scene),
  { ssr: false }
);

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

function RevealHeading({
  children,
  trigger,
}: {
  children: string;
  trigger: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { yPercent: 30, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: { trigger, start: "top 70%", end: "top 30%", scrub: 1 },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [trigger]);

  return (
    <h2
      ref={ref}
      className="text-[clamp(1.6rem,5vw,3.5rem)] sm:text-[clamp(2rem,6vw,4.5rem)] font-display text-[var(--text-strong)] leading-[1.1] tracking-tight opacity-0"
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
    const tween = gsap.fromTo(
      ref.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger, start: "top 60%", end: "top 30%", scrub: 1 },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [trigger, delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const scroll = initScroll();
    return () => scroll.destroy();
  }, []);

  const showScene = !reduced && !isMobile;

  return (
    <>
      {showScene && (
        <div className="fixed inset-0 -z-10">
          <Scene />
        </div>
      )}

      {!showScene && (
        <div className="fixed inset-0 -z-10 flex items-center justify-end pr-4">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 40% 40% at 70% 50%, rgba(196,226,51,0.04) 0%, transparent 70%)" }}
          />
          <svg viewBox="0 0 64 88" fill="none" className="w-40 h-56 opacity-12">
            <rect x="20" y="2" width="24" height="4" rx="2" fill="#c4e233" opacity="0.7" />
            <path d="M24 6 L24 28 L6 66 Q6 76 16 76 L48 76 Q58 76 58 66 L40 28 L40 6" stroke="#c4e233" strokeWidth="1.5" fill="#c4e233" fillOpacity="0.03" />
            <path d="M10 56 Q22 50 32 56 Q42 62 54 56 L58 66 Q58 76 48 76 L16 76 Q6 76 6 66 Z" fill="#c4e233" fillOpacity="0.4" />
            <path d="M8 64 L56 64 Q58 76 48 76 L16 76 Q6 76 8 64 Z" fill="#c4e233" fillOpacity="0.6" />
          </svg>
        </div>
      )}

      <main className="landing-text">
        <Chapter id="ch0" className="flex-col gap-3 sm:gap-4 px-6 sm:px-12 lg:px-20">
          <div className="relative z-10 flex flex-col items-start text-left max-w-3xl">
            <h1 className="font-display text-[clamp(3rem,10vw,6.5rem)] text-[var(--text-strong)] leading-[0.95] tracking-tight">
              bionet<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="font-mono text-[11px] sm:text-[12px] text-[var(--text-secondary)] tracking-[0.2em] uppercase mt-4">
              Tokenized Scientific Intelligence
            </p>
          </div>
          <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider animate-pulse">scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="opacity-30">
              <path d="M6 0v16m0 0l-4-4m4 4l4-4" stroke="var(--text-muted)" strokeWidth="1" />
            </svg>
          </div>
        </Chapter>

        <Chapter id="ch1" className="flex-col gap-6 sm:gap-8 px-6 sm:px-12 lg:px-20 !items-start">
          <div className="relative z-10 max-w-xl text-left">
            <RevealHeading trigger="#ch1">
              Scientific intelligence becomes economically composable
            </RevealHeading>
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

        <Chapter id="ch2" className="flex-col gap-8 sm:gap-10 px-6 sm:px-12 lg:px-20 !items-start">
          <div className="relative z-10 max-w-xl text-left">
            <RevealHeading trigger="#ch2">Coordinate. Fund. Discover.</RevealHeading>
            <FadeIn trigger="#ch2" delay={0.2} className="mt-8">
              <div className="flex gap-8 sm:gap-12 font-mono">
                {[
                  { value: "Curate", desc: "Surface the best research", color: "var(--accent)" },
                  { value: "Fund", desc: "Back scientific directions", color: "#a78bfa" },
                  { value: "Earn", desc: "Liquid exposure to breakthroughs", color: "#4ecdc4" },
                ].map((item) => (
                  <div key={item.value}>
                    <p className="text-[16px] sm:text-[18px] font-semibold mb-1" style={{ color: item.color }}>{item.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] tracking-wider max-w-[120px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn trigger="#ch2" delay={0.4} className="mt-6">
              <div className="flex flex-wrap gap-2 font-mono text-[9px] sm:text-[10px] text-[var(--text-secondary)]">
                {["longevity", "peptide research", "synthetic biology", "genomics", "computational chemistry", "therapeutics"].map((d) => (
                  <span key={d} className="border border-[var(--border)] rounded-full px-2 sm:px-2.5 py-1">{d}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </Chapter>

        <Chapter id="ch3" className="flex-col gap-5 sm:gap-6 px-6 sm:px-12 lg:px-20 !items-start">
          <div className="relative z-10 text-left max-w-xl">
            <FadeIn trigger="#ch3">
              <p className="font-display text-[clamp(1.3rem,3.5vw,2.5rem)] text-[var(--text-strong)] leading-[1.2]">
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
              <div className="flex items-center gap-3 sm:gap-6 flex-wrap font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)]">
                <span><span className="text-[var(--text-secondary)]">6</span> agents</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">5</span> pods</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">$100k</span> funded</span>
                <span className="text-[var(--border-hover)]">·</span>
                <span><span className="text-[var(--text-secondary)]">7.6</span> ETH earned</span>
              </div>
            </FadeIn>
          </div>
        </Chapter>
      </main>
    </>
  );
}
