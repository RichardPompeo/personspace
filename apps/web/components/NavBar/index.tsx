import React, { useState } from "react";
import Link from "next/link";

import logo from "../../assets/personspace-logo.svg";
import { Container, MButton, ListRoutes, Logo, LogoImg, LogoText, Navigation, SectionsTitle } from "./styles";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

function NavBar() {
  const [menu, setMenu] = useState<Boolean>(true);

  function handleMenuVisibility() {
    switch (menu) {
      case true:
        return setMenu(false);
      default:
        return setMenu(true);
    };
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

            <LogoText>Personspace</LogoText>
          </Logo>

          <SectionsTitle>PAGES</SectionsTitle>

          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiHome3Fill fontSize={18} />
                Home
              </ListRoutes>
            </Link>

            <Link href="#">
              <ListRoutes>
                <AiFillBulb fontSize={18} />
                About
              </ListRoutes>
            </Link>
          </Navigation>

          <SectionsTitle>PERSONAL</SectionsTitle>

          <Navigation>
            <Link href="#">
              <ListRoutes>
                <RiEdit2Fill fontSize={18} />
                Annotation
              </ListRoutes>
            </Link>

            <Link href="#">
              <ListRoutes>
                <IoCalendar fontSize={18} />
                Calendar
              </ListRoutes>
            </Link>

            <Link href="#">
              <ListRoutes>
                <RiContactsBook2Fill fontSize={18} />
                Contacts
              </ListRoutes>
            </Link>

            <Link href="#">
              <ListRoutes>
                <MdViewAgenda fontSize={18} />
                Schedule
              </ListRoutes>
            </Link>
          </Navigation>

          <SectionsTitle>CENTRAL</SectionsTitle>

          <Navigation>
            <Link href="#">
              <ListRoutes>
                <MdHelpCenter fontSize={19} />
                Help me
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
