import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { getProductForCatalog, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const inventory = await prisma.inventory.findMany({
      where: {
        deletedAt: null,
        product: { deletedAt: null }
      },
      include: { product: true },
      orderBy: { stockQuantity: "asc" }
    });

    const lowStock = inventory.filter((item) => item.stockQuantity <= item.lowStockThreshold);
    const products = await Promise.all(lowStock.map((item) => getProductForCatalog(item.productId)));
    return apiResponse({
      items: products,
      total: products.length
    });
  } catch (error) {
    return apiError(error);
  }
}
