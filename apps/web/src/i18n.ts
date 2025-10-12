import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/languages/en.json";
import pt from "@/languages/pt.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: en.en,
      pt: pt.pt,
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
