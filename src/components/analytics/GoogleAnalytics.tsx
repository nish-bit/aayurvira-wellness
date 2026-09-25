"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, pageview } from "@/lib/analytics/gtag";
import {
  CONSENT_CHANGED_EVENT,
  getStoredConsent,
  type ConsentStatus,
} from "@/lib/analytics/consent";

/**
 * Loads Google Analytics 4 — but only once NEXT_PUBLIC_GA_ID is set AND
 * the visitor has explicitly accepted analytics. Nothing here runs before
 * both are true, and declining or clearing consent tears the script's
 * effect down again (no further events are sent; the script tag itself
 * is simply not re-added on the next mount cycle since `consent` gates
 * the render below).
 */
export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Intentional: reads the stored consent choice once on mount (SSR
    // always renders "not yet decided", matching a first-time visitor).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getStoredConsent());
    function onChange(e: Event) {
      setConsent((e as CustomEvent<ConsentStatus>).detail);
    }
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (consent !== "granted" || !GA_ID) return;
    const query = searchParams.toString();
    pageview(pathname + (query ? `?${query}` : ""));
  }, [pathname, searchParams, consent]);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
