/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function main() {
  console.log('Migration started');

  const client = postgres(process.env.DATABASE_URL ?? '', { max: 1 });

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: './migrations' });

  console.log('Migration completed');

  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed');
  console.log(error);
  process.exit(1);
});
