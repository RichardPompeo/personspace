import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  gap: 10vw;
  margin-left: 21em;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    margin-left: 0;
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
    font-size: clamp(17pt, 2.5vw, 35pt);
  }
`;

export const Header = styled.div`
  width: 30vw;

  h1 + h2 {
    margin: 30px 0 60px 0;
  }

  @media (max-width: 1500px) {
    h1 + h2 {
      margin: 30px 0 40px 0;
    }
  }
`;

export const SubTitle = styled.h2`
  font-size: clamp(11pt, 2vw, 18pt);
  font-weight: 300;
  color: #e5e5e5;

  @media (max-width: 1635px) {
    font-size: clamp(11pt, 1.5vw, 14pt);
  }
`;

export const Button = styled.button`
  padding: 1.3em 2em; 

  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  cursor: pointer;
  font-size: clamp(10pt, 1vw, 12pt);
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  box-shadow: 4px 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.DEFAULT};

  @media (max-width: 1600px) {
    font-size: clamp(8pt, 0.5vw, 10pt);
  }

  @media (max-width: 1200px) {
    padding: 1em 1em;
    box-shadow: 2px 3px;
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

  @media (max-width: 900px) {
    display: none;
  }
`;
