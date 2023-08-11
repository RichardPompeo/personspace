import { styled } from "styled-components";

interface HeaderProps {
  color: string;
}

export const Container = styled.div`
  background-color: #212126ff;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  width: 396px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  height: 240px;

  @media (max-width: 1200px) {
    width: 100%;
  };

  @media (max-width: 768px) {
    width: 100%;
  };
`;

export const Button = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const Header = styled.div<HeaderProps>`
  background-color: ${({ color }) => (color ? color : "#8eb5f0")};
  width: 100%;
  height: 2em;
  padding: 0 8px;
  border-radius: 15px 15px 0 0;
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const Content = styled.div`
  width: 100%;
  padding: 15px;
`;

export const Footer = styled.div`
  padding: 0 15px 15px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;

  svg {
    fill: #bbbbbb;
    font-size: 14px;
  }
`;

export const Title = styled.h1`
  font-size: 21px;
  padding: 10px 0;
  outline: none;
  max-height: 2em;
  
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Description = styled.p`
  font-size: 16px;
  color: gray;
  margin: 10px 0;
  outline: none;
  max-height: 6em;
  word-wrap: break-word;
  overflow-y: auto;
  text-overflow: ellipsis;
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
