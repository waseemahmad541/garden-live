import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import {
  Activity,
  BadgeIndianRupee,
  BarChart3,
  Bell,
  Bot,
  Boxes,
  Building2,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Coins,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Gauge,
  Headphones,
  HeartPulse,
  Home,
  Landmark,
  Layers3,
  Leaf,
  LocateFixed,
  Lock,
  Map,
  MessageSquare,
  Package,
  PhoneCall,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Store,
  TicketCheck,
  TrendingUp,
  UserCog,
  UserRoundCheck,
  Users,
  WalletCards,
  Wrench,
  Zap
} from "lucide-react";
import { Badge, Button, Input } from "@/components";
import { LiveDataPanel } from "@/components/platform/live-data-panel";

export const metadata: Metadata = {
  title: "Admin Dashboard | Garden Live",
  description:
    "Premium Garden Live admin dashboard for customers, memberships, gardeners, supervisors, orders, AI reports, QR passports, projects, inventory, CRM, finance, analytics, notifications, and settings.",
  robots: {
    index: false,
    follow: false
  }
};

const navItems = [
  { label: "Overview", href: "#overview", icon: Home },
  { label: "Customers", href: "#customers", icon: Users },
  { label: "Gardeners", href: "#gardeners", icon: Wrench },
  { label: "Supervisors", href: "#supervisors", icon: UserCog },
  { label: "Orders", href: "#orders", icon: ShoppingBag },
  { label: "Memberships", href: "#memberships", icon: CreditCard },
  { label: "AI Reports", href: "#ai-reports", icon: Bot },
  { label: "Passports", href: "#passports", icon: QrCode },
  { label: "Projects", href: "#projects", icon: Building2 },
  { label: "Inventory", href: "#inventory", icon: Boxes },
  { label: "CRM", href: "#crm", icon: Headphones },
  { label: "Notifications", href: "#notifications", icon: Bell },
  { label: "Finance", href: "#finance", icon: BadgeIndianRupee },
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
  { label: "Settings", href: "#settings", icon: Settings }
];

const overviewMetrics = [
  { label: "Total Customers", value: "12,846", detail: "+624 this month", icon: Users, color: "from-emerald-300 to-lime-300" },
  { label: "Active Memberships", value: "8,218", detail: "64% premium mix", icon: CreditCard, color: "from-lime-300 to-yellow-200" },
  { label: "Revenue", value: "Rs. 1.84 Cr", detail: "+18.6% MoM", icon: BadgeIndianRupee, color: "from-amber-200 to-lime-200" },
  { label: "Today's Bookings", value: "312", detail: "47 urgent visits", icon: CalendarDays, color: "from-sky-200 to-emerald-200" },
  { label: "AI Scans", value: "4,982", detail: "318 critical flags", icon: Bot, color: "from-violet-200 to-emerald-200" },
  { label: "Avg Garden Health", value: "84/100", detail: "3,086 active gardens", icon: HeartPulse, color: "from-rose-200 to-lime-200" }
];

const customers = [
  { name: "Ananya Rao", city: "Hyderabad", plan: "Premium Garden", status: "Active", visits: "18", health: "88" },
  { name: "Rahul Mehta", city: "Bengaluru", plan: "Smart Garden", status: "Active", visits: "9", health: "74" },
  { name: "Nisha Kapoor", city: "Pune", plan: "Luxury Garden", status: "Priority", visits: "24", health: "93" },
  { name: "Arvind Shah", city: "Mumbai", plan: "Home Garden", status: "Watch", visits: "6", health: "69" }
];

const gardeners = [
  { name: "Ravi Kumar", attendance: "Present", gps: "Jubilee Hills", jobs: "8", salary: "Rs. 32,000", rating: "4.9" },
  { name: "Ayesha Khan", attendance: "Present", gps: "Banjara Hills", jobs: "7", salary: "Rs. 34,500", rating: "4.8" },
  { name: "Imran Ali", attendance: "On leave", gps: "Offline", jobs: "0", salary: "Rs. 29,000", rating: "4.6" }
];

