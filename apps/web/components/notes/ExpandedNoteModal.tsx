import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlineSearch,
  AiOutlineSend,
} from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

import { useLazyQuery, useMutation } from "@apollo/client";
import { Col, Popover, Row } from "antd";
import { format } from "date-fns";

import Modal from "../app/Modal";

import {
  Button,
  Color,
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
  Input,
  PopoverContainer,
} from "./ExpandedNoteModalStyles";
import { Email, Name } from "./ShareStyles";
import { UserData } from "../app/UtilityStyles";

import Comment from "./Comment";
import Share from "./Share";

import { NoteType } from "../../types/NoteType";
import { NoteCommentType } from "../../types/NoteCommentType";
import { NoteShareType } from "../../types/NoteShareType";

import { UserType } from "../../types/UserType";
import { sendNotification } from "../../utils/notifications";
import { AuthContext } from "../../contexts/AuthProvider";

import DELETE_NOTE_MUTATION from "../../graphql/notes/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/notes/updateNoteMutation";
import CREATE_NOTE_COMMENT_MUTATION from "../../graphql/notes/createNoteCommentMutation";
import GET_USER_BY_EMAIL_QUERY from "../../graphql/users/getUserByEmailQuery";
import CREATE_NOTE_SHARE_MUTATION from "../../graphql/notes/createNoteShareMutation";
import DELETE_NOTE_SHARE_MUTATION from "../../graphql/notes/deleteNoteShareMutation";

interface ExpandedNoteModalProps {
  open: boolean;
  authorId: string;
  editable?: boolean;
  onClose: () => void;
  onUpdate: (any) => void;
  onDelete: () => void;
  onRemove: (any) => void;
  note: NoteType;
}

