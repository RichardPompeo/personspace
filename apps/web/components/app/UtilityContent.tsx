import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGearFill } from "react-icons/bs";
import { RiGlobeFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

import { Popover } from "antd";

import { IconButton, ProfileButton, PrimaryButton, SecondaryButton } from "ui";

import SignInModal from "../sign-in/SignInModal";
import SignUpModal from "../sign-up/SignUpModal";

import { AuthContext } from "../../contexts/AuthProvider";

import {
  Container,
  ContentRegistration,
  overlayStyleMobile,
  overlayStyleWeb,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
  ProfileContentPopover,
  UserData,
  LanguageSelector,
} from "./UtilityStyles";

import { i18n } from "../../app/layout";

export default function UtilityContent() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const { isLogged, user, logout } = useContext(AuthContext);

  const { t } = useTranslation();

  const settingsPopoverContent = (
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
              <UserData>
                <h3>{user.displayName}</h3>
                <h5 style={{ color: "#b6b6b6" }}>{user.email}</h5>
              </UserData>
            </ProfileContentPopover>
            <SecondaryButton
              icon={<MdLogout />}
              onClick={logout}
              color="#c92121"
            >
              {t("utility.popover.logoutButton")}
            </SecondaryButton>
          </>
        )}
      </ContentPopover>
    </ContainerPopover>
  );

  const languagePopoverContent = (
    <ContainerPopover>
      <ContentPopover>
        <LanguageSelector
          onClick={() => {
            i18n.changeLanguage("pt");
          }}
          active={i18n.language === "pt"}
        >
          🇧🇷 Português (Brasil)
        </LanguageSelector>
        <LanguageSelector
          onClick={() => {
            i18n.changeLanguage("en");
          }}
          active={i18n.language === "en"}
        >
          🇺🇸 English (United States)
        </LanguageSelector>
      </ContentPopover>
    </ContainerPopover>
  );

  return (
    <>
      <Container>
        <Popover
          overlayStyle={overlayStyleMobile}
          trigger={"click"}
          content={languagePopoverContent}
          placement="bottomLeft"
          color="#212126ff"
          zIndex={1}
          title={<h3>{t("utility.popover.language")}</h3>}
        >
          <IconButton>
            <RiGlobeFill fontSize={23} />
          </IconButton>
        </Popover>
        <Popover
          overlayStyle={overlayStyleMobile}
          trigger={"click"}
          content={settingsPopoverContent}
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
            <>
              <Popover
                content={settingsPopoverContent}
                overlayStyle={overlayStyleWeb}
                trigger={"hover"}
                placement="bottomLeft"
                color="#212126ff"
                title={<h3>{t("utility.popover.title")}</h3>}
              >
                <ProfileButton>
                  <span>{user.displayName.split("")[0]}</span>
                </ProfileButton>
              </Popover>
            </>
          )}
        </ContentRegistration>
      </Container>
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
