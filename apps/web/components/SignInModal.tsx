import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";

import { Input } from "antd";
import { VscLoading } from "react-icons/vsc";

import { PrimaryButton } from "ui";

import SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION from "../graphql/signInWithEmailAndPassword";

import { AuthContext } from "../contexts/AuthProvider";

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

export default function SignInModal({ open, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [signIn] = useMutation(SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION);

  const { refresh, loading } = useContext(AuthContext);

  const { t } = useTranslation();

  const handleSignIn = async () => {
    setIsClicked(true);
   
    const { data } = await signIn({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    !isClicked && (
      data.signInWithEmailAndPassword.success
        ? (() => {
            localStorage.setItem("idToken", data.signInWithEmailAndPassword.user.idToken);
            refresh();
            sendNotification(
              "success",
              t("utility.signInModal.notification.success.title"),
              t("utility.signInModal.notification.success.description")
            );
            onClose();
            setIsClicked(false);
          })()
        : (() => {
            sendNotification(
              "error",
              t("utility.signInModal.notification.error.title"),
              t("utility.signInModal.notification.error.description")
            );
            setIsClicked(false);
          })()
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
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

        <PrimaryButton color="#8EB5F0" clicked={isClicked} onClick={handleSignIn}>
          <VscLoading fill="#000000" />
          {isClicked ? t("utility.signInModal.loadingButton") : t("utility.signInModal.loginButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
