import { Ghostbook } from "@/types/guestbook";
import { db } from '@/libs/DB';
import { guestbookSchema } from '@/models/Schema';

type NewGhostbook = typeof guestbookSchema.$inferInsert;

export async function insert(ghostbook: NewGhostbook) {
  console.log("ghostbook", ghostbook)
  const res = await db
    .insert(guestbookSchema)
    .values(ghostbook)
    .returning();
  return res;
}