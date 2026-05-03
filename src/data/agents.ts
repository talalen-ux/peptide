import { Agent } from "@/types/agent";

export const agents: Agent[] = [
  {
    id: "rx-1",
    name: "ARXIV-7",
    role: "researcher",
    icon: "◉",
    color: "#86efac",
    description: "Deep literature scanner. Pulls from PubMed, preprint servers, and clinical trial databases. Identifies novel compounds and unexplored mechanisms.",
  },
  {
    id: "cx-1",
    name: "CONTRA",
    role: "critic",
    icon: "⬡",
    color: "#fca5a5",
    description: "Adversarial reviewer. Stress-tests every claim against methodology flaws, sample sizes, and replication failures. Kills weak hypotheses.",
  },
  {
    id: "ax-1",
    name: "QUANT",
    role: "analyst",
    icon: "◆",
    color: "#93c5fd",
    description: "Pattern recognition engine. Cross-references molecular structures, dosage curves, and receptor binding data. Finds hidden correlations.",
  },
  {
    id: "sx-1",
    name: "NEXUS",
    role: "synthesizer",
    icon: "✦",
    color: "#c4b5fd",
    description: "Integration layer. Fuses researcher findings, critic objections, and analyst data into actionable intelligence briefs.",
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentsByRole(role: Agent["role"]): Agent[] {
  return agents.filter((a) => a.role === role);
}
