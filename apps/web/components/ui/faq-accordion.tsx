"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-[#E3E8E2] rounded-gl border border-[#E3E8E2] bg-white", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              className="gl-focus-ring flex w-full items-center justify-between gap-4 rounded-gl px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-sm font-semibold text-botanical-black">{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 flex-none text-neutral-stone transition", isOpen && "rotate-180")} aria-hidden />
            </button>
            {isOpen ? <div className="px-5 pb-5 text-sm leading-6 text-neutral-slate">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
