import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { rows: pods } = await sql`SELECT * FROM pods ORDER BY created_at DESC`;

  const podIds = pods.map((p) => p.id);
  if (podIds.length === 0) return NextResponse.json([]);

  const { rows: podAgents } = await sql`SELECT * FROM pod_agents`;
  const { rows: messages } = await sql`SELECT * FROM messages ORDER BY created_at ASC`;

  const result = pods.map((p) => ({
    ...p,
    agents: podAgents.filter((pa) => pa.pod_id === p.id).map((pa) => pa.agent_id),
    messages: messages.filter((m) => m.pod_id === p.id),
  }));

  return NextResponse.json(result);
}
