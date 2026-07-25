import type { GardenLiveModuleConfig } from "@/components/modules/module-workspace";

const customerId = "00000000-0000-0000-0000-000000000001";
const gardenId = "00000000-0000-0000-0000-000000000002";
const plantId = "00000000-0000-0000-0000-000000000003";
const userId = "00000000-0000-0000-0000-000000000004";
const gardenerId = "00000000-0000-0000-0000-000000000005";
const supervisorId = "00000000-0000-0000-0000-000000000006";

export const moduleConfigs = {
  membershipSystem: {
    title: "Membership System",
    eyebrow: "Garden Live Memberships",
    description: "Manage plans, active memberships, renewals, benefits, remaining visits, AI credits, rewards, and payment readiness.",
    primaryResource: "membership-plans",
    resources: [
      {
        label: "Plans",
        resource: "membership-plans",
        searchPlaceholder: "Search plans, slugs, pricing",
        columns: ["name", "slug", "price", "billingCycle", "durationDays"],
        createTemplate: { name: "Premium Garden", slug: "premium-garden", price: "7999", billingCycle: "MONTHLY", durationDays: 30 }
      },
      {
        label: "Active Memberships",
        resource: "memberships",
        searchPlaceholder: "Search memberships",
        columns: ["customerId", "planId", "status", "remainingVisits", "remainingAiCredits"],
        createTemplate: { customerId, planId: customerId, status: "PENDING_PAYMENT", remainingVisits: 4, remainingAiCredits: 10 }
      },
      {
        label: "Payments",
        resource: "payments",
        searchPlaceholder: "Search payments",
        columns: ["amount", "status", "purpose", "provider"],
        createTemplate: { userId, amount: "7999", purpose: "MEMBERSHIP", provider: "RAZORPAY" }
      }
    ],
    workflows: [
      { title: "Plan purchase", detail: "Customer selects plan, payment is created, membership starts after paid status.", status: "Live" },
      { title: "Renewal", detail: "Auto-renew and manual renewal can update end dates and remaining visit counters.", status: "Live" },
      { title: "Upgrade", detail: "Admin can create a new active membership and preserve audit trail.", status: "Ready" }
    ]
  },
  plantNursery: {
    title: "Plant Nursery",
    eyebrow: "Nursery Operations",
    description: "Run nursery catalog, plant stock, categories, inventory, QR tags, and supplier-ready product data.",
    primaryResource: "products",
    resources: [
      { label: "Products", resource: "products", searchPlaceholder: "Search nursery products", columns: ["name", "sku", "price", "status"], createTemplate: { name: "Areca Palm", slug: "areca-palm", sku: "GL-PLANT-001", price: "499", status: "DRAFT" } },
      { label: "Categories", resource: "categories", searchPlaceholder: "Search categories", columns: ["name", "slug", "description"], createTemplate: { name: "Indoor Plants", slug: "indoor-plants" } },
      { label: "Inventory", resource: "inventory", searchPlaceholder: "Search stock", columns: ["productId", "stockQuantity", "reservedQuantity", "lowStockThreshold"], createTemplate: { productId: plantId, stockQuantity: 100, reservedQuantity: 0, lowStockThreshold: 10 } }
    ],
    workflows: [
      { title: "Stock intake", detail: "Create product, attach inventory, add images, approve for store.", status: "Live" },
      { title: "Low stock", detail: "Inventory alerts show products below configured threshold.", status: "Live" },
      { title: "Plant tagging", detail: "QR codes can be generated against product or plant records.", status: "Ready" }
    ]
  },
  landscaping: {
    title: "Landscaping",
    eyebrow: "Landscape CRM",
    description: "Manage leads, surveys, quotations, project approvals, project tracking, documents, visits, and payments.",
    primaryResource: "projects",
    resources: [
      { label: "Projects", resource: "projects", searchPlaceholder: "Search projects", columns: ["title", "projectType", "status", "budgetEstimate"], createTemplate: { title: "Premium Terrace Landscape", customerId, gardenId, projectType: "Terrace Garden", status: "ENQUIRY" } },
      { label: "Services", resource: "garden-services", searchPlaceholder: "Search services", columns: ["type", "priority", "status", "preferredDate"], createTemplate: { customerId, gardenId, type: "CONSULTATION", priority: "LOW" } },
      { label: "Documents", resource: "documents", searchPlaceholder: "Search documents", columns: ["name", "type", "url"], createTemplate: { type: "QUOTATION", name: "Landscape Quote", url: "https://gardenlive.in/quote.pdf" } }
    ],
    workflows: [
      { title: "Lead to survey", detail: "Capture enquiry, assign supervisor, schedule survey visit.", status: "Live" },
      { title: "Quotation", detail: "Attach quotation documents and move project to approval.", status: "Ready" },
      { title: "Execution", detail: "Track visits, payments, media and completion status.", status: "Live" }
    ]
  },
  gardenMaintenance: {
    title: "Garden Maintenance",
    eyebrow: "Maintenance Operations",
    description: "Coordinate scheduled maintenance, service requests, visit reports, before-after images, and customer feedback.",
    primaryResource: "maintenance-schedules",
    resources: [
      { label: "Schedules", resource: "maintenance-schedules", searchPlaceholder: "Search schedules", columns: ["name", "frequency", "status", "startDate"], createTemplate: { gardenId, name: "Weekly Care", frequency: "Weekly", startDate: new Date().toISOString(), status: "ACTIVE" } },
      { label: "Visits", resource: "garden-visits", searchPlaceholder: "Search visits", columns: ["scheduledAt", "status", "workSummary", "customerRating"], createTemplate: { gardenId, customerId, scheduledAt: new Date().toISOString(), status: "SCHEDULED" } },
      { label: "Requests", resource: "garden-services", searchPlaceholder: "Search service requests", columns: ["type", "priority", "status", "preferredTimeSlot"], createTemplate: { customerId, gardenId, type: "REGULAR_VISIT", priority: "LOW" } }
    ],
    workflows: [
      { title: "Schedule creation", detail: "Admin creates maintenance cadence and assigns staff.", status: "Live" },
      { title: "Visit reporting", detail: "Gardener completes visit with summary and photos.", status: "Live" },
      { title: "Customer feedback", detail: "Ratings and comments feed quality dashboards.", status: "Ready" }
    ]
  },
  dedicatedGardener: {
    title: "Dedicated Gardener",
    eyebrow: "Staff Allocation",
    description: "Manage dedicated gardeners, attendance, availability, visits, assignments, ratings, and region workload.",
    primaryResource: "gardeners",
    resources: [
      { label: "Gardeners", resource: "gardeners", searchPlaceholder: "Search gardeners", columns: ["employeeCode", "specialization", "serviceCity", "isAvailable"], createTemplate: { userId, employeeCode: "GL-GRD-001", specialization: "Premium garden care", isAvailable: true } },
      { label: "Attendance", resource: "attendance", searchPlaceholder: "Search attendance", columns: ["gardenerId", "date", "status", "checkInAt"], createTemplate: { gardenerId, date: new Date().toISOString(), status: "PRESENT" } },
      { label: "Visits", resource: "garden-visits", searchPlaceholder: "Search assigned visits", columns: ["gardenId", "gardenerId", "scheduledAt", "status"], createTemplate: { gardenId, gardenerId, scheduledAt: new Date().toISOString(), status: "ASSIGNED" } }
    ],
    workflows: [
      { title: "Assignment", detail: "Map gardener to maintenance schedule or visit.", status: "Live" },
      { title: "Attendance", detail: "Track check-in, check-out and availability.", status: "Live" },
      { title: "Performance", detail: "Use ratings and completed jobs for quality control.", status: "Ready" }
    ]
  },
  corporateSolutions: {
    title: "Corporate Solutions",
    eyebrow: "B2B Garden Live",
    description: "Manage corporate landscaping, tenders, institutional clients, recurring maintenance, documents, and work orders.",
    primaryResource: "tender-projects",
    resources: [
      { label: "Tenders", resource: "tender-projects", searchPlaceholder: "Search tenders", columns: ["tenderNumber", "clientName", "title", "status"], createTemplate: { tenderNumber: "TEN-001", clientName: "Corporate Client", title: "Campus Garden Maintenance", status: "DRAFT" } },
      { label: "Projects", resource: "projects", searchPlaceholder: "Search corporate projects", columns: ["title", "projectType", "status", "approvedBudget"], createTemplate: { title: "Corporate Green Wall", projectType: "Vertical Garden", status: "ENQUIRY" } },
      { label: "Documents", resource: "documents", searchPlaceholder: "Search contracts", columns: ["name", "type", "url"], createTemplate: { type: "CONTRACT", name: "Corporate Agreement", url: "https://gardenlive.in/contract.pdf" } }
    ],
    workflows: [
      { title: "Tender pipeline", detail: "Track submission, win/loss, work order and completion.", status: "Live" },
      { title: "Corporate project", detail: "Convert approved work orders into tracked projects.", status: "Ready" },
      { title: "Documents", detail: "Maintain contracts, invoices and reports.", status: "Live" }
    ]
  },
  aiPlantDoctor: {
    title: "AI Plant Doctor",
    eyebrow: "AI Diagnostics",
    description: "Review diagnosis reports, disease/pest detections, health scores, treatment timelines, and product recommendations.",
    primaryResource: "ai-diagnoses",
    resources: [
      { label: "Diagnoses", resource: "ai-diagnoses", searchPlaceholder: "Search symptoms or summaries", columns: ["customerId", "plantId", "severity", "status"], createTemplate: { customerId, plantId, symptomsText: "Yellow leaves", severity: "LOW", status: "GENERATED" } },
      { label: "Plants", resource: "plants", searchPlaceholder: "Search plants", columns: ["name", "species", "category", "healthStatus"], createTemplate: { gardenId, customerId, name: "Money Plant", category: "INDOOR" } },
      { label: "Products", resource: "products", searchPlaceholder: "Search recommended products", columns: ["name", "sku", "price", "status"], createTemplate: { name: "Neem Oil", slug: "neem-oil", sku: "GL-MED-001", price: "299" } }
    ],
    workflows: [
      { title: "Diagnosis review", detail: "Review AI-generated diagnosis before escalation.", status: "Live" },
      { title: "Treatment plan", detail: "Track water, fertilizer, medicine and timeline guidance.", status: "Ready" },
      { title: "Expert consult", detail: "Escalate critical cases to plant experts.", status: "Ready" }
    ]
  },
  plantScanner: {
    title: "Plant Scanner",
    eyebrow: "Scanner Workspace",
    description: "Operate plant scan records, QR lookups, plant identification, diagnosis history, and scanner-ready plant records.",
    primaryResource: "plants",
    resources: [
      { label: "Plants", resource: "plants", searchPlaceholder: "Search scanned plants", columns: ["name", "species", "category", "healthStatus"], createTemplate: { gardenId, customerId, name: "Scanned Plant", category: "OTHER" } },
      { label: "QR Codes", resource: "qr-codes", searchPlaceholder: "Search QR codes", columns: ["code", "entityType", "url", "scanCount"], createTemplate: { code: "GL-QR-001", entityType: "PLANT", entityId: plantId, url: "https://gardenlive.in/passport/GL-QR-001" } },
      { label: "AI Diagnoses", resource: "ai-diagnoses", searchPlaceholder: "Search scan diagnoses", columns: ["plantId", "healthScore", "severity", "status"], createTemplate: { customerId, plantId, healthScore: 86, severity: "LOW" } }
    ],
    workflows: [
      { title: "Scan", detail: "Identify plant or QR passport record.", status: "Live" },
      { title: "Health check", detail: "Attach AI diagnosis and care recommendation.", status: "Ready" },
      { title: "Passport sync", detail: "Open QR passport timeline from scanner.", status: "Live" }
    ]
  },
  qrPlantPassport: {
    title: "QR Plant Passport",
    eyebrow: "Plant Passport System",
    description: "Manage QR codes, plant details, care timelines, warranty status, growth history, and replacement eligibility.",
    primaryResource: "plant-passports",
    resources: [
      { label: "Passports", resource: "plant-passports", searchPlaceholder: "Search passport codes", columns: ["passportCode", "plantId", "warrantyStatus", "nextServiceDate"], createTemplate: { plantId, passportCode: "GL-PASS-001" } },
      { label: "QR Codes", resource: "qr-codes", searchPlaceholder: "Search QR codes", columns: ["code", "entityType", "url", "scanCount"], createTemplate: { code: "GL-QR-002", entityType: "PLANT", entityId: plantId, url: "https://gardenlive.in/passport/GL-QR-002" } },
      { label: "Timeline", resource: "plant-timelines", searchPlaceholder: "Search timelines", columns: ["title", "type", "source", "createdAt"], createTemplate: { plantId, title: "Growth update", type: "GROWTH_UPDATE", source: "SYSTEM" } }
    ],
    workflows: [
      { title: "Passport creation", detail: "Create plant passport and link QR code.", status: "Live" },
      { title: "Care timeline", detail: "Record watering, pruning, diagnosis and growth events.", status: "Live" },
      { title: "Warranty", detail: "Track warranty and replacement status.", status: "Ready" }
    ]
  },
  customerApp: {
    title: "Customer App",
    eyebrow: "Customer Experience",
    description: "Customer-facing operational app for gardens, plants, memberships, orders, support, rewards, notifications and passports.",
    primaryResource: "customers",
    resources: [
      { label: "Customers", resource: "customers", searchPlaceholder: "Search customers", columns: ["userId", "preferredLanguage", "referralCode"], createTemplate: { userId, preferredLanguage: "en-IN", referralCode: "GL-CUST-001" } },
      { label: "Gardens", resource: "gardens", searchPlaceholder: "Search gardens", columns: ["name", "type", "status", "areaSqft"], createTemplate: { customerId, name: "Home Garden", type: "HOME" } },
      { label: "Orders", resource: "orders", searchPlaceholder: "Search orders", columns: ["orderNumber", "status", "subtotal", "totalAmount"], createTemplate: { customerId, orderNumber: "GL-ORD-001", subtotal: "1000", totalAmount: "1000" } },
      { label: "Notifications", resource: "notifications", searchPlaceholder: "Search notifications", columns: ["title", "type", "channel", "status"], createTemplate: { userId, title: "Visit scheduled", message: "Your gardener will visit tomorrow.", type: "SERVICE" } }
    ],
    workflows: [
      { title: "My Garden", detail: "Show garden overview, plant list, visits and health score.", status: "Live" },
      { title: "Support", detail: "Notifications and service requests connect customer support.", status: "Live" },
      { title: "Commerce", detail: "Orders, wishlist, cart and coupons are wired to APIs.", status: "Ready" }
    ]
  },
  gardenerApp: {
    title: "Gardener App",
    eyebrow: "Field Staff App",
    description: "Mobile-friendly gardener operations for assigned visits, attendance, maintenance reports, plant updates and customer ratings.",
    primaryResource: "garden-visits",
    resources: [
      { label: "Visits", resource: "garden-visits", searchPlaceholder: "Search visits", columns: ["gardenId", "gardenerId", "scheduledAt", "status"], createTemplate: { gardenId, gardenerId, scheduledAt: new Date().toISOString(), status: "ASSIGNED" } },
      { label: "Attendance", resource: "attendance", searchPlaceholder: "Search attendance", columns: ["gardenerId", "date", "status", "checkInAt"], createTemplate: { gardenerId, date: new Date().toISOString(), status: "PRESENT" } },
      { label: "Plant Timeline", resource: "plant-timelines", searchPlaceholder: "Search updates", columns: ["title", "type", "source", "createdAt"], createTemplate: { plantId, gardenId, title: "Watered plants", type: "WATERED", source: "GARDENER" } }
    ],
    workflows: [
      { title: "Today route", detail: "List assigned visits and update status.", status: "Live" },
      { title: "Attendance", detail: "Record check-in and check-out.", status: "Live" },
      { title: "Service report", detail: "Add summaries and before-after images.", status: "Ready" }
    ]
  },
  supervisorApp: {
    title: "Supervisor App",
    eyebrow: "Supervisor Control",
    description: "Supervisor tools for field oversight, project tracking, visit reviews, gardener allocation and insurance claim review.",
    primaryResource: "supervisors",
    resources: [
      { label: "Supervisors", resource: "supervisors", searchPlaceholder: "Search supervisors", columns: ["employeeCode", "region", "managedCity"], createTemplate: { userId, employeeCode: "GL-SUP-001", region: "South", managedCity: "Hyderabad" } },
      { label: "Projects", resource: "projects", searchPlaceholder: "Search projects", columns: ["title", "status", "supervisorId", "approvedBudget"], createTemplate: { title: "Supervisor Project", supervisorId, status: "SITE_SURVEY" } },
      { label: "Claims", resource: "insurance-claims", searchPlaceholder: "Search claims", columns: ["claimNumber", "reason", "status", "reviewedAt"], createTemplate: { customerId, plantId, claimNumber: "GL-CLM-001", reason: "Plant replacement requested" } }
    ],
    workflows: [
      { title: "Field review", detail: "Review visits, ratings and service outcomes.", status: "Live" },
      { title: "Claim review", detail: "Approve or reject plant insurance claims.", status: "Ready" },
      { title: "Project control", detail: "Track landscaping and maintenance teams.", status: "Live" }
    ]
  },
  adminPanel: {
    title: "Admin Panel",
    eyebrow: "Enterprise Control",
    description: "Unified admin control for customers, memberships, products, projects, tenders, notifications, rewards and analytics resources.",
    primaryResource: "customers",
    resources: [
      { label: "Customers", resource: "customers", searchPlaceholder: "Search customers", columns: ["userId", "preferredLanguage", "referralCode"], createTemplate: { userId, preferredLanguage: "en-IN" } },
      { label: "Products", resource: "products", searchPlaceholder: "Search products", columns: ["name", "sku", "price", "status"], createTemplate: { name: "Admin Product", slug: "admin-product", sku: "GL-ADM-001", price: "100" } },
      { label: "Orders", resource: "orders", searchPlaceholder: "Search orders", columns: ["orderNumber", "status", "subtotal", "totalAmount"], createTemplate: { customerId, orderNumber: "GL-ADM-ORD", subtotal: "500", totalAmount: "500" } },
      { label: "Rewards", resource: "rewards", searchPlaceholder: "Search rewards", columns: ["title", "type", "value", "expiresAt"], createTemplate: { customerId, type: "GREEN_COINS", title: "Welcome Reward" } }
    ],
    workflows: [
      { title: "Operations", detail: "Manage master records and module health.", status: "Live" },
      { title: "Analytics", detail: "Use resource totals and exports for operations reporting.", status: "Ready" },
      { title: "Governance", detail: "All actions are protected by auth and audit logging.", status: "Live" }
    ]
  }
} satisfies Record<string, GardenLiveModuleConfig>;
