import React, { useContext } from "react";

import { Row, Col } from "antd";

import NavBar from "../components/app/Navbar";
import UtilityContent from "../components/app/UtilityContent";

import { LayoutContext } from "../contexts/LayoutProvider";
import { Container as LayoutContainer } from "./LayoutStyles";

import { Container } from "../app/HomeStyles";

export default function Layout({ children }) {
  const { menu } = useContext(LayoutContext);

  return (
    <LayoutContainer>
      <Row>
        <Col xl={menu ? 5 : 2} lg={menu ? 5 : 2} md={2} sm={24} xs={24}>
          <NavBar />
        </Col>
        <Col
          xl={menu ? 16 : 19}
          lg={menu ? 16 : 19}
          md={menu ? 14 : 17}
          sm={24}
          xs={24}
        >
          <Container>{children}</Container>
        </Col>
        <Col xl={3} lg={3} md={menu ? 8 : 5} sm={24} xs={24}>
          <UtilityContent />
        </Col>
      </Row>
    </LayoutContainer>
  );
}
