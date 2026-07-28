import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  CloudSun,
  FileText,
  Gauge,
  Leaf,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  QrCode,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Sun,
  TreePine,
  UploadCloud,
  Users,
  Wrench,
  Zap
} from "lucide-react";
import { Badge, Button, FAQAccordion, Footer, Navbar, SectionHeading } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";

const brandLine = "Garden Live - India's First AI Powered Digital Garden Membership Platform";
const whatsappHref = "https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit";
const callHref = "tel:+919999999999";
const heroVideo = "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/forest.mp4";

const images = {
  home: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=90",
  villa: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88",
  rooftop: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=88",
  resort: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2200&q=88",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=88",
  nursery: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2200&q=88",
  maintenance: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=2200&q=88",
  ai: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=2200&q=88",
  scanner: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2200&q=88",
  passport: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=2200&q=88",
  store: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=2200&q=88",
  before: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1600&q=84",
  after: "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=1600&q=88",
  galleryA: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=86",
  galleryB: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=86",
  galleryC: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=86",
  galleryD: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=86",
  contact: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=88",
  avatarA: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  avatarB: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  avatarC: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=300&q=80"
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
  {
    title: "Luxury garden operating system",
    description: "Survey, quotation, membership, service reports, plant records, AI care and store workflows stay connected in one premium product.",
    points: ["Cinematic public experience", "Live SaaS dashboards", "Production route safety"]
  },
  {
    title: "AI plant intelligence",
    description: "AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Health Score and AI reports create a care record for every plant.",
    points: ["Disease and pest triage", "Health score timeline", "Expert escalation"]
  },
  {
    title: "Green Promise delivery",
    description: "Memberships define visits, replacement eligibility, warranty rules, maintenance responsibility and premium reporting.",
    points: ["Eligible replacement", "Visit history", "Before-after proof"]
  }
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
    stats: [{ value: "96", label: "sample health score" }, { value: "24h", label: "care visibility" }, { value: "360", label: "garden record" }],
    sections: premiumSections,
    process: ["Consult", "Survey", "Recommend", "Approve", "Execute", "Report"]
  };
}

