import React, { useContext } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

import { OverlayButton } from "ui";
import logo from "../assets/personspace-logo.svg";
import { LayoutContext } from "../context/LayoutProvider";
import {
  Container,
  ListRoutes,
  Logo,
  LogoImg,
  LogoText,
  Navigation,
  SectionsTitle,
} from "../styles/components/NavbarStyles";

export default function NavBar() {
  const { t } = useTranslation();

  const { menu, handleMenuVisibility } = useContext(LayoutContext);

  return (
    <>
      {menu ? (
        <Container>
          <OverlayButton setIndex="1" setPosition="absolute" setMarginSize="10px 20px" onClick={handleMenuVisibility}>
            <TfiMenuAlt fontSize={23} />
          </OverlayButton>
          <Logo>
            <LogoImg src={logo.src} />
            <LogoText>{t("navbar.personspace")}</LogoText>
          </Logo>
          <SectionsTitle>{t("navbar.pages")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiHome3Fill fontSize={18} />
                {t("navbar.home")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <AiFillBulb fontSize={18} />
                {t("navbar.about")}
              </ListRoutes>
            </Link>
          </Navigation>
          <SectionsTitle>{t("navbar.personal")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiEdit2Fill fontSize={18} />
                {t("navbar.annotation")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <IoCalendar fontSize={18} />
                {t("navbar.calendar")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <RiContactsBook2Fill fontSize={18} />
                {t("navbar.contacts")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <MdViewAgenda fontSize={18} />
                {t("navbar.schedule")}
              </ListRoutes>
            </Link>
          </Navigation>
          <SectionsTitle>{t("navbar.central")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <MdHelpCenter fontSize={19} />
                {t("navbar.helpMe")}
              </ListRoutes>
            </Link>
          </Navigation>
        </Container>
      ) : (
        <OverlayButton setIndex="1" setPosition="absolute" setMarginSize="10px 20px" onClick={handleMenuVisibility}>
          <TfiMenuAlt fontSize={23} />
        </OverlayButton>
      )}
    </>
  );
}
