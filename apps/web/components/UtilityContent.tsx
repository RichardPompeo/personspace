import React from "react";
import { UIButton } from "ui";

import { RiGlobeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import {
  Container,
  ButtonSU,
  ButtonSI,
  ContentRegistration
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const { t } = useTranslation();

  return (
    <Container>
      <UIButton setIndex="none" setPosition="none">
        <RiGlobeFill fontSize={23} />
      </UIButton>
      <ContentRegistration>
        <ButtonSI>{t("utility.buttonsi")}</ButtonSI>
        <ButtonSU>{t("utility.buttonsu")}</ButtonSU>
      </ContentRegistration>
    </Container>
  );
};
