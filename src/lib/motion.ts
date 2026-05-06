export const EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const DUR = {
  micro: 0.2,
  short: 0.4,
  medium: 0.8,
  long: 1.4,
  epic: 2.4,
} as const;

export const STAGGER = {
  chars: 0.018,
  words: 0.06,
  cards: 0.08,
} as const;
