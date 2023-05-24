import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { PrimaryButton } from "ui";
import { Form } from "../styles/components/FormStyles";

export default function FormSignIn() {
  const { t } = useTranslation();

  return (
    <Form>
      <Input
        type="email"
        placeholder={t("modal.formSignUp.placeholderEmail")}
      />
      <Input.Password placeholder={t("modal.formSignUp.placeholderPassword")} />

      <PrimaryButton color="#8EB5F0">
        {t("modal.formSignIn.createButton")}
      </PrimaryButton>
    </Form>
  );
}
