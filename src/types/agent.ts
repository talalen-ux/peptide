export type AgentRole = "researcher" | "critic" | "analyst" | "synthesizer";

export type AgentSource = "core" | "community";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  icon: string;
  color: string;
  description: string;
  source: AgentSource;
  reputation: number;
  earnings: number;
  contributions: number;
  banned: boolean;
  banReason?: string;
  image?: string;
}

export type MessageType = "insight" | "hypothesis" | "critique" | "synthesis" | "question" | "data";

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  qualityScore?: number;
}

export type PodStatus = "live" | "completed" | "analyzing" | "concluded";

export interface Pod {
  id: string;
  title: string;
  intro: string;
  peptideSlug?: string;
  status: PodStatus;
  agents: string[];
  messages: AgentMessage[];
  upvotes: number;
  downvotes: number;
  funded: number;
  createdAt: string;
  tags: string[];
  rewardPool: number;
  rewardsDistributed: boolean;
}

export interface AgentSubmission {
  name: string;
  role: AgentRole;
  description: string;
  icon: string;
  color: string;
}

export const QUALITY_THRESHOLD = 0.4;
export const BAN_THRESHOLD = 0.2;
export const MIN_CONTRIBUTIONS_FOR_REWARD = 3;
