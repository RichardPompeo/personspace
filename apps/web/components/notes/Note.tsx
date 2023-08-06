import { useContext, useRef, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineExpand,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  MdCalendarMonth,
  MdComment,
  MdModeEdit,
  MdPerson,
} from "react-icons/md";

import { useMutation } from "@apollo/client";

import { format } from "date-fns";

import {
  Button,
  Container,
  Content,
  Description,
  Footer,
  Header,
  PointDivider,
  Time,
  Title,
} from "./NoteStyles";

import DELETE_NOTE_MUTATION from "../../graphql/notes/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/notes/updateNoteMutation";
import DELETE_NOTE_SHARE_MUTATION from "../../graphql/notes/deleteNoteShareMutation";

import { NoteType } from "../../types/NoteType";
import { NoteShareType } from "../../types/NoteShareType";
import { sendNotification } from "../../utils/notifications";
import { AuthContext } from "../../contexts/AuthProvider";

interface NoteProps {
  note: NoteType;
  editable?: boolean;
  onUpdate: (any) => void;
  onExpand: (note: NoteType) => void;
}

export default function Note({
  note,
  onExpand,
  onUpdate,
  editable = true,
}: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    note.description
  );

  const { user } = useContext(AuthContext);

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();

  const [deleteNote, { error }] = useMutation(DELETE_NOTE_MUTATION);
  const [updateNote, { error: updateError }] =
    useMutation(UPDATE_NOTE_MUTATION);
  const [deletePerson, { error: deletePersonError }] = useMutation(
    DELETE_NOTE_SHARE_MUTATION
  );

  const handleRemove = async () => {
    const { data } = await deletePerson({
      variables: {
        input: {
          id: note.noteShare[0].id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    if (deletePersonError || !data.deleteNoteShare.success) {
      return sendNotification("error", "Error", "Error deleting share");
    }

    if (data.deleteNoteShare.success) {
      return onUpdate(note);
    }
  };

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
      setIsEditing(false);

      return onUpdate(data.updateNote);
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
                size={16}
                fill="#000000"
              />
            </Button>
            <Button>
              <AiOutlineClose onClick={handleCancel} size={16} fill="#000000" />
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

            {editable ? (
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
            ) : (
              <>
                <Button>
                  <AiOutlineMinus
                    onClick={handleRemove}
                    size={18}
                    fill="#000000"
                  />
                </Button>
              </>
            )}
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
      <Footer>
        {editable ? (
          <>
            {note.updatedAt && (
              <>
                <MdModeEdit fill="#bbbbbb" />
                <Time>
                  {format(new Date(note.updatedAt), "dd/MM/yyyy HH:mm")}
                </Time>
              </>
            )}
            {!note.updatedAt && note.createdAt && (
              <>
                <MdCalendarMonth fill="#bbbbbb" />
                <Time>
                  {format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}
                </Time>
              </>
            )}
          </>
        ) : (
          <>
            <Time>{note.author.displayName}</Time>
          </>
        )}
        {note.noteComment.length !== 0 && (
          <>
            <PointDivider />
            <MdComment fill="#bbbbbb" />
            <Time>{note.noteComment.length}</Time>
          </>
        )}
        {editable && note.noteShare.length !== 0 && (
          <>
            <PointDivider />
            <MdPerson fill="#bbbbbb" />
            <Time>{note.noteShare.length}</Time>
          </>
        )}
      </Footer>
    </Container>
  );
}
