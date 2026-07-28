import Link from "next/link";
import { ArrowUp, CalendarCheck } from "lucide-react";

export function LaunchFloatingActions() {
  return (
    <div className="fixed bottom-5 left-5 z-40 hidden flex-col gap-3 sm:flex" aria-label="Quick public website actions">
      <Link
        href="/book-garden-visit"
        className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/85 px-4 text-sm font-semibold text-botanical-black shadow-[0_16px_40px_rgba(7,19,13,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-botanical-lime"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden />
        Book Visit
      </Link>
      <a
        href="#"
        className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/85 text-botanical-black shadow-[0_16px_40px_rgba(7,19,13,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-botanical-lime"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
