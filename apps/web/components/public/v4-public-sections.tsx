import Image from "next/image";
import Link from "next/link";
import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  CloudSun,
  Download,
  Gauge,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  QrCode,
  Sparkles,
  Star,
  Sun,
  UploadCloud
} from "lucide-react";
import { Badge, Button, FAQAccordion, Footer, Navbar, SectionHeading } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";
import {
  baseSections,
  brandLine,
  callHref,
  contactCards,
  dashboardRows,
  faqs,
  footerGroups,
  img,
  iotSignals,
  modules,
  navItems,
  type PageConfig,
  services,
  testimonials,
  whatsappHref
} from "@/components/public/v4-public-data";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  video?: boolean;
};

const glassPanel =
  "border border-white/70 bg-white/[0.76] shadow-[0_28px_90px_rgba(8,43,22,0.12)] backdrop-blur-2xl";
const darkPanel =
  "border border-white/10 bg-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f7f0] text-botanical-black">
      <input id="gl-theme" type="checkbox" className="peer/theme sr-only" aria-label="Toggle dark luxury mode" />
      <div className="min-h-screen bg-[radial-gradient(circle_at_12%_8%,rgba(183,230,110,0.18),transparent_28%),linear-gradient(180deg,#f6faf2,#eef5ec_42%,#f7faf4)] transition-colors duration-500 peer-checked/theme:bg-[#07130d] peer-checked/theme:text-white">
        <Navbar
          items={navItems}
          ctaLabel="Book Garden Visit"
          ctaHref="/book-garden-visit"
          className="border-white/30 bg-white/[0.68] shadow-[0_10px_45px_rgba(10,40,22,0.08)] backdrop-blur-2xl peer-checked/theme:border-white/10 peer-checked/theme:bg-[#07130d]/70"
        />
        <ThemeSwitch />
        {children}
        <FloatingActions />
        <Footer groups={footerGroups} />
      </div>
    </main>
  );
}

export function HomeExperience() {
  return (
    <>
      <Hero
        eyebrow={brandLine}
        title="India's First AI Powered Digital Garden Membership Platform"
        description="A premium SaaS layer for luxury landscaping, AI plant care, garden memberships, QR Plant Passport, smart garden operations, nursery commerce and beautifully accountable green living."
        image={img.home}
        primaryLabel="Join Membership"
        primaryHref="/membership-plans"
        secondaryLabel="Book Free Garden Survey"
        secondaryHref="/book-garden-visit"
      />
      <SignatureStrip />
      <ExperienceGrid />
      <FlagshipModules />
      <MembershipShowcase />
      <HomepageStats />
      <ProjectGallery />
      <DashboardPreview />
      <TestimonialsBlock compact />
      <AiDoctorDemo />
      <PassportPreview />
      <SmartGardenIot />
      <BeforeAfter />
      <BlogPreview />
      <FaqSection />
      <EnquirySection
        title="Book a Garden Live visit"
        description="Tell us about your villa, rooftop, balcony, office, resort, society or project. Garden Live will recommend the right premium path."
      />
      <MapSection />
    </>
  );
}

