import { styled } from "styled-components";

interface NotesToolsProps {
  color: string;
}

interface PlaceholderProps {
  display: string;
}

export const overlayStyle = {
  background: "#212126ff",
  width: "190px",
  borderRadius: "15px",
};

export const ContainerPopover = styled.div`
  display: flex;
  margin-top: 1.5em;
  gap: 2em;
  align-items: flex-end;
  flex-direction: column;
`;

export const ContentPopover = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  flex-direction: column;
`;

export const SelectColors = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
`;

export const Colors = styled.div<NotesToolsProps>`
  width: 2em;
  height: 2em;
  background-color: ${(props) => props.color};
`;

export const Tools = styled.p`
  display: flex;
  gap: 1em;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
`;

export const NotesTools = styled.div<NotesToolsProps>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  border-radius: 15px 15px 0 0;
  background-color: ${(props) => props.color};
`;

export const Container = styled.div`
  display: grid;
  position: relative;
  padding: 0 1.5em;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  justify-self: self-start;
  flex-direction: column;
  grid-template-rows: 3fr 2fr;
  width: 28em;
  height: 18em;
  border-radius: 15px;
  background-color: #212126ff;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.div`
  position: relative;
  margin-top: 5em;
`;

export const PlaceholderTitle = styled.h1<PlaceholderProps>`
  display: ${(props) => (props.display ? "none" : "flex")};
  position: absolute;
  color: #d6d6d6;
  font-size: 14pt;
  font-weight: 700;
`;

export const ContentTitle = styled.div`
  z-index: 1;
  outline: none;
  font-size: 14pt;
  font-weight: 700;
`;

export const Text = styled.div`
  position: relative;
  max-width: 25.5em;
  margin-bottom: 2em;
`;

export const PlaceholderText = styled.p<PlaceholderProps>`
  display: ${(props) => (props.display ? "none" : "flex")};
  position: absolute;
  color: #d6d6d6;
  font-size: 11pt;
  font-weight: 400;
`;

export const ContentText = styled.div`
  z-index: 1;
  outline: none;
  font-size: 11pt;
  font-weight: 400;
`;

export const Date = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 2em;
`;
