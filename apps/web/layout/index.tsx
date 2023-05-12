import React from "react";

import NavBar from "../components/Navbar";

import GlobalStyle from "../styles/global";

import Home from "../pages/home";

function Layout() {
  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <Home />
    </div>
  );
}

export default Layout;
