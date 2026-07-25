import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = "API_ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function apiResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function apiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json({ ok: false, error: { code: error.code, message: error.message } }, { status: error.status });
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Request validation failed.",
          issues: error.issues
        }
      },
      { status: 422 }
    );
  }

  console.error(error);
  return NextResponse.json(
    { ok: false, error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong." } },
    { status: 500 }
  );
}
