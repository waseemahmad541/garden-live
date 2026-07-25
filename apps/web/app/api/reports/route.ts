import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { allBusinessRoles, requireApiSession, requireRoles } from "@/lib/api/auth";
import { apiError, apiResponse } from "@/lib/api/errors";
import { getResourceConfig } from "@/lib/api/resources";

export const dynamic = "force-dynamic";

const moduleResourceMap: Record<string, string[]> = {
  membership: ["membership-plans", "memberships", "payments", "green-coins"],
  nursery: ["categories", "products", "inventory", "orders"],
  landscaping: ["projects", "garden-visits", "documents", "payments"],
  maintenance: ["garden-services", "maintenance-schedules", "garden-visits", "attendance"],
  gardener: ["gardeners", "attendance", "garden-visits", "maintenance-schedules"],
  supervisor: ["supervisors", "projects", "garden-visits", "insurance-claims"],
  ai: ["ai-diagnoses", "plants", "plant-timelines"],
  passport: ["plant-passports", "qr-codes", "plant-timelines"],
  customer: ["customers", "gardens", "plants", "orders", "memberships"],
  tender: ["tender-projects", "documents", "projects"]
};

async function countResource(resource: string) {
  const config = getResourceConfig(resource);
  if (!config) return null;
  const total = await config.delegate.count({ where: { deletedAt: null } });
  return { resource, model: config.model, total };
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireApiSession();
    requireRoles(session, allBusinessRoles);
    const moduleName = request.nextUrl.searchParams.get("module") ?? "customer";
    const resources = moduleResourceMap[moduleName] ?? moduleResourceMap.customer;

    const [resourceCounts, recentActivity, notifications] = await Promise.all([
      Promise.all(resources.map(countResource)),
      prisma.activityLog.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 12
      }),
      prisma.notification.groupBy({
        by: ["status"],
        where: { deletedAt: null },
        _count: { status: true }
      })
    ]);

    const cleanCounts = resourceCounts.filter(Boolean);
    const totalRecords = cleanCounts.reduce((sum, item) => sum + (item?.total ?? 0), 0);

    return apiResponse({
      module: moduleName,
      summary: {
        resources: cleanCounts.length,
        totalRecords,
        generatedAt: new Date().toISOString()
      },
      resources: cleanCounts,
      notifications: notifications.map((item) => ({
        status: item.status,
        count: item._count.status
      })),
      recentActivity
    });
  } catch (error) {
    return apiError(error);
  }
}
