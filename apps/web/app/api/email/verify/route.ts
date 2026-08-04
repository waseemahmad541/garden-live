import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/crypto";
import { apiError } from "@/lib/api/errors";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, "email-verify", 10, 60_000);
    enforceCsrf(request);

    const body = await request.json().catch(() => ({}));
    const token = String(body.token ?? "").trim();

    if (!token) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const authToken = await prisma.authToken.findFirst({
      where: {
        tokenHash: hashToken(token),
        purpose: "EMAIL_VERIFICATION",
        consumedAt: null,
        deletedAt: null,
        expiresAt: { gt: new Date() }
      }
    });

    if (!authToken) {
      return NextResponse.json({ error: "Verification link is invalid or expired." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: authToken.userId },
        data: { emailVerifiedAt: new Date() }
      }),
      prisma.authToken.update({
        where: { id: authToken.id },
        data: { consumedAt: new Date() }
      })
    ]);

    return NextResponse.json({ ok: true, message: "Email verified successfully." });
  } catch (error) {
    return apiError(error);
  }
}
