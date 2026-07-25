import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";
import type { DocumentType, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { adminRoles, operationsRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedRoles = Array.from(new Set([...adminRoles, ...operationsRoles]));
const documentTypes: DocumentType[] = ["CONTRACT", "INVOICE", "QUOTATION", "TENDER", "WORK_ORDER", "REPORT", "INSURANCE", "ID_PROOF", "OTHER"];

const documentSchema = z.object({
  type: z.enum(["CONTRACT", "INVOICE", "QUOTATION", "TENDER", "WORK_ORDER", "REPORT", "INSURANCE", "ID_PROOF", "OTHER"]).default("OTHER"),
  name: z.string().min(1).max(160),
  url: z.string().min(1).optional(),
  mimeType: z.string().optional(),
  sizeBytes: z.coerce.number().int().nonnegative().optional(),
  gardenProjectId: z.string().uuid().optional(),
  tenderProjectId: z.string().uuid().optional(),
  metadata: z.unknown().optional()
});

async function storeDocument(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  return {
    url: `/uploads/documents/${filename}`,
    mimeType: file.type || undefined,
    sizeBytes: file.size,
    name: file.name
  };
}

async function readPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");
    const fields = Object.fromEntries(formData.entries());
    const parsed = documentSchema.parse(fields);

    if (file instanceof File) {
      const stored = await storeDocument(file);
      return {
        ...parsed,
        ...stored,
        name: parsed.name || stored.name
      };
    }

    if (!parsed.url) {
      throw new ApiError(400, "Provide either a file or url for document upload.", "UPLOAD_REQUIRED");
    }

    return parsed;
  }

  const body = await request.json().catch(() => {
    throw new ApiError(400, "Request body must be valid JSON.", "INVALID_JSON");
  });
  const parsed = documentSchema.parse(body);
  if (!parsed.url) throw new ApiError(400, "Document url is required.", "DOCUMENT_URL_REQUIRED");
  return parsed;
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allowedRoles);
    const params = request.nextUrl.searchParams;
    const type = params.get("type");
    const where: Prisma.DocumentWhereInput = {
      deletedAt: null,
      ...(params.get("gardenProjectId") ? { gardenProjectId: params.get("gardenProjectId") as string } : {}),
      ...(params.get("tenderProjectId") ? { tenderProjectId: params.get("tenderProjectId") as string } : {}),
      ...(type && documentTypes.includes(type as DocumentType) ? { type: type as DocumentType } : {})
    };

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: Math.min(Number(params.get("limit") ?? 50), 100)
    });

    return apiResponse({ items: documents });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allowedRoles);
    const payload = await readPayload(request);

    const document = await prisma.document.create({
      data: {
        uploadedById: session.userId,
        type: payload.type,
        name: payload.name,
        url: payload.url as string,
        mimeType: payload.mimeType,
        sizeBytes: payload.sizeBytes,
        gardenProjectId: payload.gardenProjectId,
        tenderProjectId: payload.tenderProjectId,
        metadata: payload.metadata === undefined ? undefined : JSON.parse(JSON.stringify(payload.metadata))
      }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "UPLOAD_DOCUMENT",
        entityType: "Document",
        entityId: document.id,
        newValue: JSON.parse(JSON.stringify(document)),
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse(document, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
