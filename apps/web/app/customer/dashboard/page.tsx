import type { Metadata } from "next";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  CalendarClock,
  CalendarDays,
  Camera,
  ChevronRight,
  CloudSun,
  Coins,
  CreditCard,
  Download,
  Droplets,
  Flower2,
  Gift,
  Headphones,
  HeartPulse,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Ticket,
  TreePalm,
  UploadCloud,
  UserRound,
  Users,
  Video,
  Wand2,
  Wrench,
  Zap
} from "lucide-react";
import { Badge, Button, Input } from "@/components";
import { LiveDataPanel } from "@/components/platform/live-data-panel";

export const metadata: Metadata = {
  title: "Customer Dashboard | Garden Live",
  description:
    "Premium Garden Live customer dashboard for garden health, plant passports, AI Plant Doctor, bookings, membership, store, rewards, profile, and support.",
  robots: {
    index: false,
    follow: false
  }
};

const customer = {
  name: "Ananya Rao",
  plan: "Premium Garden",
  property: "Jubilee Hills Residence",
  renewal: "12 Aug 2026",
  healthScore: 88,
  coins: 2840,
  nextVisit: "22 Jul, 9:30 AM",
  gardener: "Ravi Kumar"
};

const navItems = [
  { label: "Home", href: "#dashboard-home", icon: Home },
  { label: "My Garden", href: "#my-garden", icon: Leaf },
  { label: "AI Doctor", href: "#ai-plant-doctor", icon: Bot },
  { label: "Booking", href: "#service-booking", icon: CalendarDays },
  { label: "Membership", href: "#membership", icon: CreditCard },
  { label: "Store", href: "#garden-store", icon: ShoppingBag },
  { label: "Notifications", href: "#notifications", icon: Bell },
  { label: "Rewards", href: "#rewards", icon: Coins },
  { label: "Profile", href: "#profile", icon: UserRound },
  { label: "Support", href: "#support", icon: Headphones }
];

const plants = [
  {
    name: "Areca Palm",
    type: "Palm Collection",
    score: 91,
    water: "Every 2 days",
    fertilizer: "NPK liquid, Sunday",
    passport: "GL-PL-1042",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Monstera Deliciosa",
    type: "Indoor Plant",
    score: 86,
    water: "Twice weekly",
    fertilizer: "Organic compost, 28 Jul",
    passport: "GL-PL-1049",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Bougainvillea",
    type: "Flower Plant",
    score: 74,
    water: "Daily light mist",
    fertilizer: "Bloom booster, Friday",
    passport: "GL-PL-1056",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85"
  }
];

const aiReports = [
  { title: "Leaf yellowing detected", plant: "Areca Palm", severity: "Medium", action: "Increase deep watering and check drainage." },
  { title: "Mild pest activity", plant: "Bougainvillea", severity: "Low", action: "Apply neem spray after sunset for 3 days." },
  { title: "Nutrient window open", plant: "Monstera", severity: "Care", action: "Add organic compost during next maintenance visit." }
];

const bookings = [
  { title: "Book Garden Visit", detail: "Routine maintenance, pruning, soil check, plant cleaning.", icon: CalendarDays },
  { title: "Emergency Plant Care", detail: "Fast support for drooping, pests, heat stress, and fungus.", icon: AlertTriangle },
  { title: "Landscaping Consultation", detail: "Design consultation for terrace, villa, balcony, and commercial gardens.", icon: TreePalm },
  { title: "Dedicated Gardener", detail: "Fixed gardener allocation with premium scheduling and visit records.", icon: Wrench }
];

const storeCategories = [
  { name: "Plants", icon: Sprout, count: "120+" },
  { name: "Pots", icon: Flower2, count: "80+" },
  { name: "Fertilizers", icon: Droplets, count: "32" },
  { name: "Tools", icon: Wrench, count: "45" },
  { name: "Smart Garden Devices", icon: Zap, count: "18" }
];

