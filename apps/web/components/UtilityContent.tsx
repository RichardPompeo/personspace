import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGearFill } from "react-icons/bs";
import { RiGlobeFill } from "react-icons/ri";

import { Popover } from "antd";

import { IconButton, ProfileButton, PrimaryButton, SecondaryButton } from "ui";

import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

import { AuthContext } from "../contexts/AuthProvider";

import {
  Container,
  ContentRegistration,
  overlayStyle,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
  ProfileContentPopover,
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const { isLogged, user, logout } = useContext(AuthContext);

  const { t } = useTranslation();

  const content = (
    <ContainerPopover>
      <ContentPopover>
        {!isLogged ? (
          <>
            <SecondaryButton
              onClick={() => setSignInOpen(true)}
              color="#26262c"
            >
              {t("utility.signInButton")}
            </SecondaryButton>
            <PrimaryButton onClick={() => setSignUpOpen(true)} color="#8EB5F0">
              {t("utility.signUpButton")}
            </PrimaryButton>
          </>
        ) : (
          <>
            <ProfileContentPopover>
              <ProfileButton>
                <span>{user.displayName.split("")[0]}</span>
              </ProfileButton>
              <div
                style={{
                  overflow: "hidden",
                  width: "75%",
                }}
              >
                <h3>{user.displayName}</h3>
                <h5 style={{ color: "#b6b6b6" }}>{user.email}</h5>
              </div>
            </ProfileContentPopover>
            <SecondaryButton onClick={logout} color="#c92121">
              Sair
            </SecondaryButton>
          </>
        )}
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
          zIndex={1}
          title={<h3>{t("utility.popover.title")}</h3>}
        >
          <UtilityResponsiveButton>
            <BsGearFill fontSize={23} />
          </UtilityResponsiveButton>
        </Popover>
        <ContentRegistration>
          {!isLogged ? (
            <>
              <SecondaryButton
                onClick={() => setSignInOpen(true)}
                color="#26262C"
              >
                {t("utility.signInButton")}
              </SecondaryButton>
              <PrimaryButton
                onClick={() => setSignUpOpen(true)}
                color="#8EB5F0"
              >
                {t("utility.signUpButton")}
              </PrimaryButton>
            </>
          ) : (
            <ProfileButton>
              <span>{user.displayName.split("")[0]}</span>
            </ProfileButton>
          )}
        </ContentRegistration>
      </Container>
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
