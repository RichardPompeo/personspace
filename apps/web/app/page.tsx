"use client";

import { ThemeProvider } from "styled-components";

import Layout from "../layout";

import dark from "../styles/themes/dark";

export default function Page() {
  return (
    <ThemeProvider theme={dark}>
      <Layout />
<<<<<<< HEAD
    </ThemeProvider>      
=======
    </ThemeProvider>
>>>>>>> 2196dde0a00067b4df4d4acac13d7941bafbb369
  );
}