import type { RoleName } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { ResourceConfig } from "@/lib/api/crud";
import { adminRoles, allBusinessRoles, operationsRoles } from "@/lib/api/auth";
import {
  createCrudSchemas,
  jsonSchema,
  optionalDate,
  optionalDecimal,
  optionalInt,
  optionalString,
  optionalUuid,
  requiredDate,
  requiredDecimal,
  requiredInt,
  requiredString,
  requiredUuid
} from "@/lib/api/schemas";

const partnerRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN", "NURSERY_PARTNER", "LANDSCAPE_PARTNER", "FRANCHISE_PARTNER"];
const customerOpsRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN", "SUPERVISOR", "GARDENER", "CUSTOMER"];
const supervisorAdminRoles: RoleName[] = ["SUPER_ADMIN", "ADMIN", "SUPERVISOR"];

const GardenType = z.enum(["BALCONY", "TERRACE", "HOME", "SOCIETY", "COMMERCIAL", "FARMHOUSE", "GOVERNMENT", "INSTITUTIONAL"]);
const GardenStatus = z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "ARCHIVED"]);
const PlantCategory = z.enum(["INDOOR", "OUTDOOR", "PALM", "FRUIT", "FLOWER", "HERB", "VEGETABLE", "TREE", "SUCCULENT", "ORNAMENTAL", "OTHER"]);
const HealthStatus = z.enum(["HEALTHY", "NEEDS_ATTENTION", "SICK", "CRITICAL", "DEAD", "REPLACED"]);
const PlantTimelineType = z.enum(["PLANTED", "WATERED", "FERTILIZED", "PRUNED", "DIAGNOSED", "TREATED", "GROWTH_UPDATE", "WARRANTY_UPDATE", "REPLACEMENT_REQUESTED", "REPLACED", "NOTE"]);
const TimelineSource = z.enum(["CUSTOMER", "GARDENER", "SUPERVISOR", "ADMIN", "AI", "SYSTEM"]);
const Severity = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
const DiagnosisStatus = z.enum(["GENERATED", "REVIEWED", "ESCALATED", "CONSULTED", "ARCHIVED"]);
const MembershipBillingCycle = z.enum(["MONTHLY", "QUARTERLY", "YEARLY", "ONE_TIME"]);
const MembershipStatus = z.enum(["ACTIVE", "EXPIRED", "CANCELLED", "PAUSED", "PENDING_PAYMENT"]);
const ProductStatus = z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"]);
const OrderStatus = z.enum(["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "REFUNDED"]);
const PaymentStatus = z.enum(["CREATED", "PAID", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"]);
const PaymentPurpose = z.enum(["MEMBERSHIP", "STORE_ORDER", "SERVICE_REQUEST", "GARDEN_PROJECT", "EXPERT_CONSULTATION"]);
const PaymentProvider = z.enum(["RAZORPAY", "STRIPE", "CASH", "BANK_TRANSFER", "UPI"]);
const ProjectStatus = z.enum(["ENQUIRY", "SITE_SURVEY", "QUOTATION", "APPROVED", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"]);
const VisitStatus = z.enum(["SCHEDULED", "ASSIGNED", "ON_THE_WAY", "IN_PROGRESS", "COMPLETED", "MISSED", "CANCELLED"]);
const AttendanceStatus = z.enum(["PRESENT", "ABSENT", "HALF_DAY", "ON_LEAVE"]);
const ServiceRequestType = z.enum(["REGULAR_VISIT", "EMERGENCY", "PLANT_CARE", "PEST_CONTROL", "SOIL_CARE", "PRUNING", "INSTALLATION", "CONSULTATION"]);
const ServiceRequestStatus = z.enum(["REQUESTED", "SCHEDULED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);
const ScheduleStatus = z.enum(["ACTIVE", "PAUSED", "COMPLETED", "CANCELLED"]);
const InsuranceStatus = z.enum(["ACTIVE", "EXPIRED", "CANCELLED"]);
const ClaimStatus = z.enum(["REQUESTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "REPLACED", "CANCELLED"]);
const QRCodeEntityType = z.enum(["PLANT", "GARDEN", "VISIT", "ORDER", "MEMBERSHIP"]);
const CoinTransactionType = z.enum(["EARNED", "REDEEMED", "EXPIRED", "ADJUSTED"]);
const RewardType = z.enum(["GREEN_COINS", "COUPON", "DISCOUNT", "FREE_VISIT", "AI_CREDIT"]);
const CouponDiscountType = z.enum(["FLAT", "PERCENTAGE"]);
const NotificationType = z.enum(["SYSTEM", "AUTH", "PAYMENT", "MEMBERSHIP", "SERVICE", "PLANT_HEALTH", "ORDER", "REWARD", "CLAIM", "TENDER", "PROMOTION"]);
const NotificationChannel = z.enum(["IN_APP", "SMS", "EMAIL", "WHATSAPP", "PUSH"]);
const NotificationStatus = z.enum(["PENDING", "SENT", "FAILED", "READ"]);
const TestReportStatus = z.enum(["DRAFT", "SUBMITTED", "REVIEWED", "ACTION_REQUIRED", "ARCHIVED"]);
const TenderStatus = z.enum(["DRAFT", "SUBMITTED", "WON", "LOST", "CANCELLED", "WORK_ORDER_RECEIVED", "IN_PROGRESS", "COMPLETED", "CLOSED"]);

const customer = createCrudSchemas({
  userId: requiredUuid,
  preferredLanguage: optionalString,
  referralCode: optionalString
});

const garden = createCrudSchemas({
  customerId: requiredUuid,
  addressId: optionalUuid,
  name: requiredString,
  type: GardenType,
  status: GardenStatus.optional(),
  areaSqft: optionalInt,
  sunlightType: optionalString,
  waterSource: optionalString,
  notes: optionalString
});

const plant = createCrudSchemas({
  gardenId: requiredUuid,
  customerId: requiredUuid,
  name: requiredString,
  species: optionalString,
  category: PlantCategory.optional(),
  healthStatus: HealthStatus.optional(),
  imageUrl: optionalString,
  plantedAt: optionalDate,
  lastCheckedAt: optionalDate,
  replacementEligible: z.boolean().optional(),
  careNotes: optionalString
});

const plantPassport = createCrudSchemas({
  plantId: requiredUuid,
  passportCode: requiredString,
  qrCodeId: optionalUuid,
  origin: optionalString,
  plantDetails: jsonSchema.optional(),
  careSchedule: jsonSchema.optional(),
  wateringFrequency: optionalString,
  fertilizerFrequency: optionalString,
  sunlightRequirement: optionalString,
  warrantyStatus: optionalString,
  warrantyStartDate: optionalDate,
  warrantyEndDate: optionalDate,
  lastServiceDate: optionalDate,
  nextServiceDate: optionalDate
});

const plantTimeline = createCrudSchemas({
  plantId: requiredUuid,
  gardenId: optionalUuid,
  actorUserId: optionalUuid,
  type: PlantTimelineType,
  source: TimelineSource.optional(),
  title: requiredString,
  notes: optionalString,
  metadata: jsonSchema.optional()
});

const aiDiagnosis = createCrudSchemas({
  customerId: requiredUuid,
  plantId: optionalUuid,
  imageUrl: optionalString,
  symptomsText: optionalString,
  diseaseDetection: jsonSchema.optional(),
  pestDetection: jsonSchema.optional(),
  healthScore: optionalInt,
  waterRecommendation: optionalString,
  fertilizerRecommendation: optionalString,
  medicineRecommendation: optionalString,
  treatmentTimeline: jsonSchema.optional(),
  diagnosisSummary: optionalString,
  severity: Severity.optional(),
  confidenceScore: optionalDecimal,
  status: DiagnosisStatus.optional(),
  recommendedProducts: jsonSchema.optional()
});

const membershipPlan = createCrudSchemas({
  name: requiredString,
  slug: requiredString,
  description: optionalString,
  price: requiredDecimal,
  billingCycle: MembershipBillingCycle,
  durationDays: requiredInt,
  visitCount: optionalInt,
  plantCountLimit: optionalInt,
  aiDoctorLimit: optionalInt,
  replacementCoverageCount: optionalInt,
  storeDiscountPercentage: optionalDecimal,
  rewardMultiplier: optionalDecimal,
  features: jsonSchema.optional(),
  isActive: z.boolean().optional()
});

const activeMembership = createCrudSchemas({
  customerId: requiredUuid,
  planId: requiredUuid,
  status: MembershipStatus.optional(),
  startDate: optionalDate,
  endDate: optionalDate,
  remainingVisits: optionalInt,
  remainingAiCredits: optionalInt,
  remainingReplacements: optionalInt,
  autoRenew: z.boolean().optional()
});

const category = createCrudSchemas({
  parentId: optionalUuid,
  name: requiredString,
  slug: requiredString,
  description: optionalString
});

const product = createCrudSchemas({
  categoryId: optionalUuid,
  name: requiredString,
  slug: requiredString,
  description: optionalString,
  sku: requiredString,
  hsnCode: optionalString,
  gstRate: optionalDecimal,
  price: requiredDecimal,
  salePrice: optionalDecimal,
  status: ProductStatus.optional(),
  isAiRecommended: z.boolean().optional()
});

const inventory = createCrudSchemas({
  productId: requiredUuid,
  stockQuantity: optionalInt,
  reservedQuantity: optionalInt,
  lowStockThreshold: optionalInt,
  warehouseLocation: optionalString
});

const cart = createCrudSchemas({ customerId: requiredUuid });
const cartItem = createCrudSchemas({ cartId: requiredUuid, productId: requiredUuid, quantity: optionalInt });
const wishlist = createCrudSchemas({ customerId: requiredUuid, productId: requiredUuid });

const order = createCrudSchemas({
  customerId: requiredUuid,
  shippingAddressId: optionalUuid,
  orderNumber: requiredString,
  status: OrderStatus.optional(),
  subtotal: requiredDecimal,
  discountAmount: optionalDecimal,
  deliveryFee: optionalDecimal,
  gstAmount: optionalDecimal,
  totalAmount: requiredDecimal,
  trackingNumber: optionalString,
  invoiceUrl: optionalString
});

const orderItem = createCrudSchemas({
  orderId: requiredUuid,
  productId: optionalUuid,
  productNameSnapshot: requiredString,
  skuSnapshot: optionalString,
  quantity: requiredInt,
  unitPrice: requiredDecimal,
  gstRate: optionalDecimal,
  totalPrice: requiredDecimal
});

const payment = createCrudSchemas({
  userId: optionalUuid,
  orderId: optionalUuid,
  activeMembershipId: optionalUuid,
  gardenProjectId: optionalUuid,
  amount: requiredDecimal,
  currency: requiredString.optional(),
  provider: PaymentProvider.optional(),
  providerOrderId: optionalString,
  providerPaymentId: optionalString,
  providerSignature: optionalString,
  status: PaymentStatus.optional(),
  purpose: PaymentPurpose,
  metadata: jsonSchema.optional(),
  paidAt: optionalDate
});

const gardenProject = createCrudSchemas({
  customerId: optionalUuid,
  gardenId: optionalUuid,
  supervisorId: optionalUuid,
  title: requiredString,
  description: optionalString,
  projectType: optionalString,
  status: ProjectStatus.optional(),
  budgetEstimate: optionalDecimal,
  approvedBudget: optionalDecimal,
  startDate: optionalDate,
  endDate: optionalDate
});

const gardenVisit = createCrudSchemas({
  gardenId: requiredUuid,
  customerId: optionalUuid,
  gardenerId: optionalUuid,
  supervisorId: optionalUuid,
  serviceRequestId: optionalUuid,
  projectId: optionalUuid,
  scheduledAt: requiredDate,
  startedAt: optionalDate,
  completedAt: optionalDate,
  status: VisitStatus.optional(),
  workSummary: optionalString,
  beforeImages: jsonSchema.optional(),
  afterImages: jsonSchema.optional(),
  customerRating: optionalInt,
  customerFeedback: optionalString
});

const gardener = createCrudSchemas({
  userId: requiredUuid,
  employeeCode: requiredString,
  specialization: optionalString,
  experienceYears: optionalInt,
  serviceCity: optionalString,
  serviceArea: optionalString,
  rating: optionalDecimal,
  isAvailable: z.boolean().optional()
});

const supervisor = createCrudSchemas({
  userId: requiredUuid,
  employeeCode: requiredString,
  region: optionalString,
  managedCity: optionalString
});

const attendance = createCrudSchemas({
  gardenerId: requiredUuid,
  date: requiredDate,
  checkInAt: optionalDate,
  checkOutAt: optionalDate,
  status: AttendanceStatus.optional(),
  latitude: optionalDecimal,
  longitude: optionalDecimal,
  notes: optionalString
});

const serviceRequest = createCrudSchemas({
  customerId: requiredUuid,
  gardenId: requiredUuid,
  activeMembershipId: optionalUuid,
  projectId: optionalUuid,
  type: ServiceRequestType,
  description: optionalString,
  preferredDate: optionalDate,
  preferredTimeSlot: optionalString,
  priority: Severity.optional(),
  status: ServiceRequestStatus.optional()
});

const maintenanceSchedule = createCrudSchemas({
  gardenId: requiredUuid,
  gardenerId: optionalUuid,
  supervisorId: optionalUuid,
  activeMembershipId: optionalUuid,
  name: requiredString,
  frequency: requiredString,
  dayOfWeek: optionalInt,
  timeSlot: optionalString,
  startDate: requiredDate,
  endDate: optionalDate,
  status: ScheduleStatus.optional()
});

const plantInsurance = createCrudSchemas({
  customerId: requiredUuid,
  plantId: requiredUuid,
  activeMembershipId: optionalUuid,
  policyNumber: requiredString,
  status: InsuranceStatus.optional(),
  coverageStartDate: requiredDate,
  coverageEndDate: requiredDate,
  replacementLimit: optionalInt,
  remainingClaims: optionalInt,
  terms: jsonSchema.optional()
});

const insuranceClaim = createCrudSchemas({
  customerId: requiredUuid,
  plantId: requiredUuid,
  plantInsuranceId: optionalUuid,
  reviewedById: optionalUuid,
  replacementProductId: optionalUuid,
  claimNumber: requiredString,
  reason: requiredString,
  evidence: jsonSchema.optional(),
  status: ClaimStatus.optional(),
  adminNotes: optionalString,
  reviewedAt: optionalDate
});

const qrCode = createCrudSchemas({
  code: requiredString,
  entityType: QRCodeEntityType,
  entityId: requiredUuid,
  url: requiredString,
  plantId: optionalUuid,
  gardenId: optionalUuid,
  visitId: optionalUuid,
  scanCount: optionalInt,
  lastScannedAt: optionalDate
});

const greenCoinAccount = createCrudSchemas({
  customerId: requiredUuid,
  balance: optionalInt,
  lifetimeEarned: optionalInt,
  tier: requiredString.optional()
});

const greenCoinTransaction = createCrudSchemas({
  accountId: requiredUuid,
  type: CoinTransactionType,
  points: requiredInt,
  source: optionalString,
  description: optionalString,
  metadata: jsonSchema.optional()
});

const reward = createCrudSchemas({
  customerId: requiredUuid,
  type: RewardType,
  title: requiredString,
  description: optionalString,
  value: optionalDecimal,
  expiresAt: optionalDate,
  redeemedAt: optionalDate,
  metadata: jsonSchema.optional()
});

const coupon = createCrudSchemas({
  code: requiredString,
  title: requiredString,
  description: optionalString,
  discountType: CouponDiscountType,
  discountValue: requiredDecimal,
  minOrderValue: optionalDecimal,
  maxDiscount: optionalDecimal,
  usageLimit: optionalInt,
  usedCount: optionalInt,
  startsAt: optionalDate,
  expiresAt: optionalDate,
  isActive: z.boolean().optional()
});

const couponRedemption = createCrudSchemas({
  couponId: requiredUuid,
  customerId: requiredUuid,
  orderId: optionalUuid
});

const notification = createCrudSchemas({
  userId: requiredUuid,
  title: requiredString,
  message: requiredString,
  type: NotificationType,
  channel: NotificationChannel.optional(),
  status: NotificationStatus.optional(),
  metadata: jsonSchema.optional(),
  sentAt: optionalDate,
  readAt: optionalDate
});

const soilTestReport = createCrudSchemas({
  customerId: requiredUuid,
  gardenId: requiredUuid,
  phLevel: optionalDecimal,
  nitrogenLevel: optionalDecimal,
  phosphorusLevel: optionalDecimal,
  potassiumLevel: optionalDecimal,
  organicMatter: optionalDecimal,
  summary: optionalString,
  recommendations: jsonSchema.optional(),
  status: TestReportStatus.optional()
});

const waterTestReport = createCrudSchemas({
  customerId: requiredUuid,
  gardenId: requiredUuid,
  phLevel: optionalDecimal,
  tdsLevel: optionalDecimal,
  hardness: optionalDecimal,
  chlorineLevel: optionalDecimal,
  summary: optionalString,
  recommendations: jsonSchema.optional(),
  status: TestReportStatus.optional()
});

const tenderProject = createCrudSchemas({
  tenderNumber: requiredString,
  clientName: requiredString,
  departmentName: optionalString,
  contactPerson: optionalString,
  phone: optionalString,
  email: optionalString,
  title: requiredString,
  description: optionalString,
  estimatedValue: optionalDecimal,
  submissionDeadline: optionalDate,
  status: TenderStatus.optional(),
  workOrderNumber: optionalString,
  startDate: optionalDate,
  endDate: optionalDate
});

const documentSchema = createCrudSchemas({
  uploadedById: optionalUuid,
  gardenProjectId: optionalUuid,
  tenderProjectId: optionalUuid,
  type: z.enum(["CONTRACT", "INVOICE", "QUOTATION", "TENDER", "WORK_ORDER", "REPORT", "INSURANCE", "ID_PROOF", "OTHER"]),
  name: requiredString,
  url: requiredString,
  mimeType: optionalString,
  sizeBytes: optionalInt,
  metadata: jsonSchema.optional()
});

const baseSort = ["name", "title", "status", "createdAt", "updatedAt"];

export const resources: Record<string, ResourceConfig> = {
  customers: {
    resource: "customers",
    model: "Customer",
    delegate: prisma.customer,
    ...customer,
    readRoles: allBusinessRoles,
    writeRoles: adminRoles,
    customerField: "id",
    searchFields: ["referralCode", "preferredLanguage"],
    filterFields: ["id", "userId", "referralCode"],
    sortFields: ["preferredLanguage", "referralCode"]
  },
  gardens: {
    resource: "gardens",
    model: "Garden",
    delegate: prisma.garden,
    ...garden,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    customerField: "customerId",
    searchFields: ["name", "notes", "sunlightType", "waterSource"],
    filterFields: ["customerId", "addressId", "type", "status"],
    sortFields: baseSort,
    include: { address: true }
  },
  plants: {
    resource: "plants",
    model: "Plant",
    delegate: prisma.plant,
    ...plant,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    customerField: "customerId",
    searchFields: ["name", "species", "careNotes"],
    filterFields: ["gardenId", "customerId", "category", "healthStatus", "replacementEligible"],
    sortFields: ["name", "category", "healthStatus", "plantedAt", "lastCheckedAt"],
    include: { passport: true }
  },
  "plant-passports": {
    resource: "plant-passports",
    model: "PlantPassport",
    delegate: prisma.plantPassport,
    ...plantPassport,
    readRoles: customerOpsRoles,
    writeRoles: operationsRoles,
    searchFields: ["passportCode", "origin", "warrantyStatus"],
    filterFields: ["plantId", "passportCode", "qrCodeId", "warrantyStatus"],
    sortFields: ["passportCode", "warrantyStartDate", "warrantyEndDate", "nextServiceDate"],
    include: { plant: true, qrCode: true }
  },
  "plant-timelines": {
    resource: "plant-timelines",
    model: "PlantTimeline",
    delegate: prisma.plantTimeline,
    ...plantTimeline,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    searchFields: ["title", "notes"],
    filterFields: ["plantId", "gardenId", "actorUserId", "type", "source"],
    sortFields: ["type", "source", "title"]
  },
  "ai-diagnoses": {
    resource: "ai-diagnoses",
    model: "AIDiagnosis",
    delegate: prisma.aIDiagnosis,
    ...aiDiagnosis,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    customerField: "customerId",
    searchFields: ["symptomsText", "diagnosisSummary", "waterRecommendation", "fertilizerRecommendation", "medicineRecommendation"],
    filterFields: ["customerId", "plantId", "severity", "status"],
    sortFields: ["severity", "status", "healthScore", "confidenceScore"]
  },
  "membership-plans": {
    resource: "membership-plans",
    model: "MembershipPlan",
    delegate: prisma.membershipPlan,
    ...membershipPlan,
    readRoles: allBusinessRoles,
    writeRoles: adminRoles,
    searchFields: ["name", "slug", "description"],
    filterFields: ["slug", "billingCycle", "isActive"],
    sortFields: ["name", "price", "durationDays", "visitCount"]
  },
  memberships: {
    resource: "memberships",
    model: "ActiveMembership",
    delegate: prisma.activeMembership,
    ...activeMembership,
    readRoles: customerOpsRoles,
    writeRoles: adminRoles,
    customerField: "customerId",
    filterFields: ["customerId", "planId", "status", "autoRenew"],
    sortFields: ["status", "startDate", "endDate", "remainingVisits"],
    include: { plan: true }
  },
  "garden-services": {
    resource: "garden-services",
    model: "ServiceRequest",
    delegate: prisma.serviceRequest,
    ...serviceRequest,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    customerField: "customerId",
    searchFields: ["description", "preferredTimeSlot"],
    filterFields: ["customerId", "gardenId", "activeMembershipId", "projectId", "type", "priority", "status"],
    sortFields: ["type", "priority", "status", "preferredDate"],
    include: { garden: true }
  },
  categories: {
    resource: "categories",
    model: "Category",
    delegate: prisma.category,
    ...category,
    readRoles: allBusinessRoles,
    writeRoles: partnerRoles,
    searchFields: ["name", "slug", "description"],
    filterFields: ["parentId", "slug"],
    sortFields: ["name", "slug"],
    include: { parent: true }
  },
  products: {
    resource: "products",
    model: "Product",
    delegate: prisma.product,
    ...product,
    readRoles: allBusinessRoles,
    writeRoles: partnerRoles,
    searchFields: ["name", "slug", "description", "sku", "hsnCode"],
    filterFields: ["categoryId", "status", "isAiRecommended", "sku"],
    sortFields: ["name", "price", "salePrice", "status"],
    include: { category: true, inventory: true }
  },
  "garden-store": {
    resource: "garden-store",
    model: "Product",
    delegate: prisma.product,
    ...product,
    readRoles: allBusinessRoles,
    writeRoles: partnerRoles,
    searchFields: ["name", "slug", "description", "sku", "hsnCode"],
    filterFields: ["categoryId", "status", "isAiRecommended", "sku"],
    sortFields: ["name", "price", "salePrice", "status"],
    include: { category: true, inventory: true }
  },
  inventory: {
    resource: "inventory",
    model: "Inventory",
    delegate: prisma.inventory,
    ...inventory,
    readRoles: partnerRoles,
    writeRoles: partnerRoles,
    filterFields: ["productId", "stockQuantity", "warehouseLocation"],
    sortFields: ["stockQuantity", "reservedQuantity", "lowStockThreshold"],
    include: { product: true }
  },
  carts: {
    resource: "carts",
    model: "Cart",
    delegate: prisma.cart,
    ...cart,
    readRoles: customerOpsRoles,
    writeRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    customerField: "customerId",
    filterFields: ["customerId"],
    include: { items: { include: { product: true } } }
  },
  "cart-items": {
    resource: "cart-items",
    model: "CartItem",
    delegate: prisma.cartItem,
    ...cartItem,
    readRoles: customerOpsRoles,
    writeRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    filterFields: ["cartId", "productId"],
    sortFields: ["quantity"],
    include: { product: true }
  },
  wishlists: {
    resource: "wishlists",
    model: "Wishlist",
    delegate: prisma.wishlist,
    ...wishlist,
    readRoles: customerOpsRoles,
    writeRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    customerField: "customerId",
    filterFields: ["customerId", "productId"],
    include: { product: true }
  },
  orders: {
    resource: "orders",
    model: "Order",
    delegate: prisma.order,
    ...order,
    readRoles: customerOpsRoles,
    writeRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    customerField: "customerId",
    searchFields: ["orderNumber", "trackingNumber", "invoiceUrl"],
    filterFields: ["customerId", "shippingAddressId", "orderNumber", "status"],
    sortFields: ["orderNumber", "status", "subtotal", "totalAmount"],
    include: { items: true, payments: true }
  },
  "order-items": {
    resource: "order-items",
    model: "OrderItem",
    delegate: prisma.orderItem,
    ...orderItem,
    readRoles: customerOpsRoles,
    writeRoles: adminRoles,
    searchFields: ["productNameSnapshot", "skuSnapshot"],
    filterFields: ["orderId", "productId"],
    sortFields: ["quantity", "unitPrice", "totalPrice"]
  },
  payments: {
    resource: "payments",
    model: "Payment",
    delegate: prisma.payment,
    ...payment,
    readRoles: allBusinessRoles,
    writeRoles: adminRoles,
    userField: "userId",
    searchFields: ["providerOrderId", "providerPaymentId"],
    filterFields: ["userId", "orderId", "activeMembershipId", "gardenProjectId", "status", "purpose", "provider"],
    sortFields: ["amount", "status", "purpose", "paidAt"]
  },
  projects: {
    resource: "projects",
    model: "GardenProject",
    delegate: prisma.gardenProject,
    ...gardenProject,
    readRoles: customerOpsRoles,
    writeRoles: supervisorAdminRoles,
    customerField: "customerId",
    supervisorField: "supervisorId",
    searchFields: ["title", "description", "projectType"],
    filterFields: ["customerId", "gardenId", "supervisorId", "status", "projectType"],
    sortFields: ["title", "status", "budgetEstimate", "approvedBudget", "startDate", "endDate"]
  },
  "garden-visits": {
    resource: "garden-visits",
    model: "GardenVisit",
    delegate: prisma.gardenVisit,
    ...gardenVisit,
    readRoles: customerOpsRoles,
    writeRoles: operationsRoles,
    customerField: "customerId",
    gardenerField: "gardenerId",
    supervisorField: "supervisorId",
    searchFields: ["workSummary", "customerFeedback"],
    filterFields: ["gardenId", "customerId", "gardenerId", "supervisorId", "serviceRequestId", "projectId", "status"],
    sortFields: ["scheduledAt", "startedAt", "completedAt", "status", "customerRating"]
  },
  gardeners: {
    resource: "gardeners",
    model: "Gardener",
    delegate: prisma.gardener,
    ...gardener,
    readRoles: operationsRoles,
    writeRoles: adminRoles,
    gardenerField: "id",
    searchFields: ["employeeCode", "specialization", "serviceCity", "serviceArea"],
    filterFields: ["userId", "employeeCode", "serviceCity", "serviceArea", "isAvailable"],
    sortFields: ["employeeCode", "experienceYears", "rating", "isAvailable"]
  },
  supervisors: {
    resource: "supervisors",
    model: "Supervisor",
    delegate: prisma.supervisor,
    ...supervisor,
    readRoles: supervisorAdminRoles,
    writeRoles: adminRoles,
    supervisorField: "id",
    searchFields: ["employeeCode", "region", "managedCity"],
    filterFields: ["userId", "employeeCode", "region", "managedCity"],
    sortFields: ["employeeCode", "region", "managedCity"]
  },
  attendance: {
    resource: "attendance",
    model: "Attendance",
    delegate: prisma.attendance,
    ...attendance,
    readRoles: operationsRoles,
    writeRoles: operationsRoles,
    gardenerField: "gardenerId",
    filterFields: ["gardenerId", "date", "status"],
    sortFields: ["date", "status", "checkInAt", "checkOutAt"]
  },
  "maintenance-schedules": {
    resource: "maintenance-schedules",
    model: "MaintenanceSchedule",
    delegate: prisma.maintenanceSchedule,
    ...maintenanceSchedule,
    readRoles: operationsRoles,
    writeRoles: supervisorAdminRoles,
    gardenerField: "gardenerId",
    supervisorField: "supervisorId",
    searchFields: ["name", "frequency", "timeSlot"],
    filterFields: ["gardenId", "gardenerId", "supervisorId", "activeMembershipId", "status"],
    sortFields: ["name", "startDate", "endDate", "status", "dayOfWeek"]
  },
  notifications: {
    resource: "notifications",
    model: "Notification",
    delegate: prisma.notification,
    ...notification,
    readRoles: allBusinessRoles,
    writeRoles: adminRoles,
    userField: "userId",
    searchFields: ["title", "message"],
    filterFields: ["userId", "type", "channel", "status"],
    sortFields: ["type", "channel", "status", "sentAt", "readAt"]
  },
  "green-coins": {
    resource: "green-coins",
    model: "GreenCoinAccount",
    delegate: prisma.greenCoinAccount,
    ...greenCoinAccount,
    readRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    writeRoles: adminRoles,
    customerField: "customerId",
    filterFields: ["customerId", "tier"],
    sortFields: ["balance", "lifetimeEarned", "tier"],
    include: { transactions: true }
  },
  "green-coin-transactions": {
    resource: "green-coin-transactions",
    model: "GreenCoinTransaction",
    delegate: prisma.greenCoinTransaction,
    ...greenCoinTransaction,
    readRoles: adminRoles,
    writeRoles: adminRoles,
    searchFields: ["source", "description"],
    filterFields: ["accountId", "type", "source"],
    sortFields: ["type", "points"]
  },
  rewards: {
    resource: "rewards",
    model: "Reward",
    delegate: prisma.reward,
    ...reward,
    readRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    writeRoles: adminRoles,
    customerField: "customerId",
    searchFields: ["title", "description"],
    filterFields: ["customerId", "type"],
    sortFields: ["type", "value", "expiresAt", "redeemedAt"]
  },
  coupons: {
    resource: "coupons",
    model: "Coupon",
    delegate: prisma.coupon,
    ...coupon,
    readRoles: allBusinessRoles,
    writeRoles: adminRoles,
    searchFields: ["code", "title", "description"],
    filterFields: ["code", "discountType", "isActive"],
    sortFields: ["code", "discountValue", "usedCount", "startsAt", "expiresAt"]
  },
  "coupon-redemptions": {
    resource: "coupon-redemptions",
    model: "CouponRedemption",
    delegate: prisma.couponRedemption,
    ...couponRedemption,
    readRoles: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
    writeRoles: adminRoles,
    customerField: "customerId",
    filterFields: ["couponId", "customerId", "orderId"],
    sortFields: ["redeemedAt"]
  },
  "plant-insurance": {
    resource: "plant-insurance",
    model: "PlantInsurance",
    delegate: prisma.plantInsurance,
    ...plantInsurance,
    readRoles: customerOpsRoles,
    writeRoles: adminRoles,
    customerField: "customerId",
    searchFields: ["policyNumber"],
    filterFields: ["customerId", "plantId", "activeMembershipId", "policyNumber", "status"],
    sortFields: ["policyNumber", "status", "coverageStartDate", "coverageEndDate", "remainingClaims"]
  },
  "insurance-claims": {
    resource: "insurance-claims",
    model: "InsuranceClaim",
    delegate: prisma.insuranceClaim,
    ...insuranceClaim,
    readRoles: customerOpsRoles,
    writeRoles: customerOpsRoles,
    customerField: "customerId",
    supervisorField: "reviewedById",
    searchFields: ["claimNumber", "reason", "adminNotes"],
    filterFields: ["customerId", "plantId", "plantInsuranceId", "reviewedById", "replacementProductId", "claimNumber", "status"],
    sortFields: ["claimNumber", "status", "reviewedAt"]
  },
  "qr-codes": {
    resource: "qr-codes",
    model: "QRCode",
    delegate: prisma.qRCode,
    ...qrCode,
    readRoles: allBusinessRoles,
    writeRoles: operationsRoles,
    searchFields: ["code", "url"],
    filterFields: ["code", "entityType", "entityId", "plantId", "gardenId", "visitId"],
    sortFields: ["code", "entityType", "scanCount", "lastScannedAt"]
  },
  "soil-tests": {
    resource: "soil-tests",
    model: "SoilTestReport",
    delegate: prisma.soilTestReport,
    ...soilTestReport,
    readRoles: customerOpsRoles,
    writeRoles: operationsRoles,
    customerField: "customerId",
    filterFields: ["customerId", "gardenId", "status"],
    sortFields: ["phLevel", "nitrogenLevel", "phosphorusLevel", "potassiumLevel", "organicMatter", "status"]
  },
  "water-tests": {
    resource: "water-tests",
    model: "WaterTestReport",
    delegate: prisma.waterTestReport,
    ...waterTestReport,
    readRoles: customerOpsRoles,
    writeRoles: operationsRoles,
    customerField: "customerId",
    filterFields: ["customerId", "gardenId", "status"],
    sortFields: ["phLevel", "tdsLevel", "hardness", "chlorineLevel", "status"]
  },
  "tender-projects": {
    resource: "tender-projects",
    model: "TenderProject",
    delegate: prisma.tenderProject,
    ...tenderProject,
    readRoles: supervisorAdminRoles,
    writeRoles: adminRoles,
    searchFields: ["tenderNumber", "clientName", "departmentName", "contactPerson", "phone", "email", "title", "description", "workOrderNumber"],
    filterFields: ["tenderNumber", "clientName", "status", "workOrderNumber"],
    sortFields: ["tenderNumber", "clientName", "estimatedValue", "submissionDeadline", "status", "startDate", "endDate"],
    include: { documents: true }
  },
  documents: {
    resource: "documents",
    model: "Document",
    delegate: prisma.document,
    ...documentSchema,
    readRoles: supervisorAdminRoles,
    writeRoles: supervisorAdminRoles,
    searchFields: ["name", "url", "mimeType"],
    filterFields: ["uploadedById", "gardenProjectId", "tenderProjectId", "type"],
    sortFields: ["name", "type", "sizeBytes"]
  }
};

export function getResourceConfig(resource: string) {
  return resources[resource];
}
