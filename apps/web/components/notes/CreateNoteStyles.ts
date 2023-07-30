import { styled } from "styled-components";

export const Container = styled.div`
  width: 396px;
  height: 240px;
  border: 5px dashed #2d2e2e;

  border-radius: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;

  &:hover {
    background-color: #212126ff;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 100%;
  };
`;

export const Header = styled.div`
  background-color: #8eb5f0;
  width: 100%;
  height: 2em;
  padding: 0 8px;
  border-radius: 15px 15px 0 0;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;

export const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: auto;

  button {
    box-shadow: none;
    width: 50%;
  }
`;

export const Title = styled.h1`
  color: #2d2e2e;
`;

export const TitleInput = styled.input`
  font-weight: bold;
  font-size: 21px;
  padding: 10px 0;
  background: transparent;
  width: 100%;
  outline: none;

  &::placeholder {
    color: white;
  }
`;

export const DescriptionInput = styled.textarea`
  font-size: 16px;
  color: gray;
  padding: 10px 0;
  background: transparent;
  width: 100%;
  height: 6em;
  outline: none;
  resize: none;
  font-family: "Supreme", sans-serif;
`;
