import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import { hasRouteAccess } from "@/lib/auth/permissions";
import { authSecret, sessionCookieNames } from "@/lib/env/auth-env";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/landscaping",
  "/plant-nursery",
  "/garden-maintenance",
  "/dedicated-gardener",
  "/membership",
  "/membership-plans",
  "/plant-doctor",
  "/ai-plant-doctor",
  "/plant-scanner",
  "/qr-plant-passport",
  "/garden-store",
  "/garden-health-reports",
  "/corporate-solutions",
  "/projects",
  "/projects-portfolio",
  "/gallery",
  "/testimonials",
  "/blog",
  "/contact",
  "/book-visit",
  "/book-garden-visit",
  "/checkout",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/verify-phone",
  "/unauthorized"
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/otp") ||
    pathname.startsWith("/api/register") ||
    pathname.startsWith("/api/password") ||
    pathname.startsWith("/api/email") ||
    pathname.startsWith("/api/phone") ||
    pathname.startsWith("/api") ||
    publicRoutes.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const secret = authSecret();
  let token: JWT | null = null;

  for (const cookieName of sessionCookieNames()) {
    token = await getToken({
      req: request,
      secret,
      cookieName,
      secureCookie: cookieName.startsWith("__Secure-")
    });

    if (token) break;
  }

  const roles = Array.isArray(token?.roles) ? token.roles : [];

  if (!token) {
    console.warn("[auth-middleware] missing or unreadable session token", {
      path: pathname,
      hasSecret: Boolean(secret),
      cookies: request.cookies.getAll().map((cookie) => cookie.name)
    });
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!hasRouteAccess(pathname, roles)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)"]
};
