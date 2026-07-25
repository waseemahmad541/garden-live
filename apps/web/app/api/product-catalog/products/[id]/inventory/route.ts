import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { inventorySchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, getProductForCatalog, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const input = inventorySchema.parse(await request.json());
    const before = await getProductForCatalog(context.params.id);
    const inventory = await prisma.inventory.upsert({
      where: { productId: context.params.id },
      update: {
        stockQuantity: input.stockQuantity,
        reservedQuantity: input.reservedQuantity,
        lowStockThreshold: input.lowStockThreshold,
        warehouseLocation: input.warehouseLocation
      },
      create: {
        productId: context.params.id,
        stockQuantity: input.stockQuantity ?? 0,
        reservedQuantity: input.reservedQuantity ?? 0,
        lowStockThreshold: input.lowStockThreshold ?? 5,
        warehouseLocation: input.warehouseLocation
      }
    });

    if (input.stockQuantity !== undefined) {
      await prisma.inventoryMovement.create({
        data: {
          productId: context.params.id,
          inventoryId: inventory.id,
          type: "ADJUSTMENT",
          quantity: input.stockQuantity,
          reason: input.movementReason ?? "Catalog inventory update",
          createdById: session.userId
        }
      });
    }

    const after = await getProductForCatalog(context.params.id);
    await auditCatalog(request, session, "UPDATE_CATALOG_INVENTORY", context.params.id, before, after);
    return apiResponse(after);
  } catch (error) {
    return apiError(error);
  }
}
