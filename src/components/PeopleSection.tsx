"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";
import { customerPhotos } from "@/data/testimonials";

export default function PeopleSection() {
  const { t } = useLanguage();

  if (customerPhotos.length === 0) {
    return (
      <section className="py-14 sm:py-16 bg-ivory-deep/60">
        <Container>
          <div className="rounded-lg border border-dashed border-line px-6 py-10 text-center max-w-xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-forest">
              {t.people.emptyTitle}
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              {t.people.emptyDesc}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container>
        <SectionHeading heading={t.people.heading} align="center" />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {customerPhotos.map((p) => (
            <div key={p.image} className="relative aspect-square overflow-hidden rounded-lg border border-line">
              <Image src={p.image} alt={p.name} fill sizes="240px" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
