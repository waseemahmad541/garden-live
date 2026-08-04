import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Download,
  Gauge,
  HeartPulse,
  Leaf,
  MessageCircle,
  ScanSearch,
  ShoppingBag,
  Sparkles,
  Star
} from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components";
import { RecommendedProductsPreview } from "@/components/public/recommended-products-preview";
import { EnquirySection, FaqSection, PublicChrome } from "@/components/public/v4-public-sections";
import { brandLine, callHref, img, whatsappHref } from "@/components/public/v4-public-data";

const instantActions = [
  { label: "Scan a plant", href: "/ai-plant-doctor", icon: ScanSearch },
  { label: "Buy plants", href: "/garden-store", icon: Leaf },
  { label: "Buy treatments", href: "/garden-store", icon: HeartPulse },
  { label: "Join membership", href: "/membership-plans", icon: Star },
  { label: "Book services", href: "/book-garden-visit", icon: CalendarCheck }
] as const;

const memberships = [
  {
    name: "Plant Care",
    price: "Rs. 199",
    summary: "Starter care for indoor plants, reminders and AI diagnosis.",
    features: ["AI Plant Doctor", "Water reminders", "Care tips"]
  },
  {
    name: "Smart Garden",
    price: "Rs. 599",
    summary: "Digital garden care with QR passports and monthly guidance.",
    features: ["QR Plant Passport", "Garden Health Score", "Store benefits"]
  },
  {
    name: "Home Garden",
    price: "Rs. 1,599",
    summary: "Premium home garden support with visit planning and reports.",
    features: ["Scheduled visit", "Plant timeline", "Green Promise"]
  },
  {
    name: "Premium Garden",
    price: "Rs. 2,999",
    summary: "Managed garden experience for larger homes and terraces.",
    features: ["Supervisor review", "Before/after photos", "Priority support"],
    popular: true
  },
  {
    name: "Luxury Garden",
    price: "Rs. 8,999",
    summary: "High-touch garden membership for villas and premium properties.",
    features: ["Dedicated care plan", "Replacement eligibility", "Expert consultation"]
  }
] as const;

const storeCategories = [
  ["Plants", "Indoor, outdoor, palms, fruit and flowering plants.", "/garden-store", img.nursery],
  ["Treatments", "Fertilizers, pesticides, plant food and recovery kits.", "/garden-store", img.store],
  ["Accessories", "Pots, planters, tools, irrigation and smart garden devices.", "/garden-store", img.indoor]
] as const;

const recommendationSteps = [
  ["Diagnosis", "AI identifies disease, pest or deficiency from the uploaded plant photo.", Bot],
  ["Treatment plan", "Garden Live turns the diagnosis into today, week and month actions.", CheckCircle2],
  ["Recovery kit", "Only relevant Garden Live products are suggested with the reason for each.", ShoppingBag],
  ["Refill reminders", "Fertilizer, pesticide and plant food reminders keep care consistent.", CalendarCheck]
] as const;

const reviews = [
  {
    quote: "The AI scan gave us a treatment plan and the right recovery products in one flow. It feels like a digital health plan for plants.",
    name: "Ananya Rao",
    role: "Home Garden Member",
    image: img.a1
  },
  {
    quote: "We use Garden Live for plants, medicines and monthly maintenance. The membership makes garden care predictable.",
    name: "Rahul Mehta",
    role: "Smart Garden Customer",
    image: img.a2
  },
  {
    quote: "The QR passport and before-after photos made every plant visible. Buying replacements and treatments is now simple.",
    name: "Meera Shah",
    role: "Premium Garden Member",
    image: img.a3
  }
] as const;

export function EcommerceHomePage() {
  return (
    <PublicChrome>
      <HeroCommerce />
      <AiPlantDoctorSection />
      <MembershipPlansSection />
      <GardenStoreSection />
      <RecommendationEngineSection />
      <RecommendedProductsSection />
      <BeforeAfterGardensSection />
      <CustomerReviewsSection />
      <DownloadAppSection />
      <FaqSection />
      <EnquirySection
        title="Ready to scan, shop, join or book Garden Live?"
        description="Tell us what your garden needs. Garden Live helps with AI diagnosis, products, memberships and expert services from one premium platform."
      />
    </PublicChrome>
  );
}

