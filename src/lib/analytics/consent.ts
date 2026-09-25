"use client";

// Analytics is strictly opt-in: nothing in ./gtag.ts loads or sends data
// until this module reports "granted". No cookie is read or written for
// analytics purposes before that point.

export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "aayurvira-analytics-consent";

export const CONSENT_CHANGED_EVENT = "aayurvira-consent-changed";
export const OPEN_CONSENT_SETTINGS_EVENT = "aayurvira-open-consent-settings";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "granted" || raw === "denied" ? raw : null;
}

export function storeConsent(status: ConsentStatus) {
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(
    new CustomEvent<ConsentStatus>(CONSENT_CHANGED_EVENT, { detail: status })
  );
}

/** Called by a "cookie settings" link elsewhere on the site to reopen the banner. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT));
}
