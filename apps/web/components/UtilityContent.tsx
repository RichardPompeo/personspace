import React from "react";
import { Popover } from "antd";

import { IconButton, PrimaryButton, SecondaryButton } from "ui";
import { BsGearFill } from "react-icons/bs";
import { RiGlobeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import {
  Container,
  ContentRegistration,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const { t } = useTranslation();

  const overlayStyle = {
    width: "250px",
    borderRadius: "10px",
  };

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
          <SecondaryButton color="#26262C">
            {t("utility.signInButton")}
          </SecondaryButton>
          <PrimaryButton color="#8EB5F0">
            {t("utility.signUpButton")}
          </PrimaryButton>
        </ContentRegistration>
      </Container>
    </>
  );
}
