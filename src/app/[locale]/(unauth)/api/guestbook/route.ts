import { NextResponse } from 'next/server';

import {
  DeleteGuestbookValidation,
  EditGuestbookValidation,
  GuestbookValidation,
} from '@/validations/GuestbookValidation';

import { insert, update, deleteById, page } from '@/models/ghostbook'
import { FindingGhostbook } from '@/types/guestbook'
import { respDataPage, respData, respOk, respErr, printFirstValidationError } from '@/libs/resp'

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = GuestbookValidation.safeParse(json);
  if (!parse.success) {
    return respErr(printFirstValidationError(parse.error.formErrors.fieldErrors), 422)
  }

  const guestbook = await insert(parse.data)
  return respData(guestbook);
};

export const PUT = async (request: Request) => {
  const json = await request.json();
  const parse = EditGuestbookValidation.safeParse(json);
  if (!parse.success) {
    return respErr(printFirstValidationError(parse.error.formErrors.fieldErrors), 422)
  }

  const guestbook = await update(parse.data)
  return respData(guestbook);
};

export const GET = async (request: Request, context: { params: any }) => {
  const { searchParams } = new URL(request.url)
  console.log("parse", searchParams);
  // 初始化 params 对象，并断言为有索引签名的类型
  const params: Partial<FindingGhostbook> & Record<string, string | undefined> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const guestbook = await page(params)

  return respDataPage(guestbook.data, guestbook.total);
};

export const DELETE = async (request: Request) => {
  const json = await request.json();
  const parse = DeleteGuestbookValidation.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(parse.error.format(), { status: 422 });
  }

  await deleteById(parse.data.id)
  return respOk();
};
