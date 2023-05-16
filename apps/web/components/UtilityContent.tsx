import React from "react";

import { RiGlobeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import {
  Container,
  ButtonSU,
  ButtonSI,
  GlobeButton,
  ContentRegistration
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const { t } = useTranslation();

  return (
    <Container>
      <GlobeButton>
        <RiGlobeFill fontSize={22} />
      </GlobeButton>
      <ContentRegistration>
        <ButtonSI>{t("utility.buttonsi")}</ButtonSI>
        <ButtonSU>{t("utility.buttonsu")}</ButtonSU>
      </ContentRegistration>
    </Container>
  );
};
