import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircle } from "react-icons/io";

import { Input } from "antd";
import { PrimaryButton } from "ui";
import {
  Container,
  ContentModal,
  TitleContent,
  Title,
  SubTitle,
  CloseButton,
  DataField,
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

            <DataField>
              <Input type="text" placeholder={t("SignUp.placeholderName")} />
              <Input type="email" placeholder={t("SignUp.placeholderEmail")} />
              <Input.Password placeholder={t("SignUp.placeholderPassword")} />

              <PrimaryButton color="#8EB5F0">
                {t("SignUp.createButton")}
              </PrimaryButton>
            </DataField>
          </ContentModal>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
