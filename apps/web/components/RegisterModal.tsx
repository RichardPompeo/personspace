import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircle } from "react-icons/io";

import FormSignUp from "./FormSignUp";
import {
  Container,
  ContentModal,
  TitleContent,
  Title,
  SubTitle,
  CloseButton,
} from "../styles/components/ModalStyles";
import { ModalContext } from "../context/ModalProvider";

export default function RegisterModal() {
  const { t } = useTranslation();

  const { signUpModal, handleSignUpModalVisibility } = useContext(ModalContext);

  return (
    <>
      {signUpModal ? (
        <Container>
          <ContentModal>
            <TitleContent>
              <CloseButton onClick={handleSignUpModalVisibility}>
                <IoIosCloseCircle fontSize={25} />
              </CloseButton>
              <Title>{t("modal.titleRegister")}</Title>
              <SubTitle>{t("modal.subTitleRegister")}</SubTitle>
            </TitleContent>

            <FormSignUp />
          </ContentModal>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
