import Link from "next/link";

import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

import { IconButton } from "ui";

import { LayoutContext } from "../contexts/LayoutProvider";

import logo from "../assets/personspace-logo.svg";

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
          <IconButton
            zIndex="1"
            position="absolute"
            onClick={handleMenuVisibility}
          >
            <TfiMenuAlt fontSize={23} />
          </IconButton>
          <Logo>
            <LogoImg src={logo.src} />
            <LogoText>{t("navbar.personspace")}</LogoText>
          </Logo>
          <SectionsTitle>{t("navbar.pages")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiHome3Fill fontSize={16} />
                {t("navbar.home")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <AiFillBulb fontSize={16} />
                {t("navbar.about")}
              </ListRoutes>
            </Link>
          </Navigation>
          <SectionsTitle>{t("navbar.personal")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiEdit2Fill fontSize={16} />
                {t("navbar.annotation")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <IoCalendar fontSize={16} />
                {t("navbar.calendar")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <RiContactsBook2Fill fontSize={16} />
                {t("navbar.contacts")}
              </ListRoutes>
            </Link>
            <Link href="#">
              <ListRoutes>
                <MdViewAgenda fontSize={16} />
                {t("navbar.schedule")}
              </ListRoutes>
            </Link>
          </Navigation>
          <SectionsTitle>{t("navbar.central")}</SectionsTitle>
          <Navigation>
            <Link href="#">
              <ListRoutes>
                <MdHelpCenter fontSize={16} />
                {t("navbar.helpMe")}
              </ListRoutes>
            </Link>
          </Navigation>
        </Container>
      ) : (
        <IconButton zIndex="1" position="fixed" onClick={handleMenuVisibility}>
          <TfiMenuAlt fontSize={23} />
        </IconButton>
      )}
    </>
  );
}
