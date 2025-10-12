import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { LayoutProvider } from "@/contexts/LayoutProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import AppRouter from "./Router";
import { Toaster } from "ui";

import "./index.css";
import "./i18n";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <LayoutProvider>
          <AuthProvider>
            <AppRouter />
            <Toaster />
          </AuthProvider>
        </LayoutProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}
