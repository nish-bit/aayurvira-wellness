"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useProductSearch } from "@/lib/useProductSearch";

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { productResults, categoryMatches } = useProductSearch(query, t, lang);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      // Intentional: clear the query once the overlay has fully closed,
      // so the next time it opens it starts blank.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 px-4 pt-24">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.search.ariaOpen}
        className="w-full max-w-xl rounded-md bg-ivory shadow-xl border border-line"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-forest shrink-0">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent outline-none text-ink placeholder:text-ink-soft/70"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.search.ariaClose}
            className="text-ink-soft hover:text-forest shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? null : productResults.length === 0 && !categoryMatches ? (
            <p className="text-sm text-ink-soft py-6 text-center">{t.search.noResults}</p>
          ) : (
            <div className="space-y-4">
              {categoryMatches ? (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft mb-2">
                    {t.search.resultsCategories}
                  </p>
                  <a
                    href="#categories"
                    onClick={onClose}
                    className="block rounded-sm border border-line px-3 py-2 hover:border-forest"
                  >
                    {t.categories.kidsName}
                  </a>
                </div>
              ) : null}

              {productResults.length > 0 ? (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft mb-2">
                    {t.search.resultsProducts}
                  </p>
                  <ul className="space-y-2">
                    {productResults.map((p) => (
                      <li key={p.id}>
                        <a
                          href="#products"
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-sm border border-line px-3 py-2 hover:border-forest"
                        >
                          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-white">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-contain"
                            />
                          </span>
                          <span className="text-sm font-medium text-ink">
                            {t.products.items[p.id].name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
