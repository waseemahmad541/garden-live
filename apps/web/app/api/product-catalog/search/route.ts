import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { listCatalogProducts, requireCatalogRead } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogRead(session);
    return apiResponse(await listCatalogProducts(request));
  } catch (error) {
    return apiError(error);
  }
}
