import type { NextRequest } from "next/server";
import type { RoleName } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { ApiError, apiError, apiResponse } from "@/lib/api/errors";
import { isAdmin, requireApiSession, requireRoles, type ApiSession } from "@/lib/api/auth";

type PrismaDelegate = {
  findMany(args?: Record<string, unknown>): Promise<unknown[]>;
  findFirst(args?: Record<string, unknown>): Promise<unknown>;
  count(args?: Record<string, unknown>): Promise<number>;
  create(args: Record<string, unknown>): Promise<unknown>;
  update(args: Record<string, unknown>): Promise<unknown>;
};

export type ResourceConfig = {
  resource: string;
  model: string;
  delegate: PrismaDelegate;
  createSchema: z.ZodTypeAny;
  updateSchema: z.ZodTypeAny;
  readRoles: RoleName[];
  writeRoles: RoleName[];
  deleteRoles?: RoleName[];
  searchFields?: string[];
  filterFields?: string[];
  sortFields?: string[];
  include?: Record<string, unknown>;
  userField?: string;
  customerField?: string;
  gardenerField?: string;
  supervisorField?: string;
  defaultSort?: { field: string; direction: "asc" | "desc" };
};

type QueryValue = string | number | boolean | Date | null;

function parseQueryValue(value: string): QueryValue {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

async function actorScope(config: ResourceConfig, session: ApiSession) {
  if (isAdmin(session)) return {};

  if (config.userField) {
    return { [config.userField]: session.userId };
  }

  if (session.roles.includes("CUSTOMER") && config.customerField) {
    const customer = await prisma.customer.findUnique({
      where: { userId: session.userId },
      select: { id: true }
    });
    if (!customer) throw new ApiError(403, "Customer profile is required for this resource.", "CUSTOMER_PROFILE_REQUIRED");
    return { [config.customerField]: customer.id };
  }

  if (session.roles.includes("GARDENER") && config.gardenerField) {
    const gardener = await prisma.gardener.findUnique({
      where: { userId: session.userId },
      select: { id: true }
    });
    if (!gardener) throw new ApiError(403, "Gardener profile is required for this resource.", "GARDENER_PROFILE_REQUIRED");
    return { [config.gardenerField]: gardener.id };
  }

  if (session.roles.includes("SUPERVISOR") && config.supervisorField) {
    const supervisor = await prisma.supervisor.findUnique({
      where: { userId: session.userId },
      select: { id: true }
    });
    if (!supervisor) throw new ApiError(403, "Supervisor profile is required for this resource.", "SUPERVISOR_PROFILE_REQUIRED");
    return { [config.supervisorField]: supervisor.id };
  }

  return {};
}

function buildWhere(config: ResourceConfig, request: NextRequest, scope: Record<string, unknown>) {
  const params = request.nextUrl.searchParams;
  const filters: Record<string, unknown> = { deletedAt: null, ...scope };

  for (const field of config.filterFields ?? []) {
    const value = params.get(field);
    if (value !== null && value !== "") {
      filters[field] = parseQueryValue(value);
    }
  }

  const search = params.get("search")?.trim();
  if (search && config.searchFields?.length) {
    filters.OR = config.searchFields.map((field) => ({
      [field]: {
        contains: search,
        mode: "insensitive"
      }
    }));
  }

  return filters;
}

function buildOrderBy(config: ResourceConfig, request: NextRequest) {
  const sortBy = request.nextUrl.searchParams.get("sortBy") ?? config.defaultSort?.field ?? "createdAt";
  const direction = request.nextUrl.searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  if (!["createdAt", "updatedAt", ...(config.sortFields ?? [])].includes(sortBy)) {
    throw new ApiError(400, `Sorting by '${sortBy}' is not allowed.`, "INVALID_SORT");
  }

  return { [sortBy]: direction };
}

function pagination(request: NextRequest) {
  const page = Math.max(Number(request.nextUrl.searchParams.get("page") ?? 1), 1);
  const limit = Math.min(Math.max(Number(request.nextUrl.searchParams.get("limit") ?? 20), 1), 100);
  return {
    page,
    limit,
    skip: (page - 1) * limit
  };
}

async function auditLog(request: NextRequest, session: ApiSession, action: string, config: ResourceConfig, entityId: string | null, oldValue?: unknown, newValue?: unknown) {
  await prisma.activityLog.create({
    data: {
      actorUserId: session.userId,
      action,
      entityType: config.model,
      entityId,
      oldValue: oldValue === undefined ? undefined : JSON.parse(JSON.stringify(oldValue)),
      newValue: newValue === undefined ? undefined : JSON.parse(JSON.stringify(newValue)),
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      userAgent: request.headers.get("user-agent")
    }
  });
}

async function readBody(request: NextRequest) {
  return request.json().catch(() => {
    throw new ApiError(400, "Request body must be valid JSON.", "INVALID_JSON");
  });
}

function recordId(record: unknown) {
  if (record && typeof record === "object" && "id" in record && typeof record.id === "string") {
    return record.id;
  }
  return null;
}

export function createCollectionHandlers(config: ResourceConfig) {
  return {
    async GET(request: NextRequest) {
      try {
        const session = await requireApiSession();
        requireRoles(session, config.readRoles);
        const scope = await actorScope(config, session);
        const where = buildWhere(config, request, scope);
        const { page, limit, skip } = pagination(request);
        const orderBy = buildOrderBy(config, request);

        const [items, total] = await Promise.all([
          config.delegate.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            ...(config.include ? { include: config.include } : {})
          }),
          config.delegate.count({ where })
        ]);

        return apiResponse({
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        });
      } catch (error) {
        return apiError(error);
      }
    },
    async POST(request: NextRequest) {
      try {
        const session = await requireApiSession();
        requireRoles(session, config.writeRoles);
        const body = await readBody(request);
        const data = config.createSchema.parse(body);
        const created = await config.delegate.create({ data });
        await auditLog(request, session, "CREATE", config, recordId(created), undefined, created);
        return apiResponse(created, { status: 201 });
      } catch (error) {
        return apiError(error);
      }
    }
  };
}

