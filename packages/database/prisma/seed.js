const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const roles = [
  ["SUPER_ADMIN", "Full platform owner with unrestricted access."],
  ["ADMIN", "Garden Live operations, catalog, finance, and support administrator."],
  ["SUPERVISOR", "Field operations supervisor for gardens, projects, and visits."],
  ["GARDENER", "Assigned gardener for maintenance, attendance, and visit reports."],
  ["CUSTOMER", "Garden Live customer and membership holder."],
  ["NURSERY_PARTNER", "Nursery partner managing plant supply and inventory."],
  ["LANDSCAPE_PARTNER", "Landscape partner managing project execution."],
  ["FRANCHISE_PARTNER", "Regional franchise partner for multi-city operations."]
];

const membershipPlans = [
  {
    name: "Plant Care",
    slug: "plant-care",
    price: "299.00",
    durationDays: 30,
    visitCount: 0,
    plantCountLimit: 5,
    aiDoctorLimit: 5,
    replacementCoverageCount: 0,
    storeDiscountPercentage: "2.00",
    rewardMultiplier: "1.00",
    features: ["AI plant doctor credits", "Care reminders", "Garden timeline"]
  },
  {
    name: "Smart Garden",
    slug: "smart-garden",
    price: "999.00",
    durationDays: 30,
    visitCount: 1,
    plantCountLimit: 15,
    aiDoctorLimit: 15,
    replacementCoverageCount: 1,
    storeDiscountPercentage: "5.00",
    rewardMultiplier: "1.25",
    features: ["Monthly garden visit", "QR plant passports", "Basic Green Promise"]
  },
  {
    name: "Home Garden",
    slug: "home-garden",
    price: "3999.00",
    durationDays: 30,
    visitCount: 4,
    plantCountLimit: 50,
    aiDoctorLimit: 50,
    replacementCoverageCount: 3,
    storeDiscountPercentage: "8.00",
    rewardMultiplier: "1.50",
    features: ["Weekly maintenance", "Before/after reports", "Plant replacement eligibility"]
  },
  {
    name: "Premium Garden",
    slug: "premium-garden",
    price: "7999.00",
    durationDays: 30,
    visitCount: 8,
    plantCountLimit: 100,
    aiDoctorLimit: 100,
    replacementCoverageCount: 6,
    storeDiscountPercentage: "10.00",
    rewardMultiplier: "2.00",
    features: ["Twice-weekly maintenance", "Supervisor review", "Priority support"]
  },
  {
    name: "Luxury Garden",
    slug: "luxury-garden",
    price: "14999.00",
    durationDays: 30,
    visitCount: 12,
    plantCountLimit: 250,
    aiDoctorLimit: 250,
    replacementCoverageCount: 12,
    storeDiscountPercentage: "15.00",
    rewardMultiplier: "2.50",
    features: ["Premium maintenance", "Expert consultation", "Advanced garden health analytics"]
  },
  {
    name: "Dedicated Gardener",
    slug: "dedicated-gardener",
    price: "30000.00",
    durationDays: 30,
    visitCount: 26,
    plantCountLimit: null,
    aiDoctorLimit: 500,
    replacementCoverageCount: 25,
    storeDiscountPercentage: "20.00",
    rewardMultiplier: "3.00",
    features: ["Dedicated gardener", "Daily attendance", "Supervisor escalation", "Corporate-grade reporting"]
  }
];

const categories = [
  "Indoor Plants",
  "Palm Collection",
  "Fruit Plants",
  "Timber Plants",
  "Shrubs",
  "Creepers",
  "Ground Cover",
  "Topiary",
  "Vertical Garden",
  "Flower Plants",
  "Pots & Planters",
  "Garden Accessories",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Garden Tools",
  "Smart Garden Kit",
  "Irrigation",
  "Garden Furniture"
];

const demoPasswordHash = "$2a$10$oDBiz/BHc.BeStkPo0nzpeLGUI90z7.iF2IiSqYgXnAIfbABFKt/C";

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function assignRole(userId, roleName) {
  const role = await prisma.role.findUniqueOrThrow({ where: { name: roleName } });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId, roleId: role.id } },
    update: { deletedAt: null },
    create: { userId, roleId: role.id }
  });
}

async function ensureAddress(userId) {
  const existing = await prisma.address.findFirst({
    where: { userId, name: "Garden Live Demo Home", deletedAt: null }
  });
  if (existing) return existing;

  return prisma.address.create({
    data: {
      userId,
      type: "HOME",
      name: "Garden Live Demo Home",
      phone: "9000000002",
      line1: "Demo Villa, Garden Live Enclave",
      line2: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      country: "India",
      latitude: "19.0596000",
      longitude: "72.8295000",
      isDefault: true
    }
  });
}

