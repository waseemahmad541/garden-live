import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createSecureToken, hashToken } from "@/lib/auth/crypto";
import { normalizeEmail } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(body.email);

  if (!email) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
      status: "ACTIVE"
    }
  });

  if (!user) {
    return NextResponse.json({ ok: true, message: "If this email is registered, a reset link has been sent." });
  }

  const token = createSecureToken();

  await prisma.authToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      purpose: "PASSWORD_RESET",
      expiresAt: new Date(Date.now() + 1000 * 60 * 30)
    }
  });

  return NextResponse.json({
    ok: true,
    message: "Password reset link created.",
    ...(process.env.NODE_ENV !== "production" ? { devResetToken: token } : {})
  });
}
