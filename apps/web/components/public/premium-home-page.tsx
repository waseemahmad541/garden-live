import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Camera,
  ChevronRight,
  Flower2,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  TreePine,
  Users,
  Wrench
} from "lucide-react";
import { Button, FAQAccordion, Footer, Navbar } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";

const brandLine = "Garden Live - India's First AI Powered Digital Garden Membership Platform";
const heroImage = "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=2200&q=88";

const navItems = [
  { label: "AI Doctor", href: "#ai-plant-doctor" },
  { label: "Membership", href: "#membership" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "AI Plant Doctor", href: "/ai-plant-doctor" },
      { label: "Plant Scanner", href: "/plant-scanner" },
      { label: "QR Plant Passport", href: "/qr-plant-passport" },
      { label: "Customer Dashboard", href: "/customer/dashboard" }
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
    title: "Membership",
    links: [
      { label: "Plant Care", href: "/membership-plans" },
      { label: "Smart Garden", href: "/membership-plans" },
      { label: "Luxury Garden", href: "/membership-plans" },
      { label: "Green Promise", href: "/membership-plans" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Garden Store", href: "/garden-store" },
      { label: "Corporate Solutions", href: "/corporate-solutions" },
      { label: "Book Garden Visit", href: "/book-garden-visit" }
    ]
  }
];

const services = [
  {
    title: "Landscape Design",
    text: "Premium concepts, plant palettes, materials, irrigation planning, quotation, approval, and execution tracking.",
    icon: TreePine,
    href: "/landscaping"
  },
  {
    title: "Plant Nursery",
    text: "Indoor plants, outdoor plants, palm collection, fruit plants, timber plants, shrubs, creepers, and flowers.",
    icon: Sprout,
    href: "/plant-nursery"
  },
  {
    title: "Garden Maintenance",
    text: "Scheduled visits, service reports, before-after photos, garden health scores, and supervisor reviews.",
    icon: Wrench,
    href: "/garden-maintenance"
  },
  {
    title: "Dedicated Gardener",
    text: "High-touch gardener allocation with attendance, daily task plans, supervisor control, and monthly reporting.",
    icon: Users,
    href: "/dedicated-gardener"
  },
  {
    title: "Garden Store",
    text: "Plants, pots, tools, fertilizers, plant medicines, seeds, smart kits, irrigation, and garden furniture.",
    icon: ShoppingBag,
    href: "/garden-store"
  },
  {
    title: "Corporate Greenery",
    text: "Office plants, vertical gardens, AMC maintenance, campus landscaping, tenders, work orders, and analytics.",
    icon: Flower2,
    href: "/corporate-solutions"
  }
];

const plans = [
  { name: "Plant Care", price: "Rs. 299", fit: "For indoor plant owners", benefit: "AI guidance, reminders, and care records" },
  { name: "Smart Garden", price: "Rs. 999", fit: "For compact balconies", benefit: "Digital garden tracking and care support" },
  { name: "Home Garden", price: "Rs. 3,999", fit: "For homes and terraces", benefit: "Scheduled visits, reports, and Green Promise review" },
  { name: "Luxury Garden", price: "Rs. 14,999", fit: "For premium properties", benefit: "Priority care, supervisor reviews, and health analytics" }
];

const projects = [
  {
    title: "Luxury Terrace Garden",
    before: "Bare terrace with heat exposure",
    after: "Layered green lounge with planters, irrigation, and maintenance plan",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=86"
  },
  {
    title: "Villa Landscape Renewal",
    before: "Unstructured lawn and mixed plant health",
    after: "Designed entry garden with palms, flowering borders, and QR-tagged plants",
    image: "https://images.unsplash.com/photo-1558521958-0a228e77d984?auto=format&fit=crop&w=1400&q=86"
  },
  {
    title: "Corporate Green Wall",
    before: "Plain office frontage",
    after: "Vertical garden with AMC workflow, visit reports, and supervisor reviews",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=86"
  }
];

