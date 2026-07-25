import { prisma } from "@/lib/db/prisma";
import { requireApiSession } from "@/lib/api/auth";
import { apiError, ApiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireApiSession();
    const customer = await prisma.customer.findUnique({
      where: { userId: session.userId },
      include: {
        user: true,
        gardens: {
          where: { deletedAt: null },
          include: {
            address: true,
            plants: {
              where: { deletedAt: null },
              include: { passport: true },
              orderBy: { updatedAt: "desc" },
              take: 20
            },
            healthScores: {
              where: { deletedAt: null },
              orderBy: { createdAt: "desc" },
              take: 1
            },
            visits: {
              where: { deletedAt: null },
              orderBy: { scheduledAt: "asc" },
              take: 5,
              include: { gardener: { include: { user: true } } }
            }
          }
        },
        activeMemberships: {
          where: { deletedAt: null },
          include: { plan: true, payments: { orderBy: { createdAt: "desc" }, take: 6 } },
          orderBy: { createdAt: "desc" },
          take: 3
        },
        orders: {
          where: { deletedAt: null },
          include: { items: true, payments: true },
          orderBy: { createdAt: "desc" },
          take: 6
        },
        aiDiagnoses: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
          take: 6
        },
        greenCoinAccount: { include: { transactions: { orderBy: { createdAt: "desc" }, take: 6 } } },
        rewards: { where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 6 },
        plantInsurance: { where: { deletedAt: null }, include: { plant: true }, take: 8 },
        insuranceClaims: { where: { deletedAt: null }, orderBy: { createdAt: "desc" }, take: 6 }
      }
    });

    if (!customer) throw new ApiError(403, "Customer profile is required.", "CUSTOMER_PROFILE_REQUIRED");

    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    const primaryGarden = customer.gardens[0];
    const healthScore = primaryGarden?.healthScores[0]?.overallScore ?? null;

    return apiResponse({
      customer: {
        id: customer.id,
        name: customer.user.name,
        email: customer.user.email,
        phone: customer.user.phone,
        referralCode: customer.referralCode
      },
      summary: {
        gardenCount: customer.gardens.length,
        plantCount: customer.gardens.reduce((sum, garden) => sum + garden.plants.length, 0),
        healthScore,
        activeMembership: customer.activeMemberships.find((membership) => membership.status === "ACTIVE") ?? customer.activeMemberships[0] ?? null,
        upcomingVisit: customer.gardens.flatMap((garden) => garden.visits).find((visit) => new Date(visit.scheduledAt) >= new Date()) ?? null,
        aiReportCount: customer.aiDiagnoses.length,
        greenCoins: customer.greenCoinAccount?.balance ?? 0
      },
      gardens: customer.gardens,
      memberships: customer.activeMemberships,
      orders: customer.orders,
      aiDiagnoses: customer.aiDiagnoses,
      notifications,
      rewards: customer.rewards,
      greenCoinAccount: customer.greenCoinAccount,
      plantInsurance: customer.plantInsurance,
      insuranceClaims: customer.insuranceClaims
    });
  } catch (error) {
    return apiError(error);
  }
}
