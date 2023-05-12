import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

import Link from "next/link";

import logo from "../assets/personspace-logo.svg";
import {
  Container,
  MButton,
  ListRoutes,
  Logo,
  LogoImg,
  LogoText,
  Navigation,
  SectionsTitle,
} from "ui";

function NavBar() {
  const [menu, setMenu] = useState<Boolean>(true);

  const { t } = useTranslation();

  const handleMenuVisibility = () => {
    return menu ? setMenu(false) : setMenu(true);
  };

  return (
    <>
      {menu ? (
        <Container>
          <MButton onClick={handleMenuVisibility}>
            <TfiMenuAlt fontSize={25} />
          </MButton>
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
        <MButton onClick={handleMenuVisibility}>
          <TfiMenuAlt fontSize={25} />
        </MButton>
      )}
    </>
  );
}

export default NavBar;
