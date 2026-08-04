import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse, ApiError } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

const cartSchema = z.object({
  visitorId: z.string().min(8).max(120),
  productId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(99).default(1)
});

export async function POST(request: NextRequest) {
  try {
    const input = cartSchema.parse(await request.json().catch(() => ({})));
    const product = await prisma.product.findFirst({
      where: { id: input.productId, deletedAt: null, status: { in: ["ACTIVE", "OUT_OF_STOCK"] } },
      select: { id: true, name: true, sku: true, price: true, salePrice: true }
    });

    if (!product) throw new ApiError(404, "Product not found.", "PRODUCT_NOT_FOUND");

    await prisma.activityLog.create({
      data: {
        action: "PUBLIC_CART_ADD",
        entityType: "Product",
        entityId: product.id,
        metadata: {
          visitorId: input.visitorId,
          quantity: input.quantity,
          productName: product.name,
          sku: product.sku,
          price: String(product.salePrice ?? product.price)
        },
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
        userAgent: request.headers.get("user-agent")
      }
    });

    return apiResponse({ product, quantity: input.quantity }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
