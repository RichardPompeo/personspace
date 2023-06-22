import React, { useContext } from "react";

import { Row, Col } from "antd";

import NavBar from "../components/Navbar";
import UtilityContent from "../components/UtilityContent";

import { LayoutContext } from "../contexts/LayoutProvider";
import { Container as LayoutContainer } from "../styles/components/LayoutStyles";

import { Container } from "../styles/pages/HomeStyles";

export default function Layout({ children }) {
  const { menu } = useContext(LayoutContext);

  return (
    <LayoutContainer>
      <Row>
        <Col span={menu ? 4 : 2}>
          <NavBar />
        </Col>
        <Col span={menu ? 8 : 10}>
          <UtilityContent />
          <Container>{children}</Container>
        </Col>
      </Row>
    </LayoutContainer>
  );
}
