"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "./ui";

export default function Expertise() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container>
        <figure className="rounded-lg overflow-hidden border border-line bg-white">
          <div className="relative aspect-[16/7]">
            <Image
              src="/images/banners/expertise-banner.jpg"
              alt={t.expertise.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="mt-8 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-forest leading-tight text-balance">
            {t.expertise.heading}
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">{t.expertise.p1}</p>
          <p className="mt-3 text-ink-soft leading-relaxed">{t.expertise.p2}</p>
          <p className="mt-4 text-xs text-ink-soft/80 leading-relaxed">
            {t.expertise.imageCaption}
          </p>
        </div>
      </Container>
    </section>
  );
}