const supervisors = [
  { name: "Manoj Reddy", region: "Telangana", teams: "12", escalations: "4", rating: "4.7" },
  { name: "Priya Menon", region: "Karnataka", teams: "9", escalations: "2", rating: "4.8" },
  { name: "Sahil Jain", region: "Maharashtra", teams: "11", escalations: "6", rating: "4.6" }
];

const orders = [
  { id: "GL-ORD-1042", customer: "Ananya Rao", item: "Nutrition Kit", amount: "Rs. 699", status: "Out for delivery" },
  { id: "GL-ORD-1037", customer: "Rahul Mehta", item: "Ceramic Planter", amount: "Rs. 1,299", status: "Delivered" },
  { id: "GL-ORD-1028", customer: "Nisha Kapoor", item: "Smart Irrigation Kit", amount: "Rs. 3,499", status: "Packed" }
];

const aiReports = [
  { id: "AI-9821", plant: "Areca Palm", issue: "Water stress", severity: "Medium", owner: "Ananya Rao" },
  { id: "AI-9814", plant: "Bougainvillea", issue: "Pest activity", severity: "High", owner: "Rahul Mehta" },
  { id: "AI-9809", plant: "Monstera", issue: "Nutrient deficiency", severity: "Low", owner: "Nisha Kapoor" }
];

const projects = [
  { name: "Luxury Terrace Garden", stage: "Execution", owner: "Nisha Kapoor", value: "Rs. 4.8L" },
  { name: "Corporate Vertical Wall", stage: "Quotation", owner: "Orion Workspace", value: "Rs. 2.1L" },
  { name: "Public Park Tender", stage: "Work order", owner: "Municipal Client", value: "Rs. 42L" }
];

const financeRows = [
  { stream: "Membership Revenue", today: "Rs. 8.4L", month: "Rs. 82.2L", status: "Healthy" },
  { stream: "Store Revenue", today: "Rs. 2.1L", month: "Rs. 24.8L", status: "Growing" },
  { stream: "Expenses", today: "Rs. 1.6L", month: "Rs. 19.2L", status: "Controlled" },
  { stream: "GST Payable", today: "Rs. 1.9L", month: "Rs. 16.4L", status: "Due" }
];

const revenueBars = [
  { label: "Mon", value: 54 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 66 },
  { label: "Thu", value: 86 },
  { label: "Fri", value: 94 },
  { label: "Sat", value: 78 },
  { label: "Sun", value: 61 }
];

const heatmapCells = Array.from({ length: 35 }, (_, index) => {
  const levels = ["bg-white/10", "bg-emerald-300/25", "bg-emerald-300/45", "bg-lime-300/70"];
  return levels[(index * 7 + 3) % levels.length];
});

function ShellPanel({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`rounded-[28px] border border-white/12 bg-white/[0.075] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[0] text-white sm:text-3xl">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/68">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function MetricCard({ label, value, detail, icon: Icon, color }: { label: string; value: string; detail: string; icon: typeof Users; color: string }) {
  return (
    <article className="group rounded-[24px] border border-white/10 bg-white/[0.075] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50/55">{label}</span>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${color} text-[#06120C] shadow-[0_16px_34px_rgba(183,230,110,0.16)]`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <p className="mt-6 text-3xl font-semibold tracking-[0] text-white">{value}</p>
      <p className="mt-2 text-sm text-emerald-50/62">{detail}</p>
    </article>
  );
}

