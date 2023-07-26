import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";
import { Input } from "antd";

import { PrimaryButton } from "ui";

import Modal from "../app/Modal";

import { TitleContent, Title, SubTitle, DataField } from "../app/ModalStyles";
import { sendNotification } from "../../utils/notifications";
import { AuthContext } from "../../contexts/AuthProvider";
import SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION from "../../graphql/signInWithEmailAndPassword";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignInModal({ open, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading }] = useMutation(
    SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION
  );

  const { refresh } = useContext(AuthContext);

  const { t } = useTranslation();

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
      localStorage.setItem(
        "idToken",
        data.signInWithEmailAndPassword.user.idToken
      );

      refresh();

      sendNotification(
        "success",
        t("utility.signInModal.notification.success.title"),
        t("utility.signInModal.notification.success.description")
      );

      return onClose();
    } else {
      return sendNotification(
        "error",
        t("utility.signInModal.notification.error.title"),
        t("utility.signInModal.notification.error.description")
      );
    }
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

        <PrimaryButton color="#8EB5F0" loading={loading} onClick={handleSignIn}>
          {t("utility.signInModal.loginButton")}
        </PrimaryButton>
      </DataField>
    </Modal>
  );
}
