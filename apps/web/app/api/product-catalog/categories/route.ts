import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { auditCatalog, ensureCatalogCategories, listCatalogCategories, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return apiResponse(await listCatalogCategories());
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const categories = await ensureCatalogCategories();
    await auditCatalog(request, session, "SEED_CATALOG_CATEGORIES", null, undefined, categories);
    return apiResponse(categories, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
