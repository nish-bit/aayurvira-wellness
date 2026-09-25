"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading heading={t.faq.heading} align="center" />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-forest transition-transform ${open ? "rotate-45" : ""}`}
                  >
                    <PlusIcon />
                  </span>
                </button>
                {open ? (
                  <p id={`faq-panel-${i}`} className="pb-5 text-sm text-ink-soft leading-relaxed">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
