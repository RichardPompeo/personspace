"use client";
import React from "react";
import { initReactI18next } from "react-i18next";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ThemeProvider } from "styled-components";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { LayoutProvider } from "../contexts/LayoutProvider";
import { AuthProvider } from "../contexts/AuthProvider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=supreme@800,400,200,100,300,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider theme={darkTheme}>
            <LayoutProvider>
              <AuthProvider>
                <GlobalStyle />
                {children}
              </AuthProvider>
            </LayoutProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

export { i18n };
