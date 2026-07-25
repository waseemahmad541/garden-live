import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Boxes, Leaf, ShieldCheck } from "lucide-react";
import { Badge } from "@/components";
import { moduleConfigs } from "@/lib/module-client/configs";

const moduleLinks = [
  ["membershipSystem", "/admin/modules/membership-system"],
  ["plantNursery", "/admin/modules/plant-nursery"],
  ["landscaping", "/admin/modules/landscaping"],
  ["gardenMaintenance", "/admin/modules/garden-maintenance"],
  ["dedicatedGardener", "/admin/modules/dedicated-gardener"],
  ["corporateSolutions", "/admin/modules/corporate-solutions"],
  ["aiPlantDoctor", "/admin/modules/ai-plant-doctor"],
  ["plantScanner", "/admin/modules/plant-scanner"],
  ["qrPlantPassport", "/admin/modules/qr-plant-passport"],
  ["customerApp", "/admin/modules/customer-app"],
  ["gardenerApp", "/admin/modules/gardener-app"],
  ["supervisorApp", "/admin/modules/supervisor-app"],
  ["adminPanel", "/admin/modules/admin-panel"]
] as const;

export const metadata = {
  title: "Garden Live Modules | Admin",
  description: "Authenticated operations launchpad for all Garden Live platform modules."
};

export default function AdminModulesPage() {
  return (
    <main className="min-h-screen bg-neutral-cloud text-botanical-black">
      <section className="border-b border-[#E3E8E2] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Badge tone="premium">Garden Live Platform</Badge>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[0] sm:text-4xl">Operational Modules</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-slate">
                One authenticated launchpad for memberships, nursery, landscaping, maintenance, field apps, AI diagnostics, QR passports, corporate work, reports, uploads, and admin governance.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Metric icon={<Boxes className="h-4 w-4" />} value="13" label="Modules" />
              <Metric icon={<Leaf className="h-4 w-4" />} value="25+" label="Resources" />
              <Metric icon={<ShieldCheck className="h-4 w-4" />} value="RBAC" label="Protected" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {moduleLinks.map(([key, href]) => {
          const config = moduleConfigs[key];
          return (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-[#E3E8E2] bg-white p-5 shadow-glXs transition hover:-translate-y-0.5 hover:border-botanical-green/30 hover:shadow-glMd"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone="info">{config.eyebrow}</Badge>
                  <h2 className="mt-4 text-lg font-semibold">{config.title}</h2>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-gl bg-botanical-mint text-botanical-green transition group-hover:bg-botanical-green group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-slate">{config.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {config.resources.slice(0, 3).map((resource) => (
                  <span key={resource.resource} className="rounded-full bg-neutral-cloud px-3 py-1 text-xs font-semibold text-neutral-slate">
                    {resource.label}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

function Metric({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#E3E8E2] bg-neutral-cloud p-3">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-gl bg-white text-botanical-green">{icon}</div>
      <p className="mt-2 text-lg font-semibold">{value}</p>
      <p className="text-xs text-neutral-slate">{label}</p>
    </div>
  );
}