export function Hero({
  eyebrow,
  title,
  description,
  image,
  primaryLabel,
  secondaryLabel,
  primaryHref = "/book-garden-visit",
  secondaryHref = "/services"
}: HeroProps) {
  return (
    <section className="group/hero relative isolate min-h-[100svh] overflow-hidden bg-[#06120b] text-white">
      <div className="absolute inset-0 transition duration-[1600ms] group-hover/hero:scale-[1.025]">
        <Image src={image} alt={`${eyebrow} by Garden Live`} fill priority sizes="100vw" className="object-cover opacity-70 saturate-[1.08] contrast-[1.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(183,230,110,0.34),transparent_28%),radial-gradient(circle_at_22%_72%,rgba(18,89,52,0.42),transparent_34%),linear-gradient(108deg,rgba(4,16,9,0.98),rgba(10,44,25,0.8)_46%,rgba(4,16,9,0.4))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
      </div>
      <div className="gl-container relative grid min-h-[100svh] items-center gap-12 py-28 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="gl-rise max-w-5xl">
          <Badge tone="premium" className="rounded-full border border-white/25 bg-white/[0.14] px-4 py-2 text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            {eyebrow}
          </Badge>
          <h1 className="gl-headline mt-7 text-5xl font-semibold leading-[0.92] tracking-[0] sm:text-7xl lg:text-[5.8rem]">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/[0.78] sm:text-lg">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gl-button-shine h-12 rounded-full bg-botanical-lime px-7 text-[#07130d] shadow-[0_18px_55px_rgba(183,230,110,0.28)] hover:bg-white">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full border-white/25 bg-white/[0.12] px-7 text-white backdrop-blur-xl hover:bg-white/20" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
          <HeroStats />
        </div>
        <HeroPhoneMockup />
      </div>
      <Link href="#premium-services" aria-label="Scroll to premium services" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60 md:flex">
        <span>Scroll</span>
        <span className="h-10 w-px overflow-hidden rounded-full bg-white/20"><span className="gl-scroll-line block h-4 w-px bg-botanical-lime" /></span>
      </Link>
    </section>
  );
}

