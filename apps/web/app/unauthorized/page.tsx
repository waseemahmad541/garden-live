import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Unauthorized",
  description: "You do not have permission to access this Garden Live area."
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAF6] px-5 py-10 text-botanical-black">
      <section className="w-full max-w-lg rounded-[24px] border border-[#DDE5DC] bg-white p-8 text-center shadow-glLg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-botanical-mint text-botanical-green">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Access restricted</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-slate">
          Your current role does not have permission to open this Garden Live workspace.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/customer/dashboard">Go to dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Switch account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
