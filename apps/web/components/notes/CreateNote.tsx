import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillPlusCircle,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

import { useMutation } from "@apollo/client";

import { format } from "date-fns";

import {
  Container as CreateContainer,
  Title as CreateTitle,
  Header,
  TitleInput,
  DescriptionInput,
} from "./CreateNoteStyles";
import { Button, Container, Content } from "./NoteStyles";

import CREATE_NOTE_MUTATION from "../../graphql/notes/createNoteMutation";

import { sendNotification } from "../../utils/notifications";

interface CreateNoteProps {
  onCreate: (any) => void;
  authorId: string;
  token: string;
}

export default function CreateNote({
  authorId,
  token,
  onCreate,
}: CreateNoteProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [noteTitle, setNoteTitle] = useState<null | string>(null);
  const [noteDescription, setNoteDescription] = useState<null | string>(null);

  const [createNote, { error }] = useMutation(CREATE_NOTE_MUTATION);

  const { t } = useTranslation();

  const handleChangeTitle = (ev) => {
    setNoteTitle(ev.target.value);
  };

  const handleChangeDescription = (ev) => {
    setNoteDescription(ev.target.value);
  };

  const handleCreateNote = async () => {
    if (!noteTitle || !noteDescription) {
      return sendNotification(
        "error",
        "Error",
        "Missing title or description."
      );
    }

    const colors = [
      "#80ed99",
      "#ffafcc",
      "#90e0ef",
      "#aa7bc3",
      "#98c1d9",
      "#ffd670",
    ];

    const { data } = await createNote({
      variables: {
        input: {
          title: noteTitle,
          description: noteDescription,
          color: colors[Math.floor(Math.random() * colors.length)],
          authorId: authorId,
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (data.createNote) {
      setIsCreating(false);
      setNoteTitle(null);
      setNoteDescription(null);
      return onCreate(data.createNote);
    }

    if (error) {
      sendNotification("error", "Error", "Error saving the note");
    }
  };

  return isCreating ? (
    <Container>
      <Header>
        <Button>
          <AiOutlineCheck onClick={handleCreateNote} size={16} fill="#000000" />
        </Button>
        <Button>
          <AiOutlineClose
            onClick={() => setIsCreating(false)}
            size={16}
            fill="#000000"
          />
        </Button>
      </Header>
      <Content>
        <TitleInput
          type="text"
          placeholder={t("annotations.notes.addTitle")}
          onChange={handleChangeTitle}
        />
        <DescriptionInput
          placeholder={t("annotations.notes.addDescription")}
          onChange={handleChangeDescription}
        />
      </Content>
    </Container>
  ) : (
    <CreateContainer onClick={() => setIsCreating(true)}>
      <AiFillPlusCircle size={36} fill="#2d2e2e" />
      <CreateTitle>{t("annotations.notes.create")}</CreateTitle>
    </CreateContainer>
  );
}
