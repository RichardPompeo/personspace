import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";

import { Input } from "antd";
import { VscLoading } from "react-icons/vsc";

import { PrimaryButton } from "ui";

import SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION from "../graphql/signUpWithEmailAndPassword";

import Modal from "./Modal";

import { sendNotification } from "../utils/notifications";

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
  const [isClicked, setIsClicked] = useState(false);

  const [signUp] = useMutation(SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION);

  const { t } = useTranslation();

  const handleSignUp = async () => {
    setIsClicked(true);
    const { data } = await signUp({
      variables: {
        input: {
          displayName,
          email,
          password,
        },
      },
    });

    !isClicked &&
      (data.signUpWithEmailAndPassword.success
        ? (() => {
            sendNotification(
              "success",
              t("utility.signUpModal.notification.success.title"),
              t("utility.signUpModal.notification.success.description")
            );

            onClose();
            setIsClicked(false);
          })()
        : (() => {
            sendNotification(
              "error",
              t("utility.signUpModal.notification.error.title"),
              t("utility.signUpModal.notification.error.description")
            );
            setIsClicked(false);
          })());
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
        <PrimaryButton color="#8EB5F0" clicked={isClicked} onClick={handleSignUp}>
          <VscLoading fill="#000000" />
          {isClicked ? t("utility.signUpModal.loadingButton") : t("utility.signUpModal.registerButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