function Toolbar({ placeholder }: { placeholder: string }) {
  return (
    <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
      <Input
        placeholder={placeholder}
        leftIcon={<Search className="h-4 w-4" aria-hidden />}
        className="border-white/10 bg-white/10 text-white placeholder:text-emerald-50/45"
      />
      <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Filter className="h-4 w-4" aria-hidden />}>Filters</Button>
      <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Eye className="h-4 w-4" aria-hidden />}>View</Button>
      <Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15" leftIcon={<Download className="h-4 w-4" aria-hidden />}>Export</Button>
    </div>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: Array<Record<string, string>> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-left">
          <thead className="bg-white/[0.08]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50/55">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50/55">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${Object.values(row).join("-")}`} className="bg-white/[0.035] transition hover:bg-white/[0.075]">
                {columns.map((column) => {
                  const value = row[column.toLowerCase()] ?? "";
                  const isStatus = column.toLowerCase() === "status" || column.toLowerCase() === "severity";
                  return (
                    <td key={column} className="px-4 py-4 text-sm text-emerald-50/72">
                      {isStatus ? (
                        <Badge className="border-white/15 bg-white/10 text-emerald-50">{value}</Badge>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-4 text-right">
                  <Button variant="ghost" size="sm" className="border border-white/12 bg-white/10 text-white hover:bg-white/15">Open</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="flex h-64 items-end gap-3 rounded-[22px] border border-white/10 bg-black/15 p-5">
      {revenueBars.map((bar) => (
        <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
          <div className="relative h-44 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-lime-300 to-emerald-200 shadow-[0_0_28px_rgba(183,230,110,0.42)]"
              style={{ height: `${bar.value}%` }}
            />
          </div>
          <span className="text-xs font-medium text-emerald-50/55">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

function HealthAnalytics() {
  return (
    <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-center">
      <div
        className="grid h-48 w-48 place-items-center rounded-full"
        style={{ background: "conic-gradient(#B7E66E 0 184deg, #3E8F5B 184deg 286deg, #F4B942 286deg 338deg, #C2413A 338deg 360deg)" }}
      >
        <div className="grid h-36 w-36 place-items-center rounded-full bg-[#06120C] text-center shadow-[inset_0_0_32px_rgba(183,230,110,0.16)]">
          <div>
            <p className="text-4xl font-semibold text-white">84</p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Avg Score</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {[
          ["Excellent", "51%", "bg-lime-300"],
          ["Healthy", "28%", "bg-emerald-300"],
          ["Watch", "15%", "bg-amber-300"],
          ["Critical", "6%", "bg-red-300"]
        ].map(([label, value, color]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm">
            <span className="flex items-center gap-3 text-emerald-50/72">
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              {label}
            </span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06120C] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(62,143,91,0.38),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(183,230,110,0.16),transparent_28%),linear-gradient(145deg,#020806_0%,#092015_50%,#04110A_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-32px)] w-72 flex-col rounded-[28px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl xl:flex">
        <Link href="/" className="flex items-center gap-3 rounded-2xl px-2 py-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
            <Sprout className="h-6 w-6" aria-hidden />
          </span>
          <span>
            <span className="block text-base font-semibold text-white">Garden Live</span>
            <span className="block text-xs text-emerald-50/55">Admin Command</span>
          </span>
        </Link>

        <nav className="mt-5 flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Admin dashboard navigation">
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
          <p className="text-sm font-semibold text-white">Super Admin Workspace</p>
          <p className="mt-1 text-xs text-emerald-50/60">Live operations across customers, gardens, staff, and finance.</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-xs text-emerald-50/70">
            <span>Production ready UI</span>
            <Lock className="h-4 w-4 text-lime-200" aria-hidden />
          </div>
        </div>
      </aside>

      <div className="xl:pl-[320px]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06120C]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-[1640px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Garden Live Admin Dashboard</p>
              <h1 className="mt-1 text-xl font-semibold tracking-[0] text-white sm:text-2xl">Enterprise control room</h1>
            </div>
            <div className="hidden flex-1 justify-center px-6 lg:flex">
              <div className="w-full max-w-xl">
                <Input
                  aria-label="Search admin records"
                  placeholder="Search customers, bookings, orders, staff, invoices"
                  leftIcon={<Search className="h-4 w-4" aria-hidden />}
                  className="border-white/10 bg-white/10 text-white placeholder:text-emerald-50/45"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="bg-white/10 text-white hover:bg-white/15" aria-label="Notifications">
                <Bell className="h-4 w-4" aria-hidden />
              </Button>
              <Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200" leftIcon={<Download className="h-4 w-4" aria-hidden />}>
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1640px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <LiveDataPanel endpoint="/api/admin/dashboard/live" title="Admin Dashboard Live API" />

          <ShellPanel id="overview" className="relative overflow-hidden">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />
            <div className="relative">
              <Badge className="border-white/15 bg-white/10 text-emerald-50">Apple + Tesla + Linear inspired admin UI</Badge>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
                <div>
                  <h2 className="max-w-4xl text-4xl font-semibold tracking-[0] text-white sm:text-6xl">
                    Operate every garden, membership, visit, order, and payment from one cockpit.
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/70">
                    A premium enterprise dashboard for Garden Live&apos;s customer operations, AI plant intelligence,
                    field workforce, nursery commerce, project CRM, finance, and analytics.
                  </p>
                </div>
                <div className="rounded-[24px] border border-lime-200/20 bg-lime-200/10 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
                      <Activity className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-white">Live garden network</p>
                      <p className="mt-1 text-sm text-emerald-50/62">3,086 active gardens monitored today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ShellPanel>

          <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-6">
            {overviewMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

          <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
            <ShellPanel>
              <SectionHeader eyebrow="Revenue" title="Revenue, bookings, and membership velocity" action={<Badge className="border-white/15 bg-white/10 text-emerald-50">Last 7 days</Badge>} />
              <RevenueChart />
            </ShellPanel>
            <ShellPanel>
              <SectionHeader eyebrow="Garden Health Analytics" title="Health distribution" description="AI reports, gardener visits, and QR passport care events roll into Garden Health Score." />
              <HealthAnalytics />
            </ShellPanel>
          </section>

          <ShellPanel id="customers">
            <SectionHeader eyebrow="Customer Management" title="Search, edit, suspend, membership status, visit history" action={<Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200">Add customer</Button>} />
            <Toolbar placeholder="Search by customer, city, membership, health, status" />
            <DataTable columns={["Name", "City", "Plan", "Status", "Visits", "Health"]} rows={customers.map((item) => ({
              name: item.name,
              city: item.city,
              plan: item.plan,
              status: item.status,
              visits: item.visits,
              health: item.health
            }))} />
          </ShellPanel>

          <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
            <ShellPanel id="gardeners">
              <SectionHeader eyebrow="Gardener Management" title="Attendance, GPS, jobs, salary, performance" />
              <Toolbar placeholder="Search gardeners, GPS zone, attendance, assigned jobs" />
              <DataTable columns={["Name", "Attendance", "Gps", "Jobs", "Salary", "Rating"]} rows={gardeners.map((item) => ({
                name: item.name,
                attendance: item.attendance,
                gps: item.gps,
                jobs: item.jobs,
                salary: item.salary,
                rating: item.rating
              }))} />
            </ShellPanel>

            <ShellPanel>
              <SectionHeader eyebrow="Live GPS Tracking" title="Field team map" description="Operational map surface for active gardeners and route optimization." />
              <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(183,230,110,0.22),transparent_16%),radial-gradient(circle_at_70%_55%,rgba(62,143,91,0.30),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
                {[
                  ["left-[22%] top-[28%]", "Ravi"],
                  ["left-[62%] top-[42%]", "Ayesha"],
                  ["left-[46%] top-[68%]", "Team 7"]
                ].map(([position, label]) => (
                  <div key={label} className={`absolute ${position} rounded-full border border-lime-200/50 bg-lime-300 px-3 py-1 text-xs font-semibold text-[#06120C] shadow-[0_0_30px_rgba(183,230,110,0.55)]`}>
                    {label}
                  </div>
                ))}
                <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-[#06120C]/75 p-4 backdrop-blur-xl">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white"><LocateFixed className="h-4 w-4 text-lime-200" aria-hidden /> 23 live locations</p>
                  <p className="mt-1 text-xs text-emerald-50/55">GPS tracking UI ready for Google Maps integration.</p>
                </div>
              </div>
            </ShellPanel>
          </section>

          <ShellPanel id="supervisors">
            <SectionHeader eyebrow="Supervisor Management" title="Regional supervisors, team workload, escalation control" />
            <Toolbar placeholder="Search supervisors, regions, teams, escalations" />
            <DataTable columns={["Name", "Region", "Teams", "Escalations", "Rating"]} rows={supervisors.map((item) => ({
              name: item.name,
              region: item.region,
              teams: item.teams,
              escalations: item.escalations,
              rating: item.rating
            }))} />
          </ShellPanel>

          <section className="grid gap-6 2xl:grid-cols-[1fr_1fr]">
            <ShellPanel id="orders">
              <SectionHeader eyebrow="Orders Management" title="Garden Store orders, tracking, invoices" />
              <Toolbar placeholder="Search orders, customers, products, delivery status" />
              <DataTable columns={["Id", "Customer", "Item", "Amount", "Status"]} rows={orders.map((item) => ({
                id: item.id,
                customer: item.customer,
                item: item.item,
                amount: item.amount,
                status: item.status
              }))} />
            </ShellPanel>

            <ShellPanel id="memberships">
              <SectionHeader eyebrow="Membership Management" title="Plans, renewals, upgrades, churn prevention" />
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard label="Renewals Due" value="184" detail="next 7 days" icon={CalendarDays} color="from-lime-300 to-yellow-200" />
                <MetricCard label="Upgrade Pipeline" value="72" detail="high-intent customers" icon={CreditCard} color="from-emerald-200 to-lime-300" />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="font-semibold text-white">Recommended action</p>
                <p className="mt-1 text-sm text-emerald-50/62">Send renewal and upgrade offers to Premium-eligible Home Garden customers.</p>
              </div>
            </ShellPanel>
          </section>

          <section className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
            <ShellPanel id="ai-reports">
              <SectionHeader eyebrow="AI Reports Management" title="Disease, pest, treatment, and escalation reports" action={<Button variant="ghost" className="border border-white/15 bg-white/10 text-white hover:bg-white/15">Review critical</Button>} />
              <DataTable columns={["Id", "Plant", "Issue", "Severity", "Owner"]} rows={aiReports.map((item) => ({
                id: item.id,
                plant: item.plant,
                issue: item.issue,
                severity: item.severity,
                owner: item.owner
              }))} />
            </ShellPanel>

            <ShellPanel id="passports">
              <SectionHeader eyebrow="QR Plant Passport Management" title="Passport coverage and warranty control" />
              <div className="grid gap-4">
                <MetricCard label="Active Passports" value="38,420" detail="1,218 created this week" icon={QrCode} color="from-lime-300 to-emerald-200" />
                <MetricCard label="Warranty Eligible" value="12,084" detail="Green Promise plants" icon={ShieldCheck} color="from-sky-200 to-lime-200" />
              </div>
            </ShellPanel>
          </section>

          <section className="grid gap-6 2xl:grid-cols-[1fr_1fr]">
            <ShellPanel id="projects">
              <SectionHeader eyebrow="Project Management" title="Landscaping projects, tenders, work orders" />
              <DataTable columns={["Name", "Stage", "Owner", "Value"]} rows={projects.map((item) => ({
                name: item.name,
                stage: item.stage,
                owner: item.owner,
                value: item.value
              }))} />
            </ShellPanel>

            <ShellPanel id="inventory">
              <SectionHeader eyebrow="Nursery Inventory" title="Plants, medicines, pots, tools, smart kits" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Live Plants", "8,420", Leaf],
                  ["Pots and Planters", "2,180", Store],
                  ["Fertilizers", "342", Cloud],
                  ["Tools", "918", Wrench]
                ].map(([label, value, Icon]) => {
                  const InventoryIcon = Icon as typeof Leaf;
                  return (
                    <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <InventoryIcon className="h-5 w-5 text-lime-200" aria-hidden />
                      <p className="mt-4 text-2xl font-semibold text-white">{value as string}</p>
                      <p className="mt-1 text-sm text-emerald-50/60">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </ShellPanel>
          </section>

          <section className="grid gap-6 2xl:grid-cols-[1fr_1fr]">
            <ShellPanel id="crm">
              <SectionHeader eyebrow="CRM" title="Leads, surveys, quotations, approvals" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["New Leads", "248", MessageSquare],
                  ["Site Surveys", "76", Map],
                  ["Quotations", "39", FileText],
                  ["Project Approvals", "14", ClipboardCheck]
                ].map(([label, value, Icon]) => {
                  const CrmIcon = Icon as typeof MessageSquare;
                  return (
                    <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <CrmIcon className="h-5 w-5 text-lime-200" aria-hidden />
                      <p className="mt-4 text-2xl font-semibold text-white">{value as string}</p>
                      <p className="mt-1 text-sm text-emerald-50/60">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </ShellPanel>

            <ShellPanel id="notifications">
              <SectionHeader eyebrow="Notifications" title="WhatsApp, SMS, email, app alerts" />
              <div className="space-y-3">
                {[
                  ["Water reminders queued", "12,420 customers", Bell],
                  ["Gardener arrival alerts", "312 bookings today", PhoneCall],
                  ["Membership expiry campaigns", "184 renewals due", TicketCheck],
                  ["AI critical escalations", "38 supervisor alerts", Zap]
                ].map(([title, detail, Icon]) => {
                  const NoticeIcon = Icon as typeof Bell;
                  return (
                    <div key={title as string} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <NoticeIcon className="h-5 w-5 text-lime-200" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-white">{title as string}</p>
                        <p className="mt-1 text-xs text-emerald-50/55">{detail as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ShellPanel>
          </section>

          <ShellPanel id="finance">
            <SectionHeader eyebrow="Finance" title="Revenue, expenses, GST, Razorpay, Stripe" action={<Button className="bg-lime-300 text-[#06120C] hover:bg-lime-200">Reconcile</Button>} />
            <div className="mb-5 grid gap-4 md:grid-cols-5">
              {[
                ["Revenue", "Rs. 1.84 Cr", WalletCards],
                ["Expenses", "Rs. 42.2L", BadgeIndianRupee],
                ["GST", "Rs. 16.4L", Landmark],
                ["Razorpay", "Rs. 96.8L", CreditCard],
                ["Stripe", "Rs. 14.7L", Layers3]
              ].map(([label, value, Icon]) => {
                const FinanceIcon = Icon as typeof WalletCards;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <FinanceIcon className="h-5 w-5 text-lime-200" aria-hidden />
                    <p className="mt-4 text-xl font-semibold text-white">{value as string}</p>
                    <p className="mt-1 text-sm text-emerald-50/60">{label as string}</p>
                  </div>
                );
              })}
            </div>
            <DataTable columns={["Stream", "Today", "Month", "Status"]} rows={financeRows.map((item) => ({
              stream: item.stream,
              today: item.today,
              month: item.month,
              status: item.status
            }))} />
          </ShellPanel>

          <ShellPanel id="analytics">
            <SectionHeader eyebrow="Analytics" title="Graphs, heatmaps, and customer growth" description="Executive analytics for sales, membership growth, visits, revenue, satisfaction, and city expansion." />
            <div className="grid gap-6 2xl:grid-cols-[1fr_1fr]">
              <div>
                <RevenueChart />
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <MetricCard label="Customer Growth" value="+24%" detail="quarterly" icon={TrendingUp} color="from-lime-300 to-emerald-200" />
                  <MetricCard label="Satisfaction" value="4.82" detail="avg rating" icon={Star} color="from-amber-200 to-lime-200" />
                  <MetricCard label="Visit SLA" value="96%" detail="on-time" icon={UserRoundCheck} color="from-sky-200 to-lime-200" />
                </div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/15 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">City demand heatmap</h3>
                  <Badge className="border-white/15 bg-white/10 text-emerald-50">Live preview</Badge>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {heatmapCells.map((cell, index) => (
                    <div key={index} className={`aspect-square rounded-lg ${cell}`} />
                  ))}
                </div>
                <p className="mt-4 text-sm text-emerald-50/60">Hyderabad, Bengaluru, Pune, and Mumbai show highest membership conversion density.</p>
              </div>
            </div>
          </ShellPanel>

          <ShellPanel id="settings">
            <SectionHeader eyebrow="Settings" title="Platform configuration, roles, billing, integrations" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Role Permissions", "Admin, supervisor, gardener, partner controls", ShieldCheck],
                ["Cities and Service Areas", "Multi-city service routing and pricing", LocateFixed],
                ["Payment Settings", "Razorpay, Stripe, GST and invoice rules", CreditCard],
                ["Integrations", "Cloudinary, WhatsApp, SMTP, Google Maps", Settings]
              ].map(([title, detail, Icon]) => {
                const SettingsIcon = Icon as typeof ShieldCheck;
                return (
                  <Link key={title as string} href="#" className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                    <SettingsIcon className="h-6 w-6 text-lime-200" aria-hidden />
                    <p className="mt-5 font-semibold text-white">{title as string}</p>
                    <p className="mt-2 text-sm leading-6 text-emerald-50/60">{detail as string}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lime-200">
                      Configure <ChevronRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </ShellPanel>
        </div>
      </div>
    </main>
  );
}
