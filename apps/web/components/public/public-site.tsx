import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  RadioTower,
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
import { Badge, Button, FAQAccordion, Footer, Navbar, SectionHeading } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";

const brandLine = "Garden Live - India's First AI Powered Digital Garden Membership Platform";
const whatsappHref = "https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit";
const callHref = "tel:+919999999999";

const images = {
  home: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=2200&q=88",
  about: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2200&q=88",
  services: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2200&q=88",
  landscaping: "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=2200&q=88",
  nursery: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2200&q=88",
  maintenance: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=2200&q=88",
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

const premiumSections = [
  { title: "Premium Experience", description: "Luxury typography, cinematic images, glass cards, and mobile-first spacing.", points: ["Apple-level simplicity", "Tesla-style focus", "Airbnb-quality cards"] },
  { title: "Garden Intelligence", description: "AI Plant Doctor, Plant Scanner, QR Plant Passport, garden health score, and AI reports.", points: ["Disease detection", "Care timeline", "Health score"] },
  { title: "Operational System", description: "Existing backend, auth, APIs, database, and routes stay intact while the public UI becomes V2.", points: ["No backend changes", "Same routes", "Production build safe"] }
];

function config(slug: string, eyebrow: string, title: string, description: string, image: string, highlights: string[], primaryCta = "Book Garden Visit", secondaryCta = "Explore Services", secondaryHref = "/services"): PageConfig {
  return {
    slug,
    eyebrow,
    title,
    description,
    image,
    primaryCta,
    secondaryCta,
    secondaryHref,
    highlights,
    stats: [{ value: "0-100", label: "health score" }, { value: "AI", label: "recommendations" }, { value: "Live", label: "workflow" }],
    sections: premiumSections,
    process: ["Consult", "Survey", "Recommend", "Approve", "Execute", "Report"]
  };
}

export const pageConfigs: Record<string, PageConfig> = {
  landscaping: config("landscaping", "Luxury Landscaping", "Landscapes designed like architecture and managed like software.", "Survey, design, quotation, project approval, documents, media, execution tracking, and maintenance handover.", images.landscaping, ["Site Survey", "Landscape Design", "Quotation", "Project Tracking"], "Book Landscaping Survey", "View Projects", "/projects"),
  "plant-nursery": config("plant-nursery", "Premium Plant Nursery", "A curated plant nursery for homes, landscapes, and Garden Live members.", "Indoor plants, outdoor plants, palms, fruit plants, shrubs, creepers, topiary, and flowering plants.", images.nursery, ["Indoor Plants", "Palms", "Fruit Plants", "Topiary"], "Explore Nursery", "Open Store", "/garden-store"),
  "garden-maintenance": config("garden-maintenance", "Garden Maintenance", "Maintenance that makes every visit visible, measurable, and beautiful.", "Visits, assigned gardeners, reports, before-after photos, garden timeline, health scores, and AI insights.", images.maintenance, ["Visit History", "Garden Health Score", "Before/After Photos", "Service Reports"], "Book Maintenance", "View Plans", "/membership-plans"),
  "dedicated-gardener": config("dedicated-gardener", "Dedicated Gardener", "A dedicated gardener program for luxury homes and high-touch properties.", "Staff allocation, attendance tracking, daily plans, supervisor review, service reports, and premium support.", images.maintenance, ["Assigned Gardener", "Attendance", "Daily Care", "Supervisor Review"], "Hire Gardener", "Contact", "/contact"),
  "membership-plans": config("membership-plans", "Membership Plans", "A digital garden membership for every type of green space.", "Plant Care, Smart Garden, Home Garden, Premium Garden, Luxury Garden, and Dedicated Gardener plans.", images.membership, ["Plant Care", "Smart Garden", "Home Garden", "Premium Garden", "Luxury Garden"], "Join Membership", "Book Survey", "/book-garden-visit"),
  "corporate-solutions": config("corporate-solutions", "Corporate Solutions", "Enterprise greenery for offices, campuses, builders, hotels, and tenders.", "Corporate landscaping, office plants, vertical gardens, AMC maintenance, tender records, work orders, and analytics.", images.corporate, ["Corporate AMC", "Vertical Gardens", "Tender Management", "Analytics"], "Request Proposal", "Book Survey", "/book-garden-visit"),
  "ai-plant-doctor": config("ai-plant-doctor", "AI Plant Doctor", "Plant healthcare reimagined as a premium AI experience.", "Disease detection, pest detection, garden health score, water schedule, fertilizer recommendation, medicine guidance, and AI reports.", images.ai, ["Disease Detection", "Pest Detection", "Garden Health Score", "AI Reports"], "Scan Plant", "Talk to Expert", "/contact"),
  "plant-scanner": config("plant-scanner", "Plant Scanner", "Scan a plant and open its entire digital care universe.", "Camera-first lookup, QR scanning, care timeline updates, growth history, AI diagnosis, and warranty status.", images.scanner, ["Camera Scan", "QR Lookup", "Care Timeline", "Warranty"], "Open Scanner", "View Passport", "/qr-plant-passport"),
  "qr-plant-passport": config("qr-plant-passport", "QR Plant Passport", "Every plant gets a digital identity, care history, and warranty record.", "Plant details, care timeline, warranty, growth history, AI diagnosis, service updates, and replacement eligibility.", images.passport, ["Plant Details", "Care Timeline", "Warranty", "Growth History"], "Create Passport", "Open Scanner", "/plant-scanner"),
  "garden-store": config("garden-store", "Garden Store", "A premium garden marketplace curated around real plant care.", "Plants, pots, tools, fertilizers, medicines, seeds, smart kits, irrigation, and garden furniture.", images.store, ["Inventory", "GST Invoice", "Wishlist", "Reviews"], "Explore Store", "View Nursery", "/plant-nursery"),
  "garden-health-reports": config("garden-health-reports", "Garden Health Reports", "A premium health report for every Garden Live garden.", "Garden health score, plant health score, soil tests, water tests, pest risk, AI recommendations, and supervisor review.", images.maintenance, ["Garden Health", "Plant Health", "Soil Test", "AI Recommendations"], "Generate Report", "Book Visit", "/book-garden-visit")
};

const navItems = ["Services:/services", "Membership:/membership-plans", "AI Doctor:/ai-plant-doctor", "Store:/garden-store", "Projects:/projects", "Contact:/contact"].map(toLink);
const footerGroups = [
  { title: "Platform", links: ["AI Plant Doctor:/ai-plant-doctor", "Plant Scanner:/plant-scanner", "QR Plant Passport:/qr-plant-passport", "Garden Health:/garden-health-reports"].map(toLink) },
  { title: "Services", links: ["Landscaping:/landscaping", "Plant Nursery:/plant-nursery", "Maintenance:/garden-maintenance", "Dedicated Gardener:/dedicated-gardener"].map(toLink) },
  { title: "Commerce", links: ["Membership:/membership-plans", "Garden Store:/garden-store", "Corporate:/corporate-solutions", "Book Visit:/book-garden-visit"].map(toLink) },
  { title: "Dashboards", links: ["Customer:/customer/dashboard", "Gardener:/gardener/dashboard", "Supervisor:/supervisor/dashboard", "Admin:/admin/dashboard"].map(toLink) }
];

function toLink(item: string) {
  const [label, href] = item.split(":");
  return { label, href };
}

const services = [
  ["Landscaping", "/landscaping", TreePine, "Premium design, quotation, project tracking, and handover."],
  ["Plant Nursery", "/plant-nursery", Sprout, "Curated indoor, outdoor, palm, fruit, shrub, and flowering plants."],
  ["Maintenance", "/garden-maintenance", Wrench, "Visits, reports, before-after photos, and health scores."],
  ["Membership", "/membership-plans", ShieldCheck, "Plant Care, Smart Garden, Home Garden, Premium, and Luxury plans."],
  ["AI Doctor", "/ai-plant-doctor", Bot, "Disease detection, pest detection, treatment guidance, and AI reports."],
  ["Plant Scanner", "/plant-scanner", ScanSearch, "Camera-first lookup, QR scanning, and care timeline updates."],
  ["QR Passport", "/qr-plant-passport", QrCode, "Digital plant identity, warranty, growth history, and replacement status."],
  ["Garden Store", "/garden-store", ShoppingBag, "Plants, tools, fertilizers, medicines, smart kits, and furniture."]
] as const;

const faqs = [
  { question: "What is Garden Live?", answer: "Garden Live is India's First AI Powered Digital Garden Membership Platform for memberships, landscaping, maintenance, nursery supply, AI plant care, QR passports, store, and operations." },
  { question: "Is backend functionality changed?", answer: "No. Version 2 improves the public UI only while keeping existing authentication, APIs, database, routes, and business logic intact." },
  { question: "What does Green Promise cover?", answer: "It defines eligible plant replacement, maintenance responsibility, warranty rules, claim review, and replacement status for qualifying plants and plans." },
  { question: "How do AI and QR work together?", answer: "AI Plant Doctor creates diagnosis and treatment insights. QR Plant Passport stores plant identity, care timeline, warranty, health score, and history." }
];

const testimonials = [
  { quote: "Garden Live made our terrace feel like a managed living space, not a weekend problem.", name: "Ananya R.", role: "Home Garden member" },
  { quote: "The landscaping process felt premium from survey to handover.", name: "Rahul M.", role: "Villa client" },
  { quote: "AI Plant Doctor and QR Passport finally gave our plants a real care history.", name: "Meera S.", role: "Smart Garden member" }
];

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6faf5] text-botanical-black">
      <Navbar items={navItems} ctaLabel="Book Garden Visit" ctaHref="/book-garden-visit" className="border-white/30 bg-white/70 shadow-[0_10px_40px_rgba(10,40,22,0.08)] backdrop-blur-2xl" />
      {children}
      <FloatingActions />
      <Footer groups={footerGroups} />
    </main>
  );
}

