import { useRef, useState } from "react";

import { Popover } from "antd";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { FaThumbtack } from "react-icons/fa";

import {
  Container,
  NotesTools,
  overlayStyle,
  ContainerPopover,
  ContentPopover,
  SelectColors,
  Colors,
  Tools,
  Date,
  Title,
  Text,
  PlaceholderTitle,
  ContentTitle,
  ContentText,
  PlaceholderText
} from "../styles/components/CardNotesStyles";

interface CardNotesProps {
  color: string;
}

export default function CardNote(props: CardNotesProps) {
  const contentEditableRefTitle = useRef<any>();
  const contentEditableRefText = useRef<any>();
  const [notesTitle, setNotesTitle] = useState<string>("");
  const [notesText, setNotesText] = useState<string>("");

  const saveNotesTitle = () => {
    const getNotesTitle = contentEditableRefTitle.current.innerText;
    setNotesTitle(getNotesTitle);
  };

  const saveNotesText = () => {
    const getNotesText = contentEditableRefText.current.innerText;
    setNotesText(getNotesText);
  };

  const content = (
    <ContainerPopover>
      <ContentPopover>
        <Tools>
          <MdEditSquare fontSize={16} />
          Edit note
        </Tools>
        <Tools>
          <RiDeleteBin5Fill fontSize={16} />
          Delete note
        </Tools>
      </ContentPopover>
    </ContainerPopover>
  );

  return (
    <Container>
      <NotesTools color={props.color}>
        <FaThumbtack fill="#161a1d" fontSize={12} cursor="pointer" />
        <Popover
          placement="bottomRight"
          color="#212126ff"
          content={content}
          title={
            <SelectColors>
              <Colors color="#80ed99" />
              <Colors color="#ffafcc" />
              <Colors color="#90e0ef" />
              <Colors color="#aa7bc3" />
              <Colors color="#98c1d9" />
              <Colors color="#ffd670" />
            </SelectColors>
          }
          overlayStyle={overlayStyle}
          trigger="click"
        >
          <IoIosMore fill="#161a1d" fontSize={19} cursor="pointer" />
        </Popover>
      </NotesTools>
      <Title>
        <PlaceholderTitle display={notesTitle}>Título</PlaceholderTitle>
        <ContentTitle contentEditable="true" ref={contentEditableRefTitle} onInput={saveNotesTitle}></ContentTitle>
      </Title>
      <Text>
        <PlaceholderText display={notesText}>Escreva sua anotação...</PlaceholderText>
        <ContentText contentEditable="true" ref={contentEditableRefText} onInput={saveNotesText}></ContentText>
      </Text>
      <Date>
        <IoCalendar fill="#bbbbbb" /> 04/07/23
      </Date>
    </Container>
  );
}
