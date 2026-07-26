import { prisma } from "@/lib/db/prisma";
import { adminRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";

export const dynamic = "force-dynamic";

type PaymentProviderValue = "RAZORPAY" | "STRIPE" | "CASH" | "BANK_TRANSFER" | "UPI";
type PaymentStatusValue = "CREATED" | "PAID" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";
type VisitStatusValue = "SCHEDULED" | "ASSIGNED" | "ON_THE_WAY" | "IN_PROGRESS" | "COMPLETED" | "MISSED" | "CANCELLED";

interface PaymentGroup {
  provider: PaymentProviderValue;
  status: PaymentStatusValue;
  _sum: {
    amount: unknown;
  };
  _count: {
    id: number;
  };
}

interface VisitStatusGroup {
  status: VisitStatusValue;
  _count: {
    id: number;
  };
}

function money(value: unknown) {
  return Number(value ?? 0);
}

export async function GET() {
  try {
    const session = await requireApiSession();
    requireRoles(session, adminRoles);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalCustomers,
      activeMemberships,
      revenue,
      todayBookings,
      aiScans,
      avgHealth,
      customers,
      gardeners,
      supervisors,
      orders,
      lowStock,
      payments,
      visitsByStatus
    ] = await Promise.all([
      prisma.customer.count({ where: { deletedAt: null } }),
      prisma.activeMembership.count({ where: { deletedAt: null, status: "ACTIVE" } }),
      prisma.payment.aggregate({ where: { deletedAt: null, status: "PAID" }, _sum: { amount: true } }),
      prisma.serviceRequest.count({ where: { deletedAt: null, createdAt: { gte: today, lt: tomorrow } } }),
      prisma.aIDiagnosis.count({ where: { deletedAt: null } }),
      prisma.gardenHealthScore.aggregate({ where: { deletedAt: null }, _avg: { overallScore: true } }),
      prisma.customer.findMany({
        where: { deletedAt: null },
        include: { user: true, activeMemberships: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 } },
        orderBy: { createdAt: "desc" },
        take: 8
      }),
      prisma.gardener.findMany({
        where: { deletedAt: null },
        include: { user: true, attendance: { orderBy: { date: "desc" }, take: 1 }, visits: { where: { deletedAt: null }, take: 5 } },
        orderBy: { updatedAt: "desc" },
        take: 8
      }),
      prisma.supervisor.findMany({ where: { deletedAt: null }, include: { user: true }, take: 8 }),
      prisma.order.findMany({ where: { deletedAt: null }, include: { customer: { include: { user: true } }, items: true }, orderBy: { createdAt: "desc" }, take: 8 }),
      prisma.inventory.count({ where: { deletedAt: null, stockQuantity: { lte: 5 } } }),
      prisma.payment.groupBy({ by: ["provider", "status"], where: { deletedAt: null }, _sum: { amount: true }, _count: { id: true } }),
      prisma.gardenVisit.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { id: true } })
    ]);

    return apiResponse({
      metrics: {
        totalCustomers,
        activeMemberships,
        revenue: money(revenue._sum.amount),
        todayBookings,
        aiScans,
        avgGardenHealth: Math.round(Number(avgHealth._avg.overallScore ?? 0)),
        lowStock
      },
      customers,
      gardeners,
      supervisors,
      orders,
      payments: (payments as PaymentGroup[]).map((item) => ({ provider: item.provider, status: item.status, amount: money(item._sum.amount), count: item._count.id })),
      visitsByStatus: (visitsByStatus as VisitStatusGroup[]).map((item) => ({ status: item.status, count: item._count.id })),
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return apiError(error);
  }
}
