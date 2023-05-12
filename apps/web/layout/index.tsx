import React from "react";

import NavBar from "../components/Navbar";
import Home from "../pages/home";

import GlobalStyle from "../styles/global";

export default function Layout() {
  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <Home />
    </div>
  );
}