export function HomePublicPage() {
  return (
    <PublicChrome>
      <Hero eyebrow={brandLine} title="Your living garden, managed like a luxury membership." description="Premium landscaping, plant nursery, maintenance, dedicated gardeners, AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Store, Smart Garden IoT, rewards, and dashboards in one intelligent platform." image={images.home} primaryLabel="Book Free Garden Survey" secondaryLabel="Explore Memberships" secondaryHref="/membership-plans" />
      <SignatureStrip />
      <ServiceShowcase />
      <MembershipShowcase />
      <AiPassportShowcase />
      <DashboardPreview />
      <SmartGardenIot />
      <PortfolioPreview />
      <TestimonialsPage compact />
      <FaqSection />
      <EnquirySection title="Book a Garden Live visit" description="Tell us about your garden, terrace, balcony, office, society, or project. Garden Live will recommend the right path." />
      <MapSection />
    </PublicChrome>
  );
}

export function AboutPublicPage() {
  return <PublicChrome><Hero eyebrow="About Garden Live" title="A garden company built with the precision of a technology platform." description="Garden Live organizes garden ownership through memberships, AI care, accountable maintenance, curated products, QR records, and premium delivery." image={images.about} primaryLabel="Book Garden Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><SignatureStrip /><ContentGrid /><DashboardPreview /><EnquirySection title="Start your Garden Live journey" description="Share your space and goals. Garden Live will define the right service path." /></PublicChrome>;
}

