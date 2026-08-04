import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { footerGroups, navItems, pageConfigs } from "@/components/public/v4-public-data";
import { LaunchFloatingActions } from "@/components/public/public-launch-floating-actions";
import {
  AiDemoSection,
  BeforeAfterSection,
  DashboardPreviewSection,
  EnquirySection,
  FaqSection,
  FloatingActions,
  GardenStoreSection,
  Hero,
  HomeHeroSection,
  IotSection,
  MembershipSection,
  ModulesSection,
  ProjectsSection,
  TestimonialsBlock
} from "@/components/public/v4-public-sections";

function ContactSection() {
  return (
    <EnquirySection
      title="Book a Garden Live visit"
      description="Share your space, city and service need. Garden Live will recommend the right premium garden path."
    />
  );
}

function TestimonialsSection() {
  return <TestimonialsBlock compact />;
}

export function PublicChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f7f0] text-botanical-black">
      <Navbar items={navItems} ctaLabel="Book Free Visit" ctaHref="/book-garden-visit" className="fixed inset-x-0 top-0 z-50 border-white/10 bg-white/12 text-white shadow-none backdrop-blur-2xl [&_a]:text-white/82 [&_a:hover]:text-white [&_button]:border-white/20 [&_button]:bg-white/12 [&_button]:text-white [&_span]:text-white" />
      {children}
      <Footer groups={footerGroups} />
      <FloatingActions />
      <LaunchFloatingActions />
    </div>
  );
}

export function HomePage() {
  return (
    <PublicChrome>
      <HomeHeroSection />
      <ModulesSection />
      <AiDemoSection />
      <MembershipSection />
      <ProjectsSection />
      <BeforeAfterSection />
      <IotSection />
      <DashboardPreviewSection />
      <GardenStoreSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </PublicChrome>
  );
}

function GenericPage({ slug }: { slug: keyof typeof pageConfigs }) {
  const page = pageConfigs[slug];
  return (
    <PublicChrome>
      <Hero eyebrow={page.eyebrow} title={page.title} description={page.description} image={page.image} primaryLabel={page.primaryCta} primaryHref="/book-garden-visit" secondaryLabel={page.secondaryCta} secondaryHref={page.secondaryHref ?? "/services"} />
      <ModulesSection />
      <AiDemoSection />
      <MembershipSection />
      <ProjectsSection />
      <FaqSection />
      <ContactSection />
    </PublicChrome>
  );
}

export function AboutPage() { return <GenericPage slug="corporate-solutions" />; }
export function ServicesPage() { return <GenericPage slug="landscaping" />; }
export function LandscapingPage() { return <GenericPage slug="landscaping" />; }
export function PlantNurseryPage() { return <GenericPage slug="plant-nursery" />; }
export function GardenMaintenancePage() { return <GenericPage slug="garden-maintenance" />; }
export function DedicatedGardenerPage() { return <GenericPage slug="dedicated-gardener" />; }
export function MembershipPlansPage() { return <GenericPage slug="membership-plans" />; }
export function AiPlantDoctorPage() { return <GenericPage slug="ai-plant-doctor" />; }
export function PlantScannerPage() { return <GenericPage slug="plant-scanner" />; }
export function QrPlantPassportPage() { return <GenericPage slug="qr-plant-passport" />; }
export function CorporateSolutionsPage() { return <GenericPage slug="corporate-solutions" />; }
export function GalleryPage() { return <GenericPage slug="landscaping" />; }
export function ProjectsPage() { return <GenericPage slug="landscaping" />; }
export function BlogPage() { return <GenericPage slug="garden-health-reports" />; }
export function GardenStorePage() { return <GenericPage slug="garden-store" />; }
export function GardenHealthReportsPage() { return <GenericPage slug="garden-health-reports" />; }
export function TestimonialsPage() { return <PublicChrome><TestimonialsSection /><ContactSection /></PublicChrome>; }
