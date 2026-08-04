import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Award,
  BadgeCheck,
  Bell,
  Bot,
  CalendarCheck,
  Camera,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Crown,
  Gift,
  HeartPulse,
  Home,
  IdCard,
  Leaf,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  TreePine,
  Users,
  WalletCards,
  Wrench,
  Zap
} from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components";
import { MembershipIntentForm } from "@/components/public/membership-intent-form";
import { PublicChrome } from "@/components/public/public-site";
import { EnquirySection, FaqSection, Hero } from "@/components/public/v4-public-sections";
import { brandLine, img } from "@/components/public/v4-public-data";

export const metadata: Metadata = {
  title: "Garden Live Membership Plans",
  description:
    "Compare Garden Live membership plans from Plant Care to Dedicated Gardener with AI Plant Doctor, gardener visits, QR Garden Profile, Digital Plant Passport, Green Rewards, reports and garden protection benefits.",
  alternates: { canonical: "/membership-plans" },
  openGraph: {
    title: "Garden Live Membership Plans",
    description:
      "Premium digital garden memberships with AI Plant Doctor, QR Garden Profile, Green Rewards, garden protection, family access and monthly reports.",
    url: "https://gardenlive.in/membership-plans",
    images: [{ url: "/images/v4/hero-garden.svg", width: 1200, height: 630, alt: "Garden Live membership plans" }]
  }
};

type Plan = {
  slug: string;
  name: string;
  price: string;
  icon: LucideIcon;
  summary: string;
  includes: string[];
  badge?: string;
};

const plans: Plan[] = [
  {
    slug: "plant-care",
    name: "Plant Care Membership",
    price: "Rs. 199/month",
    icon: Leaf,
    summary: "AI-first plant care for homes, balconies and indoor plant owners.",
    includes: [
      "AI Plant Doctor",
      "Expert Plant Consultation",
      "Unlimited Photo Diagnosis",
      "Unlimited Chat Support",
      "Smart Watering Guide",
      "Water Reminders",
      "Fertilizer Recommendation",
      "Disease & Pest Identification",
      "Monthly Plant Care Calendar",
      "Watering & Fertilizer Notifications",
      "Plant Growth Tips",
      "Seasonal Care Guide",
      "Member Only Offers"
    ]
  },
  {
    slug: "smart-garden",
    name: "Smart Garden Membership",
    price: "Rs. 599/month",
    icon: Bot,
    summary: "Everything in Plant Care plus digital garden intelligence and one monthly visit.",
    badge: "Popular starter",
    includes: [
      "Everything in Plant Care",
      "1 Gardener Visit / Month",
      "Video Consultation",
      "AI Garden Analysis",
      "Garden Health Report",
      "WhatsApp Priority Support",
      "Plant Inventory",
      "Digital Plant Passport",
      "Plant Growth Tracking",
      "Sunlight Analysis",
      "Soil Health Advice",
      "Personalized Care Plan",
      "5% Discount on Plants & Products"
    ]
  },
  {
    slug: "home-garden",
    name: "Home Garden Membership",
    price: "Rs. 1599/month",
    icon: Home,
    summary: "Everything in Smart Garden plus hands-on maintenance for active home gardens.",
    includes: [
      "Everything in Smart Garden",
      "2 Garden Visits",
      "Pruning",
      "Weeding",
      "Before & After Photos",
      "Garden Health Score",
      "Fertilizer Application",
      "Basic Disease Treatment",
      "Plant Cleaning",
      "Monthly Service Report",
      "10% Store Discount"
    ]
  },
  {
    slug: "premium-garden",
    name: "Premium Garden Membership",
    price: "Rs. 2999/month",
    icon: TreePine,
    summary: "Everything in Home Garden plus deeper nutrition, pest control and supervisor care.",
    badge: "Best value",
    includes: [
      "Everything in Home Garden",
      "3 Visits / Month",
      "Pest Control",
      "Plant Nutrition Plan",
      "Seasonal Plantation",
      "Monthly Garden Report",
      "Dedicated Supervisor",
      "Photo & Video Visit Reports",
      "Priority Support",
      "15% Discount"
    ]
  },
  {
    slug: "luxury-garden",
    name: "Luxury Garden Membership",
    price: "Rs. 8999/month",
    icon: Crown,
    summary: "Everything in Premium plus advanced analytics, emergency support and landscape planning.",
    includes: [
      "Everything in Premium",
      "6 Visits",
      "Emergency Visit",
      "Garden Supervisor",
      "Advanced Garden Health Analytics",
      "Premium Plant Replacement Advice",
      "Customized Landscape Planning",
      "24x7 Priority Support",
      "Monthly Video Report",
      "20% Discount"
    ]
  },
  {
    slug: "business-villa",
    name: "Business & Villa Membership",
    price: "Rs. 14999/month",
    icon: Sparkles,
    summary: "Everything in Premium plus commercial, office, villa and managed property monitoring.",
    includes: [
      "Everything in Premium",
      "4 Garden Visits",
      "Dedicated Supervisor",
      "Commercial Landscape Monitoring",
      "Office & Villa Garden Management",
      "Monthly Strategy Meeting",
      "Quarterly Landscape Improvement Plan",
      "Emergency Priority Visit",
      "20% Discount on Products & Services"
    ]
  },
  {
    slug: "dedicated-gardener",
    name: "Dedicated Gardener",
    price: "Rs. 30000/month",
    icon: Wrench,
    summary: "A full-time managed gardener program for large homes, villas, farms and offices.",
    badge: "White glove",
    includes: [
      "Dedicated Gardener",
      "8 Hours Daily",
      "26 Working Days",
      "Supervisor Monitoring",
      "Daily Photo Reports",
      "Garden Health Score",
      "App Access",
      "Backup Gardener",
      "Complete Garden Maintenance",
      "Fertilizer Management",
      "Pest Management",
      "Lawn Care",
      "Monthly Performance Report",
      "25% Discount"
    ]
  }
];

