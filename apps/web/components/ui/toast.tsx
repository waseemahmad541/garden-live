"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "error" | "warning" | "info" | "loading";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const toneStyles: Record<ToastTone, string> = {
  success: "border-botanical-mint",
  error: "border-[#F0C6C2]",
  warning: "border-[#F9DFA8]",
  info: "border-accent-sky",
  loading: "border-[#DDE5DC]"
};

const icons: Record<ToastTone, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-status-success" aria-hidden />,
  error: <AlertCircle className="h-5 w-5 text-status-error" aria-hidden />,
  warning: <AlertCircle className="h-5 w-5 text-status-warning" aria-hidden />,
  info: <Info className="h-5 w-5 text-status-info" aria-hidden />,
  loading: <Loader2 className="h-5 w-5 animate-spin text-neutral-slate" aria-hidden />
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = React.useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = crypto.randomUUID();
      setToasts((current) => [{ id, ...toast }, ...current].slice(0, 3));
      if (toast.tone !== "loading") {
        window.setTimeout(() => dismissToast(id), 4500);
      }
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="fixed right-4 top-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-5 sm:top-5">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-gl border bg-white p-4 shadow-glMd",
              toneStyles[toast.tone ?? "info"]
            )}
            role="status"
          >
            {icons[toast.tone ?? "info"]}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-botanical-black">{toast.title}</p>
              {toast.description ? <p className="mt-1 text-sm text-neutral-slate">{toast.description}</p> : null}
            </div>
            <button
              className="gl-focus-ring rounded-md p-1 text-neutral-stone hover:bg-neutral-mist hover:text-botanical-black"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
