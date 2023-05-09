import React from "react";
import * as Styles from "./styles";

import logo from "../../assets/personspace-logo.svg";

import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { MdViewAgenda, MdHelpCenter } from "react-icons/md";
import { RiEdit2Fill, RiContactsBook2Fill, RiHome3Fill } from "react-icons/ri";

function NavBar() {
  return (
    <Styles.Container>
      <Styles.Logo>
        <Styles.LogoImg src={logo.src} />

        <Styles.LogoText>Personspace</Styles.LogoText>
      </Styles.Logo>

      <Styles.SectionsTitle>PAGES</Styles.SectionsTitle>

      <Styles.Navigation>
        <Styles.Links>
          <RiHome3Fill fontSize={18} />

          <a href="#">Home</a>
        </Styles.Links>

        <Styles.Links>
          <AiFillBulb fontSize={18} />

          <a href="#">About</a>
        </Styles.Links>
      </Styles.Navigation>

      <Styles.SectionsTitle>PERSONAL</Styles.SectionsTitle>

      <Styles.Navigation>
        <Styles.Links>
          <RiEdit2Fill fontSize={18} />

          <a href="#">Annotation</a>
        </Styles.Links>

        <Styles.Links>
          <IoCalendar fontSize={18} />

          <a href="#">Calendar</a>
        </Styles.Links>

        <Styles.Links>
          <RiContactsBook2Fill fontSize={18} />

          <a href="#">Contacts</a>
        </Styles.Links>

        <Styles.Links>
          <MdViewAgenda fontSize={18} />

          <a href="#">Schedule</a>
        </Styles.Links>
      </Styles.Navigation>

      <Styles.SectionsTitle>CENTRAL</Styles.SectionsTitle>

      <Styles.Navigation>
        <Styles.Links>
          <MdHelpCenter fontSize={19} />

          <a href="#">Help me</a>
        </Styles.Links>
      </Styles.Navigation>
    </Styles.Container>
  );
}

export default NavBar;
