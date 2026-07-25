import type { RoleName, User } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function ensureRole(name: RoleName) {
  return prisma.role.upsert({
    where: { name },
    update: {},
    create: { name }
  });
}

export async function assignRole(userId: string, roleName: RoleName) {
  const role = await ensureRole(roleName);

  return prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId,
        roleId: role.id
      }
    },
    update: {},
    create: {
      userId,
      roleId: role.id
    }
  });
}

export async function getUserRoles(userId: string) {
  const roles = await prisma.userRole.findMany({
    where: {
      userId,
      deletedAt: null,
      role: {
        deletedAt: null
      }
    },
    include: {
      role: true
    }
  });

  return roles.map((item) => item.role.name);
}

export async function createCustomerProfileIfNeeded(user: User) {
  await prisma.customer.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      referralCode: `GL${user.id.slice(0, 8).toUpperCase()}`
    }
  });
}

export async function loadAuthUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null
    },
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  });

  if (!user) return null;

  return {
    ...user,
    roleNames: user.roles.filter((item) => !item.deletedAt && !item.role.deletedAt).map((item) => item.role.name)
  };
}
