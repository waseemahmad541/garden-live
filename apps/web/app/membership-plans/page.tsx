import type { Metadata } from "next";
import { pageConfigs, PublicChrome } from "@/components/public/public-site";
import { Hero, Stats, HighlightGrid, ContentGrid, Process, FaqSection, EnquirySection } from "@/components/public/v4-public-sections";
import { MembershipIntentForm } from "@/components/public/membership-intent-form";

export const metadata: Metadata = {
  title: "Membership Plans",
  description: "Compare Garden Live membership plans from Plant Care to Dedicated Gardener with AI Plant Doctor credits, visit frequency, Green Promise, rewards, and benefits."
};

export default function MembershipPlansPage() {
  const config = pageConfigs["membership-plans"];
  return (
    <PublicChrome>
      <Hero
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        image={config.image}
        primaryLabel={config.primaryCta}
        primaryHref="#join-membership"
        secondaryLabel={config.secondaryCta}
        secondaryHref={config.secondaryHref}
      />
      <Stats stats={config.stats} />
      <HighlightGrid highlights={config.highlights} />
      <ContentGrid sections={config.sections} />
      <Process steps={config.process} />
      <section id="join-membership" className="py-20">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-botanical-green">Membership Purchase Flow</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Choose a plan without logging in.</h2>
            <p className="mt-5 text-base leading-8 text-neutral-slate">
              Visitors can submit a real membership request publicly. Payment gateway collection is intentionally deferred until live payment confirmation.
            </p>
          </div>
          <MembershipIntentForm />
        </div>
      </section>
      <FaqSection />
      <EnquirySection title="Need plan guidance?" description="Book a survey and Garden Live will recommend the right membership for your garden size, plant count and care goals." />
    </PublicChrome>
  );
}
