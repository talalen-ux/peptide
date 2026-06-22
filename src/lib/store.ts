import { create } from "zustand";

type Vec2 = { x: number; y: number };

type State = {
  progress: number;
  chapter: number;
  mouse: Vec2;
  mouseRaw: Vec2;
  reducedMotion: boolean;
  set: (p: Partial<State>) => void;
};

export const useScene = create<State>((set) => ({
  progress: 0,
  chapter: 0,
  mouse: { x: 0, y: 0 },
  mouseRaw: { x: 0, y: 0 },
  reducedMotion: false,
  set: (p) => set(p),
}));
