import React from "react";

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
} from "./CommentStyles";

import { NoteCommentType } from "../../types/NoteCommentType";

interface CommentProps {
  noteComment: NoteCommentType;
}

export default function Comment({ noteComment }: CommentProps) {
  return (
    <Container>
      <LeftSide>
        <ProfileBadge>
          <span>{noteComment.author.displayName.split("")[0]}</span>
        </ProfileBadge>
        <Content>
          <Name>{noteComment.author.displayName}</Name>
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
