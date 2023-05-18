import React from "react";
import { Popover } from "antd";

import { OverlayButton } from "ui";
import { BsGearFill } from "react-icons/bs";
import { RiGlobeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import {
  Container,
  RegisterButton,
  LoginButton,
  ContentRegistration,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const { t } = useTranslation();

  const overlayStyle = {
    background: "#23232fff",
    width: "250px",
    borderRadius: "10px",
  };

  const content = (
    <ContainerPopover>
      <ContentPopover>
        <LoginButton>{t("utility.signInButton")}</LoginButton>
        <RegisterButton>{t("utility.signUpButton")}</RegisterButton>
      </ContentPopover>
      <OverlayButton setIndex="none" setPosition="none" setMarginSize="none">
        <RiGlobeFill fontSize={23} />
      </OverlayButton>
    </ContainerPopover>
  );

  return (
    <>
      <Container>
        <OverlayButton
          setIndex="none"
          setPosition="none"
          setMarginSize="10px 20px"
        >
          <RiGlobeFill fontSize={23} />
        </OverlayButton>
        <ContentRegistration>
          <LoginButton>{t("utility.signInButton")}</LoginButton>
          <RegisterButton>{t("utility.signUpButton")}</RegisterButton>
        </ContentRegistration>
      </Container>

      <Popover
        overlayStyle={overlayStyle}
        trigger={"click"}
        content={content}
        placement="bottomLeft"
        color="#212126ff"
        title={<h3>{t("utility.popoverTitle")}</h3>}
      >
        <UtilityResponsiveButton
          setIndex="none"
          setPosition="fixed"
          setMarginSize="10px 20px"
        >
          <BsGearFill fontSize={23} />
        </UtilityResponsiveButton>
      </Popover>
    </>
  );
}
