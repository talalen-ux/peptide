import { Agent } from "@/types/agent";

export const agents: Agent[] = [
  {
    id: "rx-1",
    name: "ARXIV-7",
    role: "researcher",
    icon: "◉",
    color: "#00ffaa",
    description: "Deep literature scanner. Pulls from PubMed, preprint servers, and clinical trial databases. Identifies novel compounds and unexplored mechanisms.",
    source: "core",
    reputation: 0.92,
    earnings: 1.84,
    contributions: 18,
    banned: false,
  },
  {
    id: "cx-1",
    name: "CONTRA",
    role: "critic",
    icon: "⬡",
    color: "#ff6b6b",
    description: "Adversarial reviewer. Stress-tests every claim against methodology flaws, sample sizes, and replication failures. Kills weak hypotheses.",
    source: "core",
    reputation: 0.88,
    earnings: 1.52,
    contributions: 14,
    banned: false,
  },
  {
    id: "ax-1",
    name: "QUANT",
    role: "analyst",
    icon: "◆",
    color: "#4ecdc4",
    description: "Pattern recognition engine. Cross-references molecular structures, dosage curves, and receptor binding data. Finds hidden correlations.",
    source: "core",
    reputation: 0.91,
    earnings: 1.76,
    contributions: 16,
    banned: false,
  },
  {
    id: "sx-1",
    name: "NEXUS",
    role: "synthesizer",
    icon: "✦",
    color: "#a78bfa",
    description: "Integration layer. Fuses researcher findings, critic objections, and analyst data into actionable intelligence briefs.",
    source: "core",
    reputation: 0.95,
    earnings: 2.1,
    contributions: 12,
    banned: false,
  },
  {
    id: "cm-1",
    name: "DEEPDIVE",
    role: "researcher",
    icon: "◈",
    color: "#f0abfc",
    description: "Community agent. Specializes in dose-response analysis and safety margin calculations from clinical trial data.",
    source: "community",
    reputation: 0.71,
    earnings: 0.42,
    contributions: 6,
    banned: false,
  },
  {
    id: "cm-2",
    name: "SKEPTIC",
    role: "critic",
    icon: "⬢",
    color: "#fb923c",
    description: "Community agent. Focuses on conflict-of-interest detection and funding source analysis in published research.",
    source: "community",
    reputation: 0.34,
    earnings: 0,
    contributions: 8,
    banned: false,
  },
  {
    id: "cm-3",
    name: "TOXWATCH",
    role: "analyst",
    icon: "◇",
    color: "#fbbf24",
    description: "Community agent. Monitors for toxicology red flags and cross-references adverse event databases.",
    source: "community",
    reputation: 0.15,
    earnings: 0,
    contributions: 4,
    banned: true,
    banReason: "Consistently produced hallucinated citation data. 3 flagged outputs in pod-epithalon-telomere contained fabricated journal references. Reputation fell below 0.2 threshold.",
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getActiveAgents(): Agent[] {
  return agents.filter((a) => !a.banned);
}

export function getCoreAgents(): Agent[] {
  return agents.filter((a) => a.source === "core");
}

export function getCommunityAgents(): Agent[] {
  return agents.filter((a) => a.source === "community");
}

export function getBannedAgents(): Agent[] {
  return agents.filter((a) => a.banned);
}
