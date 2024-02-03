import { NextResponse } from 'next/server';

export function respJson(
  code: number,
  message: string,
  data?: any,
  allCount?: number,
) {
  const json = {
    code,
    message,
    data,
    allCount,
  };
  if (data) {
    json.data = data;
  }
  if (allCount) {
    json.allCount = allCount;
  }
  if (code === 0) {
    return NextResponse.json(json, { status: 200 });
  }
  if (code === -1) {
    return NextResponse.json(json, { status: 500 });
  }
  return NextResponse.json(json, { status: code });
}

export function respData(data: any) {
  return respJson(0, 'ok', data || []);
}

export function respDataPage(data: any, allCount: number) {
  return respJson(0, 'ok', data || [], allCount);
}

export function respOk() {
  return respJson(0, 'ok');
}

export function respErr(message: string, code?: number) {
  return respJson(code ?? -1, message);
}

// 获取字段验证错误
type ValidationError = {
  [key: string]: string[];
};

export function printFirstValidationError(errors: ValidationError) {
  for (const key of Object.keys(errors)) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      const errorMessages = errors[key];
      if (errorMessages && errorMessages.length > 0) {
        // 确保 errorMessages 存在且不为空
        const firstError = errorMessages[0];
        if (firstError) {
          return `${key}: ${firstError}`;
        }
      }
    }
  }
  return 'Unknown error';
}
