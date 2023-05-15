import React from "react";

import { RiGlobeFill } from "react-icons/ri";
import {
  Container,
  ButtonSU,
  ButtonSI,
  GlobeButton,
  ContentRegistration
} from "../styles/components/UtilityStyles";

export default function UtilityContent() {
  return (
    <Container>
      <GlobeButton>
        <RiGlobeFill fontSize={22} />
      </GlobeButton>
      <ContentRegistration>
        <ButtonSI>Sign in</ButtonSI>
        <ButtonSU>Sign up</ButtonSU>
      </ContentRegistration>
    </Container>
  );
};