function HeroStats() {
  return (
    <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
      {[["96/100", "AI garden health"], ["24h", "visit visibility"], ["360", "plant care record"]].map(([value, label]) => (
        <div key={label} className={`rounded-2xl p-4 text-white ${darkPanel} transition duration-300 hover:-translate-y-1 hover:bg-white/[0.15]`}>
          <p className="gl-count text-2xl font-semibold text-botanical-lime">{value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/[0.58]">{label}</p>
        </div>
      ))}
    </div>
  );
}

function HeroPhoneMockup() {
  const featureCards = [["AI Diagnosis", "94% confidence", Bot], ["Next Visit", "Tomorrow 8:30 AM", CalendarCheck], ["Passport", "GL-PLANT-0924", QrCode]] as const;

  return (
    <aside className="gl-rise gl-delay-1 relative mx-auto w-full max-w-[520px] lg:ml-auto">
      <FloatingMiniCard className="-left-8 top-16 hidden lg:block" label="Garden Health" value="96" />
      <FloatingMiniCard className="-right-5 bottom-20 hidden sm:block" label="Live care" value="3 tasks due" />
      <div className="mx-auto rounded-[3rem] border border-white/20 bg-white/[0.14] p-3 shadow-[0_45px_140px_rgba(0,0,0,0.46)] backdrop-blur-2xl transition duration-700 group-hover/hero:-translate-y-3 group-hover/hero:rotate-1">
        <div className="overflow-hidden rounded-[2.35rem] border border-white/10 bg-[#07130d]">
          <div className="relative h-[560px] sm:h-[620px]">
            <Image src={img.ai} alt="AI Plant Doctor phone mockup for Garden Live" fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover opacity-[0.82]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130d] via-[#07130d]/44 to-transparent" />
            <div className="absolute left-1/2 top-3 h-7 w-28 -translate-x-1/2 rounded-full bg-black/60" />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.8rem] border border-white/[0.12] bg-white/[0.12] p-5 text-white backdrop-blur-2xl">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs uppercase tracking-[0.18em] text-white/50">AI Plant Doctor</p><h2 className="mt-2 text-2xl font-semibold">Areca Palm scan</h2></div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-botanical-lime text-[#07130d]"><Bot className="h-5 w-5" aria-hidden /></span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3"><Score label="Health" value="92" /><Score label="Recovery" value="7d" /></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.15]"><div className="h-full w-[92%] rounded-full bg-botanical-lime shadow-[0_0_30px_rgba(183,230,110,0.6)]" /></div>
              <div className="mt-4 space-y-2">
                {featureCards.map(([label, value, Icon]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
                    <span className="flex items-center gap-2 text-xs text-white/70"><Icon className="h-3.5 w-3.5 text-botanical-lime" aria-hidden />{label}</span>
                    <span className="text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FloatingMiniCard({ className, label, value }: { className: string; label: string; value: string }) {
  return <div className={`absolute rounded-3xl p-4 text-white ${darkPanel} ${className}`}><p className="text-xs uppercase tracking-[0.18em] text-white/[0.55]">{label}</p><p className="mt-2 text-3xl font-semibold text-botanical-lime">{value}</p></div>;
}

function ThemeSwitch() {
  return (
    <label htmlFor="gl-theme" className="fixed left-4 top-24 z-50 hidden cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/70 px-3 py-2 text-xs font-semibold text-botanical-black shadow-glMd backdrop-blur-xl lg:flex">
      <Sun className="h-4 w-4" aria-hidden /><span>Luxury mode</span><Moon className="h-4 w-4" aria-hidden />
    </label>
  );
}

function SignatureStrip() {
  const items = [["India First", "AI powered digital garden membership"], ["Green Promise", "maintenance and replacement clarity"], ["QR Passport", "every plant has a living record"], ["Premium Ops", "visits, reports and dashboards"]];
  return <section id="garden-live-v4" className="gl-reveal relative z-10 -mt-16"><div className={`gl-container grid gap-4 rounded-[2rem] p-4 sm:grid-cols-2 lg:grid-cols-4 ${glassPanel}`}>{items.map(([title, detail]) => <div key={title} className="rounded-[1.5rem] bg-white/[0.78] p-5 transition hover:-translate-y-1 hover:shadow-glMd"><p className="text-lg font-semibold">{title}</p><p className="mt-2 text-sm leading-6 text-neutral-slate">{detail}</p></div>)}</div></section>;
}

function ExperienceGrid() {
  return <section id="premium-services" className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Premium Services" title="A luxury product layer for every Garden Live promise." description="Landscape design, nursery supply, rooftops, villa gardens, AI diagnosis, QR passport and store workflows now feel like one premium technology platform." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map(([title, href, Icon, image, description]) => <Link key={href} href={href} className={`group overflow-hidden rounded-[2rem] ${glassPanel} transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(16,67,38,0.18)]`}><div className="relative h-64"><Image src={image} alt={`${title} by Garden Live`} fill sizes="(min-width: 1280px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-botanical-black/68 via-botanical-black/10 to-transparent" /><Icon className="absolute bottom-5 left-5 h-7 w-7 text-white" aria-hidden /></div><div className="p-6"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-neutral-slate">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span></div></Link>)}</div></div></section>;
}

function FlagshipModules() {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="International SaaS Experience" title="Everything reads like a technology platform, not a vendor brochure." description="AI care, scanner flows, QR records, memberships, projects, store and dashboards are presented as one calm operating system." /><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{modules.map(([title, detail, Icon], index) => <div key={title} className={`group rounded-[2rem] p-6 ${glassPanel} transition hover:-translate-y-2`}><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-botanical-mint text-botanical-green"><Icon className="h-5 w-5" aria-hidden /></span><span className="text-xs font-semibold text-neutral-stone">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-neutral-slate">{detail}</p></div>)}</div></div></section>;
}

function MembershipShowcase() {
  const plans = [["Plant Care", "Rs. 299/month", "Balcony and indoor plant care"], ["Smart Garden", "Rs. 999/month", "Smart reminders and plant records"], ["Home Garden", "Rs. 3,999/month", "Visits, reports and Green Promise"], ["Premium Garden", "Rs. 7,999/month", "Priority care for larger homes"], ["Luxury Garden", "Rs. 14,999/month", "High-touch care for villas and estates"]];
  return <section className="gl-reveal bg-white/[0.55] py-24 backdrop-blur"><div className="gl-container"><SectionHeading eyebrow="Modern Membership Pricing" title="Premium plans shaped like a SaaS subscription." description="Each plan connects visits, digital records, AI recommendations, plant replacement eligibility and rewards." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{plans.map(([name, price, detail], index) => <Link href="/membership-plans" key={name} className={`group rounded-[2rem] border p-6 shadow-[0_18px_70px_rgba(16,67,38,0.09)] transition hover:-translate-y-2 ${index === 3 ? "border-botanical-green bg-gradient-to-br from-botanical-mint via-white to-white" : "border-white/80 bg-white/[0.76] backdrop-blur-xl"}`}><Badge tone={index === 3 ? "success" : "info"}>{index === 3 ? "Popular" : "Garden Live"}</Badge><h3 className="mt-5 text-2xl font-semibold">{name}</h3><p className="mt-3 text-3xl font-semibold">{price}</p><p className="mt-3 min-h-12 text-sm leading-6 text-neutral-slate">{detail}</p>{["AI care insights", "Digital visit record", "Green Promise review"].map((item) => <p key={item} className="mt-3 flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-4 w-4 text-botanical-green" aria-hidden />{item}</p>)}<span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Compare plan <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span></Link>)}</div></div></section>;
}

function HomepageStats() {
  const stats = [["360", "digital garden record"], ["0-100", "Garden Health Score"], ["24h", "visit visibility"], ["AI", "Plant Doctor ready"]];
  return <section className="gl-reveal py-24"><div className="gl-container"><div className="relative overflow-hidden rounded-[2.5rem] bg-[#07130d] p-6 text-white shadow-[0_34px_120px_rgba(7,19,13,0.28)] sm:p-8 lg:p-12"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(183,230,110,0.22),transparent_30%),radial-gradient(circle_at_85%_60%,rgba(255,255,255,0.14),transparent_28%)]" /><div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"><div><Badge tone="premium" className="bg-white/[0.15] text-white">Premium Statistics</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Garden intelligence that looks calm, but works hard.</h2><p className="mt-5 text-base leading-8 text-white/[0.68]">Memberships, AI reports, plant passports, visits and rewards are presented with clear operational signals.</p></div><div className="grid gap-4 sm:grid-cols-2">{stats.map(([value, label]) => <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.15]"><p className="gl-count text-5xl font-semibold text-botanical-lime">{value}</p><p className="mt-3 text-sm font-medium text-white/[0.68]">{label}</p></div>)}</div></div></div></div></section>;
}

function AiDoctorDemo() {
  const timeline = ["Photo uploaded", "Leaf scan complete", "Disease risk: mild fungal stress", "Treatment plan ready"];
  return <section className="gl-reveal py-24"><div className="gl-container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"><div className={`rounded-[2rem] p-5 ${glassPanel}`}><div className="rounded-[1.5rem] border border-dashed border-botanical-green/30 bg-botanical-mint/50 p-7 text-center"><UploadCloud className="mx-auto h-10 w-10 text-botanical-green" aria-hidden /><p className="mt-4 text-lg font-semibold">Upload plant photo</p><p className="mt-2 text-sm text-neutral-slate">Premium frontend AI demo. Existing AI APIs and backend remain untouched.</p></div><div className="mt-5 grid gap-4 sm:grid-cols-[0.85fr_1.15fr]"><div className="relative min-h-80 overflow-hidden rounded-[1.5rem]"><Image src={img.ai} alt="AI Plant Doctor plant scan preview" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /><div className="absolute inset-6 rounded-[1.25rem] border border-botanical-lime/70 shadow-[0_0_42px_rgba(183,230,110,0.44)]" /><div className="gl-scan-line absolute left-6 right-6 top-8 h-0.5 bg-botanical-lime" /></div><div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white"><p className="text-sm text-white/60">AI Plant Doctor diagnosis</p><div className="mt-4 grid grid-cols-2 gap-3"><Score label="Health" value="92" /><Score label="Confidence" value="94%" /></div><div className="mt-4 rounded-2xl bg-white/10 p-4"><p className="flex items-center gap-2 text-sm font-semibold"><Activity className="h-4 w-4 text-botanical-lime" aria-hidden />Mild fungal stress detected</p><p className="mt-2 text-xs leading-5 text-white/60">Recommended: prune affected leaves, reduce overhead watering and apply copper-based treatment after expert review.</p></div><div className="mt-4 space-y-2">{timeline.map((item) => <p key={item} className="flex items-center gap-2 text-xs text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-botanical-lime" />{item}</p>)}</div><Button asChild size="sm" className="mt-5 w-full rounded-full bg-white text-botanical-green hover:bg-white/90" leftIcon={<Download className="h-4 w-4" aria-hidden />}><Link href="/ai-plant-doctor">Download report preview</Link></Button></div></div></div><div><SectionHeading eyebrow="AI Plant Doctor" title="A premium diagnostic moment for plant owners." description="Upload, scan animation, disease detection, confidence score, health score, treatment recommendation, timeline and report preview in one elegant experience." /><ContentGrid sections={[{ title: "Scan", description: "Camera and upload-ready interface with graceful loading states.", points: ["Photo preview", "Scan animation", "Accessible controls"] }, { title: "Diagnose", description: "Disease, pest, water and fertilizer recommendation surfaces.", points: ["Confidence score", "Health score", "Treatment plan"] }, { title: "Remember", description: "Diagnosis connects naturally to QR Passport and plant history.", points: ["Timeline", "Reports", "Warranty context"] }]} /></div></div></section>;
}

function Score({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">{label}</p><p className="mt-2 text-4xl font-semibold text-botanical-lime">{value}</p></div>;
}

function PassportPreview() {
  const details = ["Warranty active", "Growth update due in 7 days", "Last AI report: healthy", "Replacement status: eligible review"];
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><Badge tone="premium">QR Plant Passport</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Every plant gets a luxury digital identity.</h2><p className="mt-5 text-base leading-8 text-neutral-slate">Plant details, warranty, Green Promise status, care timeline, growth history, AI diagnosis and replacement eligibility in one scannable profile.</p></div><div className={`rounded-[2rem] p-5 ${glassPanel}`}><div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]"><div className="relative min-h-80 overflow-hidden rounded-[1.5rem]"><Image src={img.passport} alt="QR Plant Passport premium plant profile" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div><div className="rounded-[1.5rem] bg-[#07130d] p-5 text-white"><QrCode className="h-12 w-12 text-botanical-lime" aria-hidden /><p className="mt-5 text-2xl font-semibold">Monstera Deliciosa</p><p className="mt-2 text-sm text-white/[0.65]">Passport ID GL-PLANT-0924</p>{details.map((item) => <p key={item} className="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">{item}</p>)}</div></div></div></div></section>;
}

function SmartGardenIot() {
  return <section className="gl-reveal bg-[#07130d] py-24 text-white"><div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Badge tone="premium" className="bg-white/[0.15] text-white">Smart Garden IoT</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Future-ready for sensors, weather, irrigation and intelligent reminders.</h2><p className="mt-5 text-base leading-8 text-white/70">Designed for smart kits, care alerts, city-scale maintenance and connected garden devices while the backend remains stable.</p></div><div className="grid gap-4 sm:grid-cols-2">{iotSignals.map(([item, Icon]) => <div key={item} className={`rounded-[2rem] p-6 text-white ${darkPanel} transition hover:-translate-y-1 hover:bg-white/[0.15]`}><Icon className="h-5 w-5 text-botanical-lime" aria-hidden /><p className="mt-5 text-xl font-semibold">{item}</p><p className="mt-3 text-sm leading-6 text-white/[0.65]">Smart signals for reminders, reports and field-team decisions.</p></div>)}</div></div></section>;
}

export function BeforeAfter() {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><Badge tone="success">Before / After</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Transformation proof designed for premium landscaping.</h2><p className="mt-5 text-base leading-8 text-neutral-slate">Hover the visual divider across unmanaged spaces and finished Garden Live landscapes.</p></div><div className="group relative h-[520px] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_30px_100px_rgba(16,67,38,0.16)]"><Image src={img.before} alt="Before Garden Live landscaping" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover grayscale" /><div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden transition-all duration-700 group-hover:w-[82%]"><Image src={img.after} alt="After Garden Live luxury landscaping" fill sizes="(min-width: 1024px) 60vw, 100vw" className="max-w-none object-cover" /></div><div className="absolute inset-y-8 left-[58%] w-1 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:left-[82%]" /><div className="absolute bottom-5 left-5 rounded-full bg-white/[0.84] px-4 py-2 text-sm font-semibold backdrop-blur-xl">Before</div><div className="absolute bottom-5 right-5 rounded-full bg-botanical-green/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">After Garden Live</div></div></div></section>;
}

function BlogPreview() {
  const posts = [["How digital garden memberships change home maintenance", "Memberships make visits, plant health, rewards and reports easy to understand.", img.home], ["AI Plant Doctor: what a healthy scan should show", "Disease, pest, water and fertilizer signals can become a practical care timeline.", img.ai], ["Designing premium rooftop gardens for Indian homes", "Layered planting, irrigation readiness and service reporting create long-term value.", img.rooftop]];
  return <section className="gl-reveal py-24"><div className="gl-container"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><SectionHeading eyebrow="Blog" title="Thought leadership for luxury gardens and AI plant care." description="Editorial previews for memberships, plant intelligence, landscaping, smart devices and premium garden operations." /><Button asChild variant="secondary" className="rounded-full"><Link href="/blog">Read Garden Live Blog</Link></Button></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{posts.map(([title, description, image]) => <Link href="/blog" key={title} className={`group overflow-hidden rounded-[2rem] ${glassPanel} transition hover:-translate-y-2`}><div className="relative h-64"><Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#07130d]/68 to-transparent" /><Badge tone="premium" className="absolute left-5 top-5 bg-white/[0.88]">Garden Live Journal</Badge></div><div className="p-6"><h3 className="text-2xl font-semibold leading-tight">{title}</h3><p className="mt-4 text-sm leading-7 text-neutral-slate">{description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Open article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden /></span></div></Link>)}</div></div></section>;
}

export function ProjectGallery() {
  const gallery = [["Luxury Villa", img.villa], ["Modern Home", img.home2], ["Farmhouse", img.farm], ["Hotel Garden", img.hotel], ["Resort Landscape", img.resort], ["Corporate Campus", img.campus], ["Rooftop Garden", img.rooftop], ["Night Lighting", img.night], ["Indoor Luxury Plants", img.indoor]];
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Featured Projects" title="Premium landscapes, plants and places that feel real." description="Luxury villas, modern homes, farmhouses, hotels, resorts, corporate campuses, rooftops, nurseries, night lighting and indoor plant imagery." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gallery.map(([title, image], index) => <div key={title} className={`group overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_80px_rgba(16,67,38,0.10)] ${index === 0 ? "lg:col-span-2" : ""}`}><div className="relative h-80"><Image src={image} alt={`${title} by Garden Live`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-botanical-black/62 to-transparent" /><h2 className="absolute bottom-5 left-5 text-2xl font-semibold text-white">{title}</h2></div></div>)}</div></div></section>;
}

export function DashboardPreview() {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Dashboard Previews" title="Real SaaS dashboards behind a premium public product." description="Preview charts, garden health, calendar, revenue, visits, notifications, tasks, weather and AI reports." /><div className="mt-12 grid gap-5 lg:grid-cols-4">{dashboardRows.map(([title, href, Icon, detail], index) => { const alerts: Array<[LucideIcon, string]> = [[Bell, "2 notifications"], [CheckCircle2, "5 tasks due"], [CircleDollarSign, index === 3 ? "Revenue live" : "Plan active"]]; return <Link key={title} href={href} className={`group rounded-[2rem] p-4 ${glassPanel} transition hover:-translate-y-2`}><div className="rounded-[1.5rem] bg-[#07130d] p-4 text-white"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-botanical-lime" aria-hidden /><span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/[0.55]">Live</span></div><p className="mt-4 text-xl font-semibold">{title}</p><div className="mt-4 grid grid-cols-2 gap-2"><MetricTile icon={Gauge} label="Health" value={`${96 - index * 3}`} /><MetricTile icon={CalendarCheck} label="Visits" value={`${18 + index}`} /><MetricTile icon={CloudSun} label="Weather" value="29C" /><MetricTile icon={Bot} label="AI" value={`${8 + index}`} /></div><div className="mt-4 rounded-2xl bg-white/10 p-3"><div className="flex h-20 items-end gap-1.5">{[42, 70, 56, 82, 64, 92, 74].map((height, barIndex) => <span key={barIndex} className="flex-1 rounded-t-md bg-botanical-lime/80" style={{ height: `${height - index * 4}%` }} />)}</div></div><div className="mt-3 grid gap-2">{alerts.map(([SmallIcon, label]) => <p key={label} className="flex items-center gap-2 rounded-xl bg-white/[0.08] px-3 py-2 text-xs text-white/70"><SmallIcon className="h-3.5 w-3.5 text-botanical-lime" aria-hidden />{label}</p>)}</div></div><p className="mt-5 text-sm leading-6 text-neutral-slate">{detail}</p></Link>; })}</div></div></section>;
}

function MetricTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="rounded-xl bg-white/10 p-3"><Icon className="h-3.5 w-3.5 text-botanical-lime" aria-hidden /><p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>;
}

export function Stats({ stats }: { stats: PageConfig["stats"] }) {
  return <section className="gl-reveal relative z-10 -mt-12"><div className={`gl-container grid gap-4 rounded-[2rem] p-4 sm:grid-cols-3 ${glassPanel}`}>{stats.map((stat) => <div key={stat.label} className="rounded-[1.5rem] bg-white/[0.78] p-6"><p className="gl-count text-5xl font-semibold text-botanical-green">{stat.value}</p><p className="mt-2 text-sm font-medium text-neutral-slate">{stat.label}</p></div>)}</div></section>;
}

export function HighlightGrid({ highlights }: { highlights: string[] }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Complete Capability" title="Designed for premium service and operational clarity." description="Every module supports forms, records, media, reports, permissions, notifications, analytics and visibility." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{highlights.map((highlight) => <div key={highlight} className={`rounded-[1.5rem] p-5 ${glassPanel} transition hover:-translate-y-1`}><CheckCircle2 className="h-5 w-5 text-botanical-green" aria-hidden /><p className="mt-4 text-sm font-semibold leading-6">{highlight}</p></div>)}</div></div></section>;
}

export function ContentGrid({ sections = baseSections }: { sections?: PageConfig["sections"] }) {
  return <section className="gl-reveal py-10"><div className="grid gap-5 lg:grid-cols-3">{sections.map((section) => <div key={section.title} className={`rounded-[2rem] p-6 ${glassPanel} transition hover:-translate-y-1`}><h2 className="text-2xl font-semibold">{section.title}</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">{section.description}</p><ul className="mt-6 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />{point}</li>)}</ul></div>)}</div></section>;
}

export function Process({ steps }: { steps: string[] }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Process" title="Smooth from first enquiry to living garden record." description="Garden Live turns service work into a structured customer journey with clear next steps and digital visibility." /><div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{steps.map((step, index) => <div key={step} className={`rounded-[1.5rem] p-5 ${glassPanel} transition hover:-translate-y-1`}><span className="text-sm font-semibold text-botanical-green">{String(index + 1).padStart(2, "0")}</span><p className="mt-4 text-sm font-semibold">{step}</p></div>)}</div></div></section>;
}

function ReviewCard({ quote, name, role, image }: { quote: string; name: string; role: string; image: string }) {
  return <div className={`rounded-[2rem] p-6 ${glassPanel} transition hover:-translate-y-1`}><div className="flex items-center gap-4"><Image src={image} alt={`${name}, Garden Live customer`} width={56} height={56} className="h-14 w-14 rounded-full object-cover" /><div><p className="font-semibold">{name}</p><p className="text-sm text-neutral-slate">{role}</p></div></div><div className="mt-5 flex gap-1 text-[#d6a73a]" aria-hidden>{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 text-sm leading-7 text-neutral-slate">&ldquo;{quote}&rdquo;</p></div>;
}

export function TestimonialsBlock({ compact = false }: { compact?: boolean }) {
  return <section className="gl-reveal py-24"><div className="gl-container"><SectionHeading eyebrow="Customer Reviews" title="Premium greenery without operational chaos." description="Customers choose Garden Live for beauty, accountability, visibility and a care system they can understand." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <ReviewCard key={item.name} {...item} />)}</div>{!compact ? <EnquirySection title="Experience Garden Live care" description="Book a visit and see how a premium digital garden membership changes everyday greenery." /> : null}</div></section>;
}

export function FaqSection() {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="FAQ" title="Everything before your garden goes live." description="Clear answers on memberships, surveys, AI Plant Doctor, Green Promise and QR Plant Passport." /><FAQAccordion items={faqs} className="border-white/80 bg-white/[0.78] shadow-[0_20px_70px_rgba(16,67,38,0.08)] backdrop-blur-xl" /></div></section>;
}

export function EnquirySection({ title, description }: { title: string; description: string }) {
  return <section className="gl-reveal py-24"><div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><div><Badge tone="success">Contact</Badge><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">{title}</h2><p className="mt-5 text-base leading-8 text-neutral-slate">{description}</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Free garden survey", "WhatsApp response", "Digital visit record", "Premium service reports"].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-accent-marigold" aria-hidden />{item}</div>)}</div></div><EnquiryForm /></div></section>;
}

