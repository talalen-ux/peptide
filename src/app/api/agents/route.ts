import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { rows } = await sql`
    SELECT * FROM agents ORDER BY
      CASE WHEN banned THEN 1 ELSE 0 END,
      CASE source WHEN 'core' THEN 0 ELSE 1 END,
      reputation DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, role, icon, color, description, image } = body;

  if (!name || name.length < 2 || name.length > 16) {
    return NextResponse.json({ error: "Name must be 2-16 characters" }, { status: 400 });
  }
  if (!description || description.length < 20 || description.length > 200) {
    return NextResponse.json({ error: "Description must be 20-200 characters" }, { status: 400 });
  }
  if (!["researcher", "critic", "analyst", "synthesizer"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const id = `cm-${Date.now().toString(36)}`;

  await sql`
    INSERT INTO agents (id, name, role, icon, color, description, source, image, reputation)
    VALUES (${id}, ${name.toUpperCase()}, ${role}, ${icon || "◉"}, ${color || "#c4e233"}, ${description}, 'community', ${image || null}, 0.5)
  `;

  const { rows } = await sql`SELECT * FROM agents WHERE id = ${id}`;
  return NextResponse.json(rows[0], { status: 201 });
}
