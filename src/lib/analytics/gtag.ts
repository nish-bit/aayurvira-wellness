"use client";

// Measurement ID lives in an env var, never hard-coded. If it's unset,
// every function here is a silent no-op — the site works identically
// with or without analytics configured.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isGaReady(): boolean {
  return Boolean(GA_ID) && typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Fired manually on each route change. GA is initialized with
 * send_page_view: false (see GoogleAnalytics.tsx) specifically so this is
 * the ONLY thing that sends a page_view — that avoids the double-counted
 * page views that a plain gtag('config', ...) call would otherwise send
 * on every client-side navigation in a Next.js app.
 */
export function pageview(path: string) {
  if (!isGaReady()) return;
  window.gtag!("event", "page_view", { page_path: path });
}

/**
 * The only event names this site ever sends. Keeping this a closed union
 * (rather than accepting any string) is deliberate: it stops a future
 * change from inventing a new ad-hoc event name that might carry
 * personal data along with it.
 */
export type GaEventName =
  | "view_product"
  | "add_to_cart"
  | "buy_now"
  | "begin_checkout"
  | "contact_click"
  | "email_click"
  | "cta_click"
  | "contact_form_submitted";

/**
 * The only parameter keys this site ever sends with an event — all
 * non-identifying (an item id/name, a CTA's internal name, a coarse
 * "where on the page" label, a numeric value). Never a name, phone
 * number, email address, or free-text form field.
 */
export type GaEventParams = {
  item_id?: string;
  item_name?: string;
  cta_name?: string;
  location?: string;
  value?: number;
};

export function trackEvent(name: GaEventName, params: GaEventParams = {}) {
  if (!isGaReady()) return;
  window.gtag!("event", name, params);
}