export function ServicesPublicPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Services" title="A complete luxury garden ecosystem, not a list of services." description="Nursery supply, landscape design, maintenance, dedicated gardeners, AI diagnosis, QR passports, store products, and corporate solutions." image={images.services} primaryLabel="Book Consultation" secondaryLabel="View Gallery" secondaryHref="/gallery" /><ServiceShowcase /><Process steps={["Consultation", "Survey", "Recommendation", "Approval", "Execution", "Digital Records"]} /><PortfolioPreview /><FaqSection /></PublicChrome>;
}

export function PublicPage({ config }: { config: PageConfig }) {
  return <PublicChrome><Hero eyebrow={config.eyebrow} title={config.title} description={config.description} image={config.image} primaryLabel={config.primaryCta} secondaryLabel={config.secondaryCta} secondaryHref={config.secondaryHref} /><Stats stats={config.stats} /><HighlightGrid highlights={config.highlights} /><ContentGrid sections={config.sections} /><Process steps={config.process} /><PortfolioPreview /><FaqSection /><EnquirySection title={`Start with ${config.eyebrow}`} description="Share your location, space type, and requirement. Garden Live will recommend the right next step." /><MapSection /></PublicChrome>;
}

export function GalleryPage() {
  return <PublicChrome><Hero eyebrow="Gallery" title="A cinematic gallery of gardens that feel alive." description="Explore terrace gardens, living walls, nursery selections, maintenance moments, plant health care, and premium garden products." image={images.gallery} primaryLabel="Book Visit" secondaryLabel="View Projects" secondaryHref="/projects" /><PortfolioPreview /><EnquirySection title="Make your garden part of the Garden Live story" description="Book a survey and let Garden Live design, maintain, and document your transformation." /></PublicChrome>;
}

