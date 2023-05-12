import React from "react";
import { useTranslation } from "react-i18next";

import abstract from "../assets/abstract.svg";
import {
  Container,
  HeaderContent,
  Header,
  Title,
  Button,
  SubTitle,
  Img,
} from "../styles/pages/HomeStyles";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Container>
      <HeaderContent>
        <Header>
          <Title>{t("home.title")}</Title>
          <SubTitle>{t("home.subtitle")}</SubTitle>
          <Button>{t("home.aboutTheSiteButton")}</Button>
        </Header>
        <Img src={abstract.src} />
      </HeaderContent>
    </Container>
  );
}
