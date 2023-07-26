import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";

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

interface NoteProps {
  title: string;
  description: string;
}

export default function Note({ title, description }: NoteProps) {
  const [isEditing, setIsEditing] = useState(true);

  const currentDateTime = format(new Date(), "dd/MM/yyyy, HH:mm");

  return (
    <Container>
      <Header>
        {isEditing ? (
          <>
            <Button>
              <AiOutlineCheck
                onClick={() => {
                  setIsEditing(false);
                }}
                size={18}
                fill="#000000"
              />
            </Button>
            <Button>
              <AiOutlineClose
                onClick={() => {
                  setIsEditing(false);
                }}
                size={18}
                fill="#000000"
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
                size={18}
                fill="#000000"
              />
            </Button>
            <Button>
              <AiOutlineDelete size={18} fill="#000000" />
            </Button>
          </>
        )}
      </Header>
      <Content>
        <Title contentEditable={isEditing}>{title}</Title>
        <Description contentEditable={isEditing}>{description}</Description>
      </Content>
      {!isEditing && (
        <Footer>
          <IoCalendar fill="#bbbbbb" />
          <Time>{currentDateTime}</Time>
        </Footer>
      )}
    </Container>
  );
}
