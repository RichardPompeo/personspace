import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillPlusCircle } from "react-icons/ai";

import { Container, Title } from "./CreateNoteStyles";

interface CreateNoteProps {
  onClick: () => void;
}

export default function CreateNote({ onClick }: CreateNoteProps) {
  const { t } = useTranslation();

  return (
    <Container onClick={onClick}>
      <AiFillPlusCircle size={36} fill="#2d2e2e" />
      <Title>{t("annotations.notes.create")}</Title>
    </Container>
  );
}
