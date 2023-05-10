'use client';

import Layout from "../layout";

import dark from "../styles/themes/dark";
import { ThemeProvider } from "styled-components";


export default function Page() {
  return (
    <>
      <ThemeProvider theme={dark}>
        <Layout />
      </ThemeProvider>      
    </>
  );
}
