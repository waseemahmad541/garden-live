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
  Navbar,
  ProductCard,
  SectionHeading,
  StatisticsCard
} from "@/components";
import {
  Activity,
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Droplets,
  FlaskConical,
  HeartPulse,
  ImagePlus,
  Leaf,
  MessageCircle,
  Microscope,
  MoveUpRight,
  Pill,
  QrCode,
  ScanLine,
  SearchCheck,
  ShieldAlert,
  ShoppingBag,
  Sparkles,
  Sprout,
  UploadCloud
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Plant Doctor",
  description:
    "Use Garden Live AI Plant Doctor to upload a plant photo, scan plant health, preview disease and pest detection, and get water, fertilizer, medicine, and treatment recommendations.",
  openGraph: {
    title: "Garden Live AI Plant Doctor",
    description:
      "A premium AI plant healthcare interface for disease detection, pest detection, plant health score, treatment timelines, products, and expert consultation.",
    url: "https://gardenlive.in/plant-doctor",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Garden Live AI Plant Doctor premium plant scan interface"
      }
    ]
  }
};

const navItems = [
  { label: "Scan", href: "#scan" },
  { label: "Diagnosis", href: "#diagnosis" },
  { label: "Treatment", href: "#treatment" },
  { label: "Passport", href: "#passport" },
  { label: "Expert", href: "#expert" }
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
    title: "Plant Doctor",
    links: [
      { label: "Upload Photo", href: "#scan" },
      { label: "Diagnosis", href: "#diagnosis" },
      { label: "Treatment", href: "#treatment" }
    ]
  },
  {
    title: "Garden Care",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Plant Passport", href: "#passport" },
      { label: "Expert Help", href: "#expert" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Warranty", href: "/green-promise" }
    ]
  }
];

const diagnosisCards = [
  {
    title: "Disease Detection",
    description: "Preview fungal spots, yellowing patterns, root stress, blight indicators, and leaf discoloration signals.",
    icon: <Microscope className="h-5 w-5" aria-hidden />,
    metric: "92%",
    label: "confidence preview"
  },
  {
    title: "Pest Detection",
    description: "Identify visible pest damage, bite marks, sticky residue, webbing, leaf curl, and infestation risk.",
    icon: <ShieldAlert className="h-5 w-5" aria-hidden />,
    metric: "Low",
    label: "risk level"
  },
  {
    title: "Plant Health Score",
    description: "A simple score combines leaf condition, watering risk, pest signals, nutrition, and care consistency.",
    icon: <HeartPulse className="h-5 w-5" aria-hidden />,
    metric: "84",
    label: "garden-ready score"
  }
];

const recommendationCards = [
  {
    title: "Water Recommendation",
    description: "Adjust watering based on leaf texture, soil condition, season, pot type, and sunlight exposure.",
    icon: <Droplets className="h-5 w-5" aria-hidden />,
    action: "Water every 2-3 days"
  },
  {
    title: "Fertilizer Recommendation",
    description: "Suggest balanced nutrition, organic feed, micronutrient support, or recovery fertilizer.",
    icon: <FlaskConical className="h-5 w-5" aria-hidden />,
    action: "Use mild NPK support"
  },
  {
    title: "Medicine Recommendation",
    description: "Recommend safe treatment direction for pest, fungal, or bacterial stress before escalation.",
    icon: <Pill className="h-5 w-5" aria-hidden />,
    action: "Neem-based care first"
  }
];

const treatmentTimeline = [
  {
    day: "Day 1",
    title: "Isolate and inspect",
    description: "Move the plant away from healthy plants and capture clear leaf, stem, and soil photos."
  },
  {
    day: "Day 2-3",
    title: "Apply first treatment",
    description: "Follow the suggested water, fertilizer, or medicine direction with conservative dosage."
  },
  {
    day: "Day 7",
    title: "Rescan plant",
    description: "Upload an updated photo to compare leaf color, pest marks, and recovery progress."
  },
  {
    day: "Day 14",
    title: "Expert review if needed",
    description: "Escalate to a plant expert when symptoms persist, spread, or become severe."
  }
];

const faqs = [
  {
    question: "Does this page perform real AI diagnosis now?",
    answer:
      "No. This is the frontend UI for the AI Plant Doctor experience. Backend upload, model analysis, and report generation will be added in a later implementation phase."
  },
  {
    question: "What kind of photo should a customer upload?",
    answer:
      "A clear photo of the affected leaf, stem, soil surface, and whole plant helps produce better diagnosis once backend AI logic is connected."
  },
  {
    question: "Can AI replace a plant expert?",
    answer:
      "No. AI guidance is advisory. Serious, unclear, or recurring plant issues should be reviewed by a Garden Live expert or gardener."
  },
  {
    question: "Will reports connect to QR Plant Passport?",
    answer:
      "Yes. The planned workflow stores diagnosis reports, treatment timelines, and follow-up scans inside the plant passport history."
  }
];

