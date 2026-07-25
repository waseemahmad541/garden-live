import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  CTABanner,
  FAQAccordion,
  FeatureCard,
  Footer,
  MembershipCard,
  Navbar,
  SectionHeading,
  StatisticsCard,
  TestimonialCard
} from "@/components";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coins,
  HeartHandshake,
  Leaf,
  MoveUpRight,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Users,
  Wrench,
  XCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Garden Membership Plans",
  description:
    "Compare Garden Live membership plans from Plant Care to Dedicated Gardener, including visits, working hours, plant replacement eligibility, and the Garden Live Green Promise.",
  openGraph: {
    title: "Garden Live Membership Plans",
    description:
      "Premium digital garden memberships for plant care, smart gardens, home gardens, luxury gardens, and dedicated gardener support.",
    url: "https://gardenlive.in/membership",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Premium Garden Live membership care plan for a luxury garden"
      }
    ]
  }
};

const navItems = [
  { label: "Plans", href: "#plans" },
  { label: "Compare", href: "#comparison" },
  { label: "Green Promise", href: "#green-promise" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" }
];

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" }
    ]
  },
  {
    title: "Membership",
    links: [
      { label: "Plans", href: "#plans" },
      { label: "Compare", href: "#comparison" },
      { label: "Green Promise", href: "#green-promise" }
    ]
  },
  {
    title: "Care",
    links: [
      { label: "AI Plant Doctor", href: "/#ai-plant-doctor" },
      { label: "Garden Survey", href: "#join" },
      { label: "Services", href: "/services" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Warranty", href: "#replacement-policy" }
    ]
  }
];

const plans = [
  {
    name: "Plant Care",
    price: "₹299",
    description: "For plant lovers who want simple digital care guidance and light support.",
    badge: "Starter",
    recommended: false,
    visitFrequency: "Digital care only",
    workingHours: "Remote guidance",
    replacement: "Not eligible",
    greenPromise: "Care guidance promise",
    included: ["Plant care reminders", "Basic care tips", "Garden Live account", "Member support"],
    notIncluded: ["Gardener visit", "Plant replacement", "Dedicated supervisor", "Project consultation"],
    features: ["Digital plant care", "Basic support", "Entry member pricing"]
  },
  {
    name: "Smart Garden",
    price: "₹999",
    description: "For balcony and small home gardens needing monthly professional attention.",
    badge: "Popular",
    recommended: true,
    visitFrequency: "1 visit / month",
    workingHours: "Up to 1 hour",
    replacement: "Limited eligibility",
    greenPromise: "Basic Green Promise",
    included: ["Monthly gardener visit", "Plant health check", "Basic pruning", "Store member pricing"],
    notIncluded: ["Major landscaping", "Bulk plant supply", "Daily watering", "Dedicated gardener"],
    features: ["Monthly visit", "Health check", "Member discounts"]
  },
  {
    name: "Home Garden",
    price: "₹3,999",
    description: "For regular home gardens needing structured maintenance and care history.",
    badge: "Home care",
    recommended: false,
    visitFrequency: "4 visits / month",
    workingHours: "Up to 2 hours",
    replacement: "Eligible plants covered",
    greenPromise: "Standard Green Promise",
    included: ["Weekly maintenance", "Before-after photos", "Plant health logs", "Replacement review"],
    notIncluded: ["New landscape build", "Government tender work", "Full-time gardener", "Large material cost"],
    features: ["Weekly visits", "Plant logs", "Replacement review"]
  },
  {
    name: "Premium Garden",
    price: "₹7,999",
    description: "For larger gardens needing supervisor-backed care and premium reporting.",
    badge: "Recommended",
    recommended: true,
    visitFrequency: "8 visits / month",
    workingHours: "Up to 3 hours",
    replacement: "Priority eligible coverage",
    greenPromise: "Premium Green Promise",
    included: ["Bi-weekly care rhythm", "Supervisor review", "Green Promise support", "Priority scheduling"],
    notIncluded: ["Civil work", "High-value imported plants", "Daily manpower", "Tender documentation"],
    features: ["Priority care", "Supervisor review", "Green Promise"]
  },
  {
    name: "Luxury Garden",
    price: "₹14,999",
    description: "For villas, premium terraces, and statement gardens requiring high-touch care.",
    badge: "Luxury",
    recommended: false,
    visitFrequency: "12 visits / month",
    workingHours: "Up to 4 hours",
    replacement: "Enhanced eligible coverage",
    greenPromise: "Luxury Green Promise",
    included: ["High-touch maintenance", "Advanced plant tracking", "Seasonal refresh planning", "Priority consultation"],
    notIncluded: ["Full-time deployment", "Large project materials", "Specialist arborist fees", "Structural terrace work"],
    features: ["High-touch visits", "Seasonal planning", "Priority support"]
  },
  {
    name: "Dedicated Gardener",
    price: "₹30,000",
    description: "For estates, institutions, and luxury properties needing dedicated monthly manpower.",
    badge: "Concierge",
    recommended: false,
    visitFrequency: "Dedicated monthly schedule",
    workingHours: "Custom monthly hours",
    replacement: "Custom eligibility",
    greenPromise: "Concierge Green Promise",
    included: ["Dedicated gardener allocation", "Supervisor coordination", "Custom work schedule", "Monthly care reporting"],
    notIncluded: ["Plant/product cost", "Major landscaping execution", "Government tender compliance", "Specialist vendor work"],
    features: ["Dedicated manpower", "Custom schedule", "Supervisor coordination"]
  }
];

