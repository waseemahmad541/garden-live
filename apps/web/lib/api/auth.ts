import type { RoleName } from "@prisma/client";
import { auth } from "@/auth";
import { ApiError } from "@/lib/api/errors";

export type ApiSession = {
  userId: string;
  roles: RoleName[];
};

export const adminRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN"];
export const operationsRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN", "SUPERVISOR", "GARDENER"];
export const allBusinessRoles: RoleName[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "SUPERVISOR",
  "GARDENER",
  "CUSTOMER",
  "NURSERY_PARTNER",
  "LANDSCAPE_PARTNER",
  "FRANCHISE_PARTNER"
];

export async function requireApiSession() {
  const session = await auth();
  const userId = session?.user?.id;
  const roles = session?.user?.roles ?? [];

  if (!userId) {
    throw new ApiError(401, "Authentication required.", "UNAUTHENTICATED");
  }

  return { userId, roles };
}

export function requireRoles(session: ApiSession, allowedRoles: RoleName[]) {
  if (!allowedRoles.some((role) => session.roles.includes(role))) {
    throw new ApiError(403, "You do not have permission to perform this action.", "FORBIDDEN");
  }
}

export function isAdmin(session: ApiSession) {
  return adminRoles.some((role) => session.roles.includes(role));
}
