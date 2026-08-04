import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createNumericOtp, hashToken } from "@/lib/auth/crypto";
import { normalizeOtpPurpose, normalizePhone } from "@/lib/auth/validators";
import { apiError } from "@/lib/api/errors";
import { sendSms } from "@/lib/platform/notifications";
import { jsonValue } from "@/lib/platform/providers";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

function errorMetadata(error: unknown) {
  return {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown SMS delivery error"
  };
}

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, "otp-request", 5, 60_000);
    enforceCsrf(request);

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
      console.info("[auth-otp] requested for unknown or inactive phone", { phone, purpose });
      return NextResponse.json({ ok: true, message: "If this phone is registered, an OTP has been sent." });
    }

    const otp = createNumericOtp();

    const authOtp = await prisma.authOtpCode.create({
      data: {
        userId: user.id,
        phone,
        codeHash: hashToken(otp),
        purpose,
        expiresAt: new Date(Date.now() + 1000 * 60 * 5)
      }
    });

    const title = purpose === "PHONE_VERIFICATION" ? "Garden Live phone verification OTP" : "Garden Live login OTP";
    const message = `Your Garden Live OTP is ${otp}. It expires in 5 minutes. Do not share this code.`;

    try {
      const providerResult = await sendSms({
        userId: user.id,
        channel: "SMS",
        type: "AUTH",
        to: phone,
        title,
        message,
        metadata: { authOtpId: authOtp.id, purpose }
      });

      await prisma.notification.create({
        data: {
          userId: user.id,
          title,
          message,
          type: "AUTH",
          channel: "SMS",
          status: "SENT",
          sentAt: new Date(),
          metadata: jsonValue({
            authOtpId: authOtp.id,
            provider: "msg91",
            providerResult
          })
        }
      });

      console.info("[auth-otp] sms sent", {
        userId: user.id,
        phone,
        purpose,
        authOtpId: authOtp.id
      });
    } catch (error) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title,
          message,
          type: "AUTH",
          channel: "SMS",
          status: "FAILED",
          metadata: jsonValue({
            authOtpId: authOtp.id,
            provider: "msg91",
            error: errorMetadata(error)
          })
        }
      });

      console.error("[auth-otp] sms delivery failed", {
        userId: user.id,
        phone,
        purpose,
        authOtpId: authOtp.id,
        error: errorMetadata(error)
      });
      throw error;
    }

    return NextResponse.json({
      ok: true,
      message: "OTP sent.",
      ...(process.env.NODE_ENV !== "production" ? { devOtp: otp } : {})
    });
  } catch (error) {
    return apiError(error);
  }
}
