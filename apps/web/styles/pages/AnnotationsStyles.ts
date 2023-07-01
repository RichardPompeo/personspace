import { styled } from "styled-components";

interface NotesToolsProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  width: 75vw;
  height: 100vh;
  margin-right: 2em;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  button {
    box-shadow: none;
    padding: 1.2em 1em;
  }
`;

export const ContentNotes = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const HeaderNotes = styled.div`
  display: flex;
  margin-bottom: 6em;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    font-size: 11pt;
    padding: 0 10px;
    height: 1.2em;
    border-radius: 15px;
    background-color: #212126ff;
  }
`;

export const TitleNotes = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color:#FFFFFF;
  font-weight: 500;
`;

export const CardNotes = styled.div`
  display: grid;
  position: relative;
  padding: 0 1.5em;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  justify-content: center;
  flex-direction: column;
  grid-template-rows: 2.5fr 2fr;
  width: 28em;
  height: 18em;
  border-radius: 15px;
  background-color: #212126ff;
`;

export const Title = styled.h2`
  font-size: 13pt;
  margin-top: 4em;
`;

export const Text = styled.p`
  margin-bottom: 2em;
`;

export const NotesTools = styled.div<NotesToolsProps>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1em;
  border-radius: 15px 15px 0 0;
  background-color: ${( props ) => props.color};
`;