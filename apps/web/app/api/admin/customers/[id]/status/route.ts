import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse, ApiError } from "@/lib/api/errors";
import { enforceCsrf } from "@/lib/security/csrf";
import { enforceRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

const statusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"])
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    enforceRateLimit(request, "admin-customer-status", 60, 60_000);
    enforceCsrf(request);

    const session = await requireApiSession();
    requireRoles(session, ["ADMIN"]);

    const input = statusSchema.parse(await request.json().catch(() => ({})));
    const customer = await prisma.customer.findFirst({
      where: { id: params.id, deletedAt: null },
      select: { id: true, userId: true }
    });

    if (!customer) throw new ApiError(404, "Customer not found.", "CUSTOMER_NOT_FOUND");

    const user = await prisma.user.update({
      where: { id: customer.userId },
      data: { status: input.status },
      select: { id: true, name: true, email: true, phone: true, status: true, updatedAt: true }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: `CUSTOMER_${input.status}`,
        entityType: "Customer",
        entityId: customer.id,
        metadata: { userId: customer.userId, status: input.status }
      }
    });

    return apiResponse({ customerId: customer.id, user });
  } catch (error) {
    return apiError(error);
  }
}
