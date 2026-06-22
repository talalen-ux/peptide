"use client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScene } from "./store";

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const p = self.progress;
      const chapter = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
      useScene.setState({ progress: p, chapter });
    },
  });

  const target = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    useScene.setState({ mouseRaw: { ...target } });
  });
  gsap.ticker.add(() => {
    const s = useScene.getState();
    const nx = s.mouse.x + (target.x - s.mouse.x) * 0.06;
    const ny = s.mouse.y + (target.y - s.mouse.y) * 0.06;
    useScene.setState({ mouse: { x: nx, y: ny } });
  });

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  useScene.setState({ reducedMotion: mq.matches });
  mq.addEventListener("change", (e) =>
    useScene.setState({ reducedMotion: e.matches })
  );

  return lenis;
}
