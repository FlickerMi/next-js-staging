import { Ghostbook } from "@/types/guestbook";
import { db } from '@/libs/DB';
import { guestbookSchema } from '@/models/Schema';
import { eq, sql } from 'drizzle-orm';

type NewGhostbook = typeof guestbookSchema.$inferInsert;
type UpdateGhostbook = typeof guestbookSchema.$inferInsert;

export async function insert(ghostbook: NewGhostbook) {
  console.log("ghostbook", ghostbook)
  const res = await db
    .insert(guestbookSchema)
    .values(ghostbook)
    .returning();
  return res;
}

export async function update(ghostbook: NewGhostbook) {
  console.log("ghostbook", ghostbook)
  const res = await db
    .update(guestbookSchema)
    .set({
      ...ghostbook,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(guestbookSchema.id, ghostbook.id!!));
  return res;
}