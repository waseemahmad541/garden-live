import { prisma } from "@/lib/db/prisma";
import { adminRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const session = await requireApiSession();
    requireRoles(session, adminRoles);
    const now = new Date();
    const expired = await prisma.activeMembership.updateMany({
      where: {
        deletedAt: null,
        status: "ACTIVE",
        endDate: { lt: now }
      },
      data: { status: "EXPIRED" }
    });

    await prisma.activityLog.create({
      data: {
        actorUserId: session.userId,
        action: "MEMBERSHIPS_AUTO_EXPIRED",
        entityType: "ActiveMembership",
        metadata: { count: expired.count, expiredAt: now.toISOString() }
      }
    });

    return apiResponse({ expired: expired.count, generatedAt: now.toISOString() });
  } catch (error) {
    return apiError(error);
  }
}
