import React from "react";
import NavBar from "../components/NavBar";
import GlobalStyle from "../styles/global";

import Home from "../pages/home/home";

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
