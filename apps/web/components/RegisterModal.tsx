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
} from "../styles/components/RegisterModal";
import { ModalContext } from "../context/ModalProvider";

export default function RegisterModal() {
  const { t } = useTranslation();
  
  const { modal, handleModalVisibility } = useContext(ModalContext);

  return (
    <>
      {modal ? (
        <Container>
          <ContentModal>
            <TitleContent>
              <CloseButton onClick={handleModalVisibility}>
                <IoIosCloseCircle fontSize={25} />
              </CloseButton>
              <Title>{t("modal.title")}</Title>
              <SubTitle>{t("modal.subTitle")}</SubTitle>
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