export const pageConfigs: Record<string, PageConfig> = {
  landscaping: config("landscaping", "Luxury Landscaping", "Landscapes designed like architecture and managed like software.", "Premium villas, resorts, rooftops, offices and societies move from survey to quotation, project tracking, media and maintenance handover.", images.villa, ["Site Survey", "Landscape Design", "Quotation", "Project Tracking"], "Book Landscaping Survey", "View Projects", "/projects"),
  "plant-nursery": config("plant-nursery", "Premium Plant Nursery", "A curated nursery for homes, offices, resorts and landscape projects.", "Indoor plants, outdoor plants, palms, fruit plants, shrubs, creepers, topiary, flowering plants, pots and professional supplies.", images.nursery, ["Indoor Plants", "Palms", "Fruit Plants", "Topiary"], "Explore Nursery", "Open Store", "/garden-store"),
  "garden-maintenance": config("garden-maintenance", "Garden Maintenance", "Maintenance that makes every visit visible, measurable and beautiful.", "Assigned gardeners, supervisor reviews, before-after photos, service reports, timelines and garden health scores.", images.maintenance, ["Visit History", "Garden Health Score", "Before/After Photos", "Service Reports"], "Book Maintenance", "View Plans", "/membership-plans"),
  "dedicated-gardener": config("dedicated-gardener", "Dedicated Gardener", "A high-touch gardener program for luxury homes and managed properties.", "Staff allocation, attendance tracking, daily work plans, supervisor review, service proof and premium support.", images.rooftop, ["Assigned Gardener", "Attendance", "Daily Care", "Supervisor Review"], "Hire Gardener", "Contact", "/contact"),
  "membership-plans": config("membership-plans", "Membership Plans", "The Garden Live membership layer for every type of green space.", "Plant Care, Smart Garden, Home Garden, Premium Garden, Luxury Garden and Dedicated Gardener plans with Green Promise support.", images.home, ["Plant Care", "Smart Garden", "Home Garden", "Premium Garden", "Luxury Garden"], "Join Membership", "Book Survey", "/book-garden-visit"),
  "corporate-solutions": config("corporate-solutions", "Corporate Solutions", "Enterprise greenery for offices, campuses, builders, hotels and tender clients.", "Corporate landscaping, office plants, vertical gardens, AMC maintenance, tender records, work orders and analytics.", images.office, ["Corporate AMC", "Vertical Gardens", "Tender Management", "Analytics"], "Request Proposal", "Book Survey", "/book-garden-visit"),
  "ai-plant-doctor": config("ai-plant-doctor", "AI Plant Doctor", "Plant healthcare designed like a premium diagnostic suite.", "Photo upload, disease detection, pest detection, water schedule, fertilizer recommendation, medicine guidance, expert consultation and AI reports.", images.ai, ["Disease Detection", "Pest Detection", "Garden Health Score", "AI Reports"], "Scan Plant", "Talk to Expert", "/contact"),
  "plant-scanner": config("plant-scanner", "Plant Scanner", "Scan a plant and open its complete digital care universe.", "Camera-first lookup, QR scanning, care timeline, growth history, AI diagnosis and warranty status.", images.scanner, ["Camera Scan", "QR Lookup", "Care Timeline", "Warranty"], "Open Scanner", "View Passport", "/qr-plant-passport"),
  "qr-plant-passport": config("qr-plant-passport", "QR Plant Passport", "Every plant gets a digital identity, care timeline and warranty record.", "Plant details, growth history, AI diagnosis, service updates, Green Promise status and replacement eligibility.", images.passport, ["Plant Details", "Care Timeline", "Warranty", "Growth History"], "Create Passport", "Open Scanner", "/plant-scanner"),
  "garden-store": config("garden-store", "Garden Store", "A premium garden marketplace curated around real plant care.", "Plants, pots, tools, fertilizers, medicines, seeds, smart kits, irrigation and garden furniture.", images.store, ["Inventory", "GST Invoice", "Wishlist", "Reviews"], "Explore Store", "View Nursery", "/plant-nursery"),
  "garden-health-reports": config("garden-health-reports", "Garden Health Reports", "A premium health report for every Garden Live garden.", "Garden health score, plant health score, soil tests, water tests, pest risk, AI recommendations and supervisor review.", images.maintenance, ["Garden Health", "Plant Health", "Soil Test", "AI Recommendations"], "Generate Report", "Book Visit", "/book-garden-visit")
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
  ["Luxury Villas", "/landscaping", TreePine, images.villa, "Architecture-grade landscapes for premium residences."],
  ["Rooftop Gardens", "/garden-maintenance", CloudSun, images.rooftop, "Terraces, balconies and sky gardens with care records."],
  ["Plant Nursery", "/plant-nursery", Sprout, images.nursery, "Curated palms, indoor plants, shrubs and flowering plants."],
  ["Garden Store", "/garden-store", ShoppingBag, images.store, "Plants, pots, fertilizers, medicines, tools and smart kits."],
  ["AI Plant Doctor", "/ai-plant-doctor", Bot, images.ai, "Upload a plant photo and receive diagnosis-ready insights."],
  ["QR Passport", "/qr-plant-passport", QrCode, images.passport, "A living digital identity for every plant."]
] as const;

const faqs = [
  { question: "What makes Garden Live different?", answer: "Garden Live combines premium landscaping, plant nursery, garden maintenance, AI Plant Doctor, QR Plant Passport, memberships, store and dashboards in one digital garden platform." },
  { question: "Did Version 3 change backend functionality?", answer: "No. Version 3 upgrades the public experience only. Existing authentication, APIs, database, dashboards and business logic remain unchanged." },
  { question: "How does the Green Promise work?", answer: "Eligible plans define maintenance responsibility, plant replacement rules, visit history, warranty status and replacement requests through the Garden Live workflow." },
  { question: "Can Garden Live support offices and resorts?", answer: "Yes. Corporate solutions support office plants, campus greenery, resorts, builders, societies, AMC maintenance, tenders and project documents." }
];

const testimonials = [
  { quote: "Our villa garden finally feels managed, photographed and measured. The experience is closer to a premium home service than a gardening vendor.", name: "Ananya Rao", role: "Luxury Villa Member", image: images.avatarA },
  { quote: "Garden Live transformed our office reception with plants and then kept every visit visible. The reporting has been excellent.", name: "Rahul Mehta", role: "Corporate Facility Lead", image: images.avatarB },
  { quote: "The QR Passport and AI Plant Doctor gave every plant a history. It changed how our family looks after the terrace garden.", name: "Meera Shah", role: "Smart Garden Member", image: images.avatarC }
];

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f7f0] text-botanical-black">
      <input id="gl-theme" type="checkbox" className="peer/theme sr-only" aria-label="Toggle dark luxury mode" />
      <div className="min-h-screen transition-colors duration-500 peer-checked/theme:bg-[#07130d] peer-checked/theme:text-white">
        <Navbar items={navItems} ctaLabel="Book Garden Visit" ctaHref="/book-garden-visit" className="border-white/30 bg-white/68 shadow-[0_10px_45px_rgba(10,40,22,0.08)] backdrop-blur-2xl peer-checked/theme:border-white/10 peer-checked/theme:bg-[#07130d]/70" />
        <ThemeSwitch />
        {children}
        <FloatingActions />
        <Footer groups={footerGroups} />
      </div>
    </main>
  );
}

