import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { bulkImagesSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const body = bulkImagesSchema.parse(await request.json());
    const uploaded = [];
    const failed = [];

    for (const image of body.images) {
      const product = await prisma.product.findFirst({
        where: { sku: image.sku, deletedAt: null }
      });

      if (!product) {
        failed.push({ sku: image.sku, error: "Product not found." });
        continue;
      }

      uploaded.push(
        await prisma.mediaFile.create({
          data: {
            uploadedById: session.userId,
            productId: product.id,
            type: "IMAGE",
            url: image.url,
            altText: image.altText,
            mimeType: image.mimeType,
            sizeBytes: image.sizeBytes,
            sortOrder: image.sortOrder ?? 0,
            metadata: {
              kind: "PRODUCT_IMAGE",
              bulkUploaded: true
            }
          }
        })
      );
    }

    await auditCatalog(request, session, "BULK_UPLOAD_CATALOG_IMAGES", null, undefined, {
      uploadedCount: uploaded.length,
      failedCount: failed.length
    });

    return apiResponse({ uploaded, failed }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
