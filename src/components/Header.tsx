"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "./ui";
import SearchOverlay from "./SearchOverlay";
import { trackEvent } from "@/lib/analytics/gtag";

const NAV_ITEMS = [
  { href: "#home", key: "home" as const },
  { href: "#products", key: "products" as const },
  { href: "#categories", key: "categories" as const },
  { href: "#about", key: "about" as const },
  { href: "#benefits", key: "benefits" as const },
  { href: "#reviews", key: "reviews" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#contact", key: "contact" as const },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-line">
      <Container className="flex items-center justify-between h-16 sm:h-[4.5rem]">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory font-display font-semibold text-sm">
            AV
          </span>
          <span className="font-display font-semibold text-forest text-lg leading-none">
            Aayurvira
            <span className="block text-[0.65rem] font-body font-medium tracking-wide text-saffron-dark">
              WELLNESS
            </span>
          </span>
        </a>

        <nav aria-label={t.nav.ariaMain} className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={
                item.key === "contact"
                  ? () => trackEvent("contact_click", { location: "header_nav" })
                  : undefined
              }
              className="text-sm font-medium text-ink hover:text-forest transition-colors"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t.search.ariaOpen}
            className="p-2 rounded-full hover:bg-forest-pale text-forest"
          >
            <SearchGlyph />
          </button>

          <LangSwitch lang={lang} setLang={setLang} label={t.nav.languageLabel} />

          <button
            type="button"
            className="lg:hidden p-2 rounded-full hover:bg-forest-pale text-forest"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseGlyph /> : <MenuGlyph />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div className="lg:hidden border-t border-line bg-ivory">
          <Container className="py-3 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  if (item.key === "contact") trackEvent("contact_click", { location: "mobile_nav" });
                }}
                className="py-2.5 text-base font-medium text-ink border-b border-line/70 last:border-0"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </Container>
        </div>
      ) : null}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function LangSwitch({
  lang,
  setLang,
  label,
}: {
  lang: "hi" | "en";
  setLang: (l: "hi" | "en") => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-forest/40 overflow-hidden text-xs font-medium"
    >
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "hi" ? "bg-forest text-ivory" : "text-forest hover:bg-forest-pale"
        }`}
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === "en" ? "bg-forest text-ivory" : "text-forest hover:bg-forest-pale"
        }`}
      >
        EN
      </button>
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function MenuGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}
