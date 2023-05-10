import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;

  align-items: center;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 45em 22em;
`;

export const Title = styled.h1`
  font-size: 35pt;
  font-weight: 400;
  line-height: 1em;
  
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.SECONDARY};
  }
`;

export const Header = styled.div`
  h1 + h2 {
    margin: 30px 0 60px 0;
  }
`;

export const SubTitle = styled.h2`
  font-size: 18pt;
  font-weight: 300;
  color: #e5e5e5;
`;

export const Button = styled.button`
  padding: 1.3em 2em;

  color: #000000;
  cursor: pointer;
  font-size: 12pt;
  font-weight: 600;

  border: 2px solid #000000;
  box-shadow: 4px 5px;
  border-radius: 10px;
  background-color: #eeeeeeff;
`;

export const Img = styled.img`
  display: flex;
  width: 700px;
  height: 700px;
`;