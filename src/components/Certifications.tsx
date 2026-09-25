"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";

export default function Certifications() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container>
        <SectionHeading heading={t.certifications.heading} align="center" />
        <figure className="mt-10 mx-auto max-w-2xl rounded-lg overflow-hidden border border-line bg-white">
          <div className="relative aspect-square sm:aspect-[4/3]">
            <Image
              src="/images/banners/certifications-banner.jpg"
              alt={t.certifications.imageAlt}
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="p-4 text-xs text-ink-soft text-center leading-relaxed">
            {t.certifications.note}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
