import { useMemo } from "react";
import { products } from "@/data/products";
import type { Dictionary } from "@/lib/i18n/en";
import type { Lang } from "@/lib/i18n/LanguageContext";

export function useProductSearch(query: string, t: Dictionary, lang: Lang) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    const categoryName = t.categories.kidsName.toLowerCase();
    const categoryMatches = q.length > 0 && categoryName.includes(q);

    if (!q) {
      return { productResults: [], categoryMatches: false };
    }

    const productResults = products.filter((p) => {
      const copy = t.products.items[p.id];
      const haystack = [
        copy.name,
        copy.description,
        p.id,
        t.categories.kidsName,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    void lang;
    return { productResults, categoryMatches };
  }, [query, t, lang]);
}
