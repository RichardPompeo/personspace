import { Input } from "antd";
import { useTranslation } from "react-i18next";

import Modal from "./Modal";
import { PrimaryButton } from "ui";
import {
  TitleContent,
  Title,
  SubTitle,
  DataField,
} from "../styles/components/ModalStyles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignInModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <TitleContent>
        <Title>{t("utility.signInModal.title")}</Title>
        <SubTitle>{t("utility.signInModal.subTitle")}</SubTitle>
      </TitleContent>
      <DataField>
        <Input type="email" placeholder={t("utility.emailPlaceholder")} />
        <Input.Password placeholder={t("utility.passwordPlaceholder")} />
        <PrimaryButton color="#8EB5F0">
          {t("utility.signInModal.loginButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
