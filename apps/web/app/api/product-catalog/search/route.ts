import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { listCatalogProducts } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    return apiResponse(await listCatalogProducts(request));
  } catch (error) {
    return apiError(error);
  }
}
