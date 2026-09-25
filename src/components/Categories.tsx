"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";
import { showcaseImage } from "@/data/products";

export default function Categories() {
  const { t, lang } = useLanguage();
  return (
    <section id="categories" className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container>
        <SectionHeading heading={t.categories.heading} sub={t.categories.sub} />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="#products"
            className="group relative overflow-hidden rounded-lg border border-line bg-white flex flex-col sm:flex-row"
          >
            <div className="relative h-48 sm:h-auto sm:w-48 shrink-0 bg-forest-pale/50">
              <Image
                src={showcaseImage.src}
                alt={showcaseImage.alt[lang]}
                fill
                sizes="192px"
                className="object-contain p-4"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="font-display text-xl font-semibold text-forest">
                {t.categories.kidsName}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {t.categories.kidsDesc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-saffron-dark group-hover:gap-2 transition-all">
                {t.categories.cta}
                <ArrowIcon />
              </span>
            </div>
          </a>

          <div className="rounded-lg border border-dashed border-line/80 bg-transparent p-6 flex flex-col justify-center">
            <h3 className="font-display text-xl font-semibold text-ink-soft">
              {t.categories.comingSoonTitle}
            </h3>
            <p className="mt-2 text-sm text-ink-soft/80 leading-relaxed">
              {t.categories.comingSoonDesc}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
