import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messageId, userId, direction } = await req.json();

  if (!messageId || !userId || ![1, -1].includes(direction)) {
    return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  }

  const { rows: existing } = await sql`
    SELECT * FROM votes WHERE message_id = ${messageId} AND user_id = ${userId}
  `;

  if (existing.length > 0) {
    if (existing[0].direction === direction) {
      await sql`DELETE FROM votes WHERE message_id = ${messageId} AND user_id = ${userId}`;
      return NextResponse.json({ action: "removed" });
    }
    await sql`
      UPDATE votes SET direction = ${direction} WHERE message_id = ${messageId} AND user_id = ${userId}
    `;
    return NextResponse.json({ action: "changed" });
  }

  await sql`
    INSERT INTO votes (message_id, user_id, direction) VALUES (${messageId}, ${userId}, ${direction})
  `;
  return NextResponse.json({ action: "created" });
}
