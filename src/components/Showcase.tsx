"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";
import { showcaseImage } from "@/data/products";

export default function Showcase() {
  const { t, lang } = useLanguage();
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-square rounded-2xl border border-line bg-white p-8 order-2 lg:order-1">
          <Image
            src={showcaseImage.src}
            alt={showcaseImage.alt[lang]}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-contain p-6"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading heading={t.showcase.heading} sub={t.showcase.sub} />
        </div>
      </Container>
    </section>
  );
}
