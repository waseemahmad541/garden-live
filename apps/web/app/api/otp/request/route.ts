import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createNumericOtp, hashToken } from "@/lib/auth/crypto";
import { normalizeOtpPurpose, normalizePhone } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const phone = normalizePhone(body.phone);
  const purpose = normalizeOtpPurpose(body.purpose);

  if (!phone) {
    return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      phone,
      deletedAt: null,
      status: "ACTIVE"
    }
  });

  if (!user) {
    return NextResponse.json({ ok: true, message: "If this phone is registered, an OTP has been sent." });
  }

  const otp = createNumericOtp();

  await prisma.authOtpCode.create({
    data: {
      userId: user.id,
      phone,
      codeHash: hashToken(otp),
      purpose,
      expiresAt: new Date(Date.now() + 1000 * 60 * 5)
    }
  });

  return NextResponse.json({
    ok: true,
    message: "OTP sent.",
    ...(process.env.NODE_ENV !== "production" ? { devOtp: otp } : {})
  });
}