const comparisonRows = [
  { label: "Visit frequency", key: "visitFrequency" },
  { label: "Working hours per visit", key: "workingHours" },
  { label: "Plant replacement", key: "replacement" },
  { label: "Green Promise", key: "greenPromise" }
] as const;

const howItWorks = [
  {
    title: "Choose your plan",
    description: "Start with the membership that matches your garden size, plant count, and care expectation.",
    icon: <Star className="h-5 w-5" aria-hidden />
  },
  {
    title: "Book survey",
    description: "Garden Live reviews your garden condition, watering pattern, sunlight, and maintenance needs.",
    icon: <CalendarDays className="h-5 w-5" aria-hidden />
  },
  {
    title: "Activate care rhythm",
    description: "Visits, records, photos, plant health notes, and Green Promise eligibility begin after activation.",
    icon: <Wrench className="h-5 w-5" aria-hidden />
  },
  {
    title: "Track everything",
    description: "Your garden history becomes visible through visit logs, plant updates, claims, and recommendations.",
    icon: <Sparkles className="h-5 w-5" aria-hidden />
  }
];

const faqs = [
  {
    question: "Which membership should I choose first?",
    answer:
      "Smart Garden is best for small gardens and balconies. Home Garden suits regular home gardens. Premium, Luxury, and Dedicated Gardener plans are better for larger spaces or high-touch care."
  },
  {
    question: "Is plant replacement included in every plan?",
    answer:
      "No. Replacement eligibility depends on the plan, plant registration, evidence, care responsibility, and Green Promise rules. Plant Care does not include replacement."
  },
  {
    question: "What happens during a maintenance visit?",
    answer:
      "A visit can include pruning, soil check, pest observation, cleaning, basic care tasks, plant health notes, and before-after reporting depending on the plan."
  },
  {
    question: "Can I upgrade my membership later?",
    answer:
      "Yes. Garden Live is designed for upgrades as your garden grows or your service expectations become more premium."
  }
];

