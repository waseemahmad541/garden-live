import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7FAF6] text-botanical-black">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden overflow-hidden bg-botanical-green text-white lg:block">
          <div className="relative flex h-full flex-col justify-between p-10">
            <div className="absolute inset-0 opacity-35">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
            </div>
            <div className="relative z-10">
              <Link href="/" className="text-xl font-semibold tracking-tight">
                Garden Live
              </Link>
            </div>
            <div className="relative z-10 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{eyebrow}</p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">{title}</h1>
              <p className="mt-5 text-lg leading-8 text-white/78">{description}</p>
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-3 text-sm text-white/76">
              <div className="rounded-gl border border-white/15 bg-white/10 p-4 backdrop-blur">JWT Sessions</div>
              <div className="rounded-gl border border-white/15 bg-white/10 p-4 backdrop-blur">OTP Login</div>
              <div className="rounded-gl border border-white/15 bg-white/10 p-4 backdrop-blur">Role Access</div>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="text-xl font-semibold tracking-tight text-botanical-green">
                Garden Live
              </Link>
            </div>
            <div className="rounded-[24px] border border-[#DDE5DC] bg-white p-6 shadow-glLg sm:p-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
