import Link from "next/link";
import { Button } from "@/components";
import { EnquiryForm } from "@/components/public/enquiry-form";
import { brandLine, img, pageConfigs, type PageConfig } from "@/components/public/v4-public-data";
import {
  BeforeAfter,
  ContactCards,
  ContentGrid,
  DashboardPreview,
  EnquirySection,
  FaqSection,
  Hero,
  HighlightGrid,
  HomeExperience,
  MapSection,
  Process,
  ProjectGallery,
  PublicChrome,
  Stats,
  TestimonialsBlock
} from "@/components/public/v4-public-sections";

export { pageConfigs, PublicChrome };

type PageSlug = keyof typeof pageConfigs;
type ContactPageProps = { booking?: boolean };

function getPage(slug: PageSlug): PageConfig {
  return pageConfigs[slug];
}

export function HomePage() {
  return <HomePublicPage />;
}

export function HomePublicPage() {
  return (
    <PublicChrome>
      <HomeExperience />
    </PublicChrome>
  );
}

export function PublicPage({ config }: { config: PageConfig }) {
  return (
    <PublicChrome>
      <Hero
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        image={config.image}
        primaryLabel={config.primaryCta}
        primaryHref="/book-garden-visit"
        secondaryLabel={config.secondaryCta}
        secondaryHref={config.secondaryHref ?? "/services"}
      />
      <Stats stats={config.stats} />
      <HighlightGrid highlights={config.highlights} />
      <section className="py-6">
        <div className="gl-container">
          <ContentGrid sections={config.sections} />
        </div>
      </section>
      <Process steps={config.process} />
      <ProjectGallery />
      <DashboardPreview />
      <TestimonialsBlock compact />
      <BeforeAfter />
      <FaqSection />
      <EnquirySection
        title="Book a Garden Live visit"
        description="Share your space, city and service need. Garden Live will recommend the right premium garden path."
      />
    </PublicChrome>
  );
}

function ConfigPage({ slug }: { slug: PageSlug }) {
  return <PublicPage config={getPage(slug)} />;
}

export function AboutPage() {
  return <AboutPublicPage />;
}

export function AboutPublicPage() {
  return <ConfigPage slug="corporate-solutions" />;
}

export function ServicesPage() {
  return <ServicesPublicPage />;
}

export function ServicesPublicPage() {
  return <ConfigPage slug="landscaping" />;
}

export function LandscapingPage() {
  return <ConfigPage slug="landscaping" />;
}

export function PlantNurseryPage() {
  return <ConfigPage slug="plant-nursery" />;
}

export function GardenMaintenancePage() {
  return <ConfigPage slug="garden-maintenance" />;
}

export function DedicatedGardenerPage() {
  return <ConfigPage slug="dedicated-gardener" />;
}

export function MembershipPlansPage() {
  return <ConfigPage slug="membership-plans" />;
}

export function AiPlantDoctorPage() {
  return <ConfigPage slug="ai-plant-doctor" />;
}

export function PlantScannerPage() {
  return <ConfigPage slug="plant-scanner" />;
}

export function QrPlantPassportPage() {
  return <ConfigPage slug="qr-plant-passport" />;
}

export function CorporateSolutionsPage() {
  return <ConfigPage slug="corporate-solutions" />;
}

export function GardenStorePage() {
  return <ConfigPage slug="garden-store" />;
}

export function GardenHealthReportsPage() {
  return <ConfigPage slug="garden-health-reports" />;
}

export function GalleryPage() {
  return (
    <PublicChrome>
      <Hero
        eyebrow={brandLine}
        title="Garden Live gallery for premium landscapes and living plant spaces."
        description="Browse luxury villas, rooftop gardens, nurseries, indoor plants, before-after transformations and Garden Live service moments."
        image={img.villa}
        primaryLabel="View Projects"
        primaryHref="/projects"
        secondaryLabel="Book Garden Visit"
        secondaryHref="/book-garden-visit"
      />
      <ProjectGallery />
      <BeforeAfter />
      <TestimonialsBlock compact />
      <EnquirySection title="Plan your Garden Live transformation" description="Tell us about your space and our team will recommend the right landscaping, maintenance or membership path." />
    </PublicChrome>
  );
}

export function ProjectsPage() {
  return (
    <PublicChrome>
      <Hero
        eyebrow="Projects Portfolio"
        title="Premium Garden Live projects across homes, rooftops and managed properties."
        description="A portfolio experience for luxury landscaping, corporate greenery, terrace gardens, nursery supply and maintenance transformations."
        image={img.rooftop}
        primaryLabel="Book Project Survey"
        primaryHref="/book-garden-visit"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
      <ProjectGallery />
      <BeforeAfter />
      <Stats stats={getPage("landscaping").stats} />
      <FaqSection />
      <EnquirySection title="Start a Garden Live project" description="Share your project location, area and design need. Garden Live will help shape the next step." />
    </PublicChrome>
  );
}

export function BlogPage() {
  const posts = [
    "How digital garden memberships change home maintenance",
    "AI Plant Doctor signals every plant owner should understand",
    "Designing premium rooftop gardens for Indian homes"
  ];

  return (
    <PublicChrome>
      <Hero
        eyebrow="Garden Live Journal"
        title="Insights for luxury gardens, AI plant care and smarter green living."
        description="Editorial guidance for memberships, plant health reports, landscaping design, QR Plant Passport and premium maintenance operations."
        image={img.care}
        primaryLabel="Book Garden Visit"
        primaryHref="/book-garden-visit"
        secondaryLabel="Explore AI Doctor"
        secondaryHref="/ai-plant-doctor"
      />
      <section className="py-24">
        <div className="gl-container grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post} className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(16,67,38,0.10)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-botanical-green">Garden Live Journal</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight">{post}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-slate">Practical Garden Live guidance for premium homes, offices, nurseries and managed green spaces.</p>
              <Button asChild variant="secondary" className="mt-6 rounded-full">
                <Link href="/blog">Read Blog</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
      <FaqSection />
    </PublicChrome>
  );
}

export function TestimonialsPage() {
  return (
    <PublicChrome>
      <TestimonialsBlock />
      <EnquirySection title="Experience Garden Live care" description="Book a visit and see how a premium digital garden membership changes everyday greenery." />
    </PublicChrome>
  );
}

export function ContactPage({ booking = false }: ContactPageProps = {}) {
  return (
    <PublicChrome>
      <Hero
        eyebrow={booking ? "Book Garden Visit" : "Contact Garden Live"}
        title={booking ? "Schedule your Garden Live survey, visit or consultation." : "Book a visit, request a proposal or speak with the Garden Live team."}
        description={booking ? "Share your city, garden type, service need and preferred time. Garden Live will recommend the right survey, consultation or care visit." : "Connect for landscaping, plant nursery, maintenance, dedicated gardener, memberships, AI Plant Doctor, QR Plant Passport and corporate solutions."}
        image={img.home}
        primaryLabel={booking ? "Submit Visit Request" : "Book Garden Visit"}
        primaryHref={booking ? "#garden-live-enquiry" : "/book-garden-visit"}
        secondaryLabel="WhatsApp Garden Live"
        secondaryHref="https://wa.me/919999999999"
      />
      <section id="garden-live-enquiry" className="py-24">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactCards />
          <EnquiryForm booking={booking} />
        </div>
      </section>
      <MapSection />
    </PublicChrome>
  );
}
