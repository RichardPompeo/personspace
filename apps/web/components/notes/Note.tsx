import { useRef, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineExpand,
} from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

import { useMutation } from "@apollo/client";

import { format } from "date-fns";

import {
  Button,
  Container,
  Content,
  Description,
  Footer,
  Header,
  Time,
  Title,
} from "./NoteStyles";

import DELETE_NOTE_MUTATION from "../../graphql/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/updateNoteMutation";

import { NoteType } from "../../types/NoteType";
import { sendNotification } from "../../utils/notifications";

interface NoteProps {
  note: NoteType;
  onUpdate: (any) => void;
  onExpand: (note: NoteType) => void;
}

export default function Note({ note, onExpand, onUpdate }: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    note.description
  );

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

    if (noteTitle === note.title && noteDescription === note.description) {
      return setIsEditing(false);
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
      onUpdate(data.updateNote);

      return setIsEditing(false);
    }

    if (updateError) {
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
      return onUpdate(note);
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
              <AiOutlineExpand
                onClick={() => onExpand(note)}
                size={18}
                fill="#000000"
              />
            </Button>
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
      {note.updatedAt && (
        <Footer>
          <MdModeEdit fill="#bbbbbb" />
          <Time>{format(new Date(note.updatedAt), "dd/MM/yyyy HH:mm")}</Time>
        </Footer>
      )}
      {!note.updatedAt && note.createdAt && (
        <Footer>
          <IoCalendar fill="#bbbbbb" />
          <Time>{format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}</Time>
        </Footer>
      )}
    </Container>
  );
}
