import React, { useContext } from "react";
import { Popover } from "antd";
import { useTranslation } from "react-i18next";

import { IconButton, PrimaryButton, SecondaryButton } from "ui";
import { BsGearFill } from "react-icons/bs";
import { RiGlobeFill } from "react-icons/ri";
import {
  Container,
  ContentRegistration,
  overlayStyle,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
} from "../styles/components/UtilityStyles";
import { ModalContext } from "../context/ModalProvider";

export default function UtilityContent() {
  const { t } = useTranslation();

  const { handleSignUpModalVisibility,  handleSignInModalVisibility } = useContext(ModalContext);

  const content = (
    <ContainerPopover>
      <ContentPopover>
        <SecondaryButton color="#26262c">
          {t("utility.signInButton")}
        </SecondaryButton>
        <PrimaryButton color="#8EB5F0">
          {t("utility.signUpButton")}
        </PrimaryButton>
      </ContentPopover>
    </ContainerPopover>
  );

  return (
    <>
      <Container>
        <IconButton>
          <RiGlobeFill fontSize={23} />
        </IconButton>
        <Popover
          overlayStyle={overlayStyle}
          trigger={"click"}
          content={content}
          placement="bottomLeft"
          color="#212126ff"
          title={<h3>{t("utility.popover.title")}</h3>}
        >
          <UtilityResponsiveButton>
            <BsGearFill fontSize={23} />
          </UtilityResponsiveButton>
        </Popover>
        <ContentRegistration>
          <SecondaryButton onClick={handleSignInModalVisibility} color="#26262C">
            {t("utility.signInButton")}
          </SecondaryButton>
          <PrimaryButton onClick={handleSignUpModalVisibility} color="#8EB5F0">
            {t("utility.signUpButton")}
          </PrimaryButton>
        </ContentRegistration>
      </Container>
    </>
  );
}
