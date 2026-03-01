"use client";

import {
  createContext,
  useContext,
  useEffect,
  startTransition,
  useState,
} from "react";

export type Language = "en" | "ur";

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "lang.label": "English",
    "lang.switch": "Switch to Urdu",
    "nav.solution": "Solution",
    "nav.security": "Security",
    "nav.support": "Support",
  },
  ur: {
    "lang.label": "اردو",
    "lang.switch": "انگریزی میں تبدیل کریں",
    "nav.solution": "حل",
    "nav.security": "سیکیورٹی",
    "nav.support": "مدد",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    const detected = navigator.language.toLowerCase().startsWith("ur")
      ? "ur"
      : "en";
    const resolved: Language =
      saved === "en" || saved === "ur" ? saved : detected;

    startTransition(() => {
      setLanguage(resolved);
    });
  }, []);

  const isRTL = language === "ur";

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [language, isRTL]);

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "ur" : "en";
    setLanguage(next);
    localStorage.setItem("language", next);
  };

  const t = (key: string): string =>
    translations[language][key] ?? translations["en"][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
