import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  CreditCard,
  FileText,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  Sprout,
  Users,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";

export const adminNav = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Memberships", href: "/admin/memberships", icon: CreditCard },
  { label: "Visit Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Gardeners", href: "/admin/gardeners", icon: Wrench },
  { label: "Payments", href: "/admin/payments", icon: BadgeIndianRupee },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Website CMS", href: "/admin/website-cms", icon: Globe2 },
  { label: "Permissions", href: "/admin/permissions", icon: ShieldCheck }
];

export function AdminShell({
  active,
  title,
  description,
  children,
  userLabel = "Admin"
}: {
  active: string;
  title: string;
  description: string;
  children: React.ReactNode;
  userLabel?: string;
}) {
  return (
    <main className="min-h-screen bg-[#06120C] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(62,143,91,0.34),transparent_31%),radial-gradient(circle_at_90%_6%,rgba(183,230,110,0.16),transparent_28%),linear-gradient(145deg,#020806_0%,#092015_48%,#04110A_100%)]" />
      <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-32px)] w-72 flex-col rounded-[28px] border border-white/10 bg-white/[0.08] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl xl:flex">
        <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-2xl px-2 py-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
            <Sprout className="h-6 w-6" aria-hidden />
          </span>
          <span>
            <span className="block text-base font-semibold">Garden Live</span>
            <span className="block text-xs text-emerald-50/55">Admin Control Room</span>
          </span>
        </Link>
        <nav className="mt-5 flex-1 space-y-1 overflow-y-auto pr-1" aria-label="Admin navigation">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                  isActive ? "bg-lime-300 text-[#06120C]" : "text-emerald-50/72 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
          <p className="text-sm font-semibold">{userLabel}</p>
          <p className="mt-1 text-xs text-emerald-50/60">Role protected PostgreSQL data</p>
        </div>
      </aside>

      <div className="xl:pl-[320px]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06120C]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Garden Live Admin</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-[0] text-white sm:text-4xl">{title}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-50/65">{description}</p>
              </div>
              <div className="flex gap-2 overflow-x-auto xl:hidden">
                {adminNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold",
                      item.href === active ? "border-lime-300 bg-lime-300 text-[#06120C]" : "border-white/12 bg-white/10 text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </main>
  );
}

export function AdminPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[26px] border border-white/10 bg-white/[0.075] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-6", className)}>
      {children}
    </section>
  );
}

export function AdminSectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[0] text-white sm:text-2xl">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-emerald-50/62">{description}</p> : null}
    </div>
  );
}

export function AdminMetric({
  label,
  value,
  detail,
  icon: Icon
}: {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-white/[0.08] p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50/55">{label}</span>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-[#06120C]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <p className="mt-6 text-3xl font-semibold tracking-[0] text-white">{value}</p>
      {detail ? <p className="mt-2 text-sm text-emerald-50/60">{detail}</p> : null}
    </article>
  );
}

export function AdminTable({ columns, rows }: { columns: string[]; rows: Array<Record<string, React.ReactNode>> }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
        <FileText className="mx-auto h-8 w-8 text-lime-200" aria-hidden />
        <p className="mt-3 text-sm font-semibold text-white">No database records found</p>
        <p className="mt-1 text-sm text-emerald-50/58">This page is connected to PostgreSQL and will populate when records exist.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-white/[0.08]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50/55">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, index) => (
              <tr key={index} className="bg-white/[0.035] transition hover:bg-white/[0.075]">
                {columns.map((column) => (
                  <td key={column} className="px-4 py-4 text-sm text-emerald-50/76">
                    {row[column] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminSearch({ placeholder, defaultValue = "" }: { placeholder: string; defaultValue?: string }) {
  return (
    <form className="mb-5 flex flex-col gap-3 sm:flex-row" action="">
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-h-11 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-emerald-50/45 focus:border-lime-200"
      />
      <button className="rounded-2xl bg-lime-300 px-5 py-2.5 text-sm font-semibold text-[#06120C]" type="submit">
        Search
      </button>
    </form>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-50">{children}</span>;
}