const notifications = [
  { title: "Water reminder", time: "Today, 7:00 PM", icon: Droplets, tone: "text-sky-200" },
  { title: "Fertilizer reminder", time: "Friday morning", icon: Leaf, tone: "text-emerald-200" },
  { title: "Gardener arriving", time: "Tomorrow, 9:30 AM", icon: CalendarClock, tone: "text-amber-200" },
  { title: "Membership expiry", time: "Renews 12 Aug", icon: ShieldCheck, tone: "text-lime-200" }
];

const paymentHistory = [
  { id: "INV-GL-2931", date: "12 Jul 2026", amount: "Rs. 7,999", status: "Paid" },
  { id: "INV-GL-2828", date: "12 Jun 2026", amount: "Rs. 7,999", status: "Paid" },
  { id: "INV-GL-2704", date: "12 May 2026", amount: "Rs. 7,999", status: "Paid" }
];

const growthHistory = [
  { month: "Apr", value: 54 },
  { month: "May", value: 66 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 88 }
];

function GlassPanel({
  children,
  className = "",
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-[28px] border border-white/12 bg-white/[0.075] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[0] text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/70">{description}</p>
    </div>
  );
}

function MetricCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/60">{label}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-300/15 text-emerald-100">{icon}</span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-[0] text-white">{value}</p>
      <p className="mt-2 text-sm text-emerald-50/65">{detail}</p>
    </div>
  );
}

