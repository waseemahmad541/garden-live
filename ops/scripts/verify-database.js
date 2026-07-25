const { createRequire } = require("node:module");
const path = require("node:path");

const databaseRequire = createRequire(path.resolve(__dirname, "../../packages/database/package.json"));
const { PrismaClient } = databaseRequire("@prisma/client");

const prisma = new PrismaClient();

const delegates = [
  ["roles", prisma.role],
  ["users", prisma.user],
  ["auth_otp_codes", prisma.authOtpCode],
  ["auth_tokens", prisma.authToken],
  ["user_roles", prisma.userRole],
  ["customers", prisma.customer],
  ["gardeners", prisma.gardener],
  ["supervisors", prisma.supervisor],
  ["addresses", prisma.address],
  ["gardens", prisma.garden],
  ["plants", prisma.plant],
  ["plant_passports", prisma.plantPassport],
  ["plant_timelines", prisma.plantTimeline],
  ["ai_diagnoses", prisma.aIDiagnosis],
  ["garden_health_scores", prisma.gardenHealthScore],
  ["membership_plans", prisma.membershipPlan],
  ["active_memberships", prisma.activeMembership],
  ["categories", prisma.category],
  ["products", prisma.product],
  ["inventory", prisma.inventory],
  ["inventory_movements", prisma.inventoryMovement],
  ["carts", prisma.cart],
  ["cart_items", prisma.cartItem],
  ["wishlists", prisma.wishlist],
  ["orders", prisma.order],
  ["order_items", prisma.orderItem],
  ["payments", prisma.payment],
  ["garden_projects", prisma.gardenProject],
  ["garden_visits", prisma.gardenVisit],
  ["attendance", prisma.attendance],
  ["service_requests", prisma.serviceRequest],
  ["maintenance_schedules", prisma.maintenanceSchedule],
  ["plant_insurance", prisma.plantInsurance],
  ["insurance_claims", prisma.insuranceClaim],
  ["qr_codes", prisma.qRCode],
  ["green_coin_accounts", prisma.greenCoinAccount],
  ["green_coin_transactions", prisma.greenCoinTransaction],
  ["rewards", prisma.reward],
  ["coupons", prisma.coupon],
  ["coupon_redemptions", prisma.couponRedemption],
  ["notifications", prisma.notification],
  ["soil_test_reports", prisma.soilTestReport],
  ["water_test_reports", prisma.waterTestReport],
  ["tender_projects", prisma.tenderProject],
  ["documents", prisma.document],
  ["media_files", prisma.mediaFile],
  ["activity_logs", prisma.activityLog]
];

async function main() {
  const rows = [];
  for (const [table, delegate] of delegates) {
    const count = await delegate.count();
    rows.push({ table, count });
  }

  console.table(rows);

  const requiredSeed = {
    roles: await prisma.role.count(),
    membershipPlans: await prisma.membershipPlan.count({ where: { isActive: true, deletedAt: null } }),
    categories: await prisma.category.count({ where: { deletedAt: null } }),
    demoUsers: await prisma.user.count({ where: { phone: { in: ["9000000001", "9000000002"] }, deletedAt: null } }),
    demoProducts: await prisma.product.count({ where: { sku: { in: ["GL-PLANT-MONEY-001", "GL-PALM-ARECA-001"] }, deletedAt: null } })
  };

  console.table([requiredSeed]);

  if (requiredSeed.roles < 8 || requiredSeed.membershipPlans < 6 || requiredSeed.categories < 16 || requiredSeed.demoUsers < 2 || requiredSeed.demoProducts < 2) {
    throw new Error("Seed verification failed. Run migrations and pnpm --filter @garden-live/database db:seed again.");
  }
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
