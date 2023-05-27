import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";

import { Input } from "antd";

import { PrimaryButton } from "ui";

import Modal from "./Modal";

import SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION from "../graphql/signUpWithEmailAndPassword";

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

export default function SignUpModal({ open, onClose }: ModalProps) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp] = useMutation(SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION);

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
      alert(`Usuário cadastrado, ${data.signUpWithEmailAndPassword.user.uid}`);
    } else {
      alert(`Erro, ${data.signUpWithEmailAndPassword.error.message}`);
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
        <PrimaryButton color="#8EB5F0" onClick={handleSignUp}>
          {t("utility.signUpModal.registerButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
