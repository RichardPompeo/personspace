import { styled } from "styled-components";

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

export const Header = styled.div`
  background-color: #80ed99;
  padding: 8px;
  width: 100%;
  border-radius: 15px 15px 0 0;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;

export const Content = styled.div`
  padding: 15px;
`;

export const Footer = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  padding: 10px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  color: gray;
  padding: 10px 0;
`;

export const Time = styled.p`
  color: #bbbbbb;
`;
