import { prisma } from "@/lib/db/prisma";
import { adminRoles, operationsRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";

const allowedRoles = Array.from(new Set([...adminRoles, ...operationsRoles]));

export const dynamic = "force-dynamic";

function money(value: unknown) {
  return Number(value ?? 0);
}

export async function GET() {
  try {
    const session = await requireApiSession();
    requireRoles(session, allowedRoles);

    const [
      customers,
      activeGardens,
      activeMemberships,
      openOrders,
      revenue,
      visits,
      projects,
      aiReports,
      claims,
      inventories
    ] = await Promise.all([
      prisma.customer.count({ where: { deletedAt: null } }),
      prisma.garden.count({ where: { deletedAt: null, status: "ACTIVE" } }),
      prisma.activeMembership.count({ where: { deletedAt: null, status: "ACTIVE" } }),
      prisma.order.count({ where: { deletedAt: null, status: { in: ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY"] } } }),
      prisma.payment.aggregate({ where: { deletedAt: null, status: "PAID" }, _sum: { amount: true } }),
      prisma.gardenVisit.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { status: true } }),
      prisma.gardenProject.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { status: true } }),
      prisma.aIDiagnosis.count({ where: { deletedAt: null } }),
      prisma.insuranceClaim.groupBy({ by: ["status"], where: { deletedAt: null }, _count: { status: true } }),
      prisma.inventory.findMany({
        where: { deletedAt: null },
        select: { stockQuantity: true, lowStockThreshold: true }
      })
    ]);

    return apiResponse({
      metrics: {
        customers,
        activeGardens,
        activeMemberships,
        openOrders,
        revenue: money(revenue._sum.amount),
        aiReports,
        lowStock: inventories.filter((item) => item.stockQuantity <= item.lowStockThreshold).length
      },
      visits: visits.map((item) => ({ status: item.status, count: item._count.status })),
      projects: projects.map((item) => ({ status: item.status, count: item._count.status })),
      claims: claims.map((item) => ({ status: item.status, count: item._count.status })),
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return apiError(error);
  }
}
