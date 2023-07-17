import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 72vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    box-shadow: none;
    padding: 1.2em 1em;
  }
`;

export const ContentNotes = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
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

export const Title = styled.div`
  font-size: 14pt;
  font-weight: 700;
  outline: none;
  margin-top: 4em;
`;

export const Text = styled.div`
  outline: none;
  margin-bottom: 2em;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  max-width: 800px;
  max-height: 800px;
`;