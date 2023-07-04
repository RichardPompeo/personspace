import { Popover } from "antd";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";

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
} from "../styles/components/CardNotesStyles";

interface CardNotesProps {
  color: string;
  children: React.ReactNode;
}

export default function CardNote(props: CardNotesProps) {
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
      {props.children}
      <Date>
        <IoCalendar fill="#bbbbbb" /> 04/07/23
      </Date>
    </Container>
  );
};
