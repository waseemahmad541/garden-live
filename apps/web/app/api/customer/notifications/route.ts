import { prisma } from "@/lib/db/prisma";
import { requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";
import { enforceCsrf } from "@/lib/security/csrf";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireApiSession();
    requireRoles(session, ["CUSTOMER", "ADMIN"]);
    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    return apiResponse(notifications);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    enforceCsrf(request);
    const session = await requireApiSession();
    requireRoles(session, ["CUSTOMER", "ADMIN"]);
    await prisma.notification.updateMany({
      where: { userId: session.userId, readAt: null, deletedAt: null },
      data: { readAt: new Date(), status: "READ" }
    });
    return apiResponse({ markedRead: true });
  } catch (error) {
    return apiError(error);
  }
}
