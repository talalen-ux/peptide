export type AgentRole = "researcher" | "critic" | "analyst" | "synthesizer";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  icon: string;
  color: string;
  description: string;
}

export type MessageType = "insight" | "hypothesis" | "critique" | "synthesis" | "question" | "data";

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: string;
  type: MessageType;
}

export type PodStatus = "live" | "completed" | "analyzing";

export interface Pod {
  id: string;
  title: string;
  peptideSlug?: string;
  status: PodStatus;
  agents: string[];
  messages: AgentMessage[];
  upvotes: number;
  downvotes: number;
  funded: number;
  createdAt: string;
  tags: string[];
}
