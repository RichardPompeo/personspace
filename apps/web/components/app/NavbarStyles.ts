import { styled } from "styled-components";

export const Container = styled.nav`
  width: 18rem;
  height: 100vh;
  z-index: 1;
  position: fixed;
  overflow-y: auto;
  border-radius: 0 10px 10px 0;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 100px 27px 45px 0;
`;

export const LogoImg = styled.img`
  width: 45px;
  height: 45px;
`;
export const LogoText = styled.h2`
  color: #8eb5f0;
  font-size: 18pt;
  margin-left: 15px;
`;

export const Navigation = styled.ul`
  display: flex;
  flex-direction: column;

  a {
    font-size: 13pt;
    color: #e0e2db;
    text-decoration: none;
  }

  a + a {
    margin-top: 1em;
  }
`;

export const SectionsTitle = styled.h3`
  display: flex;
  opacity: 0.7;
  font-size: 18px;
  font-weight: 500;
  margin: 1.5em 1.5em;
  text-transform: uppercase;
`;

export const ListRoutes = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin: 0 1.2em;
  padding: 0.8em 1.5em;
  list-style: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    & {
      color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }
  }
`;
