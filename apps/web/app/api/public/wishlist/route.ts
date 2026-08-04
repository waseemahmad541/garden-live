import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse, ApiError } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

const wishlistSchema = z.object({
  visitorId: z.string().min(8).max(120),
  productId: z.string().uuid()
});

export async function POST(request: NextRequest) {
  try {
    const input = wishlistSchema.parse(await request.json().catch(() => ({})));
    const product = await prisma.product.findFirst({
      where: { id: input.productId, deletedAt: null },
      select: { id: true, name: true, sku: true }
    });

    if (!product) throw new ApiError(404, "Product not found.", "PRODUCT_NOT_FOUND");

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_WISHLIST_ADD",
        entityType: "Product",
        entityId: product.id,
        metadata: {
          visitorId: input.visitorId,
          productName: product.name,
          sku: product.sku
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({ product }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
