import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Search, Share2 } from "lucide-react";
import { Badge, Button, SectionHeading } from "@/components";
import { blogPosts, findBlogPost, findProject, projectItems } from "@/components/public/public-content";
import { FaqSection, Hero, PublicChrome } from "@/components/public/v4-public-sections";
import { img } from "@/components/public/v4-public-data";

type BlogPost = NonNullable<ReturnType<typeof findBlogPost>>;
type ProjectItem = NonNullable<ReturnType<typeof findProject>>;

const policyContent = {
  "privacy-policy": {
    eyebrow: "Privacy Policy",
    title: "Garden Live protects customer, garden and service data with care.",
    description: "This policy explains how Garden Live collects and uses enquiry, booking, membership and service information.",
    sections: [
      ["Information we collect", "We may collect name, phone, email, address, garden details, service preferences, plant photos, visit records and payment references needed to provide Garden Live services."],
      ["How we use information", "We use information to respond to enquiries, schedule visits, manage memberships, provide plant care, improve services, send reminders and maintain customer support records."],
      ["Data sharing", "Garden Live shares information only with authorized team members, service providers and partners required to deliver requested services."],
      ["Customer choices", "Customers can request correction or deletion of personal information where legally and operationally possible by contacting Garden Live."]
    ]
  },
  terms: {
    eyebrow: "Terms of Service",
    title: "Terms for using Garden Live public website and services.",
    description: "These terms cover enquiries, bookings, memberships, garden services, public website content and customer responsibilities.",
    sections: [
      ["Service scope", "Garden Live provides premium garden memberships, landscaping, maintenance, nursery, AI Plant Doctor, QR Plant Passport and related green services subject to availability."],
      ["Bookings", "Visit requests are confirmed after Garden Live reviews location, timing, service need and team availability."],
      ["Customer responsibility", "Customers should provide accurate contact, location, access, water, sunlight and garden information for reliable service planning."],
      ["Website use", "Public website content is provided for information and should not be treated as a final diagnosis, quotation or legal guarantee."]
    ]
  },
  "refund-policy": {
    eyebrow: "Refund Policy",
    title: "Clear refund guidance for Garden Live bookings and services.",
    description: "Refunds depend on service status, visit scheduling, product fulfilment and approved membership terms.",
    sections: [
      ["Service bookings", "If a paid visit is cancelled before team allocation or site work begins, refund eligibility may be reviewed by Garden Live support."],
      ["Memberships", "Membership refund or adjustment requests are reviewed according to plan usage, visits completed, benefits consumed and service period."],
      ["Products", "Nursery and store product refunds depend on product condition, delivery status and issue verification."],
      ["How to request", "Contact Garden Live with order, payment or booking details so the support team can review the case."]
    ]
  },
  "shipping-policy": {
    eyebrow: "Shipping Policy",
    title: "Shipping and delivery information for Garden Live products.",
    description: "This policy applies to plants, pots, fertilizers, tools and Garden Store items when commerce fulfilment is active.",
    sections: [
      ["Delivery areas", "Delivery availability depends on city, product type, nursery stock, logistics and plant handling requirements."],
      ["Live plants", "Plants require careful packaging and delivery planning. Some plant products may only be available through local Garden Live fulfilment."],
      ["Delivery timelines", "Estimated timelines are shared after order confirmation and may vary because of weather, plant availability or route planning."],
      ["Support", "For delivery questions, customers can contact Garden Live with order and address details."]
    ]
  }
} as const;

