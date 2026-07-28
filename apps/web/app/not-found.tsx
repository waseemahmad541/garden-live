import Link from "next/link";
import { Button } from "@/components";
import { PublicChrome } from "@/components/public/public-site";

export default function NotFound() {
  return (
    <PublicChrome>
      <section className="grid min-h-[72vh] place-items-center px-4 py-24 text-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-botanical-green">404</p>
          <h1 className="mt-4 text-5xl font-semibold">This garden path does not exist.</h1>
          <p className="mt-5 text-neutral-slate">The page may have moved. Return home or book a Garden Live visit.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/">Go Home</Link></Button>
            <Button asChild variant="secondary"><Link href="/book-garden-visit">Book Visit</Link></Button>
          </div>
        </div>
      </section>
    </PublicChrome>
  );
}