const exclusiveBenefits = [
  ["Garden Live Mobile App", AppWindow],
  ["Digital Membership Card", IdCard],
  ["QR Based Garden Profile", QrCode],
  ["Digital Plant Passport", Leaf],
  ["AI Plant Doctor", Bot],
  ["Plant Care History", CalendarCheck],
  ["Exclusive Member Offers", Gift],
  ["Fast Customer Support", MessageCircle]
] as const;

const aiFeatures = [
  ["AI Garden Health Score", HeartPulse],
  ["AI Monthly Garden Scan", Camera],
  ["Weather Based Alerts", CloudSun],
  ["Smart Water Scheduler", Bell],
  ["Disease Outbreak Alerts", Zap],
  ["AI Fertilizer Calculator", Sprout],
  ["AI Pruning Advisor", Wrench]
] as const;

const passportItems = [
  "QR Garden Profile",
  "Plant Inventory",
  "Plant Age",
  "Plant Warranty",
  "Care History",
  "Treatment History",
  "Visit History",
  "Before & After Photos"
];

const rewardEarn = ["Membership Renewal", "Store Purchases", "Garden Visits", "Referrals"];
const rewardRedeem = ["Free Plants", "Pots", "Fertilizers", "Garden Accessories", "Gift Vouchers", "Membership Upgrade"];

const sectionGroups = [
  {
    eyebrow: "Garden Protection",
    title: "A protection layer for weather, emergencies and plant health risk.",
    items: ["Plant Health Warranty", "Emergency Plant Doctor", "Heat Wave Alerts", "Frost Alerts", "Monsoon Protection", "Storm Damage Consultation"],
    icon: ShieldCheck
  },
  {
    eyebrow: "Family Features",
    title: "Built for families, villas, farms, offices and multiple properties.",
    items: ["Multiple Family Members", "Multiple Property Support", "Villa / Farm / Office Gardens", "Shared Garden Access"],
    icon: Users
  },
  {
    eyebrow: "Reports",
    title: "Premium reports that turn garden care into visible intelligence.",
    items: ["Monthly Garden Report", "AI Growth Analytics", "Water Usage Report", "Plant Survival Rate", "Garden Value Estimate", "Annual Garden Health Report"],
    icon: BadgeCheck
  },
  {
    eyebrow: "Member Benefits",
    title: "VIP care and commerce benefits for Garden Live members.",
    items: ["Early Access to Rare Plants", "Members Only Pricing", "Free Delivery", "Birthday Plant Gift", "Anniversary Gift", "VIP Workshops"],
    icon: Star
  },
  {
    eyebrow: "Community",
    title: "A Garden Live community for learning, sharing and rewards.",
    items: ["Garden Leaderboard", "Ask Experts", "Garden Community", "Monthly Contest", "Refer & Earn"],
    icon: Award
  }
];

