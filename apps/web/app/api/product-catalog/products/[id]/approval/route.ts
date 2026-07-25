import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { approvalSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, getProductForCatalog, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const input = approvalSchema.parse(await request.json());
    const before = await getProductForCatalog(context.params.id);
    await prisma.product.update({
      where: { id: context.params.id },
      data: {
        status: input.approved ? "ACTIVE" : "DRAFT"
      }
    });
    const after = await getProductForCatalog(context.params.id);
    await auditCatalog(request, session, input.approved ? "APPROVE_CATALOG_PRODUCT" : "REJECT_CATALOG_PRODUCT", context.params.id, before, {
      ...after,
      approvalNotes: input.notes
    });
    return apiResponse(after);
  } catch (error) {
    return apiError(error);
  }
}
