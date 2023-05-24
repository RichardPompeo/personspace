import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`;

export const ContentModal = styled.div`
  position: relative;
  background-color: #212126ff;
  width: 25em;
  height: 30em;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  justify-content: space-evenly;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 2em 2.5em;
  cursor: pointer;
  background-color: transparent;
`;

export const TitleContent = styled.div`
  display: flex;
  width: 20em;
  text-align: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 800;
  color: #8eb5f0;
`;

export const SubTitle = styled.p`
  opacity: 0.8;
  font-size: 13pt;
  margin-top: 0.7em;
`;
