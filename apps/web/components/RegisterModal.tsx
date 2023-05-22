import FormSignUp from "./FormSignUp";

import { IoIosCloseCircle } from "react-icons/io"
import {
  Container,
  ContentModal,
  TitleContent,
  Title,
  SubTitle,
} from "../styles/components/RegisterModal";

export default function RegisterModal() {
  return (
    <Container>
      <ContentModal>
        <IoIosCloseCircle fontSize={30}/>
        <TitleContent>
          <Title>Sign up</Title>
          <SubTitle>
            By registering, will be able to store your data.
          </SubTitle>
        </TitleContent>

        <FormSignUp />
      </ContentModal>
    </Container>
  );
}
