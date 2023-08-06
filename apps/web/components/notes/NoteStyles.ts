import { styled } from "styled-components";

interface HeaderProps {
  color: string;
}

export const Container = styled.div`
  background-color: #212126ff;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  width: 100%;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  height: 240px;
`;

export const Button = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled.div<HeaderProps>`
  background-color: ${({ color }) => (color ? color : "#8eb5f0")};
  padding: 8px;
  width: 100%;
  border-radius: 15px 15px 0 0;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const Content = styled.div`
  padding: 15px;
`;

export const Footer = styled.div`
  padding: 0 15px 15px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  padding: 10px 0;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 1.6em;
`;

export const Description = styled.p`
  font-size: 16px;
  color: gray;
  margin: 10px 0;
  outline: none;
  max-height: 4.8em;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: scroll;
  white-space: pre-line;
`;

export const PointDivider = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: gray;
  opacity: 0.25;
  margin: 0 3px;
`;

export const Time = styled.p`
  color: #bbbbbb;
`;
