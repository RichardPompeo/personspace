import React from "react";
import { OverlayButton } from "ui";

import { RiGlobeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import {
  Container,
  RegisterButton,
  LoginButton,
  ContentRegistration
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const { t } = useTranslation();

  return (
    <Container>
      <OverlayButton setIndex="none" setPosition="none">
        <RiGlobeFill fontSize={23} />
      </OverlayButton>
      <ContentRegistration>
        <LoginButton>{t("utility.signInButton")}</LoginButton>
        <RegisterButton>{t("utility.signUpButton")}</RegisterButton>
      </ContentRegistration>
    </Container>
  );
};
