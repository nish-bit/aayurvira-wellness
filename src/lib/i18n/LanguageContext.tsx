"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./en";
import hi from "./hi";
import type { Dictionary } from "./en";

export type Lang = "hi" | "en";

const DICTS: Record<Lang, Dictionary> = { en, hi };
const STORAGE_KEY = "aayurvira-lang";

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Hindi is the default/primary language, per brand requirement.
  const [lang, setLangState] = useState<Lang>("hi");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi") {
      // Intentional: sync React state with the localStorage value on mount.
      // The server always renders the Hindi default, so this one-time
      // client read (not a re-render loop) is what applies a returning
      // visitor's saved language choice.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "hi" ? "en" : "hi");
  }, [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: DICTS[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang]
  );

  // Avoid a hydration flash by rendering nothing language-specific until
  // we've checked localStorage on the client. The server always renders
  // Hindi (the default), which matches most first visits.
  void hydrated;

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
