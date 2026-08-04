import { ApiError } from "@/lib/api/errors";

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function enforceCsrf(request: Request) {
  if (safeMethods.has(request.method)) return;

  if (!sameOrigin(request)) {
    throw new ApiError(403, "Invalid request origin.", "CSRF_ORIGIN_MISMATCH");
  }
}
