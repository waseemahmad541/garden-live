import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiSession, requireRoles, allBusinessRoles } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

const signatureSchema = z.object({
  folder: z.string().min(1).max(120).default("garden-live"),
  uploadPreset: z.string().max(120).optional()
});

function sign(params: Record<string, string | number>, secret: string) {
  const base = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(`${base}${secret}`).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!apiKey || !apiSecret || !cloudName) {
      throw new ApiError(503, "Cloudinary production credentials are not configured.", "CLOUDINARY_NOT_CONFIGURED");
    }

    const body = await request.json().catch(() => ({}));
    const input = signatureSchema.parse(body);
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      folder: input.folder,
      timestamp,
      ...(input.uploadPreset ? { upload_preset: input.uploadPreset } : {})
    };

    return apiResponse({
      cloudName,
      apiKey,
      timestamp,
      folder: input.folder,
      uploadPreset: input.uploadPreset,
      signature: sign(params, apiSecret)
    });
  } catch (error) {
    return apiError(error);
  }
}
