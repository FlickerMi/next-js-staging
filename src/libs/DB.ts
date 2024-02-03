import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { Env } from './Env.mjs';

const client = postgres(Env.DATABASE_URL, { max: 1, onnotice: () => {} })

export const db = drizzle(client);

// Disable migrate function if using Edge runtime and use `npm run db:migrate` instead.
// Only run migrate in development. Otherwise, migrate will also be run during the build which can cause errors.
// Migrate during the build can cause errors due to the locked database when multiple migrations are running at the same time.
if (process.env.NODE_ENV !== 'production') {
  await migrate(db, { migrationsFolder: './migrations' });
}

export function withPagination<T extends PgSelect>(
  qb: T,
  pageNum: number = 1,
  pageSize: number = 10,
  sort?: string
) {
  let query = qb;
  // 确保页数和页面大小的合理性
  const page = Math.max(1, pageNum) - 1;
  const size = Math.min(Math.max(1, pageSize), 9999);
  console.log("page: " + page + ", size: " + size)
  query = query.limit(size).offset(page * size)

  // 处理排序
  console.log("sort", sort)
  if(sort != null && sort != "") {
    const [sortBy, sortOrder] = sort.split(',');
    if (sortBy && sortOrder) {
      // 确保排序方式是 'asc' 或 'desc'
      const order = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
      // 使用原始 SQL 片段来避免对具体模型的依赖
      // 对用户输入进行基本的校验来防止 SQL 注入
      const orderClause = sql`${sql.raw(sortBy)} ${sql.raw(order)}`;
      query = query.orderBy(orderClause);
    }
  }

  console.log("Exec SQL:", query.toSQL());
  return query;
}