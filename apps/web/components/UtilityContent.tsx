import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGearFill, BsFillBoxFill } from "react-icons/bs";
import { RiAccountBoxFill, RiGlobeFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import { Popover } from "antd";

import { IconButton, ProfileButton, PrimaryButton, SecondaryButton } from "ui";

import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

import { AuthContext } from "../contexts/AuthProvider";

import {
  Container,
  ContentRegistration,
  overlayStyleMobile,
  overlayStyleWeb,
  ContainerPopover,
  ContentPopover,
  UtilityResponsiveButton,
  ProfileContentPopover,
  LinksPopover,
  Link,
  UserData,
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const { isLogged, user, logout } = useContext(AuthContext);

  const { t } = useTranslation();

  const contentPopoverMobile = (
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
            <SecondaryButton onClick={logout} color="#c92121">
              {t("utility.popover.logoutButton")}
            </SecondaryButton>
          </>
        )}
      </ContentPopover>
    </ContainerPopover>
  );

  const contentPopoverWeb = (
    <ContainerPopover>
      <ContentPopover>
        {isLogged && (
          <ProfileContentPopover>
            <LinksPopover>
              <Link>
                <BsFillBoxFill fontSize={16} />
                {t("utility.popover.profile")}
              </Link>
              <Link>
                <RiAccountBoxFill fontSize={16} />
                {t("utility.popover.account")}
              </Link>
              <Link onClick={logout}>
                <FaSignOutAlt fontSize={16} />
                {t("utility.popover.logoutButton")}
              </Link>
            </LinksPopover>
          </ProfileContentPopover>
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
          overlayStyle={overlayStyleMobile}
          trigger={"click"}
          content={contentPopoverMobile}
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
                content={contentPopoverWeb}
                overlayStyle={overlayStyleWeb}
                trigger={"hover"}
                placement="bottomLeft"
                color="#212126ff"
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
