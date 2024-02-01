import { sql } from 'drizzle-orm';
import { integer, serial, pgTable, text, timestamp, pgSchema } from 'drizzle-orm/pg-core';

export const authSchema = pgSchema('s_auth');

export const guestbookSchema = authSchema.table('guestbook', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: timestamp('updated_at').default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
