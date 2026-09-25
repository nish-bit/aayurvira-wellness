"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Container } from "./ui";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics/gtag";
import { openConsentSettings } from "@/lib/analytics/consent";

const EXPLORE_LINKS = [
  { href: "#home", key: "home" as const },
  { href: "#products", key: "products" as const },
  { href: "#about", key: "about" as const },
  { href: "#reviews", key: "reviews" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#contact", key: "contact" as const },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-ivory/90">
      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-forest font-display font-semibold text-sm">
                AV
              </span>
              <span className="font-display font-semibold text-ivory text-lg leading-none">
                Aayurvira
                <span className="block text-[0.65rem] font-body font-medium tracking-wide text-saffron">
                  WELLNESS
                </span>
              </span>
            </span>
            <p className="mt-4 text-sm text-ivory/70 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ivory/60">
              {t.footer.linksHeading}
            </h3>
            <ul className="mt-4 space-y-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={
                      item.key === "contact"
                        ? () => trackEvent("contact_click", { location: "footer_nav" })
                        : undefined
                    }
                    className="text-sm text-ivory/80 hover:text-saffron transition-colors"
                  >
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ivory/60">
              {t.footer.categoriesHeading}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#categories" className="text-sm text-ivory/80 hover:text-saffron transition-colors">
                  {t.categories.kidsName}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ivory/60">
              {t.footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => trackEvent("email_click", { location: "footer" })}
                  className="hover:text-saffron transition-colors"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <nav aria-label={t.footer.legalHeading} className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ivory/70">
            <Link href="/legal/privacy-policy" className="hover:text-saffron transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/legal/terms-of-service" className="hover:text-saffron transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/legal/shipping-policy" className="hover:text-saffron transition-colors">
              {t.footer.shipping}
            </Link>
            <Link href="/legal/return-refund-policy" className="hover:text-saffron transition-colors">
              {t.footer.returns}
            </Link>
            <button
              type="button"
              onClick={openConsentSettings}
              className="hover:text-saffron transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.cookieSettings}
            </button>
          </nav>
          <p className="text-xs text-ivory/60">
            © {year} Aayurvira Wellness. {t.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