export default function MembershipPlansPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Garden Live Membership Plans",
    url: "https://gardenlive.in/membership-plans",
    itemListElement: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.summary,
      priceCurrency: "INR",
      price: plan.price.replace(/[^\d]/g, "")
    }))
  };

  return (
    <PublicChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero
        eyebrow={brandLine}
        title="Premium garden memberships for every plant, home, villa and business."
        description="Choose a Garden Live plan with AI Plant Doctor, expert consultation, scheduled gardener visits, QR Garden Profile, Digital Plant Passport, Green Rewards, reports and protection alerts."
        image={img.home}
        primaryLabel="Join Membership"
        primaryHref="#join-membership"
        secondaryLabel="Book Free Garden Survey"
        secondaryHref="/book-garden-visit"
      />

      <section className="py-24">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Membership Plans"
            title="Seven premium plans, from AI plant care to dedicated gardener management."
            description="Every card leads to the live public membership request form. Payment collection remains disabled until Garden Live activates the gateway."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <IconGridSection
        eyebrow="Exclusive Benefits"
        title="Every member gets a digital Garden Live layer."
        description="Membership is not only a service plan. It is a connected garden profile with plant history, member offers and faster support."
        items={exclusiveBenefits}
      />

      <IconGridSection
        dark
        eyebrow="New AI Features"
        title="AI tools that make garden care proactive."
        description="Garden Live uses AI-ready experiences to help members understand health, weather, water, fertilizer and pruning signals."
        items={aiFeatures}
      />

      <section className="py-24">
        <div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge tone="premium">Digital Garden Passport</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">One QR garden profile for plants, visits, treatments and photos.</h2>
            <p className="mt-5 text-base leading-8 text-neutral-slate">
              The Digital Garden Passport explains every plant and garden asset clearly, including age, warranty, care history, treatment history and before-after progress.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#07130d] p-6 text-white">
              <QrCode className="h-12 w-12 text-botanical-lime" aria-hidden />
              <h3 className="mt-5 text-3xl font-semibold">QR Garden Profile</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">Scan once to open the complete Garden Live care record.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {passportItems.map((item) => (
                  <p key={item} className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-botanical-lime" aria-hidden />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RewardsSection />

      <section className="py-24">
        <div className="gl-container grid gap-5 lg:grid-cols-2">
          {sectionGroups.map((group) => (
            <FeaturePanel key={group.eyebrow} {...group} />
          ))}
        </div>
      </section>

      <section id="join-membership" className="bg-white/60 py-24 backdrop-blur">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge tone="success">Join Garden Live</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Apply for membership without logging in.</h2>
            <p className="mt-5 text-base leading-8 text-neutral-slate">
              Submit your plan request publicly. Garden Live stores the request, reviews your garden, and confirms the right activation path.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-botanical-black">
              {["No login required", "Saved to Garden Live records", "Survey-ready workflow", "Payment gateway disabled for now"].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-botanical-green" aria-hidden />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <MembershipIntentForm />
        </div>
      </section>

      <FaqSection />
      <EnquirySection title="Need plan guidance?" description="Book a survey and Garden Live will recommend the right membership for your garden size, plant count, property type and care goals." />
    </PublicChrome>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_110px_rgba(16,67,38,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-botanical-mint text-botanical-green">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        {plan.badge ? <Badge tone="premium">{plan.badge}</Badge> : null}
      </div>
      <h2 className="mt-6 text-2xl font-semibold leading-tight">{plan.name}</h2>
      <p className="mt-3 text-3xl font-semibold text-botanical-green">{plan.price}</p>
      <p className="mt-4 text-sm leading-7 text-neutral-slate">{plan.summary}</p>
      <div className="mt-6 flex-1 space-y-3">
        {plan.includes.map((feature) => (
          <p key={feature} className="flex gap-3 text-sm font-medium leading-6 text-botanical-black">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />
            {feature}
          </p>
        ))}
      </div>
      <Button asChild className="mt-7 w-full rounded-full" rightIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>
        <Link href="#join-membership">Apply for {plan.name.replace(" Membership", "")}</Link>
      </Button>
    </article>
  );
}

function IconGridSection({
  eyebrow,
  title,
  description,
  items,
  dark = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly (readonly [string, LucideIcon])[];
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-[#07130d] py-24 text-white" : "py-24"}>
      <div className="gl-container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className={dark ? "[&_h2]:text-white [&_p]:text-white/68" : undefined} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([label, Icon]) => (
            <div key={label} className={dark ? "rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:-translate-y-1" : "rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_20px_70px_rgba(16,67,38,0.08)] backdrop-blur-xl transition hover:-translate-y-1"}>
              <Icon className={dark ? "h-6 w-6 text-botanical-lime" : "h-6 w-6 text-botanical-green"} aria-hidden />
              <p className={dark ? "mt-5 font-semibold text-white" : "mt-5 font-semibold text-botanical-black"}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RewardsSection() {
  return (
    <section className="bg-[#07130d] py-24 text-white">
      <div className="gl-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Badge tone="premium" className="bg-white/15 text-white">Green Rewards Program</Badge>
          <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Earn Green Points for caring, buying and referring.</h2>
          <p className="mt-5 text-base leading-8 text-white/68">
            Green Rewards turns membership renewal, store purchases, garden visits and referrals into redeemable value for plants, accessories and upgrades.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <RewardList title="Earn points for" items={rewardEarn} icon={WalletCards} />
          <RewardList title="Redeem points for" items={rewardRedeem} icon={Gift} />
        </div>
      </div>
    </section>
  );
}

function RewardList({ title, items, icon: Icon }: { title: string; items: string[]; icon: LucideIcon }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
      <Icon className="h-7 w-7 text-botanical-lime" aria-hidden />
      <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <p key={item} className="flex gap-3 text-sm text-white/78">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-lime" aria-hidden />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function FeaturePanel({ eyebrow, title, items, icon: Icon }: { eyebrow: string; title: string; items: string[]; icon: LucideIcon }) {
  return (
    <article className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl">
      <Icon className="h-7 w-7 text-botanical-green" aria-hidden />
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight">{title}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <p key={item} className="flex gap-3 rounded-2xl bg-botanical-mint/60 px-4 py-3 text-sm font-semibold text-botanical-black">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical-green" aria-hidden />
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
