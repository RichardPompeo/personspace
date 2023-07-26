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
  font-size: 24px;
`;
