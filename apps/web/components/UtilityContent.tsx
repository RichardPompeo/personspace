import React from "react";
import { Popover } from "antd";

import { OverlayButton, CustomPrimaryButton, CustomSecondaryButton } from "ui";
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
    background: "#23232fff",
    width: "250px",
    borderRadius: "10px",
  };

  const content = (
    <ContainerPopover>
      <ContentPopover>
        <CustomSecondaryButton
          setColor="#ffffff"
          setColorBorder="#26262c"
          setBoxShadow="none"
          setBackgroundColor="#26262c"
        >
          {t("utility.signInButton")}
        </CustomSecondaryButton>
        <CustomPrimaryButton
          setPadding="0.9em 2em"
          setBackgroundColor="#8EB5F0"
          setResPadding="0.6em 1.6em"
        >
          {t("utility.signUpButton")}
        </CustomPrimaryButton>
      </ContentPopover>
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
        <Popover
          overlayStyle={overlayStyle}
          trigger={"click"}
          content={content}
          placement="bottomLeft"
          color="#212126ff"
          title={<h3>{t("popover.title")}</h3>}
        >
          <UtilityResponsiveButton
            setIndex="none"
            setPosition="none"
            setMarginSize="0 20px 0 0"
          >
            <BsGearFill fontSize={23} />
          </UtilityResponsiveButton>
        </Popover>
        <ContentRegistration>
          <CustomSecondaryButton
            setColor="#ffffff"
            setColorBorder="#26262c"
            setBoxShadow="none"
            setBackgroundColor="#26262c"
          >
            {t("utility.signInButton")}
          </CustomSecondaryButton>
          <CustomPrimaryButton
            setPadding="0.9em 2em"
            setBackgroundColor="#8EB5F0"
            setResPadding="0.6em 1.6em"
          >
            {t("utility.signUpButton")}
          </CustomPrimaryButton>
        </ContentRegistration>
      </Container>
    </>
  );
}
