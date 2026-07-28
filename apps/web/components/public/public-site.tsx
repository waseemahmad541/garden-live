import { EnquiryForm } from "@/components/public/enquiry-form";
import { img, pageConfigs, type PageConfig, brandLine } from "@/components/public/v4-public-data";
import {
  BeforeAfter,
  ContactCards,
  ContentGrid,
  DashboardPreview,
  EnquirySection,
  FaqSection,
  Hero,
  HomeExperience,
  HighlightGrid,
  MapSection,
  Process,
  ProjectGallery,
  PublicChrome,
  Stats,
  TestimonialsBlock
} from "@/components/public/v4-public-sections";

export { pageConfigs, PublicChrome };

export function HomePublicPage() {
  return <PublicChrome><HomeExperience /></PublicChrome>;
}

export function AboutPublicPage() {
  return <PublicChrome><Hero eyebrow="About Garden Live" title="A garden company built with the precision of a technology platform." description="Garden Live organizes garden ownership through memberships, AI care, accountable maintenance, curated products, QR records and premium delivery." image={img.villa} primaryLabel="Book Garden Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><ContentGrid /><DashboardPreview /><EnquirySection title="Start your Garden Live journey" description="Share your space and goals. Garden Live will define the right service path." /></PublicChrome>;
}

export function ServicesPublicPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Services" title="A complete luxury garden ecosystem, not a list of services." description="Nursery supply, landscape design, maintenance, dedicated gardeners, AI diagnosis, QR passports, store products and corporate solutions." image={img.resort} primaryLabel="Book Consultation" secondaryLabel="View Gallery" secondaryHref="/gallery" /><BeforeAfter /><Process steps={["Consultation", "Survey", "Recommendation", "Approval", "Execution", "Digital Records"]} /><ProjectGallery /><FaqSection /></PublicChrome>;
}

export function PublicPage({ config }: { config: PageConfig }) {
  return <PublicChrome><Hero eyebrow={config.eyebrow} title={config.title} description={config.description} image={config.image} primaryLabel={config.primaryCta} secondaryLabel={config.secondaryCta} secondaryHref={config.secondaryHref} /><Stats stats={config.stats} /><HighlightGrid highlights={config.highlights} /><ContentGrid sections={config.sections} /><Process steps={config.process} /><ProjectGallery /><FaqSection /><EnquirySection title={`Start with ${config.eyebrow}`} description="Share your location, space type and requirement. Garden Live will recommend the right next step." /><MapSection /></PublicChrome>;
}

export function GalleryPage() {
  return <PublicChrome><Hero eyebrow="Gallery" title="Premium gardens, nurseries, rooftops and resort landscapes." description="Explore terrace gardens, living walls, luxury villa work, nursery selections, plant healthcare and premium garden products." image={img.hotel} primaryLabel="Book Visit" secondaryLabel="View Projects" secondaryHref="/projects" /><ProjectGallery /><BeforeAfter /><EnquirySection title="Make your garden part of the Garden Live story" description="Book a survey and let Garden Live design, maintain and document your transformation." /></PublicChrome>;
}

export function ProjectsPage() {
  return <PublicChrome><Hero eyebrow="Projects Portfolio" title="Premium garden projects with every step documented." description="Garden Live tracks survey, quotation, approval, work orders, media, execution, handover and maintenance." image={img.villa} primaryLabel="Start Project" secondaryLabel="Corporate Solutions" secondaryHref="/corporate-solutions" /><ProjectGallery /><BeforeAfter /><EnquirySection title="Plan a Garden Live project" description="Share your location and requirement. Garden Live will guide survey, quotation, approval and execution." /></PublicChrome>;
}

export function TestimonialsPage({ compact = false }: { compact?: boolean }) {
  return <TestimonialsBlock compact={compact} />;
}

export function BlogPage() {
  return <PublicChrome><Hero eyebrow="Garden Live Blog" title="Care guides and operating notes for the future of gardens." description="Read insights on digital memberships, terrace gardens, AI plant health, Green Promise, nursery selection, corporate greenery and maintenance." image={img.night} primaryLabel="Book Visit" secondaryLabel="Explore Services" secondaryHref="/services" /><ContentGrid /><ProjectGallery /></PublicChrome>;
}

export function ContactPage({ booking = false }: { booking?: boolean }) {
  return <PublicChrome><Hero eyebrow={booking ? "Book Garden Visit" : "Contact Garden Live"} title={booking ? "Schedule your Garden Live survey, visit or consultation." : "Talk to Garden Live about your garden, project, membership or partnership."} description={`Share your city, garden type, service need and preferred time. ${brandLine} can help with memberships, landscaping, nursery, maintenance, AI Plant Doctor, Garden Store and corporate solutions.`} image={img.home2} primaryLabel={booking ? "Submit Visit Request" : "Send Enquiry"} secondaryLabel="WhatsApp Garden Live" secondaryHref="https://wa.me/919999999999?text=I%20want%20to%20book%20a%20Garden%20Live%20visit" /><section className="gl-reveal py-20"><div className="gl-container grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"><ContactCards /><EnquiryForm booking={booking} /></div></section><MapSection /><FaqSection /></PublicChrome>;
}
