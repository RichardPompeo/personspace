import { styled } from "styled-components";

interface ContainerProps {
  open: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: ${(props) => props.open ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  font-family: "Supreme", sans-serif;
`;

export const ContentModal = styled.div`
  position: relative;
  background-color: #212126ff;
  width: 25rem;
  height: 30rem;
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
  width: 20rem;
  text-align: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: #8eb5f0;
  font-weight: 800;
  font-size: 24pt;
`;

export const SubTitle = styled.p`
  opacity: 0.8;
  font-size: 13pt;
  margin-top: 0.7em;
`;

export const DataField = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 21em;
    height: 2.9em;
    font-size: medium;
    border-radius: 10px;
    background-color: #26262c;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: ${({ theme }) => theme.COLORS.DEFAULT};
  }

  span {
    background-color: #26262c;
    border-radius: 10px;
    font-size: medium;
    border: 1px solid rgba(255, 255, 255, 0.3);

    input {
      width: 18em;
      height: 2.3em;
      color: ${({ theme }) => theme.COLORS.DEFAULT};
    }

    span {
      margin: 0;
      border: none;
    }
  }

  button {
    box-shadow: none;
    border: none;
    font-size: 12pt;
    padding: 0.8em 2em;

    @media (max-width: 1600px) {
      font-size: 12pt;
    }

    @media (max-width: 1200px) {
      padding: 0.8em 2em;
    }
  }

  * + * {
    margin-top: 1em;
  }

  span + button {
    margin-top: 2em;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;