const testimonials = [
  {
    quote: "Garden Live turned our terrace into a managed green space. The before-after photos and health score make every visit transparent.",
    name: "Ananya R.",
    role: "Home Garden member"
  },
  {
    quote: "The landscaping process felt premium from the first survey. Design, quotation, execution, and maintenance handover were clear.",
    name: "Rahul M.",
    role: "Villa landscaping client"
  },
  {
    quote: "AI Plant Doctor caught a pest issue early, and the QR passport now keeps the entire treatment history in one place.",
    name: "Meera S.",
    role: "Smart Garden member"
  }
];

const faqs = [
  {
    question: "What makes Garden Live different?",
    answer: "Garden Live combines premium garden services with AI Plant Doctor, Plant Scanner, QR Plant Passport, memberships, Green Promise, rewards, service reports, and customer dashboards in one operating platform."
  },
  {
    question: "Can Garden Live manage an existing garden?",
    answer: "Yes. Garden Live supports existing gardens through scheduled maintenance visits, plant health scoring, before-after photos, visit history, AI insights, and supervisor-reviewed service reports."
  },
  {
    question: "What is the Garden Live Green Promise?",
    answer: "The Green Promise defines eligible plant replacement, maintenance responsibility, warranty rules, claim review, and replacement status for qualifying plants and membership plans."
  },
  {
    question: "Does Garden Live work for corporate sites?",
    answer: "Yes. Corporate solutions include office plants, vertical gardens, AMC maintenance, campus landscaping, tender records, work orders, project documents, and reporting."
  }
];

const stats = [
  { value: "0-100", label: "Garden health score" },
  { value: "6", label: "Membership plans" },
  { value: "16+", label: "Plant categories" },
  { value: "360", label: "Project visibility" }
];

const passportFeatures: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: QrCode, title: "QR Plant Passport", text: "Plant details, care timeline, warranty, and growth history." },
  { icon: Camera, title: "Plant Scanner", text: "Mobile-first scanning for plant lookup and care updates." },
  { icon: ShieldCheck, title: "Green Promise", text: "Eligible replacement, warranty rules, and maintenance responsibility." }
];

