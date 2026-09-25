"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  getStoredConsent,
  storeConsent,
  OPEN_CONSENT_SETTINGS_EVENT,
} from "@/lib/analytics/consent";

export default function ConsentBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    // Intentional: this reads localStorage once on mount to decide
    // whether the banner should show (SSR always renders nothing/hidden
    // since localStorage isn't available server-side).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (getStoredConsent() === null) setVisible(true);

    function openSettings() {
      setAnalyticsOn(getStoredConsent() === "granted");
      setShowSettings(true);
      setVisible(true);
    }
    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
  }, []);

  function accept() {
    storeConsent("granted");
    setVisible(false);
    setShowSettings(false);
  }

  function reject() {
    storeConsent("denied");
    setVisible(false);
    setShowSettings(false);
  }

  function saveSettings() {
    storeConsent(analyticsOn ? "granted" : "denied");
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.consent.message}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/98 backdrop-blur px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft leading-relaxed">{t.consent.message}</p>

          {!showSettings ? (
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={reject}
                className="rounded-sm border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-ivory-deep focus-visible:outline-2 focus-visible:outline-saffron"
              >
                {t.consent.reject}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnalyticsOn(getStoredConsent() === "granted");
                  setShowSettings(true);
                }}
                className="rounded-sm border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-ivory-deep focus-visible:outline-2 focus-visible:outline-saffron"
              >
                {t.consent.settings}
              </button>
              <button
                type="button"
                onClick={accept}
                className="rounded-sm bg-forest px-4 py-2 text-sm font-medium text-ivory hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-saffron"
              >
                {t.consent.accept}
              </button>
            </div>
          ) : null}
        </div>

        {showSettings ? (
          <div className="mt-4 rounded-lg border border-line bg-ivory-deep/50 p-4">
            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="text-sm font-medium text-ink">{t.consent.analyticsLabel}</span>
                <span className="mt-0.5 block text-xs text-ink-soft leading-relaxed">
                  {t.consent.settingsDesc}
                </span>
              </span>
              <input
                type="checkbox"
                checked={analyticsOn}
                onChange={(e) => setAnalyticsOn(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-forest"
                aria-label={t.consent.analyticsLabel}
              />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="rounded-sm border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-saffron"
              >
                {t.consent.cancel}
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="rounded-sm bg-forest px-4 py-2 text-sm font-medium text-ivory hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-saffron"
              >
                {t.consent.save}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
