"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export function LiveDataPanel({ endpoint, title }: { endpoint: string; title: string }) {
  const [state, setState] = React.useState<{
    loading: boolean;
    error?: string;
    payload?: unknown;
  }>({ loading: true });

  React.useEffect(() => {
    let mounted = true;
    fetch(endpoint, { credentials: "include" })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error?.message ?? "Live data request failed.");
        }
        if (mounted) setState({ loading: false, payload: payload.data });
      })
      .catch((error) => {
        if (mounted) setState({ loading: false, error: error instanceof Error ? error.message : "Live data request failed." });
      });
    return () => {
      mounted = false;
    };
  }, [endpoint]);

  const metricCount =
    state.payload && typeof state.payload === "object" && "metrics" in state.payload
      ? Object.keys((state.payload as { metrics?: Record<string, unknown> }).metrics ?? {}).length
      : state.payload && typeof state.payload === "object" && "summary" in state.payload
        ? Object.keys((state.payload as { summary?: Record<string, unknown> }).summary ?? {}).length
        : 0;

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.075] p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-emerald-50/55">{endpoint}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50">
          {state.loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Loading live data
            </>
          ) : state.error ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5 text-amber-200" aria-hidden />
              Auth or data unavailable
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-lime-200" aria-hidden />
              Live DB connected
            </>
          )}
        </div>
      </div>
      {state.error ? (
        <p className="mt-3 text-sm text-amber-100">{state.error}</p>
      ) : !state.loading ? (
        <p className="mt-3 text-sm text-emerald-50/65">Loaded {metricCount || "database"} fields from Prisma-backed API.</p>
      ) : null}
    </div>
  );
}
