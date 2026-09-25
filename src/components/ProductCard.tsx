"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProductEnquiryModal from "./ProductEnquiryModal";
import type { Product } from "@/data/products";
import { trackEvent } from "@/lib/analytics/gtag";

export default function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLanguage();
  const copy = t.products.items[product.id];
  const cardRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fires "view_product" once per product per page load, when the card
  // actually becomes visible to the visitor (not just present in the DOM).
  useEffect(() => {
    const el = cardRef.current;
    if (!el || viewedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          trackEvent("view_product", { item_id: product.id, item_name: copy.name });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id, copy.name]);

  return (
    <div ref={cardRef} className="flex flex-col rounded-lg border border-line bg-white overflow-hidden">
      <div className="relative aspect-square bg-forest-pale/40">
        <Image
          src={product.image}
          alt={product.imageAlt[lang]}
          fill
          sizes="(min-width: 768px) 320px, 45vw"
          className="object-contain p-6"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-forest leading-snug">
          {copy.name}
        </h3>
        <p className="text-xs font-medium text-saffron-dark mt-0.5">{copy.size}</p>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">
          {copy.description}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] font-medium text-forest-light">
          <li className="rounded-full bg-forest-pale px-2 py-0.5">{t.products.natural}</li>
          <li className="rounded-full bg-forest-pale px-2 py-0.5">{t.products.noSideEffect}</li>
          <li className="rounded-full bg-forest-pale px-2 py-0.5">{t.products.madeInIndia}</li>
        </ul>

        <p className="mt-3 text-sm font-medium text-ink">
          {product.priceINR ? `\u20b9${product.priceINR}` : t.products.priceOnRequest}
        </p>

        <button
          type="button"
          onClick={() => {
            trackEvent("cta_click", {
              cta_name: "product_enquiry_open",
              item_id: product.id,
              item_name: copy.name,
              location: "product_card",
            });
            setModalOpen(true);
          }}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-forest px-4 py-2.5 text-sm font-medium text-ivory hover:bg-forest-light transition-colors"
        >
          {t.products.addToEnquiry}
        </button>
      </div>

      {modalOpen ? (
        <ProductEnquiryModal
          productId={product.id}
          productName={copy.name}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