export function ProjectsPage() {
  return <PublicChrome><Hero eyebrow="Projects Portfolio" title="Premium garden projects with every step documented." description="Garden Live tracks survey, quotation, approval, work orders, media, execution, handover, and maintenance." image={images.projects} primaryLabel="Start Project" secondaryLabel="Corporate Solutions" secondaryHref="/corporate-solutions" /><PortfolioPreview /><EnquirySection title="Plan a Garden Live project" description="Share your location and requirement. Garden Live will guide survey, quotation, approval, and execution." /></PublicChrome>;
}

export function TestimonialsPage({ compact = false }: { compact?: boolean }) {
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Customer Reviews" title="Premium greenery without chaos." description="Customers choose Garden Live for beauty, visibility, reliability, and a care system they can understand." /><div className="mt-10 grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <ReviewCard key={item.name} {...item} />)}</div>{!compact ? <EnquirySection title="Experience Garden Live care" description="Book a visit and see how a premium digital garden membership changes everyday greenery." /> : null}</div></section>;
}

export function BlogPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Blog" title="Care guides and operating notes for the future of gardens." description="Read insights on digital memberships, terrace gardens, AI plant health, Green Promise, nursery selection, corporate greenery, and maintenance." image={images.blog} primaryLabel="Book Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><ContentGrid /><PortfolioPreview /></PublicChrome>;
}

export function ContactPage({ booking = false }: { booking?: boolean }) {
  return <PublicChrome><Hero eyebrow={booking ? "Book Garden Visit" : "Contact Garden Live"} title={booking ? "Schedule your Garden Live survey, visit, or consultation." : "Talk to Garden Live about your garden, project, membership, or partnership."} description="Share your city, garden type, service need, and preferred time. Garden Live can help with memberships, landscaping, nursery, maintenance, AI Plant Doctor, Garden Store, and corporate solutions." image={images.contact} primaryLabel={booking ? "Submit Visit Request" : "Send Enquiry"} secondaryLabel="WhatsApp Garden Live" secondaryHref={whatsappHref} /><section className="py-20"><div className="gl-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><ContactCards /><EnquiryForm booking={booking} /></div></section><MapSection /><FaqSection /></PublicChrome>;
}

function Hero({ eyebrow, title, description, image, primaryLabel, secondaryLabel, secondaryHref = "/services" }: { eyebrow: string; title: string; description: string; image: string; primaryLabel: string; secondaryLabel: string; secondaryHref?: string }) {
  return <section className="relative isolate overflow-hidden bg-botanical-black text-white"><div className="absolute inset-0"><Image src={image} alt={`${eyebrow} by Garden Live`} fill priority sizes="100vw" className="object-cover opacity-70" /><div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,22,12,0.94),rgba(20,63,42,0.72),rgba(246,250,245,0.06))]" /><div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f6faf5] to-transparent" /></div><div className="gl-container relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]"><div className="gl-rise"><Badge tone="premium" className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-white backdrop-blur-xl">{eyebrow}</Badge><h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{description}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-botanical-green hover:bg-white/90"><Link href="/book-garden-visit">{primaryLabel}</Link></Button><Button asChild size="lg" variant="secondary" className="h-12 rounded-full border-white/25 bg-white/12 px-6 text-white backdrop-blur-xl hover:bg-white/20" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}><Link href={secondaryHref}>{secondaryLabel}</Link></Button></div></div><div className="gl-rise gl-delay-1 hidden rounded-[2rem] border border-white/20 bg-white/12 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:block"><GlassMetric /></div></div></section>;
}

