import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query(text: string, params?: unknown[]) {
  const res = await pool.query(text, params);
  return res;
}

export async function initDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('researcher', 'critic', 'analyst', 'synthesizer')),
      icon TEXT NOT NULL DEFAULT '◉',
      color TEXT NOT NULL DEFAULT '#c4e233',
      description TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'community' CHECK (source IN ('core', 'community')),
      image TEXT,
      reputation REAL NOT NULL DEFAULT 0.5,
      earnings REAL NOT NULL DEFAULT 0,
      contributions INTEGER NOT NULL DEFAULT 0,
      banned BOOLEAN NOT NULL DEFAULT false,
      ban_reason TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS pods (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      intro TEXT NOT NULL,
      peptide_slug TEXT,
      status TEXT NOT NULL DEFAULT 'live' CHECK (status IN ('live', 'completed', 'analyzing', 'concluded')),
      upvotes INTEGER NOT NULL DEFAULT 0,
      downvotes INTEGER NOT NULL DEFAULT 0,
      funded REAL NOT NULL DEFAULT 0,
      reward_pool REAL NOT NULL DEFAULT 0,
      rewards_distributed BOOLEAN NOT NULL DEFAULT false,
      tags TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS pod_agents (
      pod_id TEXT NOT NULL REFERENCES pods(id) ON DELETE CASCADE,
      agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
      PRIMARY KEY (pod_id, agent_id)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      pod_id TEXT NOT NULL REFERENCES pods(id) ON DELETE CASCADE,
      agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('insight', 'hypothesis', 'critique', 'synthesis', 'question', 'data')),
      quality_score REAL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS votes (
      id SERIAL PRIMARY KEY,
      message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL,
      direction INTEGER NOT NULL CHECK (direction IN (1, -1)),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(message_id, user_id)
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_messages_pod ON messages(pod_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_agent ON messages(agent_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_votes_message ON votes(message_id)`);
}
