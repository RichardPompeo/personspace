import { styled } from "styled-components";

export const Container = styled.div`

  width: 100%;
  height: 100%;
  padding: 25px;
  position: relative;

  @media (max-width: 767px) {
    padding-top: 80px;
  }
`;

export const Content = styled.div`
  padding: 25px 0;
`;

export const Title = styled.h1`
  display: flex;
  gap: 0.5em;
  font-size: 24px;
  align-items: center;
  margin-bottom: 3em;

  span {
    display: flex;
    align-items: center;
    padding: 0 15px 3px 15px;
    height: 1.2em;
    border-radius: 15px;

    background-color: rgb(33, 33, 38);
  }
`;