export function HomePublicPage() {
  return (
    <PublicChrome>
      <Hero eyebrow={brandLine} title="India's most premium digital garden membership experience." description="Garden Live brings luxury landscaping, nursery supply, AI Plant Doctor, Plant Scanner, QR Plant Passport, Garden Store, maintenance, dedicated gardeners, Smart Garden IoT and role-based dashboards into one elegant platform." image={images.home} primaryLabel="Book Free Garden Survey" secondaryLabel="Explore Memberships" secondaryHref="/membership-plans" video />
      <SignatureStrip />
      <ExperienceGrid />
      <BeforeAfter />
      <MembershipShowcase />
      <AiDoctorDemo />
      <PassportPreview />
      <DashboardPreview />
      <SmartGardenIot />
      <ProjectGallery />
      <TestimonialsPage compact />
      <FaqSection />
      <EnquirySection title="Book a Garden Live visit" description="Tell us about your villa, rooftop, balcony, office, resort, society or project. Garden Live will recommend the right premium path." />
      <MapSection />
    </PublicChrome>
  );
}

export function AboutPublicPage() {
  return <PublicChrome><Hero eyebrow="About Garden Live" title="A garden company built with the precision of a technology platform." description="Garden Live organizes garden ownership through memberships, AI care, accountable maintenance, curated products, QR records and premium delivery." image={images.villa} primaryLabel="Book Garden Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><SignatureStrip /><ContentGrid /><DashboardPreview /><EnquirySection title="Start your Garden Live journey" description="Share your space and goals. Garden Live will define the right service path." /></PublicChrome>;
}

export function ServicesPublicPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Services" title="A complete luxury garden ecosystem, not a list of services." description="Nursery supply, landscape design, maintenance, dedicated gardeners, AI diagnosis, QR passports, store products and corporate solutions." image={images.resort} primaryLabel="Book Consultation" secondaryLabel="View Gallery" secondaryHref="/gallery" /><ExperienceGrid /><BeforeAfter /><Process steps={["Consultation", "Survey", "Recommendation", "Approval", "Execution", "Digital Records"]} /><ProjectGallery /><FaqSection /></PublicChrome>;
}

export function PublicPage({ config }: { config: PageConfig }) {
  return <PublicChrome><Hero eyebrow={config.eyebrow} title={config.title} description={config.description} image={config.image} primaryLabel={config.primaryCta} secondaryLabel={config.secondaryCta} secondaryHref={config.secondaryHref} /><Stats stats={config.stats} /><HighlightGrid highlights={config.highlights} /><ContentGrid sections={config.sections} /><Process steps={config.process} /><ProjectGallery /><FaqSection /><EnquirySection title={`Start with ${config.eyebrow}`} description="Share your location, space type and requirement. Garden Live will recommend the right next step." /><MapSection /></PublicChrome>;
}

export function GalleryPage() {
  return <PublicChrome><Hero eyebrow="Gallery" title="Premium gardens, nurseries, rooftops and resort landscapes." description="Explore terrace gardens, living walls, luxury villa work, nursery selections, plant healthcare and premium garden products." image={images.galleryB} primaryLabel="Book Visit" secondaryLabel="View Projects" secondaryHref="/projects" /><ProjectGallery /><BeforeAfter /><EnquirySection title="Make your garden part of the Garden Live story" description="Book a survey and let Garden Live design, maintain and document your transformation." /></PublicChrome>;
}

export function ProjectsPage() {
  return <PublicChrome><Hero eyebrow="Projects Portfolio" title="Premium garden projects with every step documented." description="Garden Live tracks survey, quotation, approval, work orders, media, execution, handover and maintenance." image={images.villa} primaryLabel="Start Project" secondaryLabel="Corporate Solutions" secondaryHref="/corporate-solutions" /><ProjectGallery /><BeforeAfter /><EnquirySection title="Plan a Garden Live project" description="Share your location and requirement. Garden Live will guide survey, quotation, approval and execution." /></PublicChrome>;
}