export function ContactCards() {
  return <div className="grid gap-4 sm:grid-cols-2">{contactCards.map(([title, detail, Icon]) => <div key={title} className={`rounded-[2rem] p-6 ${glassPanel}`}><Icon className="h-5 w-5 text-botanical-green" aria-hidden /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm text-neutral-slate">{detail}</p></div>)}</div>;
}

export function MapSection() {
  return <section className="gl-reveal pb-24"><div className="gl-container"><div className={`overflow-hidden rounded-[2rem] ${glassPanel}`}><div className="grid lg:grid-cols-[0.8fr_1.2fr]"><div className="p-8"><Badge tone="info">Google Maps</Badge><h2 className="mt-5 text-3xl font-semibold">Garden Live service desk</h2><p className="mt-4 text-sm leading-7 text-neutral-slate">Use this location section for customer visits, survey routing, city onboarding, franchise operations and corporate project coordination.</p><p className="mt-5 flex items-center gap-2 text-sm font-semibold text-botanical-green"><MapPin className="h-4 w-4" aria-hidden />Hyderabad, India</p></div><iframe title="Garden Live Google Maps location" className="h-96 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Hyderabad%2C%20India&output=embed" /></div></div></div></section>;
}

function FloatingActions() {
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"><Link aria-label="Open Garden Live AI assistant" href="/ai-plant-doctor" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#07130d] text-botanical-lime shadow-[0_18px_60px_rgba(16,67,38,0.28)]"><Bot className="h-5 w-5" aria-hidden /></Link><Link aria-label="Chat with Garden Live on WhatsApp" href={whatsappHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_60px_rgba(16,67,38,0.22)]"><MessageCircle className="h-5 w-5" aria-hidden /></Link><Link aria-label="Call Garden Live" href={callHref} className="flex h-12 w-12 items-center justify-center rounded-full bg-botanical-green text-white shadow-[0_18px_60px_rgba(16,67,38,0.22)]"><Phone className="h-5 w-5" aria-hidden /></Link></div>;
}
