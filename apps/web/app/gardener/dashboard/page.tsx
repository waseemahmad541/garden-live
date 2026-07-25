import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Button, Sidebar, StatisticsCard } from "@/components";
import { CalendarDays, Camera, CheckCircle2, Clock, FileText, Leaf, MapPin, MessageCircle, QrCode, ScanSearch, Sprout, Timer, UploadCloud, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Gardener Dashboard",
  description: "Garden Live gardener dashboard for assigned visits, attendance, service reports, plant timelines, QR Plant Passport updates, before-after photos, and customer care tasks.",
  robots: { index: false, follow: false }
};

const sidebarItems = [
  { label: "Today", href: "#today", icon: CalendarDays, active: true },
  { label: "Attendance", href: "#attendance", icon: Timer },
  { label: "Visits", href: "#visits", icon: Wrench },
  { label: "Plant Care", href: "#plant-care", icon: Leaf },
  { label: "QR Passport", href: "#passport", icon: QrCode },
  { label: "Reports", href: "#reports", icon: FileText }
];

const visits = [
  { time: "09:00 AM", customer: "Ananya Rao", service: "Premium Garden Visit", area: "Jubilee Hills", status: "Scheduled" },
  { time: "12:30 PM", customer: "Rahul Mehta", service: "Palm health review", area: "Gachibowli", status: "Confirmed" },
  { time: "04:00 PM", customer: "Orion Workspace", service: "Corporate green wall care", area: "HITEC City", status: "Priority" }
];

const tasks = ["Water terrace palms", "Prune bougainvillea", "Check pest watch plants", "Upload before-after photos", "Update QR Plant Passport timeline"];

export default function GardenerDashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-cloud">
      <div className="flex">
        <Sidebar items={sidebarItems} userLabel="Ravi Kumar - Gardener" />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-[#E3E8E2] bg-white/90 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-sm font-semibold text-botanical-black">Garden Live Gardener App</p>
                <p className="text-xs text-neutral-slate">Field visits, attendance, care reports, and plant passport updates</p>
              </div>
              <Button asChild>
                <Link href="/book-garden-visit">New Visit</Link>
              </Button>
            </div>
          </header>

          <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <section id="today" className="rounded-3xl border border-[#E3E8E2] bg-botanical-black p-6 text-white shadow-glLg">
              <Badge tone="premium" className="bg-white/15 text-white">Today Route</Badge>
              <h1 className="mt-5 text-4xl font-semibold">3 assigned visits, 14 plant care tasks.</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">Complete attendance, update visit status, upload before-after photos, scan QR Plant Passports, and submit service reports from the field.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatisticsCard label="Assigned Visits" value="3" trend="1 priority" trendDirection="up" icon={<CalendarDays className="h-4 w-4" aria-hidden />} />
                <StatisticsCard label="Attendance" value="Live" trend="Checked in" trendDirection="up" icon={<Timer className="h-4 w-4" aria-hidden />} />
                <StatisticsCard label="Reports Due" value="3" trend="Before-after required" trendDirection="up" icon={<Camera className="h-4 w-4" aria-hidden />} />
              </div>
            </section>

            <section id="attendance" className="grid gap-6 lg:grid-cols-3">
              {["Check-in: 08:18 AM", "Location: Hyderabad West", "Status: Present"].map((item) => (
                <div key={item} className="rounded-3xl border border-[#E3E8E2] bg-white p-5 shadow-glXs">
                  <CheckCircle2 className="h-5 w-5 text-botanical-green" aria-hidden />
                  <p className="mt-4 text-lg font-semibold">{item}</p>
                </div>
              ))}
            </section>

            <section id="visits" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
              <h2 className="text-2xl font-semibold">Assigned Garden Visits</h2>
              <div className="mt-6 grid gap-4">
                {visits.map((visit) => (
                  <div key={visit.customer} className="grid gap-4 rounded-2xl border border-[#E3E8E2] bg-[#f7faf5] p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                    <div>
                      <p className="text-lg font-semibold text-botanical-green">{visit.time}</p>
                      <p className="text-xs text-neutral-slate">{visit.area}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">{visit.customer}</h3>
                      <p className="mt-1 text-sm text-neutral-slate">{visit.service}</p>
                    </div>
                    <Badge tone={visit.status === "Priority" ? "warning" : "success"}>{visit.status}</Badge>
                  </div>
                ))}
              </div>
            </section>

            <section id="plant-care" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
                <h2 className="text-2xl font-semibold">Plant Care Tasks</h2>
                <div className="mt-5 space-y-3">
                  {tasks.map((task) => (
                    <div key={task} className="flex items-center gap-3 rounded-2xl bg-neutral-cloud p-3 text-sm font-medium">
                      <Sprout className="h-4 w-4 text-botanical-green" aria-hidden />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
              <div id="passport" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
                <h2 className="text-2xl font-semibold">QR Plant Passport Updates</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-slate">Scan a plant QR code to update watering, pruning, fertilizer, diagnosis, treatment, growth history, warranty, and replacement status.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Button leftIcon={<ScanSearch className="h-4 w-4" aria-hidden />}>Scan QR</Button>
                  <Button variant="secondary" leftIcon={<UploadCloud className="h-4 w-4" aria-hidden />}>Upload Growth Photo</Button>
                </div>
              </div>
            </section>

            <section id="reports" className="rounded-3xl border border-[#E3E8E2] bg-white p-6 shadow-glSm">
              <h2 className="text-2xl font-semibold">Service Report Checklist</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                {["Before photos", "After photos", "Work summary", "Customer feedback"].map((item) => (
                  <div key={item} className="rounded-2xl bg-neutral-cloud p-4">
                    <FileText className="h-5 w-5 text-botanical-green" aria-hidden />
                    <p className="mt-4 text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
