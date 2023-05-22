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

  svg {
    position: absolute;
    margin-bottom: 13.5em;
    margin-left: 11em;
  }
`;

export const ContentModal = styled.div`
  background-color: #212126ff;
  width: 25em;
  height: 30em;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  justify-content: space-evenly;
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
`;

export const SubTitle = styled.p`
  font-size: 13pt;
  margin-top: 0.7em;
  opacity: 0.8;
`;