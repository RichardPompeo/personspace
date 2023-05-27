import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "ui";
import {
  TitleContent,
  Title,
  SubTitle,
  DataField,
} from "../styles/components/ModalStyles";
import Modal from "./Modal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({ open, onClose }: ModalProps) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <TitleContent>
        <Title>{t("utility.signUpModal.title")}</Title>
        <SubTitle>{t("utility.signUpModal.subTitle")}</SubTitle>
      </TitleContent>
      <DataField>
        <Input type="text" placeholder={t("utility.signUpModal.namePlaceholder")} />
        <Input type="email" placeholder={t("utility.emailPlaceholder")} />
        <Input.Password placeholder={t("utility.passwordPlaceholder")} />
        <PrimaryButton color="#8EB5F0">
          {t("utility.signUpModal.registerButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
