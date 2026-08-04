import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { catalogProductSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, createCatalogProduct, listCatalogProducts, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    return apiResponse(await listCatalogProducts(request));
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const body = await request.json();
    const input = catalogProductSchema.parse(body);
    const product = await createCatalogProduct(input, session);
    await auditCatalog(request, session, "CREATE_CATALOG_PRODUCT", product.id, undefined, product);
    return apiResponse(product, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
