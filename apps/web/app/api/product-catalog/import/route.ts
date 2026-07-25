import type { NextRequest } from "next/server";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { bulkImportSchema, catalogProductSchema } from "@/lib/product-catalog/schemas";
import { auditCatalog, createCatalogProduct, parseCsvProducts, requireCatalogAdmin } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogAdmin(session);
    const body = bulkImportSchema.parse(await request.json());
    const rows = body.rows ?? body.excelRows ?? (body.csv ? await parseCsvProducts(body.csv) : []);
    const created = [];
    const failed = [];

    for (const row of rows) {
      const parsed = catalogProductSchema.safeParse(row);
      if (!parsed.success) {
        failed.push({ row, issues: parsed.error.issues });
        continue;
      }

      try {
        created.push(await createCatalogProduct(parsed.data, session));
      } catch (error) {
        failed.push({ row, error: error instanceof Error ? error.message : "Import failed." });
      }
    }

    await auditCatalog(request, session, "BULK_IMPORT_CATALOG_PRODUCTS", null, undefined, {
      createdCount: created.length,
      failedCount: failed.length
    });

    return apiResponse({ created, failed }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
