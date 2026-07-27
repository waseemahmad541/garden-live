import type { NotificationChannel, NotificationType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { ApiError } from "@/lib/api/errors";
import { jsonValue, optionalEnv, providerFetch, requiredEnv } from "@/lib/platform/providers";

export type NotificationInput = {
  userId?: string;
  channel: NotificationChannel;
  type: NotificationType;
  to: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export async function createInAppNotification(input: Omit<NotificationInput, "to" | "channel"> & { userId: string }) {
  return prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      channel: "IN_APP",
      title: input.title,
      message: input.message,
      status: "SENT",
      sentAt: new Date(),
      metadata: input.metadata === undefined ? undefined : jsonValue(input.metadata)
    }
  });
}

export async function sendWhatsApp(input: NotificationInput) {
  const token = requiredEnv("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = requiredEnv("WHATSAPP_PHONE_NUMBER_ID");

  return providerFetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: input.to.replace(/\D/g, ""),
        type: "text",
        text: {
          preview_url: false,
          body: `${input.title}\n\n${input.message}`
        }
      })
    },
    "whatsapp"
  );
}

export async function sendEmail(input: NotificationInput) {
  const resendApiKey = optionalEnv("RESEND_API_KEY");
  const from = optionalEnv("SMTP_FROM") || "Garden Live <no-reply@gardenlive.in>";
  const provider = resendApiKey ? "resend" : "none";

  console.info("[email] delivery provider resolved", {
    provider,
    from,
    to: input.to,
    type: input.type
  });

  if (!resendApiKey) {
    console.error("[email] delivery is not configured", {
      missing: ["RESEND_API_KEY"],
      smtpConfigured: Boolean(optionalEnv("SMTP_HOST") && optionalEnv("SMTP_USER") && optionalEnv("SMTP_PASSWORD"))
    });
    throw new ApiError(503, "RESEND_API_KEY is not configured for email delivery.", "EMAIL_NOT_CONFIGURED");
  }

  return providerFetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.title,
        text: input.message
      })
    },
    "email"
  );
}

export async function sendSms(input: NotificationInput) {
  const twilioSid = optionalEnv("TWILIO_ACCOUNT_SID");
  const twilioToken = optionalEnv("TWILIO_AUTH_TOKEN");
  const twilioFrom = optionalEnv("TWILIO_FROM_NUMBER");

  if (twilioSid && twilioToken && twilioFrom) {
    console.info("[sms] delivery provider resolved", {
      provider: "twilio",
      from: twilioFrom,
      to: input.to,
      type: input.type
    });

    return providerFetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          From: twilioFrom,
          To: input.to.replace(/[^\d+]/g, ""),
          Body: input.message
        })
      },
      "sms"
    );
  }

  const authKey = optionalEnv("MSG91_AUTH_KEY");
  const flowId = optionalEnv("MSG91_FLOW_ID");
  const senderId = optionalEnv("MSG91_SENDER_ID") || "GRNLIV";

  if (!authKey || !flowId) {
    console.error("[sms] delivery is not configured", {
      missing: [
        ...(!twilioSid ? ["TWILIO_ACCOUNT_SID"] : []),
        ...(!twilioToken ? ["TWILIO_AUTH_TOKEN"] : []),
        ...(!twilioFrom ? ["TWILIO_FROM_NUMBER"] : []),
        ...(!authKey ? ["MSG91_AUTH_KEY"] : []),
        ...(!flowId ? ["MSG91_FLOW_ID"] : [])
      ]
    });
    throw new ApiError(503, "SMS delivery is not configured. Configure Twilio or MSG91.", "SMS_NOT_CONFIGURED");
  }

  console.info("[sms] delivery provider resolved", {
    provider: "msg91",
    senderId,
    flowId,
    to: input.to,
    type: input.type
  });

  return providerFetch(
    "https://control.msg91.com/api/v5/flow/",
    {
      method: "POST",
      headers: {
        authkey: authKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        template_id: flowId,
        sender: senderId,
        short_url: "0",
        recipients: [
          {
            mobiles: input.to.replace(/\D/g, ""),
            var1: input.title,
            var2: input.message
          }
        ]
      })
    },
    "sms"
  );
}

export async function sendNotification(input: NotificationInput) {
  const result =
    input.channel === "WHATSAPP"
      ? await sendWhatsApp(input)
      : input.channel === "EMAIL"
        ? await sendEmail(input)
        : input.channel === "SMS"
          ? await sendSms(input)
          : null;

  if (input.userId) {
    await prisma.notification.create({
      data: {
        userId: input.userId,
        title: input.title,
        message: input.message,
        type: input.type,
        channel: input.channel,
        status: "SENT",
        sentAt: new Date(),
        metadata: jsonValue({ ...input.metadata, providerResult: result })
      }
    });
  }

  return result;
}
