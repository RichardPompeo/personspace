import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import {
  Container,
  LeftSide,
  ProfileBadge,
  Name,
  Message,
  RightSide,
  Content,
  Time,
  Badge,
  NameContainer,
} from "./CommentStyles";

import { NoteCommentType } from "../../types/NoteCommentType";

import { AuthContext } from "../../contexts/AuthProvider";

interface CommentProps {
  noteComment: NoteCommentType;
  noteAuthorId: string;
}

export default function Comment({ noteComment, noteAuthorId }: CommentProps) {
  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <Container>
      <LeftSide>
        <ProfileBadge>
          <span>{noteComment.author.displayName.split("")[0]}</span>
        </ProfileBadge>
        <Content>
          <NameContainer>
            <Name>{noteComment.author.displayName}</Name>
            {noteComment.authorId === user.id && (
              <Badge>{t("annotations.expandedNote.commentsYou")}</Badge>
            )}
            {noteComment.authorId === noteAuthorId && (
              <Badge>{t("annotations.expandedNote.commentsAuthor")}</Badge>
            )}
          </NameContainer>
          <Message>{noteComment.message}</Message>
        </Content>
      </LeftSide>
      <RightSide>
        <Time>
          {format(new Date(noteComment.createdAt), "dd/MM/yyyy HH:mm")}
        </Time>
      </RightSide>
    </Container>
  );
}