export default function PlantDoctorPage() {
  return (
    <main className="bg-neutral-cloud">
      <Navbar items={navItems} ctaLabel="Upload Photo" ctaHref="#scan" />

      <section id="scan" className="relative overflow-hidden bg-botanical-black text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1800&q=85"
            alt="Premium green plants prepared for AI plant doctor scan"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-52"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-botanical-black via-botanical-black/86 to-botanical-black/20" />
        </div>
        <div className="gl-container relative grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:py-32">
          <div className="gl-rise">
            <Badge tone="info">AI Plant Doctor</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[0] sm:text-5xl lg:text-6xl">
              Premium AI healthcare for every plant in your garden.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Upload a plant photo, drag and drop symptoms, scan plant health, and preview AI diagnosis for
              disease, pests, watering, fertilizer, medicine, and treatment planning.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" leftIcon={<UploadCloud className="h-4 w-4" aria-hidden />}>
                <Link href="#upload">Upload Plant Photo</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" leftIcon={<ScanLine className="h-4 w-4" aria-hidden />}>
                <Link href="#ai-scan">Scan Plant</Link>
              </Button>
            </div>
          </div>

          <div id="upload" className="gl-rise gl-delay-1 rounded-2xl border border-white/14 bg-white/10 p-4 shadow-glLg backdrop-blur-xl">
            <div className="rounded-xl border border-dashed border-white/30 bg-white/92 p-5 text-botanical-black">
              <div className="relative min-h-[260px] overflow-hidden rounded-xl bg-neutral-mist">
                <Image
                  src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=85"
                  alt="Plant photo preview for AI diagnosis"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-5 rounded-xl border border-white/70" />
                <div className="absolute left-5 top-5 rounded-gl bg-white/92 px-3 py-2 text-xs font-semibold shadow-glSm">
                  AI Diagnosis preview
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ImagePlus className="h-4 w-4 text-botanical-green" aria-hidden />
                    Drag & Drop plant image
                  </div>
                  <p className="mt-1 text-sm leading-6 text-neutral-slate">
                    PNG or JPG preview. Backend upload and real AI logic will be connected later.
                  </p>
                </div>
                <Button variant="secondary" leftIcon={<UploadCloud className="h-4 w-4" aria-hidden />}>
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-scan" className="py-16 sm:py-20">
        <div className="gl-container grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#DDE5DC] bg-botanical-black shadow-glLg">
            <Image
              src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85"
              alt="AI scan animation preview over plant leaves"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover opacity-75"
            />
            <div className="absolute inset-8 rounded-2xl border border-accent-sky/70" />
            <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-accent-sky shadow-[0_0_32px_rgba(75,115,255,0.95)] gl-fade" />
            <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/92 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-botanical-black">
                  <Bot className="h-4 w-4 text-accent-iris" aria-hidden />
                  AI Scan Animation
                </div>
                <Badge tone="info">Scanning</Badge>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-mist">
                <div className="h-2 w-3/4 rounded-full bg-accent-iris" />
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="AI Loading Animation"
              title="A calm scan experience that feels precise, not gimmicky."
              description="The interface previews how Garden Live will guide customers from plant photo upload to AI report generation, with clear progress and human-readable findings."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <StatisticsCard label="Scan stages" value="4" trend="Image, symptoms, risk, care" trendDirection="up" icon={<Activity className="h-4 w-4" aria-hidden />} />
              <StatisticsCard label="Report style" value="Clear" trend="Built for action" trendDirection="up" icon={<SearchCheck className="h-4 w-4" aria-hidden />} />
            </div>
          </div>
        </div>
      </section>

      <section id="diagnosis" className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="AI Diagnosis"
            title="Disease, pest, and health intelligence in one report."
            description="Garden Live AI Plant Doctor is designed to translate visual plant symptoms into understandable care priorities."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {diagnosisCards.map((card) => (
              <FeatureCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {diagnosisCards.map((card) => (
              <StatisticsCard key={card.title} label={card.title} value={card.metric} trend={card.label} trendDirection="up" icon={card.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Recommendations"
            title="Water, fertilizer, and medicine suggestions designed for safe next steps."
            description="Recommendations are presented as clear actions customers can understand before buying products or speaking to an expert."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {recommendationCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-[#E3E8E2] bg-white p-6 shadow-glXs">
                <div className="flex h-12 w-12 items-center justify-center rounded-gl bg-botanical-mint text-botanical-green">
                  {card.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-botanical-black">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-slate">{card.description}</p>
                <Badge tone="success" className="mt-5">{card.action}</Badge>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="treatment" className="bg-botanical-black py-16 text-white sm:py-20">
        <div className="gl-container">
          <SectionHeading
            eyebrow="Treatment Timeline"
            title="A recovery plan customers can follow without confusion."
            description="Plant care becomes easier when each treatment step has timing, evidence, and a follow-up scan."
            className="[&_h2]:text-white [&_p]:text-white/68"
          />
          <div className="mt-10 grid gap-4">
            {treatmentTimeline.map((item) => (
              <div key={item.day} className="grid gap-4 rounded-gl border border-white/10 bg-white/[0.06] p-5 sm:grid-cols-[140px_1fr]">
                <p className="text-sm font-semibold text-accent-marigold">{item.day}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="passport" className="bg-white py-16 sm:py-20">
        <div className="gl-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Plant Passport Preview"
              title="Every diagnosis belongs in the plant's long-term record."
              description="AI reports, treatment timelines, plant health score, scans, expert notes, and recommended products can become part of the QR Plant Passport journey."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="Diagnosis history"
                description="Each scan can attach to the plant timeline for future comparison."
                icon={<CalendarClock className="h-5 w-5" aria-hidden />}
              />
              <FeatureCard
                title="QR-ready record"
                description="Gardeners and experts can scan the passport and understand past care context."
                icon={<QrCode className="h-5 w-5" aria-hidden />}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-[#E3E8E2] bg-neutral-cloud p-4 shadow-glMd">
            <div className="rounded-xl bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone="success">Passport preview</Badge>
                  <h3 className="mt-4 text-2xl font-semibold text-botanical-black">Monstera Deliciosa</h3>
                  <p className="mt-2 text-sm text-neutral-slate">Plant ID GL-PLANT-2048</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-gl bg-botanical-black text-white">
                  <QrCode className="h-8 w-8" aria-hidden />
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {["Health score updated to 84", "Pest risk low", "Water schedule adjusted", "Treatment timeline created"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-gl bg-neutral-cloud px-3 py-2 text-sm text-neutral-charcoal">
                    <CheckCircle2 className="h-4 w-4 text-status-success" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="gl-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Buy Recommended Products"
              title="Treatment-ready products matched to the diagnosis."
              description="The future AI workflow can recommend safe care products from the Garden Store based on detected symptoms."
            />
            <Button asChild variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              <Link href="/garden-store">View store</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              name="Organic Neem Plant Care Spray"
              category="Medicine"
              price="Rs. 399"
              rating={4.9}
              badge="Recommended"
              imageUrl="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85"
            />
            <ProductCard
              name="Balanced Plant Nutrition Mix"
              category="Fertilizer"
              price="Rs. 699"
              rating={4.8}
              imageUrl="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=85"
            />
            <ProductCard
              name="Moisture Meter Care Tool"
              category="Watering"
              price="Rs. 899"
              rating={4.7}
              imageUrl="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=85"
            />
          </div>
        </div>
      </section>

      <section id="expert" className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <CTABanner
            title="Talk to a Plant Expert when AI needs a human eye."
            description="Escalate critical, unclear, or recurring plant problems to Garden Live experts for chat, call, video, or visit-based consultation."
            action={
              <Button asChild variant="secondary" leftIcon={<MessageCircle className="h-4 w-4" aria-hidden />} rightIcon={<MoveUpRight className="h-4 w-4" aria-hidden />}>
                <Link href="/contact">Request expert help</Link>
              </Button>
            }
          />
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-20">
        <div className="gl-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Important notes before real AI logic is connected."
            description="This page is the frontend product experience. Diagnosis processing will be implemented later with backend services."
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="gl-container">
          <CTABanner
            title="Give every plant a smarter care journey."
            description="Start with AI Plant Doctor, connect diagnosis to QR Plant Passport, and turn treatment into a clear Garden Live care record."
            action={
              <Button asChild variant="secondary" rightIcon={<MoveUpRight className="h-4 w-4" aria-hidden />}>
                <Link href="#scan">Upload Plant Photo</Link>
              </Button>
            }
          />
        </div>
      </section>

      <Footer groups={footerGroups} />
    </main>
  );
}
