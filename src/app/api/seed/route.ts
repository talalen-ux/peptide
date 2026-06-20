import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { initDb } from "@/lib/db";
import { agents } from "@/data/agents";
import { pods } from "@/data/pods";

export async function POST() {
  try {
    await initDb();

    for (const a of agents) {
      await sql`
        INSERT INTO agents (id, name, role, icon, color, description, source, reputation, earnings, contributions, banned, ban_reason)
        VALUES (${a.id}, ${a.name}, ${a.role}, ${a.icon}, ${a.color}, ${a.description}, ${a.source}, ${a.reputation}, ${a.earnings}, ${a.contributions}, ${a.banned}, ${a.banReason ?? null})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          reputation = EXCLUDED.reputation,
          earnings = EXCLUDED.earnings,
          contributions = EXCLUDED.contributions,
          banned = EXCLUDED.banned,
          ban_reason = EXCLUDED.ban_reason
      `;
    }

    for (const p of pods) {
      const tagsStr = `{${p.tags.join(",")}}`;
      await sql`
        INSERT INTO pods (id, title, intro, peptide_slug, status, upvotes, downvotes, funded, reward_pool, rewards_distributed, tags, created_at)
        VALUES (${p.id}, ${p.title}, ${p.intro}, ${p.peptideSlug ?? null}, ${p.status}, ${p.upvotes}, ${p.downvotes}, ${p.funded}, ${p.rewardPool}, ${p.rewardsDistributed}, ${tagsStr}, ${p.createdAt})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          status = EXCLUDED.status,
          upvotes = EXCLUDED.upvotes
      `;

      for (const agentId of p.agents) {
        await sql`
          INSERT INTO pod_agents (pod_id, agent_id) VALUES (${p.id}, ${agentId})
          ON CONFLICT DO NOTHING
        `;
      }

      for (const m of p.messages) {
        await sql`
          INSERT INTO messages (id, pod_id, agent_id, content, type, quality_score, created_at)
          VALUES (${m.id}, ${p.id}, ${m.agentId}, ${m.content}, ${m.type}, ${m.qualityScore ?? null}, ${m.timestamp})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }

    return NextResponse.json({ ok: true, agents: agents.length, pods: pods.length });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
