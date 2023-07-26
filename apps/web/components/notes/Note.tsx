import React, { useRef, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

import { useMutation } from "@apollo/client";

import { format } from "date-fns";

import {
  Container,
  Header,
  Content,
  Title,
  Description,
  Footer,
  Time,
  Button,
} from "./NoteStyles";

import DELETE_NOTE_MUTATION from "../../graphql/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/updateNoteMutation";

import { sendNotification } from "../../utils/notifications";

interface NoteProps {
  note: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    color: string;
  };
  onDelete: (any) => void;
}

export default function Note({ note, onDelete }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    note.description
  );
  const [updatedAt, setUpdatedAt] = useState(note.updatedAt);

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();

  const [deleteNote, { error }] = useMutation(DELETE_NOTE_MUTATION);
  const [updateNote, { error: updateError }] =
    useMutation(UPDATE_NOTE_MUTATION);

  const handleChangeTitle = () => {
    const getNoteTitle = titleRef.current.innerText;

    setNoteTitle(getNoteTitle);
  };

  const handleChangeDescription = () => {
    const getNoteDescription = descriptionRef.current.innerText;

    setNoteDescription(getNoteDescription);
  };

  const handleUpdateNote = async () => {
    if (noteTitle.length < 1 || noteDescription.length < 1) {
      return sendNotification(
        "error",
        "Error",
        "The title and description cannot be empty."
      );
    }

    const { data } = await updateNote({
      variables: {
        input: {
          id: note.id,
          title: noteTitle,
          description: noteDescription,
          updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    if (data.updateNote) {
      setUpdatedAt(data.updateNote.updatedAt);

      return setIsEditing(false);
    }

    if (error) {
      sendNotification("error", "Error", "Error updating the note");
    }
  };

  const handleCancel = () => {
    titleRef.current.innerText = note.title;
    descriptionRef.current.innerText = note.description;

    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setIsEditing(false);
  };

  const handleDeleteNote = async () => {
    const { data } = await deleteNote({
      variables: {
        input: {
          id: note.id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    if (data.deleteNote.success) {
      return onDelete(note);
    }

    if (!data.deleteNote.success || error) {
      return sendNotification(
        "error",
        "Error",
        "Error when deleting the note."
      );
    }
  };

  return (
    <Container>
      <Header color={note.color}>
        {isEditing ? (
          <>
            <Button>
              <AiOutlineCheck
                onClick={handleUpdateNote}
                size={18}
                fill="#000000"
              />
            </Button>
            <Button>
              <AiOutlineClose onClick={handleCancel} size={18} fill="#000000" />
            </Button>
          </>
        ) : (
          <>
            <Button>
              <AiOutlineEdit
                onClick={() => {
                  setIsEditing(true);
                }}
                size={18}
                fill="#000000"
              />
            </Button>
            <Button>
              <AiOutlineDelete
                onClick={handleDeleteNote}
                size={18}
                fill="#000000"
              />
            </Button>
          </>
        )}
      </Header>
      <Content>
        <Title
          contentEditable={isEditing}
          ref={titleRef}
          onInput={handleChangeTitle}
        >
          {note.title}
        </Title>
        <Description
          contentEditable={isEditing}
          ref={descriptionRef}
          onInput={handleChangeDescription}
        >
          {note.description}
        </Description>
      </Content>
      {updatedAt && (
        <Footer>
          <MdModeEdit fill="#bbbbbb" />
          <Time>{format(new Date(updatedAt), "dd/MM/yyyy HH:mm")}</Time>
        </Footer>
      )}
      {!updatedAt && note.createdAt && (
        <Footer>
          <IoCalendar fill="#bbbbbb" />
          <Time>{format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}</Time>
        </Footer>
      )}
    </Container>
  );
}
