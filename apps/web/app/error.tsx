"use client";

import Link from "next/link";
import { Button } from "@/components";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f7f0] px-4 text-center text-botanical-black">
      <div className="max-w-xl rounded-[2rem] border border-white bg-white/85 p-8 shadow-glLg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-botanical-green">500</p>
        <h1 className="mt-4 text-4xl font-semibold">Something needs a little pruning.</h1>
        <p className="mt-5 text-neutral-slate">The page could not load cleanly. Try again or return to Garden Live.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>Try Again</Button>
          <Button asChild variant="secondary"><Link href="/">Go Home</Link></Button>
        </div>
      </div>
    </main>
  );
}
