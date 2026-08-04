import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createSecureToken, hashToken } from "@/lib/auth/crypto";
import { normalizeEmail } from "@/lib/auth/validators";
import { apiError } from "@/lib/api/errors";
import { canonicalSiteUrl } from "@/lib/env/urls";
import { sendEmail } from "@/lib/platform/notifications";
import { jsonValue } from "@/lib/platform/providers";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

function errorMetadata(error: unknown) {
  return {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown email delivery error"
  };
}

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, "password-forgot", 5, 60_000);
    enforceCsrf(request);

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
      console.info("[password-reset] requested for unknown or inactive account", { email });
      return NextResponse.json({ ok: true, message: "If this email is registered, a reset link has been sent." });
    }

    const token = createSecureToken();

    const resetToken = await prisma.authToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        purpose: "PASSWORD_RESET",
        expiresAt: new Date(Date.now() + 1000 * 60 * 30)
      }
    });

    const resetUrl = `${canonicalSiteUrl()}/reset-password?token=${encodeURIComponent(token)}`;
    const title = "Reset your Garden Live password";
    const message = [
      `Hi ${user.name},`,
      "",
      "We received a request to reset your Garden Live account password.",
      `Reset your password using this secure link: ${resetUrl}`,
      "",
      "This link expires in 30 minutes. If you did not request this, you can safely ignore this email.",
      "",
      "Garden Live"
    ].join("\n");

    try {
      const providerResult = await sendEmail({
        userId: user.id,
        channel: "EMAIL",
        type: "AUTH",
        to: email,
        title,
        message,
        metadata: { authTokenId: resetToken.id, purpose: "PASSWORD_RESET" }
      });

      await prisma.notification.create({
        data: {
          userId: user.id,
          title,
          message,
          type: "AUTH",
          channel: "EMAIL",
          status: "SENT",
          sentAt: new Date(),
          metadata: jsonValue({
            authTokenId: resetToken.id,
            provider: "resend",
            providerResult
          })
        }
      });

      console.info("[password-reset] email sent", {
        userId: user.id,
        email,
        authTokenId: resetToken.id
      });
    } catch (error) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title,
          message,
          type: "AUTH",
          channel: "EMAIL",
          status: "FAILED",
          metadata: jsonValue({
            authTokenId: resetToken.id,
            provider: "resend",
            error: errorMetadata(error)
          })
        }
      });

      console.error("[password-reset] email delivery failed", {
        userId: user.id,
        email,
        authTokenId: resetToken.id,
        error: errorMetadata(error)
      });
      throw error;
    }

    return NextResponse.json({
      ok: true,
      message: "If this email is registered, a reset link has been sent.",
      ...(process.env.NODE_ENV !== "production" ? { devResetToken: token } : {})
    });
  } catch (error) {
    return apiError(error);
  }
}
