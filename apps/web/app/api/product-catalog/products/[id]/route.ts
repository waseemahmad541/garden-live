import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { catalogProductUpdateSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, getProductForCatalog, requireCatalogAdmin, requireCatalogRead, softDeleteCatalogProduct, updateCatalogProduct } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogRead(session);
    return apiResponse(await getProductForCatalog(context.params.id));
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const before = await getProductForCatalog(context.params.id);
    const input = catalogProductUpdateSchema.parse(await request.json());
    const product = await updateCatalogProduct(context.params.id, input, session);
    await auditCatalog(request, session, "UPDATE_CATALOG_PRODUCT", context.params.id, before, product);
    return apiResponse(product);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const before = await getProductForCatalog(context.params.id);
    const product = await softDeleteCatalogProduct(context.params.id);
    await auditCatalog(request, session, "DELETE_CATALOG_PRODUCT", context.params.id, before, product);
    return apiResponse(product);
  } catch (error) {
    return apiError(error);
  }
}