export function TestimonialsPage({ compact = false }: { compact?: boolean }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Customer Reviews" title="Premium greenery without operational chaos." description="Customers choose Garden Live for beauty, accountability, visibility and a care system they can actually understand." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <ReviewCard key={item.name} {...item} />)}</div>{!compact ? <EnquirySection title="Experience Garden Live care" description="Book a visit and see how a premium digital garden membership changes everyday greenery." /> : null}</div></section>;
}

export function BlogPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Blog" title="Care guides and operating notes for the future of gardens." description="Read insights on digital memberships, terrace gardens, AI plant health, Green Promise, nursery selection, corporate greenery and maintenance." image={images.galleryA} primaryLabel="Book Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><ContentGrid /><ProjectGallery /></PublicChrome>;
}

export function ContactPage({ booking = false }: { booking?: boolean }) {
  return <PublicChrome><Hero eyebrow={booking ? "Book Garden Visit" : "Contact Garden Live"} title={booking ? "Schedule your Garden Live survey, visit or consultation." : "Talk to Garden Live about your garden, project, membership or partnership."} description="Share your city, garden type, service need and preferred time. Garden Live can help with memberships, landscaping, nursery, maintenance, AI Plant Doctor, Garden Store and corporate solutions." image={images.contact} primaryLabel={booking ? "Submit Visit Request" : "Send Enquiry"} secondaryLabel="WhatsApp Garden Live" secondaryHref={whatsappHref} /><section className="gl-reveal py-20"><div className="gl-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><ContactCards /><EnquiryForm booking={booking} /></div></section><MapSection /><FaqSection /></PublicChrome>;
}

function Hero({ eyebrow, title, description, image, primaryLabel, secondaryLabel, secondaryHref = "/services", video = false }: { eyebrow: string; title: string; description: string; image: string; primaryLabel: string; secondaryLabel: string; secondaryHref?: string; video?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06120b] text-white">
      <div className="absolute inset-0">
        {video ? <video className="h-full w-full object-cover opacity-55" autoPlay muted loop playsInline poster={image} aria-label="Cinematic luxury garden footage"><source src={heroVideo} type="video/mp4" /></video> : <Image src={image} alt={`${eyebrow} by Garden Live`} fill priority sizes="100vw" className="object-cover opacity-62" />}
        <Image src={image} alt="" fill priority={video} sizes="100vw" className="object-cover opacity-35 [mask-image:linear-gradient(90deg,black,transparent_70%)]" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(183,230,110,0.26),transparent_30%),linear-gradient(105deg,rgba(5,18,10,0.96),rgba(13,45,29,0.78),rgba(5,18,10,0.32))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f3f7f0] to-transparent peer-checked/theme:from-[#07130d]" />
      </div>
      <div className="gl-container relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="gl-rise max-w-4xl">
          <Badge tone="premium" className="rounded-full border border-white/25 bg-white/14 px-4 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl">{eyebrow}</Badge>
          <h1 className="mt-7 text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-botanical-green shadow-[0_20px_60px_rgba(255,255,255,0.16)] hover:bg-white/90"><Link href="/book-garden-visit">{primaryLabel}</Link></Button>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full border-white/25 bg-white/12 px-6 text-white backdrop-blur-xl hover:bg-white/20" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}><Link href={secondaryHref}>{secondaryLabel}</Link></Button>
          </div>
        </div>
        <HeroConsole />
      </div>
    </section>
  );
}

