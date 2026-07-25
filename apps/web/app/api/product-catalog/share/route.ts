import type { NextRequest } from "next/server";
import { z } from "zod";
import { apiError, apiResponse } from "@/lib/api/errors";
import { requireApiSession } from "@/lib/api/auth";
import { getProductForCatalog, requireCatalogRead } from "@/lib/product-catalog/service";

export const dynamic = "force-dynamic";

const shareSchema = z.object({
  productId: z.string().uuid()
});

export async function POST(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireCatalogRead(session);
    const input = shareSchema.parse(await request.json());
    const product = await getProductForCatalog(input.productId);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";
    return apiResponse({
      productId: input.productId,
      title: product.productName,
      url: `${baseUrl}/garden-store?product=${input.productId}`,
      text: `Explore ${product.productName} on Garden Live.`
    });
  } catch (error) {
    return apiError(error);
  }
}
