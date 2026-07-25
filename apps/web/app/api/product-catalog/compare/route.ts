import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { compareSchema } from "@/lib/product-catalog/schemas";
import { getProductForCatalog, requireCatalogRead } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogRead(session);
    const input = compareSchema.parse(await request.json());
    const products = await Promise.all(input.productIds.map((id) => getProductForCatalog(id)));
    return apiResponse({
      products,
      fields: [
        "productName",
        "brand",
        "price",
        "discountPrice",
        "gst",
        "stockQuantity",
        "plantHeight",
        "potSize",
        "plantAge",
        "sunlightRequirement",
        "waterRequirement",
        "soilRequirement",
        "maintenanceLevel",
        "indoorOutdoor",
        "airPurifying",
        "floweringSeason",
        "fruitSeason"
      ]
    });
  } catch (error) {
    return apiError(error);
  }
}
