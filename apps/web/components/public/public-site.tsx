import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Flower2,
  Image as ImageIcon,
  Leaf,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  QrCode,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  TreePine,
  Users,
  Wrench
} from "lucide-react";
import { Badge, Button, FAQAccordion, Footer, Navbar, SectionHeading, TestimonialCard } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";

const brandLine = "Garden Live - India's First AI Powered Digital Garden Membership Platform";
const whatsappHref = "https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit";
const callHref = "tel:+919999999999";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Membership", href: "/membership-plans" },
  { label: "AI Doctor", href: "/ai-plant-doctor" },
  { label: "Store", href: "/garden-store" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects Portfolio", href: "/projects" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "Landscaping", href: "/landscaping" },
      { label: "Plant Nursery", href: "/plant-nursery" },
      { label: "Garden Maintenance", href: "/garden-maintenance" },
      { label: "Dedicated Gardener", href: "/dedicated-gardener" }
    ]
  },
  {
    title: "Platform",
    links: [
      { label: "Membership Plans", href: "/membership-plans" },
      { label: "AI Plant Doctor", href: "/ai-plant-doctor" },
      { label: "Plant Scanner", href: "/plant-scanner" },
      { label: "QR Plant Passport", href: "/qr-plant-passport" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "Garden Store", href: "/garden-store" },
      { label: "Corporate Solutions", href: "/corporate-solutions" },
      { label: "Book Garden Visit", href: "/book-garden-visit" },
      { label: "Login", href: "/login" }
    ]
  }
];

const imagePool = {
  home: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=2200&q=88",
  about: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2200&q=88",
  services: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2200&q=88",
  landscaping: "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=2200&q=88",
  nursery: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2200&q=88",
  maintenance: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=2200&q=88",
  gardener: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2200&q=88",
  membership: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=88",
  corporate: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=88",
  ai: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=2200&q=88",
  scanner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2200&q=88",
  passport: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=2200&q=88",
  store: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2200&q=88",
  projects: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88",
  gallery: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2200&q=88",
  blog: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=2200&q=88",
  contact: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=88"
};

const services = [
  { title: "Landscaping", href: "/landscaping", icon: TreePine, description: "Site survey, design, quotation, approval, execution tracking, project documents, and maintenance handover." },
  { title: "Plant Nursery", href: "/plant-nursery", icon: Sprout, description: "Indoor plants, outdoor plants, palms, fruit plants, timber plants, shrubs, creepers, ground cover, topiary, and flowers." },
  { title: "Garden Maintenance", href: "/garden-maintenance", icon: Wrench, description: "Scheduled visits, plant health score, service reports, visit history, before-after photos, and supervisor review." },
  { title: "Dedicated Gardener", href: "/dedicated-gardener", icon: Users, description: "Dedicated gardener programs for luxury homes, villas, farmhouses, societies, offices, and campuses." },
  { title: "Membership Plans", href: "/membership-plans", icon: ShieldCheck, description: "Plant Care, Smart Garden, Home Garden, Premium Garden, Luxury Garden, and Dedicated Gardener plans." },
  { title: "Corporate Solutions", href: "/corporate-solutions", icon: Building2, description: "Corporate greenery, office plants, vertical gardens, AMC maintenance, tenders, work orders, and reporting." },
  { title: "AI Plant Doctor", href: "/ai-plant-doctor", icon: Bot, description: "Disease detection, pest detection, water schedule, fertilizer recommendation, medicine recommendation, and expert consultation." },
  { title: "Plant Scanner", href: "/plant-scanner", icon: ScanSearch, description: "Scan plants, identify health signals, connect QR passports, and update care timelines." },
  { title: "QR Plant Passport", href: "/qr-plant-passport", icon: QrCode, description: "Plant details, care timeline, warranty, growth history, replacement status, and diagnosis records." },
  { title: "Garden Store", href: "/garden-store", icon: ShoppingBag, description: "Plants, pots, planters, garden tools, fertilizers, medicines, seeds, smart kits, irrigation, and garden furniture." }
  ,
  { title: "Garden Health Reports", href: "/garden-health-reports", icon: Leaf, description: "Garden health score, plant health score, soil score, water score, visit completion, pest risk, and AI recommendations." }
];

const testimonials = [
  {
    quote: "Garden Live changed our terrace from a weekend worry into a managed green space. The visit history, before-after photos, and plant health score make the service feel world-class.",
    name: "Ananya R.",
    role: "Home Garden member",
    rating: 5
  },
  {
    quote: "Their landscaping process felt premium from the first survey. Design, quotation, execution, documentation, and maintenance handover were all handled with clarity.",
    name: "Rahul M.",
    role: "Villa landscaping client",
    rating: 4.9
  },
  {
    quote: "AI Plant Doctor detected a pest issue early, then the gardener visit closed the loop. The QR passport now holds the entire treatment history.",
    name: "Meera S.",
    role: "Smart Garden member",
    rating: 4.8
  }
];

const faqs = [
  {
    question: "What is Garden Live?",
    answer: "Garden Live is India's First AI Powered Digital Garden Membership Platform, bringing garden maintenance, landscaping, plant nursery, AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Store, rewards, and service workflows into one premium platform."
  },
  {
    question: "Can I book a free garden survey?",
    answer: "Yes. Customers can book a garden visit or survey for home gardens, terrace gardens, landscaping, plant nursery needs, maintenance, dedicated gardener requirements, and corporate green solutions."
  },
  {
    question: "What does the Garden Live Green Promise cover?",
    answer: "The Green Promise defines eligible plant replacement, maintenance responsibility, warranty rules, claim review, and replacement status for qualifying plants and memberships."
  },
  {
    question: "How do AI Plant Doctor and QR Plant Passport work together?",
    answer: "AI Plant Doctor creates disease, pest, water, fertilizer, medicine, and treatment insights. QR Plant Passport stores plant details, care timeline, warranty, growth history, health score, and diagnosis records."
  }
];

type PageConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref?: string;
  highlights: string[];
  stats: Array<{ value: string; label: string }>;
  sections: Array<{ title: string; description: string; points: string[] }>;
  process: string[];
};

export const pageConfigs: Record<string, PageConfig> = {
  landscaping: {
    slug: "landscaping",
    eyebrow: "Luxury Landscaping",
    title: "Landscapes designed like architecture and managed like software.",
    description: "Garden Live manages lead capture, site survey, landscape design, quotation, project approval, execution tracking, project documents, work orders, before-after media, and maintenance handover.",
    image: imagePool.landscaping,
    primaryCta: "Book Landscaping Survey",
    secondaryCta: "View Projects",
    secondaryHref: "/projects",
    highlights: ["Lead Management", "Site Survey", "Quotation", "Project Approval", "Project Tracking", "Project Documents"],
    stats: [{ value: "360", label: "project visibility" }, { value: "CRM", label: "landscaping pipeline" }, { value: "Live", label: "execution tracking" }],
    sections: [
      { title: "Landscape CRM", description: "A disciplined journey from enquiry to finished garden.", points: ["Lead management", "Site survey", "Quotation", "Project approval", "Project tracking"] },
      { title: "Premium Design", description: "Every landscape is planned around sunlight, water, structure, plant behavior, and long-term maintenance.", points: ["Concept planning", "Plant palette", "Material direction", "Irrigation coordination"] },
      { title: "Execution Control", description: "Supervisors, documents, project media, and reports keep the work accountable.", points: ["Work orders", "Project documents", "Before-after images", "Handover reports"] }
    ],
    process: ["Enquiry", "Survey", "Design", "Quotation", "Approval", "Execution", "Handover"]
  },
  "plant-nursery": {
    slug: "plant-nursery",
    eyebrow: "Premium Plant Nursery",
    title: "A curated plant nursery for homes, landscapes, and Garden Live members.",
    description: "Source indoor plants, outdoor plants, palm collection, fruit plants, timber plants, shrubs, creepers, ground cover, topiary, vertical garden plants, flowering plants, and project-ready stock.",
    image: imagePool.nursery,
    primaryCta: "Explore Plant Nursery",
    secondaryCta: "Open Garden Store",
    secondaryHref: "/garden-store",
    highlights: ["Indoor Plants", "Palm Collection", "Fruit Plants", "Timber Plants", "Shrubs", "Topiary", "Flower Plants", "Vertical Garden"],
    stats: [{ value: "16+", label: "plant categories" }, { value: "QR", label: "passport-ready plants" }, { value: "GST", label: "invoice support" }],
    sections: [
      { title: "Plant Catalog", description: "Every plant can carry category, sub-category, brand, care needs, price, GST, stock, and media.", points: ["Plant height", "Pot size", "Plant age", "Indoor/outdoor", "Maintenance level"] },
      { title: "Care Intelligence", description: "Buying decisions connect to actual care requirements.", points: ["Sunlight requirement", "Water requirement", "Soil requirement", "Fertilizer schedule", "Air purifying"] },
      { title: "Inventory Operations", description: "Admin workflows support stock quantity, low-stock alerts, approval, bulk import, and bulk images.", points: ["Inventory", "Bulk upload", "Low stock alert", "Product approval"] }
    ],
    process: ["Select Category", "Compare Plants", "Check Care Fit", "Order", "Deliver", "Create Passport"]
  },
  "garden-maintenance": {
    slug: "garden-maintenance",
    eyebrow: "Garden Maintenance",
    title: "Maintenance that makes every visit visible, measurable, and beautiful.",
    description: "Garden Live maintenance includes upcoming visits, visit history, assigned gardener, service reports, garden timeline, before-after photos, garden health score, plant health score, and AI insights.",
    image: imagePool.maintenance,
    primaryCta: "Book Maintenance Visit",
    secondaryCta: "View Membership Plans",
    secondaryHref: "/membership-plans",
    highlights: ["Garden Timeline", "Before/After Photos", "Garden Health Score", "Plant Health Score", "Visit History", "Service Reports"],
    stats: [{ value: "100", label: "health score model" }, { value: "Live", label: "visit tracking" }, { value: "AI", label: "care insights" }],
    sections: [
      { title: "My Garden Dashboard", description: "Customers see the garden as a living digital record.", points: ["Garden overview", "Garden timeline", "Before-after photos", "Garden statistics", "Visit history"] },
      { title: "Maintenance Workflow", description: "Operations teams coordinate gardeners, supervisors, schedules, and reports.", points: ["Upcoming visits", "Assigned gardener", "Service report", "Customer rating", "Supervisor review"] },
      { title: "Green Promise", description: "Eligible plants are reviewed under clear warranty and responsibility rules.", points: ["Eligible replacement", "Maintenance responsibility", "Warranty rules", "Claim status"] }
    ],
    process: ["Schedule", "Assign", "Visit", "Report", "Review", "Improve"]
  },
  "dedicated-gardener": {
    slug: "dedicated-gardener",
    eyebrow: "Dedicated Gardener",
    title: "A dedicated gardener program for luxury homes and high-touch properties.",
    description: "Garden Live offers dedicated gardener services with staff allocation, attendance tracking, daily task plans, supervisor review, service reports, and premium customer support.",
    image: imagePool.gardener,
    primaryCta: "Hire Dedicated Gardener",
    secondaryCta: "Talk to Supervisor",
    secondaryHref: "/contact",
    highlights: ["Assigned Gardener", "Attendance", "Daily Care", "Supervisor Review", "Visit Reports", "Customer Rating"],
    stats: [{ value: "26", label: "service days per month" }, { value: "1:1", label: "staff model" }, { value: "Live", label: "attendance tracking" }],
    sections: [
      { title: "Staff Matching", description: "Assign gardeners by specialization, city, area, rating, and availability.", points: ["Gardener profile", "Specialization", "Experience", "Service city", "Availability"] },
      { title: "Daily Operations", description: "Every service day can be tracked, reported, and reviewed.", points: ["Check-in", "Check-out", "Daily task plan", "Plant timeline", "Before-after photos"] },
      { title: "Supervisor Control", description: "Supervisors help keep premium properties consistently maintained.", points: ["Review reports", "Escalations", "Quality control", "Replacement review"] }
    ],
    process: ["Consult", "Match", "Onboard", "Daily Care", "Supervisor Review", "Monthly Report"]
  },
  "membership-plans": {
    slug: "membership-plans",
    eyebrow: "Membership Plans",
    title: "A digital garden membership for every type of green space.",
    description: "Plans include Plant Care at Rs. 299/month, Smart Garden at Rs. 999/month, Home Garden at Rs. 3,999/month, Premium Garden at Rs. 7,999/month, Luxury Garden at Rs. 14,999/month, and Dedicated Gardener at Rs. 30,000/month.",
    image: imagePool.membership,
    primaryCta: "Join Membership",
    secondaryCta: "Book Free Survey",
    secondaryHref: "/book-garden-visit",
    highlights: ["Plant Care - Rs. 299/month", "Smart Garden - Rs. 999/month", "Home Garden - Rs. 3,999/month", "Premium Garden - Rs. 7,999/month", "Luxury Garden - Rs. 14,999/month", "Dedicated Gardener - Rs. 30,000/month"],
    stats: [{ value: "6", label: "membership plans" }, { value: "Green", label: "Promise coverage" }, { value: "Coins", label: "member rewards" }],
    sections: [
      { title: "Plan Clarity", description: "Every plan defines what is included, not included, visit frequency, working hours, and replacement eligibility.", points: ["What's included", "Not included", "Visit frequency", "Working hours", "Plant replacement eligibility"] },
      { title: "Green Promise", description: "A transparent promise around plant warranty, eligible replacement, and maintenance responsibility.", points: ["Eligible plants", "Warranty rules", "Replacement status", "Claim review"] },
      { title: "Green Rewards", description: "Members can earn Green Coins, referral benefits, coupons, and membership rewards.", points: ["Green Coins", "Referral program", "Membership rewards", "Coupon system"] }
    ],
    process: ["Survey", "Choose Plan", "Activate", "Schedule Visits", "Track Garden", "Earn Rewards"]
  },
  "corporate-solutions": {
    slug: "corporate-solutions",
    eyebrow: "Corporate Solutions",
    title: "Enterprise greenery for offices, campuses, builders, hotels, and tenders.",
    description: "Garden Live supports corporate landscaping, office plant programs, vertical gardens, AMC maintenance, government tender management, work orders, project documents, client records, and analytics.",
    image: imagePool.corporate,
    primaryCta: "Request Corporate Proposal",
    secondaryCta: "Book Site Survey",
    secondaryHref: "/book-garden-visit",
    highlights: ["Corporate AMC", "Vertical Gardens", "Office Plants", "Tender Management", "Work Orders", "Client Records"],
    stats: [{ value: "B2B", label: "proposal workflows" }, { value: "Multi", label: "site support" }, { value: "Reports", label: "analytics ready" }],
    sections: [
      { title: "Corporate Greenery", description: "Premium plant programs for offices, campuses, hospitality, builders, and institutions.", points: ["Office plants", "Green walls", "Campus landscaping", "Garden furniture", "Maintenance AMC"] },
      { title: "Tender Module", description: "Government and institutional workflows are managed through structured records.", points: ["Tender management", "Work orders", "Project documents", "Client records"] },
      { title: "Analytics", description: "Decision makers can review sales, membership growth, garden visits, revenue, and satisfaction.", points: ["Revenue", "Garden visits", "Customer satisfaction", "Project tracking"] }
    ],
    process: ["Consult", "Survey", "Proposal", "Approval", "Execution", "Reporting"]
  },
  "ai-plant-doctor": {
    slug: "ai-plant-doctor",
    eyebrow: "AI Plant Doctor",
    title: "Plant healthcare reimagined as a premium AI experience.",
    description: "Upload plant photos for disease detection, pest detection, plant health score, water recommendation, fertilizer recommendation, medicine recommendation, treatment timeline, and expert consultation.",
    image: imagePool.ai,
    primaryCta: "Scan Plant Photo",
    secondaryCta: "Talk to Expert",
    secondaryHref: "/contact",
    highlights: ["Disease Detection", "Pest Detection", "Fertilizer Recommendation", "Medicine Recommendation", "Water Schedule", "Expert Consultation"],
    stats: [{ value: "0-100", label: "plant health score" }, { value: "AI", label: "diagnosis workflow" }, { value: "Expert", label: "consultation path" }],
    sections: [
      { title: "AI Diagnosis", description: "Photo and symptom data become actionable plant-health insights.", points: ["Disease detection", "Pest detection", "Severity", "Confidence score", "Health score"] },
      { title: "Care Plan", description: "The output explains what to do next in practical care language.", points: ["Water schedule", "Fertilizer recommendation", "Medicine recommendation", "Treatment timeline"] },
      { title: "Commerce and Expert Care", description: "Diagnosis can connect to recommended products and expert consultation.", points: ["Recommended products", "Plant medicines", "Expert chat", "Video consultation"] }
    ],
    process: ["Upload", "Scan", "Diagnose", "Recommend", "Treat", "Follow Up"]
  },
  "plant-scanner": {
    slug: "plant-scanner",
    eyebrow: "Plant Scanner",
    title: "Scan a plant and open its entire digital care universe.",
    description: "Garden Live Plant Scanner helps identify plant records, scan QR codes, connect AI diagnosis, update care timelines, track growth history, and open warranty status.",
    image: imagePool.scanner,
    primaryCta: "Open Plant Scanner",
    secondaryCta: "View QR Passport",
    secondaryHref: "/qr-plant-passport",
    highlights: ["Camera Scan", "QR Lookup", "Plant Details", "Care Timeline", "Warranty", "Growth History"],
    stats: [{ value: "QR", label: "lookup ready" }, { value: "AI", label: "health scan" }, { value: "Live", label: "care timeline" }],
    sections: [
      { title: "Scanner Interface", description: "Built for customers, gardeners, and supervisors on mobile.", points: ["Upload photo", "Scan plant", "QR scanner UI", "Plant lookup"] },
      { title: "Passport Connection", description: "Every scan can open plant details, warranty, and timeline.", points: ["Plant details", "Care timeline", "Warranty", "Replacement status"] },
      { title: "Field Updates", description: "Gardeners can record maintenance actions during visits.", points: ["Watered", "Fertilized", "Pruned", "Diagnosed", "Growth update"] }
    ],
    process: ["Scan", "Identify", "Open Passport", "Update Timeline", "Schedule Care"]
  },
  "qr-plant-passport": {
    slug: "qr-plant-passport",
    eyebrow: "QR Plant Passport",
    title: "Every plant gets a digital identity, care history, and warranty record.",
    description: "QR Plant Passport stores plant details, care timeline, warranty, growth history, AI diagnosis, service updates, replacement eligibility, and scan history.",
    image: imagePool.passport,
    primaryCta: "Create Plant Passport",
    secondaryCta: "Open Plant Scanner",
    secondaryHref: "/plant-scanner",
    highlights: ["Plant Details", "Care Timeline", "Warranty", "Growth History", "AI Reports", "Replacement Status"],
    stats: [{ value: "1", label: "digital identity per plant" }, { value: "Live", label: "care timeline" }, { value: "Green", label: "Promise ready" }],
    sections: [
      { title: "Plant Identity", description: "A single passport code organizes plant details and ownership context.", points: ["Passport code", "Origin", "Plant details", "QR code", "Care schedule"] },
      { title: "Care Timeline", description: "Every important action can be recorded as a plant-life event.", points: ["Planted", "Watered", "Fertilized", "Pruned", "Diagnosed", "Growth update"] },
      { title: "Warranty and Replacement", description: "Warranty dates, Green Promise status, and claims stay transparent.", points: ["Warranty start", "Warranty end", "Replacement eligible", "Claim status"] }
    ],
    process: ["Create", "Tag QR", "Scan", "Update Care", "Review Warranty", "Track Growth"]
  },
  "garden-store": {
    slug: "garden-store",
    eyebrow: "Garden Store",
    title: "A premium garden marketplace curated around real plant care.",
    description: "Shop plants, indoor plants, outdoor plants, palm collection, fruit plants, flower plants, pots and planters, accessories, fertilizers, plant medicines, seeds, tools, smart kits, irrigation, and garden furniture.",
    image: imagePool.store,
    primaryCta: "Explore Garden Store",
    secondaryCta: "View Plant Nursery",
    secondaryHref: "/plant-nursery",
    highlights: ["Inventory", "GST Invoice", "Delivery Tracking", "Wishlist", "Product Reviews", "Smart Garden Kit"],
    stats: [{ value: "15+", label: "store categories" }, { value: "GST", label: "invoice support" }, { value: "Coins", label: "member rewards" }],
    sections: [
      { title: "Premium Catalog", description: "A structured product experience for customers and admin teams.", points: ["Product name", "SKU", "Category", "Brand", "Images", "Videos", "PDF catalogue"] },
      { title: "Customer Commerce", description: "Shopping flows support search, filter, sort, wishlist, compare, share, cart, and buy now.", points: ["Search", "Filters", "Wishlist", "Compare products", "Add to cart"] },
      { title: "Inventory and Approval", description: "Admin teams manage stock, low-stock alerts, bulk import, images, and approval.", points: ["Inventory", "Low stock alert", "Bulk import", "Product approval"] }
    ],
    process: ["Search", "Compare", "Wishlist", "Add to Cart", "Buy Now", "Track Delivery"]
  },
  "garden-health-reports": {
    slug: "garden-health-reports",
    eyebrow: "Garden Health Reports",
    title: "A premium health report for every Garden Live garden.",
    description: "Garden Health Reports combine garden health score, plant health score, soil test reports, water test reports, maintenance visit completion, pest risk, AI recommendations, and supervisor review.",
    image: imagePool.maintenance,
    primaryCta: "Generate Health Report",
    secondaryCta: "Book Garden Visit",
    secondaryHref: "/book-garden-visit",
    highlights: ["Garden Health Score", "Plant Health Score", "Soil Test Report", "Water Test Report", "Visit Completion", "AI Recommendations"],
    stats: [{ value: "0-100", label: "garden health score" }, { value: "AI", label: "recommendations" }, { value: "Live", label: "supervisor review" }],
    sections: [
      { title: "Health Scoring", description: "Garden Live converts ongoing care into a measurable garden health score.", points: ["Plant health average", "Visit completion", "Pest risk", "Soil score", "Water score"] },
      { title: "Care Recommendations", description: "Reports explain what to do next in practical customer and field-team language.", points: ["Water adjustment", "Fertilizer window", "Pest watch", "Pruning plan", "Expert escalation"] },
      { title: "Operational Review", description: "Supervisors can review reports, plant passports, claims, and service quality.", points: ["Supervisor notes", "Service reports", "Before-after media", "Green Promise status"] }
    ],
    process: ["Collect Data", "Score Garden", "Review Plants", "Add AI Insights", "Supervisor Review", "Share Report"]
  }
};

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#f3f6f0] text-botanical-black">
      <Navbar items={navItems} ctaLabel="Book Garden Visit" ctaHref="/book-garden-visit" className="border-white/10 bg-white/75 shadow-glXs" />
      {children}
      <FloatingActions />
      <Footer groups={footerGroups} />
    </main>
  );
}

