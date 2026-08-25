"use client";

import { useState } from "react";
import { FaqItem } from "@/lib/types";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-mist/70 border-y border-mist/70">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-display text-base font-medium text-ink">{item.question}</span>
              <span className={`shrink-0 text-forest transition-transform ${isOpen ? "rotate-45" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? "max-h-40" : "max-h-0"}`}
            >
              <p className="pb-5 text-sm leading-relaxed text-ink/70">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
