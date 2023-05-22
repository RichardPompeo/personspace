import { styled } from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
`;

export const ContentModal = styled.div`
  background-color: #212126ff;
  width: 25em;
  height: 25em;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  justify-content: space-evenly;
`;

export const Title = styled.h1`

`;