export function HomePublicPage() {
  return (
    <PublicChrome>
      <Hero
        eyebrow={brandLine}
        title="The luxury operating system for living gardens."
        description="Garden Live blends premium landscaping, plant nursery, garden maintenance, dedicated gardeners, AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Store, Green Promise, rewards, and customer dashboards into one intelligent membership platform."
        image={imagePool.home}
        primaryLabel="Book Free Garden Survey"
        secondaryLabel="Explore Memberships"
        secondaryHref="/membership-plans"
      />
      <SignatureStrip />
      <ServiceShowcase />
      <MembershipShowcase />
      <AiPassportShowcase />
      <StoreShowcase />
      <PortfolioPreview />
      <WhyGardenLive />
      <TestimonialsPage compact />
      <BlogPreview />
      <FaqSection />
      <EnquirySection title="Book a Garden Live visit" description="Tell us about your garden, terrace, balcony, office, society, or project. Garden Live will guide the right service, membership, or consultation." />
      <MapSection />
    </PublicChrome>
  );
}

export function AboutPublicPage() {
  return (
    <PublicChrome>
      <Hero eyebrow="About Garden Live" title="A garden company built with the precision of a technology platform." description="Garden Live exists to organize garden ownership in India through memberships, AI plant care, accountable maintenance, curated products, QR plant records, Green Promise, and premium service delivery." image={imagePool.about} primaryLabel="Book Garden Visit" secondaryLabel="Explore Services" secondaryHref="/services" />
      <SignatureStrip />
      <section className="bg-white py-20">
        <div className="gl-container grid gap-5 lg:grid-cols-3">
          <LuxuryPanel title="Our Story" text="Garden Live was created for customers who love greenery but need reliable care, not random visits. The platform connects expert gardeners, supervisors, AI diagnosis, plant records, store recommendations, and membership workflows." points={["Membership-first garden care", "AI-powered plant health", "Digital garden records", "Premium field operations"]} />
          <LuxuryPanel title="Vision" text="To become India's most trusted digital garden membership platform for homes, offices, communities, institutions, and city-scale green projects." points={["Multi-city support", "Franchise management", "Corporate programs", "Government tender readiness"]} />
          <LuxuryPanel title="Mission" text="To make every garden measurable, maintainable, beautiful, and protected through care systems that customers can understand and teams can execute." points={["Garden health score", "Plant health score", "QR Plant Passport", "Green Promise"]} />
        </div>
      </section>
      <WhyGardenLive />
      <TestimonialsPage compact />
      <EnquirySection title="Start your Garden Live journey" description="Share your space and goals. The Garden Live team will help define the right service path." />
    </PublicChrome>
  );
}

