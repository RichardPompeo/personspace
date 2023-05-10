"use client";

import { ThemeProvider } from "styled-components";

import Layout from "../layout";

import dark from "../styles/themes/dark";

export default function Page() {
  return (
    <ThemeProvider theme={dark}>
      <Layout />
    </ThemeProvider>
  );
}
