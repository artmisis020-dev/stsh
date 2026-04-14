import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { enMessages } from "../locales/en";
import { ukMessages } from "../locales/uk";
import type { SupportedLanguage, TranslationMessages } from "./types";

const LANGUAGE_STORAGE_KEY = "starshield-language";

const TRANSLATIONS: Record<SupportedLanguage, TranslationMessages> = {
  en: enMessages,
  uk: ukMessages,
};

type I18nContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  messages: TranslationMessages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLanguage(): SupportedLanguage {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage === "uk" || storedLanguage === "en") {
    return storedLanguage;
  }

  return "uk";
}

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      messages: TRANSLATIONS[language],
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }

  return context;
}