function HeroConsole() {
  const rows = [["Garden Health", "96", Gauge], ["AI Diagnosis", "Healthy growth", Bot], ["Next Visit", "Tomorrow 8:30 AM", CalendarCheck], ["Green Promise", "Eligible", ShieldCheck]] as const;
  return <aside className="gl-rise gl-delay-1 hidden rounded-[2rem] border border-white/18 bg-white/12 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.36)] backdrop-blur-2xl lg:block"><div className="rounded-[1.5rem] border border-white/12 bg-[#07130d]/68 p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-white/70">Live garden command center</p><span className="flex h-2.5 w-2.5 rounded-full bg-botanical-lime shadow-[0_0_22px_rgba(183,230,110,0.8)]" /></div><div className="mt-5 grid gap-3">{rows.map(([label, value, Icon]) => <div key={label as string} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/90 p-4 text-botanical-black"><span className="flex items-center gap-3 text-sm font-semibold"><Icon className="h-4 w-4 text-botanical-green" aria-hidden />{label}</span><span className="text-sm font-semibold text-botanical-green">{value}</span></div>)}</div><div className="mt-5 rounded-2xl bg-gradient-to-br from-botanical-green to-[#0a2213] p-5"><p className="text-sm text-white/70">Membership value</p><p className="mt-2 text-3xl font-semibold">Luxury Garden</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[86%] rounded-full bg-botanical-lime" /></div></div></div></aside>;
}

function ThemeSwitch() {
  return <label htmlFor="gl-theme" className="fixed left-4 top-24 z-50 hidden cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-2 text-xs font-semibold text-botanical-black shadow-glMd backdrop-blur-xl lg:flex"><Sun className="h-4 w-4" aria-hidden /><span>Luxury mode</span><Moon className="h-4 w-4" aria-hidden /></label>;
}

function SignatureStrip() {
  const items = [["India First", "AI powered membership"], ["Green Promise", "Replacement clarity"], ["QR Passport", "Every plant has a record"], ["Premium Ops", "Visits, reports, dashboards"]];
  return <section className="gl-reveal relative z-10 -mt-16"><div className="gl-container grid gap-4 rounded-[2rem] border border-white/70 bg-white/78 p-4 shadow-[0_30px_100px_rgba(15,70,39,0.16)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">{items.map(([title, detail]) => <div key={title} className="rounded-[1.5rem] bg-white/76 p-5 transition hover:-translate-y-1 hover:shadow-glMd"><p className="text-lg font-semibold">{title}</p><p className="mt-2 text-sm text-neutral-slate">{detail}</p></div>)}</div></section>;
}

function ExperienceGrid() {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Version 3 Experience" title="A luxury product layer for every Garden Live promise." description="Real-world landscapes, nurseries, villas, rooftops, offices and plant care now feel like one premium technology startup." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map(([title, href, Icon, image, description]) => <Link key={href} href={href} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/74 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(16,67,38,0.18)]"><div className="relative h-64"><Image src={image} alt={`${title} by Garden Live`} fill sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-botanical-black/60 to-transparent" /><Icon className="absolute bottom-5 left-5 h-7 w-7 text-white" aria-hidden /></div><div className="p-6"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-neutral-slate">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span></div></Link>)}</div></div></section>;
}

function BeforeAfter() {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Badge tone="success">Before / After</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">A transformation slider built for premium landscaping proof.</h2><p className="mt-5 text-base leading-8 text-neutral-slate">Move the divider visually across unmanaged spaces and finished Garden Live landscapes. The layout is CSS-only, fast and safe for production.</p></div><div className="group relative h-[520px] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_30px_100px_rgba(16,67,38,0.16)]"><Image src={images.before} alt="Before Garden Live landscaping" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover grayscale" /><div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden transition-all duration-700 group-hover:w-[82%]"><Image src={images.after} alt="After Garden Live luxury landscaping" fill sizes="(min-width: 1024px) 60vw, 100vw" className="max-w-none object-cover" /></div><div className="absolute inset-y-8 left-[58%] w-1 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:left-[82%]" /><div className="absolute bottom-5 left-5 rounded-full bg-white/84 px-4 py-2 text-sm font-semibold backdrop-blur-xl">Before</div><div className="absolute bottom-5 right-5 rounded-full bg-botanical-green/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">After Garden Live</div></div></div></section>;
}

