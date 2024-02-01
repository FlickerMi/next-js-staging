import type { Config } from 'drizzle-kit';

/** @type {import('drizzle-kit').Config} */
export default {
  out: './migrations',
  schema: './src/models/Schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
} satisfies Config;