async function ensureDemoData() {
  const admin = await prisma.user.upsert({
    where: { phone: "9000000001" },
    update: {
      name: "Garden Live Admin",
      email: "admin@gardenlive.in",
      passwordHash: demoPasswordHash,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
      phoneVerifiedAt: new Date(),
      deletedAt: null
    },
    create: {
      name: "Garden Live Admin",
      phone: "9000000001",
      email: "admin@gardenlive.in",
      passwordHash: demoPasswordHash,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
      phoneVerifiedAt: new Date()
    }
  });
  await assignRole(admin.id, "SUPER_ADMIN");

  const user = await prisma.user.upsert({
    where: { phone: "9000000002" },
    update: {
      name: "Aarav Mehta",
      email: "customer@gardenlive.in",
      passwordHash: demoPasswordHash,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
      phoneVerifiedAt: new Date(),
      deletedAt: null
    },
    create: {
      name: "Aarav Mehta",
      phone: "9000000002",
      email: "customer@gardenlive.in",
      passwordHash: demoPasswordHash,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
      phoneVerifiedAt: new Date()
    }
  });
  await assignRole(user.id, "CUSTOMER");

  const customer = await prisma.customer.upsert({
    where: { userId: user.id },
    update: { preferredLanguage: "en-IN", referralCode: "GL-AARAV", deletedAt: null },
    create: { userId: user.id, preferredLanguage: "en-IN", referralCode: "GL-AARAV" }
  });

  const address = await ensureAddress(user.id);
  const garden = await prisma.garden.upsert({
    where: { id: (await prisma.garden.findFirst({ where: { customerId: customer.id, name: "Aarav's Premium Terrace Garden" } }))?.id ?? "00000000-0000-0000-0000-000000000001" },
    update: {
      addressId: address.id,
      type: "TERRACE",
      status: "ACTIVE",
      areaSqft: 850,
      sunlightType: "Morning direct sun with filtered afternoon light",
      waterSource: "Automated drip irrigation",
      notes: "Demo garden for production verification.",
      deletedAt: null
    },
    create: {
      customerId: customer.id,
      addressId: address.id,
      name: "Aarav's Premium Terrace Garden",
      type: "TERRACE",
      status: "ACTIVE",
      areaSqft: 850,
      sunlightType: "Morning direct sun with filtered afternoon light",
      waterSource: "Automated drip irrigation",
      notes: "Demo garden for production verification."
    }
  });

  const plant = await prisma.plant.upsert({
    where: { id: (await prisma.plant.findFirst({ where: { customerId: customer.id, name: "Areca Palm" } }))?.id ?? "00000000-0000-0000-0000-000000000002" },
    update: {
      gardenId: garden.id,
      species: "Dypsis lutescens",
      category: "PALM",
      healthStatus: "HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=1200&q=80",
      replacementEligible: true,
      careNotes: "Keep soil lightly moist and rotate weekly.",
      deletedAt: null
    },
    create: {
      gardenId: garden.id,
      customerId: customer.id,
      name: "Areca Palm",
      species: "Dypsis lutescens",
      category: "PALM",
      healthStatus: "HEALTHY",
      imageUrl: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=1200&q=80",
      plantedAt: new Date("2026-01-15T00:00:00.000Z"),
      lastCheckedAt: new Date(),
      replacementEligible: true,
      careNotes: "Keep soil lightly moist and rotate weekly."
    }
  });

  const qrCode = await prisma.qRCode.upsert({
    where: { code: "GL-PLANT-ARECA-001" },
    update: {
      entityType: "PLANT",
      entityId: plant.id,
      plantId: plant.id,
      gardenId: garden.id,
      url: "https://gardenlive.in/qr-plant-passport?code=GL-PLANT-ARECA-001",
      deletedAt: null
    },
    create: {
      code: "GL-PLANT-ARECA-001",
      entityType: "PLANT",
      entityId: plant.id,
      plantId: plant.id,
      gardenId: garden.id,
      url: "https://gardenlive.in/qr-plant-passport?code=GL-PLANT-ARECA-001"
    }
  });

  await prisma.plantPassport.upsert({
    where: { plantId: plant.id },
    update: {
      passportCode: "GL-PASS-ARECA-001",
      qrCodeId: qrCode.id,
      origin: "Garden Live Premium Nursery, Maharashtra",
      wateringFrequency: "Twice weekly",
      fertilizerFrequency: "Monthly organic feed",
      sunlightRequirement: "Bright indirect light",
      warrantyStatus: "Eligible",
      warrantyStartDate: new Date("2026-01-15T00:00:00.000Z"),
      warrantyEndDate: new Date("2026-07-15T00:00:00.000Z"),
      nextServiceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deletedAt: null
    },
    create: {
      plantId: plant.id,
      passportCode: "GL-PASS-ARECA-001",
      qrCodeId: qrCode.id,
      origin: "Garden Live Premium Nursery, Maharashtra",
      plantDetails: { height: "4 ft", potSize: "12 inch", age: "18 months" },
      careSchedule: { watering: "Twice weekly", fertilizer: "Monthly", pruning: "Quarterly" },
      wateringFrequency: "Twice weekly",
      fertilizerFrequency: "Monthly organic feed",
      sunlightRequirement: "Bright indirect light",
      warrantyStatus: "Eligible",
      warrantyStartDate: new Date("2026-01-15T00:00:00.000Z"),
      warrantyEndDate: new Date("2026-07-15T00:00:00.000Z"),
      nextServiceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.gardenHealthScore.create({
    data: {
      gardenId: garden.id,
      customerId: customer.id,
      overallScore: 91,
      plantHealthScore: 94,
      soilScore: 88,
      waterScore: 90,
      pestRiskScore: 12,
      maintenanceScore: 96,
      aiConfidenceScore: 93,
      summary: "Demo terrace garden is healthy with excellent maintenance adherence.",
      recommendations: ["Continue weekly inspection", "Add micronutrient spray after next pruning"]
    }
  });

  const plan = await prisma.membershipPlan.findUniqueOrThrow({ where: { slug: "premium-garden" } });
  const membership = await prisma.activeMembership.upsert({
    where: { id: (await prisma.activeMembership.findFirst({ where: { customerId: customer.id, planId: plan.id } }))?.id ?? "00000000-0000-0000-0000-000000000003" },
    update: {
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      remainingVisits: plan.visitCount,
      remainingAiCredits: plan.aiDoctorLimit,
      remainingReplacements: plan.replacementCoverageCount,
      autoRenew: true,
      deletedAt: null
    },
    create: {
      customerId: customer.id,
      planId: plan.id,
      status: "ACTIVE",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      remainingVisits: plan.visitCount,
      remainingAiCredits: plan.aiDoctorLimit,
      remainingReplacements: plan.replacementCoverageCount,
      autoRenew: true
    }
  });

  const indoorCategory = await prisma.category.findUniqueOrThrow({ where: { slug: "indoor-plants" } });
  const palmCategory = await prisma.category.findUniqueOrThrow({ where: { slug: "palm-collection" } });
  const products = [
    {
      categoryId: indoorCategory.id,
      name: "Premium Money Plant",
      slug: "premium-money-plant",
      sku: "GL-PLANT-MONEY-001",
      description: "Air-purifying indoor money plant curated for Garden Live memberships.",
      hsnCode: "0602",
      gstRate: "5.00",
      price: "699.00",
      salePrice: "599.00",
      status: "ACTIVE",
      isAiRecommended: true,
      stockQuantity: 120
    },
    {
      categoryId: palmCategory.id,
      name: "Luxury Areca Palm",
      slug: "luxury-areca-palm",
      sku: "GL-PALM-ARECA-001",
      description: "Premium Areca Palm for balcony, terrace, and living room gardens.",
      hsnCode: "0602",
      gstRate: "5.00",
      price: "1899.00",
      salePrice: "1599.00",
      status: "ACTIVE",
      isAiRecommended: true,
      stockQuantity: 42
    }
  ];

  const seededProducts = [];
  for (const product of products) {
    const { categoryId, stockQuantity, ...productData } = product;
    const seededProduct = await prisma.product.upsert({
      where: { sku: product.sku },
      update: { ...productData, category: { connect: { id: categoryId } }, deletedAt: null },
      create: { ...productData, category: { connect: { id: categoryId } } }
    });
    await prisma.inventory.upsert({
      where: { productId: seededProduct.id },
      update: {
        stockQuantity,
        reservedQuantity: 0,
        lowStockThreshold: 10,
        warehouseLocation: "Mumbai Fulfilment Hub",
        deletedAt: null
      },
      create: {
        productId: seededProduct.id,
        stockQuantity,
        reservedQuantity: 0,
        lowStockThreshold: 10,
        warehouseLocation: "Mumbai Fulfilment Hub"
      }
    });
    await prisma.mediaFile.deleteMany({ where: { productId: seededProduct.id } });
    await prisma.mediaFile.create({
      data: {
        productId: seededProduct.id,
        type: "IMAGE",
        url: seededProduct.slug.includes("areca")
          ? "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=1200&q=80"
          : "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80",
        altText: seededProduct.name,
        mimeType: "image/jpeg",
        sortOrder: 0
      }
    });
    seededProducts.push(seededProduct);
  }

  const existingOrder = await prisma.order.findUnique({ where: { orderNumber: "GL-DEMO-ORDER-001" } });
  if (!existingOrder) {
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shippingAddressId: address.id,
        orderNumber: "GL-DEMO-ORDER-001",
        status: "CONFIRMED",
        subtotal: "1599.00",
        discountAmount: "0.00",
        deliveryFee: "0.00",
        gstAmount: "80.00",
        totalAmount: "1679.00",
        invoiceUrl: "/api/invoices/GL-DEMO-ORDER-001",
        items: {
          create: {
            productId: seededProducts[1].id,
            productNameSnapshot: seededProducts[1].name,
            skuSnapshot: seededProducts[1].sku,
            quantity: 1,
            unitPrice: "1599.00",
            gstRate: "5.00",
            totalPrice: "1599.00"
          }
        }
      }
    });
    await prisma.payment.create({
      data: {
        userId: user.id,
        orderId: order.id,
        amount: "1679.00",
        provider: "RAZORPAY",
        providerOrderId: "order_demo_garden_live",
        status: "PAID",
        purpose: "STORE_ORDER",
        paidAt: new Date(),
        metadata: { invoiceNumber: "GL-DEMO-INV-001", demo: true }
      }
    });
  }

  if (!(await prisma.payment.findFirst({ where: { activeMembershipId: membership.id, purpose: "MEMBERSHIP" } }))) {
    await prisma.payment.create({
      data: {
        userId: user.id,
        activeMembershipId: membership.id,
        amount: plan.price,
        provider: "RAZORPAY",
        providerOrderId: "order_demo_membership",
        status: "PAID",
        purpose: "MEMBERSHIP",
        paidAt: new Date(),
        metadata: { plan: plan.slug, demo: true }
      }
    });
  }

  if (!(await prisma.aIDiagnosis.findFirst({ where: { customerId: customer.id, plantId: plant.id } }))) {
    await prisma.aIDiagnosis.create({
      data: {
        customerId: customer.id,
        plantId: plant.id,
        imageUrl: plant.imageUrl,
        symptomsText: "Demo AI scan shows minor leaf tip browning.",
        diseaseDetection: { detected: false, label: "No major disease detected" },
        pestDetection: { detected: false, label: "No visible pests" },
        healthScore: 91,
        waterRecommendation: "Water twice weekly after checking topsoil moisture.",
        fertilizerRecommendation: "Apply balanced liquid fertilizer once per month.",
        medicineRecommendation: "No medicine required. Keep leaves clean and monitor humidity.",
        treatmentTimeline: [{ day: 1, action: "Clean leaves" }, { day: 7, action: "Recheck moisture" }],
        diagnosisSummary: "Healthy plant with mild dryness symptoms.",
        severity: "LOW",
        confidenceScore: "93.00",
        status: "GENERATED",
        recommendedProducts: ["GL-PLANT-MONEY-001", "GL-PALM-ARECA-001"]
      }
    });
  }

  await prisma.greenCoinAccount.upsert({
    where: { customerId: customer.id },
    update: { balance: 1250, lifetimeEarned: 1900, tier: "SAPLING", deletedAt: null },
    create: { customerId: customer.id, balance: 1250, lifetimeEarned: 1900, tier: "SAPLING" }
  });

  if (!(await prisma.notification.findFirst({ where: { userId: user.id, title: "Welcome to Garden Live Premium" } }))) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Welcome to Garden Live Premium",
        message: "Your demo Premium Garden membership is active with live garden health tracking.",
        type: "MEMBERSHIP",
        channel: "IN_APP",
        status: "SENT",
        sentAt: new Date(),
        metadata: { demo: true }
      }
    });
  }

  if (!(await prisma.activityLog.findFirst({ where: { action: "SEED_PRODUCTION_DEMO_DATA", entityType: "Seed" } }))) {
    await prisma.activityLog.create({
      data: {
        actorUserId: admin.id,
        action: "SEED_PRODUCTION_DEMO_DATA",
        entityType: "Seed",
        metadata: {
          admin: "admin@gardenlive.in",
          customer: "customer@gardenlive.in",
          password: "GardenLive@123"
        }
      }
    });
  }
}

async function main() {
  for (const [name, description] of roles) {
    await prisma.role.upsert({
      where: { name },
      update: { description, deletedAt: null },
      create: { name, description }
    });
  }

  for (const plan of membershipPlans) {
    await prisma.membershipPlan.upsert({
      where: { slug: plan.slug },
      update: {
        ...plan,
        billingCycle: "MONTHLY",
        isActive: true,
        deletedAt: null
      },
      create: {
        ...plan,
        billingCycle: "MONTHLY",
        isActive: true
      }
    });
  }

  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {
        name,
        description: `${name} catalogue for Garden Live store and partner inventory.`,
        deletedAt: null
      },
      create: {
        name,
        slug: slugify(name),
        description: `${name} catalogue for Garden Live store and partner inventory.`
      }
    });
  }

  await ensureDemoData();
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
