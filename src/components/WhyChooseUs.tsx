"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading heading={t.whyChooseUs.heading} sub={t.whyChooseUs.sub} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <ul className="space-y-5">
            {t.whyChooseUs.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <CheckIcon />
                <div>
                  <p className="font-semibold text-forest">{item.title}</p>
                  <p className="text-sm text-ink-soft mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <figure className="rounded-lg border border-line overflow-hidden bg-white">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/banners/why-choose-us-comparison.jpg"
                alt={t.whyChooseUs.imageAlt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-4 text-xs text-ink-soft leading-relaxed">
              {t.whyChooseUs.imageCaption}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 mt-0.5 text-saffron-dark">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
