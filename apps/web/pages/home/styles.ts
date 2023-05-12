import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;

  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  
  gap: 10vw;
  margin-left: 21em;
  

  @media (max-width: 900px) {
    gap: 10vh;
    margin-left: 0;
    flex-direction: column;
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
  width: clamp(100px, 10vw, 170px);
  height: clamp(30px, 7vh, 70px);

  //padding: 1.3em 2em;

  color: #000000;
  cursor: pointer;
  font-size: clamp(10pt, 1vw, 12pt);
  font-weight: 600;

  border: 2px solid #000000;
  box-shadow: 4px 5px;
  border-radius: 10px;
  background-color: #eeeeeeff;

  @media (max-width: 1600px) {
    width: clamp(100px, 8vw, 170px);
    height: clamp(30px, 5.5vh, 70px);

    font-size: clamp(8pt, 0.5vw, 10pt);
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
`;