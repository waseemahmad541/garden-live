import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { apiError, ApiError } from "@/lib/api/errors";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: { orderNumber: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");

    const order = await prisma.order.findFirst({
      where: { orderNumber: context.params.orderNumber, deletedAt: null },
      include: {
        customer: true,
        payments: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });
    if (!order) throw new ApiError(404, "Invoice not found.", "INVOICE_NOT_FOUND");

    const roles = session.user.roles ?? [];
    const isAdmin = roles.includes("SUPER_ADMIN") || roles.includes("ADMIN");
    if (!isAdmin && order.customer.userId !== session.user.id) {
      throw new ApiError(403, "You do not have access to this invoice.", "FORBIDDEN");
    }

    const invoiceHtml = (order.payments[0]?.metadata as any)?.invoiceHtml;
    if (!invoiceHtml) throw new ApiError(404, "Invoice document is not available.", "INVOICE_DOCUMENT_NOT_FOUND");

    return new Response(invoiceHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store"
      }
    });
  } catch (error) {
    return apiError(error);
  }
}
