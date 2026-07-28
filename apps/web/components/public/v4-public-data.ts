import {
  Bot, BriefcaseBusiness, CalendarCheck, CloudSun, Gauge, MessageCircle, Phone,
  QrCode, ScanSearch, ShieldCheck, ShoppingBag, Sprout, TreePine, Users, Wrench, Zap
} from "lucide-react";

export const brandLine = "Garden Live - India's First AI Powered Digital Garden Membership Platform";
export const whatsappHref = "https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit";
export const callHref = "tel:+919999999999";
export const heroVideo = "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/forest.mp4";

export const img = {
  home: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=90",
  villa: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88",
  home2: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=88",
  farm: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=88",
  hotel: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=88",
  resort: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2200&q=88",
  campus: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=88",
  rooftop: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=88",
  nursery: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2200&q=88",
  night: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=88",
  indoor: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2200&q=88",
  care: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=2200&q=88",
  ai: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=2200&q=88",
  passport: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=2200&q=88",
  before: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=84",
  after: "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=1600&q=88",
  store: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=2200&q=88",
  a1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  a2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  a3: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=300&q=80"
};

export type PageConfig = {
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

export const baseSections = [
  { title: "Luxury garden operating system", description: "Survey, quotation, membership, service reports, plant records, AI care and store workflows in one product.", points: ["Cinematic public experience", "Live SaaS dashboards", "Production route safety"] },
  { title: "AI plant intelligence", description: "AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Health Score and reports create a plant care record.", points: ["Disease triage", "Health timeline", "Expert escalation"] },
  { title: "Green Promise delivery", description: "Memberships define visits, replacement eligibility, warranty rules and premium reporting.", points: ["Eligible replacement", "Visit history", "Before-after proof"] }
];

function cfg(slug: string, eyebrow: string, title: string, description: string, image: string, highlights: string[], primaryCta = "Book Garden Visit", secondaryCta = "Explore Services", secondaryHref = "/services"): PageConfig {
  return { slug, eyebrow, title, description, image, primaryCta, secondaryCta, secondaryHref, highlights, stats: [{ value: "96", label: "sample health score" }, { value: "24h", label: "care visibility" }, { value: "360", label: "garden record" }], sections: baseSections, process: ["Consult", "Survey", "Recommend", "Approve", "Execute", "Report"] };
}

export const pageConfigs: Record<string, PageConfig> = {
  landscaping: cfg("landscaping", "Luxury Landscaping", "Landscapes designed like architecture and managed like software.", "Premium villas, resorts, rooftops, offices and societies move from survey to quotation, project tracking, media and maintenance handover.", img.villa, ["Site Survey", "Landscape Design", "Quotation", "Project Tracking"], "Book Landscaping Survey", "View Projects", "/projects"),
  "plant-nursery": cfg("plant-nursery", "Premium Plant Nursery", "A curated nursery for homes, offices, resorts and landscape projects.", "Indoor plants, outdoor plants, palms, fruit plants, shrubs, creepers, topiary, flowering plants, pots and professional supplies.", img.nursery, ["Indoor Plants", "Palms", "Fruit Plants", "Topiary"], "Explore Nursery", "Open Store", "/garden-store"),
  "garden-maintenance": cfg("garden-maintenance", "Garden Maintenance", "Maintenance that makes every visit visible, measurable and beautiful.", "Assigned gardeners, supervisor reviews, before-after photos, reports, timelines and garden health scores.", img.care, ["Visit History", "Garden Health Score", "Before/After Photos", "Service Reports"], "Book Maintenance", "View Plans", "/membership-plans"),
  "dedicated-gardener": cfg("dedicated-gardener", "Dedicated Gardener", "A high-touch gardener program for luxury homes and managed properties.", "Staff allocation, attendance tracking, daily work plans, supervisor review, service proof and premium support.", img.rooftop, ["Assigned Gardener", "Attendance", "Daily Care", "Supervisor Review"], "Hire Gardener", "Contact", "/contact"),
  "membership-plans": cfg("membership-plans", "Membership Plans", "The Garden Live membership layer for every type of green space.", "Plant Care, Smart Garden, Home Garden, Premium Garden, Luxury Garden and Dedicated Gardener plans with Green Promise support.", img.home, ["Plant Care", "Smart Garden", "Home Garden", "Premium Garden", "Luxury Garden"], "Join Membership", "Book Survey", "/book-garden-visit"),
  "corporate-solutions": cfg("corporate-solutions", "Corporate Solutions", "Enterprise greenery for offices, campuses, builders, hotels and tender clients.", "Corporate landscaping, office plants, vertical gardens, AMC maintenance, tender records, work orders and analytics.", img.campus, ["Corporate AMC", "Vertical Gardens", "Tender Management", "Analytics"], "Request Proposal", "Book Survey", "/book-garden-visit"),
  "ai-plant-doctor": cfg("ai-plant-doctor", "AI Plant Doctor", "Plant healthcare designed like a premium diagnostic suite.", "Photo upload, disease detection, pest detection, water schedule, fertilizer recommendation, medicine guidance, expert consultation and AI reports.", img.ai, ["Disease Detection", "Pest Detection", "Garden Health Score", "AI Reports"], "Scan Plant", "Talk to Expert", "/contact"),
  "plant-scanner": cfg("plant-scanner", "Plant Scanner", "Scan a plant and open its complete digital care universe.", "Camera-first lookup, QR scanning, care timeline, growth history, AI diagnosis and warranty status.", img.indoor, ["Camera Scan", "QR Lookup", "Care Timeline", "Warranty"], "Open Scanner", "View Passport", "/qr-plant-passport"),
  "qr-plant-passport": cfg("qr-plant-passport", "QR Plant Passport", "Every plant gets a digital identity, care timeline and warranty record.", "Plant details, growth history, AI diagnosis, service updates, Green Promise status and replacement eligibility.", img.passport, ["Plant Details", "Care Timeline", "Warranty", "Growth History"], "Create Passport", "Open Scanner", "/plant-scanner"),
  "garden-store": cfg("garden-store", "Garden Store", "A premium garden marketplace curated around real plant care.", "Plants, pots, tools, fertilizers, medicines, seeds, smart kits, irrigation and garden furniture.", img.store, ["Inventory", "GST Invoice", "Wishlist", "Reviews"], "Explore Store", "View Nursery", "/plant-nursery"),
  "garden-health-reports": cfg("garden-health-reports", "Garden Health Reports", "A premium health report for every Garden Live garden.", "Garden health score, plant health score, soil tests, water tests, pest risk, AI recommendations and supervisor review.", img.care, ["Garden Health", "Plant Health", "Soil Test", "AI Recommendations"], "Generate Report", "Book Visit", "/book-garden-visit")
};

export const navItems = ["Services:/services", "Membership:/membership-plans", "AI Doctor:/ai-plant-doctor", "Store:/garden-store", "Projects:/projects", "Contact:/contact"].map(toLink);
export const footerGroups = [
  { title: "Platform", links: ["AI Plant Doctor:/ai-plant-doctor", "Plant Scanner:/plant-scanner", "QR Plant Passport:/qr-plant-passport", "Garden Health:/garden-health-reports"].map(toLink) },
  { title: "Services", links: ["Landscaping:/landscaping", "Plant Nursery:/plant-nursery", "Maintenance:/garden-maintenance", "Dedicated Gardener:/dedicated-gardener"].map(toLink) },
  { title: "Commerce", links: ["Membership:/membership-plans", "Garden Store:/garden-store", "Corporate:/corporate-solutions", "Book Visit:/book-garden-visit"].map(toLink) },
  { title: "Dashboards", links: ["Customer:/customer/dashboard", "Gardener:/gardener/dashboard", "Supervisor:/supervisor/dashboard", "Admin:/admin/dashboard"].map(toLink) }
];
function toLink(item: string) { const [label, href] = item.split(":"); return { label, href }; }

export const services = [
  ["Luxury Villas", "/landscaping", TreePine, img.villa, "Architecture-grade landscapes for premium residences."],
  ["Rooftop Gardens", "/garden-maintenance", CloudSun, img.rooftop, "Terraces, balconies and sky gardens with care records."],
  ["Premium Nursery", "/plant-nursery", Sprout, img.nursery, "Curated palms, indoor plants, shrubs and flowering plants."],
  ["Garden Store", "/garden-store", ShoppingBag, img.store, "Plants, pots, fertilizers, medicines, tools and smart kits."],
  ["AI Plant Doctor", "/ai-plant-doctor", Bot, img.ai, "Upload a plant photo and receive diagnosis-ready insights."],
  ["QR Passport", "/qr-plant-passport", QrCode, img.passport, "A living digital identity for every plant."]
] as const;

export const modules = [
  ["AI Plant Doctor", "Upload, scan, detect disease, score health and create a treatment plan.", Bot],
  ["Plant Scanner", "Camera-ready scan experience connected to care history.", ScanSearch],
  ["QR Plant Passport", "Warranty, growth timeline and replacement eligibility in one profile.", QrCode],
  ["Garden Membership", "Plans, visits, benefits, rewards and Green Promise review.", ShieldCheck],
  ["Landscaping", "Survey, design, quotation, approval and project tracking.", TreePine],
  ["Maintenance", "Visit calendars, reports, gardener tasks and supervisor checks.", Wrench],
  ["Garden Store", "Curated products, nursery stock, tools and smart kits.", ShoppingBag],
  ["Dashboards", "Customers, gardeners, supervisors and admin panels.", BriefcaseBusiness]
] as const;

export const faqs = [
  { question: "What makes Garden Live different?", answer: "Garden Live combines premium landscaping, plant nursery, garden maintenance, AI Plant Doctor, QR Plant Passport, memberships, store and dashboards in one digital garden platform." },
  { question: "Did Version 4 change backend functionality?", answer: "No. Version 4 upgrades the public experience only. Existing authentication, APIs, database, dashboards and business logic remain unchanged." },
  { question: "How does the Green Promise work?", answer: "Eligible plans define maintenance responsibility, plant replacement rules, visit history, warranty status and replacement requests through the Garden Live workflow." },
  { question: "Can Garden Live support offices and resorts?", answer: "Yes. Corporate solutions support office plants, campus greenery, resorts, builders, societies, AMC maintenance, tenders and project documents." }
];
export const testimonials = [
  { quote: "Our villa garden finally feels managed, photographed and measured. The experience is closer to a premium home service than a gardening vendor.", name: "Ananya Rao", role: "Luxury Villa Member", image: img.a1 },
  { quote: "Garden Live transformed our office reception with plants and kept every visit visible. The reporting has been excellent.", name: "Rahul Mehta", role: "Corporate Facility Lead", image: img.a2 },
  { quote: "The QR Passport and AI Plant Doctor gave every plant a history. It changed how our family looks after the terrace garden.", name: "Meera Shah", role: "Smart Garden Member", image: img.a3 }
];
export const dashboardRows = [["Customer", "/customer/dashboard", Users, "Garden score, visits, AI reports, membership and rewards."], ["Gardener", "/gardener/dashboard", Sprout, "Assigned jobs, attendance, reports and daily care."], ["Supervisor", "/supervisor/dashboard", ShieldCheck, "Quality checks, team tracking and escalations."], ["Admin", "/admin/dashboard", BriefcaseBusiness, "Revenue, customers, bookings, reports and permissions."]] as const;
export const iotSignals = [["Soil moisture", Gauge], ["Weather-aware visits", CloudSun], ["Irrigation readiness", Zap], ["Maintenance alerts", Wrench]] as const;
export const contactCards = [["WhatsApp Garden Live", "Fast enquiry and visit booking", MessageCircle], ["Call Garden Live", "Speak with the service desk", Phone], ["Service City", "India, multi-city ready", CalendarCheck], ["Garden Survey", "Free assessment for eligible enquiries", CalendarCheck]] as const;
