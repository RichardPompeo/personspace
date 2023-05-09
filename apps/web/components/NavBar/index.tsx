import React from "react";
import { Container, MButton, Links, Logo, LogoImg, LogoText, Navigation, SectionsTitle } from "./styles";

import logo from "../../assets/personspace-logo.svg";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

function NavBar() {
  return (
    <Container>
      <MButton>
        <TfiMenuAlt fontSize={25}/>
      </MButton>

      <Logo>
        <LogoImg src={logo.src} />

        <LogoText>Personspace</LogoText>
      </Logo>

      <SectionsTitle>PAGES</SectionsTitle>

      <Navigation>
        <Links>
          <RiHome3Fill fontSize={18} />

          <a href="#">Home</a>
        </Links>

        <Links>
          <AiFillBulb fontSize={18} />

          <a href="#">About</a>
        </Links>
      </Navigation>

      <SectionsTitle>PERSONAL</SectionsTitle>

      <Navigation>
        <Links>
          <RiEdit2Fill fontSize={18} />

          <a href="#">Annotation</a>
        </Links>

        <Links>
          <IoCalendar fontSize={18} />

          <a href="#">Calendar</a>
        </Links>

        <Links>
          <RiContactsBook2Fill fontSize={18} />

          <a href="#">Contacts</a>
        </Links>

        <Links>
          <MdViewAgenda fontSize={18} />

          <a href="#">Schedule</a>
        </Links>
      </Navigation>

      <SectionsTitle>CENTRAL</SectionsTitle>

      <Navigation>
        <Links>
          <MdHelpCenter fontSize={19} />

          <a href="#">Help me</a>
        </Links>
      </Navigation>
    </Container>
  );
}

export default NavBar;
