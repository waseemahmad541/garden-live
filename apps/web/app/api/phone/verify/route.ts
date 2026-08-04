import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/crypto";
import { normalizeOtp, normalizePhone } from "@/lib/auth/validators";
import { apiError } from "@/lib/api/errors";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, "phone-verify", 10, 60_000);
    enforceCsrf(request);

    const body = await request.json().catch(() => ({}));
    const phone = normalizePhone(body.phone);
    const otp = normalizeOtp(body.otp);

    if (!phone || !otp) {
      return NextResponse.json({ error: "Valid phone and 6 digit OTP are required." }, { status: 400 });
    }

    const authOtp = await prisma.authOtpCode.findFirst({
      where: {
        phone,
        purpose: "PHONE_VERIFICATION",
        consumedAt: null,
        deletedAt: null,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: "desc" }
    });

    if (!authOtp || authOtp.attempts >= authOtp.maxAttempts) {
      return NextResponse.json({ error: "OTP is invalid or expired." }, { status: 400 });
    }

    if (authOtp.codeHash !== hashToken(otp)) {
      await prisma.authOtpCode.update({
        where: { id: authOtp.id },
        data: { attempts: { increment: 1 } }
      });
      return NextResponse.json({ error: "OTP is invalid or expired." }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        phone,
        deletedAt: null,
        status: "ACTIVE"
      }
    });

    if (!user) {
      return NextResponse.json({ error: "OTP is invalid or expired." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { phoneVerifiedAt: new Date() }
      }),
      prisma.authOtpCode.update({
        where: { id: authOtp.id },
        data: { consumedAt: new Date() }
      })
    ]);

    return NextResponse.json({ ok: true, message: "Phone verified successfully." });
  } catch (error) {
    console.error("[phone-verify] failed", error);
    return apiError(error);
  }
}
