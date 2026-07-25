import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { assignRole, createCustomerProfileIfNeeded } from "@/lib/auth/users";
import { createNumericOtp, createSecureToken, hashToken } from "@/lib/auth/crypto";
import { normalizeEmail, normalizePassword, normalizePhone } from "@/lib/auth/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  const email = normalizeEmail(body.email);
  const phone = normalizePhone(body.phone);
  const password = normalizePassword(body.password);

  if (!name || !email || !phone || !password) {
    return NextResponse.json({ error: "Name, valid email, phone, and 8 character password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: {
      deletedAt: null,
      OR: [{ email }, { phone }]
    },
    select: { id: true }
  });

  if (existing) {
    return NextResponse.json({ error: "An account already exists with this email or phone." }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);
  const emailToken = createSecureToken();
  const phoneOtp = createNumericOtp();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
  const otpExpiresAt = new Date(Date.now() + 1000 * 60 * 5);

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        status: "ACTIVE"
      }
    });

    await tx.authToken.create({
      data: {
        userId: created.id,
        tokenHash: hashToken(emailToken),
        purpose: "EMAIL_VERIFICATION",
        expiresAt
      }
    });

    await tx.authOtpCode.create({
      data: {
        userId: created.id,
        phone,
        codeHash: hashToken(phoneOtp),
        purpose: "PHONE_VERIFICATION",
        expiresAt: otpExpiresAt
      }
    });

    return created;
  });

  await assignRole(user.id, "CUSTOMER");
  await createCustomerProfileIfNeeded(user);

  return NextResponse.json({
    ok: true,
    message: "Account created. Verify email and phone to unlock all features.",
    ...(process.env.NODE_ENV !== "production" ? { devEmailToken: emailToken, devPhoneOtp: phoneOtp } : {})
  });
}