function HeroCommerce() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#04130B] text-white">
      <Image src={img.home} alt="Luxury Garden Live AI garden membership platform" fill priority sizes="100vw" className="object-cover opacity-[0.64]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(190,255,114,0.25),transparent_34%),linear-gradient(115deg,rgba(4,19,11,0.94),rgba(4,19,11,0.52)_48%,rgba(4,19,11,0.88))]" />
      <div className="absolute left-1/2 top-24 hidden h-72 w-72 -translate-x-1/2 rounded-full bg-lime-300/20 blur-[90px] lg:block" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <div>
          <Badge tone="success" className="bg-white/12 text-lime-100 ring-1 ring-white/20">
            {brandLine}
          </Badge>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            India&apos;s First AI Powered Digital Garden Membership Platform
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Scan sick plants, buy plants and treatments, join a garden membership, and book professional services from one premium Garden Live experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              <Link href="/membership-plans">Join Membership</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" rightIcon={<CalendarCheck className="h-4 w-4" aria-hidden />}>
              <Link href="/book-garden-visit">Book Free Garden Survey</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {instantActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.14]"
                >
                  <Icon className="h-5 w-5 text-lime-200" aria-hidden />
                  <span className="mt-3 block text-sm font-semibold text-white/88">{action.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              ["0-100", "Garden Health Score"],
              ["AI", "Diagnosis to cart"],
              ["24h", "Visit request flow"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.6rem] border border-white/12 bg-white/[0.08] p-5 backdrop-blur-xl">
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-10 top-16 rounded-3xl border border-white/15 bg-white/[0.1] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-lime-200">AI Scan</p>
            <p className="mt-2 text-2xl font-semibold">92%</p>
            <p className="text-sm text-white/62">Leaf spot confidence</p>
          </div>
          <div className="absolute -right-6 bottom-20 rounded-3xl border border-white/15 bg-white/[0.1] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-lime-200">Cart ready</p>
            <p className="mt-2 text-xl font-semibold">Recovery Kit</p>
            <p className="text-sm text-white/62">3 relevant products</p>
          </div>
          <div className="rounded-[2.6rem] border border-white/15 bg-white/[0.1] p-4 shadow-[0_30px_110px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[2rem] bg-[#071D10]">
              <div className="relative h-[520px]">
                <Image src={img.ai} alt="AI Plant Doctor phone mockup" fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D10] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Plant Doctor</p>
                      <Gauge className="h-5 w-5 text-lime-200" aria-hidden />
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/12">
                      <div className="h-2 w-[84%] rounded-full bg-lime-300" />
                    </div>
                    <p className="mt-3 text-sm text-white/65">Health score: 84. Treatment plan generated.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiPlantDoctorSection() {
  return (
    <section className="bg-[#F7FBF5] py-24">
      <div className="gl-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="AI Plant Doctor"
            title="Upload a plant photo and move from diagnosis to recovery."
            description="Garden Live detects disease, deficiency or pest risk, creates a treatment plan and connects the customer to relevant recovery products."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Disease detection", "Pest detection", "Deficiency scan", "Treatment report"].map((item) => (
              <div key={item} className="rounded-3xl border border-botanical-green/10 bg-white p-5 shadow-[0_16px_50px_rgba(16,67,38,0.08)]">
                <CheckCircle2 className="h-5 w-5 text-botanical-green" aria-hidden />
                <p className="mt-3 font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild rightIcon={<ScanSearch className="h-4 w-4" aria-hidden />}>
              <Link href="/ai-plant-doctor">Scan Plant</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/garden-store">Buy Treatments</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[2.5rem] bg-[#071D10] p-4 text-white shadow-[0_30px_100px_rgba(16,67,38,0.22)]">
          <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-lime-200">AI diagnosis result</p>
                <h3 className="mt-2 text-3xl font-semibold">Leaf Spot Detected</h3>
              </div>
              <Badge tone="warning">Moderate</Badge>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[["92%", "Confidence"], ["12-18 days", "Recovery"], ["68", "Health Score"]].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-5">
                  <p className="text-3xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-white/55">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {["Today: Remove affected leaves and isolate the plant.", "This week: Apply recommended organic fungicide and adjust watering.", "This month: Add balanced fertilizer and monitor new growth."].map((step) => (
                <div key={step} className="rounded-2xl bg-white/[0.08] p-4 text-sm text-white/78">{step}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MembershipPlansSection() {
  return (
    <section className="bg-white py-24">
      <div className="gl-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Garden Membership"
            title="Membership plans built around plant care, store benefits and real garden visits."
            description="Choose a plan, book a survey, track garden health and unlock Garden Live Green Promise eligibility based on your membership."
          />
          <Button asChild variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            <Link href="/membership-plans">Compare Plans</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {memberships.map((plan) => (
            <article key={plan.name} className={`rounded-[2rem] border p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] transition hover:-translate-y-1 ${plan.popular ? "border-botanical-green bg-botanical-green text-white" : "border-botanical-green/10 bg-[#F8FBF6]"}`}>
              {plan.popular ? <Badge tone="premium">Most chosen</Badge> : <Badge tone="success">Monthly</Badge>}
              <h3 className="mt-5 text-2xl font-semibold">{plan.name}</h3>
              <p className={`mt-2 text-sm leading-6 ${plan.popular ? "text-white/70" : "text-neutral-slate"}`}>{plan.summary}</p>
              <p className="mt-6 text-3xl font-semibold">{plan.price}<span className="text-sm font-medium opacity-70">/mo</span></p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7 w-full" variant={plan.popular ? "secondary" : "primary"}>
                <Link href="/membership-plans">Join Membership</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GardenStoreSection() {
  return (
    <section className="bg-[#071D10] py-24 text-white">
      <div className="gl-container">
        <SectionHeading
          eyebrow="Garden Store"
          title="Buy plants, treatments, tools and smart garden essentials."
          description="A public Garden Live storefront for plants, medicines, fertilizers, pots, planters, irrigation, smart garden kits and accessories."
          className="[&_h2]:text-white [&_p]:text-white/65"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {storeCategories.map(([title, description, href, image]) => (
            <Link key={title} href={href} className="group overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-[0_24px_90px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:-translate-y-1">
              <div className="relative h-72">
                <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D10] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-200">Shop now <ArrowRight className="h-4 w-4" aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendationEngineSection() {
  return (
    <section className="bg-[#F7FBF5] py-24">
      <div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="AI Recommendation Engine"
          title="From plant scan to the exact recovery kit."
          description="The Garden Live recommendation engine translates diagnosis, plant type, garden type, weather and stock availability into explained product recommendations."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendationSteps.map(([title, description, Icon]) => (
            <div key={title} className="rounded-[2rem] border border-botanical-green/10 bg-white p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)]">
              <Icon className="h-6 w-6 text-botanical-green" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-slate">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendedProductsSection() {
  return (
    <section className="bg-[#071D10] py-24">
      <div className="gl-container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Recommended Products"
            title="Recovery-ready products from the live Garden Live catalog."
            description="Visitors can browse products, add to cart and save to wishlist without login. Checkout and order history stay protected where required."
            className="[&_h2]:text-white [&_p]:text-white/65"
          />
          <Button asChild variant="secondary" rightIcon={<ShoppingBag className="h-4 w-4" aria-hidden />}>
            <Link href="/garden-store">Open Store</Link>
          </Button>
        </div>
        <RecommendedProductsPreview />
      </div>
    </section>
  );
}

function BeforeAfterGardensSection() {
  return (
    <section className="bg-white py-24">
      <div className="gl-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Before & After Gardens"
            title="See how gardens move from neglected to membership-ready."
            description="Before-after records help customers understand the value of expert visits, product treatments and continuous Garden Live care."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/book-garden-visit">Book Service</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[["Before", img.before], ["After", img.after]].map(([label, image]) => (
            <div key={label} className="overflow-hidden rounded-[2rem] border border-botanical-green/10 bg-[#F7FBF5] shadow-[0_20px_70px_rgba(16,67,38,0.12)]">
              <div className="relative h-80">
                <Image src={image} alt={`${label} Garden Live garden`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-botanical-green">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerReviewsSection() {
  return (
    <section className="bg-[#F7FBF5] py-24">
      <div className="gl-container">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Garden Live customers use one platform to diagnose, shop, subscribe and book."
          description="The public website is now centered on the customer actions that make Garden Live a commerce and AI membership platform."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-[2rem] border border-botanical-green/10 bg-white p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)]">
              <div className="flex gap-1 text-[#F4B740]" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-neutral-slate">{review.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <Image src={review.image} alt={review.name} width={52} height={52} className="rounded-full" />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-neutral-slate">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadAppSection() {
  return (
    <section className="bg-white py-24">
      <div className="gl-container overflow-hidden rounded-[2.5rem] bg-[#071D10] p-8 text-white shadow-[0_30px_120px_rgba(16,67,38,0.22)] sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Badge tone="success" className="bg-white/12 text-lime-100 ring-1 ring-white/15">Download App</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Garden Live works as a web app today and mobile app ready tomorrow.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Customers can scan plants, open their dashboard, book visits, track memberships, use cart and wishlist, and contact Garden Live from mobile or desktop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="secondary" leftIcon={<Download className="h-4 w-4" aria-hidden />}>
                <Link href="/customer/dashboard">Open Web App</Link>
              </Button>
              <Button asChild variant="tertiary" leftIcon={<MessageCircle className="h-4 w-4" aria-hidden />}>
                <Link href={whatsappHref}>Get App Alert</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href={callHref}>Call Now</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-5">
            <div className="grid gap-3">
              {["Scan plant", "Buy treatment", "Join membership", "Book gardener"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white/[0.08] p-4">
                  <span className="font-semibold">{item}</span>
                  <Sparkles className="h-4 w-4 text-lime-200" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