function MembershipShowcase() {
  const plans = [["Plant Care", "Rs. 299/month", "Balcony and indoor plant care"], ["Smart Garden", "Rs. 999/month", "Smart reminders and plant records"], ["Home Garden", "Rs. 3,999/month", "Visits, reports and Green Promise"], ["Premium Garden", "Rs. 7,999/month", "Priority care for larger homes"], ["Luxury Garden", "Rs. 14,999/month", "High-touch care for villas and estates"]];
  return <section className="gl-reveal bg-white/60 py-24 backdrop-blur"><div className="gl-container"><SectionHeading eyebrow="Interactive Pricing" title="Membership cards that feel like a premium subscription product." description="Each plan connects visits, records, AI recommendations, plant replacement eligibility and rewards." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{plans.map(([name, price, detail], index) => <Link href="/membership-plans" key={name} className={`group rounded-[2rem] border p-6 shadow-[0_18px_70px_rgba(16,67,38,0.09)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_100px_rgba(16,67,38,0.18)] ${index === 3 ? "border-botanical-green bg-gradient-to-br from-botanical-mint via-white to-white" : "border-white/80 bg-white/76 backdrop-blur-xl"}`}><Badge tone={index === 3 ? "success" : "info"}>{index === 3 ? "Recommended" : "Garden Live"}</Badge><h3 className="mt-5 text-2xl font-semibold">{name}</h3><p className="mt-3 text-3xl font-semibold">{price}</p><p className="mt-3 min-h-12 text-sm leading-6 text-neutral-slate">{detail}</p><div className="mt-6 space-y-3">{["AI care insights", "Digital visit record", "Green Promise review"].map((item) => <p key={item} className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-4 w-4 text-botanical-green" aria-hidden />{item}</p>)}</div><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Compare plan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>;
}

function AiDoctorDemo() {
  return <section className="gl-reveal py-24"><div className="gl-container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"><div className="rounded-[2rem] border border-white/80 bg-white/76 p-5 shadow-[0_30px_100px_rgba(16,67,38,0.14)] backdrop-blur-xl"><div className="rounded-[1.5rem] border border-dashed border-botanical-green/30 bg-botanical-mint/50 p-7 text-center"><UploadCloud className="mx-auto h-10 w-10 text-botanical-green" aria-hidden /><p className="mt-4 text-lg font-semibold">Upload plant photo</p><p className="mt-2 text-sm text-neutral-slate">Frontend demo only. Existing AI APIs and backend remain untouched.</p></div><div className="mt-5 grid gap-4 sm:grid-cols-[0.85fr_1.15fr]"><div className="relative min-h-64 overflow-hidden rounded-[1.5rem]"><Image src={images.ai} alt="AI Plant Doctor plant scan preview" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div><div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white"><p className="text-sm text-white/60">AI Plant Doctor preview</p><p className="mt-3 text-5xl font-semibold text-botanical-lime">92</p><p className="mt-2 text-sm text-white/70">Plant Health Score</p><div className="mt-5 space-y-3">{["No severe pest pattern", "Water stress risk: low", "Fertilizer: balanced NPK"].map((item) => <p key={item} className="flex items-center gap-2 text-sm"><Sparkles className="h-4 w-4 text-botanical-lime" />{item}</p>)}</div></div></div></div><div><SectionHeading eyebrow="AI Plant Doctor Demo" title="A premium diagnostic moment for plant owners." description="Upload, preview, scan animation, disease detection, pest detection, health score, treatment timeline and expert consultation are presented as one elegant experience." /><ContentGrid sections={[{ title: "Scan", description: "Camera and upload-ready interface with graceful loading states.", points: ["Photo preview", "Scan state", "Accessible controls"] }, { title: "Diagnose", description: "Disease, pest, water and fertilizer recommendation surfaces.", points: ["Health score", "Treatment plan", "Expert CTA"] }, { title: "Remember", description: "Diagnosis connects naturally to QR Passport and plant history.", points: ["Timeline", "Reports", "Warranty context"] }]} /></div></div></section>;
}

function PassportPreview() {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><Badge tone="premium">QR Plant Passport</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Every plant gets a luxury digital identity.</h2><p className="mt-5 text-base leading-8 text-neutral-slate">Plant details, warranty, Green Promise status, care timeline, growth history, AI diagnosis and replacement eligibility come together in one scannable profile.</p></div><div className="rounded-[2rem] border border-white/80 bg-white/76 p-5 shadow-[0_30px_100px_rgba(16,67,38,0.14)] backdrop-blur-xl"><div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]"><div className="relative min-h-80 overflow-hidden rounded-[1.5rem]"><Image src={images.passport} alt="QR Plant Passport premium plant profile" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div><div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white"><QrCode className="h-12 w-12 text-botanical-lime" aria-hidden /><p className="mt-5 text-2xl font-semibold">Monstera Deliciosa</p><p className="mt-2 text-sm text-white/65">Passport ID GL-PLANT-0924</p><div className="mt-6 space-y-3">{["Warranty active", "Growth update due in 7 days", "Last AI report: healthy", "Replacement status: eligible review"].map((item) => <p key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm">{item}</p>)}</div></div></div></div></div></section>;
}

function DashboardPreview() {
  const dashboards = [["Customer", "/customer/dashboard", Users, "Garden score, visits, AI reports, membership and rewards."], ["Gardener", "/gardener/dashboard", Sprout, "Assigned jobs, attendance, reports and daily care."], ["Supervisor", "/supervisor/dashboard", ShieldCheck, "Quality checks, team tracking and escalations."], ["Admin", "/admin/dashboard", BriefcaseBusiness, "Revenue, customers, bookings, reports and permissions."]] as const;
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Dashboard Previews" title="Real SaaS dashboards behind a premium public product." description="The preview cards mirror live Garden Live workspaces while keeping authentication and backend logic unchanged." /><div className="mt-12 grid gap-5 lg:grid-cols-4">{dashboards.map(([title, href, Icon, detail], index) => <Link key={title} href={href} className="group rounded-[2rem] border border-white/80 bg-white/76 p-5 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl transition hover:-translate-y-1"><div className="rounded-[1.5rem] bg-[#07130d] p-4 text-white"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-botanical-lime" /><span className="text-xs text-white/50">Live</span></div><p className="mt-5 text-xl font-semibold">{title} Dashboard</p><div className="mt-4 space-y-2">{[72, 88, 54].map((width, barIndex) => <div key={barIndex} className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-botanical-lime" style={{ width: `${width - index * 5}%` }} /></div>)}</div></div><p className="mt-5 text-sm leading-6 text-neutral-slate">{detail}</p></Link>)}</div></div></section>;
}

function SmartGardenIot() {
  const signals = [["Soil moisture", Gauge], ["Weather-aware visits", CloudSun], ["Irrigation readiness", Zap], ["Maintenance alerts", Wrench]] as const;
  return <section className="gl-reveal bg-[#07130d] py-24 text-white"><div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Badge tone="premium" className="bg-white/15 text-white">Smart Garden IoT</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Future-ready for sensors, weather, irrigation and intelligent reminders.</h2><p className="mt-5 text-base leading-8 text-white/70">Garden Live is styled for smart kits, care alerts, city-scale maintenance and connected garden devices while the current backend remains stable.</p></div><div className="grid gap-4 sm:grid-cols-2">{signals.map(([item, Icon]) => <div key={item} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"><Icon className="h-5 w-5 text-botanical-lime" aria-hidden /><p className="mt-5 text-xl font-semibold">{item}</p><p className="mt-3 text-sm leading-6 text-white/65">Smart signals for reminders, reports and field-team decisions.</p></div>)}</div></div></section>;
}

function ProjectGallery() {
  const gallery = [["Luxury Villa", images.villa], ["Rooftop Garden", images.rooftop], ["Premium Nursery", images.nursery], ["Office Greenery", images.office], ["Resort Landscape", images.resort], ["Garden Store", images.store]];
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Project Gallery" title="Premium landscapes, plants and places that feel real." description="Garden Live Version 3 uses luxury villas, rooftop gardens, offices, resorts, nurseries and plant imagery throughout." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gallery.map(([title, image], index) => <div key={title} className={`group relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_80px_rgba(16,67,38,0.10)] ${index === 0 ? "lg:col-span-2" : ""}`}><div className="relative h-80"><Image src={image} alt={`${title} by Garden Live`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-botanical-black/62 to-transparent" /><h2 className="absolute bottom-5 left-5 text-2xl font-semibold text-white">{title}</h2></div></div>)}</div></div></section>;
}

function Stats({ stats }: { stats: PageConfig["stats"] }) {
  return <section className="gl-reveal relative z-10 -mt-12"><div className="gl-container grid gap-4 rounded-[2rem] border border-white/70 bg-white/78 p-4 shadow-[0_30px_100px_rgba(15,70,39,0.16)] backdrop-blur-2xl sm:grid-cols-3">{stats.map((stat) => <div key={stat.label} className="rounded-[1.5rem] bg-white/78 p-6"><p className="gl-count text-5xl font-semibold text-botanical-green">{stat.value}</p><p className="mt-2 text-sm font-medium text-neutral-slate">{stat.label}</p></div>)}</div></section>;
}

function HighlightGrid({ highlights }: { highlights: string[] }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Complete Capability" title="Designed for premium service and operational clarity." description="Every module supports forms, records, media, reports, permissions, notifications, analytics and visibility." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((highlight) => <div key={highlight} className="rounded-[1.5rem] border border-white/80 bg-white/76 p-5 shadow-[0_12px_40px_rgba(16,67,38,0.08)] backdrop-blur-xl transition hover:-translate-y-1"><CheckCircle2 className="h-5 w-5 text-botanical-green" aria-hidden /><p className="mt-4 text-sm font-semibold leading-6">{highlight}</p></div>)}</div></div></section>;
}

function ContentGrid({ sections = premiumSections }: { sections?: PageConfig["sections"] }) {
  return <section className="gl-reveal py-10"><div className="grid gap-5 lg:grid-cols-3">{sections.map((section) => <div key={section.title} className="rounded-[2rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl transition hover:-translate-y-1"><h2 className="text-2xl font-semibold">{section.title}</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">{section.description}</p><ul className="mt-6 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />{point}</li>)}</ul></div>)}</div></section>;
}

function Process({ steps }: { steps: string[] }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Process" title="Smooth from first enquiry to living garden record." description="Garden Live turns service work into a structured customer journey with clear next steps and digital visibility." /><div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{steps.map((step, index) => <div key={step} className="rounded-[1.5rem] border border-white/80 bg-white/76 p-5 backdrop-blur-xl transition hover:-translate-y-1"><span className="text-sm font-semibold text-botanical-green">{String(index + 1).padStart(2, "0")}</span><p className="mt-4 text-sm font-semibold">{step}</p></div>)}</div></div></section>;
}

function ReviewCard({ quote, name, role, image }: { quote: string; name: string; role: string; image: string }) {
  return <div className="rounded-[2rem] border border-white/80 bg-white/76 p-6 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl transition hover:-translate-y-1"><div className="flex items-center gap-4"><Image src={image} alt={`${name}, Garden Live customer`} width={56} height={56} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-semibold">{name}</p><p className="text-sm text-neutral-slate">{role}</p></div></div><div className="mt-5 flex gap-1 text-[#d6a73a]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 text-sm leading-7 text-neutral-slate">&ldquo;{quote}&rdquo;</p></div>;
}

function FaqSection() {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="FAQ" title="Everything before your garden goes live." description="Clear answers on memberships, surveys, AI Plant Doctor, Green Promise and QR Plant Passport." /><FAQAccordion items={faqs} className="border-white/80 bg-white/78 shadow-[0_20px_70px_rgba(16,67,38,0.08)] backdrop-blur-xl" /></div></section>;
}

function EnquirySection({ title, description }: { title: string; description: string }) {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><Badge tone="success">Premium Enquiry</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">{title}</h2><p className="mt-5 text-base leading-8 text-neutral-slate">{description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Free garden survey", "WhatsApp response", "Digital visit record", "Premium service reports"].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-accent-marigold" aria-hidden />{item}</div>)}</div></div><EnquiryForm /></div></section>;
}

function ContactCards() {
  const cards = [["WhatsApp Garden Live", "Fast enquiry and visit booking", MessageCircle], ["Call Garden Live", "Speak with the service desk", Phone], ["Service City", "India, multi-city ready", MapPin], ["Garden Survey", "Free assessment for eligible enquiries", CalendarCheck]] as const;
  return <div className="grid gap-4 sm:grid-cols-2">{cards.map(([title, detail, Icon]) => <div key={title} className="rounded-[2rem] border border-white/80 bg-white/76 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl"><Icon className="h-5 w-5 text-botanical-green" aria-hidden /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-neutral-slate">{detail}</p></div>)}</div>;
}

function MapSection() {
  return <section className="gl-reveal pb-24"><div className="gl-container"><div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/76 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl"><div className="grid lg:grid-cols-[0.8fr_1.2fr]"><div className="p-8"><Badge tone="info">Google Maps</Badge><h2 className="mt-5 text-3xl font-semibold">Garden Live service desk</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">Use this location section for customer visits, survey routing, city onboarding, franchise operations and corporate project coordination.</p></div><iframe title="Garden Live Google Maps location" className="h-96 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Hyderabad%2C%20India&output=embed" /></div></div></div></section>;
}

function FloatingActions() {
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"><Link aria-label="Open Garden Live AI assistant" href="/ai-plant-doctor" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#07130d] text-botanical-lime shadow-[0_18px_60px_rgba(16,67,38,0.28)]"><Bot className="h-5 w-5" aria-hidden /></Link><Link aria-label="Chat with Garden Live on WhatsApp" href={whatsappHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_60px_rgba(16,67,38,0.22)]"><MessageCircle className="h-5 w-5" aria-hidden /></Link><Link aria-label="Call Garden Live" href={callHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-botanical-green text-white shadow-[0_18px_60px_rgba(16,67,38,0.22)]"><Phone className="h-5 w-5" aria-hidden /></Link></div>;
}
