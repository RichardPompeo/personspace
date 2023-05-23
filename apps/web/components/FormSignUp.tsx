import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "ui";
import { Form } from "../styles/components/FormSignUp";

export default function FormSignUp() {
  const { t } = useTranslation();

  return (
    <Form>
      <Input type="text" placeholder={t("modal.formSignUp.placeholderName")} />
      <Input type="email" placeholder={t("modal.formSignUp.placeholderEmail")} />
      <Input.Password placeholder={t("modal.formSignUp.placeholderPassword")} />

      <PrimaryButton color="#8EB5F0">
        {t("modal.formSignUp.createButton")}
      </PrimaryButton>
    </Form>
  );
};