export function PolicyPage({ type }: { type: keyof typeof policyContent }) {
  const page = policyContent[type];
  return (
    <PublicChrome>
      <Hero eyebrow={page.eyebrow} title={page.title} description={page.description} image={img.home2} primaryLabel="Contact Garden Live" primaryHref="/contact" secondaryLabel="View FAQs" secondaryHref="/faqs" />
      <section className="py-20">
        <div className="gl-container grid gap-5 lg:grid-cols-2">
          {page.sections.map(([title, description]) => (
            <article key={title} className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)] backdrop-blur-xl">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-slate">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <FaqSection />
    </PublicChrome>
  );
}

export function CareersPage() {
  const roles = ["Landscape Designer", "Senior Gardener", "Customer Success Executive", "Nursery Operations Partner"];
  return (
    <PublicChrome>
      <Hero eyebrow="Careers" title="Build India's most trusted AI garden membership company." description="Garden Live is hiring people who care about premium service, plants, design, technology and customer trust." image={img.campus} primaryLabel="Apply by Email" primaryHref="mailto:careers@gardenlive.in" secondaryLabel="Explore Services" secondaryHref="/services" />
      <section className="py-20">
        <div className="gl-container">
          <SectionHeading eyebrow="Open Tracks" title="Join the Garden Live team." description="Send your profile, city and preferred role to careers@gardenlive.in." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {roles.map((role) => (
              <article key={role} className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(16,67,38,0.08)]">
                <BriefcaseBusiness className="h-6 w-6 text-botanical-green" aria-hidden />
                <h2 className="mt-5 text-2xl font-semibold">{role}</h2>
                <p className="mt-3 text-sm leading-7 text-neutral-slate">Work with customers, plants, field teams and technology to make premium greenery more reliable.</p>
                <Button asChild className="mt-5"><Link href={`mailto:careers@gardenlive.in?subject=${encodeURIComponent(role)}`}>Apply Now</Link></Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}

export function FaqsPage() {
  return (
    <PublicChrome>
      <Hero eyebrow="FAQs" title="Answers before your garden goes live." description="Find answers about memberships, AI Plant Doctor, QR Plant Passport, bookings, maintenance, store and Green Promise." image={img.passport} primaryLabel="Book Free Visit" primaryHref="/book-garden-visit" secondaryLabel="Contact" secondaryHref="/contact" />
      <FaqSection />
    </PublicChrome>
  );
}

export function BlogListingPage() {
  return (
    <PublicChrome>
      <Hero eyebrow="Garden Live Blog" title="Care guides and operating notes for the future of gardens." description="Read insights on digital memberships, terrace gardens, AI plant health, Green Promise, nursery selection, and corporate greenery." image={img.night} primaryLabel="Book Visit" primaryHref="/book-garden-visit" secondaryLabel="Explore Services" secondaryHref="/services" />
      <section className="py-20">
        <div className="gl-container">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Journal" title="Latest Garden Live articles." description="Search by topic, explore categories and open detailed guides." />
            <form className="flex rounded-full border border-white bg-white/80 p-1 shadow-glSm" action="/blog">
              <label className="sr-only" htmlFor="blog-search">Search blog</label>
              <input id="blog-search" name="q" placeholder="Search blog" className="min-w-0 bg-transparent px-4 text-sm outline-none" />
              <button className="grid h-10 w-10 place-items-center rounded-full bg-botanical-green text-white" type="submit" aria-label="Search blog"><Search className="h-4 w-4" /></button>
            </form>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">{["All", "Membership", "AI Plant Care", "Landscaping"].map((category) => <span key={category} className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-botanical-green">{category}</span>)}</div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}

export function BlogDetailPage({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <PublicChrome>
      <Hero eyebrow={post.category} title={post.title} description={post.excerpt} image={post.image} primaryLabel="Book Free Visit" primaryHref="/book-garden-visit" secondaryLabel="Share Article" secondaryHref={`https://wa.me/?text=${encodeURIComponent(post.title + " https://gardenlive.in/blog/" + post.slug)}`} />
      <article className="py-20">
        <div className="gl-container max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-neutral-slate"><Badge tone="info">{post.category}</Badge><span>{post.date}</span><span>{post.readTime}</span><Link href={`https://wa.me/?text=${encodeURIComponent(post.title + " https://gardenlive.in/blog/" + post.slug)}`} className="inline-flex items-center gap-2 font-semibold text-botanical-green"><Share2 className="h-4 w-4" />Share</Link></div>
          <div className="space-y-6 text-lg leading-9 text-neutral-slate">{post.body.map((para) => <p key={para}>{para}</p>)}</div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div>
        </div>
      </article>
    </PublicChrome>
  );
}

export function ProjectsListingPage() {
  return (
    <PublicChrome>
      <Hero eyebrow="Projects Portfolio" title="Premium garden projects with every step documented." description="Garden Live tracks survey, quotation, approval, work orders, media, execution, handover and maintenance." image={img.villa} primaryLabel="Start Project" primaryHref="/book-garden-visit" secondaryLabel="Corporate Solutions" secondaryHref="/corporate-solutions" />
      <section className="py-20"><div className="gl-container grid gap-5 lg:grid-cols-3">{projectItems.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></section>
    </PublicChrome>
  );
}

export function ProjectDetailPage({ project }: { project: ProjectItem }) {
  return (
    <PublicChrome>
      <Hero eyebrow={project.category} title={project.title} description={project.summary} image={project.image} primaryLabel="Book Similar Project" primaryHref="/book-garden-visit" secondaryLabel="View Projects" secondaryHref="/projects" />
      <section className="py-20">
        <div className="gl-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Badge tone="success">{project.location}</Badge>
            <h2 className="mt-5 text-4xl font-semibold">Project Highlights</h2>
            <div className="mt-8 grid gap-3">{project.highlights.map((item) => <p key={item} className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 font-semibold"><CheckCircle2 className="h-5 w-5 text-botanical-green" />{item}</p>)}</div>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] shadow-glLg"><Image src={project.image} alt={project.title} fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" /></div>
        </div>
      </section>
    </PublicChrome>
  );
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_18px_60px_rgba(16,67,38,0.08)] transition hover:-translate-y-1">
      <div className="relative h-64"><Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" /></div>
      <div className="p-6"><Badge tone="premium">{post.category}</Badge><h2 className="mt-4 text-2xl font-semibold">{post.title}</h2><p className="mt-3 text-sm leading-7 text-neutral-slate">{post.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">Read Blog <ArrowRight className="h-4 w-4" /></span></div>
    </Link>
  );
}

function ProjectCard({ project }: { project: (typeof projectItems)[number] }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_18px_60px_rgba(16,67,38,0.08)] transition hover:-translate-y-1">
      <div className="relative h-72"><Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" /></div>
      <div className="p-6"><Badge tone="success">{project.category}</Badge><h2 className="mt-4 text-2xl font-semibold">{project.title}</h2><p className="mt-3 text-sm leading-7 text-neutral-slate">{project.summary}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-botanical-green">View Project <ArrowRight className="h-4 w-4" /></span></div>
    </Link>
  );
}
