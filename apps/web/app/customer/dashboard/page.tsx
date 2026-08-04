import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Home,
  Leaf,
  MapPin,
  Pencil,
  QrCode,
  ShieldCheck,
  Sparkles,
  Sprout,
  UserRound
} from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components";
import { LogoutButton } from "@/components/auth/logout-button";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Dashboard | Garden Live",
  description: "Garden Live customer dashboard with live profile, membership, garden, bookings, and notifications data.",
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(value?: Date | null) {
  if (!value) return "Not scheduled";
  return value.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(value?: Date | null) {
  if (!value) return "Not scheduled";
  return value.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function formatMoney(value: unknown) {
  const amount = Number(value ?? 0);
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.075] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-[0] text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-emerald-50/65">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/60">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-lime-300/15 text-lime-100">{icon}</span>
      </div>
      <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/14 bg-black/10 p-5 text-sm leading-6 text-emerald-50/65">
      {children}
    </div>
  );
}

export default async function CustomerDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/customer/dashboard");

  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
    include: {
      user: {
        include: {
          addresses: {
            where: { deletedAt: null },
            orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
            take: 3
          },
          notifications: {
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            take: 8
          }
        }
      },
      gardens: {
        where: { deletedAt: null },
        include: {
          address: true,
          plants: {
            where: { deletedAt: null },
            include: { passport: true },
            orderBy: { updatedAt: "desc" },
            take: 12
          },
          visits: {
            where: { deletedAt: null },
            include: { gardener: { include: { user: true } } },
            orderBy: { scheduledAt: "asc" },
            take: 8
          },
          serviceRequests: {
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            take: 8
          },
          healthScores: {
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            take: 1
          }
        },
        orderBy: { updatedAt: "desc" }
      },
      activeMemberships: {
        where: { deletedAt: null },
        include: { plan: true, payments: { orderBy: { createdAt: "desc" }, take: 6 } },
        orderBy: { createdAt: "desc" },
        take: 3
      },
      aiDiagnoses: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 6
      }
    }
  });

  if (!customer) redirect("/unauthorized");

  const activeMembership = customer.activeMemberships.find((membership) => membership.status === "ACTIVE") ?? customer.activeMemberships[0];
  const gardens = customer.gardens;
  const plants = gardens.flatMap((garden) => garden.plants);
  const visits = gardens.flatMap((garden) => garden.visits);
  const nextVisit = visits.find((visit) => new Date(visit.scheduledAt) >= new Date());
  const healthScore = gardens[0]?.healthScores[0]?.overallScore ?? "New";
  const unreadNotifications = customer.user.notifications.filter((notification) => !notification.readAt).length;
  const payments = customer.activeMemberships.flatMap((membership) => membership.payments);
  const address = customer.user.addresses[0];

  return (
    <main className="min-h-screen bg-[#06120C] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(88,166,110,0.28),transparent_34%),radial-gradient(circle_at_88%_0%,rgba(183,230,110,0.18),transparent_30%),linear-gradient(145deg,#031007_0%,#092015_48%,#020806_100%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06120C]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
              <Sprout className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-semibold">Garden Live</span>
              <span className="block text-xs text-emerald-50/55">Customer Dashboard</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden border border-white/12 bg-white/10 text-white hover:bg-white/15 sm:inline-flex">
              <Link href="/book-garden-visit">Book Visit</Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.075] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Welcome</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[0] text-white sm:text-6xl">
                {customer.user.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/70">
                Manage your Garden Live profile, membership, garden records, bookings, notifications, and AI plant health reports from live PostgreSQL data.
              </p>
            </div>
            <div className="rounded-3xl border border-lime-200/20 bg-lime-200/10 p-5">
              <p className="text-sm text-emerald-50/65">Current membership</p>
              <p className="mt-2 text-2xl font-semibold text-white">{activeMembership?.plan.name ?? "No active plan"}</p>
              <p className="mt-2 text-sm text-emerald-50/65">
                Status: {activeMembership?.status ?? "Not subscribed"} - Renewal: {formatDate(activeMembership?.endDate)}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Garden Health" value={healthScore} icon={<ShieldCheck className="h-4 w-4" aria-hidden />} />
          <Metric label="Gardens" value={gardens.length} icon={<Home className="h-4 w-4" aria-hidden />} />
          <Metric label="Plants" value={plants.length} icon={<Leaf className="h-4 w-4" aria-hidden />} />
          <Metric label="Unread Alerts" value={unreadNotifications} icon={<Bell className="h-4 w-4" aria-hidden />} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="My Profile" description="Saved customer identity and primary service address.">
            <div className="space-y-3 text-sm text-emerald-50/75">
              <p className="flex items-center gap-3"><UserRound className="h-4 w-4 text-lime-200" aria-hidden /> {customer.user.name}</p>
              <p>{customer.user.email ?? "Email not added"}</p>
              <p>{customer.user.phone}</p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-lime-200" aria-hidden />
                <span>{address ? `${address.line1}, ${address.city}, ${address.state} ${address.pincode}` : "No address saved yet."}</span>
              </p>
            </div>
            <Button asChild className="mt-5 bg-lime-300 text-[#06120C] hover:bg-lime-200">
              <Link href="/customer/dashboard#profile"><Pencil className="mr-2 h-4 w-4" aria-hidden /> Edit Profile</Link>
            </Button>
          </Panel>

          <Panel title="My Membership" description="Membership status and latest payment history.">
            {activeMembership ? (
              <div className="space-y-3 text-sm text-emerald-50/75">
                <p className="text-lg font-semibold text-white">{activeMembership.plan.name}</p>
                <p>{activeMembership.plan.description ?? "Garden Live membership plan"}</p>
                <p>Remaining visits: {activeMembership.remainingVisits}</p>
                <p>AI credits: {activeMembership.remainingAiCredits}</p>
                <p>Latest payment: {payments[0] ? `${formatMoney(payments[0].amount)} - ${payments[0].status}` : "No payment recorded"}</p>
              </div>
            ) : (
              <EmptyState>No membership is active for this customer account yet.</EmptyState>
            )}
          </Panel>
        </section>

        <Panel title="My Garden" description="Registered gardens, plants, QR passports, and upcoming visits.">
          {gardens.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {gardens.map((garden) => (
                <article key={garden.id} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{garden.name}</h3>
                      <p className="mt-1 text-sm text-emerald-50/60">{garden.type} - {garden.status}</p>
                    </div>
                    <span className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-semibold text-lime-100">
                      {garden.plants.length} plants
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {garden.plants.slice(0, 4).map((plant) => (
                      <div key={plant.id} className="rounded-xl bg-black/15 p-3 text-sm text-emerald-50/70">
                        <p className="font-semibold text-white">{plant.name}</p>
                        <p>{plant.category} - {plant.healthStatus}</p>
                        <p className="mt-2 flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-lime-200" aria-hidden />
                          {plant.passport?.passportCode ?? "Passport pending"}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState>No garden records are registered yet. Book a visit to create the first Garden Live property profile.</EmptyState>
          )}
        </Panel>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="My Bookings" description="Upcoming gardener visits and recent service requests.">
            {nextVisit ? (
              <div className="rounded-2xl border border-lime-200/20 bg-lime-200/10 p-4">
                <p className="text-lg font-semibold text-white">{formatDateTime(nextVisit.scheduledAt)}</p>
                <p className="mt-2 text-sm text-emerald-50/70">
                  Status: {nextVisit.status} - Gardener: {nextVisit.gardener?.user.name ?? "Unassigned"}
                </p>
              </div>
            ) : (
              <EmptyState>No upcoming visit is scheduled.</EmptyState>
            )}
            <Button asChild className="mt-5 bg-lime-300 text-[#06120C] hover:bg-lime-200">
              <Link href="/book-garden-visit"><CalendarDays className="mr-2 h-4 w-4" aria-hidden /> Book Garden Visit</Link>
            </Button>
          </Panel>

          <Panel title="Notifications" description="Account, visit, payment, membership, and plant health alerts.">
            {customer.user.notifications.length ? (
              <div className="space-y-3">
                {customer.user.notifications.map((notification) => (
                  <div key={notification.id} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <p className="font-semibold text-white">{notification.title}</p>
                    <p className="mt-1 text-sm text-emerald-50/65">{notification.message}</p>
                    <p className="mt-2 text-xs text-emerald-50/45">{formatDateTime(notification.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>No notifications yet.</EmptyState>
            )}
          </Panel>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Panel title="AI Plant Doctor" description="Recent AI diagnosis reports saved for this customer.">
            {customer.aiDiagnoses.length ? (
              <div className="space-y-3">
                {customer.aiDiagnoses.map((report) => (
                  <div key={report.id} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <p className="font-semibold text-white">{report.diagnosisSummary ?? "AI plant health report"}</p>
                    <p className="mt-1 text-sm text-emerald-50/65">Severity: {report.severity} - Health score: {report.healthScore ?? "Pending"}</p>
                    <p className="mt-2 text-sm text-emerald-50/65">{report.medicineRecommendation ?? report.fertilizerRecommendation ?? report.waterRecommendation ?? "Treatment recommendation pending."}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>No AI Plant Doctor reports have been saved yet.</EmptyState>
            )}
          </Panel>

          <Panel title="Protected Account" description="Secure customer access is enforced by Auth.js sessions and role-aware middleware.">
            <div className="grid gap-3 text-sm text-emerald-50/75">
              <p className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-lime-200" aria-hidden /> Role: {session.user.roles?.join(", ") || "CUSTOMER"}</p>
              <p className="flex items-center gap-3"><CreditCard className="h-4 w-4 text-lime-200" aria-hidden /> Email verified: {customer.user.emailVerifiedAt ? "Yes" : "Pending"}</p>
              <p className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-lime-200" aria-hidden /> Phone verified: {customer.user.phoneVerifiedAt ? "Yes" : "Pending"}</p>
            </div>
          </Panel>
        </section>
      </div>
    </main>
  );
}