function GlassMetric() {
  return <div className="rounded-[1.5rem] border border-white/15 bg-botanical-black/35 p-5"><p className="text-sm font-semibold text-white/70">Garden Live intelligence layer</p><div className="mt-5 space-y-3">{["Garden Health Score", "AI Plant Doctor Report", "QR Plant Passport", "Green Promise Status"].map((item, index) => <div key={item} className="flex items-center justify-between rounded-2xl bg-white/92 p-4 text-botanical-black shadow-[0_12px_35px_rgba(0,0,0,0.12)]"><span className="text-sm font-semibold">{item}</span><span className="rounded-full bg-botanical-mint px-3 py-1 text-xs font-semibold text-botanical-green">{index === 0 ? "96" : "Live"}</span></div>)}</div></div>;
}

function SignatureStrip() {
  return <section className="relative z-10 -mt-16"><div className="gl-container grid gap-4 rounded-[2rem] border border-white/70 bg-white/76 p-4 shadow-[0_30px_100px_rgba(15,70,39,0.16)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">{[["India First", "AI powered membership"], ["Green Promise", "Warranty and replacement clarity"], ["QR Passport", "Digital identity for every plant"], ["Premium Ops", "Visits, reports, analytics"]].map(([title, detail]) => <div key={title} className="rounded-[1.5rem] bg-white/78 p-5"><p className="text-lg font-semibold">{title}</p><p className="mt-2 text-sm text-neutral-slate">{detail}</p></div>)}</div></section>;
}

function ServiceShowcase() {
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Garden Live Ecosystem" title="A premium public website for the entire Garden Live product." description="Every customer-facing module now has a luxury product language while keeping backend and routes intact." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(([title, href, Icon, description]) => <Link key={href} href={href} className="group rounded-[1.75rem] border border-white/80 bg-white/76 p-5 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white"><Icon className="h-6 w-6 text-botanical-green" aria-hidden /><h2 className="mt-5 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-neutral-slate">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span></Link>)}</div></div></section>;
}

function MembershipShowcase() {
  const plans = [["Plant Care", "Rs. 299/month"], ["Smart Garden", "Rs. 999/month"], ["Home Garden", "Rs. 3,999/month"], ["Premium Garden", "Rs. 7,999/month"], ["Luxury Garden", "Rs. 14,999/month"]];
  return <section className="bg-white/70 py-20 backdrop-blur"><div className="gl-container"><SectionHeading eyebrow="Pricing Plans" title="Beautiful membership cards for every garden lifestyle." description="Plans define visit frequency, benefits, replacement eligibility, Green Promise, and rewards." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{plans.map(([name, price], index) => <div key={name} className={`rounded-[1.75rem] border p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] ${index === 3 ? "border-botanical-green bg-gradient-to-br from-botanical-mint to-white" : "border-white/80 bg-white/76 backdrop-blur-xl"}`}><Badge tone={index === 3 ? "success" : "info"}>{index === 3 ? "Recommended" : "Garden Live"}</Badge><h3 className="mt-5 text-2xl font-semibold">{name}</h3><p className="mt-3 text-3xl font-semibold">{price}</p><p className="mt-3 text-sm leading-6 text-neutral-slate">Premium care, digital records, AI recommendations, and Garden Live support.</p><Button asChild className="mt-6 w-full rounded-full" variant={index === 3 ? "primary" : "secondary"}><Link href="/membership-plans">View Plan</Link></Button></div>)}</div></div></section>;
}

