import Link from "next/link";
import { LucideIcon, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  userLabel?: string;
  className?: string;
}

export function Sidebar({ items, userLabel = "Garden Live", className }: SidebarProps) {
  return (
    <aside className={cn("hidden h-screen w-64 flex-col border-r border-[#E3E8E2] bg-white lg:flex", className)}>
      <div className="flex h-16 items-center gap-2 border-b border-[#E3E8E2] px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-gl bg-botanical-green text-white">
          <Sprout className="h-5 w-5" aria-hidden />
        </span>
        <span className="font-semibold text-botanical-black">Garden Live</span>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Dashboard navigation">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "gl-focus-ring flex items-center gap-3 rounded-gl px-3 py-2.5 text-sm font-medium transition",
                item.active
                  ? "bg-botanical-mint text-botanical-green"
                  : "text-neutral-slate hover:bg-neutral-cloud hover:text-botanical-black"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#E3E8E2] p-4 text-sm font-medium text-neutral-slate">{userLabel}</div>
    </aside>
  );
}
