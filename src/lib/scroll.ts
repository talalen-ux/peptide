"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollState = { progress: 0, chapter: 0 };
export const mouseState = { x: 0, y: 0 };

const mouseTarget = { x: 0, y: 0 };

function onPointerMove(e: PointerEvent) {
  mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

function lerpMouse() {
  mouseState.x += (mouseTarget.x - mouseState.x) * 0.06;
  mouseState.y += (mouseTarget.y - mouseState.y) * 0.06;
}

export function initScroll() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);

  const rafTick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(rafTick);
  gsap.ticker.lagSmoothing(0);

  const scrollTrigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      scrollState.progress = self.progress;
      scrollState.chapter = self.progress < 0.25 ? 0 : self.progress < 0.5 ? 1 : self.progress < 0.75 ? 2 : 3;
    },
  });

  window.addEventListener("pointermove", onPointerMove);
  gsap.ticker.add(lerpMouse);

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMqChange = (e: MediaQueryListEvent) => {
    (window as unknown as Record<string, boolean>).__reducedMotion = e.matches;
  };
  (window as unknown as Record<string, boolean>).__reducedMotion = mq.matches;
  mq.addEventListener("change", onMqChange);

  return {
    destroy() {
      lenis.destroy();
      gsap.ticker.remove(rafTick);
      gsap.ticker.remove(lerpMouse);
      window.removeEventListener("pointermove", onPointerMove);
      mq.removeEventListener("change", onMqChange);
      scrollTrigger.kill();
    },
  };
}