function HealthOrb({ score }: { score: number }) {
  return (
    <div className="relative mx-auto grid h-48 w-48 place-items-center rounded-full bg-emerald-300/10">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(#B7E66E ${score * 3.6}deg, rgba(255,255,255,0.12) 0deg)` }}
      />
      <div className="relative grid h-36 w-36 place-items-center rounded-full border border-white/12 bg-[#07150E]/95 shadow-[inset_0_1px_30px_rgba(183,230,110,0.16)]">
        <div className="text-center">
          <p className="text-5xl font-semibold text-white">{score}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Health</p>
        </div>
      </div>
    </div>
  );
}

function MiniBarChart() {
  return (
    <div className="flex h-36 items-end gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
      {growthHistory.map((item) => (
        <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative h-24 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-lime-300 to-emerald-200 shadow-[0_0_24px_rgba(183,230,110,0.45)]"
              style={{ height: `${item.value}%` }}
            />
          </div>
          <span className="text-xs font-medium text-emerald-50/60">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06120C] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(62,143,91,0.38),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(183,230,110,0.18),transparent_28%),linear-gradient(145deg,#031007_0%,#092015_42%,#020806_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-32px)] w-72 flex-col rounded-[28px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl xl:flex">
        <Link href="/" className="flex items-center gap-3 rounded-2xl px-2 py-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
            <Sprout className="h-6 w-6" aria-hidden />
          </span>
          <span>
            <span className="block text-base font-semibold text-white">Garden Live</span>
            <span className="block text-xs text-emerald-50/55">Customer Suite</span>
          </span>
        </Link>

        <nav className="mt-5 flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Customer dashboard navigation">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-lime-300 text-[#06120C] shadow-[0_12px_28px_rgba(183,230,110,0.24)]"
                    : "text-emerald-50/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
          <p className="text-sm font-semibold text-white">{customer.name}</p>
          <p className="mt-1 text-xs text-emerald-50/60">{customer.property}</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-xs text-emerald-50/70">
            <span>{customer.plan}</span>
            <Star className="h-4 w-4 text-lime-200" aria-hidden />
          </div>
        </div>
      </aside>

      <div className="xl:pl-[320px]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06120C]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Garden Live Customer Dashboard</p>
              <h1 className="mt-1 text-xl font-semibold tracking-[0] text-white sm:text-2xl">Welcome back, {customer.name}</h1>
            </div>
            <div className="hidden flex-1 justify-center px-6 lg:flex">
              <div className="w-full max-w-md">
                <Input
                  aria-label="Search dashboard"
                  placeholder="Search plants, invoices, bookings"
                  leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  className="border-white/10 bg-white/10 text-white placeholder:text-emerald-50/45"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="bg-white/10 text-white hover:bg-white/15" aria-label="Notifications">
                <Bell className="h-4 w-4" aria-hidden />
              </Button>
              <Button asChild className="bg-lime-300 text-[#06120C] hover:bg-lime-200">
                <Link href="#service-booking">Book Visit</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <LiveDataPanel endpoint="/api/customer/dashboard" title="Customer Dashboard Live API" />

          <section id="dashboard-home" className="grid gap-6 2xl:grid-cols-[1.35fr_0.65fr]">
            <GlassPanel className="relative min-h-[520px] overflow-hidden p-0">
              <Image
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1800&q=90"
                alt="Luxury Garden Live home garden"
                fill
                priority
                sizes="(min-width: 1536px) 58vw, 100vw"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06120C] via-[#06120C]/72 to-transparent" />
              <div className="relative flex min-h-[520px] flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <Badge className="border-white/15 bg-white/10 text-emerald-50">India&apos;s First AI Powered Digital Garden Membership Platform</Badge>
                  <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[0] text-white sm:text-6xl">
                    Your garden, managed like a premium living asset.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/75">
                    Garden health, plant passports, AI diagnosis, service visits, store orders, rewards, and expert support in one calm command center.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200" leftIcon={<CalendarDays className="h-4 w-4" aria-hidden />}>
                      Book Garden Visit
                    </Button>
                    <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Bot className="h-4 w-4" aria-hidden />}>
                      Run AI Scan
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard label="Membership" value={customer.plan} detail={`Renews ${customer.renewal}`} icon={<CreditCard className="h-4 w-4" aria-hidden />} />
                  <MetricCard label="Next Visit" value="Tomorrow" detail={`${customer.nextVisit} with ${customer.gardener}`} icon={<CalendarClock className="h-4 w-4" aria-hidden />} />
                  <MetricCard label="AI Reports" value="3" detail="2 care tasks due this week" icon={<Sparkles className="h-4 w-4" aria-hidden />} />
                </div>
              </div>
            </GlassPanel>

            <div className="grid gap-6">
              <GlassPanel>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-50/60">Garden Health Score</p>
                    <p className="mt-2 text-4xl font-semibold text-white">{customer.healthScore}/100</p>
                  </div>
                  <HealthOrb score={customer.healthScore} />
                </div>
                <div className="mt-5 rounded-2xl border border-lime-200/20 bg-lime-200/10 p-4">
                  <p className="text-sm font-semibold text-lime-100">Healthy with light pest watch</p>
                  <p className="mt-1 text-sm text-emerald-50/65">Bougainvillea needs neem spray. Areca Palm watering adjusted for warm weather.</p>
                </div>
              </GlassPanel>

              <GlassPanel>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-50/60">Weather Widget</p>
                    <p className="mt-2 text-4xl font-semibold text-white">29 C</p>
                    <p className="mt-1 text-sm text-emerald-50/60">Hyderabad, humid evening</p>
                  </div>
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-300/15 text-sky-100">
                    <CloudSun className="h-10 w-10" aria-hidden />
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {["Water tonight", "62% humidity", "Low pest risk"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/10 px-3 py-3 text-xs font-medium text-emerald-50/70">
                      {item}
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-4">
            <MetricCard label="Registered Plants" value="28" detail="24 healthy, 4 under care" icon={<Leaf className="h-4 w-4" aria-hidden />} />
            <MetricCard label="Garden Coins" value={customer.coins.toLocaleString("en-IN")} detail="320 earned this month" icon={<Coins className="h-4 w-4" aria-hidden />} />
            <MetricCard label="Open Tickets" value="0" detail="Support queue is clear" icon={<Headphones className="h-4 w-4" aria-hidden />} />
            <MetricCard label="Properties" value="2" detail="Home and farmhouse gardens" icon={<MapPin className="h-4 w-4" aria-hidden />} />
          </section>

          <GlassPanel id="my-garden">
            <SectionIntro
              eyebrow="My Garden"
              title="Registered plants, passports, schedules, and growth history"
              description="Every plant has photos, care records, QR Plant Passport, watering schedule, fertilizer schedule, and a measurable growth timeline."
            />
            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-4 md:grid-cols-3">
                {plants.map((plant) => (
                  <article key={plant.name} className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.075]">
                    <div className="relative aspect-[4/3]">
                      <Image src={plant.image} alt={plant.name} fill sizes="(min-width: 1024px) 24vw, 100vw" className="object-cover" />
                      <div className="absolute left-3 top-3 rounded-full bg-[#06120C]/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                        Score {plant.score}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/70">{plant.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{plant.name}</h3>
                      <div className="mt-4 space-y-2 text-sm text-emerald-50/68">
                        <p className="flex items-center gap-2"><QrCode className="h-4 w-4 text-lime-200" aria-hidden /> {plant.passport}</p>
                        <p className="flex items-center gap-2"><Droplets className="h-4 w-4 text-sky-200" aria-hidden /> {plant.water}</p>
                        <p className="flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-200" aria-hidden /> {plant.fertilizer}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="grid gap-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">Growth History</h3>
                  <p className="mt-2 text-sm text-emerald-50/60">Monthly garden improvement score after scheduled maintenance.</p>
                </div>
                <MiniBarChart />
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <h3 className="text-sm font-semibold text-white">Care Timeline</h3>
                  <div className="mt-4 space-y-3">
                    {["Before/after photos added", "Soil moisture improved", "Fertilizer applied", "QR Passport updated"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-emerald-50/70">
                        <span className="h-2 w-2 rounded-full bg-lime-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <GlassPanel id="ai-plant-doctor">
              <SectionIntro
                eyebrow="AI Plant Doctor"
                title="Upload, detect, treat, consult"
                description="Upload a plant photo to receive disease detection, pest detection, treatment recommendations, and expert consultation access."
              />
              <div className="rounded-[24px] border border-dashed border-lime-200/30 bg-lime-200/[0.07] p-6 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-lime-200" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-white">Upload plant photo</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/65">Drag and drop a close photo of leaves, stem, or soil for AI diagnosis.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200" leftIcon={<Camera className="h-4 w-4" aria-hidden />}>Choose Photo</Button>
                  <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Video className="h-4 w-4" aria-hidden />}>Expert Consultation</Button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Recent AI Reports</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Diagnosis and treatment plan</h2>
                </div>
                <Wand2 className="h-6 w-6 text-lime-200" aria-hidden />
              </div>
              <div className="space-y-3">
                {aiReports.map((report) => (
                  <div key={report.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{report.title}</p>
                        <p className="mt-1 text-sm text-emerald-50/60">{report.plant}</p>
                      </div>
                      <Badge className="border-white/15 bg-white/10 text-emerald-50">{report.severity}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-emerald-50/70">{report.action}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </section>

          <GlassPanel id="service-booking">
            <SectionIntro
              eyebrow="Service Booking"
              title="Book visits, emergency care, landscaping, and dedicated gardeners"
              description="A fast booking layer for routine care, urgent plant recovery, design consultation, and dedicated gardener subscriptions."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {bookings.map((booking) => {
                const Icon = booking.icon;
                return (
                  <article key={booking.title} className="group rounded-[22px] border border-white/10 bg-white/[0.075] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-300/15 text-lime-200">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{booking.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-emerald-50/65">{booking.detail}</p>
                    <Button variant="ghost" className="mt-5 w-full border border-white/15 bg-white/10 text-white hover:bg-white/15" rightIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>
                      Schedule
                    </Button>
                  </article>
                );
              })}
            </div>
          </GlassPanel>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <GlassPanel id="membership">
              <SectionIntro
                eyebrow="Membership"
                title="Plan, renewal, upgrades, payments, and invoices"
                description="Track your current plan, renewal status, upgrade path, payment history, and downloadable invoices."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard label="Current Plan" value={customer.plan} detail="8 visits per month" icon={<ShieldCheck className="h-4 w-4" aria-hidden />} />
                <MetricCard label="Renewal" value="12 Aug" detail="Auto-renew enabled" icon={<CreditCard className="h-4 w-4" aria-hidden />} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200">Upgrade Membership</Button>
                <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15">Renew Now</Button>
              </div>
            </GlassPanel>

            <GlassPanel>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Payment History</h2>
                <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Download className="h-4 w-4" aria-hidden />}>All invoices</Button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {paymentHistory.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 p-4 last:border-b-0 sm:grid-cols-[1fr_1fr_auto]">
                    <div>
                      <p className="text-sm font-semibold text-white">{invoice.id}</p>
                      <p className="mt-1 text-xs text-emerald-50/55">{invoice.date}</p>
                    </div>
                    <p className="hidden text-sm text-emerald-50/70 sm:block">{invoice.status}</p>
                    <p className="text-sm font-semibold text-lime-100">{invoice.amount}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </section>

          <GlassPanel id="garden-store">
            <SectionIntro
              eyebrow="Garden Store"
              title="Plants, pots, fertilizers, tools, and smart garden devices"
              description="Shop essentials recommended for your garden health, AI reports, seasonal needs, and membership benefits."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {storeCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.name} href="/garden-store" className="rounded-[22px] border border-white/10 bg-white/[0.075] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                    <Icon className="h-7 w-7 text-lime-200" aria-hidden />
                    <p className="mt-5 font-semibold text-white">{category.name}</p>
                    <p className="mt-1 text-sm text-emerald-50/55">{category.count} products</p>
                  </Link>
                );
              })}
            </div>
          </GlassPanel>

          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <GlassPanel id="notifications">
              <SectionIntro
                eyebrow="Notifications"
                title="Care reminders and visit alerts"
                description="Water reminders, fertilizer reminders, gardener arrival updates, and membership expiry alerts."
              />
              <div className="space-y-3">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.075] p-4">
                      <Icon className={`h-5 w-5 ${item.tone}`} aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-emerald-50/55">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>

            <GlassPanel id="rewards">
              <SectionIntro
                eyebrow="Rewards"
                title="Garden Coins, referrals, and coupons"
                description="Earn rewards through referrals, renewals, purchases, healthy garden activity, and service feedback."
              />
              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Garden Coins" value="2,840" detail="Worth Rs. 284 in rewards" icon={<Coins className="h-4 w-4" aria-hidden />} />
                <MetricCard label="Referral Program" value="3" detail="Friends invited" icon={<Users className="h-4 w-4" aria-hidden />} />
                <MetricCard label="Coupons" value="5" detail="Active offers" icon={<Ticket className="h-4 w-4" aria-hidden />} />
              </div>
              <div className="mt-5 rounded-2xl border border-lime-200/20 bg-lime-200/10 p-4">
                <p className="font-semibold text-lime-100">Invite a friend and earn 500 Garden Coins</p>
                <p className="mt-1 text-sm text-emerald-50/65">Both gardens receive a free AI Plant Doctor scan after membership activation.</p>
              </div>
            </GlassPanel>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <GlassPanel id="profile">
              <SectionIntro
                eyebrow="Profile"
                title="Address, garden location, properties, and family"
                description="Manage your service address, precise garden location, multiple properties, and family member access."
              />
              <div className="grid gap-4">
                {[
                  ["Primary address", "Road 36, Jubilee Hills, Hyderabad"],
                  ["Garden location", "Backyard, terrace, and east balcony"],
                  ["Multiple properties", "Home Garden, Farmhouse Garden"],
                  ["Family members", "3 members with view access"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.075] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/60">{label}</p>
                    <p className="mt-2 text-sm font-medium text-white">{value}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel id="support">
              <SectionIntro
                eyebrow="Support"
                title="Live chat, WhatsApp, call, and ticket support"
                description="Reach Garden Live experts for plant care, bookings, membership, payments, claims, and store support."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Live Chat", MessageCircle, "Start instant support chat"],
                  ["WhatsApp", MessageCircle, "Continue on WhatsApp Business"],
                  ["Call", Phone, "Request a callback"],
                  ["Raise Ticket", Ticket, "Create a support case"]
                ].map(([label, Icon, detail]) => {
                  const SupportIcon = Icon as typeof MessageCircle;
                  return (
                    <button key={label as string} className="rounded-[22px] border border-white/10 bg-white/[0.075] p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                      <SupportIcon className="h-6 w-6 text-lime-200" aria-hidden />
                      <p className="mt-4 font-semibold text-white">{label as string}</p>
                      <p className="mt-1 text-sm text-emerald-50/60">{detail as string}</p>
                    </button>
                  );
                })}
              </div>
            </GlassPanel>
          </section>
        </div>
      </div>
    </main>
  );
}