export function createItemHandlers(config: ResourceConfig) {
  return {
    async GET(request: NextRequest, context: { params: { id: string } }) {
      try {
        const session = await requireApiSession();
        requireRoles(session, config.readRoles);
        const scope = await actorScope(config, session);
        const item = await config.delegate.findFirst({
          where: {
            id: context.params.id,
            deletedAt: null,
            ...scope
          },
          ...(config.include ? { include: config.include } : {})
        });
        if (!item) throw new ApiError(404, `${config.resource} not found.`, "NOT_FOUND");
        return apiResponse(item);
      } catch (error) {
        return apiError(error);
      }
    },
    async PATCH(request: NextRequest, context: { params: { id: string } }) {
      try {
        const session = await requireApiSession();
        requireRoles(session, config.writeRoles);
        const scope = await actorScope(config, session);
        const existing = await config.delegate.findFirst({
          where: {
            id: context.params.id,
            deletedAt: null,
            ...scope
          }
        });
        if (!existing) throw new ApiError(404, `${config.resource} not found.`, "NOT_FOUND");
        const body = await readBody(request);
        const data = config.updateSchema.parse(body);
        const updated = await config.delegate.update({
          where: { id: context.params.id },
          data
        });
        await auditLog(request, session, "UPDATE", config, context.params.id, existing, updated);
        return apiResponse(updated);
      } catch (error) {
        return apiError(error);
      }
    },
    async DELETE(request: NextRequest, context: { params: { id: string } }) {
      try {
        const session = await requireApiSession();
        requireRoles(session, config.deleteRoles ?? config.writeRoles);
        const scope = await actorScope(config, session);
        const existing = await config.delegate.findFirst({
          where: {
            id: context.params.id,
            deletedAt: null,
            ...scope
          }
        });
        if (!existing) throw new ApiError(404, `${config.resource} not found.`, "NOT_FOUND");
        const deleted = await config.delegate.update({
          where: { id: context.params.id },
          data: { deletedAt: new Date() }
        });
        await auditLog(request, session, "DELETE", config, context.params.id, existing, deleted);
        return apiResponse(deleted);
      } catch (error) {
        return apiError(error);
      }
    }
  };
}
