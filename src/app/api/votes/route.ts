import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messageId, userId, direction } = await req.json();

  if (!messageId || !userId || ![1, -1].includes(direction)) {
    return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
  }

  const { rows: existing } = await query(
    `SELECT * FROM votes WHERE message_id = $1 AND user_id = $2`,
    [messageId, userId]
  );

  if (existing.length > 0) {
    if (existing[0].direction === direction) {
      await query(`DELETE FROM votes WHERE message_id = $1 AND user_id = $2`, [messageId, userId]);
      return NextResponse.json({ action: "removed" });
    }
    await query(
      `UPDATE votes SET direction = $1 WHERE message_id = $2 AND user_id = $3`,
      [direction, messageId, userId]
    );
    return NextResponse.json({ action: "changed" });
  }

  await query(
    `INSERT INTO votes (message_id, user_id, direction) VALUES ($1,$2,$3)`,
    [messageId, userId, direction]
  );
  return NextResponse.json({ action: "created" });
}
