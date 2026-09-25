"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, LeafRule } from "./ui";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-16 sm:py-20 bg-forest text-ivory">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-balance">
          {t.about.heading}
        </h2>
        <LeafRule className="mt-5 text-saffron/70" />
        <div className="mt-6 space-y-4 text-ivory/85 leading-relaxed">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
      </Container>
    </section>
  );
}
