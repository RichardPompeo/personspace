import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircle } from "react-icons/io";

import FormSignIn from "./FormSignIn";
import {
  Container,
  ContentModal,
  TitleContent,
  Title,
  SubTitle,
  CloseButton,
} from "../styles/components/ModalStyles";
import { ModalContext } from "../context/ModalProvider";

export default function LoginModal() {
  const { t } = useTranslation();

  const { signInModal, handleSignInModalVisibility } = useContext(ModalContext);

  return (
    <>
      {signInModal ? (
        <Container>
          <ContentModal>
            <TitleContent>
              <CloseButton onClick={handleSignInModalVisibility}>
                <IoIosCloseCircle fontSize={25} />
              </CloseButton>
              <Title>{t("modal.titleLogin")}</Title>
              <SubTitle>{t("modal.subTitleLogin")}</SubTitle>
            </TitleContent>

            <FormSignIn />
          </ContentModal>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
