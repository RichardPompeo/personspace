import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";

import { Input, notification } from "antd";

import { PrimaryButton } from "ui";

import SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION from "../graphql/signInWithEmailAndPassword";

import { AuthContext } from "../contexts/AuthProvider";

import Modal from "./Modal";
import { openNotificationSignIn } from "./NotificationSign";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation(SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION);

  const { refresh } = useContext(AuthContext);

  const { t } = useTranslation();

  const [api, contextHolder] = notification.useNotification();

  const handleSignIn = async () => {
    const { data } = await signIn({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (data.signInWithEmailAndPassword.success) {
      openNotificationSignIn("success", t, api);

      localStorage.setItem(
        "idToken",
        data.signInWithEmailAndPassword.user.idToken
      );
      refresh();
    } else {
      openNotificationSignIn("error", t, api);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      {contextHolder}
      <TitleContent>
        <Title>{t("utility.signInModal.title")}</Title>
        <SubTitle>{t("utility.signInModal.subTitle")}</SubTitle>
      </TitleContent>
      <DataField>
        <Input
          type="email"
          placeholder={t("utility.emailPlaceholder")}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input.Password
          placeholder={t("utility.passwordPlaceholder")}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <PrimaryButton color="#8EB5F0" onClick={handleSignIn}>
          {t("utility.signInModal.loginButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