export default function ExpandedNoteModal({
  open,
  note,
  authorId,
  editable = true,
  onClose,
  onUpdate,
  onDelete,
  onRemove,
}: ExpandedNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [shareUser, setShareUser] = useState<UserType | null>(null);
  const [shareUserInput, setShareUserInput] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const [comments, setComments] = useState<NoteCommentType[]>(note.noteComment);
  const [shares, setShares] = useState<NoteShareType[]>(note.noteShare);
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
  const [addPerson, { error: addPersonError }] = useMutation(
    CREATE_NOTE_SHARE_MUTATION
  );
  const [deletePerson, { error: deletePersonError }] = useMutation(
    DELETE_NOTE_SHARE_MUTATION
  );

  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL_QUERY);

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

    if (updateError) {
      sendNotification("error", "Error", "Error updating the note");
    }

    if (data.updateNote) {
      onUpdate(data.updateNote);

      return setIsEditing(false);
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

  const handleOnClose = () => {
    onClose();
    setType("comments");
    setIsEditing(false);
  };

  const handleOnShareChange = (ev) => {
    setShareUserInput(ev.target.value);
  };

  const handleGetUserByEmail = async () => {
    setPopoverOpen(true);

    if (!shareUserInput) {
      setPopoverOpen(false);
      setShareUser(null);
      return sendNotification("error", "Error", "Missing email");
    }

    const { data } = await getUserByEmail({
      variables: {
        input: {
          email: shareUserInput,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    if (!data.getUserByEmail.success) {
      return sendNotification("error", "Error", "Error loading user");
    }

    if (data.getUserByEmail.user === null) {
      return setShareUser(null);
    }

    setShareUser(data.getUserByEmail.user);
  };

  const handleAddPerson = async () => {
    if (shareUser === null) {
      return;
    }

    const { data } = await addPerson({
      variables: {
        input: {
          noteId: note.id,
          personId: shareUser.id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    console.log(data);

    if (
      data.createNoteShare.error &&
      data.createNoteShare.error.message === "Duplicated"
    ) {
      return sendNotification("error", "Error", "Duplicated field");
    }

    if (
      data.createNoteShare.error &&
      data.createNoteShare.error.message === "Author"
    ) {
      return sendNotification("error", "Error", "Author");
    }

    if (addPersonError || !data.createNoteShare.success) {
      return sendNotification("error", "Error", "Error adding person");
    }

    if (data.createNoteShare.success) {
      console.log(data);
      setShares((prev: NoteShareType[]) => [...prev, data.createNoteShare]);

      setPopoverOpen(false);
      setShareUserInput("");
      setShareUser(null);

      return onUpdate(note);
    }
  };

  const handleRemoveSelf = async () => {
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
      return onRemove(note);
    }
  };

  const handleOnDeleteShare = (deletedShare: NoteShareType) => {
    const filteredShares = shares.filter((share: NoteShareType) => {
      return share.id !== deletedShare.id;
    });

    setShares(filteredShares);

    return onUpdate(note);
  };

  useEffect(() => {
    if (note) {
      setComments(note.noteComment);
      setShares(note.noteShare);
    }

    commentsEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [note]);

  const sharingPopoverContent = (
    <>
      {shareUser === null ? (
        <p>{t("annotations.expandedNote.personNotFound")}</p>
      ) : (
        <PopoverContainer onClick={handleAddPerson}>
          <ProfileBadge>
            <span>{shareUser.displayName.split("")[0]}</span>
          </ProfileBadge>
          <UserData>
            <Name>{shareUser.displayName}</Name>
            <Email>{shareUser.email}</Email>
          </UserData>
        </PopoverContainer>
      )}
    </>
  );

  return (
    <Modal fullScreen={true} open={open} onClose={handleOnClose}>
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
                {isEditing && editable ? (
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
                    {editable ? (
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
                    ) : (
                      <>
                        <Button>
                          <AiOutlineMinus
                            onClick={handleRemoveSelf}
                            size={24}
                            fill="#c92121"
                          />
                        </Button>
                      </>
                    )}
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
              {!editable && (
                <>
                  <Time>{note.author.displayName}</Time>
                  <PointDivider />
                </>
              )}
              <IoCalendar fill="#bbbbbb" />
              <Time>
                {format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}
              </Time>
              {note.updatedAt && (
                <>
                  <PointDivider />
                  <BiSolidEdit fill="#bbbbbb" />
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
              {type === "sharing" && editable && (
                <Title>
                  {t("annotations.expandedNote.sharing")} ({shares.length})
                </Title>
              )}
              {editable && (
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
              )}
            </Header>
            <Content>
              {type === "comments" ? (
                <>
                  {comments &&
                    comments.map((noteComment: NoteCommentType) => {
                      return (
                        <Comment
                          noteAuthorId={note.authorId}
                          noteComment={noteComment}
                          key={noteComment.id}
                        />
                      );
                    })}
                  <div ref={commentsEndRef} />
                </>
              ) : (
                <>
                  {editable && (
                    <>
                      <Row gutter={[16, 16]}>
                        {shares &&
                          shares.map((noteShare: NoteShareType) => {
                            return (
                              <Col lg={12} xs={24} key={noteShare.id}>
                                <Share
                                  onDelete={handleOnDeleteShare}
                                  noteShare={noteShare}
                                />
                              </Col>
                            );
                          })}
                      </Row>
                      <div ref={commentsEndRef} />
                    </>
                  )}
                </>
              )}
            </Content>
            <Footer>
              {type === "comments" ? (
                <>
                  <ProfileBadge>
                    <span>{user.displayName.split("")[0]}</span>
                  </ProfileBadge>
                  <Input
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
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Popover
                    color="#131315"
                    open={popoverOpen}
                    title={
                      <h3>{t("annotations.expandedNote.addPersonTitle")}</h3>
                    }
                    placement="topLeft"
                    content={sharingPopoverContent}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      <Input
                        onKeyUp={(event) =>
                          event.key === "Enter" && handleGetUserByEmail()
                        }
                        value={shareUserInput || ""}
                        onChange={handleOnShareChange}
                        placeholder={t("annotations.expandedNote.addPerson")}
                      />
                      <Button onClick={handleGetUserByEmail}>
                        <AiOutlineSearch size={24} fill="#ffffff" />
                      </Button>
                    </div>
                  </Popover>
                </div>
              )}
            </Footer>
          </FlexCol>
        </Row>
      </ExpandedNoteModalContainer>
    </Modal>
  );
}
