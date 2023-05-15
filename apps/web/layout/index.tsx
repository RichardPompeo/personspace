import React, { useContext } from "react";
import { Row, Col } from "antd";

import NavBar from "../components/Navbar";
import Home from "../pages/home";
import UtilityContent from "../components/UtilityContent";

import GlobalStyle from "../styles/global";
import { LayoutContext } from "../context/LayoutProvider";
import { Container } from "../styles/components/LayoutStyles";

export default function Layout() {
  const { menu } = useContext(LayoutContext);

  return (
    <Container>
      <GlobalStyle />
      <Row>
        <Col span={ menu ? 4 : 2}>
          <NavBar />
        </Col>
        <Col span={ menu ? 8 : 10}>
          <UtilityContent />
          <Home />
        </Col>
      </Row>
    </Container>
  );
};
