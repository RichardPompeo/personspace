import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100vw;
  }
`;

export const HeaderContent = styled.article`
  display: flex;
  gap: 10vw;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  width: 30vw;

  h1 + h2 {
    margin: 30px 0 40px 0;
  }

  @media (max-width: 1500px) {
    h1 + h2 {
      margin: 30px 0 30px 0;
    }
  }

  @media (max-width: 800px) {
    width: 90vw;
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-size: clamp(17pt, 3vw, 35pt);
  font-weight: 400;
  line-height: 1em;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.SECONDARY};
  }

  @media (max-width: 1635px) {
    font-size: clamp(20pt, 3vw, 35pt);
  }
`;

export const SubTitle = styled.h2`
  font-size: clamp(11pt, 2vw, 18pt);
  font-weight: 300;
  color: #e5e5e5;

  @media (max-width: 1635px) {
    font-size: clamp(13pt, 1.5vw, 14pt);
  }
`;

export const Img = styled.img`
  display: flex;
  width: 700px;
  height: 700px;

  @media (max-width: 1750px) {
    width: 600px;
    height: 600px;
  }

  @media (max-width: 1600px) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 1500px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 1280px) {
    width: 360px;
    height: 360px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;
