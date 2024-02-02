import { Ghostbook, FindingGhostbook } from "@/types/guestbook";
import { db, withPagination } from '@/libs/DB';
import { guestbookSchema } from '@/models/Schema';
import { and, eq, sql, or, like } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/pg-core';

export async function insert(ghostbook: Ghostbook) {
  console.log("ghostbook", ghostbook)
  const res = await db
    .insert(guestbookSchema)
    .values(ghostbook)
    .returning();
  console.log("insert result", res);
  return res;
}

export async function update(ghostbook: Ghostbook) {
  console.log("ghostbook", ghostbook)
  const res = await db
    .update(guestbookSchema)
    .set({
      ...ghostbook,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(guestbookSchema.id, ghostbook.id!!))
    .returning();
  console.log("update result", res);
  return res;
}

export async function findById(id: number) {
  const res = await db.select()
    .from(guestbookSchema)
    .where(eq(guestbookSchema.id, id));
  console.log("findById result", res);
  return res;
}

export async function findAll(
  finding: FindingGhostbook
) {
  console.log("finding.sort:", finding.sort)
  console.log("finding", finding)
  const conditions = [];
  if (finding.id != null) {
    conditions.push(eq(guestbookSchema.id, finding.id));
  }
  if (finding.username != null) {
    conditions.push(eq(guestbookSchema.username, finding.username));
  }
  if (finding.keyword != null) {
    conditions.push(or(
      like(guestbookSchema.username, "%" + finding.keyword + "%"),
      like(guestbookSchema.body, "%" + finding.keyword + "%")
    ));
  }
  const query = db.select().from(guestbookSchema)
    .where(and(...conditions))
    .$dynamic();
  
  const res = await withPagination(query, finding.page, finding.size, finding.sort);
  return res;
}

export async function deleteById(id: number) {
  console.log("ghostbook id", id)
  const result = await db
    .delete(guestbookSchema)
    .where(eq(guestbookSchema.id, id))
    .returning();
  console.log("delete result", result);
  return result;
}

