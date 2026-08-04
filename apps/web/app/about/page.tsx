import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components";
import { PublicChrome } from "@/components/public/public-site";
import { DashboardPreview, EnquirySection, Hero, TestimonialsBlock } from "@/components/public/v4-public-sections";
import { brandLine, img } from "@/components/public/v4-public-data";

export const metadata: Metadata = {
  title: "About Garden Live",
  description: "Learn about Garden Live, India's AI-powered digital garden membership platform for premium garden care, landscaping, plant health, QR Plant Passport, and Green Promise service."
};

const values = [
  ["Technology with accountability", "Garden Live turns garden work into visible records, visits, reports, memberships and customer dashboards.", Sparkles],
  ["Premium green execution", "Landscaping, nursery supply and maintenance are handled with clear survey, quotation, execution and handover flows.", Leaf],
  ["Plant health first", "AI Plant Doctor, QR Plant Passport and Garden Health Score help customers understand and protect living assets.", Sprout],
  ["Green Promise clarity", "Memberships define care responsibility, replacement eligibility, warranty rules and maintenance transparency.", ShieldCheck]
] as const;

const journey = ["Nursery expertise", "Premium landscaping", "Digital memberships", "AI Plant Doctor", "QR Plant Passport", "Multi-city garden platform"];

export default function AboutPage() {
  return (
    <PublicChrome>
      <Hero
        eyebrow={brandLine}
        title="A garden company built like a technology platform."
        description="Garden Live combines premium landscaping, plant nursery, garden maintenance, AI plant healthcare, QR plant records and membership operations into one digital garden experience for India."
        image={img.villa}
        primaryLabel="Book Garden Visit"
        primaryHref="/book-garden-visit"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />

      <section className="py-24">
        <div className="gl-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Badge tone="success">Our Story</Badge>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">From garden service to digital garden membership.</h2>
            <p className="mt-6 text-base leading-8 text-neutral-slate">
              Garden Live was created to solve a simple but expensive problem: beautiful gardens need continuous care, proof of work, plant health visibility and trustworthy service ownership. The platform brings the discipline of SaaS operations to landscaping, nursery products and everyday garden maintenance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/membership-plans">View Membership Plans</Link>
              </Button>
              <Button asChild variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                <Link href="/ai-plant-doctor">Try AI Plant Doctor</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(([title, description, Icon]) => (
              <article key={title} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl">
                <Icon className="h-6 w-6 text-botanical-green" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-slate">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-24 backdrop-blur">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Vision and Mission"
            title="Make every garden measurable, beautiful and cared for."
            description="Garden Live is building India's first AI powered digital garden membership platform for homes, villas, rooftops, societies, offices, hotels, resorts and corporate campuses."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {journey.map((item, index) => (
              <div key={item} className="rounded-[1.75rem] border border-white bg-white/85 p-6 shadow-[0_20px_70px_rgba(16,67,38,0.08)]">
                <span className="text-sm font-semibold text-botanical-green">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4 text-botanical-green" aria-hidden />{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DashboardPreview />
      <TestimonialsBlock compact />
      <EnquirySection
        title="Start your Garden Live journey"
        description="Share your garden, rooftop, office, nursery or landscaping requirement. Garden Live will recommend the right survey, membership or project path."
      />
    </PublicChrome>
  );
}