export default function MembershipPage() {
  return (
    <main className="bg-neutral-cloud">
      <Navbar items={navItems} ctaLabel="Join Now" ctaHref="#join" />

      <section className="relative overflow-hidden bg-botanical-black text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1800&q=85"
            alt="Premium maintained garden representing Garden Live membership plans"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-58"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-botanical-black via-botanical-black/86 to-botanical-black/20" />
        </div>
        <div className="gl-container relative py-20 sm:py-24 lg:py-32">
          <div className="gl-rise max-w-3xl">
            <Badge tone="premium">Garden Memberships</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[0] sm:text-5xl lg:text-6xl">
              Premium garden care plans for every stage of green living.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Choose a Garden Live membership for scheduled maintenance, plant health visibility,
              eligible replacement support, Green Promise protection, and a more reliable garden care rhythm.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#plans">Compare Plans</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" rightIcon={<MoveUpRight className="h-4 w-4" aria-hidden />}>
                <Link href="#join">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Membership Plans"
            title="Simple pricing, serious garden care."
            description="Every plan is designed around a clear service promise: what is included, what is not, how often we visit, and how Green Promise applies."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => (
              <MembershipCard
                key={plan.name}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                billingCycle="/month"
                badge={plan.badge}
                highlighted={plan.recommended}
                features={plan.features}
                className="gl-rise"
                action={
                  <Button asChild className="w-full" variant={plan.recommended ? "primary" : "secondary"}>
                    <Link href="#join">Join Now</Link>
                  </Button>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="comparison" className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Membership Comparison Table"
            title="Compare every plan before you commit."
            description="A clear comparison of visit frequency, working hours, replacement eligibility, and the Green Promise level."
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-[#E3E8E2] bg-white shadow-glSm">
            <div className="overflow-x-auto">
              <table className="min-w-[980px] w-full border-collapse text-left">
                <thead className="bg-neutral-cloud">
                  <tr>
                    <th className="w-52 px-5 py-4 text-sm font-semibold text-botanical-black">Plan detail</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="px-5 py-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-botanical-black">{plan.name}</span>
                          {plan.recommended ? <Badge tone="premium">Recommended</Badge> : null}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-botanical-green">{plan.price}/mo</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8E2]">
                  {comparisonRows.map((row) => (
                    <tr key={row.key}>
                      <td className="px-5 py-4 text-sm font-semibold text-botanical-black">{row.label}</td>
                      {plans.map((plan) => (
                        <td key={`${plan.name}-${row.key}`} className="px-5 py-4 text-sm leading-6 text-neutral-slate">
                          {plan[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-4 text-sm font-semibold text-botanical-black">What&apos;s included</td>
                    {plans.map((plan) => (
                      <td key={`${plan.name}-included`} className="px-5 py-4 align-top">
                        <ul className="space-y-2">
                          {plan.included.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-neutral-slate">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-status-success" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-semibold text-botanical-black">Not included</td>
                    {plans.map((plan) => (
                      <td key={`${plan.name}-not-included`} className="px-5 py-4 align-top">
                        <ul className="space-y-2">
                          {plan.notIncluded.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-neutral-slate">
                              <XCircle className="mt-0.5 h-4 w-4 flex-none text-neutral-stone" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="green-promise" className="py-16 sm:py-20">
        <div className="gl-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Green Promise Section"
              title="Garden Live Green Promise makes care responsibilities clear."
              description="Our promise is built to reduce confusion: what Garden Live maintains, what the customer must continue doing, and when plant replacement can be reviewed."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="Eligible care protection"
                description="Replacement can be reviewed when plants are registered, maintained, and covered by the active plan."
                icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
              />
              <FeatureCard
                title="Transparent responsibility"
                description="Watering, sunlight, pets, relocation, weather, and missed care conditions are handled through clear rules."
                icon={<HeartHandshake className="h-5 w-5" aria-hidden />}
              />
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-[#E3E8E2] bg-botanical-black shadow-glMd">
            <Image
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=85"
              alt="Gardener caring for plants under Garden Live Green Promise"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover opacity-92"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-xl bg-white/92 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-botanical-black">
                <RotateCcw className="h-4 w-4 text-botanical-green" aria-hidden />
                Green Promise review
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-slate">
                Eligible plants, service history, care evidence, and warranty rules are reviewed before approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="replacement-policy" className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Plant Replacement Policy"
            title="A premium policy that protects trust without hiding the rules."
            description="Plant replacement is not a vague promise. It is a structured eligibility review based on membership level, plant registration, evidence, and care responsibility."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <FeatureCard
              title="Eligible plants"
              description="Plants must be part of the Garden Live record, covered by the active plan, and within applicable warranty conditions."
              icon={<Leaf className="h-5 w-5" aria-hidden />}
            />
            <FeatureCard
              title="Evidence review"
              description="Replacement claims require plant condition details, photos, service history, and supervisor/admin assessment."
              icon={<CheckCircle2 className="h-5 w-5" aria-hidden />}
            />
            <FeatureCard
              title="Exclusions"
              description="Neglect, improper watering, relocation stress, pet damage, external incidents, and extreme weather may be excluded."
              icon={<XCircle className="h-5 w-5" aria-hidden />}
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-botanical-black py-16 text-white sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="How Membership Works"
            title="A care rhythm your garden can rely on."
            description="From choosing a plan to tracking visits, membership turns garden care into an ongoing operating system."
            className="[&_h2]:text-white [&_p]:text-white/68"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <div key={item.title} className="rounded-gl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-gl bg-white/10 text-accent-marigold">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-white/40">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/64">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-20">
        <div className="gl-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Membership questions, answered clearly."
              description="A premium garden plan should be simple to understand before you join."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <StatisticsCard label="Starting from" value="₹299" trend="Plant Care plan" trendDirection="up" icon={<Coins className="h-4 w-4" aria-hidden />} />
              <StatisticsCard label="Highest care level" value="₹30k" trend="Dedicated Gardener" trendDirection="up" icon={<Users className="h-4 w-4" aria-hidden />} />
            </div>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Members choose Garden Live for consistency, not just convenience."
            description="Membership changes the experience from occasional garden help to accountable garden care."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <TestimonialCard
              quote="The Smart Garden plan made our balcony plants easier to manage. The monthly visit and guidance gave us confidence."
              name="Priya K."
              role="Smart Garden member"
              rating={4.9}
            />
            <TestimonialCard
              quote="Home Garden feels like the right level of care. Weekly maintenance, photos, and plant notes keep everything visible."
              name="Arvind S."
              role="Home Garden member"
            />
            <TestimonialCard
              quote="The Premium Garden plan is what our villa needed. It feels structured, supervised, and genuinely high-touch."
              name="Nisha R."
              role="Premium Garden member"
              rating={5}
            />
          </div>
        </div>
      </section>

      <section id="join" className="py-16 sm:py-20">
        <div className="gl-container">
          <CTABanner
            title="Join Garden Live and give your garden a real care system."
            description="Start with the right membership or book a free survey so Garden Live can recommend the best plan for your plants, space, and lifestyle."
            action={
              <Button asChild variant="secondary" rightIcon={<MoveUpRight className="h-4 w-4" aria-hidden />}>
                <Link href="/contact">Join Now</Link>
              </Button>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Clear visit frequency", icon: <CalendarDays className="h-4 w-4" aria-hidden /> },
              { label: "Defined working hours", icon: <Clock className="h-4 w-4" aria-hidden /> },
              { label: "Green Promise clarity", icon: <ShieldCheck className="h-4 w-4" aria-hidden /> }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-semibold text-neutral-charcoal">
                <span className="text-status-success">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer groups={footerGroups} />
    </main>
  );
}
