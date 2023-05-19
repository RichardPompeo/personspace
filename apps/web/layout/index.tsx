import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Row, Col } from "antd";

import NavBar from "../components/Navbar";
import UtilityContent from "../components/UtilityContent";

import abstract from "../assets/abstract.svg";

import { LayoutContext } from "../context/LayoutProvider";
import { Container as LayoutContainer } from "../styles/components/LayoutStyles";
import { CustomPrimaryButton } from "ui";
import {
  Container,
  HeaderContent,
  Header,
  Title,
  SubTitle,
  Img,
} from "../styles/pages/HomeStyles";

export default function Layout() {
  const { menu } = useContext(LayoutContext);

  const { t } = useTranslation();

  return (
    <LayoutContainer>
      <Row>
        <Col span={menu ? 4 : 2}>
          <NavBar />
        </Col>
        <Col span={menu ? 8 : 10}>
          <UtilityContent />
          <Container>
            <HeaderContent>
              <Header>
                <Title>
                  <Trans i18nKey="home.title" components={[<strong key={0} />]}>
                    {t("home.title")}
                  </Trans>
                </Title>
                <SubTitle>{t("home.subtitle")}</SubTitle>
                <CustomPrimaryButton
                  setPadding="1.3em 2em"
                  setFontSize="clamp(10pt, 1vw, 12pt)"
                  setFontWeight="600"
                  setBackgroundColor="#ffffff"
                  setResFontSize="clamp(9pt, 0.5vw, 10pt)"
                  setResPadding="0.9em 1em"
                  setWidth="100%"
                >
                  {t("home.aboutTheSiteButton")}
                </CustomPrimaryButton>
              </Header>
              <Img src={abstract.src} />
            </HeaderContent>
          </Container>
        </Col>
      </Row>
    </LayoutContainer>
  );
}
