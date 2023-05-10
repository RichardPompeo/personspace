import React from 'react';

import NavBar from '../components/NavBar';
import GlobalStyle from "../styles/global";

function Layout({children}) {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <main>{children}</main>
    </>
  )
}

export default Layout;