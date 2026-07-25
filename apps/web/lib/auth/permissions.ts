import type { RoleName } from "@prisma/client";

export const roleHome: Record<RoleName, string> = {
  SUPER_ADMIN: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  SUPERVISOR: "/supervisor/dashboard",
  GARDENER: "/gardener/dashboard",
  CUSTOMER: "/customer/dashboard",
  NURSERY_PARTNER: "/partner/nursery",
  LANDSCAPE_PARTNER: "/partner/landscape",
  FRANCHISE_PARTNER: "/partner/franchise"
};

export const routePermissions: Array<{ prefix: string; roles: RoleName[] }> = [
  { prefix: "/admin", roles: ["SUPER_ADMIN", "ADMIN"] },
  { prefix: "/supervisor", roles: ["SUPER_ADMIN", "ADMIN", "SUPERVISOR"] },
  { prefix: "/gardener", roles: ["SUPER_ADMIN", "ADMIN", "GARDENER"] },
  { prefix: "/customer", roles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"] },
  { prefix: "/partner/nursery", roles: ["SUPER_ADMIN", "ADMIN", "NURSERY_PARTNER"] },
  { prefix: "/partner/landscape", roles: ["SUPER_ADMIN", "ADMIN", "LANDSCAPE_PARTNER"] },
  { prefix: "/partner/franchise", roles: ["SUPER_ADMIN", "ADMIN", "FRANCHISE_PARTNER"] }
];

export function hasRouteAccess(pathname: string, roles: string[] = []) {
  const permission = routePermissions.find((item) => pathname.startsWith(item.prefix));
  if (!permission) return true;
  return permission.roles.some((role) => roles.includes(role));
}

export function getPrimaryRole(roles: string[] = []) {
  return (
    ([
      "SUPER_ADMIN",
      "ADMIN",
      "SUPERVISOR",
      "GARDENER",
      "CUSTOMER",
      "NURSERY_PARTNER",
      "LANDSCAPE_PARTNER",
      "FRANCHISE_PARTNER"
    ].find((role) => roles.includes(role)) as RoleName | undefined) ?? "CUSTOMER"
  );
}
