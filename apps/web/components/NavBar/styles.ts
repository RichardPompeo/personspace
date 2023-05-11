import { styled } from "styled-components";


export const Container = styled.nav`
  width: 20rem;
  height: 100vh;
  position: fixed;

  border-radius: 0 10px 10px 0;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const MButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  padding: 15px;
  margin: 10px 20px;
  border-radius: 50%;
  background-color: rgba(142, 181, 240, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 40px 50px 0 0;
`;

export const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;
export const LogoText = styled.h2`
  margin-left: 15px;
  color: #8eb5f0;
  font-size: 18pt;
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
  font-size: 14pt;
  font-weight: 500;
  margin: 2.2em 1.5em;
`;

export const ListRoutes = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 15px;
  margin: 0 2em;
  padding: 0.8em 1.5em;
  list-style: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    & {
      color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    };

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
<<<<<<< HEAD
    };
  };
`;
=======
    }
  }
`;
>>>>>>> 2196dde0a00067b4df4d4acac13d7941bafbb369
