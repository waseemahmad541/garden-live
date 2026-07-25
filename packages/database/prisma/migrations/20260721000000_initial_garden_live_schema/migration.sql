-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'SUPERVISOR', 'GARDENER', 'CUSTOMER', 'NURSERY_PARTNER', 'LANDSCAPE_PARTNER', 'FRANCHISE_PARTNER');

-- CreateEnum
CREATE TYPE "AuthOtpPurpose" AS ENUM ('LOGIN', 'PHONE_VERIFICATION', 'EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "AuthTokenPurpose" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'WORK', 'GARDEN', 'BILLING', 'SHIPPING', 'OTHER');

-- CreateEnum
CREATE TYPE "GardenType" AS ENUM ('BALCONY', 'TERRACE', 'HOME', 'SOCIETY', 'COMMERCIAL', 'FARMHOUSE', 'GOVERNMENT', 'INSTITUTIONAL');

-- CreateEnum
CREATE TYPE "GardenStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PlantCategory" AS ENUM ('INDOOR', 'OUTDOOR', 'PALM', 'FRUIT', 'FLOWER', 'HERB', 'VEGETABLE', 'TREE', 'SUCCULENT', 'ORNAMENTAL', 'OTHER');

-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('HEALTHY', 'NEEDS_ATTENTION', 'SICK', 'CRITICAL', 'DEAD', 'REPLACED');

-- CreateEnum
CREATE TYPE "TimelineSource" AS ENUM ('CUSTOMER', 'GARDENER', 'SUPERVISOR', 'ADMIN', 'AI', 'SYSTEM');

-- CreateEnum
CREATE TYPE "PlantTimelineType" AS ENUM ('PLANTED', 'WATERED', 'FERTILIZED', 'PRUNED', 'DIAGNOSED', 'TREATED', 'GROWTH_UPDATE', 'WARRANTY_UPDATE', 'REPLACEMENT_REQUESTED', 'REPLACED', 'NOTE');

-- CreateEnum
CREATE TYPE "DiagnosisStatus" AS ENUM ('GENERATED', 'REVIEWED', 'ESCALATED', 'CONSULTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MembershipBillingCycle" AS ENUM ('MONTHLY', 'QUARTERLY', 'YEARLY', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'PAUSED', 'PENDING_PAYMENT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('MEMBERSHIP', 'STORE_ORDER', 'SERVICE_REQUEST', 'GARDEN_PROJECT', 'EXPERT_CONSULTATION');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('RAZORPAY', 'CASH', 'BANK_TRANSFER', 'UPI');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'OUT_OF_STOCK', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InventoryMovementType" AS ENUM ('STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT', 'RETURN', 'RESERVED', 'RELEASED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ENQUIRY', 'SITE_SURVEY', 'QUOTATION', 'APPROVED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('SCHEDULED', 'ASSIGNED', 'ON_THE_WAY', 'IN_PROGRESS', 'COMPLETED', 'MISSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'HALF_DAY', 'ON_LEAVE');

-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('REQUESTED', 'SCHEDULED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceRequestType" AS ENUM ('REGULAR_VISIT', 'EMERGENCY', 'PLANT_CARE', 'PEST_CONTROL', 'SOIL_CARE', 'PRUNING', 'INSTALLATION', 'CONSULTATION');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InsuranceStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('REQUESTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'REPLACED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QRCodeEntityType" AS ENUM ('PLANT', 'GARDEN', 'VISIT', 'ORDER', 'MEMBERSHIP');

-- CreateEnum
CREATE TYPE "CoinTransactionType" AS ENUM ('EARNED', 'REDEEMED', 'EXPIRED', 'ADJUSTED');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('GREEN_COINS', 'COUPON', 'DISCOUNT', 'FREE_VISIT', 'AI_CREDIT');

-- CreateEnum
CREATE TYPE "CouponDiscountType" AS ENUM ('FLAT', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'AUTH', 'PAYMENT', 'MEMBERSHIP', 'SERVICE', 'PLANT_HEALTH', 'ORDER', 'REWARD', 'CLAIM', 'TENDER', 'PROMOTION');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'SMS', 'EMAIL', 'WHATSAPP', 'PUSH');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'READ');

-- CreateEnum
CREATE TYPE "TestReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWED', 'ACTION_REQUIRED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TenderStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'WON', 'LOST', 'CANCELLED', 'WORK_ORDER_RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CONTRACT', 'INVOICE', 'QUOTATION', 'TENDER', 'WORK_ORDER', 'REPORT', 'INSURANCE', 'ID_PROOF', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO', 'OTHER');

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" "RoleName" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "phoneVerifiedAt" TIMESTAMP(3),
    "emailVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_otp_codes" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "phone" TEXT,
    "email" TEXT,
    "codeHash" TEXT NOT NULL,
    "purpose" "AuthOtpPurpose" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "auth_otp_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_tokens" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "purpose" "AuthTokenPurpose" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "preferredLanguage" TEXT,
    "referralCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gardeners" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "specialization" TEXT,
    "experienceYears" INTEGER,
    "serviceCity" TEXT,
    "serviceArea" TEXT,
    "rating" DECIMAL(3,2),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "gardeners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisors" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "region" TEXT,
    "managedCity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "supervisors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "type" "AddressType" NOT NULL DEFAULT 'HOME',
    "name" TEXT,
    "phone" TEXT,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gardens" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "addressId" UUID,
    "name" TEXT NOT NULL,
    "type" "GardenType" NOT NULL,
    "status" "GardenStatus" NOT NULL DEFAULT 'ACTIVE',
    "areaSqft" INTEGER,
    "sunlightType" TEXT,
    "waterSource" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "gardens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plants" (
    "id" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT,
    "category" "PlantCategory" NOT NULL DEFAULT 'OTHER',
    "healthStatus" "HealthStatus" NOT NULL DEFAULT 'HEALTHY',
    "imageUrl" TEXT,
    "plantedAt" TIMESTAMP(3),
    "lastCheckedAt" TIMESTAMP(3),
    "replacementEligible" BOOLEAN NOT NULL DEFAULT false,
    "careNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plant_passports" (
    "id" UUID NOT NULL,
    "plantId" UUID NOT NULL,
    "passportCode" TEXT NOT NULL,
    "qrCodeId" UUID,
    "origin" TEXT,
    "plantDetails" JSONB,
    "careSchedule" JSONB,
    "wateringFrequency" TEXT,
    "fertilizerFrequency" TEXT,
    "sunlightRequirement" TEXT,
    "warrantyStatus" TEXT,
    "warrantyStartDate" TIMESTAMP(3),
    "warrantyEndDate" TIMESTAMP(3),
    "lastServiceDate" TIMESTAMP(3),
    "nextServiceDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "plant_passports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plant_timelines" (
    "id" UUID NOT NULL,
    "plantId" UUID NOT NULL,
    "gardenId" UUID,
    "actorUserId" UUID,
    "type" "PlantTimelineType" NOT NULL,
    "source" "TimelineSource" NOT NULL DEFAULT 'SYSTEM',
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "plant_timelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_diagnoses" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "plantId" UUID,
    "imageUrl" TEXT,
    "symptomsText" TEXT,
    "diseaseDetection" JSONB,
    "pestDetection" JSONB,
    "healthScore" INTEGER,
    "waterRecommendation" TEXT,
    "fertilizerRecommendation" TEXT,
    "medicineRecommendation" TEXT,
    "treatmentTimeline" JSONB,
    "diagnosisSummary" TEXT,
    "severity" "Severity" NOT NULL DEFAULT 'LOW',
    "confidenceScore" DECIMAL(5,2),
    "status" "DiagnosisStatus" NOT NULL DEFAULT 'GENERATED',
    "recommendedProducts" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ai_diagnoses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garden_health_scores" (
    "id" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "plantHealthScore" INTEGER,
    "soilScore" INTEGER,
    "waterScore" INTEGER,
    "pestRiskScore" INTEGER,
    "maintenanceScore" INTEGER,
    "aiConfidenceScore" INTEGER,
    "summary" TEXT,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "garden_health_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_plans" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "billingCycle" "MembershipBillingCycle" NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "plantCountLimit" INTEGER,
    "aiDoctorLimit" INTEGER NOT NULL DEFAULT 0,
    "replacementCoverageCount" INTEGER NOT NULL DEFAULT 0,
    "storeDiscountPercentage" DECIMAL(5,2),
    "rewardMultiplier" DECIMAL(5,2),
    "features" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_memberships" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "remainingVisits" INTEGER NOT NULL DEFAULT 0,
    "remainingAiCredits" INTEGER NOT NULL DEFAULT 0,
    "remainingReplacements" INTEGER NOT NULL DEFAULT 0,
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "active_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "parentId" UUID,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "categoryId" UUID,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "hsnCode" TEXT,
    "gstRate" DECIMAL(5,2),
    "price" DECIMAL(12,2) NOT NULL,
    "salePrice" DECIMAL(12,2),
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "isAiRecommended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQuantity" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 5,
    "warehouseLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_movements" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "inventoryId" UUID,
    "type" "InventoryMovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT,
    "metadata" JSONB,
    "createdById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "inventory_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlists" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "shippingAddressId" UUID,
    "orderNumber" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "subtotal" DECIMAL(12,2) NOT NULL,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deliveryFee" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "gstAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "trackingNumber" TEXT,
    "invoiceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "productId" UUID,
    "productNameSnapshot" TEXT NOT NULL,
    "skuSnapshot" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "gstRate" DECIMAL(5,2),
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "orderId" UUID,
    "activeMembershipId" UUID,
    "gardenProjectId" UUID,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "provider" "PaymentProvider" NOT NULL DEFAULT 'RAZORPAY',
    "providerOrderId" TEXT,
    "providerPaymentId" TEXT,
    "providerSignature" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'CREATED',
    "purpose" "PaymentPurpose" NOT NULL,
    "metadata" JSONB,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garden_projects" (
    "id" UUID NOT NULL,
    "customerId" UUID,
    "gardenId" UUID,
    "supervisorId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "projectType" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ENQUIRY',
    "budgetEstimate" DECIMAL(12,2),
    "approvedBudget" DECIMAL(12,2),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "garden_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garden_visits" (
    "id" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "customerId" UUID,
    "gardenerId" UUID,
    "supervisorId" UUID,
    "serviceRequestId" UUID,
    "projectId" UUID,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "status" "VisitStatus" NOT NULL DEFAULT 'SCHEDULED',
    "workSummary" TEXT,
    "beforeImages" JSONB,
    "afterImages" JSONB,
    "customerRating" INTEGER,
    "customerFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "garden_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" UUID NOT NULL,
    "gardenerId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkInAt" TIMESTAMP(3),
    "checkOutAt" TIMESTAMP(3),
    "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_requests" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "activeMembershipId" UUID,
    "projectId" UUID,
    "type" "ServiceRequestType" NOT NULL,
    "description" TEXT,
    "preferredDate" TIMESTAMP(3),
    "preferredTimeSlot" TEXT,
    "priority" "Severity" NOT NULL DEFAULT 'LOW',
    "status" "ServiceRequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_schedules" (
    "id" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "gardenerId" UUID,
    "supervisorId" UUID,
    "activeMembershipId" UUID,
    "name" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "dayOfWeek" INTEGER,
    "timeSlot" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "ScheduleStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "maintenance_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plant_insurance" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "plantId" UUID NOT NULL,
    "activeMembershipId" UUID,
    "policyNumber" TEXT NOT NULL,
    "status" "InsuranceStatus" NOT NULL DEFAULT 'ACTIVE',
    "coverageStartDate" TIMESTAMP(3) NOT NULL,
    "coverageEndDate" TIMESTAMP(3) NOT NULL,
    "replacementLimit" INTEGER NOT NULL DEFAULT 0,
    "remainingClaims" INTEGER NOT NULL DEFAULT 0,
    "terms" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "plant_insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_claims" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "plantId" UUID NOT NULL,
    "plantInsuranceId" UUID,
    "reviewedById" UUID,
    "replacementProductId" UUID,
    "claimNumber" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "evidence" JSONB,
    "status" "ClaimStatus" NOT NULL DEFAULT 'REQUESTED',
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "insurance_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_codes" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "entityType" "QRCodeEntityType" NOT NULL,
    "entityId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "plantId" UUID,
    "gardenId" UUID,
    "visitId" UUID,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "lastScannedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "green_coin_accounts" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "lifetimeEarned" INTEGER NOT NULL DEFAULT 0,
    "tier" TEXT NOT NULL DEFAULT 'SEED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "green_coin_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "green_coin_transactions" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "type" "CoinTransactionType" NOT NULL,
    "points" INTEGER NOT NULL,
    "source" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "green_coin_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rewards" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "type" "RewardType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "value" DECIMAL(12,2),
    "expiresAt" TIMESTAMP(3),
    "redeemedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "CouponDiscountType" NOT NULL,
    "discountValue" DECIMAL(12,2) NOT NULL,
    "minOrderValue" DECIMAL(12,2),
    "maxDiscount" DECIMAL(12,2),
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon_redemptions" (
    "id" UUID NOT NULL,
    "couponId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "orderId" UUID,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "coupon_redemptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'IN_APP',
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "sentAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soil_test_reports" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "phLevel" DECIMAL(4,2),
    "nitrogenLevel" DECIMAL(8,2),
    "phosphorusLevel" DECIMAL(8,2),
    "potassiumLevel" DECIMAL(8,2),
    "organicMatter" DECIMAL(8,2),
    "summary" TEXT,
    "recommendations" JSONB,
    "status" "TestReportStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "soil_test_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_test_reports" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "gardenId" UUID NOT NULL,
    "phLevel" DECIMAL(4,2),
    "tdsLevel" DECIMAL(8,2),
    "hardness" DECIMAL(8,2),
    "chlorineLevel" DECIMAL(8,2),
    "summary" TEXT,
    "recommendations" JSONB,
    "status" "TestReportStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "water_test_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tender_projects" (
    "id" UUID NOT NULL,
    "tenderNumber" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "departmentName" TEXT,
    "contactPerson" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "estimatedValue" DECIMAL(14,2),
    "submissionDeadline" TIMESTAMP(3),
    "status" "TenderStatus" NOT NULL DEFAULT 'DRAFT',
    "workOrderNumber" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tender_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "uploadedById" UUID,
    "gardenProjectId" UUID,
    "tenderProjectId" UUID,
    "type" "DocumentType" NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" UUID NOT NULL,
    "uploadedById" UUID,
    "gardenId" UUID,
    "plantId" UUID,
    "plantTimelineId" UUID,
    "aiDiagnosisId" UUID,
    "gardenVisitId" UUID,
    "gardenProjectId" UUID,
    "tenderProjectId" UUID,
    "soilTestReportId" UUID,
    "waterTestReportId" UUID,
    "productId" UUID,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "media_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "actorUserId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" UUID,
    "oldValue" JSONB,
    "newValue" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "roles_deletedAt_idx" ON "roles"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- CreateIndex
CREATE INDEX "auth_otp_codes_userId_idx" ON "auth_otp_codes"("userId");

-- CreateIndex
CREATE INDEX "auth_otp_codes_phone_purpose_idx" ON "auth_otp_codes"("phone", "purpose");

-- CreateIndex
CREATE INDEX "auth_otp_codes_email_purpose_idx" ON "auth_otp_codes"("email", "purpose");

-- CreateIndex
CREATE INDEX "auth_otp_codes_expiresAt_idx" ON "auth_otp_codes"("expiresAt");

-- CreateIndex
CREATE INDEX "auth_otp_codes_deletedAt_idx" ON "auth_otp_codes"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_tokenHash_key" ON "auth_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "auth_tokens_userId_purpose_idx" ON "auth_tokens"("userId", "purpose");

-- CreateIndex
CREATE INDEX "auth_tokens_expiresAt_idx" ON "auth_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "auth_tokens_deletedAt_idx" ON "auth_tokens"("deletedAt");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "user_roles"("roleId");

-- CreateIndex
CREATE INDEX "user_roles_deletedAt_idx" ON "user_roles"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "customers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_referralCode_key" ON "customers"("referralCode");

-- CreateIndex
CREATE INDEX "customers_referralCode_idx" ON "customers"("referralCode");

-- CreateIndex
CREATE INDEX "customers_deletedAt_idx" ON "customers"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "gardeners_userId_key" ON "gardeners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "gardeners_employeeCode_key" ON "gardeners"("employeeCode");

-- CreateIndex
CREATE INDEX "gardeners_serviceCity_serviceArea_idx" ON "gardeners"("serviceCity", "serviceArea");

-- CreateIndex
CREATE INDEX "gardeners_isAvailable_idx" ON "gardeners"("isAvailable");

-- CreateIndex
CREATE INDEX "gardeners_deletedAt_idx" ON "gardeners"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_userId_key" ON "supervisors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "supervisors_employeeCode_key" ON "supervisors"("employeeCode");

-- CreateIndex
CREATE INDEX "supervisors_region_managedCity_idx" ON "supervisors"("region", "managedCity");

-- CreateIndex
CREATE INDEX "supervisors_deletedAt_idx" ON "supervisors"("deletedAt");

-- CreateIndex
CREATE INDEX "addresses_userId_idx" ON "addresses"("userId");

-- CreateIndex
CREATE INDEX "addresses_city_state_idx" ON "addresses"("city", "state");

-- CreateIndex
CREATE INDEX "addresses_pincode_idx" ON "addresses"("pincode");

-- CreateIndex
CREATE INDEX "addresses_deletedAt_idx" ON "addresses"("deletedAt");

-- CreateIndex
CREATE INDEX "gardens_customerId_idx" ON "gardens"("customerId");

-- CreateIndex
CREATE INDEX "gardens_addressId_idx" ON "gardens"("addressId");

-- CreateIndex
CREATE INDEX "gardens_type_status_idx" ON "gardens"("type", "status");

-- CreateIndex
CREATE INDEX "gardens_deletedAt_idx" ON "gardens"("deletedAt");

-- CreateIndex
CREATE INDEX "plants_gardenId_idx" ON "plants"("gardenId");

-- CreateIndex
CREATE INDEX "plants_customerId_idx" ON "plants"("customerId");

-- CreateIndex
CREATE INDEX "plants_category_idx" ON "plants"("category");

-- CreateIndex
CREATE INDEX "plants_healthStatus_idx" ON "plants"("healthStatus");

-- CreateIndex
CREATE INDEX "plants_deletedAt_idx" ON "plants"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "plant_passports_plantId_key" ON "plant_passports"("plantId");

-- CreateIndex
CREATE UNIQUE INDEX "plant_passports_passportCode_key" ON "plant_passports"("passportCode");

-- CreateIndex
CREATE UNIQUE INDEX "plant_passports_qrCodeId_key" ON "plant_passports"("qrCodeId");

-- CreateIndex
CREATE INDEX "plant_passports_passportCode_idx" ON "plant_passports"("passportCode");

-- CreateIndex
CREATE INDEX "plant_passports_deletedAt_idx" ON "plant_passports"("deletedAt");

-- CreateIndex
CREATE INDEX "plant_timelines_plantId_createdAt_idx" ON "plant_timelines"("plantId", "createdAt");

-- CreateIndex
CREATE INDEX "plant_timelines_gardenId_idx" ON "plant_timelines"("gardenId");

-- CreateIndex
CREATE INDEX "plant_timelines_type_idx" ON "plant_timelines"("type");

-- CreateIndex
CREATE INDEX "plant_timelines_deletedAt_idx" ON "plant_timelines"("deletedAt");

-- CreateIndex
CREATE INDEX "ai_diagnoses_customerId_idx" ON "ai_diagnoses"("customerId");

-- CreateIndex
CREATE INDEX "ai_diagnoses_plantId_idx" ON "ai_diagnoses"("plantId");

-- CreateIndex
CREATE INDEX "ai_diagnoses_severity_status_idx" ON "ai_diagnoses"("severity", "status");

-- CreateIndex
CREATE INDEX "ai_diagnoses_createdAt_idx" ON "ai_diagnoses"("createdAt");

-- CreateIndex
CREATE INDEX "ai_diagnoses_deletedAt_idx" ON "ai_diagnoses"("deletedAt");

-- CreateIndex
CREATE INDEX "garden_health_scores_gardenId_createdAt_idx" ON "garden_health_scores"("gardenId", "createdAt");

-- CreateIndex
CREATE INDEX "garden_health_scores_customerId_idx" ON "garden_health_scores"("customerId");

-- CreateIndex
CREATE INDEX "garden_health_scores_overallScore_idx" ON "garden_health_scores"("overallScore");

-- CreateIndex
CREATE INDEX "garden_health_scores_deletedAt_idx" ON "garden_health_scores"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "membership_plans_slug_key" ON "membership_plans"("slug");

-- CreateIndex
CREATE INDEX "membership_plans_isActive_idx" ON "membership_plans"("isActive");

-- CreateIndex
CREATE INDEX "membership_plans_deletedAt_idx" ON "membership_plans"("deletedAt");

-- CreateIndex
CREATE INDEX "active_memberships_customerId_idx" ON "active_memberships"("customerId");

-- CreateIndex
CREATE INDEX "active_memberships_planId_idx" ON "active_memberships"("planId");

-- CreateIndex
CREATE INDEX "active_memberships_status_idx" ON "active_memberships"("status");

-- CreateIndex
CREATE INDEX "active_memberships_endDate_idx" ON "active_memberships"("endDate");

-- CreateIndex
CREATE INDEX "active_memberships_deletedAt_idx" ON "active_memberships"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

-- CreateIndex
CREATE INDEX "categories_deletedAt_idx" ON "categories"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "products_status_idx" ON "products"("status");

-- CreateIndex
CREATE INDEX "products_isAiRecommended_idx" ON "products"("isAiRecommended");

-- CreateIndex
CREATE INDEX "products_deletedAt_idx" ON "products"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_productId_key" ON "inventory"("productId");

-- CreateIndex
CREATE INDEX "inventory_stockQuantity_idx" ON "inventory"("stockQuantity");

-- CreateIndex
CREATE INDEX "inventory_deletedAt_idx" ON "inventory"("deletedAt");

-- CreateIndex
CREATE INDEX "inventory_movements_productId_idx" ON "inventory_movements"("productId");

-- CreateIndex
CREATE INDEX "inventory_movements_inventoryId_idx" ON "inventory_movements"("inventoryId");

-- CreateIndex
CREATE INDEX "inventory_movements_type_idx" ON "inventory_movements"("type");

-- CreateIndex
CREATE INDEX "inventory_movements_createdAt_idx" ON "inventory_movements"("createdAt");

-- CreateIndex
CREATE INDEX "inventory_movements_deletedAt_idx" ON "inventory_movements"("deletedAt");

-- CreateIndex
CREATE INDEX "carts_customerId_idx" ON "carts"("customerId");

-- CreateIndex
CREATE INDEX "carts_deletedAt_idx" ON "carts"("deletedAt");

-- CreateIndex
CREATE INDEX "cart_items_productId_idx" ON "cart_items"("productId");

-- CreateIndex
CREATE INDEX "cart_items_deletedAt_idx" ON "cart_items"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_productId_key" ON "cart_items"("cartId", "productId");

-- CreateIndex
CREATE INDEX "wishlists_productId_idx" ON "wishlists"("productId");

-- CreateIndex
CREATE INDEX "wishlists_deletedAt_idx" ON "wishlists"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_customerId_productId_key" ON "wishlists"("customerId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");

-- CreateIndex
CREATE INDEX "orders_customerId_idx" ON "orders"("customerId");

-- CreateIndex
CREATE INDEX "orders_shippingAddressId_idx" ON "orders"("shippingAddressId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

-- CreateIndex
CREATE INDEX "orders_deletedAt_idx" ON "orders"("deletedAt");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_productId_idx" ON "order_items"("productId");

-- CreateIndex
CREATE INDEX "order_items_deletedAt_idx" ON "order_items"("deletedAt");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_orderId_idx" ON "payments"("orderId");

-- CreateIndex
CREATE INDEX "payments_activeMembershipId_idx" ON "payments"("activeMembershipId");

-- CreateIndex
CREATE INDEX "payments_gardenProjectId_idx" ON "payments"("gardenProjectId");

-- CreateIndex
CREATE INDEX "payments_status_purpose_idx" ON "payments"("status", "purpose");

-- CreateIndex
CREATE INDEX "payments_providerOrderId_idx" ON "payments"("providerOrderId");

-- CreateIndex
CREATE INDEX "payments_providerPaymentId_idx" ON "payments"("providerPaymentId");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");

-- CreateIndex
CREATE INDEX "payments_deletedAt_idx" ON "payments"("deletedAt");

-- CreateIndex
CREATE INDEX "garden_projects_customerId_idx" ON "garden_projects"("customerId");

-- CreateIndex
CREATE INDEX "garden_projects_gardenId_idx" ON "garden_projects"("gardenId");

-- CreateIndex
CREATE INDEX "garden_projects_supervisorId_idx" ON "garden_projects"("supervisorId");

-- CreateIndex
CREATE INDEX "garden_projects_status_idx" ON "garden_projects"("status");

-- CreateIndex
CREATE INDEX "garden_projects_deletedAt_idx" ON "garden_projects"("deletedAt");

-- CreateIndex
CREATE INDEX "garden_visits_gardenId_idx" ON "garden_visits"("gardenId");

-- CreateIndex
CREATE INDEX "garden_visits_gardenerId_idx" ON "garden_visits"("gardenerId");

-- CreateIndex
CREATE INDEX "garden_visits_supervisorId_idx" ON "garden_visits"("supervisorId");

-- CreateIndex
CREATE INDEX "garden_visits_serviceRequestId_idx" ON "garden_visits"("serviceRequestId");

-- CreateIndex
CREATE INDEX "garden_visits_projectId_idx" ON "garden_visits"("projectId");

-- CreateIndex
CREATE INDEX "garden_visits_scheduledAt_idx" ON "garden_visits"("scheduledAt");

-- CreateIndex
CREATE INDEX "garden_visits_status_idx" ON "garden_visits"("status");

-- CreateIndex
CREATE INDEX "garden_visits_deletedAt_idx" ON "garden_visits"("deletedAt");

-- CreateIndex
CREATE INDEX "attendance_date_idx" ON "attendance"("date");

-- CreateIndex
CREATE INDEX "attendance_status_idx" ON "attendance"("status");

-- CreateIndex
CREATE INDEX "attendance_deletedAt_idx" ON "attendance"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_gardenerId_date_key" ON "attendance"("gardenerId", "date");

-- CreateIndex
CREATE INDEX "service_requests_customerId_idx" ON "service_requests"("customerId");

-- CreateIndex
CREATE INDEX "service_requests_gardenId_idx" ON "service_requests"("gardenId");

-- CreateIndex
CREATE INDEX "service_requests_activeMembershipId_idx" ON "service_requests"("activeMembershipId");

-- CreateIndex
CREATE INDEX "service_requests_projectId_idx" ON "service_requests"("projectId");

-- CreateIndex
CREATE INDEX "service_requests_status_priority_idx" ON "service_requests"("status", "priority");

-- CreateIndex
CREATE INDEX "service_requests_deletedAt_idx" ON "service_requests"("deletedAt");

-- CreateIndex
CREATE INDEX "maintenance_schedules_gardenId_idx" ON "maintenance_schedules"("gardenId");

-- CreateIndex
CREATE INDEX "maintenance_schedules_gardenerId_idx" ON "maintenance_schedules"("gardenerId");

-- CreateIndex
CREATE INDEX "maintenance_schedules_supervisorId_idx" ON "maintenance_schedules"("supervisorId");

-- CreateIndex
CREATE INDEX "maintenance_schedules_activeMembershipId_idx" ON "maintenance_schedules"("activeMembershipId");

-- CreateIndex
CREATE INDEX "maintenance_schedules_status_idx" ON "maintenance_schedules"("status");

-- CreateIndex
CREATE INDEX "maintenance_schedules_deletedAt_idx" ON "maintenance_schedules"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "plant_insurance_policyNumber_key" ON "plant_insurance"("policyNumber");

-- CreateIndex
CREATE INDEX "plant_insurance_customerId_idx" ON "plant_insurance"("customerId");

-- CreateIndex
CREATE INDEX "plant_insurance_plantId_idx" ON "plant_insurance"("plantId");

-- CreateIndex
CREATE INDEX "plant_insurance_activeMembershipId_idx" ON "plant_insurance"("activeMembershipId");

-- CreateIndex
CREATE INDEX "plant_insurance_status_idx" ON "plant_insurance"("status");

-- CreateIndex
CREATE INDEX "plant_insurance_coverageEndDate_idx" ON "plant_insurance"("coverageEndDate");

-- CreateIndex
CREATE INDEX "plant_insurance_deletedAt_idx" ON "plant_insurance"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_claims_claimNumber_key" ON "insurance_claims"("claimNumber");

-- CreateIndex
CREATE INDEX "insurance_claims_customerId_idx" ON "insurance_claims"("customerId");

-- CreateIndex
CREATE INDEX "insurance_claims_plantId_idx" ON "insurance_claims"("plantId");

-- CreateIndex
CREATE INDEX "insurance_claims_plantInsuranceId_idx" ON "insurance_claims"("plantInsuranceId");

-- CreateIndex
CREATE INDEX "insurance_claims_reviewedById_idx" ON "insurance_claims"("reviewedById");

-- CreateIndex
CREATE INDEX "insurance_claims_replacementProductId_idx" ON "insurance_claims"("replacementProductId");

-- CreateIndex
CREATE INDEX "insurance_claims_status_idx" ON "insurance_claims"("status");

-- CreateIndex
CREATE INDEX "insurance_claims_deletedAt_idx" ON "insurance_claims"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_code_key" ON "qr_codes"("code");

-- CreateIndex
CREATE INDEX "qr_codes_entityType_entityId_idx" ON "qr_codes"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "qr_codes_plantId_idx" ON "qr_codes"("plantId");

-- CreateIndex
CREATE INDEX "qr_codes_gardenId_idx" ON "qr_codes"("gardenId");

-- CreateIndex
CREATE INDEX "qr_codes_visitId_idx" ON "qr_codes"("visitId");

-- CreateIndex
CREATE INDEX "qr_codes_deletedAt_idx" ON "qr_codes"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "green_coin_accounts_customerId_key" ON "green_coin_accounts"("customerId");

-- CreateIndex
CREATE INDEX "green_coin_accounts_tier_idx" ON "green_coin_accounts"("tier");

-- CreateIndex
CREATE INDEX "green_coin_accounts_deletedAt_idx" ON "green_coin_accounts"("deletedAt");

-- CreateIndex
CREATE INDEX "green_coin_transactions_accountId_idx" ON "green_coin_transactions"("accountId");

-- CreateIndex
CREATE INDEX "green_coin_transactions_type_idx" ON "green_coin_transactions"("type");

-- CreateIndex
CREATE INDEX "green_coin_transactions_createdAt_idx" ON "green_coin_transactions"("createdAt");

-- CreateIndex
CREATE INDEX "green_coin_transactions_deletedAt_idx" ON "green_coin_transactions"("deletedAt");

-- CreateIndex
CREATE INDEX "rewards_customerId_idx" ON "rewards"("customerId");

-- CreateIndex
CREATE INDEX "rewards_type_idx" ON "rewards"("type");

-- CreateIndex
CREATE INDEX "rewards_expiresAt_idx" ON "rewards"("expiresAt");

-- CreateIndex
CREATE INDEX "rewards_deletedAt_idx" ON "rewards"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE INDEX "coupons_isActive_idx" ON "coupons"("isActive");

-- CreateIndex
CREATE INDEX "coupons_expiresAt_idx" ON "coupons"("expiresAt");

-- CreateIndex
CREATE INDEX "coupons_deletedAt_idx" ON "coupons"("deletedAt");

-- CreateIndex
CREATE INDEX "coupon_redemptions_couponId_idx" ON "coupon_redemptions"("couponId");

-- CreateIndex
CREATE INDEX "coupon_redemptions_customerId_idx" ON "coupon_redemptions"("customerId");

-- CreateIndex
CREATE INDEX "coupon_redemptions_orderId_idx" ON "coupon_redemptions"("orderId");

-- CreateIndex
CREATE INDEX "coupon_redemptions_deletedAt_idx" ON "coupon_redemptions"("deletedAt");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_type_channel_idx" ON "notifications"("type", "channel");

-- CreateIndex
CREATE INDEX "notifications_status_idx" ON "notifications"("status");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "notifications_deletedAt_idx" ON "notifications"("deletedAt");

-- CreateIndex
CREATE INDEX "soil_test_reports_customerId_idx" ON "soil_test_reports"("customerId");

-- CreateIndex
CREATE INDEX "soil_test_reports_gardenId_idx" ON "soil_test_reports"("gardenId");

-- CreateIndex
CREATE INDEX "soil_test_reports_status_idx" ON "soil_test_reports"("status");

-- CreateIndex
CREATE INDEX "soil_test_reports_createdAt_idx" ON "soil_test_reports"("createdAt");

-- CreateIndex
CREATE INDEX "soil_test_reports_deletedAt_idx" ON "soil_test_reports"("deletedAt");

-- CreateIndex
CREATE INDEX "water_test_reports_customerId_idx" ON "water_test_reports"("customerId");

-- CreateIndex
CREATE INDEX "water_test_reports_gardenId_idx" ON "water_test_reports"("gardenId");

-- CreateIndex
CREATE INDEX "water_test_reports_status_idx" ON "water_test_reports"("status");

-- CreateIndex
CREATE INDEX "water_test_reports_createdAt_idx" ON "water_test_reports"("createdAt");

-- CreateIndex
CREATE INDEX "water_test_reports_deletedAt_idx" ON "water_test_reports"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "tender_projects_tenderNumber_key" ON "tender_projects"("tenderNumber");

-- CreateIndex
CREATE INDEX "tender_projects_status_idx" ON "tender_projects"("status");

-- CreateIndex
CREATE INDEX "tender_projects_submissionDeadline_idx" ON "tender_projects"("submissionDeadline");

-- CreateIndex
CREATE INDEX "tender_projects_clientName_idx" ON "tender_projects"("clientName");

-- CreateIndex
CREATE INDEX "tender_projects_deletedAt_idx" ON "tender_projects"("deletedAt");

-- CreateIndex
CREATE INDEX "documents_uploadedById_idx" ON "documents"("uploadedById");

-- CreateIndex
CREATE INDEX "documents_gardenProjectId_idx" ON "documents"("gardenProjectId");

-- CreateIndex
CREATE INDEX "documents_tenderProjectId_idx" ON "documents"("tenderProjectId");

-- CreateIndex
CREATE INDEX "documents_type_idx" ON "documents"("type");

-- CreateIndex
CREATE INDEX "documents_deletedAt_idx" ON "documents"("deletedAt");

-- CreateIndex
CREATE INDEX "media_files_uploadedById_idx" ON "media_files"("uploadedById");

-- CreateIndex
CREATE INDEX "media_files_gardenId_idx" ON "media_files"("gardenId");

-- CreateIndex
CREATE INDEX "media_files_plantId_idx" ON "media_files"("plantId");

-- CreateIndex
CREATE INDEX "media_files_plantTimelineId_idx" ON "media_files"("plantTimelineId");

-- CreateIndex
CREATE INDEX "media_files_aiDiagnosisId_idx" ON "media_files"("aiDiagnosisId");

-- CreateIndex
CREATE INDEX "media_files_gardenVisitId_idx" ON "media_files"("gardenVisitId");

-- CreateIndex
CREATE INDEX "media_files_gardenProjectId_idx" ON "media_files"("gardenProjectId");

-- CreateIndex
CREATE INDEX "media_files_tenderProjectId_idx" ON "media_files"("tenderProjectId");

-- CreateIndex
CREATE INDEX "media_files_soilTestReportId_idx" ON "media_files"("soilTestReportId");

-- CreateIndex
CREATE INDEX "media_files_waterTestReportId_idx" ON "media_files"("waterTestReportId");

-- CreateIndex
CREATE INDEX "media_files_productId_idx" ON "media_files"("productId");

-- CreateIndex
CREATE INDEX "media_files_type_idx" ON "media_files"("type");

-- CreateIndex
CREATE INDEX "media_files_deletedAt_idx" ON "media_files"("deletedAt");

-- CreateIndex
CREATE INDEX "activity_logs_actorUserId_idx" ON "activity_logs"("actorUserId");

-- CreateIndex
CREATE INDEX "activity_logs_entityType_entityId_idx" ON "activity_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "activity_logs_action_idx" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "activity_logs_createdAt_idx" ON "activity_logs"("createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_deletedAt_idx" ON "activity_logs"("deletedAt");

-- AddForeignKey
ALTER TABLE "auth_otp_codes" ADD CONSTRAINT "auth_otp_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gardeners" ADD CONSTRAINT "gardeners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisors" ADD CONSTRAINT "supervisors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gardens" ADD CONSTRAINT "gardens_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gardens" ADD CONSTRAINT "gardens_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_passports" ADD CONSTRAINT "plant_passports_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_passports" ADD CONSTRAINT "plant_passports_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "qr_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_timelines" ADD CONSTRAINT "plant_timelines_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_timelines" ADD CONSTRAINT "plant_timelines_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_diagnoses" ADD CONSTRAINT "ai_diagnoses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_diagnoses" ADD CONSTRAINT "ai_diagnoses_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_health_scores" ADD CONSTRAINT "garden_health_scores_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_health_scores" ADD CONSTRAINT "garden_health_scores_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_memberships" ADD CONSTRAINT "active_memberships_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "active_memberships" ADD CONSTRAINT "active_memberships_planId_fkey" FOREIGN KEY ("planId") REFERENCES "membership_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_activeMembershipId_fkey" FOREIGN KEY ("activeMembershipId") REFERENCES "active_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_gardenProjectId_fkey" FOREIGN KEY ("gardenProjectId") REFERENCES "garden_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_projects" ADD CONSTRAINT "garden_projects_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_projects" ADD CONSTRAINT "garden_projects_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_projects" ADD CONSTRAINT "garden_projects_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_visits" ADD CONSTRAINT "garden_visits_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_visits" ADD CONSTRAINT "garden_visits_gardenerId_fkey" FOREIGN KEY ("gardenerId") REFERENCES "gardeners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_visits" ADD CONSTRAINT "garden_visits_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_visits" ADD CONSTRAINT "garden_visits_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "garden_visits" ADD CONSTRAINT "garden_visits_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "garden_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_gardenerId_fkey" FOREIGN KEY ("gardenerId") REFERENCES "gardeners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_activeMembershipId_fkey" FOREIGN KEY ("activeMembershipId") REFERENCES "active_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "garden_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_schedules" ADD CONSTRAINT "maintenance_schedules_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_schedules" ADD CONSTRAINT "maintenance_schedules_gardenerId_fkey" FOREIGN KEY ("gardenerId") REFERENCES "gardeners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_schedules" ADD CONSTRAINT "maintenance_schedules_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_schedules" ADD CONSTRAINT "maintenance_schedules_activeMembershipId_fkey" FOREIGN KEY ("activeMembershipId") REFERENCES "active_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_insurance" ADD CONSTRAINT "plant_insurance_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_insurance" ADD CONSTRAINT "plant_insurance_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plant_insurance" ADD CONSTRAINT "plant_insurance_activeMembershipId_fkey" FOREIGN KEY ("activeMembershipId") REFERENCES "active_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_plantInsuranceId_fkey" FOREIGN KEY ("plantInsuranceId") REFERENCES "plant_insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_replacementProductId_fkey" FOREIGN KEY ("replacementProductId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "garden_visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "green_coin_accounts" ADD CONSTRAINT "green_coin_accounts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "green_coin_transactions" ADD CONSTRAINT "green_coin_transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "green_coin_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soil_test_reports" ADD CONSTRAINT "soil_test_reports_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soil_test_reports" ADD CONSTRAINT "soil_test_reports_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_test_reports" ADD CONSTRAINT "water_test_reports_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_test_reports" ADD CONSTRAINT "water_test_reports_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_gardenProjectId_fkey" FOREIGN KEY ("gardenProjectId") REFERENCES "garden_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_tenderProjectId_fkey" FOREIGN KEY ("tenderProjectId") REFERENCES "tender_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "gardens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_plantTimelineId_fkey" FOREIGN KEY ("plantTimelineId") REFERENCES "plant_timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_aiDiagnosisId_fkey" FOREIGN KEY ("aiDiagnosisId") REFERENCES "ai_diagnoses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_gardenVisitId_fkey" FOREIGN KEY ("gardenVisitId") REFERENCES "garden_visits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_gardenProjectId_fkey" FOREIGN KEY ("gardenProjectId") REFERENCES "garden_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_tenderProjectId_fkey" FOREIGN KEY ("tenderProjectId") REFERENCES "tender_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_soilTestReportId_fkey" FOREIGN KEY ("soilTestReportId") REFERENCES "soil_test_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_waterTestReportId_fkey" FOREIGN KEY ("waterTestReportId") REFERENCES "water_test_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;



