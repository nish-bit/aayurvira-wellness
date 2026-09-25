"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container, SectionHeading } from "./ui";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20 bg-ivory-deep/60">
      <Container>
        <SectionHeading heading={t.bestSellers.heading} sub={t.bestSellers.sub} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
