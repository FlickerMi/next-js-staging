import { NextResponse } from 'next/server';

import {
  DeleteGuestbookValidation,
  EditGuestbookValidation,
  GuestbookValidation,
} from '@/validations/GuestbookValidation';

import { insert, update, deleteById, findAll } from '@/models/ghostbook'
import { FindingGhostbook } from '@/types/guestbook'

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = GuestbookValidation.safeParse(json);
  console.log("parse", parse);
  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  // const guestbook = await db
  //   .insert(guestbookSchema)
  //   .values(parse.data)
  //   .returning();

  const guestbook = await insert(parse.data)

  return NextResponse.json({
    id: guestbook[0]?.id,
  });
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  // await db
  //   .update(guestbookSchema)
  //   .set({
  //     ...parse.data,
  //     updatedAt: sql`CURRENT_TIMESTAMP`,
  //   })
  //   .where(eq(guestbookSchema.id, parse.data.id));

  const guestbook = await update(parse.data)
  return NextResponse.json({});
};

export const GET = async (request: Request, context: { params: any }) => {
  const { searchParams } = new URL(request.url)
  console.log("parse", searchParams);
  // 初始化 params 对象，并断言为有索引签名的类型
  const params: Partial<FindingGhostbook> & Record<string, string | undefined> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const guestbook = await findAll(params)
  return NextResponse.json({
    item: guestbook
  });
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  await deleteById(parse.data.id)
  return NextResponse.json({});
};