export function PremiumHomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6faf5] text-[#0d1a12]">
      <Navbar
        items={navItems}
        ctaLabel="Book Free Survey"
        ctaHref="/book-garden-visit"
        className="border-white/30 bg-white/70 shadow-[0_10px_40px_rgba(10,40,22,0.08)] backdrop-blur-2xl"
      />

      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
        <Image
          src={heroImage}
          alt="Luxury Garden Live landscape with premium plants and manicured garden design"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,22,12,0.86),rgba(12,46,27,0.54),rgba(246,250,245,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f6faf5] to-transparent" />
        <div className="gl-container relative flex min-h-[calc(100svh-4rem)] items-center py-16">
          <div className="max-w-4xl text-white">
            <div className="gl-rise inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-semibold uppercase backdrop-blur-xl">
              <Sparkles className="h-4 w-4" aria-hidden />
              {brandLine}
            </div>
            <h1 className="gl-rise gl-delay-1 mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-8xl">
              Your living garden, managed like a luxury membership.
            </h1>
            <p className="gl-rise gl-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Garden Live brings landscaping, plant nursery, maintenance, dedicated gardeners, AI Plant Doctor,
              Plant Scanner, QR Plant Passport, Green Promise, and Garden Store into one premium digital platform.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 rounded-full bg-white px-6 text-botanical-green hover:bg-white/90">
                <Link href="/book-garden-visit">
                  Book Free Garden Survey <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="h-12 rounded-full border-white/25 bg-white/12 px-6 text-white backdrop-blur-xl hover:bg-white/20">
                <Link href="/membership-plans">Explore Memberships</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-14 relative z-10">
        <div className="gl-container">
          <div className="grid gap-3 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_30px_100px_rgba(15,70,39,0.16)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] bg-white/76 p-5">
                <p className="text-3xl font-semibold text-botanical-green">{item.value}</p>
                <p className="mt-2 text-sm font-medium text-neutral-slate">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionIntro
        id="ai-plant-doctor"
        eyebrow="AI Plant Doctor"
        title="Plant healthcare, rebuilt for the camera-first generation."
        text="Upload a plant photo and create a guided diagnosis journey for disease detection, pest detection, water schedule, fertilizer recommendation, medicine recommendation, treatment timeline, and expert consultation."
      />
      <section className="pb-20">
        <div className="gl-container grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <GlassPanel className="relative min-h-[420px] overflow-hidden p-0">
            <Image
              src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1600&q=86"
              alt="Plant leaf diagnosis preview for Garden Live AI Plant Doctor"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082414]/85 via-[#082414]/18 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.75rem] border border-white/25 bg-white/15 p-5 text-white backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/70">Live plant health score</p>
                  <p className="mt-1 text-5xl font-semibold">86</p>
                </div>
                <div className="rounded-full bg-emerald-300/20 px-4 py-2 text-sm font-semibold text-emerald-100">
                  Recoverable
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-200 to-lime-200" />
              </div>
            </div>
          </GlassPanel>
          <div className="grid gap-4">
            {[
              ["Disease and pest detection", "Photo-based diagnosis flow for leaf spots, pest stress, severity, and confidence scoring."],
              ["Treatment timeline", "Water schedule, fertilizer guidance, medicine recommendation, and practical next steps."],
              ["Expert consultation", "Escalate from AI diagnosis to Garden Live plant experts and service booking."]
            ].map(([title, text]) => (
              <GlassPanel key={title} className="p-6">
                <Bot className="h-6 w-6 text-botanical-green" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">{text}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <SectionIntro
        id="membership"
        eyebrow="Membership plans"
        title="A digital garden membership for every kind of green space."
        text="Choose Plant Care, Smart Garden, Home Garden, Premium Garden, Luxury Garden, or Dedicated Gardener plans with clear visit frequency, Green Promise rules, rewards, and renewal workflows."
      />
      <section className="pb-20">
        <div className="gl-container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <GlassPanel key={plan.name} className="p-6">
              {index === 2 ? (
                <span className="inline-flex rounded-full bg-botanical-green px-3 py-1 text-xs font-semibold text-white">
                  Recommended
                </span>
              ) : null}
              <h3 className="mt-5 text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-3 text-4xl font-semibold text-botanical-green">{plan.price}</p>
              <p className="text-sm text-neutral-slate">per month</p>
              <p className="mt-5 text-sm font-semibold">{plan.fit}</p>
              <p className="mt-3 min-h-16 text-sm leading-6 text-neutral-slate">{plan.benefit}</p>
              <Button className="mt-6 w-full rounded-full" asChild>
                <Link href="/membership-plans">View plan</Link>
              </Button>
            </GlassPanel>
          ))}
        </div>
      </section>

      <SectionIntro
        id="services"
        eyebrow="Premium services"
        title="Everything your garden needs, connected to one operating system."
        text="From nursery supply to landscape execution and daily maintenance, Garden Live brings field work, customer communication, plant records, and reporting together."
      />
      <section className="pb-20">
        <div className="gl-container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="group rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f5eb] text-botanical-green">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">{service.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">
                  Explore <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <SectionIntro
        id="projects"
        eyebrow="Before and after projects"
        title="Visible transformations with timelines, photos, and supervisor review."
        text="Garden Live turns each project into a transparent record with survey details, design direction, execution updates, before-after media, and maintenance handover."
      />
      <section className="pb-20">
        <div className="gl-container grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <GlassPanel key={project.title} className="overflow-hidden p-0">
              <div className="relative aspect-[4/3]">
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="mt-5 grid gap-3 text-sm">
                  <ProjectRow label="Before" text={project.before} />
                  <ProjectRow label="After" text={project.after} />
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="gl-container grid gap-5 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-botanical-green">Customer love</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              A premium care experience customers can actually see.
            </h2>
          </div>
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <GlassPanel key={item.name} className="p-6">
                <div className="flex gap-1 text-[#d6a73a]" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-base leading-7 text-[#243227]">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-5 font-semibold">{item.name}</p>
                <p className="text-sm text-neutral-slate">{item.role}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2213] py-20 text-white">
        <div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-200">Garden intelligence</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Scan plants. Track visits. Protect eligible greenery.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              QR Plant Passport stores plant details, care timeline, warranty, growth history, diagnosis records, and
              replacement status so every plant has a living digital identity.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {passportFeatures.map(({ icon: CardIcon, title, text }) => {
              return (
                <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <CardIcon className="h-6 w-6 text-emerald-200" aria-hidden />
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionIntro
        eyebrow="Questions"
        title="Clear answers before your first garden visit."
        text="Everything starts with a survey, the right service recommendation, and a care plan built around your space."
      />
      <section className="pb-20">
        <div className="gl-container">
          <FAQAccordion items={faqs} className="border-white/80 bg-white/78 shadow-[0_20px_70px_rgba(16,67,38,0.08)] backdrop-blur-xl" />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-botanical-green">Contact Garden Live</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Book a garden survey and get the right membership recommendation.
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-slate">
              Share your garden type, city, plant condition, and service need. Garden Live can recommend maintenance,
              landscaping, nursery supply, dedicated gardener, AI diagnosis, or corporate greenery.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#183b25]">
              <ContactLine icon={Phone} label="Call support" value="+91 99999 99999" href="tel:+919999999999" />
              <ContactLine icon={MessageCircle} label="WhatsApp" value="Start a Garden Live enquiry" href="https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit" />
              <ContactLine icon={MapPin} label="Service area" value="India, multi-city ready" />
            </div>
          </div>
          <EnquiryForm booking />
        </div>
      </section>

      <section className="pb-20">
        <div className="gl-container">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0a2213] p-8 text-white shadow-[0_30px_100px_rgba(10,34,19,0.28)] sm:p-10 lg:p-14">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(104,211,145,0.22),transparent_55%)] lg:block" />
            <div className="relative max-w-2xl">
              <BadgeCheck className="h-9 w-9 text-emerald-200" aria-hidden />
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                The next era of gardens is digital, beautiful, and cared for.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Start with a free survey, activate the right plan, and watch your garden become a managed living asset.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-white text-botanical-green hover:bg-white/90">
                  <Link href="/book-garden-visit">Book Free Survey</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15">
                  <Link href="/ai-plant-doctor">Try AI Plant Doctor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer groups={footerGroups} />
    </main>
  );
}

function SectionIntro({ id, eyebrow, title, text }: { id?: string; eyebrow: string; title: string; text: string }) {
  return (
    <section id={id} className="pt-24 pb-10">
      <div className="gl-container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-botanical-green">{eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#0d1a12] sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-neutral-slate">{text}</p>
        </div>
      </div>
    </section>
  );
}

function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/80 bg-white/70 shadow-[0_20px_70px_rgba(16,67,38,0.09)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function ProjectRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-[#f3f8f2] p-4">
      <p className="text-xs font-semibold uppercase text-botanical-green">{label}</p>
      <p className="mt-2 leading-6 text-neutral-slate">{text}</p>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur-xl">
      <Icon className="h-5 w-5 text-botanical-green" aria-hidden />
      <span>
        <span className="block text-xs uppercase text-neutral-slate">{label}</span>
        <span className="mt-1 block">{value}</span>
      </span>
    </span>
  );

  return href ? (
    <Link href={href} className="transition hover:-translate-y-0.5">
      {content}
    </Link>
  ) : (
    content
  );
}
