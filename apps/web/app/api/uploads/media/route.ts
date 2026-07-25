import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";
import { allBusinessRoles, requireApiSession, requireRoles } from "@/lib/api/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const relationFields = [
  "gardenId",
  "plantId",
  "plantTimelineId",
  "aiDiagnosisId",
  "gardenVisitId",
  "gardenProjectId",
  "tenderProjectId",
  "soilTestReportId",
  "waterTestReportId",
  "productId"
] as const;

const mediaSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "DOCUMENT", "AUDIO", "OTHER"]).default("IMAGE"),
  url: z.string().min(1).optional(),
  altText: z.string().max(220).optional(),
  mimeType: z.string().optional(),
  sizeBytes: z.coerce.number().int().nonnegative().optional(),
  sortOrder: z.coerce.number().int().default(0),
  metadata: z.unknown().optional(),
  gardenId: z.string().uuid().optional(),
  plantId: z.string().uuid().optional(),
  plantTimelineId: z.string().uuid().optional(),
  aiDiagnosisId: z.string().uuid().optional(),
  gardenVisitId: z.string().uuid().optional(),
  gardenProjectId: z.string().uuid().optional(),
  tenderProjectId: z.string().uuid().optional(),
  soilTestReportId: z.string().uuid().optional(),
  waterTestReportId: z.string().uuid().optional(),
  productId: z.string().uuid().optional()
});

function relationData(data: z.infer<typeof mediaSchema>) {
  return relationFields.reduce<Record<string, string>>((acc, field) => {
    if (data[field]) acc[field] = data[field] as string;
    return acc;
  }, {});
}

async function storeMultipartFile(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "media");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  return {
    url: `/uploads/media/${filename}`,
    mimeType: file.type || undefined,
    sizeBytes: file.size
  };
}

async function readPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");
    const fields = Object.fromEntries(formData.entries());
    const parsed = mediaSchema.parse(fields);

    if (file instanceof File) {
      const stored = await storeMultipartFile(file);
      return {
        ...parsed,
        ...stored,
        altText: parsed.altText ?? file.name
      };
    }

    if (!parsed.url) {
      throw new ApiError(400, "Provide either a file or url for media upload.", "UPLOAD_REQUIRED");
    }

    return parsed;
  }

  const body = await request.json().catch(() => {
    throw new ApiError(400, "Request body must be valid JSON.", "INVALID_JSON");
  });
  const parsed = mediaSchema.parse(body);
  if (!parsed.url) throw new ApiError(400, "Media url is required.", "MEDIA_URL_REQUIRED");
  return parsed;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);

    const params = request.nextUrl.searchParams;
    const where = {
      deletedAt: null,
      ...(params.get("productId") ? { productId: params.get("productId") } : {}),
      ...(params.get("gardenId") ? { gardenId: params.get("gardenId") } : {}),
      ...(params.get("plantId") ? { plantId: params.get("plantId") } : {})
    };

    const media = await prisma.mediaFile.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: Math.min(Number(params.get("limit") ?? 50), 100)
    });

    return apiResponse({ items: media });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);
    const payload = await readPayload(request);

    const media = await prisma.mediaFile.create({
      data: {
        uploadedById: session.userId,
        type: payload.type,
        url: payload.url as string,
        altText: payload.altText,
        mimeType: payload.mimeType,
        sizeBytes: payload.sizeBytes,
        sortOrder: payload.sortOrder,
        metadata: payload.metadata === undefined ? undefined : JSON.parse(JSON.stringify(payload.metadata)),
        ...relationData(payload)
      }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "UPLOAD_MEDIA",
        entityType: "MediaFile",
        entityId: media.id,
        newValue: JSON.parse(JSON.stringify(media)),
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(media, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