export function ServicesPublicPage() {
  return (
    <PublicChrome>
      <Hero eyebrow="Garden Live Services" title="A complete luxury garden ecosystem, not a list of services." description="From plants nursery and landscape design to maintenance, dedicated gardeners, AI diagnosis, QR passports, store products, government tender work, and corporate solutions." image={imagePool.services} primaryLabel="Book Free Consultation" secondaryLabel="View Gallery" secondaryHref="/gallery" />
      <ServiceShowcase />
      <Process steps={["Consultation", "Survey", "Recommendation", "Approval", "Execution", "Digital Records", "Ongoing Care"]} />
      <PortfolioPreview />
      <FaqSection />
      <EnquirySection title="Book a premium service consultation" description="Tell Garden Live what kind of garden, property, or plant care outcome you want." />
    </PublicChrome>
  );
}

export function PublicPage({ config }: { config: PageConfig }) {
  return (
    <PublicChrome>
      <Hero eyebrow={config.eyebrow} title={config.title} description={config.description} image={config.image} primaryLabel={config.primaryCta} secondaryLabel={config.secondaryCta} secondaryHref={config.secondaryHref} />
      <Stats stats={config.stats} />
      <section className="bg-white py-20">
        <div className="gl-container">
          <SectionHeading eyebrow="Complete Capability" title="Designed for premium service and operational clarity." description="Every module is built with real Garden Live workflows: forms, records, media, reports, permissions, notifications, analytics, and customer visibility." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.highlights.map((highlight) => (
              <div key={highlight} className="group rounded-2xl border border-[#dfe7dc] bg-gradient-to-br from-white to-[#f3f8ef] p-5 shadow-glXs transition hover:-translate-y-1 hover:shadow-glMd">
                <BadgeCheck className="h-5 w-5 text-botanical-green" aria-hidden />
                <p className="mt-4 text-sm font-semibold leading-6">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="gl-container grid gap-5 lg:grid-cols-3">
          {config.sections.map((section) => (
            <LuxuryPanel key={section.title} title={section.title} text={section.description} points={section.points} />
          ))}
        </div>
      </section>
      <Process steps={config.process} />
      <GalleryStrip />
      <TestimonialsPage compact />
      <FaqSection />
      <EnquirySection title={`Start with ${config.eyebrow}`} description="Share your location, space type, and requirement. Garden Live will recommend the right next step." />
      <MapSection />
    </PublicChrome>
  );
}

export function GalleryPage() {
  const gallery = [
    ["Luxury Terrace Garden", imagePool.landscaping],
    ["Premium Plant Nursery", imagePool.nursery],
    ["Maintenance Visit", imagePool.maintenance],
    ["Corporate Green Wall", imagePool.corporate],
    ["AI Plant Health", imagePool.ai],
    ["Garden Store Collection", imagePool.store]
  ];
  return (
    <PublicChrome>
      <Hero eyebrow="Gallery" title="A cinematic gallery of gardens that feel alive." description="Explore terrace gardens, living walls, nursery selections, maintenance moments, plant health care, and premium garden products from the Garden Live ecosystem." image={imagePool.gallery} primaryLabel="Book Garden Visit" secondaryLabel="View Projects" secondaryHref="/projects" />
      <section className="py-20">
        <div className="gl-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map(([title, image]) => (
            <div key={title} className="group overflow-hidden rounded-3xl border border-white/70 bg-white shadow-glMd">
              <div className="relative h-80">
                <Image src={image} alt={`${title} by Garden Live`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-botanical-black/55 to-transparent" />
                <h2 className="absolute bottom-5 left-5 text-xl font-semibold text-white">{title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>
      <EnquirySection title="Make your garden part of the Garden Live story" description="Book a survey and let the team design, maintain, and document your green transformation." />
    </PublicChrome>
  );
}

export function ProjectsPage() {
  const projects = [
    { title: "Luxury Terrace Garden", city: "Hyderabad", image: imagePool.landscaping, detail: "A terrace transformed with layered planting, premium planters, irrigation planning, and membership-ready maintenance." },
    { title: "Corporate Green Wall", city: "Bengaluru", image: imagePool.corporate, detail: "A living wall for a premium office reception with AMC maintenance, plant health tracking, and monthly reports." },
    { title: "Villa Garden Renewal", city: "Pune", image: imagePool.projects, detail: "Soil correction, palm placement, flowering borders, lighting coordination, and Green Promise handover." }
  ];
  return (
    <PublicChrome>
      <Hero eyebrow="Projects Portfolio" title="Premium garden projects with every step documented." description="Garden Live tracks site survey, quotation, approval, work orders, project media, execution, handover, and long-term maintenance." image={imagePool.projects} primaryLabel="Start a Project" secondaryLabel="Corporate Solutions" secondaryHref="/corporate-solutions" />
      <section className="bg-white py-20">
        <div className="gl-container grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-3xl border border-[#dfe7dc] bg-white shadow-glMd">
              <div className="relative h-72">
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <Badge tone="success">{project.city}</Badge>
                <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">{project.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <EnquirySection title="Plan a Garden Live project" description="Share your location and project requirement. Garden Live will guide survey, quotation, approval, and execution." />
    </PublicChrome>
  );
}

export function TestimonialsPage({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-white py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Testimonials" title="Trusted by customers who want premium greenery without chaos." description="Customers choose Garden Live for beauty, visibility, reliability, and a care system they can understand." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
        {!compact ? <EnquirySection title="Experience Garden Live care" description="Book a visit and see how a premium digital garden membership changes everyday greenery." /> : null}
      </div>
    </section>
  );
}

export function BlogPage() {
  const posts = [
    ["Membership", "How digital garden memberships change home maintenance", imagePool.membership],
    ["Landscaping", "A practical guide to terrace garden planning in Indian cities", imagePool.landscaping],
    ["Plant Health", "When to use AI Plant Doctor and when to call an expert", imagePool.ai],
    ["Green Promise", "Understanding eligible plant replacement and warranty rules", imagePool.maintenance],
    ["Nursery", "Choosing palms, shrubs, creepers, and ground cover for projects", imagePool.nursery],
    ["Corporate", "Corporate plant programs for offices, builders, and campuses", imagePool.corporate]
  ];
  return (
    <PublicChrome>
      <Hero eyebrow="Garden Live Blog" title="Care guides and operating notes for the future of gardens." description="Read Garden Live insights on digital memberships, terrace gardens, AI plant health, Green Promise, nursery selection, corporate greenery, and garden maintenance." image={imagePool.blog} primaryLabel="Book Garden Visit" secondaryLabel="Explore Services" secondaryHref="/services" />
      <section className="py-20">
        <div className="gl-container grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(([tag, title, image]) => (
            <article key={title} className="overflow-hidden rounded-3xl border border-[#dfe7dc] bg-white shadow-glSm">
              <div className="relative h-60">
                <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <Badge tone="info">{tag}</Badge>
                <h2 className="mt-4 text-xl font-semibold leading-8">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">A Garden Live guide with practical care steps, premium service context, and India-first recommendations.</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicChrome>
  );
}

export function ContactPage({ booking = false }: { booking?: boolean }) {
  return (
    <PublicChrome>
      <Hero eyebrow={booking ? "Book Garden Visit" : "Contact Garden Live"} title={booking ? "Schedule your Garden Live survey, visit, or consultation." : "Talk to Garden Live about your garden, project, membership, or partnership."} description="Share your city, garden type, service need, and preferred time. Garden Live can help with memberships, landscaping, plant nursery, maintenance, dedicated gardeners, AI Plant Doctor, Garden Store, and corporate solutions." image={imagePool.contact} primaryLabel={booking ? "Submit Visit Request" : "Send Enquiry"} secondaryLabel="WhatsApp Garden Live" secondaryHref={whatsappHref} />
      <section className="bg-white py-20">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactCards />
          <EnquiryForm booking={booking} />
        </div>
      </section>
      <MapSection />
      <FaqSection />
    </PublicChrome>
  );
}

function Hero({ eyebrow, title, description, image, primaryLabel, secondaryLabel, secondaryHref = "/services" }: { eyebrow: string; title: string; description: string; image: string; primaryLabel: string; secondaryLabel: string; secondaryHref?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-botanical-black text-white">
      <div className="absolute inset-0">
        <Image src={image} alt={`${eyebrow} by Garden Live`} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,18,12,0.96),rgba(20,63,42,0.82),rgba(10,18,12,0.18))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f3f6f0] to-transparent" />
      </div>
      <div className="gl-container relative grid min-h-[760px] items-center gap-10 py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="gl-rise">
          <Badge tone="premium" className="bg-white/15 text-white backdrop-blur">{eyebrow}</Badge>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.03] tracking-[0] sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-botanical-black hover:bg-botanical-mint">
              <Link href="/book-garden-visit">{primaryLabel}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="border-white/25 bg-white/12 text-white backdrop-blur hover:bg-white/20" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
        <div className="gl-rise gl-delay-1 hidden rounded-3xl border border-white/18 bg-white/12 p-5 shadow-glLg backdrop-blur-2xl lg:block">
          <div className="rounded-2xl border border-white/15 bg-botanical-black/40 p-5">
            <p className="text-sm font-semibold text-white/70">Garden Live intelligence layer</p>
            <div className="mt-5 space-y-3">
              {["Garden Health Score", "AI Plant Doctor Report", "QR Plant Passport", "Green Promise Status"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white/92 p-4 text-botanical-black">
                  <span className="text-sm font-semibold">{item}</span>
                  <span className="rounded-full bg-botanical-mint px-3 py-1 text-xs font-semibold text-botanical-green">{index === 0 ? "96" : "Live"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureStrip() {
  return (
    <section className="relative z-10 -mt-16">
      <div className="gl-container grid gap-4 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-glLg backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["India First", "AI powered garden membership"],
          ["Green Promise", "Warranty and replacement clarity"],
          ["QR Passport", "Digital identity for every plant"],
          ["Premium Ops", "Visits, reports, analytics"]
        ].map(([title, detail]) => (
          <div key={title} className="rounded-2xl bg-[#f6faf3] p-5">
            <p className="text-lg font-semibold">{title}</p>
            <p className="mt-2 text-sm text-neutral-slate">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceShowcase() {
  return (
    <section className="py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Complete Website Sections" title="Every Garden Live service, built into one premium customer journey." description="A luxury public website for customers, members, corporate clients, nursery buyers, and garden project leads." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} href={service.href} className="group rounded-3xl border border-white bg-white/85 p-5 shadow-glXs backdrop-blur transition hover:-translate-y-1 hover:shadow-glMd">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-botanical-mint to-white text-botanical-green">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">
                  Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MembershipShowcase() {
  const plans = [
    ["Plant Care", "Rs. 299/month", "AI plant care reminders and basic support"],
    ["Smart Garden", "Rs. 999/month", "Monthly visit, QR passport, member benefits"],
    ["Home Garden", "Rs. 3,999/month", "Recurring maintenance for home gardens"],
    ["Premium Garden", "Rs. 7,999/month", "Supervisor review and priority care"],
    ["Luxury Garden", "Rs. 14,999/month", "High-touch visits and advanced reports"],
    ["Dedicated Gardener", "Rs. 30,000/month", "Dedicated monthly staff program"]
  ];
  return (
    <section className="bg-white py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Membership Plans" title="Six clear plans from plant care to dedicated gardener." description="Every plan can define visit frequency, working hours, included benefits, exclusions, replacement eligibility, Green Promise, and rewards." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map(([name, price, detail], index) => (
            <div key={name} className={`rounded-3xl border p-6 shadow-glSm ${index === 3 ? "border-botanical-green bg-gradient-to-br from-botanical-mint to-white" : "border-[#dfe7dc] bg-white"}`}>
              <Badge tone={index === 3 ? "success" : "info"}>{index === 3 ? "Recommended" : "Garden Live"}</Badge>
              <h3 className="mt-5 text-2xl font-semibold">{name}</h3>
              <p className="mt-3 text-3xl font-semibold">{price}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-slate">{detail}</p>
              <Button asChild className="mt-6 w-full" variant={index === 3 ? "primary" : "secondary"}>
                <Link href="/membership-plans">View Plan</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiPassportShowcase() {
  return (
    <section className="py-20">
      <div className="gl-container grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white shadow-glLg">
          <Image src={imagePool.ai} alt="Garden Live AI Plant Doctor and QR Plant Passport preview" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-botanical-black/70 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/14 p-5 text-white backdrop-blur-xl">
            <p className="text-sm font-semibold text-white/70">AI diagnosis connected to passport history</p>
            <p className="mt-2 text-3xl font-semibold">Plant Health Score 92</p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="AI + QR Passport" title="A premium healthcare record for every plant." description="AI Plant Doctor detects disease, pests, water gaps, fertilizer needs, medicine recommendations, and treatment timelines. QR Plant Passport stores the complete history." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Disease Detection", "Pest Detection", "Water Schedule", "Fertilizer Recommendation", "Medicine Recommendation", "Growth History"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#dfe7dc] bg-white p-4 text-sm font-semibold shadow-glXs">
                <Microscope className="mb-3 h-5 w-5 text-accent-iris" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreShowcase() {
  return (
    <section className="bg-white py-20">
      <div className="gl-container grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Garden Store" title="A marketplace curated around real garden care." description="Plants, indoor plants, outdoor plants, palm collection, fruit plants, flower plants, pots, planters, garden accessories, fertilizers, medicines, seeds, tools, smart garden kits, irrigation, and garden furniture." />
          <Button asChild className="mt-6" rightIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>
            <Link href="/garden-store">Explore Garden Store</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Plants", "Planters", "Medicines"].map((item, index) => (
            <div key={item} className="rounded-3xl border border-[#dfe7dc] bg-[#f7faf5] p-5 shadow-glSm">
              <div className="relative mb-5 h-40 overflow-hidden rounded-2xl">
                <Image src={[imagePool.nursery, imagePool.store, imagePool.ai][index]} alt={`Garden Live ${item}`} fill sizes="(min-width: 1024px) 20vw, 100vw" className="object-cover" />
              </div>
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  return (
    <section className="py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Projects Portfolio" title="Landscape work that is photographed, tracked, and maintained." description="Garden Live projects are managed with survey, quotation, approval, project tracking, documents, media, and handover into membership maintenance." />
        <GalleryStrip />
      </div>
    </section>
  );
}

function WhyGardenLive() {
  const items = [
    ["AI Powered", "Plant Doctor, scanner, diagnosis history, care recommendations, and expert escalation.", Bot],
    ["Digital Garden Membership", "Plans, visits, benefits, Green Promise, rewards, and renewal flows.", ShieldCheck],
    ["Plant Passport", "QR identity, care timeline, warranty, growth history, and replacement status.", QrCode],
    ["Enterprise Ready", "CRM, tender module, corporate solutions, analytics, role permissions, and reports.", BriefcaseBusiness]
  ] as const;
  return (
    <section className="bg-botanical-black py-20 text-white">
      <div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Badge tone="premium" className="bg-white/15 text-white">Why Garden Live</Badge>
          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Luxury garden care with startup-grade intelligence.</h2>
          <p className="mt-5 text-base leading-8 text-white/65">{brandLine}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([title, detail, Icon]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur">
              <Icon className="h-5 w-5 text-botanical-lime" aria-hidden />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ stats }: { stats: PageConfig["stats"] }) {
  return (
    <section className="border-b border-[#dfe7dc] bg-white py-8">
      <div className="gl-container grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-[#dfe7dc] bg-gradient-to-br from-[#f7fbf4] to-white p-6 shadow-glXs">
            <p className="text-4xl font-semibold text-botanical-green">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-neutral-slate">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LuxuryPanel({ title, text, points }: { title: string; text: string; points: string[] }) {
  return (
    <div className="rounded-3xl border border-[#dfe7dc] bg-white/90 p-6 shadow-glSm backdrop-blur">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-neutral-slate">{text}</p>
      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-sm font-medium text-neutral-charcoal">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Process({ steps }: { steps: string[] }) {
  return (
    <section className="bg-white py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Process" title="Smooth from first enquiry to living garden record." description="Garden Live turns service work into a structured customer journey with clear next steps and digital visibility." />
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-7">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-[#dfe7dc] bg-[#f7faf5] p-5">
              <span className="text-sm font-semibold text-botanical-green">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-sm font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const images = [imagePool.landscaping, imagePool.nursery, imagePool.maintenance, imagePool.corporate];
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((image, index) => (
        <div key={image} className="group relative h-72 overflow-hidden rounded-3xl border border-white bg-white shadow-glMd">
          <Image src={image} alt={`Garden Live premium gallery ${index + 1}`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-botanical-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-botanical-black backdrop-blur">
            <ImageIcon className="mr-1 inline h-3.5 w-3.5 text-botanical-green" aria-hidden />
            Garden Live
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogPreview() {
  return (
    <section className="py-20">
      <div className="gl-container">
        <SectionHeading eyebrow="Blog" title="Garden intelligence for modern India." description="Guides for memberships, landscaping, AI plant care, plant replacement, nursery selection, and corporate greenery." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {["Digital garden memberships", "AI Plant Doctor care guide", "Green Promise explained"].map((title, index) => (
            <Link key={title} href="/blog" className="rounded-3xl border border-[#dfe7dc] bg-white p-6 shadow-glSm transition hover:-translate-y-1 hover:shadow-glMd">
              <Camera className="h-5 w-5 text-botanical-green" aria-hidden />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-slate">{["How recurring care changes garden ownership.", "How photo diagnosis becomes practical treatment.", "How warranty, responsibility, and replacement work."][index]}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-white py-20">
      <div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="FAQ" title="Everything before your garden goes live." description="Clear answers on Garden Live memberships, surveys, AI Plant Doctor, Green Promise, and QR Plant Passport." />
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}

function EnquirySection({ title, description }: { title: string; description: string }) {
  return (
    <section className="py-20">
      <div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Badge tone="success">Premium Enquiry</Badge>
          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-neutral-slate">{description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Free garden survey", "WhatsApp response", "Digital visit record", "Premium service reports"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-accent-marigold" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

function ContactCards() {
  const cards = [
    { title: "WhatsApp Garden Live", detail: "Fast enquiry and visit booking", icon: MessageCircle },
    { title: "Call Garden Live", detail: "Speak with the service desk", icon: Phone },
    { title: "Service City", detail: "Hyderabad, India", icon: MapPin },
    { title: "Garden Survey", detail: "Free assessment for eligible enquiries", icon: CalendarCheck }
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="rounded-3xl border border-[#dfe7dc] bg-[#f7faf5] p-6 shadow-glXs">
            <Icon className="h-5 w-5 text-botanical-green" aria-hidden />
            <h2 className="mt-5 text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-neutral-slate">{card.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

function MapSection() {
  return (
    <section className="bg-white pb-20">
      <div className="gl-container">
        <div className="overflow-hidden rounded-3xl border border-[#dfe7dc] bg-[#f7faf5] shadow-glMd">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-8">
              <Badge tone="info">Google Maps</Badge>
              <h2 className="mt-5 text-3xl font-semibold">Garden Live service desk</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-slate">Use this location section for customer visits, survey routing, city onboarding, franchise operations, and corporate project coordination.</p>
            </div>
            <iframe title="Garden Live Google Maps location" className="h-96 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Hyderabad%2C%20India&output=embed" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <Link aria-label="Chat with Garden Live on WhatsApp" href={whatsappHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glLg">
        <MessageCircle className="h-5 w-5" aria-hidden />
      </Link>
      <Link aria-label="Call Garden Live" href={callHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-botanical-green text-white shadow-glLg">
        <Phone className="h-5 w-5" aria-hidden />
      </Link>
    </div>
  );
}
