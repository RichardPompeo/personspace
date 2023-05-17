"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { ThemeProvider } from "styled-components";
import { LayoutProvider } from "../context/LayoutProvider";

import Layout from "../layout";

import en from "../languages/en.json";
import pt from "../languages/pt.json";

import { darkTheme } from "../styles/themes/dark";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      ...en,
      ...pt,
    },
  });

export default function Page() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LayoutProvider>
        <Layout />
      </LayoutProvider>
    </ThemeProvider>
  );
}