function AiPassportShowcase() {
  return <section className="py-20"><div className="gl-container grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]"><div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_100px_rgba(15,70,39,0.16)]"><Image src={images.ai} alt="Garden Live AI Plant Doctor and QR Plant Passport preview" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-botanical-black/75 to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/20 bg-white/14 p-5 text-white backdrop-blur-xl"><p className="text-sm font-semibold text-white/70">AI diagnosis connected to passport history</p><p className="mt-2 text-3xl font-semibold">Plant Health Score 92</p></div></div><div><SectionHeading eyebrow="AI + Scanner + Passport" title="A premium healthcare record for every plant." description="AI Plant Doctor, Plant Scanner, disease detection, garden health score, AI reports, and QR Passport work as one intelligence layer." /><ContentGrid sections={[{ title: "Disease Detection", description: "Photo-based plant diagnosis with severity and care guidance.", points: ["Leaf stress", "Pest signals", "Treatment"] }, { title: "Garden Health Score", description: "A 0-100 view of garden condition and maintenance risk.", points: ["Plants", "Visits", "Soil and water"] }, { title: "AI Reports", description: "Diagnosis history, treatment timeline, product suggestions, and expert escalation.", points: ["History", "Products", "Experts"] }]} /></div></div></section>;
}

function DashboardPreview() {
  const dashboards = [["Customer Dashboard", "/customer/dashboard", Users], ["Gardener Dashboard", "/gardener/dashboard", Sprout], ["Supervisor Dashboard", "/supervisor/dashboard", ShieldCheck], ["Admin Dashboard", "/admin/dashboard", BriefcaseBusiness]] as const;
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Dashboard Preview" title="Four role-based workspaces, one premium operating system." description="Preview the full Garden Live SaaS platform without changing authentication, permissions, or backend logic." /><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{dashboards.map(([title, href, Icon]) => <Link key={title} href={href} className="rounded-[1.75rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl transition hover:-translate-y-1"><Icon className="h-6 w-6 text-botanical-green" aria-hidden /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-slate">Live data, role permissions, reports, and Garden Live operations in a premium workspace.</p></Link>)}</div></div></section>;
}

function SmartGardenIot() {
  return <section className="bg-[#0a2213] py-20 text-white"><div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Badge tone="premium" className="bg-white/15 text-white">Smart Garden IoT</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Future-ready for sensors, weather, irrigation, and intelligent reminders.</h2><p className="mt-5 text-base leading-8 text-white/70">Designed for smart kits, care alerts, city-scale maintenance, and connected devices while backend flows stay stable.</p></div><div className="grid gap-4 sm:grid-cols-2">{["Soil moisture", "Weather-aware visits", "Irrigation readiness", "Maintenance alerts"].map((item) => <div key={item} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"><RadioTower className="h-5 w-5 text-emerald-200" aria-hidden /><p className="mt-5 text-xl font-semibold">{item}</p><p className="mt-3 text-sm leading-6 text-white/65">Smart signals for reminders, reports, and field-team decisions.</p></div>)}</div></div></section>;
}

function PortfolioPreview() {
  const gallery = [images.landscaping, images.nursery, images.maintenance, images.corporate];
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Projects Portfolio" title="Landscape work that is photographed, tracked, and maintained." description="Garden Live projects are managed with survey, quotation, approval, tracking, documents, media, and handover." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{gallery.map((image, index) => <div key={image} className="relative h-72 overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_18px_60px_rgba(16,67,38,0.08)]"><Image src={image} alt={`Garden Live project ${index + 1}`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" /></div>)}</div></div></section>;
}

function Stats({ stats }: { stats: PageConfig["stats"] }) {
  return <section className="relative z-10 -mt-12"><div className="gl-container grid gap-4 rounded-[2rem] border border-white/70 bg-white/76 p-4 shadow-[0_30px_100px_rgba(15,70,39,0.16)] backdrop-blur-2xl sm:grid-cols-3">{stats.map((stat) => <div key={stat.label} className="rounded-[1.5rem] bg-white/78 p-6"><p className="text-4xl font-semibold text-botanical-green">{stat.value}</p><p className="mt-2 text-sm font-medium text-neutral-slate">{stat.label}</p></div>)}</div></section>;
}

function HighlightGrid({ highlights }: { highlights: string[] }) {
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Complete Capability" title="Designed for premium service and operational clarity." description="Every module supports forms, records, media, reports, permissions, notifications, analytics, and visibility." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((highlight) => <div key={highlight} className="rounded-[1.5rem] border border-white/80 bg-white/76 p-5 shadow-[0_12px_40px_rgba(16,67,38,0.08)] backdrop-blur-xl"><BadgeCheck className="h-5 w-5 text-botanical-green" aria-hidden /><p className="mt-4 text-sm font-semibold leading-6">{highlight}</p></div>)}</div></div></section>;
}

