import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/crypto";
import { normalizePassword } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const token = String(body.token ?? "").trim();
  const password = normalizePassword(body.password);

  if (!token || !password) {
    return NextResponse.json({ error: "Valid reset token and 8 character password are required." }, { status: 400 });
  }

  const authToken = await prisma.authToken.findFirst({
    where: {
      tokenHash: hashToken(token),
      purpose: "PASSWORD_RESET",
      consumedAt: null,
      deletedAt: null,
      expiresAt: { gt: new Date() }
    }
  });

  if (!authToken) {
    return NextResponse.json({ error: "Reset link is invalid or expired." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: authToken.userId },
      data: { passwordHash: await hash(password, 12) }
    }),
    prisma.authToken.update({
      where: { id: authToken.id },
      data: { consumedAt: new Date() }
    })
  ]);

  return NextResponse.json({ ok: true, message: "Password reset successfully." });
}
