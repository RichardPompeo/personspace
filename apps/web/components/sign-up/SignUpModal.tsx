import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";
import { Input } from "antd";

import { PrimaryButton } from "ui";

import Modal from "../app/Modal";

import { TitleContent, Title, SubTitle, DataField } from "../app/ModalStyles";
import SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION from "../../graphql/auth/signUpWithEmailAndPassword";
import { sendNotification } from "../../utils/notifications";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({ open, onClose }: ModalProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp, { loading }] = useMutation(
    SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION
  );

  const { t } = useTranslation();

  const handleSignUp = async () => {
    const { data } = await signUp({
      variables: {
        input: {
          displayName,
          email,
          password,
        },
      },
    });

    if (data.signUpWithEmailAndPassword.success) {
      sendNotification(
        "success",
        t("utility.signUpModal.notification.success.title"),
        t("utility.signUpModal.notification.success.description")
      );

      return onClose();
    } else {
      return sendNotification(
        "error",
        t("utility.signUpModal.notification.error.title"),
        t("utility.signUpModal.notification.error.description")
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <TitleContent>
        <Title>{t("utility.signUpModal.title")}</Title>
        <SubTitle>{t("utility.signUpModal.subTitle")}</SubTitle>
      </TitleContent>
      <DataField>
        <Input
          type="text"
          placeholder={t("utility.signUpModal.namePlaceholder")}
          onChange={(ev) => setDisplayName(ev.target.value)}
        />
        <Input
          type="email"
          placeholder={t("utility.emailPlaceholder")}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input.Password
          placeholder={t("utility.passwordPlaceholder")}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <PrimaryButton color="#8EB5F0" loading={loading} onClick={handleSignUp}>
          {t("utility.signUpModal.registerButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
