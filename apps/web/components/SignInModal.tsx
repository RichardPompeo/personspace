import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { IoIosCloseCircle } from "react-icons/io";

import { PrimaryButton } from "ui";
import {
  Container,
  ContentModal,
  TitleContent,
  Title,
  SubTitle,
  DataField,
  CloseButton,
} from "../styles/components/ModalStyles";

interface ModalProps {
  signInModal: Boolean;
  handleSignInModalVisibility: () => void;
}

export default function SignInModal({ signInModal, handleSignInModalVisibility }: ModalProps) {
  const { t } = useTranslation();

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

            <DataField>
              <Input type="email" placeholder={t("SignUp.placeholderEmail")} />
              <Input.Password placeholder={t("SignUp.placeholderPassword")} />

              <PrimaryButton color="#8EB5F0">
                {t("SignIn.createButton")}
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
