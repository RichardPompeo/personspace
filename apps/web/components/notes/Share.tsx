import React from "react";
import { AiOutlineMinus } from "react-icons/ai";

import { useMutation } from "@apollo/client";

import {
  Container,
  LeftSide,
  RightSide,
  ProfileBadge,
  Name,
  Email,
  Content,
  Button,
} from "./ShareStyles";

import { NoteShareType } from "../../types/NoteShareType";

import DELETE_NOTE_SHARE_MUTATION from "../../graphql/notes/deleteNoteShareMutation";
import { sendNotification } from "../../utils/notifications";

interface ShareProps {
  noteShare: NoteShareType;
  onDelete: (noteShare: NoteShareType) => void;
}

export default function Share({ noteShare, onDelete }: ShareProps) {
  const [deletePerson, { error }] = useMutation(DELETE_NOTE_SHARE_MUTATION);

  const handleRemove = async () => {
    const { data } = await deletePerson({
      variables: {
        input: {
          id: noteShare.id,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    });

    if (error || !data.deleteNoteShare.success) {
      return sendNotification("error", "Error", "Error deleting share");
    }

    if (data.deleteNoteShare.success) {
      return onDelete(noteShare);
    }
  };

  return (
    <Container>
      <LeftSide>
        <ProfileBadge>
          <span>{noteShare.person.displayName.split("")[0]}</span>
        </ProfileBadge>
        <Content>
          <Name>{noteShare.person.displayName}</Name>
          <Email>{noteShare.person.email}</Email>
        </Content>
      </LeftSide>
      <RightSide>
        <Button>
          <AiOutlineMinus onClick={handleRemove} size={24} fill="#c92121" />
        </Button>
      </RightSide>
    </Container>
  );
}
