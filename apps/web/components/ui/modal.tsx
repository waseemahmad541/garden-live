"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl"
};

export function Modal({ open, onOpenChange, title, description, children, footer, size = "md" }: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        className="absolute inset-0 cursor-default bg-botanical-black/40"
        aria-label="Close modal"
        onClick={() => onOpenChange(false)}
      />
      <div className={cn("relative w-full rounded-xl border border-[#DDE5DC] bg-white shadow-glLg", sizes[size])}>
        <div className="flex items-start justify-between gap-4 border-b border-[#E7ECE6] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-botanical-black">{title}</h2>
            {description ? <p className="mt-1 text-sm text-neutral-slate">{description}</p> : null}
          </div>
          <Button aria-label="Close modal" variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer ? <div className="border-t border-[#E7ECE6] px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}
