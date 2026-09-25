"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";

export default function Benefits() {
  const { t } = useLanguage();
  return (
    <section id="benefits" className="py-16 sm:py-20">
      <Container>
        <SectionHeading heading={t.benefits.heading} sub={t.benefits.sub} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.benefits.items.map((item, i) => (
            <div key={i} className="flex gap-4 rounded-lg border border-line bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron/15 text-saffron-dark font-display font-semibold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-forest">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
