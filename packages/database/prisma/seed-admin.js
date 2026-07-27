const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const adminEmail = "admin@gardenlive.in";
const adminPhone = "9000000001";
const adminPasswordHash = "$2a$12$zVBFzh9gBfs/4j9lsDYruuva9B9w6Jx4gDaJU0zLayzPuOa/8Q6VC";

async function main() {
  const role = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {
      description: "Garden Live operations, catalog, finance, and support administrator.",
      deletedAt: null
    },
    create: {
      name: "ADMIN",
      description: "Garden Live operations, catalog, finance, and support administrator."
    }
  });

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: adminEmail }, { phone: adminPhone }]
    }
  });

  const admin = existingUser
    ? await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: "Garden Live Admin",
          email: adminEmail,
          phone: adminPhone,
          passwordHash: adminPasswordHash,
          status: "ACTIVE",
          emailVerifiedAt: new Date(),
          phoneVerifiedAt: new Date(),
          deletedAt: null
        }
      })
    : await prisma.user.create({
        data: {
          name: "Garden Live Admin",
          email: adminEmail,
          phone: adminPhone,
          passwordHash: adminPasswordHash,
          status: "ACTIVE",
          emailVerifiedAt: new Date(),
          phoneVerifiedAt: new Date()
        }
      });

  await prisma.userRole.updateMany({
    where: {
      userId: admin.id,
      roleId: { not: role.id },
      deletedAt: null
    },
    data: { deletedAt: new Date() }
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: role.id
      }
    },
    update: { deletedAt: null },
    create: {
      userId: admin.id,
      roleId: role.id
    }
  });

  await prisma.activityLog.create({
    data: {
      actorUserId: admin.id,
      action: "SEED_PRODUCTION_ADMIN",
      entityType: "User",
      entityId: admin.id,
      metadata: {
        email: adminEmail,
        role: "ADMIN",
        passwordHashAlgorithm: "bcrypt"
      }
    }
  });

  console.log(`Production ADMIN user ready: ${adminEmail}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
