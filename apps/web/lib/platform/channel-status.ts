export type ChannelStatus = {
  provider: "WHATSAPP" | "EMAIL" | "SMS";
  ready: boolean;
  message: string;
};

export function channelReadiness(): ChannelStatus[] {
  return [
    {
      provider: "WHATSAPP",
      ready: Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID),
      message: process.env.WHATSAPP_ACCESS_TOKEN ? "WhatsApp Business credentials detected." : "WhatsApp Business credentials pending."
    },
    {
      provider: "EMAIL",
      ready: Boolean(process.env.EMAIL_SERVER || process.env.RESEND_API_KEY || process.env.SMTP_HOST),
      message: process.env.EMAIL_SERVER || process.env.RESEND_API_KEY || process.env.SMTP_HOST ? "Email provider credentials detected." : "Email provider credentials pending."
    },
    {
      provider: "SMS",
      ready: Boolean(process.env.TWILIO_ACCOUNT_SID || process.env.MSG91_AUTH_KEY),
      message: process.env.TWILIO_ACCOUNT_SID || process.env.MSG91_AUTH_KEY ? "SMS provider credentials detected." : "SMS provider credentials pending."
    }
  ];
}

export function whatsappLink(phone: string, message: string) {
  const normalized = phone.replace(/[^\d]/g, "");
  return normalized ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}` : undefined;
}
