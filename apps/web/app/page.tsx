"use client";

import React from "react";
import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ThemeProvider } from "styled-components";

import { LayoutProvider } from "../contexts/LayoutProvider";
import { AuthProvider } from "../contexts/AuthProvider";

import Layout from "../layout";

import GlobalStyle from "../styles/global";
import { darkTheme } from "../styles/themes/dark";

import en from "../languages/en.json";
import pt from "../languages/pt.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

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

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <LayoutProvider>
          <AuthProvider>
            <GlobalStyle />
            <Layout />
          </AuthProvider>
        </LayoutProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
