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
        <Col xxl={menu ? 5 : 3} xl={menu ? 7 : 4} lg={menu ? 5 : 3} md={2} sm={24} xs={24}>
          <NavBar />
        </Col>
        <Col
          xxl={menu ? 18 : 19}
          xl={menu ? 15 : 17}
          lg={menu ? 16 : 18}
          md={menu ? 20 : 20}
          sm={24}
          xs={24}
        >
          <Container>{children}</Container>
        </Col>
        <Col xxl={1} xl={ menu ? 2 : 3} lg={3} md={menu ? 2 : 2} sm={24} xs={24}>
          <UtilityContent />
        </Col>
      </Row>
    </LayoutContainer>
  );
}
