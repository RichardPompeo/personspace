import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSend,
} from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

import { useMutation } from "@apollo/client";
import { Row } from "antd";
import { format } from "date-fns";

import Modal from "../app/Modal";

import {
  Button,
  Color,
  CommentInput,
  Description,
  ExpandedNoteModalContainer,
  FlexCol,
  Footer,
  Header,
  LeftSide,
  PointDivider,
  ProfileBadge,
  RightSide,
  SwitchText,
  Time,
  Title,
  Switch,
  TitleContainer,
  Content,
} from "./ExpandedNoteModalStyles";

import Comment from "./Comment";

import { NoteType } from "../../types/NoteType";
import { NoteCommentType } from "../../types/NoteCommentType";

import { sendNotification } from "../../utils/notifications";
import { AuthContext } from "../../contexts/AuthProvider";

import DELETE_NOTE_MUTATION from "../../graphql/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/updateNoteMutation";
import CREATE_NOTE_COMMENT_MUTATION from "../../graphql/createNoteCommentMutation";

interface ExpandedNoteModalProps {
  open: boolean;
  authorId: string;
  onClose: () => void;
  onUpdate: (any) => void;
  onDelete: () => void;
  note: NoteType;
}

export default function ExpandedNoteModal({
  open,
  note,
  authorId,
  onClose,
  onUpdate,
  onDelete,
}: ExpandedNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const [comments, setComments] = useState<NoteCommentType[]>(note.noteComment);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteDescription, setNoteDescription] = useState<string>(
    note.description
  );
  const [type, setType] = useState("comments");

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const commentsEndRef = useRef<any>();

  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const [deleteNote, { error }] = useMutation(DELETE_NOTE_MUTATION);
  const [updateNote, { error: updateError }] =
    useMutation(UPDATE_NOTE_MUTATION);
  const [sendComment, { error: sendCommentError }] = useMutation(
    CREATE_NOTE_COMMENT_MUTATION
  );

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
      return onDelete();
    }

    if (!data.deleteNote.success || error) {
      return sendNotification(
        "error",
        "Error",
        "Error when deleting the note."
      );
    }
  };

  const handleCancel = () => {
    titleRef.current.innerText = note.title;
    descriptionRef.current.innerText = note.description;

    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setIsEditing(false);
  };

  const handleOnCommentChange = (ev) => {
    setComment(ev.target.value);
  };

  const handleSendComment = async () => {
    if (!comment) {
      return sendNotification("error", "Error", "Missing comment message");
    }

    const { data } = await sendComment({
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
      variables: {
        input: {
          authorId: authorId,
          noteId: note.id,
          message: comment,
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS"),
        },
      },
    });

    if (data.createNoteComment) {
      setComment("");
      setComments((prev: NoteCommentType[]) => [
        ...prev,
        data.createNoteComment,
      ]);

      commentsEndRef.current.scrollIntoView({
        behavior: "smooth",
      });

      return onUpdate(note);
    }

    if (sendCommentError) {
      sendNotification("error", "Error", "Error commenting");
    }
  };

  useEffect(() => {
    if (note) {
      setComments(note.noteComment);
    }

    commentsEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [note]);

  return (
    <Modal fullScreen={true} open={open} onClose={onClose}>
      <ExpandedNoteModalContainer>
        <Row style={{ height: "100%" }} gutter={[16, 16]}>
          <FlexCol bordered={true} lg={12} xs={24}>
            <TitleContainer>
              <LeftSide>
                <Color color={note.color} />
                <Title
                  contentEditable={isEditing}
                  ref={titleRef}
                  onInput={handleChangeTitle}
                >
                  {note.title}
                </Title>
              </LeftSide>
              <RightSide>
                {isEditing ? (
                  <>
                    <Button>
                      <AiOutlineCheck
                        onClick={handleUpdateNote}
                        size={24}
                        fill="#ffffff"
                      />
                    </Button>
                    <Button>
                      <AiOutlineClose
                        onClick={handleCancel}
                        size={24}
                        fill="#c92121"
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button>
                      <AiOutlineEdit
                        onClick={() => {
                          setIsEditing(true);
                        }}
                        size={24}
                        fill="#ffffff"
                      />
                    </Button>
                    <Button>
                      <AiOutlineDelete
                        onClick={handleDeleteNote}
                        size={24}
                        fill="#c92121"
                      />
                    </Button>
                  </>
                )}
              </RightSide>
            </TitleContainer>
            <Description
              contentEditable={isEditing}
              ref={descriptionRef}
              onInput={handleChangeDescription}
            >
              {note.description}
            </Description>
            <Footer>
              <IoCalendar fill="#bbbbbb" />
              <Time>
                {format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}
              </Time>
              {note.updatedAt && (
                <>
                  <PointDivider />
                  <MdModeEdit fill="#bbbbbb" />
                  <Time>
                    {format(new Date(note.updatedAt), "dd/MM/yyyy HH:mm")}
                  </Time>
                </>
              )}
            </Footer>
          </FlexCol>
          <FlexCol lg={12} xs={24}>
            <Header>
              {type === "comments" && (
                <Title>
                  {t("annotations.expandedNote.comments")} ({comments.length})
                </Title>
              )}
              {type === "sharing" && (
                <Title>{t("annotations.expandedNote.sharing")} (0)</Title>
              )}
              <Switch>
                <SwitchText
                  onClick={() => setType("comments")}
                  active={type === "comments"}
                >
                  {t("annotations.expandedNote.comments")}
                </SwitchText>
                <SwitchText
                  onClick={() => setType("sharing")}
                  active={type === "sharing"}
                >
                  {t("annotations.expandedNote.sharing")}
                </SwitchText>
              </Switch>
            </Header>
            <Content>
              {comments &&
                comments.map((noteComment: NoteCommentType) => {
                  return (
                    <Comment noteComment={noteComment} key={noteComment.id} />
                  );
                })}
              <div ref={commentsEndRef} />
            </Content>
            <Footer>
              <ProfileBadge>
                <span>{user.displayName.split("")[0]}</span>
              </ProfileBadge>
              <CommentInput
                onKeyUp={(event) =>
                  event.key === "Enter" && handleSendComment()
                }
                value={comment || ""}
                onChange={handleOnCommentChange}
                placeholder={t("annotations.expandedNote.addComment")}
              />
              <Button onClick={handleSendComment}>
                <AiOutlineSend size={24} fill="#ffffff" />
              </Button>
            </Footer>
          </FlexCol>
        </Row>
      </ExpandedNoteModalContainer>
    </Modal>
  );
}