function ContentGrid({ sections = premiumSections }: { sections?: PageConfig["sections"] }) {
  return <section className="py-10"><div className="grid gap-5 lg:grid-cols-3">{sections.map((section) => <div key={section.title} className="rounded-[1.75rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl"><h2 className="text-2xl font-semibold">{section.title}</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">{section.description}</p><ul className="mt-6 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />{point}</li>)}</ul></div>)}</div></section>;
}

function Process({ steps }: { steps: string[] }) {
  return <section className="py-20"><div className="gl-container"><SectionHeading eyebrow="Process" title="Smooth from first enquiry to living garden record." description="Garden Live turns service work into a structured customer journey with clear next steps and digital visibility." /><div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{steps.map((step, index) => <div key={step} className="rounded-[1.5rem] border border-white/80 bg-white/76 p-5 backdrop-blur-xl"><span className="text-sm font-semibold text-botanical-green">{String(index + 1).padStart(2, "0")}</span><p className="mt-4 text-sm font-semibold">{step}</p></div>)}</div></div></section>;
}

function ReviewCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return <div className="rounded-[1.75rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl"><div className="flex gap-1 text-[#d6a73a]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 text-sm leading-7 text-neutral-slate">&ldquo;{quote}&rdquo;</p><p className="mt-5 font-semibold">{name}</p><p className="text-sm text-neutral-slate">{role}</p></div>;
}

function FaqSection() {
  return <section className="py-20"><div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="FAQ" title="Everything before your garden goes live." description="Clear answers on memberships, surveys, AI Plant Doctor, Green Promise, and QR Plant Passport." /><FAQAccordion items={faqs} className="border-white/80 bg-white/78 shadow-[0_20px_70px_rgba(16,67,38,0.08)] backdrop-blur-xl" /></div></section>;
}

function EnquirySection({ title, description }: { title: string; description: string }) {
  return <section className="py-20"><div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><Badge tone="success">Premium Enquiry</Badge><h2 className="mt-5 text-4xl font-semibold sm:text-5xl">{title}</h2><p className="mt-5 text-base leading-8 text-neutral-slate">{description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Free garden survey", "WhatsApp response", "Digital visit record", "Premium service reports"].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-accent-marigold" aria-hidden />{item}</div>)}</div></div><EnquiryForm /></div></section>;
}

function ContactCards() {
  const cards = [["WhatsApp Garden Live", "Fast enquiry and visit booking", MessageCircle], ["Call Garden Live", "Speak with the service desk", Phone], ["Service City", "India, multi-city ready", MapPin], ["Garden Survey", "Free assessment for eligible enquiries", CalendarCheck]] as const;
  return <div className="grid gap-4 sm:grid-cols-2">{cards.map(([title, detail, Icon]) => <div key={title} className="rounded-[1.75rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl"><Icon className="h-5 w-5 text-botanical-green" aria-hidden /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-neutral-slate">{detail}</p></div>)}</div>;
}

function MapSection() {
  return <section className="pb-20"><div className="gl-container"><div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/76 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl"><div className="grid lg:grid-cols-[0.8fr_1.2fr]"><div className="p-8"><Badge tone="info">Google Maps</Badge><h2 className="mt-5 text-3xl font-semibold">Garden Live service desk</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">Use this location section for customer visits, survey routing, city onboarding, franchise operations, and corporate project coordination.</p></div><iframe title="Garden Live Google Maps location" className="h-96 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Hyderabad%2C%20India&output=embed" /></div></div></div></section>;
}

function FloatingActions() {
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"><Link aria-label="Chat with Garden Live on WhatsApp" href={whatsappHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_60px_rgba(16,67,38,0.2)]"><MessageCircle className="h-5 w-5" aria-hidden /></Link><Link aria-label="Call Garden Live" href={callHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-botanical-green text-white shadow-[0_18px_60px_rgba(16,67,38,0.2)]"><Phone className="h-5 w-5" aria-hidden /></Link></div>;
}
