"use client";

import React from "react";
import { Trans, useTranslation } from "react-i18next";

import Layout from "../layout";

import { PrimaryButton } from "ui";

import abstract from "../assets/abstract.svg";

import {
  HeaderContent,
  Header,
  Title,
  SubTitle,
  Img,
} from "../styles/pages/HomeStyles";

export default function Page() {
  const { t } = useTranslation();

  return (
    <Layout>
      <HeaderContent>
        <Header>
          <Title>
            <Trans i18nKey="home.title" components={[<strong key={0} />]}>
              {t("home.title")}
            </Trans>
          </Title>
          <SubTitle>{t("home.subtitle")}</SubTitle>
          <PrimaryButton size="large">
            {t("home.aboutTheSiteButton")}
          </PrimaryButton>
        </Header>
        <Img src={abstract.src} />
      </HeaderContent>
    </Layout>
  );
}
