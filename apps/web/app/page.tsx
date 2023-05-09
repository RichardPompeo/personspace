'use client';

import dark from "../styles/themes/dark";
import NavBar from "../components/NavBar";

import GlobalStyle from "../styles/global";
import { ThemeProvider } from "styled-components";

export default function Page() {
  return (
    <>
      <ThemeProvider theme={dark}>
        <GlobalStyle />
        <NavBar />
      </ThemeProvider>      
    </>
  );
}
