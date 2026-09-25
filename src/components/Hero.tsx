"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, ButtonLink, LeafRule } from "./ui";
import { showcaseImage } from "@/data/products";
import { trackEvent } from "@/lib/analytics/gtag";

export default function Hero() {
  const { t, lang } = useLanguage();
  return (
    <section id="home" className="relative overflow-hidden bg-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-forest-pale/70 blur-2xl"
      />
      <Container className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 py-14 sm:py-20">
        <div>
          <p className="text-sm font-medium tracking-wide text-saffron-dark mb-3">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-forest leading-[1.1] text-balance">
            {t.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-ink-soft text-base sm:text-lg leading-relaxed">
            {t.hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink
              href="#products"
              variant="primary"
              onClick={() => trackEvent("cta_click", { cta_name: "explore_products", location: "hero" })}
            >
              {t.hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href="#about"
              variant="secondary"
              onClick={() => trackEvent("cta_click", { cta_name: "learn_our_approach", location: "hero" })}
            >
              {t.hero.ctaSecondary}
            </ButtonLink>
          </div>

          <LeafRule className="mt-9 mb-4" />

          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
            <li>{t.hero.trust1}</li>
            <li>{t.hero.trust2}</li>
            <li>{t.hero.trust3}</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -rotate-2 rounded-2xl bg-forest-pale" aria-hidden="true" />
          <div className="relative rounded-2xl border border-line bg-white p-6 shadow-sm">
            <Image
              src={showcaseImage.src}
              alt={showcaseImage.alt[lang]}
              width={640}
              height={640}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
