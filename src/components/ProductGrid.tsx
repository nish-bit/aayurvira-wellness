"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { t } = useLanguage();
  return (
    <section id="products" className="py-16 sm:py-20">
      <Container>
        <SectionHeading heading={t.products.heading} sub={t.products.sub} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-soft/80 max-w-2xl leading-relaxed">
          {t.products.disclaimer}
        </p>
      </Container>
    </section>
  );
}
