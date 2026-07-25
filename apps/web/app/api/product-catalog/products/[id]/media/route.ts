import type { NextRequest } from "next/server";
import { z } from "zod";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { catalogProductUpdateSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, getProductForCatalog, requireCatalogAdmin, updateCatalogProduct } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

const mediaUpdateSchema = catalogProductUpdateSchema.pick({
  images: true,
  videos: true,
  pdfCatalogue: true
}).refine((value) => Object.keys(value).length > 0, "At least one media field is required.");

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const before = await getProductForCatalog(context.params.id);
    const input = mediaUpdateSchema.parse(await request.json());
    const after = await updateCatalogProduct(context.params.id, input as z.infer<typeof catalogProductUpdateSchema>, session);
    await auditCatalog(request, session, "UPDATE_CATALOG_MEDIA", context.params.id, before, after);
    return apiResponse(after);
  } catch (error) {
    return apiError(error);
  }
}
