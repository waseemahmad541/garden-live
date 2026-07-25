import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Button, Sidebar, StatisticsCard } from "@/components";
import { BarChart3, Building2, CalendarDays, CheckCircle2, FileText, Gauge, Leaf, MapPin, QrCode, ShieldCheck, UserCog, Users, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Supervisor Dashboard",
  description: "Garden Live supervisor dashboard for field oversight, gardeners, project tracking, visit reviews, plant insurance claims, QR passports, and garden health reports.",
  robots: { index: false, follow: false }
};

const sidebarItems = [
  { label: "Overview", href: "#overview", icon: BarChart3, active: true },
  { label: "Teams", href: "#teams", icon: Users },
  { label: "Visits", href: "#visits", icon: CalendarDays },
  { label: "Projects", href: "#projects", icon: Building2 },
  { label: "Claims", href: "#claims", icon: ShieldCheck },
  { label: "Health Reports", href: "#health", icon: Gauge }
];

const reviews = [
  { customer: "Ananya Rao", visit: "Premium Garden Visit", gardener: "Ravi Kumar", score: "92", status: "Approve" },
  { customer: "Rahul Mehta", visit: "Palm Health Review", gardener: "Ayesha Khan", score: "78", status: "Needs review" },
  { customer: "Orion Workspace", visit: "Corporate Green Wall", gardener: "Ravi Kumar", score: "88", status: "Approve" }
];

export default function SupervisorDashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-cloud">
      <div className="flex">
        <Sidebar items={sidebarItems} userLabel="Manoj Reddy - Supervisor" />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#E3E8E2] bg-white/90 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-semibold text-botanical-black">Garden Live Supervisor App</p>
                <p className="text-xs text-neutral-slate">Field oversight, quality review, project tracking, claims, and reports</p>
              </div>
              <Button asChild>
                <Link href="/admin/modules">Open Operations</Link>
              </Button>
            </div>
          </header>

          <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <section id="overview" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
              <Badge tone="premium">Supervisor Command</Badge>
              <h1 className="mt-5 text-4xl font-semibold">64 active gardens, 18 field visits, 9 claim reviews.</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-slate">Review gardener performance, approve service reports, track landscaping projects, inspect Garden Health Reports, and escalate plant replacement claims.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <StatisticsCard label="Active Gardens" value="64" trend="Telangana region" trendDirection="up" icon={<Leaf className="h-4 w-4" aria-hidden />} />
                <StatisticsCard label="Visits Today" value="18" trend="3 priority" trendDirection="up" icon={<CalendarDays className="h-4 w-4" aria-hidden />} />
                <StatisticsCard label="Gardeners" value="12" trend="10 available" trendDirection="up" icon={<Wrench className="h-4 w-4" aria-hidden />} />
                <StatisticsCard label="Claims" value="9" trend="pending review" trendDirection="up" icon={<ShieldCheck className="h-4 w-4" aria-hidden />} />
              </div>
            </section>

            <section id="teams" className="grid gap-6 lg:grid-cols-3">
              {["Ravi Kumar - 18 visits - 4.9 rating", "Ayesha Khan - 22 visits - 4.8 rating", "Suresh Patel - 16 visits - 4.7 rating"].map((member) => (
                <div key={member} className="rounded-3xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
                  <UserCog className="h-5 w-5 text-botanical-green" aria-hidden />
                  <p className="mt-4 text-lg font-semibold">{member}</p>
                </div>
              ))}
            </section>

            <section id="visits" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
              <h2 className="text-2xl font-semibold">Visit Review Queue</h2>
              <div className="mt-6 grid gap-4">
                {reviews.map((review) => (
                  <div key={review.customer} className="grid gap-4 rounded-2xl border border-[#E3E8E2] bg-[#f7faf5] p-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-center">
                    <div>
                      <h3 className="font-semibold">{review.customer}</h3>
                      <p className="text-sm text-neutral-slate">{review.visit}</p>
                    </div>
                    <p className="text-sm text-neutral-slate">Gardener: {review.gardener}</p>
                    <Badge tone={Number(review.score) >= 85 ? "success" : "warning"}>Score {review.score}</Badge>
                    <Button size="sm" variant={review.status === "Approve" ? "primary" : "secondary"}>{review.status}</Button>
                  </div>
                ))}
              </div>
            </section>

            <section id="projects" className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
                <h2 className="text-2xl font-semibold">Project Tracking</h2>
                <div className="mt-5 space-y-3">
                  {["Luxury Terrace Garden - In Progress", "Vertical Garden Wall - Site Survey", "Institutional Landscape - Tender Documents"].map((project) => (
                    <div key={project} className="flex items-center gap-3 rounded-2xl bg-neutral-cloud p-3 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-botanical-green" aria-hidden />
                      {project}
                    </div>
                  ))}
                </div>
              </div>
              <div id="claims" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
                <h2 className="text-2xl font-semibold">Plant Insurance Claims</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">Review eligible plant replacement under Garden Live Green Promise, warranty rules, evidence photos, maintenance responsibility, and replacement status.</p>
                <div className="mt-5 grid gap-3">
                  {["GL-CLM-104 - Under Review", "GL-CLM-098 - Approved", "GL-CLM-091 - Evidence Required"].map((claim) => (
                    <div key={claim} className="flex items-center gap-3 rounded-2xl bg-neutral-cloud p-3 text-sm font-medium">
                      <ShieldCheck className="h-4 w-4 text-botanical-green" aria-hidden />
                      {claim}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="health" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
              <h2 className="text-2xl font-semibold">Garden Health Reports</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-slate">Supervisor-facing health summary across plant health score, garden health score, soil score, water score, visit completion, pest risk, and AI recommendations.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-5">
                {["Garden Score 88", "Plant Avg 86", "Soil 82", "Water 88", "Pest Risk Low"].map((metric) => (
                  <div key={metric} className="rounded-2xl bg-neutral-cloud p-4">
                    <Gauge className="h-5 w-5 text-botanical-green" aria-hidden />
                    <p className="mt-4 text-sm font-semibold">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button leftIcon={<FileText className="h-4 w-4" aria-hidden />}>Generate Report</Button>
                <Button variant="secondary" leftIcon={<QrCode className="h-4 w-4" aria-hidden />}>Review Plant Passports</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
